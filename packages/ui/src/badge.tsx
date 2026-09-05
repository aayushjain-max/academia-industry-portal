import React from 'react';
import { cn } from './utils';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'default' | 'signal' | 'success' | 'danger' | 'warning' | 'dark' | 'outline';
}

export const Badge: React.FC<BadgeProps> = ({
  className,
  variant = 'default',
  children,
  ...props
}) => {
  const variantStyles: Record<string, string> = {
    default: 'bg-bg-subtle text-fg-primary border-border-hairline',
    signal: 'bg-accent-signal text-fg-primary font-bold border-border-strong',
    success: 'bg-green-50 text-status-success border-status-success font-semibold',
    danger: 'bg-red-50 text-status-danger border-status-danger font-semibold',
    warning: 'bg-amber-50 text-status-warning border-status-warning font-semibold',
    dark: 'bg-fg-primary text-bg-surface border-border-strong font-bold',
    outline: 'bg-transparent text-fg-muted border-border-hairline',
  };

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1 font-label-mono text-[10px] tracking-wider uppercase px-1.5 py-0.5 border rounded-none select-none whitespace-nowrap',
        variantStyles[variant],
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
};
