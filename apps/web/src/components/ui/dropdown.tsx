'use client';

import React, { createContext, useContext, useEffect, useRef, useState } from 'react';

interface DropdownContextValue {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const DropdownContext = createContext<DropdownContextValue | null>(null);

export interface DropdownProps {
  children: React.ReactNode;
  className?: string;
}

export const Dropdown: React.FC<DropdownProps> = ({ children, className = '' }) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleEscape);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen]);

  return (
    <DropdownContext.Provider value={{ isOpen, setIsOpen }}>
      <div ref={containerRef} className={`relative inline-block text-left ${className}`}>
        {children}
      </div>
    </DropdownContext.Provider>
  );
};

export const DropdownTrigger: React.FC<{
  children: React.ReactNode;
  className?: string;
}> = ({ children, className = '' }) => {
  const context = useContext(DropdownContext);
  if (!context) return <>{children}</>;

  return (
    <button
      type="button"
      aria-haspopup="true"
      aria-expanded={context.isOpen}
      onClick={() => context.setIsOpen((prev) => !prev)}
      className={`inline-flex items-center justify-center cursor-pointer ${className}`}
    >
      {children}
    </button>
  );
};

export const DropdownMenu: React.FC<{
  children: React.ReactNode;
  align?: 'left' | 'right';
  className?: string;
}> = ({ children, align = 'left', className = '' }) => {
  const context = useContext(DropdownContext);
  if (!context?.isOpen) return null;

  const alignmentClass = align === 'right' ? 'right-0' : 'left-0';

  return (
    <div
      role="menu"
      className={`absolute z-50 mt-1 min-w-[200px] bg-bg-surface border-2 border-border-strong shadow-[4px_4px_0px_0px_#18181B] py-1 text-fg-primary animate-fade-in ${alignmentClass} ${className}`}
    >
      {children}
    </div>
  );
};

export const DropdownItem: React.FC<{
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
}> = ({ children, onClick, className = '', disabled = false }) => {
  const context = useContext(DropdownContext);

  const handleClick = () => {
    if (disabled) return;
    onClick?.();
    context?.setIsOpen(false);
  };

  return (
    <button
      type="button"
      role="menuitem"
      disabled={disabled}
      onClick={handleClick}
      className={`w-full text-left px-3 py-2 text-xs font-label-mono uppercase tracking-wider flex items-center gap-2 hover:bg-accent-signal hover:text-fg-primary transition-colors disabled:opacity-50 disabled:pointer-events-none ${className}`}
    >
      {children}
    </button>
  );
};

export const DropdownDivider: React.FC<{ className?: string }> = ({ className = '' }) => (
  <div className={`border-t border-border-hairline my-1 ${className}`} />
);

export const DropdownLabel: React.FC<{
  children: React.ReactNode;
  className?: string;
}> = ({ children, className = '' }) => (
  <div
    className={`px-3 py-1 font-label-mono text-[10px] text-fg-muted uppercase tracking-widest ${className}`}
  >
    {children}
  </div>
);
