import React, { useState, useRef, useEffect } from 'react';
import { cn } from '@/lib/utils';

export function Popover({ children }) {
  const [open, setOpen] = useState(false);
  
  return (
    <div className="relative inline-block">
      {React.Children.map(children, child => {
        if (child?.type === PopoverTrigger) {
          return React.cloneElement(child, { onClick: () => setOpen(!open) });
        }
        if (child?.type === PopoverContent) {
          return open ? React.cloneElement(child, { onClose: () => setOpen(false) }) : null;
        }
        return child;
      })}
    </div>
  );
}

export function PopoverTrigger({ children, onClick, className, ...props }) {
  return (
    <div className={cn('cursor-pointer', className)} onClick={onClick} {...props}>
      {children}
    </div>
  );
}

export function PopoverContent({ children, onClose, className, ...props }) {
  const ref = useRef(null);

  useEffect(() => {
    function handleClickOutside(e) {
      if (ref.current && !ref.current.contains(e.target)) {
        onClose?.();
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [onClose]);

  return (
    <div
      ref={ref}
      className={cn(
        'absolute z-50 mt-2 min-w-[200px] rounded-md border border-zinc-700',
        'bg-zinc-900 p-4 shadow-xl animate-fade-in',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
