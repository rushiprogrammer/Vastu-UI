import React from 'react';

interface CheckboxProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label: string;
}

export const Checkbox: React.FC<CheckboxProps> = ({ checked, onChange, label }) => {
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
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        style={{
          appearance: 'none',
          width: '20px',
          height: '20px',
          border: '2px solid var(--border)',
          borderRadius: '4px',
          cursor: 'pointer',
          transition: 'all 0.2s',
          background: checked ? 'var(--accent)' : 'var(--surface)',
        }}
      />
      <span style={{ color: 'var(--text)', fontSize: '0.95rem' }}>{label}</span>
    </label>
  );
};
