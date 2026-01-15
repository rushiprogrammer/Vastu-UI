import React, { useState } from 'react';

interface ToggleSwitchProps {
  checked?: boolean;
  onChange?: (checked: boolean) => void;
  label?: string;
  disabled?: boolean;
}

export const ToggleSwitch: React.FC<ToggleSwitchProps> = ({
  checked = false,
  onChange,
  label,
  disabled = false,
}) => {
  const [isChecked, setIsChecked] = useState(checked);

  const handleChange = () => {
    if (!disabled) {
      const newState = !isChecked;
      setIsChecked(newState);
      onChange?.(newState);
    }
  };

  return (
    <label
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '1rem',
        cursor: disabled ? 'not-allowed' : 'pointer',
        opacity: disabled ? 0.5 : 1,
      }}
    >
      <div
        style={{
          width: '44px',
          height: '24px',
          background: isChecked ? 'var(--accent)' : 'var(--border)',
          borderRadius: '12px',
          position: 'relative',
          transition: 'background 0.3s',
        }}
      >
        <div
          style={{
            width: '20px',
            height: '20px',
            background: '#fff',
            borderRadius: '50%',
            position: 'absolute',
            top: '2px',
            left: isChecked ? '22px' : '2px',
            transition: 'left 0.3s',
          }}
        />
      </div>
      <input
        type="checkbox"
        checked={isChecked}
        onChange={handleChange}
        disabled={disabled}
        style={{ display: 'none' }}
      />
      {label && <span style={{ color: 'var(--text)', fontWeight: 600 }}>{label}</span>}
    </label>
  );
};
