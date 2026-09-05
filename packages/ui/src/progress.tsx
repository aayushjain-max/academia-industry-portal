import React from 'react';
import { cn } from './utils';

export interface DataProgressProps extends React.HTMLAttributes<HTMLDivElement> {
  label: string;
  value: number; // 0 to 100
  benchmark?: number; // 0 to 100
  statusText?: string;
  variant?: 'success' | 'danger' | 'warning' | 'signal' | 'default';
  showValues?: boolean;
}

export const DataProgress: React.FC<DataProgressProps> = ({
  label,
  value,
  benchmark,
  statusText,
  variant = 'default',
  showValues = true,
  className,
  ...props
}) => {
  const clampedValue = Math.min(100, Math.max(0, value));
  const clampedBenchmark = benchmark !== undefined ? Math.min(100, Math.max(0, benchmark)) : undefined;

  const barVariants: Record<string, string> = {
    default: 'bg-border-strong',
    success: 'bg-status-success',
    danger: 'bg-status-danger',
    warning: 'bg-status-warning',
    signal: 'bg-accent-signal',
  };

  return (
    <div className={cn('space-y-1.5 w-full', className)} {...props}>
      <div className="flex justify-between items-baseline text-xs">
        <div className="flex items-center gap-2">
          <span className="font-body-md text-sm text-fg-primary font-medium">{label}</span>
          {statusText && (
            <span className="font-label-mono text-[10px] uppercase font-bold tracking-wider text-fg-muted">
              [{statusText}]
            </span>
          )}
        </div>
        {showValues && (
          <span className="font-metric-tabular text-xs text-fg-primary tnum font-semibold">
            {clampedValue}%{clampedBenchmark !== undefined ? ` / ${clampedBenchmark}%` : ''}
          </span>
        )}
      </div>

      <div className="relative w-full h-2.5 bg-bg-subtle border border-border-hairline overflow-hidden">
        <div
          className={cn('h-full transition-all duration-300', barVariants[variant])}
          style={{ width: `${clampedValue}%` }}
        />
        {clampedBenchmark !== undefined && (
          <div
            className="absolute top-0 bottom-0 w-0.5 bg-fg-primary z-10"
            style={{ left: `${clampedBenchmark}%` }}
            title={`Target: ${clampedBenchmark}%`}
          />
        )}
      </div>
    </div>
  );
};
