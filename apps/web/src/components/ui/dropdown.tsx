import React from 'react';

export interface DropdownProps extends React.HTMLAttributes<HTMLDivElement> {}

export const Dropdown: React.FC<DropdownProps> = ({ children, className = '', ...props }) => {
  return <div className={`ui-dropdown ${className}`} {...props}>{children}</div>;
};
