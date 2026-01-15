import React, { useState } from 'react';

interface ExpanderProps {
  title: string;
  children: React.ReactNode;
  defaultExpanded?: boolean;
}

export const Expander: React.FC<ExpanderProps> = ({ title, children, defaultExpanded = false }) => {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded);

  return (
    <div
      style={{
        border: '1px solid var(--border)',
        borderRadius: 'var(--radius-md)',
        overflow: 'hidden',
      }}
    >
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        style={{
          width: '100%',
          padding: '1rem',
          background: 'var(--surface)',
          border: 'none',
          borderBottom: isExpanded ? '1px solid var(--border)' : 'none',
          color: 'var(--text)',
          fontWeight: 600,
          textAlign: 'left',
          cursor: 'pointer',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          transition: 'all 0.2s',
        }}
      >
        <span>{title}</span>
        <span
          style={{
            transform: isExpanded ? 'rotate(180deg)' : 'rotate(0deg)',
            transition: 'transform 0.2s',
          }}
        >
          ▼
        </span>
      </button>
      {isExpanded && (
        <div style={{ padding: '1rem', borderTop: '1px solid var(--border)' }}>
          {children}
        </div>
      )}
    </div>
  );
};
