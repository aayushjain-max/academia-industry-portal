import React from 'react';

export interface InputProps extends React.HTMLAttributes<HTMLDivElement> {}

export const Input: React.FC<InputProps> = ({ children, className = '', ...props }) => {
  return <div className={`ui-input ${className}`} {...props}>{children}</div>;
};
