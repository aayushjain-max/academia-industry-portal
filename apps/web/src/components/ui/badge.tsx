import React from 'react';

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {}

export const Badge: React.FC<BadgeProps> = ({ children, className = '', ...props }) => {
  return <div className={`ui-badge ${className}`} {...props}>{children}</div>;
};
