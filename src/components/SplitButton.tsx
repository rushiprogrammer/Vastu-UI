import React, { useState } from 'react';

interface SplitButtonOption {
  label: string;
  icon?: string;
  onClick: () => void;
  disabled?: boolean;
}

interface SplitButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  primaryLabel: string;
  primaryIcon?: string;
  options: SplitButtonOption[];
  variant?: 'primary' | 'secondary';
  size?: 'sm' | 'md' | 'lg';
  onPrimaryClick?: () => void;
}

export const SplitButton: React.FC<SplitButtonProps> = ({
  primaryLabel,
  primaryIcon,
  options,
  variant = 'primary',
  size = 'md',
  onPrimaryClick,
  ...props
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const sizeStyles = {
    sm: { padding: '8px 12px', fontSize: '0.875rem', minHeight: '36px' },
    md: { padding: '10px 16px', fontSize: '0.9375rem', minHeight: '44px' },
    lg: { padding: '12px 20px', fontSize: '1rem', minHeight: '48px' },
  };

  const baseStyle = {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '0.5rem',
    borderRadius: 'var(--radius-sm)',
    border: 'none',
    cursor: 'pointer',
    transition: 'all 0.2s var(--ease-smooth)',
    fontWeight: 600,
    letterSpacing: '-0.2px',
    outline: 'none',
    position: 'relative' as const,
  };

  const getPrimaryStyles = () => ({
    background: 'var(--accent)',
    color: '#fff',
    boxShadow: isHovered ? '0 4px 12px rgba(249, 115, 22, 0.3)' : '0 2px 6px rgba(249, 115, 22, 0.2)',
  });

  const getSecondaryStyles = () => ({
    background: isHovered ? 'rgba(249, 115, 22, 0.08)' : 'transparent',
    border: '2px solid var(--accent)',
    color: 'var(--accent)',
    boxShadow: isHovered ? '0 2px 8px rgba(249, 115, 22, 0.15)' : 'none',
  });

  const variantStyles = variant === 'primary' ? getPrimaryStyles() : getSecondaryStyles();

  return (
    <div style={{ display: 'inline-flex', position: 'relative' }}>
      <div
        style={{
          display: 'inline-flex',
          borderRadius: 'var(--radius-sm)',
          overflow: 'hidden',
          border: variant === 'secondary' ? '2px solid var(--accent)' : 'none',
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Primary Button */}
        <button
          style={{
            ...baseStyle,
            ...variantStyles,
            borderRadius: variant === 'secondary' ? '0' : 'var(--radius-sm) 0 0 var(--radius-sm)',
            border: 'none',
            paddingRight: '1rem',
            ...sizeStyles[size],
          }}
          onClick={() => {
            onPrimaryClick?.();
          }}
          {...props}
        >
          {primaryIcon && <span className="material-icons" style={{ fontSize: '1.2em' }}>{primaryIcon}</span>}
          {primaryLabel}
        </button>

        {/* Dropdown Trigger */}
        <button
          style={{
            ...baseStyle,
            background: variant === 'primary' ? 'var(--accent)' : 'transparent',
            color: variant === 'primary' ? '#fff' : 'var(--accent)',
            borderRadius: variant === 'secondary' ? '0' : '0 var(--radius-sm) var(--radius-sm) 0',
            border: 'none',
            padding: `${size === 'sm' ? '8px 10px' : size === 'lg' ? '12px 14px' : '10px 12px'}`,
            minWidth: '44px',
            boxShadow: isHovered ? (variant === 'primary' ? '0 4px 12px rgba(249, 115, 22, 0.3)' : '0 2px 8px rgba(249, 115, 22, 0.15)') : (variant === 'primary' ? '0 2px 6px rgba(249, 115, 22, 0.2)' : 'none'),
            borderLeft: variant === 'secondary' ? 'none' : '1px solid rgba(255, 255, 255, 0.2)',
            cursor: 'pointer',
          }}
          onClick={() => setIsOpen(!isOpen)}
        >
          <span className="material-icons" style={{ fontSize: '1.2em' }}>
            expand_more
          </span>
        </button>
      </div>

      {/* Dropdown Menu */}
      {isOpen && (
        <div
          style={{
            position: 'absolute',
            top: '100%',
            right: 0,
            background: 'var(--surface)',
            border: '1px solid var(--border)',
            borderRadius: 'var(--radius-sm)',
            marginTop: '0.25rem',
            minWidth: '200px',
            zIndex: 100,
            boxShadow: 'var(--shadow-md)',
            animation: 'entrance 0.2s var(--ease-smooth)',
          }}
        >
          {options.map((option, idx) => (
            <button
              key={idx}
              onClick={() => {
                option.onClick();
                setIsOpen(false);
              }}
              disabled={option.disabled}
              style={{
                width: '100%',
                padding: '0.75rem 1rem',
                background: 'transparent',
                border: 'none',
                borderBottom: idx < options.length - 1 ? `1px solid var(--border)` : 'none',
                color: option.disabled ? 'var(--muted)' : 'var(--text)',
                cursor: option.disabled ? 'not-allowed' : 'pointer',
                textAlign: 'left',
                fontSize: '0.9375rem',
                fontWeight: 500,
                letterSpacing: '-0.2px',
                transition: 'all 0.15s var(--ease-smooth)',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
              }}
              onMouseEnter={(e) => {
                if (!option.disabled) {
                  (e.currentTarget as HTMLButtonElement).style.background = 'var(--bg)';
                }
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLButtonElement).style.background = 'transparent';
              }}
            >
              {option.icon && (
                <span className="material-icons" style={{ fontSize: '1.1em' }}>
                  {option.icon}
                </span>
              )}
              {option.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
