'use client';

import React from 'react';
import { TelemetryCard } from '@portal/ui';
import { Icon } from '@/components/ui/icon';

export interface KPIItem {
  label: string;
  value: string | number;
  delta?: string;
  deltaType?: 'success' | 'danger' | 'warning' | 'neutral';
  subtext?: string;
  icon?: string;
}

export interface NodePageShellProps {
  nodeId: string;
  nodeStatus?: string;
  category?: string;
  title: string;
  description: string;
  actions?: React.ReactNode;
  kpis?: KPIItem[];
  children?: React.ReactNode;
}

export const NodePageShell: React.FC<NodePageShellProps> = ({
  nodeId,
  nodeStatus = 'TIER 01 ACCREDITED',
  category,
  title,
  description,
  actions,
  kpis,
  children,
}) => {
  return (
    <div className="flex flex-col w-full space-y-space-md">
      {/* Top Telemetry Strip */}
      <div className="border border-border-hairline bg-bg-surface px-space-md py-space-sm">
        <div className="flex flex-wrap items-center justify-between gap-space-sm text-xs font-label-mono text-fg-muted">
          <div className="flex items-center gap-space-sm flex-wrap">
            <span className="w-2 h-2 bg-accent-signal border border-border-strong inline-block" />
            <span className="uppercase tracking-widest text-fg-primary font-bold">
              NODE: {nodeId}
            </span>
            <span className="text-border-hairline">|</span>
            <span className="text-status-success font-semibold uppercase">{nodeStatus}</span>
          </div>
          <div className="flex items-center gap-space-md font-mono text-[11px]">
            <span>LATENCY: <strong className="text-fg-primary">12ms</strong></span>
            <span>AUDIT: <strong className="text-status-success">VERIFIED v4.2</strong></span>
            <span>PROTOCOL: <strong className="text-fg-primary">SIH-8042</strong></span>
          </div>
        </div>
      </div>

      {/* Hero Title & Command Action Bar */}
      <div className="border border-border-strong bg-bg-surface p-space-md lg:p-space-lg">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-space-md pb-space-sm border-b border-border-hairline">
          <div>
            {category && (
              <div className="flex items-center gap-2 mb-1">
                <span className="w-2 h-2 bg-primary inline-block" />
                <span className="font-label-mono text-label-mono tracking-widest uppercase text-fg-muted">
                  // {category}
                </span>
              </div>
            )}
            <h1 className="text-headline-lg font-headline-lg uppercase tracking-tight text-fg-primary font-extrabold leading-tight">
              {title}
            </h1>
            <p className="text-body-md font-body-md text-fg-muted max-w-4xl mt-1">
              {description}
            </p>
          </div>

          {actions && <div className="flex items-center gap-space-sm flex-wrap self-start lg:self-center">{actions}</div>}
        </div>

        {/* 4 Telemetry KPIs */}
        {kpis && kpis.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-space-md mt-space-md">
            {kpis.map((kpi, idx) => (
              <TelemetryCard
                key={idx}
                label={kpi.label}
                value={kpi.value}
                delta={kpi.delta}
                deltaType={kpi.deltaType}
                subtext={kpi.subtext}
                icon={kpi.icon ? <Icon name={kpi.icon} size={18} /> : undefined}
              />
            ))}
          </div>
        )}
      </div>

      {/* Main Page Content Body */}
      {children && <div className="w-full space-y-space-md">{children}</div>}
    </div>
  );
};
