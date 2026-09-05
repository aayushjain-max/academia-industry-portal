'use client';

import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, Check } from 'lucide-react';

export interface SelectOption {
  value: string;
  label: string;
  badge?: string;
}

export interface SelectProps {
  options: SelectOption[];
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  label?: string;
  className?: string;
  disabled?: boolean;
}

export const Select: React.FC<SelectProps> = ({
  options,
  value: controlledValue,
  defaultValue,
  onChange,
  placeholder = 'Select an option...',
  label,
  className = '',
  disabled = false,
}) => {
  const [uncontrolledValue, setUncontrolledValue] = useState(defaultValue || '');
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const isControlled = controlledValue !== undefined;
  const selectedValue = isControlled ? controlledValue : uncontrolledValue;
  const selectedOption = options.find((opt) => opt.value === selectedValue);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  const handleSelect = (val: string) => {
    if (!isControlled) {
      setUncontrolledValue(val);
    }
    onChange?.(val);
    setIsOpen(false);
  };

  return (
    <div ref={containerRef} className={`relative w-full ${className}`}>
      {label && (
        <label className="block font-label-mono text-label-mono text-fg-muted uppercase mb-1">
          {label}
        </label>
      )}
      <button
        type="button"
        disabled={disabled}
        onClick={() => setIsOpen((prev) => !prev)}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        className="w-full flex items-center justify-between bg-bg-surface border border-border-strong px-3 py-2.5 text-xs font-mono text-fg-primary text-left focus:outline-none focus:ring-1 focus:ring-fg-primary disabled:opacity-50 disabled:cursor-not-allowed hover:bg-bg-subtle transition-colors"
      >
        <span className={selectedOption ? 'text-fg-primary font-medium' : 'text-fg-muted'}>
          {selectedOption ? selectedOption.label : placeholder}
        </span>
        <ChevronDown
          size={16}
          className={`text-fg-muted transition-transform duration-150 ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>

      {isOpen && (
        <div
          role="listbox"
          className="absolute z-50 mt-1 w-full bg-bg-surface border-2 border-border-strong shadow-[4px_4px_0px_0px_#18181B] max-h-60 overflow-y-auto py-1"
        >
          {options.length === 0 ? (
            <div className="px-3 py-2 text-xs font-mono text-fg-muted">No options available</div>
          ) : (
            options.map((option) => {
              const isSelected = option.value === selectedValue;
              return (
                <button
                  key={option.value}
                  type="button"
                  role="option"
                  aria-selected={isSelected}
                  onClick={() => handleSelect(option.value)}
                  className={`w-full flex items-center justify-between px-3 py-2 text-xs font-label-mono uppercase tracking-wider text-left transition-colors ${
                    isSelected
                      ? 'bg-fg-primary text-bg-surface font-bold'
                      : 'text-fg-primary hover:bg-accent-signal hover:text-fg-primary'
                  }`}
                >
                  <span className="truncate">{option.label}</span>
                  <div className="flex items-center gap-1 shrink-0 ml-2">
                    {option.badge && (
                      <span className="font-label-mono text-[9px] px-1 border border-current">
                        {option.badge}
                      </span>
                    )}
                    {isSelected && <Check size={14} />}
                  </div>
                </button>
              );
            })
          )}
        </div>
      )}
    </div>
  );
};
