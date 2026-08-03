import React from 'react';
import { cn } from '@/lib/utils';

export function Label({ className, children, ...props }) {
  return (
    <label
      className={cn(
        'text-sm font-medium text-zinc-300 leading-none',
        'peer-disabled:cursor-not-allowed peer-disabled:opacity-70',
        className
      )}
      {...props}
    >
      {children}
    </label>
  );
}
