import React, { useState } from 'react';

interface RichEditBoxProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
}

export const RichEditBox: React.FC<RichEditBoxProps> = ({ label, error, ...props }) => {
  const [isFormatting, setIsFormatting] = useState(false);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
      {label && (
        <label style={{ color: 'var(--text)', fontWeight: 600, fontSize: '0.9rem' }}>
          {label}
        </label>
      )}
      {isFormatting && (
        <div
          style={{
            display: 'flex',
            gap: '0.5rem',
            padding: '0.5rem',
            background: 'var(--bg)',
            borderRadius: 'var(--radius-sm)',
            borderBottom: '1px solid var(--border)',
          }}
        >
          <button
            style={{
              padding: '0.25rem 0.75rem',
              background: 'transparent',
              border: '1px solid var(--border)',
              borderRadius: '0.25rem',
              cursor: 'pointer',
              fontSize: '0.85rem',
            }}
          >
            B
          </button>
          <button
            style={{
              padding: '0.25rem 0.75rem',
              background: 'transparent',
              border: '1px solid var(--border)',
              borderRadius: '0.25rem',
              cursor: 'pointer',
              fontSize: '0.85rem',
              fontStyle: 'italic',
            }}
          >
            I
          </button>
          <button
            style={{
              padding: '0.25rem 0.75rem',
              background: 'transparent',
              border: '1px solid var(--border)',
              borderRadius: '0.25rem',
              cursor: 'pointer',
              fontSize: '0.85rem',
              textDecoration: 'underline',
            }}
          >
            U
          </button>
        </div>
      )}
      <textarea
        style={{
          width: '100%',
          minHeight: '120px',
          borderRadius: 'var(--radius-sm)',
          border: `1.5px solid ${error ? '#e11d48' : 'var(--border)'}`,
          padding: '1rem',
          background: 'var(--surface)',
          color: 'var(--text)',
          fontSize: '0.95rem',
          transition: 'all 0.2s',
          boxSizing: 'border-box',
          fontFamily: 'inherit',
          resize: 'vertical',
        }}
        onFocus={() => setIsFormatting(true)}
        onBlur={() => setIsFormatting(false)}
        {...props}
      />
      {error && <span style={{ color: '#e11d48', fontSize: '0.85rem' }}>{error}</span>}
    </div>
  );
};
