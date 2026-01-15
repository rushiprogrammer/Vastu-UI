import React from 'react';

interface StackPanelProps {
  direction?: 'horizontal' | 'vertical';
  gap?: string;
  children: React.ReactNode;
}

export const StackPanel: React.FC<StackPanelProps> = ({ direction = 'vertical', gap = '1rem', children }) => {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: direction === 'horizontal' ? 'row' : 'column',
        gap,
      }}
    >
      {children}
    </div>
  );
};
