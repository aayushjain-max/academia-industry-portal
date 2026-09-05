import React from 'react';
import { cn } from './utils';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  helperText?: string;
  error?: string;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type = 'text', label, helperText, error, id, ...props }, ref) => {
    const inputId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);

    return (
      <div className="w-full space-y-1">
        {label && (
          <label
            htmlFor={inputId}
            className="block font-label-mono text-[11px] uppercase tracking-wider text-fg-muted"
          >
            {label}
          </label>
        )}
        <input
          type={type}
          id={inputId}
          ref={ref}
          className={cn(
            'flex h-10 w-full rounded-none border bg-bg-surface px-3 py-2 text-sm font-body-md text-fg-primary placeholder:text-fg-muted/60 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-strong disabled:cursor-not-allowed disabled:opacity-50',
            error ? 'border-status-danger focus-visible:ring-status-danger' : 'border-border-strong',
            className
          )}
          {...props}
        />
        {error ? (
          <p className="font-label-mono text-[10px] text-status-danger uppercase">{error}</p>
        ) : helperText ? (
          <p className="font-body-sm text-[11px] text-fg-muted">{helperText}</p>
        ) : null}
      </div>
    );
  }
);

Input.displayName = 'Input';
