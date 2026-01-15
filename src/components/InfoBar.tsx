import React, { useState } from 'react';

interface InfoBarProps {
  severity?: 'informational' | 'success' | 'warning' | 'error';
  title?: string;
  message: string;
  closable?: boolean;
  onClose?: () => void;
}

export const InfoBar: React.FC<InfoBarProps> = ({
  severity = 'informational',
  title,
  message,
  closable = true,
  onClose,
}) => {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  const handleClose = () => {
    setIsVisible(false);
    onClose?.();
  };

  const colorMap = {
    informational: { bg: '#e0f2fe', border: '#0284c7', icon: 'ℹ️' },
    success: { bg: '#ecfdf5', border: '#10b981', icon: '✓' },
    warning: { bg: '#fffbeb', border: '#f59e0b', icon: '⚠️' },
    error: { bg: '#fef2f2', border: '#ef4444', icon: '✕' },
  };

  const colors = colorMap[severity];

  return (
    <div
      style={{
        background: colors.bg,
        border: `2px solid ${colors.border}`,
        borderRadius: 'var(--radius-md)',
        padding: '1rem',
        display: 'flex',
        gap: '1rem',
        alignItems: 'flex-start',
      }}
    >
      <span style={{ fontSize: '1.2rem' }}>{colors.icon}</span>
      <div style={{ flex: 1 }}>
        {title && <strong style={{ color: 'var(--text)', display: 'block' }}>{title}</strong>}
        <p style={{ margin: title ? '0.5rem 0 0' : 0, color: 'var(--text)' }}>{message}</p>
      </div>
      {closable && (
        <button
          onClick={handleClose}
          style={{
            background: 'transparent',
            border: 'none',
            cursor: 'pointer',
            fontSize: '1.2rem',
            color: colors.border,
          }}
        >
          ✕
        </button>
      )}
    </div>
  );
};
