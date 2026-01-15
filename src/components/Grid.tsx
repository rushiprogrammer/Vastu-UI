import React from 'react';

interface GridProps {
  columns?: number;
  rows?: number;
  gap?: string;
  children: React.ReactNode;
}

export const Grid: React.FC<GridProps> = ({ columns = 12, gap = '1rem', children }) => {
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: `repeat(${columns}, 1fr)`,
        gap,
      }}
    >
      {children}
    </div>
  );
};

interface GridItemProps {
  columnSpan?: number;
  rowSpan?: number;
  children: React.ReactNode;
}

export const GridItem: React.FC<GridItemProps> = ({ columnSpan = 1, rowSpan = 1, children }) => {
  return (
    <div
      style={{
        gridColumn: `span ${columnSpan}`,
        gridRow: `span ${rowSpan}`,
      }}
    >
      {children}
    </div>
  );
};
