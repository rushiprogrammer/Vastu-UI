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
    sm: { padding: '8px 16px', fontSize: '0.875rem', minHeight: '36px' },
    md: { padding: '10px 24px', fontSize: '0.9375rem', minHeight: '44px' },
    lg: { padding: '12px 32px', fontSize: '1rem', minHeight: '48px' },
  };

  const baseStyles = {
    borderRadius: 'var(--radius-sm)',
    fontWeight: 600,
    cursor: 'pointer',
    transition: 'all 0.2s var(--ease-smooth)',
    border: 'none',
    outline: 'none',
    letterSpacing: '-0.2px',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    whiteSpace: 'nowrap',
    WebkitUserSelect: 'none',
    ...sizeStyles[size],
  } as any;

  const getPrimaryStyles = () => ({
    background: 'var(--accent)',
    color: '#fff',
    transform: isActive ? 'scale(0.98)' : isHovered ? 'translateY(-1px)' : 'scale(1)',
    boxShadow: isActive ? '0 1px 3px rgba(249, 115, 22, 0.2)' : isHovered ? '0 4px 12px rgba(249, 115, 22, 0.3)' : '0 2px 6px rgba(249, 115, 22, 0.2)',
    opacity: isActive ? 0.95 : isHovered ? 0.95 : 1,
  });

  const getSecondaryStyles = () => ({
    background: isActive ? 'var(--accent)' : isHovered ? 'rgba(249, 115, 22, 0.08)' : 'transparent',
    border: '2px solid var(--accent)',
    color: isActive ? '#fff' : 'var(--accent)',
    transform: isActive ? 'scale(0.98)' : isHovered ? 'translateY(-1px)' : 'scale(1)',
    boxShadow: isActive ? '0 1px 3px rgba(249, 115, 22, 0.1)' : isHovered ? '0 2px 8px rgba(249, 115, 22, 0.15)' : 'none',
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
