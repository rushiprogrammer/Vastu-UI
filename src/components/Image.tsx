import React from 'react';

interface ImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  fallback?: string;
}

export const Image: React.FC<ImageProps> = ({ fallback, ...props }) => {
  return (
    <img
      {...props}
      style={{
        maxWidth: '100%',
        height: 'auto',
        borderRadius: 'var(--radius-md)',
        ...props.style,
      }}
      onError={(e) => {
        if (fallback) {
          (e.target as HTMLImageElement).src = fallback;
        }
      }}
    />
  );
};
