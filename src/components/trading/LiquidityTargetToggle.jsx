import React from 'react';
import { cn } from '@/lib/utils';

/**
 * Liquidity Target Selector — replaces EMA Above/Below.
 * BSL = Buy-Side Liquidity (hunting stops above highs, expecting reversal down)
 * SSL = Sell-Side Liquidity (hunting stops below lows, expecting reversal up)
 * Both = pools on both sides, watching for whichever gets taken first
 *
 * Values: 'bsl' | 'ssl' | 'both' | null
 */
export default function LiquidityTargetToggle({ target, onChange }) {
  return (
    <div className="flex items-center gap-1">
      <button
        onClick={() => onChange(target === 'bsl' ? null : 'bsl')}
        className={cn(
          'px-2.5 py-1 rounded text-[11px] font-medium transition-all border',
          target === 'bsl'
            ? 'bg-emerald-500/15 text-emerald-300 border-emerald-500/40 shadow-sm shadow-emerald-500/10'
            : 'bg-zinc-800/50 text-zinc-500 border-zinc-700/50 hover:border-zinc-600 hover:text-zinc-400'
        )}
      >
        BSL ▲
      </button>
      <button
        onClick={() => onChange(target === 'ssl' ? null : 'ssl')}
        className={cn(
          'px-2.5 py-1 rounded text-[11px] font-medium transition-all border',
          target === 'ssl'
            ? 'bg-red-500/15 text-red-300 border-red-500/40 shadow-sm shadow-red-500/10'
            : 'bg-zinc-800/50 text-zinc-500 border-zinc-700/50 hover:border-zinc-600 hover:text-zinc-400'
        )}
      >
        SSL ▼
      </button>
      <button
        onClick={() => onChange(target === 'both' ? null : 'both')}
        className={cn(
          'px-2.5 py-1 rounded text-[11px] font-medium transition-all border',
          target === 'both'
            ? 'bg-amber-500/15 text-amber-300 border-amber-500/40 shadow-sm shadow-amber-500/10'
            : 'bg-zinc-800/50 text-zinc-500 border-zinc-700/50 hover:border-zinc-600 hover:text-zinc-400'
        )}
      >
        Both ◆
      </button>
    </div>
  );
}
