import React, { useState } from 'react';

interface PasswordBoxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export const PasswordBox: React.FC<PasswordBoxProps> = ({ label, error, ...props }) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
      {label && (
        <label style={{ color: 'var(--text)', fontWeight: 600, fontSize: '0.9rem' }}>
          {label}
        </label>
      )}
      <input
        type="password"
        style={{
          width: '100%',
          height: '48px',
          borderRadius: 'var(--radius-sm)',
          border: `1.5px solid ${error ? '#e11d48' : isFocused ? 'var(--accent)' : 'var(--border)'}`,
          padding: '0 1rem',
          background: 'var(--surface)',
          color: 'var(--text)',
          fontSize: '0.95rem',
          transition: 'all 0.2s',
          boxSizing: 'border-box',
          outline: 'none',
          boxShadow: isFocused ? '0 0 0 3px rgba(249, 115, 22, 0.1)' : 'none',
        }}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        {...props}
      />
      {error && <span style={{ color: '#e11d48', fontSize: '0.85rem' }}>{error}</span>}
    </div>
  );
};
