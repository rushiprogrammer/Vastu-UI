import React, { useState } from 'react';

interface ThemeToggleProps {
  onChange?: (isDark: boolean) => void;
}

export const ThemeToggle: React.FC<ThemeToggleProps> = ({ onChange }) => {
  const [isDark, setIsDark] = useState(false);

  const handleToggle = () => {
    const newState = !isDark;
    setIsDark(newState);
    document.documentElement.setAttribute('data-theme', newState ? 'dark' : 'light');
    localStorage.setItem('theme', newState ? 'dark' : 'light');
    onChange?.(newState);
  };

  return (
    <button
      onClick={handleToggle}
      className="theme-toggle"
      style={{
        width: '44px',
        height: '24px',
        background: isDark ? 'var(--accent)' : 'var(--border)',
        border: 'none',
        borderRadius: '12px',
        position: 'relative',
        cursor: 'pointer',
        transition: 'background 0.3s var(--ease-prana)',
      }}
      aria-label="Toggle theme"
    >
      <span
        style={{
          content: '""',
          width: '20px',
          height: '20px',
          background: '#fff',
          borderRadius: '50%',
          position: 'absolute',
          top: '2px',
          left: isDark ? '22px' : '2px',
          transition: 'left 0.3s var(--ease-prana)',
        }}
      />
    </button>
  );
};
