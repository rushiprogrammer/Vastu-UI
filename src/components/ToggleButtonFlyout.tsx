import React, { useState, useRef, useEffect } from 'react';

interface ToggleButtonFlyoutProps {
  label?: string;
  icon?: string;
  children: React.ReactNode;
  position?: 'top' | 'bottom' | 'left' | 'right';
  size?: 'sm' | 'md' | 'lg';
  variant?: 'primary' | 'secondary';
  dismissOnClickOutside?: boolean;
  width?: string;
  onOpenChange?: (isOpen: boolean) => void;
}

export const ToggleButtonFlyout: React.FC<ToggleButtonFlyoutProps> = ({
  label,
  icon,
  children,
  position = 'bottom',
  size = 'md',
  variant = 'primary',
  dismissOnClickOutside = true,
  width,
  onOpenChange,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  const sizeStyles = {
    sm: { padding: '8px 16px', fontSize: '0.875rem', minHeight: '36px' },
    md: { padding: '10px 24px', fontSize: '0.9375rem', minHeight: '44px' },
    lg: { padding: '12px 32px', fontSize: '1rem', minHeight: '48px' },
  };

  const flyoutSizeStyles = {
    sm: { width: width || '200px' },
    md: { width: width || '300px' },
    lg: { width: width || '400px' },
  };

  const getPositionStyles = () => {
    const baseStyle = {
      position: 'absolute' as const,
      zIndex: 1000,
      marginTop: position === 'bottom' || position === 'top' ? '0.5rem' : 0,
      marginLeft: position === 'left' || position === 'right' ? '0.5rem' : 0,
    };

    switch (position) {
      case 'top':
        return { ...baseStyle, bottom: '100%', left: 0, right: 0 };
      case 'left':
        return { ...baseStyle, right: '100%', top: 0, bottom: 0 };
      case 'right':
        return { ...baseStyle, left: '100%', top: 0, bottom: 0 };
      case 'bottom':
      default:
        return { ...baseStyle, top: '100%', left: 0, right: 0 };
    }
  };

  const toggleFlyout = () => {
    setIsOpen(!isOpen);
    onOpenChange?.(!isOpen);
  };

  useEffect(() => {
    if (!dismissOnClickOutside) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        onOpenChange?.(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }
  }, [isOpen, dismissOnClickOutside, onOpenChange]);

  const baseButtonStyles = {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '0.5rem',
    borderRadius: 'var(--radius-sm)',
    fontWeight: 600,
    cursor: 'pointer',
    transition: 'all 0.2s var(--ease-smooth)',
    border: 'none',
    outline: 'none',
    letterSpacing: '-0.2px',
    ...sizeStyles[size],
  };

  const getPrimaryStyles = () => ({
    background: isOpen ? 'var(--accent)' : 'var(--accent)',
    color: '#fff',
    boxShadow: isOpen ? '0 4px 12px rgba(249, 115, 22, 0.3)' : '0 2px 6px rgba(249, 115, 22, 0.2)',
    opacity: isOpen ? 0.95 : 1,
  });

  const getSecondaryStyles = () => ({
    background: isOpen ? 'rgba(249, 115, 22, 0.1)' : 'transparent',
    border: '2px solid var(--accent)',
    color: 'var(--accent)',
    boxShadow: isOpen ? '0 2px 8px rgba(249, 115, 22, 0.15)' : 'none',
  });

  const variantStyles = variant === 'primary' ? getPrimaryStyles() : getSecondaryStyles();

  return (
    <div
      ref={containerRef}
      style={{
        position: 'relative',
        display: 'inline-block',
      }}
    >
      <button
        ref={triggerRef}
        onClick={toggleFlyout}
        style={{
          ...baseButtonStyles,
          ...variantStyles,
        }}
      >
        {icon && <span className="material-icons" style={{ fontSize: '1.2em' }}>{icon}</span>}
        {label}
        <span className="material-icons" style={{ fontSize: '1em', marginLeft: 'auto' }}>
          {isOpen ? 'expand_less' : 'expand_more'}
        </span>
      </button>

      {isOpen && (
        <div
          style={{
            ...getPositionStyles(),
            ...flyoutSizeStyles,
            background: 'var(--surface)',
            border: '1px solid var(--border)',
            borderRadius: 'var(--radius-md)',
            boxShadow: 'var(--shadow-md)',
            padding: '1rem',
            animation: 'entrance 0.2s var(--ease-smooth)',
            maxHeight: '400px',
            overflowY: 'auto',
          }}
        >
          {children}
        </div>
      )}
    </div>
  );
};
