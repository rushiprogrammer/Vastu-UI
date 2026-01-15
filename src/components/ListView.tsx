import React, { useState } from 'react';

interface ListViewItem {
  id: string | number;
  label: string;
  icon?: string;
}

interface ListViewProps {
  items: ListViewItem[];
  onItemClick?: (item: ListViewItem) => void;
  selectedItem?: string | number;
}

export const ListView: React.FC<ListViewProps> = ({ items, onItemClick, selectedItem }) => {
  const [selected, setSelected] = useState(selectedItem);

  const handleItemClick = (item: ListViewItem) => {
    setSelected(item.id);
    onItemClick?.(item);
  };

  return (
    <div
      style={{
        background: 'var(--surface)',
        borderRadius: 'var(--radius-md)',
        border: '1px solid var(--border)',
        overflow: 'hidden',
      }}
    >
      {items.map((item) => (
        <button
          key={item.id}
          onClick={() => handleItemClick(item)}
          style={{
            width: '100%',
            padding: '1rem',
            border: 'none',
            borderBottom: '1px solid var(--border)',
            background: selected === item.id ? 'var(--bg)' : 'transparent',
            color: 'var(--text)',
            textAlign: 'left',
            cursor: 'pointer',
            display: 'flex',
            gap: '1rem',
            alignItems: 'center',
            transition: 'all 0.2s',
          }}
        >
          {item.icon && <span>{item.icon}</span>}
          <span>{item.label}</span>
        </button>
      ))}
    </div>
  );
};
