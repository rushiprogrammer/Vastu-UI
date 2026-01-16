import React, { useState } from 'react';

interface ComboBoxOption {
  label: string;
  value: string;
}

interface ComboBoxProps {
  options: ComboBoxOption[];
  label?: string;
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
}

export const ComboBox: React.FC<ComboBoxProps> = ({
  options,
  label,
  value = '',
  onChange,
  placeholder = 'Select...',
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [filtered, setFiltered] = useState(options);
  const [inputValue, setInputValue] = useState('');

  const selectedOption = options.find((opt) => opt.value === value);
  const displayValue = selectedOption?.label || inputValue;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.currentTarget.value;
    setInputValue(val);
    setFiltered(options.filter((opt) => opt.label.toLowerCase().includes(val.toLowerCase())));
    setIsOpen(true);
  };

  const handleSelect = (option: ComboBoxOption) => {
    onChange?.(option.value);
    setInputValue('');
    setIsOpen(false);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', position: 'relative' }}>
      {label && (
        <label style={{ color: 'var(--text)', fontWeight: 600, fontSize: '0.9rem' }}>
          {label}
        </label>
      )}
      <input
        type="text"
        value={displayValue}
        onChange={handleInputChange}
        onFocus={() => setIsOpen(true)}
        placeholder={placeholder}
        style={{
          width: '100%',
          height: '44px',
          lineHeight: '44px',
          borderRadius: 'var(--radius-sm)',
          border: '1.5px solid var(--border)',
          padding: '0 1rem',
          background: 'var(--surface)',
          color: 'var(--text)',
          fontSize: '1rem',
          transition: 'all 0.2s var(--ease-smooth)',
          boxSizing: 'border-box',
          outline: 'none',
          letterSpacing: '-0.2px',
        }}
      />
      {isOpen && filtered.length > 0 && (
        <div
          style={{
            position: 'absolute',
            top: '100%',
            left: 0,
            right: 0,
            background: 'var(--surface)',
            border: '1px solid var(--border)',
            borderRadius: 'var(--radius-sm)',
            marginTop: '0.25rem',
            zIndex: 10,
            maxHeight: '200px',
            overflow: 'auto',
          }}
        >
          {filtered.map((option, idx) => (
            <button
              key={idx}
              onClick={() => handleSelect(option)}
              style={{
                width: '100%',
                padding: '0.75rem 1rem',
                border: 'none',
                background: 'transparent',
                color: 'var(--text)',
                textAlign: 'left',
                cursor: 'pointer',
                borderBottom: idx < filtered.length - 1 ? '1px solid var(--border)' : 'none',
              }}
            >
              {option.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
