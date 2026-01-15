import React from 'react';

interface AppBarProps {
  onNavigate?: (view: string) => void;
  currentView?: string;
}

export const AppBar: React.FC<AppBarProps> = ({ onNavigate, currentView }) => {
  return (
    <header className="nav-ishaan" style={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '1rem 2rem',
      borderBottom: '1px solid var(--border)',
      backgroundColor: 'var(--surface)',
    }}>
      <h1 style={{ fontSize: '1.5rem', fontWeight: 700 }}>Vedic UI Kit</h1>
      <nav style={{ display: 'flex', gap: '1rem' }}>
        {['overview', 'components', 'docs', 'settings'].map((item) => (
          <button
            key={item}
            onClick={() => onNavigate?.(item)}
            style={{
              padding: '0.5rem 1rem',
              border: 'none',
              background: currentView === item ? 'var(--accent)' : 'transparent',
              color: currentView === item ? '#fff' : 'var(--text)',
              borderRadius: '0.5rem',
              cursor: 'pointer',
              fontSize: '0.9rem',
              fontWeight: 600,
              transition: 'all 0.2s',
            }}
          >
            {item.charAt(0).toUpperCase() + item.slice(1)}
          </button>
        ))}
      </nav>
    </header>
  );
};
