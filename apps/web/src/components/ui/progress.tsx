import React from 'react';

export interface ProgressProps extends React.HTMLAttributes<HTMLDivElement> {}

export const Progress: React.FC<ProgressProps> = ({ children, className = '', ...props }) => {
  return <div className={`ui-progress ${className}`} {...props}>{children}</div>;
};
