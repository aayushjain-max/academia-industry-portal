import React from 'react';
import { cn } from './utils';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'accent' | 'dark' | 'subtle';
}

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant = 'default', children, ...props }, ref) => {
    const variantStyles: Record<string, string> = {
      default: 'bg-bg-surface border border-border-strong text-fg-primary',
      accent: 'bg-bg-surface border-2 border-accent-signal text-fg-primary',
      dark: 'bg-neutral-950 border border-border-strong text-bg-surface',
      subtle: 'bg-bg-subtle/50 border border-border-hairline text-fg-primary',
    };

    return (
      <div
        ref={ref}
        className={cn('rounded-none p-space-md', variantStyles[variant], className)}
        {...props}
      >
        {children}
      </div>
    );
  }
);
Card.displayName = 'Card';

export const CardHeader = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn('flex flex-col space-y-1.5 pb-space-sm border-b border-border-hairline mb-space-sm', className)}
      {...props}
    />
  )
);
CardHeader.displayName = 'CardHeader';

export const CardTitle = React.forwardRef<HTMLHeadingElement, React.HTMLAttributes<HTMLHeadingElement>>(
  ({ className, ...props }, ref) => (
    <h3
      ref={ref}
      className={cn('font-headline-sm text-body-md font-bold text-fg-primary uppercase tracking-tight', className)}
      {...props}
    />
  )
);
CardTitle.displayName = 'CardTitle';

export const CardDescription = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement>>(
  ({ className, ...props }, ref) => (
    <p
      ref={ref}
      className={cn('font-body-sm text-body-sm text-fg-muted', className)}
      {...props}
    />
  )
);
CardDescription.displayName = 'CardDescription';

export const CardContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn('pt-0', className)} {...props} />
  )
);
CardContent.displayName = 'CardContent';

export const CardFooter = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn('flex items-center pt-space-sm border-t border-border-hairline mt-space-sm', className)}
      {...props}
    />
  )
);
CardFooter.displayName = 'CardFooter';

export interface TelemetryCardProps extends React.HTMLAttributes<HTMLDivElement> {
  label: string;
  value: string | number;
  delta?: string;
  deltaType?: 'success' | 'danger' | 'warning' | 'neutral';
  subtext?: string;
  icon?: React.ReactNode;
}

export const TelemetryCard: React.FC<TelemetryCardProps> = ({
  label,
  value,
  delta,
  deltaType = 'neutral',
  subtext,
  icon,
  className,
  ...props
}) => {
  const deltaColors: Record<string, string> = {
    success: 'text-status-success',
    danger: 'text-status-danger',
    warning: 'text-status-warning',
    neutral: 'text-fg-muted',
  };

  return (
    <div
      className={cn(
        'bg-bg-surface border border-border-strong p-space-md flex flex-col justify-between h-36 select-none',
        className
      )}
      {...props}
    >
      <div className="flex items-start justify-between">
        <span className="font-label-mono text-label-mono uppercase text-fg-muted tracking-wider">{label}</span>
        {icon && <div className="text-fg-muted">{icon}</div>}
      </div>
      <div>
        <div className="flex items-baseline gap-space-sm">
          <span className="font-metric-tabular text-metric-tabular text-fg-primary tnum font-bold">{value}</span>
          {delta && (
            <span className={cn('font-label-mono text-label-mono font-bold uppercase', deltaColors[deltaType])}>
              {delta}
            </span>
          )}
        </div>
        {subtext && <p className="font-body-sm text-body-sm text-fg-muted mt-0.5">{subtext}</p>}
      </div>
    </div>
  );
};
