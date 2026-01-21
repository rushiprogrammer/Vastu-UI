import { useState } from 'react';
import {
  FileUpload,
  Button,
  Card,
  ProgressBar,
  TextBlock,
} from './index';
import '../styles/file-converter.css';

interface ConversionTask {
  id: string;
  fromFormat: string;
  toFormat: string;
  isConverting?: boolean;
  conversionProgress?: number;
  convertedFile?: Blob | null;
  error?: string | null;
  successMessage?: string | null;
}

interface FileItem {
  id: string;
  file: File;
  fromFormat: string;
  conversionTasks: ConversionTask[];
  totalProgress?: number;
  hasConvertedFiles?: boolean;
}

export interface FileConverterProps {
  supportedFormats?: string[];
  onConvert?: (file: File, fromFormat: string, toFormat: string) => Promise<Blob>;
  maxFileSize?: number;
}

export function FileConverter({
  supportedFormats = ['PDF', 'DOCX', 'XLSX', 'PNG', 'JPG', 'WEBP', 'MP4', 'MP3', 'GIF', 'SVG', 'HEIC', 'TIFF'],
  onConvert,
  maxFileSize = 5368709120, // 5GB default
}: FileConverterProps) {
  const [uploadedFiles, setUploadedFiles] = useState<FileItem[]>([]);
  const [selectedFormats, setSelectedFormats] = useState<string[]>(['DOCX', 'PDF']);
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
        id: `${Date.now()}-${Math.random()}`,
        file,
        fromFormat: file.name.split('.').pop()?.toUpperCase() || 'PDF',
        conversionTasks: selectedFormats.map((fmt) => ({
          id: `${Date.now()}-${Math.random()}`,
          fromFormat: file.name.split('.').pop()?.toUpperCase() || 'PDF',
          toFormat: fmt,
        })),
      }));

    if (newFiles.length > 0) {
      setUploadedFiles((prev) => [...prev, ...newFiles]);
      setError(null);
    }
  };

  const handleConvertTask = async (fileIndex: number, taskIndex: number) => {
    const fileItem = uploadedFiles[fileIndex];
    const task = fileItem.conversionTasks[taskIndex];
    if (!fileItem || !task) return;

    if (task.fromFormat === task.toFormat) {
      const updated = [...uploadedFiles];
      updated[fileIndex].conversionTasks[taskIndex].error = 'Source and destination formats must be different';
      setUploadedFiles(updated);
      return;
    }

    const updated = [...uploadedFiles];
    updated[fileIndex].conversionTasks[taskIndex].isConverting = true;
    updated[fileIndex].conversionTasks[taskIndex].conversionProgress = 0;
    updated[fileIndex].conversionTasks[taskIndex].error = null;
    updated[fileIndex].conversionTasks[taskIndex].successMessage = null;
    setUploadedFiles(updated);

    try {
      const progressInterval = setInterval(() => {
        setUploadedFiles((prev) => {
          const newState = [...prev];
          const currentProgress = newState[fileIndex].conversionTasks[taskIndex].conversionProgress || 0;
          if (currentProgress >= 90) {
            clearInterval(progressInterval);
            return newState;
          }
          newState[fileIndex].conversionTasks[taskIndex].conversionProgress = currentProgress + Math.random() * 30;
          return newState;
        });
      }, 500);

      let result: Blob;
      if (onConvert) {
        result = await onConvert(fileItem.file, task.fromFormat, task.toFormat);
      } else {
        await new Promise((resolve) => setTimeout(resolve, 2000));
        result = fileItem.file;
      }

      const finalUpdate = [...uploadedFiles];
      clearInterval(progressInterval);
      finalUpdate[fileIndex].conversionTasks[taskIndex].conversionProgress = 100;
      finalUpdate[fileIndex].conversionTasks[taskIndex].convertedFile = result;
      finalUpdate[fileIndex].conversionTasks[taskIndex].successMessage = `Converted to ${task.toFormat}`;
      finalUpdate[fileIndex].conversionTasks[taskIndex].isConverting = false;
      finalUpdate[fileIndex].hasConvertedFiles = true;
      setUploadedFiles(finalUpdate);
    } catch (err) {
      const errorUpdate = [...uploadedFiles];
      errorUpdate[fileIndex].conversionTasks[taskIndex].error = `Conversion failed: ${err instanceof Error ? err.message : 'Unknown error'}`;
      errorUpdate[fileIndex].conversionTasks[taskIndex].isConverting = false;
      setUploadedFiles(errorUpdate);
    }
  };

  const handleConvertAllTasks = async (fileIndex: number) => {
    const fileItem = uploadedFiles[fileIndex];
    if (!fileItem) return;

    for (let i = 0; i < fileItem.conversionTasks.length; i++) {
      const task = fileItem.conversionTasks[i];
      if (!task.convertedFile && !task.isConverting) {
        await handleConvertTask(fileIndex, i);
      }
    }
  };

  const handleDownloadTask = (fileIndex: number, taskIndex: number) => {
    const fileItem = uploadedFiles[fileIndex];
    const task = fileItem.conversionTasks[taskIndex];
    if (!task.convertedFile || !fileItem.file) return;

    const originalName = fileItem.file.name.split('.')[0];
    const newFileName = `${originalName}.${task.toFormat.toLowerCase()}`;
    const url = URL.createObjectURL(task.convertedFile);
    const link = document.createElement('a');
    link.href = url;
    link.download = newFileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleRemoveFile = (fileIndex: number) => {
    setUploadedFiles((prev) => prev.filter((_, i) => i !== fileIndex));
  };

  const handleRemoveAllFiles = () => {
    setUploadedFiles([]);
    setError(null);
  };

  const handleToggleFormat = (format: string) => {
    setSelectedFormats((prev) =>
      prev.includes(format) ? prev.filter((f) => f !== format) : [...prev, format]
    );
  };

  return (
    <div className="file-converter cloud-converter">
      <Card title="Cloud File Converter">
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          {/* Format Selection */}
          <div className="converter-section">
            <TextBlock variant="subtitle">Select Output Formats</TextBlock>
            <p style={{ fontSize: '13px', color: 'var(--muted)', margin: '0 0 1rem 0' }}>
              Choose which formats you want to convert your files to
            </p>
            <div className="format-grid">
              {supportedFormats.map((fmt) => (
                <label key={fmt} className="format-checkbox">
                  <input
                    type="checkbox"
                    checked={selectedFormats.includes(fmt)}
                    onChange={() => handleToggleFormat(fmt)}
                    style={{ cursor: 'pointer' }}
                  />
                  <span className="format-label-text">{fmt}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Upload Section */}
          <div className="converter-section">
            <TextBlock variant="subtitle">Upload Files</TextBlock>
            <div className="upload-wrapper">
              <FileUpload
                multiple={true}
                accept={supportedFormats.map((fmt) => `.${fmt.toLowerCase()}`).join(',')}
                maxSize={maxFileSize}
                onUpload={handleFileUpload}
              />
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <div className="converter-section error-section">
              <TextBlock variant="body">⚠️ {error}</TextBlock>
            </div>
          )}

          {/* Files List */}
          {uploadedFiles.length > 0 && (
            <div className="converter-section">
              <div className="files-header">
                <TextBlock variant="subtitle">{uploadedFiles.length} File(s) in Queue</TextBlock>
                <Button
                  variant="secondary"
                  onClick={handleRemoveAllFiles}
                  size="sm"
                >
                  Clear All
                </Button>
              </div>

              <div className="files-list cloud-style">
                {uploadedFiles.map((fileItem, fileIndex) => (
                  <div key={fileItem.id} className="file-item cloud-file-item">
                    <div className="file-item-main">
                      <div className="file-item-info">
                        <div className="file-info-icon">📄</div>
                        <div className="file-info-text">
                          <div className="file-item-name">{fileItem.file.name}</div>
                          <div className="file-item-size">
                            {(fileItem.file.size / 1024 / 1024).toFixed(2)} MB • {fileItem.fromFormat}
                          </div>
                        </div>
                      </div>

                      <div className="conversion-tasks">
                        {fileItem.conversionTasks.map((task, taskIndex) => (
                          <div key={task.id} className="conversion-task">
                            <div className="task-header">
                              <span className="task-format">
                                {fileItem.fromFormat} → {task.toFormat}
                              </span>
                              {task.successMessage && <span className="task-status success">✓</span>}
                              {task.error && <span className="task-status error">✕</span>}
                              {task.isConverting && <span className="task-status converting">⟳</span>}
                            </div>

                            {task.isConverting && (
                              <div className="task-progress">
                                <ProgressBar value={task.conversionProgress || 0} max={100} />
                                <span className="progress-text">{Math.round(task.conversionProgress || 0)}%</span>
                              </div>
                            )}

                            {task.error && (
                              <div className="task-error-msg">{task.error}</div>
                            )}

                            {task.successMessage && (
                              <div className="task-success-msg">{task.successMessage}</div>
                            )}

                            <div className="task-actions">
                              {!task.convertedFile && !task.isConverting && (
                                <Button
                                  variant="primary"
                                  onClick={() => handleConvertTask(fileIndex, taskIndex)}
                                  size="sm"
                                >
                                  Convert
                                </Button>
                              )}

                              {task.convertedFile && (
                                <Button
                                  variant="primary"
                                  onClick={() => handleDownloadTask(fileIndex, taskIndex)}
                                  size="sm"
                                >
                                  ↓ Download
                                </Button>
                              )}

                              {task.isConverting && (
                                <Button
                                  variant="secondary"
                                  disabled
                                  size="sm"
                                >
                                  Converting...
                                </Button>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="file-item-actions">
                      <Button
                        variant="primary"
                        onClick={() => handleConvertAllTasks(fileIndex)}
                        style={{ flex: 1 }}
                      >
                        Convert All ({fileItem.conversionTasks.length})
                      </Button>
                      <Button
                        variant="secondary"
                        onClick={() => handleRemoveFile(fileIndex)}
                      >
                        Remove
                      </Button>
                    </div>
                  </div>
                ))}
              </div>

              {uploadedFiles.some((f) => f.hasConvertedFiles) && (
                <Button
                  variant="primary"
                  style={{ width: '100%', marginTop: '1rem' }}
                >
                  📦 Download All Converted Files
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
