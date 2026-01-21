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

interface FileItem {
  file: File;
  fromFormat: string;
  toFormat: string;
  isConverting?: boolean;
  conversionProgress?: number;
  convertedFile?: Blob | null;
  error?: string | null;
  successMessage?: string | null;
}

export interface FileConverterProps {
  supportedFormats?: string[];
  onConvert?: (file: File, fromFormat: string, toFormat: string) => Promise<Blob>;
  maxFileSize?: number;
}

export function FileConverter({
  supportedFormats = ['PDF', 'DOCX', 'XLSX', 'PNG', 'JPG', 'WEBP', 'MP4', 'MP3'],
  onConvert,
  maxFileSize = 5368709120, // 5GB default
}: FileConverterProps) {
  const [uploadedFiles, setUploadedFiles] = useState<FileItem[]>([]);
  const [toFormat, setToFormat] = useState('DOCX');
  const [error, setError] = useState<string | null>(null);

  const handleFileUpload = (files: File[]) => {
    const newFiles: FileItem[] = files
      .filter((file) => {
        // Validate file size
        if (file.size > maxFileSize) {
          const limitGB = (maxFileSize / 1073741824).toFixed(2);
          setError(`File "${file.name}" exceeds ${limitGB}GB limit`);
          return false;
        }
        return true;
      })
      .map((file) => ({
        file,
        fromFormat: file.name.split('.').pop()?.toUpperCase() || 'PDF',
        toFormat: toFormat,
      }));

    if (newFiles.length > 0) {
      setUploadedFiles((prev) => [...prev, ...newFiles]);
      setError(null);
    }
  };

  const handleConvertFile = async (index: number) => {
    const fileItem = uploadedFiles[index];
    if (!fileItem) return;

    if (fileItem.fromFormat === fileItem.toFormat) {
      const updated = [...uploadedFiles];
      updated[index].error = 'Source and destination formats must be different';
      setUploadedFiles(updated);
      return;
    }

    const updated = [...uploadedFiles];
    updated[index].isConverting = true;
    updated[index].conversionProgress = 0;
    updated[index].error = null;
    updated[index].successMessage = null;
    setUploadedFiles(updated);

    try {
      // Simulate conversion progress
      const progressInterval = setInterval(() => {
        setUploadedFiles((prev) => {
          const newState = [...prev];
          if (newState[index].conversionProgress && newState[index].conversionProgress! >= 90) {
            clearInterval(progressInterval);
            return newState;
          }
          newState[index].conversionProgress = (newState[index].conversionProgress || 0) + Math.random() * 30;
          return newState;
        });
      }, 500);

      // Call custom conversion handler if provided
      let result: Blob;
      if (onConvert) {
        result = await onConvert(fileItem.file, fileItem.fromFormat, fileItem.toFormat);
      } else {
        // Mock conversion
        await new Promise((resolve) => setTimeout(resolve, 2000));
        result = fileItem.file;
      }

      const finalUpdate = [...uploadedFiles];
      clearInterval(progressInterval);
      finalUpdate[index].conversionProgress = 100;
      finalUpdate[index].convertedFile = result;
      finalUpdate[index].successMessage = `Successfully converted to ${fileItem.toFormat}`;
      finalUpdate[index].isConverting = false;
      setUploadedFiles(finalUpdate);
    } catch (err) {
      const errorUpdate = [...uploadedFiles];
      errorUpdate[index].error = `Conversion failed: ${err instanceof Error ? err.message : 'Unknown error'}`;
      errorUpdate[index].isConverting = false;
      setUploadedFiles(errorUpdate);
    }
  };

  const handleDownloadFile = (index: number) => {
    const fileItem = uploadedFiles[index];
    if (!fileItem.convertedFile || !fileItem.file) return;

    const originalName = fileItem.file.name.split('.')[0];
    const newFileName = `${originalName}.${fileItem.toFormat.toLowerCase()}`;
    const url = URL.createObjectURL(fileItem.convertedFile);
    const link = document.createElement('a');
    link.href = url;
    link.download = newFileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleRemoveFile = (index: number) => {
    setUploadedFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const handleRemoveAllFiles = () => {
    setUploadedFiles([]);
    setError(null);
  };

  const formatOptions: ComboBoxOption[] = supportedFormats.map((fmt) => ({
    label: fmt,
    value: fmt,
  }));

  return (
    <div className="file-converter">
      <Card title="File Converter">
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {/* Upload Section */}
          <div className="converter-section">
            <TextBlock variant="subtitle">1. Select Files to Convert</TextBlock>
            <FileUpload
              multiple={true}
              accept={supportedFormats.map((fmt) => `.${fmt.toLowerCase()}`).join(',')}
              maxSize={maxFileSize}
              onUpload={handleFileUpload}
            />
          </div>

          {/* Global Destination Format Selection */}
          {uploadedFiles.length > 0 && (
            <div className="converter-section">
              <TextBlock variant="subtitle">2. Select Destination Format</TextBlock>
              <div className="format-group">
                <label className="format-label">Convert All To:</label>
                <ComboBox
                  value={toFormat}
                  onChange={(newFormat) => {
                    setToFormat(newFormat);
                    setUploadedFiles((prev) =>
                      prev.map((item) => ({ ...item, toFormat: newFormat }))
                    );
                  }}
                  options={formatOptions}
                  placeholder="Select format"
                />
              </div>
            </div>
          )}

          {/* Error Message */}
          {error && (
            <div className="converter-section error-section">
              <TextBlock variant="body">⚠️ {error}</TextBlock>
            </div>
          )}

          {/* Files List */}
          {uploadedFiles.length > 0 && (
            <div className="converter-section">
              <TextBlock variant="subtitle">3. Files Ready to Convert</TextBlock>
              <div className="files-list">
                {uploadedFiles.map((fileItem, index) => (
                  <div key={index} className="file-item">
                    <div className="file-item-info">
                      <div className="file-item-header">
                        <span className="file-name">{fileItem.file.name}</span>
                        <span className="file-size">({(fileItem.file.size / 1024 / 1024).toFixed(2)} MB)</span>
                      </div>
                      <div className="file-item-formats">
                        <span className="format-badge from">{fileItem.fromFormat}</span>
                        <span className="format-arrow">→</span>
                        <span className="format-badge to">{fileItem.toFormat}</span>
                      </div>
                    </div>

                    {fileItem.isConverting && (
                      <div className="file-item-progress">
                        <TextBlock variant="body">
                          Converting: {Math.round(fileItem.conversionProgress || 0)}%
                        </TextBlock>
                        <ProgressBar value={fileItem.conversionProgress || 0} max={100} />
                      </div>
                    )}

                    {fileItem.error && (
                      <div className="file-item-error">
                        <TextBlock variant="body">⚠️ {fileItem.error}</TextBlock>
                      </div>
                    )}

                    {fileItem.successMessage && (
                      <div className="file-item-success">
                        <TextBlock variant="body">✓ {fileItem.successMessage}</TextBlock>
                      </div>
                    )}

                    <div className="file-item-actions">
                      {!fileItem.convertedFile && !fileItem.isConverting && (
                        <Button
                          variant="primary"
                          onClick={() => handleConvertFile(index)}
                          size="sm"
                        >
                          Convert
                        </Button>
                      )}

                      {fileItem.convertedFile && (
                        <Button
                          variant="primary"
                          onClick={() => handleDownloadFile(index)}
                          size="sm"
                        >
                          📥 Download
                        </Button>
                      )}

                      <Button
                        variant="secondary"
                        onClick={() => handleRemoveFile(index)}
                        size="sm"
                      >
                        Remove
                      </Button>
                    </div>
                  </div>
                ))}
              </div>

              {uploadedFiles.length > 0 && (
                <Button
                  variant="secondary"
                  onClick={handleRemoveAllFiles}
                  style={{ marginTop: '1rem', width: '100%' }}
                >
                  Clear All Files
                </Button>
              )}
            </div>
          )}
        </div>
      </Card>
    </div>
  );
}

export default FileConverter;
