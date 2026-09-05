import React from 'react';
import { cn } from './utils';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'signal' | 'secondary' | 'outline' | 'danger' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', fullWidth = false, disabled, children, ...props }, ref) => {
    const baseStyles = 'inline-flex items-center justify-center font-label-mono uppercase tracking-wider transition-all duration-150 rounded-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-strong disabled:pointer-events-none disabled:opacity-50 select-none';

    const variantStyles: Record<string, string> = {
      primary: 'bg-primary text-bg-surface border border-border-strong hover:bg-neutral-800 shadow-[2px_2px_0px_0px_#18181B] active:translate-x-[1px] active:translate-y-[1px] active:shadow-none',
      signal: 'bg-accent-signal text-fg-primary font-bold border border-border-strong hover:bg-accent-signal-hover shadow-[2px_2px_0px_0px_#18181B] active:translate-x-[1px] active:translate-y-[1px] active:shadow-none',
      secondary: 'bg-bg-subtle text-fg-primary border border-border-hairline hover:bg-neutral-200',
      outline: 'bg-bg-surface text-fg-primary border border-border-strong hover:bg-bg-subtle',
      danger: 'bg-red-50 text-status-danger border border-status-danger hover:bg-red-100',
      ghost: 'bg-transparent text-fg-primary hover:bg-bg-subtle border border-transparent hover:border-border-hairline',
    };

    const sizeStyles: Record<string, string> = {
      sm: 'px-2.5 py-1 text-xs gap-1.5',
      md: 'px-4 py-2 text-xs font-semibold gap-2',
      lg: 'px-6 py-3 text-sm font-bold gap-2.5',
    };

    return (
      <button
        ref={ref}
        disabled={disabled}
        className={cn(
          baseStyles,
          variantStyles[variant],
          sizeStyles[size],
          fullWidth && 'w-full',
          className
        )}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';
