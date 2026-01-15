import React, { useState } from 'react';

interface CalendarDatePickerProps {
  label?: string;
  value?: Date;
  onChange?: (date: Date) => void;
}

export const CalendarDatePicker: React.FC<CalendarDatePickerProps> = ({ label, value, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState(value);

  const handleDateSelect = (date: Date) => {
    setSelected(date);
    onChange?.(date);
    setIsOpen(false);
  };

  return (
    <div style={{ position: 'relative' }}>
      {label && (
        <label style={{ color: 'var(--text)', fontWeight: 600, fontSize: '0.9rem', display: 'block', marginBottom: '0.5rem' }}>
          {label}
        </label>
      )}
      <button
        onClick={() => setIsOpen(!isOpen)}
        style={{
          width: '100%',
          height: '48px',
          borderRadius: 'var(--radius-sm)',
          border: '1.5px solid var(--border)',
          padding: '0 1rem',
          background: 'var(--surface)',
          color: 'var(--text)',
          fontSize: '0.95rem',
          textAlign: 'left',
          cursor: 'pointer',
          transition: 'all 0.2s',
          boxSizing: 'border-box',
        }}
      >
        {selected ? selected.toLocaleDateString() : 'Select date...'}
      </button>
      {isOpen && (
        <div style={{ position: 'absolute', top: '100%', left: 0, zIndex: 10, marginTop: '0.5rem' }}>
          <div
            style={{
              padding: '1rem',
              background: 'var(--surface)',
              borderRadius: 'var(--radius-md)',
              border: '1px solid var(--border)',
              boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
              maxWidth: '300px',
            }}
          >
            {/* Simple calendar implementation */}
            <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem' }}>
              {Array.from({ length: 7 }).map((_, i) => (
                <button
                  key={i}
                  onClick={() => handleDateSelect(new Date(Date.now() + i * 24 * 60 * 60 * 1000))}
                  style={{
                    flex: 1,
                    padding: '0.5rem',
                    background: 'var(--bg)',
                    border: 'none',
                    borderRadius: '0.25rem',
                    cursor: 'pointer',
                    fontSize: '0.85rem',
                  }}
                >
                  +{i}d
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
