import React from 'react';

interface RepeatButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  onRepeat?: () => void;
}

export const RepeatButton: React.FC<RepeatButtonProps> = ({ children, onRepeat, ...props }) => {
  const handleMouseDown = () => {
    const interval = setInterval(() => onRepeat?.(), 100);
    const handleMouseUp = () => clearInterval(interval);
    document.addEventListener('mouseup', handleMouseUp);
    return () => document.removeEventListener('mouseup', handleMouseUp);
  };

  return (
    <button
      onMouseDown={handleMouseDown}
      onClick={onRepeat}
      style={{
        padding: '0.75rem 1.5rem',
        background: 'var(--accent)',
        color: '#fff',
        border: 'none',
        borderRadius: 'var(--radius-sm)',
        cursor: 'pointer',
        fontWeight: 600,
        transition: 'all 0.2s',
      }}
      {...props}
    >
      {children}
    </button>
  );
};
