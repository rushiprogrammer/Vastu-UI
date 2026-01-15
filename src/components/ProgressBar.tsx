import React from 'react';

interface ProgressBarProps {
  value: number;
  max?: number;
  label?: string;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({ value, max = 100, label }) => {
  const percentage = (value / max) * 100;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
      {label && (
        <label style={{ color: 'var(--text)', fontWeight: 600, fontSize: '0.9rem' }}>
          {label}
        </label>
      )}
      <div
        style={{
          width: '100%',
          height: '8px',
          background: 'var(--border)',
          borderRadius: '4px',
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            height: '100%',
            width: `${percentage}%`,
            background: 'var(--accent)',
            transition: 'width 0.3s ease',
          }}
        />
      </div>
      {label === undefined && (
        <span style={{ color: 'var(--muted)', fontSize: '0.85rem' }}>
          {Math.round(percentage)}%
        </span>
      )}
    </div>
  );
};
