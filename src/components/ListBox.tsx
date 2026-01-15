import React, { useState } from 'react';

interface ListBoxOption {
  label: string;
  value: string;
}

interface ListBoxProps {
  options: ListBoxOption[];
  multiple?: boolean;
  value?: string | string[];
  onChange?: (value: string | string[]) => void;
}

export const ListBox: React.FC<ListBoxProps> = ({
  options,
  multiple = false,
  value = multiple ? [] : '',
  onChange,
}) => {
  const [selected, setSelected] = useState(value);

  const handleSelect = (option: ListBoxOption) => {
    let newValue;
    if (multiple) {
      const selectedArray = Array.isArray(selected) ? selected : [];
      newValue = selectedArray.includes(option.value)
        ? selectedArray.filter((v) => v !== option.value)
        : [...selectedArray, option.value];
    } else {
      newValue = option.value;
    }
    setSelected(newValue);
    onChange?.(newValue);
  };

  return (
    <div
      style={{
        background: 'var(--surface)',
        border: '1px solid var(--border)',
        borderRadius: 'var(--radius-md)',
        overflow: 'hidden',
        maxHeight: '300px',
        overflowY: 'auto',
      }}
    >
      {options.map((option) => (
        <label
          key={option.value}
          style={{
            display: 'flex',
            alignItems: 'center',
            padding: '0.75rem 1rem',
            borderBottom: '1px solid var(--border)',
            cursor: 'pointer',
            backgroundColor:
              Array.isArray(selected) && selected.includes(option.value)
                ? 'var(--bg)'
                : !Array.isArray(selected) && selected === option.value
                  ? 'var(--bg)'
                  : 'transparent',
          }}
        >
          <input
            type={multiple ? 'checkbox' : 'radio'}
            checked={
              Array.isArray(selected) ? selected.includes(option.value) : selected === option.value
            }
            onChange={() => handleSelect(option)}
            style={{ marginRight: '0.75rem', cursor: 'pointer' }}
          />
          <span style={{ color: 'var(--text)' }}>{option.label}</span>
        </label>
      ))}
    </div>
  );
};
