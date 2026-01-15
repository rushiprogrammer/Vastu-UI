import React from 'react';

interface InfoBadgeProps {
  value?: string | number;
  color?: 'default' | 'success' | 'warning' | 'error';
  children?: React.ReactNode;
}

export const InfoBadge: React.FC<InfoBadgeProps> = ({ value, color = 'default', children }) => {
  const colorMap = {
    default: 'var(--accent)',
    success: '#10b981',
    warning: '#f59e0b',
    error: '#ef4444',
  };

  return (
    <div style={{ position: 'relative', display: 'inline-block' }}>
      {children}
      {value !== undefined && (
        <span
          style={{
            position: 'absolute',
            top: '-8px',
            right: '-8px',
            background: colorMap[color],
            color: '#fff',
            borderRadius: '50%',
            width: '24px',
            height: '24px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '0.75rem',
            fontWeight: 700,
          }}
        >
          {value}
        </span>
      )}
    </div>
  );
};
