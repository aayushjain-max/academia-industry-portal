import React from 'react';

export interface SelectProps extends React.HTMLAttributes<HTMLDivElement> {}

export const Select: React.FC<SelectProps> = ({ children, className = '', ...props }) => {
  return <div className={`ui-select ${className}`} {...props}>{children}</div>;
};
