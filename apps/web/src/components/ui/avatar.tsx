import React from 'react';

export interface AvatarProps extends React.HTMLAttributes<HTMLDivElement> {}

export const Avatar: React.FC<AvatarProps> = ({ children, className = '', ...props }) => {
  return <div className={`ui-avatar ${className}`} {...props}>{children}</div>;
};
