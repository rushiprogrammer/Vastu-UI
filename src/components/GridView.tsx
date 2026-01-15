import React, { useState } from 'react';

interface GridViewItem {
  id: string | number;
  label: string;
  icon?: string;
}

interface GridViewProps {
  items: GridViewItem[];
  columns?: number;
  onItemClick?: (item: GridViewItem) => void;
}

export const GridView: React.FC<GridViewProps> = ({ items, columns = 3, onItemClick }) => {
  const [selectedItem, setSelectedItem] = useState<string | number | null>(null);

  const handleItemClick = (item: GridViewItem) => {
    setSelectedItem(item.id);
    onItemClick?.(item);
  };

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: `repeat(${columns}, 1fr)`,
        gap: '1rem',
      }}
    >
      {items.map((item) => (
        <button
          key={item.id}
          onClick={() => handleItemClick(item)}
          style={{
            padding: '1.5rem',
            background: selectedItem === item.id ? 'var(--accent)' : 'var(--surface)',
            border: '1px solid var(--border)',
            borderRadius: 'var(--radius-md)',
            color: selectedItem === item.id ? '#fff' : 'var(--text)',
            cursor: 'pointer',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '0.5rem',
            transition: 'all 0.2s',
          }}
        >
          {item.icon && <span style={{ fontSize: '1.5rem' }}>{item.icon}</span>}
          <span style={{ fontWeight: 600 }}>{item.label}</span>
        </button>
      ))}
    </div>
  );
};
