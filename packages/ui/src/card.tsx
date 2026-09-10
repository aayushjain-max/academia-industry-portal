import React from 'react';
import { cn } from './utils';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'accent' | 'portal' | 'dark' | 'subtle';
}

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant = 'default', children, ...props }, ref) => {
    const variantStyles: Record<string, string> = {
      default: 'bg-bg-surface border border-border-strong text-fg-primary',
      accent: 'bg-bg-surface border-2 border-portal-primary text-fg-primary',
      portal: 'bg-bg-surface border-2 border-portal-primary text-fg-primary',
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
    success: 'text-status-success bg-green-50 border-green-200',
    danger: 'text-status-danger bg-amber-50 border-amber-200',
    warning: 'text-amber-700 bg-amber-50 border-amber-200',
    neutral: 'text-fg-muted bg-bg-subtle border-border-hairline/30',
  };

  return (
    <div
      className={cn(
        'bg-bg-surface border border-border-strong p-space-md flex flex-col justify-between min-h-[148px] select-none shadow-[2px_2px_0px_0px_rgba(24,24,27,0.06)] hover:border-border-strong transition-colors',
        className
      )}
      {...props}
    >
      <div className="flex items-start justify-between gap-2">
        <span className="font-label-mono text-[11px] uppercase text-fg-muted tracking-wider font-semibold line-clamp-1">{label}</span>
        {icon && <div className="text-fg-muted shrink-0">{icon}</div>}
      </div>
      <div className="space-y-1.5 pt-2">
        <div className="flex items-baseline justify-between gap-2 flex-wrap">
          <span className="font-metric-tabular text-2xl lg:text-[24px] leading-none text-fg-primary tnum font-bold tracking-tight whitespace-nowrap overflow-hidden text-ellipsis">
            {value}
          </span>
          {delta && (
            <span className={cn('font-label-mono text-[10px] px-1.5 py-0.5 border font-bold uppercase tracking-wide inline-flex items-center shrink-0 whitespace-nowrap', deltaColors[deltaType])}>
              {delta}
            </span>
          )}
        </div>
        {subtext && <p className="font-body-sm text-[11px] text-fg-muted leading-tight truncate">{subtext}</p>}
      </div>
    </div>
  );
};
