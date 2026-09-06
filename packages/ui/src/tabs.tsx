'use client';

import React, { createContext, useContext, useState } from 'react';
import { cn } from './utils';

interface TabsContextType {
  activeTab: string;
  setActiveTab: (id: string) => void;
}

const TabsContext = createContext<TabsContextType | undefined>(undefined);

export interface TabsProps extends React.HTMLAttributes<HTMLDivElement> {
  defaultValue?: string;
  value?: string;
  onValueChange?: (value: string) => void;
}

export const Tabs: React.FC<TabsProps> = ({
  defaultValue = '',
  value,
  onValueChange,
  children,
  className,
  ...props
}) => {
  const [internalTab, setInternalTab] = useState(defaultValue);
  const activeTab = value !== undefined ? value : internalTab;

  const handleTabChange = (id: string) => {
    if (value === undefined) setInternalTab(id);
    onValueChange?.(id);
  };

  return (
    <TabsContext.Provider value={{ activeTab, setActiveTab: handleTabChange }}>
      <div className={cn('w-full', className)} {...props}>
        {children}
      </div>
    </TabsContext.Provider>
  );
};

export const TabList: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  className,
  children,
  ...props
}) => (
  <div
    role="tablist"
    className={cn(
      'flex border-b border-border-strong gap-0 bg-bg-surface overflow-x-auto select-none',
      className
    )}
    {...props}
  >
    {children}
  </div>
);

export interface TabTriggerProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  value: string;
}

export const TabTrigger: React.FC<TabTriggerProps> = ({
  value,
  children,
  className,
  ...props
}) => {
  const ctx = useContext(TabsContext);
  if (!ctx) throw new Error('TabTrigger must be used within Tabs');

  const isActive = ctx.activeTab === value;

  return (
    <button
      role="tab"
      type="button"
      aria-selected={isActive}
      onClick={() => ctx.setActiveTab(value)}
      className={cn(
        'px-space-md py-2.5 font-label-mono text-xs uppercase tracking-wider transition-colors border-b-2 whitespace-nowrap focus-visible:outline-none focus-visible:bg-bg-subtle',
        isActive
          ? 'border-accent-signal text-fg-primary font-bold bg-bg-subtle/50'
          : 'border-transparent text-fg-muted hover:text-fg-primary hover:border-border-hairline',
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
};

export interface TabContentProps extends React.HTMLAttributes<HTMLDivElement> {
  value: string;
}

export const TabContent: React.FC<TabContentProps> = ({
  value,
  children,
  className,
  ...props
}) => {
  const ctx = useContext(TabsContext);
  if (!ctx) throw new Error('TabContent must be used within Tabs');

  if (ctx.activeTab !== value) return null;

  return (
    <div
      role="tabpanel"
      tabIndex={0}
      className={cn('pt-space-md focus:outline-none', className)}
      {...props}
    >
      {children}
    </div>
  );
};
