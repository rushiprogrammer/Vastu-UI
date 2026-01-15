import React, { useState } from 'react';

interface Suggestion {
  label: string;
  value: string;
}

interface AutoSuggestBoxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  suggestions?: Suggestion[];
  onSuggestionSelected?: (suggestion: Suggestion) => void;
}

export const AutoSuggestBox: React.FC<AutoSuggestBoxProps> = ({
  label,
  suggestions = [],
  onSuggestionSelected,
  onChange,
  value = '',
  ...props
}) => {
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [filtered, setFiltered] = useState<Suggestion[]>([]);
  const [isFocused, setIsFocused] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.currentTarget.value;
    onChange?.(e);
    
    if (val) {
      const matches = suggestions.filter((s) =>
        s.label.toLowerCase().includes(val.toLowerCase())
      );
      setFiltered(matches);
      setShowSuggestions(true);
    } else {
      setShowSuggestions(false);
    }
  };

  const handleSelectSuggestion = (suggestion: Suggestion) => {
    onSuggestionSelected?.(suggestion);
    setShowSuggestions(false);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', position: 'relative' }}>
      {label && (
        <label style={{ color: 'var(--text)', fontWeight: 600, fontSize: '0.9rem' }}>
          {label}
        </label>
      )}
      <input
        style={{
          width: '100%',
          height: '48px',
          borderRadius: 'var(--radius-sm)',
          border: `1.5px solid ${isFocused ? 'var(--accent)' : 'var(--border)'}`,
          padding: '0 1rem',
          background: 'var(--surface)',
          color: 'var(--text)',
          fontSize: '0.95rem',
          transition: 'all 0.2s',
          boxSizing: 'border-box',
          outline: 'none',
          boxShadow: isFocused ? '0 0 0 3px rgba(249, 115, 22, 0.1)' : 'none',
        }}
        onChange={handleChange}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        value={value}
        {...props}
      />
      {showSuggestions && filtered.length > 0 && (
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
          {filtered.map((suggestion, idx) => (
            <button
              key={idx}
              onClick={() => handleSelectSuggestion(suggestion)}
              style={{
                width: '100%',
                padding: '0.75rem 1rem',
                border: 'none',
                background: 'transparent',
                color: 'var(--text)',
                textAlign: 'left',
                cursor: 'pointer',
                borderBottom: idx < filtered.length - 1 ? '1px solid var(--border)' : 'none',
                transition: 'background 0.2s',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.background = 'var(--bg)')}
              onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
            >
              {suggestion.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
