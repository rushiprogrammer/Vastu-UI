import React, { useState } from 'react';

interface ToggleButtonProps {
  checked?: boolean;
  onChange?: (checked: boolean) => void;
  children: React.ReactNode;
  onClick?: () => void;
  style?: React.CSSProperties;
}

export const ToggleButton: React.FC<ToggleButtonProps> = ({
  checked = false,
  onChange,
  children,
  onClick,
  style,
}) => {
  const [isChecked, setIsChecked] = useState(checked);

  const handleToggle = () => {
    const newState = !isChecked;
    setIsChecked(newState);
    onChange?.(newState);
    onClick?.();
  };

  return (
    <button
      onClick={handleToggle}
      style={{
        padding: '0.75rem 1.5rem',
        background: isChecked ? 'var(--accent)' : 'var(--border)',
        color: isChecked ? '#fff' : 'var(--text)',
        border: 'none',
        borderRadius: 'var(--radius-sm)',
        cursor: 'pointer',
        fontWeight: 600,
        transition: 'all 0.2s',
        ...style,
      }}
    >
      {children}
    </button>
  );
};
