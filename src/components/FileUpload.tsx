import React, { useState } from 'react';

interface FileUploadProps {
  onUpload?: (files: File[]) => void;
  multiple?: boolean;
  accept?: string;
  maxSize?: number;
  onTransform?: (files: File[]) => Promise<void>;
}

export const FileUpload: React.FC<FileUploadProps> = ({
  onUpload,
  multiple = true,
  accept = '*',
  maxSize = 5368709120, // 5GB default
  onTransform,
}) => {
  const [files, setFiles] = useState<File[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
  };

  const handleFiles = (fileList: FileList) => {
    const newFiles = Array.from(fileList).filter((file) => file.size <= maxSize);
    setFiles((prev) => (multiple ? [...prev, ...newFiles] : newFiles));
    onUpload?.(newFiles);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    handleFiles(e.dataTransfer.files);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const removeFile = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const handleTransform = async () => {
    setIsProcessing(true);
    try {
      await onTransform?.(files);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '1.5rem',
        padding: '2rem',
        background: 'var(--surface)',
        borderRadius: 'var(--radius-md)',
        border: '1px solid var(--border)',
      }}
    >
      <div
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onClick={() => fileInputRef.current?.click()}
        style={{
          padding: '3rem 2rem',
          border: `2px dashed ${isDragging ? 'var(--accent)' : 'var(--border)'}`,
          borderRadius: 'var(--radius-md)',
          textAlign: 'center',
          cursor: 'pointer',
          background: isDragging ? 'rgba(249, 115, 22, 0.05)' : 'transparent',
          transition: 'all 0.2s',
        }}
      >
        <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>
          <span className="material-icons" style={{ fontSize: '3rem' }}>folder_open</span>
        </div>
        <p style={{ color: 'var(--text)', fontWeight: 600 }}>
          Drag and drop files here or click to browse
        </p>
        <p style={{ color: 'var(--muted)', fontSize: '0.9rem' }}>
          Max file size: {formatFileSize(maxSize)}
        </p>
      </div>

      <input
        ref={fileInputRef}
        type="file"
        multiple={multiple}
        accept={accept}
        onChange={(e) => e.target.files && handleFiles(e.target.files)}
        style={{ display: 'none' }}
      />

      {files.length > 0 && (
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '0.5rem',
            maxHeight: '300px',
            overflow: 'auto',
          }}
        >
          <h3 style={{ color: 'var(--text)', fontSize: '0.95rem', fontWeight: 600 }}>
            Files ({files.length})
          </h3>
          {files.map((file, idx) => (
            <div
              key={idx}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '0.75rem',
                background: 'var(--bg)',
                borderRadius: '0.5rem',
                border: '1px solid var(--border)',
              }}
            >
              <div>
                <p style={{ color: 'var(--text)', fontSize: '0.9rem', fontWeight: 600 }}>
                  {file.name}
                </p>
                <p style={{ color: 'var(--muted)', fontSize: '0.85rem' }}>
                  {formatFileSize(file.size)}
                </p>
              </div>
              <button
                onClick={() => removeFile(idx)}
                style={{
                  padding: '0.5rem 1rem',
                  background: 'transparent',
                  border: '1px solid var(--border)',
                  color: 'var(--text)',
                  borderRadius: '0.25rem',
                  cursor: 'pointer',
                  fontSize: '0.85rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                }}
              >
                <span className="material-icons" style={{ fontSize: '1rem' }}>close</span>
                Remove
              </button>
            </div>
          ))}
        </div>
      )}

      {files.length > 0 && (
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <button
            onClick={handleTransform}
            disabled={isProcessing}
            style={{
              flex: 1,
              padding: '0.75rem 1.5rem',
              background: 'var(--accent)',
              color: '#fff',
              border: 'none',
              borderRadius: 'var(--radius-sm)',
              cursor: isProcessing ? 'not-allowed' : 'pointer',
              fontWeight: 600,
              opacity: isProcessing ? 0.7 : 1,
            }}
          >
            {isProcessing ? 'Processing...' : 'Transform'}
          </button>
          <button
            onClick={() => setFiles([])}
            style={{
              padding: '0.75rem 1.5rem',
              background: 'transparent',
              color: 'var(--accent)',
              border: '2px solid var(--accent)',
              borderRadius: 'var(--radius-sm)',
              cursor: 'pointer',
              fontWeight: 600,
            }}
          >
            Clear
          </button>
        </div>
      )}
    </div>
  );
};
