import React, { useState, useRef, useEffect } from 'react';

interface FlyoutProps {
  trigger: React.ReactNode;
  children: React.ReactNode;
  position?: 'top' | 'bottom' | 'left' | 'right';
  size?: 'sm' | 'md' | 'lg';
  dismissOnClickOutside?: boolean;
  onOpenChange?: (isOpen: boolean) => void;
  width?: string;
}

export const Flyout: React.FC<FlyoutProps> = ({
  trigger,
  children,
  position = 'bottom',
  size = 'md',
  dismissOnClickOutside = true,
  onOpenChange,
  width,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);

  const sizeStyles = {
    sm: { width: width || '200px' },
    md: { width: width || '320px' },
    lg: { width: width || '480px' },
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

  const handleClickOutside = (event: MouseEvent) => {
    if (
      dismissOnClickOutside &&
      containerRef.current &&
      !containerRef.current.contains(event.target as Node)
    ) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      onOpenChange?.(true);
    } else {
      onOpenChange?.(false);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, dismissOnClickOutside, onOpenChange]);

  return (
    <div
      ref={containerRef}
      style={{
        position: 'relative',
        display: 'inline-block',
      }}
    >
      {/* Trigger */}
      <div
        ref={triggerRef}
        onClick={() => setIsOpen(!isOpen)}
        style={{
          cursor: 'pointer',
        }}
      >
        {trigger}
      </div>

      {/* Flyout Panel */}
      {isOpen && (
        <div
          style={{
            ...getPositionStyles(),
            ...sizeStyles[size],
            background: 'var(--surface)',
            border: '1px solid var(--border)',
            borderRadius: 'var(--radius-md)',
            boxShadow: 'var(--shadow-md)',
            animation: 'entrance 0.2s var(--ease-smooth)',
            overflow: 'hidden',
          }}
        >
          <div
            style={{
              padding: '1rem',
              maxHeight: '400px',
              overflowY: 'auto',
              color: 'var(--text)',
            }}
          >
            {children}
          </div>
        </div>
      )}
    </div>
  );
};
