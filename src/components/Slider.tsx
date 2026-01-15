import React, { useState } from 'react';

interface SliderProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

export const Slider: React.FC<SliderProps> = ({ label, value, onChange, ...props }) => {
  const [currentValue, setCurrentValue] = useState(value || 50);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentValue(Number(e.target.value));
    onChange?.(e);
  };

  const percent = typeof currentValue === 'number' ? (currentValue as number) : 50;
  const min = Number(props.min) || 0;
  const max = Number(props.max) || 100;
  const progress = ((percent - min) / (max - min)) * 100;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
      {label && (
        <label style={{ color: 'var(--text)', fontWeight: 600, fontSize: '0.9rem' }}>
          {label}
        </label>
      )}
      <div
        style={{
          position: 'relative',
          width: '100%',
          height: '8px',
          display: 'flex',
          alignItems: 'center',
          backgroundColor: 'var(--border)',
          borderRadius: '4px',
        }}
      >
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: 0,
            height: '8px',
            borderRadius: '4px',
            background: 'var(--accent)',
            width: `${progress}%`,
            pointerEvents: 'none',
            zIndex: 1,
            transform: 'translateY(-50%)',
          }}
        />
        <input
          type="range"
          value={currentValue}
          onChange={handleChange}
          className="slider-input"
          style={{
            width: '100%',
            height: '8px',
            borderRadius: '4px',
            background: 'transparent',
            outline: 'none',
            WebkitAppearance: 'none',
            position: 'relative',
            zIndex: 2,
            margin: 0,
            padding: 0,
          } as any}
          {...props}
        />
      </div>
    </div>
  );
};
