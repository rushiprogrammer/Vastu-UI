import React from 'react';

interface HyperlinkButtonProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  children: React.ReactNode;
}

export const HyperlinkButton: React.FC<HyperlinkButtonProps> = ({ children, ...props }) => {
  return (
    <a
      style={{
        color: 'var(--accent)',
        textDecoration: 'underline',
        cursor: 'pointer',
        fontSize: 'inherit',
        fontWeight: 600,
        transition: 'opacity 0.2s',
      }}
      {...props}
    >
      {children}
    </a>
  );
};
