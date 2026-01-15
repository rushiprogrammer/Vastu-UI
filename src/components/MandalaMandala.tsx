import React from 'react';

interface MandalaMandalaProps {
  size?: 8 | 9;
  children?: React.ReactNode;
}

export const MandalaMandala: React.FC<MandalaMandalaProps> = ({ size = 8, children }) => {
  const gridSize = size === 9 ? 9 : 8;

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: `repeat(${gridSize}, 1fr)`,
        gap: '0.5rem',
        padding: '1rem',
        background: 'var(--surface)',
        borderRadius: 'var(--radius-md)',
        border: '1px solid var(--border)',
      }}
    >
      {children}
    </div>
  );
};

interface MandalaCellProps {
  row: number;
  col: number;
  span?: number;
  children?: React.ReactNode;
  highlight?: boolean;
}

export const MandalaCell: React.FC<MandalaCellProps> = ({
  row,
  col,
  span = 1,
  children,
  highlight,
}) => {
  return (
    <div
      style={{
        gridColumn: `${col} / span ${span}`,
        gridRow: row,
        padding: '1rem',
        background: highlight ? 'var(--accent)' : 'var(--bg)',
        borderRadius: '0.5rem',
        textAlign: 'center',
        color: highlight ? '#fff' : 'var(--text)',
        border: `1px solid ${highlight ? 'var(--accent)' : 'var(--border)'}`,
        transition: 'all 0.2s',
        cursor: 'pointer',
      }}
    >
      {children}
    </div>
  );
};
