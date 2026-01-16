import { useState } from 'react';
import {
  FileUpload,
  Button,
  ComboBox,
  Card,
  ProgressBar,
  TextBlock,
} from './index';
import '../styles/file-converter.css';

interface ComboBoxOption {
  label: string;
  value: string;
}

export interface FileConverterProps {
  supportedFormats?: string[];
  onConvert?: (file: File, fromFormat: string, toFormat: string) => Promise<Blob>;
  maxFileSize?: number;
}

export function FileConverter({
  supportedFormats = ['PDF', 'DOCX', 'XLSX', 'PNG', 'JPG', 'WEBP', 'MP4', 'MP3'],
  onConvert,
  maxFileSize = 104857600, // 100MB default
}: FileConverterProps) {
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [fromFormat, setFromFormat] = useState(uploadedFile?.name.split('.').pop()?.toUpperCase() || 'PDF');
  const [toFormat, setToFormat] = useState('DOCX');
  const [isConverting, setIsConverting] = useState(false);
  const [conversionProgress, setConversionProgress] = useState(0);
  const [convertedFile, setConvertedFile] = useState<Blob | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const handleFileUpload = (files: File[]) => {
    const file = files[0];
    if (!file) return;

    // Reset previous conversion
    setConvertedFile(null);
    setError(null);
    setSuccessMessage(null);

    // Validate file size
    if (file.size > maxFileSize) {
      setError(`File size exceeds ${maxFileSize / 1048576}MB limit`);
      return;
    }

    setUploadedFile(file);
    const ext = file.name.split('.').pop()?.toUpperCase() || 'PDF';
    setFromFormat(ext);
    setConversionProgress(0);
  };

  const handleConvert = async () => {
    if (!uploadedFile) {
      setError('Please select a file first');
      return;
    }

    if (fromFormat === toFormat) {
      setError('Source and destination formats must be different');
      return;
    }

    setIsConverting(true);
    setError(null);
    setSuccessMessage(null);
    setConversionProgress(0);

    try {
      // Simulate conversion progress
      const progressInterval = setInterval(() => {
        setConversionProgress((prev) => {
          if (prev >= 90) {
            clearInterval(progressInterval);
            return prev;
          }
          return prev + Math.random() * 30;
        });
      }, 500);

      // Call custom conversion handler if provided
      let result: Blob;
      if (onConvert) {
        result = await onConvert(uploadedFile, fromFormat, toFormat);
      } else {
        // Mock conversion
        await new Promise((resolve) => setTimeout(resolve, 2000));
        result = uploadedFile;
      }

      clearInterval(progressInterval);
      setConversionProgress(100);
      setConvertedFile(result);
      setSuccessMessage(`Successfully converted to ${toFormat}`);
    } catch (err) {
      setError(`Conversion failed: ${err instanceof Error ? err.message : 'Unknown error'}`);
    } finally {
      setIsConverting(false);
    }
  };

  const handleDownload = () => {
    if (!convertedFile || !uploadedFile) return;

    const originalName = uploadedFile.name.split('.')[0];
    const newFileName = `${originalName}.${toFormat.toLowerCase()}`;
    const url = URL.createObjectURL(convertedFile);
    const link = document.createElement('a');
    link.href = url;
    link.download = newFileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleReset = () => {
    setUploadedFile(null);
    setFromFormat('PDF');
    setToFormat('DOCX');
    setConvertedFile(null);
    setError(null);
    setSuccessMessage(null);
    setConversionProgress(0);
  };

  const formatOptions: ComboBoxOption[] = supportedFormats.map((fmt) => ({
    label: fmt,
    value: fmt,
  }));

  const toFormatOptions: ComboBoxOption[] = formatOptions.filter((fmt) => fmt.value !== fromFormat);

  return (
    <div className="file-converter">
      <Card title="File Converter">
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {/* Upload Section */}
          <div className="converter-section">
            <TextBlock variant="subtitle">1. Select File to Convert</TextBlock>
            <FileUpload
              multiple={false}
              accept={supportedFormats.map((fmt) => `.${fmt.toLowerCase()}`).join(',')}
              maxSize={maxFileSize}
              onUpload={handleFileUpload}
            />
            {uploadedFile && (
              <div className="file-info">
                <span className="file-name">{uploadedFile.name}</span>
                <span className="file-size">
                  ({(uploadedFile.size / 1024 / 1024).toFixed(2)} MB)
                </span>
              </div>
            )}
          </div>

          {/* Format Selection */}
          {uploadedFile && (
            <div className="converter-section">
              <TextBlock variant="subtitle">2. Select Formats</TextBlock>
              <div className="format-row">
                <div className="format-group">
                  <label className="format-label">From</label>
                  <ComboBox
                    value={fromFormat}
                    onChange={setFromFormat}
                    options={formatOptions}
                    placeholder="Select format"
                  />
                </div>
                <div className="format-arrow">→</div>
                <div className="format-group">
                  <label className="format-label">To</label>
                  <ComboBox
                    value={toFormat}
                    onChange={setToFormat}
                    options={toFormatOptions}
                    placeholder="Select format"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Convert Button */}
          {uploadedFile && (
            <div className="converter-section">
              <Button
                variant="primary"
                onClick={handleConvert}
                disabled={isConverting || !uploadedFile}
                style={{ width: '100%' }}
              >
                {isConverting ? 'Converting...' : 'Convert'}
              </Button>
            </div>
          )}

          {/* Progress */}
          {isConverting && (
            <div className="converter-section">
              <TextBlock variant="body">Converting: {Math.round(conversionProgress)}%</TextBlock>
              <ProgressBar value={conversionProgress} max={100} />
            </div>
          )}

          {/* Error Message */}
          {error && (
            <div className="converter-section error-section">
              <TextBlock variant="body">⚠️ {error}</TextBlock>
            </div>
          )}

          {/* Success Message */}
          {successMessage && (
            <div className="converter-section success-section">
              <TextBlock variant="body">✓ {successMessage}</TextBlock>
            </div>
          )}

          {/* Download Button */}
          {convertedFile && (
            <div className="converter-section">
              <div className="button-group">
                <Button
                  variant="primary"
                  onClick={handleDownload}
                  style={{ flex: 1 }}
                >
                  📥 Download {toFormat}
                </Button>
                <Button
                  variant="secondary"
                  onClick={handleReset}
                  style={{ flex: 1 }}
                >
                  Convert Another
                </Button>
              </div>
            </div>
          )}
        </div>
      </Card>
    </div>
  );
}

export default FileConverter;
