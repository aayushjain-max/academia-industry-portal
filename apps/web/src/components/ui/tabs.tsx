import React from 'react';

export interface TabsProps extends React.HTMLAttributes<HTMLDivElement> {}

export const Tabs: React.FC<TabsProps> = ({ children, className = '', ...props }) => {
  return <div className={`ui-tabs ${className}`} {...props}>{children}</div>;
};
