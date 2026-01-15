import React from 'react';

interface CardProps {
  title?: string;
  children: React.ReactNode;
}

export const Card: React.FC<CardProps> = ({ title, children }) => {
  return (
    <div
      style={{
        padding: '1.5rem',
        background: 'var(--surface)',
        borderRadius: 'var(--radius-md)',
        border: '1px solid var(--border)',
        boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
      }}
    >
      {title && (
        <h2 style={{ color: 'var(--text)', marginBottom: '1rem', fontSize: '1.1rem' }}>
          {title}
        </h2>
      )}
      {children}
    </div>
  );
};
