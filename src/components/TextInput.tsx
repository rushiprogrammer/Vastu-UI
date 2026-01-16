import React, { useState } from 'react';

interface TextInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export const TextInput: React.FC<TextInputProps> = ({ label, error, ...props }) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
      {label && (
        <label style={{ color: 'var(--text)', fontWeight: 600, fontSize: '0.875rem', letterSpacing: '-0.2px' }}>
          {label}
        </label>
      )}
      <input
        style={{
          width: '100%',
          height: '44px',
          lineHeight: '44px',
          borderRadius: 'var(--radius-sm)',
          border: `1.5px solid ${error ? '#e11d48' : isFocused ? 'var(--accent)' : 'var(--border)'}`,
          padding: '0 1rem',
          background: 'var(--surface)',
          color: 'var(--text)',
          fontSize: '1rem',
          transition: 'all 0.2s var(--ease-smooth)',
          boxSizing: 'border-box',
          outline: 'none',
          boxShadow: isFocused ? '0 0 0 3px rgba(249, 115, 22, 0.1)' : 'none',
          letterSpacing: '-0.2px',
        }}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        {...props}
      />
      {error && <span style={{ color: '#e11d48', fontSize: '0.8125rem', letterSpacing: '-0.2px' }}>{error}</span>}
    </div>
  );
};
