import React from 'react';

interface TextBlockProps {
  children: React.ReactNode;
  variant?: 'body' | 'caption' | 'subtitle' | 'title';
}

export const TextBlock: React.FC<TextBlockProps> = ({ children, variant = 'body' }) => {
  const styles = {
    body: { fontSize: '0.95rem', lineHeight: 1.5 },
    caption: { fontSize: '0.85rem', color: 'var(--muted)' },
    subtitle: { fontSize: '1.1rem', fontWeight: 600 },
    title: { fontSize: '1.5rem', fontWeight: 700 },
  };

  return (
    <p
      style={{
        color: 'var(--text)',
        margin: 0,
        ...styles[variant],
      }}
    >
      {children}
    </p>
  );
};
