import React, { useState } from 'react';

interface SplitViewProps {
  displayMode?: 'compact' | 'inline' | 'overlay';
  panePosition?: 'left' | 'right';
  paneLength?: string;
  items?: { icon: string; label: string }[];
  onNavigate?: (label: string) => void;
  children?: React.ReactNode;
}

export const SplitView: React.FC<SplitViewProps> = ({
  displayMode = 'compact',
  panePosition = 'left',
  paneLength = '280px',
  items = [],
  onNavigate,
  children,
}) => {
  const [isExpanded, setIsExpanded] = useState(displayMode === 'inline');
  const [activeItem, setActiveItem] = useState(0);

  const paneWidth =
    displayMode === 'compact'
      ? isExpanded
        ? paneLength
        : '48px'
      : displayMode === 'inline'
        ? paneLength
        : '48px';

  const paneStyles: React.CSSProperties = {
    width: paneWidth,
    minWidth: displayMode === 'compact' ? '48px' : paneLength,
    maxWidth: paneLength,
    background: 'var(--surface)',
    borderRight: panePosition === 'left' ? '1px solid var(--border)' : 'none',
    borderLeft: panePosition === 'right' ? '1px solid var(--border)' : 'none',
    transition: 'width 0.3s cubic-bezier(0.33, 0, 0.67, 1)',
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'column',
    height: '600px',
  };

  const containerStyles: React.CSSProperties = {
    display: 'flex',
    flexDirection: panePosition === 'right' ? 'row-reverse' : 'row',
    background: 'var(--surface)',
    borderRadius: 'var(--radius-md)',
    overflow: 'hidden',
    boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
    height: '600px',
  };

  return (
    <div style={containerStyles}>
      <aside style={paneStyles}>
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          style={{
            width: '48px',
            height: '48px',
            border: 'none',
            background: 'transparent',
            cursor: 'pointer',
            fontSize: '1.2rem',
          }}
        >
          {isExpanded ? '←' : '→'}
        </button>
        <nav style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '0.5rem', padding: '0.5rem' }}>
          {items.map((item, idx) => (
            <button
              key={idx}
              onClick={() => {
                setActiveItem(idx);
                onNavigate?.(item.label.toLowerCase());
              }}
              style={{
                width: isExpanded ? '100%' : '48px',
                padding: isExpanded ? '0.75rem' : '0.5rem',
                border: 'none',
                background: activeItem === idx ? 'var(--accent)' : 'transparent',
                color: activeItem === idx ? '#fff' : 'var(--text)',
                cursor: 'pointer',
                textAlign: isExpanded ? 'left' : 'center',
                fontSize: '0.9rem',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
                transition: 'all 0.2s',
                display: 'flex',
                alignItems: 'center',
                justifyContent: isExpanded ? 'flex-start' : 'center',
                gap: '0.75rem',
                borderRadius: '4px',
                height: '48px',
              }}
              title={item.label}
            >
              <span className="material-icons" style={{ fontSize: '1.3rem', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, width: '24px', height: '24px' }}>{item.icon}</span>
              {isExpanded && <span style={{ flex: 1, overflow: 'hidden', textOverflow: 'ellipsis' }}>{item.label}</span>}
            </button>
          ))}
        </nav>
      </aside>
      <main
        style={{
          flex: 1,
          padding: '1.5rem',
          background: 'var(--bg)',
          overflow: 'auto',
        }}
      >
        {children}
      </main>
    </div>
  );
};
