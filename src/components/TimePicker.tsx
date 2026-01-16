import React, { useState } from 'react';

interface TimePickerProps {
  label?: string;
  value?: string;
  onChange?: (time: string) => void;
}

export const TimePicker: React.FC<TimePickerProps> = ({ label, value = '', onChange }) => {
  const [selectedTime, setSelectedTime] = useState(value);
  const [isFocused, setIsFocused] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const time = e.target.value;
    setSelectedTime(time);
    onChange?.(time);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
      {label && (
        <label style={{ color: 'var(--text)', fontWeight: 600, fontSize: '0.875rem', letterSpacing: '-0.2px' }}>
          {label}
        </label>
      )}
      <input
        type="time"
        value={selectedTime}
        onChange={handleChange}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        style={{
          width: '100%',
          height: '44px',
          lineHeight: '44px',
          borderRadius: 'var(--radius-sm)',
          border: `1.5px solid ${isFocused ? 'var(--accent)' : 'var(--border)'}`,
          padding: '0 1rem',
          background: 'var(--surface)',
          color: 'var(--text)',
          fontSize: '1rem',
          transition: 'all 0.2s var(--ease-smooth)',
          boxSizing: 'border-box',
          cursor: 'pointer',
          outline: 'none',
          boxShadow: isFocused ? '0 0 0 3px rgba(249, 115, 22, 0.1)' : 'none',
          letterSpacing: '-0.2px',
        }}
      />
    </div>
  );
};
