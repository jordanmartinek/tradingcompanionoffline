import React from 'react';
import { cn } from '@/lib/utils';

export default function EmaStatusToggle({ direction, onChange }) {
  return (
    <div className="flex items-center gap-1">
      <span className="text-xs text-zinc-500 mr-1">EMA:</span>
      <button
        onClick={() => onChange(direction === 'above' ? null : 'above')}
        className={cn(
          'px-2 py-0.5 rounded text-xs font-medium transition-all',
          direction === 'above'
            ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
            : 'bg-zinc-800 text-zinc-500 border border-zinc-700 hover:border-zinc-600'
        )}
      >
        Above
      </button>
      <button
        onClick={() => onChange(direction === 'below' ? null : 'below')}
        className={cn(
          'px-2 py-0.5 rounded text-xs font-medium transition-all',
          direction === 'below'
            ? 'bg-red-500/20 text-red-300 border border-red-500/40'
            : 'bg-zinc-800 text-zinc-500 border border-zinc-700 hover:border-zinc-600'
        )}
      >
        Below
      </button>
    </div>
  );
}
