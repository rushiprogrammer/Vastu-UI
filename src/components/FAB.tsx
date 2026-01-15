import React, { useState } from 'react';

interface FABProps {
  icon: string;
  label?: string;
  onClick?: () => void;
  position?: 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left';
  size?: 'sm' | 'md' | 'lg';
}

export const FAB: React.FC<FABProps> = ({
  icon,
  label,
  onClick,
  position = 'bottom-right',
  size = 'md',
}) => {
  const [isHovered, setIsHovered] = useState(false);

  const sizeStyles = {
    sm: { width: '48px', height: '48px', fontSize: '1.2rem' },
    md: { width: '56px', height: '56px', fontSize: '1.5rem' },
    lg: { width: '64px', height: '64px', fontSize: '1.8rem' },
  };

  const positionStyles = {
    'bottom-right': { bottom: '24px', right: '24px' },
    'bottom-left': { bottom: '24px', left: '24px' },
    'top-right': { top: '24px', right: '24px' },
    'top-left': { top: '24px', left: '24px' },
  };

  return (
    <div
      style={{
        position: 'fixed',
        ...positionStyles[position],
        zIndex: 999,
      }}
    >
      <button
        onClick={onClick}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        style={{
          ...sizeStyles[size],
          borderRadius: '50%',
          background: 'var(--accent)',
          color: '#fff',
          border: 'none',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: isHovered
            ? '0 12px 32px rgba(249, 115, 22, 0.4)'
            : '0 8px 24px rgba(0, 0, 0, 0.15)',
          transform: isHovered ? 'scale(1.1) translateY(-4px)' : 'scale(1)',
          transition: 'all 0.3s cubic-bezier(0.33, 0, 0.67, 1)',
        }}
        title={label}
      >
        <span className="material-icons" style={{ fontSize: 'inherit' }}>
          {icon}
        </span>
      </button>
      {label && isHovered && (
        <div
          style={{
            position: 'absolute',
            bottom: '100%',
            right: 0,
            background: 'var(--text)',
            color: 'var(--surface)',
            padding: '0.5rem 0.75rem',
            borderRadius: 'var(--radius-sm)',
            fontSize: '0.85rem',
            whiteSpace: 'nowrap',
            marginBottom: '0.5rem',
            pointerEvents: 'none',
          }}
        >
          {label}
        </div>
      )}
    </div>
  );
};
