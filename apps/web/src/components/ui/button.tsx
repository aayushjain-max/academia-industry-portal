import React from 'react';

export interface ButtonProps extends React.HTMLAttributes<HTMLDivElement> {}

export const Button: React.FC<ButtonProps> = ({ children, className = '', ...props }) => {
  return <div className={`ui-button ${className}`} {...props}>{children}</div>;
};
