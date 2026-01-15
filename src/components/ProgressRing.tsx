import React from 'react';

interface ProgressRingProps {
  value: number;
  max?: number;
  size?: number;
}

export const ProgressRing: React.FC<ProgressRingProps> = ({ value, max = 100, size = 100 }) => {
  const circumference = 2 * Math.PI * (size / 2 - 5);
  const offset = circumference - (value / max) * circumference;
  const percentage = (value / max) * 100;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
      <div style={{ position: 'relative', width: size, height: size }}>
        <svg
          width={size}
          height={size}
          style={{ transform: 'rotate(-90deg)' }}
        >
          <circle
            cx={size / 2}
            cy={size / 2}
            r={size / 2 - 5}
            fill="none"
            stroke="var(--border)"
            strokeWidth="5"
          />
          <circle
            cx={size / 2}
            cy={size / 2}
            r={size / 2 - 5}
            fill="none"
            stroke="var(--accent)"
            strokeWidth="5"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            style={{ transition: 'stroke-dashoffset 0.3s ease' }}
          />
        </svg>
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            textAlign: 'center',
          }}
        >
          <span style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--text)' }}>
            {Math.round(percentage)}%
          </span>
        </div>
      </div>
    </div>
  );
};
