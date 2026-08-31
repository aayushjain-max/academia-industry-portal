import React from 'react';

export interface DialogProps extends React.HTMLAttributes<HTMLDivElement> {}

export const Dialog: React.FC<DialogProps> = ({ children, className = '', ...props }) => {
  return <div className={`ui-dialog ${className}`} {...props}>{children}</div>;
};
