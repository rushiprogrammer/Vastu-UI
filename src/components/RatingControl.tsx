import React, { useState } from 'react';

interface RatingControlProps {
  maxRating?: number;
  rating?: number;
  onChange?: (rating: number) => void;
  label?: string;
}

export const RatingControl: React.FC<RatingControlProps> = ({
  maxRating = 5,
  rating = 0,
  onChange,
  label,
}) => {
  const [hoveredRating, setHoveredRating] = useState(0);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
      {label && (
        <label style={{ color: 'var(--text)', fontWeight: 600, fontSize: '0.9rem' }}>
          {label}
        </label>
      )}
      <div style={{ display: 'flex', gap: '0.5rem' }}>
        {Array.from({ length: maxRating }).map((_, idx) => (
          <button
            key={idx}
            onClick={() => onChange?.(idx + 1)}
            onMouseEnter={() => setHoveredRating(idx + 1)}
            onMouseLeave={() => setHoveredRating(0)}
            style={{
              background: 'transparent',
              border: 'none',
              cursor: 'pointer',
              fontSize: '1.5rem',
              transition: 'transform 0.2s, color 0.2s',
              transform: idx < (hoveredRating || rating) ? 'scale(1.2)' : 'scale(1)',
              color: idx < (hoveredRating || rating) ? 'var(--accent)' : 'var(--muted)',
            }}
          >
            {idx < (hoveredRating || rating) ? '★' : '☆'}
          </button>
        ))}
      </div>
      {rating > 0 && (
        <span style={{ color: 'var(--muted)', fontSize: '0.85rem' }}>
          {rating} of {maxRating} stars
        </span>
      )}
    </div>
  );
};
