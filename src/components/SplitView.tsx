import React, { useState } from 'react';

interface SplitViewItem {
  icon?: string;
  label: string;
  badge?: string | number;
}

interface SplitViewProps {
  displayMode?: 'compact' | 'inline' | 'overlay';
  panePosition?: 'left' | 'right';
  paneLength?: string;
  items?: SplitViewItem[];
  onNavigate?: (label: string) => void;
  children?: React.ReactNode;
  showIcons?: boolean;
  iconSize?: 'sm' | 'md' | 'lg';
}

export const SplitView: React.FC<SplitViewProps> = ({
  displayMode = 'compact',
  panePosition = 'left',
  paneLength = '260px',
  items = [],
  onNavigate,
  children,
  showIcons = true,
  iconSize = 'md',
}) => {
  const [isExpanded, setIsExpanded] = useState(displayMode === 'inline');
  const [activeItem, setActiveItem] = useState(0);

  const paneWidth =
    displayMode === 'compact'
      ? isExpanded
        ? paneLength
        : '64px'
      : displayMode === 'inline'
        ? paneLength
        : '64px';

  const iconSizes = {
    sm: '18px',
    md: '22px',
    lg: '26px',
  };

  const paneStyles: React.CSSProperties = {
    width: paneWidth,
    minWidth: displayMode === 'compact' ? '64px' : paneLength,
    maxWidth: paneLength,
    background: 'var(--surface)',
    borderRight: panePosition === 'left' ? '1px solid var(--border)' : 'none',
    borderLeft: panePosition === 'right' ? '1px solid var(--border)' : 'none',
    transition: 'width 0.25s var(--ease-smooth)',
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
  };

  const containerStyles: React.CSSProperties = {
    display: 'flex',
    flexDirection: panePosition === 'right' ? 'row-reverse' : 'row',
    background: 'var(--surface)',
    borderRadius: 'var(--radius-md)',
    overflow: 'hidden',
    boxShadow: 'var(--shadow-md)',
    height: '100%',
    minHeight: '400px',
  };

  const toggleButtonStyles: React.CSSProperties = {
    width: '64px',
    height: '64px',
    border: 'none',
    background: isExpanded ? 'var(--bg)' : 'transparent',
    color: 'var(--text)',
    cursor: 'pointer',
    fontSize: '1.2rem',
    fontWeight: 600,
    transition: 'all 0.2s var(--ease-smooth)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
    borderBottom: '1px solid var(--border)',
  };

  const navStyles: React.CSSProperties = {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    gap: '2px',
    padding: '8px',
    overflowY: 'auto',
    overflowX: 'hidden',
  };

  const getItemStyles = (isActive: boolean): React.CSSProperties => ({
    width: '100%',
    padding: isExpanded ? '12px 14px' : '14px',
    border: 'none',
    background: isActive ? 'var(--accent)' : 'transparent',
    color: isActive ? '#fff' : 'var(--text)',
    cursor: 'pointer',
    textAlign: isExpanded ? 'left' : 'center',
    fontSize: '0.9rem',
    fontWeight: isActive ? 600 : 500,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    transition: 'all 0.15s var(--ease-smooth)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: isExpanded ? 'flex-start' : 'center',
    gap: '12px',
    borderRadius: 'var(--radius-sm)',
    height: '44px',
    position: 'relative' as const,
  });

  return (
    <div style={containerStyles}>
      <aside style={paneStyles}>
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          style={toggleButtonStyles}
          title={isExpanded ? 'Collapse' : 'Expand'}
        >
          {isExpanded ? '✕' : '☰'}
        </button>
        <nav style={navStyles}>
          {items.map((item, idx) => (
            <button
              key={idx}
              onClick={() => {
                setActiveItem(idx);
                onNavigate?.(item.label.toLowerCase());
              }}
              style={getItemStyles(activeItem === idx)}
              title={item.label}
            >
              {showIcons && item.icon && (
                <span
                  className="material-icons"
                  style={{
                    fontSize: iconSizes[iconSize],
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                    width: iconSizes[iconSize],
                    height: iconSizes[iconSize],
                  }}
                >
                  {item.icon}
                </span>
              )}
              {isExpanded && (
                <span style={{ flex: 1, overflow: 'hidden', textOverflow: 'ellipsis' }}>
                  {item.label}
                </span>
              )}
              {isExpanded && item.badge && (
                <span
                  style={{
                    background: activeItem === idx ? 'rgba(255,255,255,0.3)' : 'var(--accent)',
                    color: '#fff',
                    padding: '2px 8px',
                    borderRadius: '12px',
                    fontSize: '0.75rem',
                    fontWeight: 600,
                    minWidth: '24px',
                    textAlign: 'center',
                    flexShrink: 0,
                  }}
                >
                  {item.badge}
                </span>
              )}
            </button>
          ))}
        </nav>
      </aside>
      <main
        style={{
          flex: 1,
          padding: '2rem',
          background: 'var(--bg)',
          overflow: 'auto',
          WebkitOverflowScrolling: 'touch',
        }}
      >
        {children}
      </main>
    </div>
  );
};
