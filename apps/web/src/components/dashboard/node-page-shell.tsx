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
            <span className="w-2 h-2 bg-portal-primary border border-border-strong inline-block" />
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
      <div className="border border-border-strong bg-bg-surface p-space-md lg:p-space-lg shadow-[2px_2px_0px_0px_rgba(24,24,27,0.04)]">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-space-md pb-space-md border-b border-border-hairline">
          <div className="max-w-3xl">
            {category && (
              <div className="flex items-center gap-2 mb-1.5">
                <span className="w-2 h-2 bg-portal-primary inline-block shrink-0" />
                <span className="font-label-mono text-[11px] tracking-widest uppercase text-fg-muted font-bold">
                  // {category}
                </span>
              </div>
            )}
            <h1 className="text-2xl sm:text-3xl lg:text-[34px] font-headline-lg uppercase tracking-tight text-fg-primary font-black leading-tight">
              {title}
            </h1>
            <p className="text-body-sm sm:text-body-md text-fg-muted mt-1.5 leading-relaxed">
              {description}
            </p>
          </div>

          {actions && <div className="flex items-center gap-2 flex-wrap shrink-0 self-start md:self-auto">{actions}</div>}
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
