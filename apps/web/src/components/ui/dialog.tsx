'use client';

import React, { createContext, useContext, useEffect, useState, useRef } from 'react';
import { createPortal } from 'react-dom';
import { X } from 'lucide-react';

interface DialogContextValue {
  open: boolean;
  setOpen: (open: boolean) => void;
}

const DialogContext = createContext<DialogContextValue | null>(null);

export interface DialogProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  children: React.ReactNode;
  className?: string;
}

export const Dialog: React.FC<DialogProps> = ({ open: controlledOpen, onOpenChange, children, className = '' }) => {
  const [uncontrolledOpen, setUncontrolledOpen] = useState(false);
  const isControlled = controlledOpen !== undefined;
  const open = isControlled ? controlledOpen : uncontrolledOpen;

  const setOpen = (newOpen: boolean) => {
    if (!isControlled) {
      setUncontrolledOpen(newOpen);
    }
    onOpenChange?.(newOpen);
  };

  return (
    <DialogContext.Provider value={{ open, setOpen }}>
      {children}
    </DialogContext.Provider>
  );
};

export const DialogTrigger: React.FC<{
  children: React.ReactNode;
  asChild?: boolean;
  className?: string;
}> = ({ children, className = '', ...props }) => {
  const context = useContext(DialogContext);
  if (!context) return <>{children}</>;

  return (
    <span
      onClick={() => context.setOpen(true)}
      className={`inline-block cursor-pointer ${className}`}
      {...props}
    >
      {children}
    </span>
  );
};

export const DialogContent: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  children,
  className = '',
  ...props
}) => {
  const context = useContext(DialogContext);
  const [mounted, setMounted] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!context?.open) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        context.setOpen(false);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [context?.open, context]);

  if (!context?.open || !mounted) return null;

  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-[1px] animate-fade-in"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          context.setOpen(false);
        }
      }}
    >
      <div
        ref={contentRef}
        className={`relative w-full max-w-xl bg-bg-surface border-2 border-border-strong p-space-lg shadow-[6px_6px_0px_0px_#18181B] text-fg-primary ${className}`}
        {...props}
      >
        <button
          type="button"
          onClick={() => context.setOpen(false)}
          className="absolute right-4 top-4 p-1 text-fg-muted hover:text-fg-primary border border-transparent hover:border-border-hairline transition-colors"
          aria-label="Close dialog"
        >
          <X size={18} />
        </button>
        {children}
      </div>
    </div>,
    document.body
  );
};

export const DialogHeader: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  className = '',
  ...props
}) => (
  <div
    className={`flex flex-col space-y-1.5 pb-space-sm border-b border-border-hairline mb-space-md ${className}`}
    {...props}
  />
);

export const DialogTitle: React.FC<React.HTMLAttributes<HTMLHeadingElement>> = ({
  children,
  className = '',
  ...props
}) => (
  <div className="flex items-center gap-2">
    <span className="w-2.5 h-2.5 bg-accent-signal border border-border-strong shrink-0" />
    <h2
      className={`font-headline-md text-headline-sm uppercase tracking-tight text-fg-primary font-bold ${className}`}
      {...props}
    >
      {children}
    </h2>
  </div>
);

export const DialogDescription: React.FC<React.HTMLAttributes<HTMLParagraphElement>> = ({
  className = '',
  ...props
}) => (
  <p
    className={`font-body-sm text-body-sm text-fg-muted ${className}`}
    {...props}
  />
);

export const DialogFooter: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  className = '',
  ...props
}) => (
  <div
    className={`flex flex-wrap items-center justify-end gap-2 pt-space-md border-t border-border-hairline mt-space-md ${className}`}
    {...props}
  />
);

export const DialogClose: React.FC<{
  children: React.ReactNode;
  className?: string;
}> = ({ children, className = '' }) => {
  const context = useContext(DialogContext);
  return (
    <span onClick={() => context?.setOpen(false)} className={`cursor-pointer ${className}`}>
      {children}
    </span>
  );
};
