'use client';

import React, { useState } from 'react';

export interface AvatarProps extends React.HTMLAttributes<HTMLDivElement> {
  src?: string;
  alt?: string;
  fallback?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  status?: 'online' | 'offline' | 'verified';
}

export const Avatar: React.FC<AvatarProps> = ({
  src,
  alt = 'Avatar',
  fallback = 'U',
  size = 'md',
  status,
  className = '',
  ...props
}) => {
  const [imageError, setImageError] = useState(false);

  const sizeClasses: Record<string, string> = {
    sm: 'w-7 h-7 text-xs',
    md: 'w-9 h-9 text-sm',
    lg: 'w-12 h-12 text-base font-bold',
    xl: 'w-16 h-16 text-xl font-bold',
  };

  const statusColors: Record<string, string> = {
    online: 'bg-status-success',
    offline: 'bg-fg-muted',
    verified: 'bg-accent-signal',
  };

  return (
    <div
      className={`relative inline-flex items-center justify-center shrink-0 border border-border-strong bg-bg-subtle text-fg-primary font-mono select-none ${sizeClasses[size]} ${className}`}
      {...props}
    >
      {src && !imageError ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={src}
          alt={alt}
          onError={() => setImageError(true)}
          className="w-full h-full object-cover"
        />
      ) : (
        <span className="uppercase tracking-tight font-bold">{fallback}</span>
      )}

      {status && (
        <span
          className={`absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 border border-border-strong ${statusColors[status]}`}
          title={`Status: ${status}`}
        />
      )}
    </div>
  );
};
