import React from 'react';

export interface TooltipProps extends React.HTMLAttributes<HTMLDivElement> {}

export const Tooltip: React.FC<TooltipProps> = ({ children, className = '', ...props }) => {
  return <div className={`ui-tooltip ${className}`} {...props}>{children}</div>;
};
