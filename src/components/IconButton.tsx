import React, { useState } from 'react';

interface IconButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon: string;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'primary' | 'secondary';
  tooltip?: string;
}

export const IconButton: React.FC<IconButtonProps> = ({
  icon,
  size = 'md',
  variant = 'secondary',
  tooltip,
  title,
  ...props
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);

  const sizeStyles = {
    sm: { width: '36px', height: '36px', minWidth: '36px', minHeight: '36px', fontSize: '1.2rem' },
    md: { width: '44px', height: '44px', minWidth: '44px', minHeight: '44px', fontSize: '1.4rem' },
    lg: { width: '52px', height: '52px', minWidth: '52px', minHeight: '52px', fontSize: '1.6rem' },
  };

  const baseStyles = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '50%',
    border: 'none',
    cursor: 'pointer',
    transition: 'all 0.2s var(--ease-smooth)',
    fontWeight: 600,
    position: 'relative' as const,
    flexShrink: 0,
    padding: 0,
    outline: 'none',
    ...sizeStyles[size],
  };

  const getPrimaryStyles = () => ({
    background: isHovered ? 'rgba(249, 115, 22, 0.9)' : 'var(--accent)',
    color: '#fff',
    border: 'none',
    boxShadow: isHovered ? '0 4px 12px rgba(249, 115, 22, 0.3)' : '0 2px 6px rgba(249, 115, 22, 0.2)',
    transform: isHovered ? 'scale(1.08)' : 'scale(1)',
  });

  const getSecondaryStyles = () => ({
    background: isHovered ? 'rgba(249, 115, 22, 0.08)' : 'transparent',
    color: 'var(--accent)',
    border: '1px solid var(--accent)',
    boxShadow: isHovered ? '0 2px 8px rgba(249, 115, 22, 0.15)' : 'none',
    transform: isHovered ? 'scale(1.08)' : 'scale(1)',
  });

  const variantStyles = variant === 'primary' ? getPrimaryStyles() : getSecondaryStyles();

  return (
    <div style={{ position: 'relative', display: 'inline-block' }}>
      <button
        style={{
          ...baseStyles,
          ...variantStyles,
        }}
        onMouseEnter={() => {
          setIsHovered(true);
          if (tooltip) setShowTooltip(true);
        }}
        onMouseLeave={() => {
          setIsHovered(false);
          setShowTooltip(false);
        }}
        title={title || tooltip}
        {...props}
      >
        <span className="material-icons" style={{ fontSize: 'inherit' }}>
          {icon}
        </span>
      </button>

      {showTooltip && tooltip && (
        <div
          style={{
            position: 'absolute',
            bottom: '100%',
            left: '50%',
            transform: 'translateX(-50%)',
            background: 'var(--text)',
            color: 'var(--surface)',
            padding: '0.5rem 0.75rem',
            borderRadius: '0.375rem',
            fontSize: '0.75rem',
            fontWeight: 600,
            whiteSpace: 'nowrap',
            marginBottom: '0.5rem',
            zIndex: 1000,
            animation: 'entrance 0.15s var(--ease-smooth)',
            pointerEvents: 'none',
          }}
        >
          {tooltip}
          <div
            style={{
              position: 'absolute',
              top: '100%',
              left: '50%',
              transform: 'translateX(-50%)',
              width: 0,
              height: 0,
              borderLeft: '4px solid transparent',
              borderRight: '4px solid transparent',
              borderTop: `4px solid var(--text)`,
            }}
          />
        </div>
      )}
    </div>
  );
};
