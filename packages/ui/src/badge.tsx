import React from 'react';

export const Badge: React.FC<React.HTMLAttributes<HTMLSpanElement>> = ({ children, className = '', ...props }) => (
  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold ${className}`} {...props}>
    {children}
  </span>
);
