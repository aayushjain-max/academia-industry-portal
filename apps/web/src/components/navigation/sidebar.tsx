'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Icon } from '@/components/ui/icon';

export interface SidebarItem {
  label: string;
  href: string;
  icon: string;
}

export interface SidebarProps {
  nodeName: string;
  nodeRole: string;
  nodeLevel?: string;
  nodeInstitution?: string;
  complianceTag?: string;
  links: SidebarItem[];
  footerStats?: Array<{ label: string; value: string }>;
}

export const Sidebar: React.FC<SidebarProps> = ({
  nodeName,
  nodeRole,
  nodeLevel,
  nodeInstitution,
  complianceTag,
  links,
  footerStats,
}) => {
  const pathname = usePathname();

  return (
    <aside className="hidden lg:flex flex-col justify-between w-64 border-r border-border-strong bg-bg-surface p-space-md shrink-0 select-none">
      <div className="space-y-space-md">
        {/* Node Identity Badge */}
        <div className="p-space-sm border border-border-strong bg-bg-canvas space-y-1">
          <span className="font-label-mono text-[10px] text-fg-muted uppercase block">NODE INSTANCE // {nodeRole}</span>
          <div className="flex items-center justify-between">
            <span className="font-headline-sm text-body-md font-bold text-fg-primary uppercase truncate">{nodeName}</span>
            {nodeLevel && (
              <span className="font-label-mono text-[10px] bg-accent-signal text-fg-primary px-1 py-0.5 border border-border-strong font-bold">
                {nodeLevel}
              </span>
            )}
          </div>
          {nodeInstitution && (
            <span className="font-label-mono text-[11px] text-fg-secondary block truncate">
              {nodeInstitution}
            </span>
          )}
          {complianceTag && (
            <span className="font-label-mono text-[9px] text-status-success flex items-center gap-1 pt-1 font-semibold">
              <span className="w-1.5 h-1.5 bg-status-success rounded-full" />
              {complianceTag}
            </span>
          )}
        </div>

        {/* Navigation Links */}
        <nav className="space-y-1 font-mono text-xs">
          {links.map((link) => {
            const isActive = pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href) && link.href.split('/').length > 2);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`flex items-center gap-space-sm px-space-md py-2.5 transition-colors border-l-2 ${
                  isActive
                    ? 'bg-bg-subtle text-fg-primary border-accent-signal font-bold'
                    : 'text-fg-muted hover:text-fg-primary hover:bg-bg-subtle/50 border-transparent'
                }`}
              >
                <Icon name={link.icon} size={18} />
                <span>{link.label}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Telemetry Footer */}
      {footerStats && footerStats.length > 0 && (
        <div className="border border-border-hairline p-space-sm bg-bg-subtle/60 font-label-mono text-[10px] space-y-1 text-fg-muted">
          {footerStats.map((stat, idx) => (
            <div key={idx} className="flex justify-between">
              <span>{stat.label}:</span>
              <span className="text-fg-primary font-bold">{stat.value}</span>
            </div>
          ))}
        </div>
      )}
    </aside>
  );
};
