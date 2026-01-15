import React from 'react';

interface RadioProps {
  checked: boolean;
  onChange: (value: string) => void;
  label: string;
  name: string;
  value: string;
}

export const Radio: React.FC<RadioProps> = ({ checked, onChange, label, name, value }) => {
  return (
    <label
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem',
        cursor: 'pointer',
        userSelect: 'none',
      }}
    >
      <input
        type="radio"
        name={name}
        value={value}
        checked={checked}
        onChange={(e) => onChange(e.target.value)}
        style={{
          appearance: 'none',
          width: '20px',
          height: '20px',
          border: '2px solid var(--border)',
          borderRadius: '50%',
          cursor: 'pointer',
          transition: 'all 0.2s',
          background: checked ? 'var(--accent)' : 'var(--surface)',
        }}
      />
      <span style={{ color: 'var(--text)', fontSize: '0.95rem' }}>{label}</span>
    </label>
  );
};
