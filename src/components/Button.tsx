import React, { useState } from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  children,
  ...props
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isActive, setIsActive] = useState(false);

  const sizeStyles = {
    sm: { padding: '0.5rem 1rem', fontSize: '0.85rem' },
    md: { padding: '0.75rem 1.5rem', fontSize: '0.95rem' },
    lg: { padding: '1rem 2rem', fontSize: '1rem' },
  };

  const baseStyles = {
    borderRadius: 'var(--radius-sm)',
    fontWeight: 600,
    cursor: 'pointer',
    transition: 'all 0.3s cubic-bezier(0.33, 0, 0.67, 1)',
    border: 'none',
    outline: 'none',
    ...sizeStyles[size],
  };

  const getPrimaryStyles = () => ({
    background: isActive ? '#e85d04' : isHovered ? '#fb8500' : 'var(--accent)',
    color: '#fff',
    transform: isActive ? 'scale(0.98)' : isHovered ? 'translateY(-2px)' : 'scale(1)',
    boxShadow: isHovered ? '0 8px 20px rgba(249, 115, 22, 0.3)' : '0 2px 8px rgba(0, 0, 0, 0.1)',
  });

  const getSecondaryStyles = () => ({
    background: isActive ? 'var(--accent)' : isHovered ? 'rgba(249, 115, 22, 0.1)' : 'transparent',
    border: '2px solid var(--accent)',
    color: isActive ? '#fff' : 'var(--accent)',
    transform: isActive ? 'scale(0.98)' : isHovered ? 'translateY(-2px)' : 'scale(1)',
    boxShadow: isHovered ? '0 8px 20px rgba(249, 115, 22, 0.2)' : 'none',
  });

  const variantStyles = variant === 'primary' ? getPrimaryStyles() : getSecondaryStyles();

  return (
    <button
      style={{
        ...baseStyles,
        ...variantStyles,
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onMouseDown={() => setIsActive(true)}
      onMouseUp={() => setIsActive(false)}
      {...props}
    >
      {children}
    </button>
  );
};
