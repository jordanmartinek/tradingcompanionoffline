import React from 'react';
import { cn } from '@/lib/utils';

const RESULT_COLORS = {
  win: 'bg-emerald-500',
  loss: 'bg-red-500',
  breakeven: 'bg-zinc-500',
  scratched: 'bg-blue-500',
};

const RESULT_BORDER = {
  win: 'border-emerald-500/40',
  loss: 'border-red-500/40',
  breakeven: 'border-zinc-500/40',
  scratched: 'border-blue-500/40',
};

export default function TradeTimeline({ trades, sessionStart, sessionEnd }) {
  if (!trades || trades.length === 0) {
    return <p className="text-sm text-zinc-500 italic">No trades recorded.</p>;
  }

  const start = new Date(sessionStart).getTime();
  const end = new Date(sessionEnd || Date.now()).getTime();
  const duration = end - start || 1;

  // Generate time ticks
  const ticks = [];
  const tickCount = 6;
  for (let i = 0; i <= tickCount; i++) {
    const t = new Date(start + (duration / tickCount) * i);
    ticks.push({
      label: t.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      position: (i / tickCount) * 100,
    });
  }

  return (
    <div className="space-y-4">
      {/* Timeline */}
      <div className="relative">
        {/* Time axis */}
        <div className="h-px bg-zinc-700 w-full relative">
          {ticks.map((tick, idx) => (
            <div
              key={idx}
              className="absolute top-0 -translate-x-1/2"
              style={{ left: `${tick.position}%` }}
            >
              <div className="w-px h-2 bg-zinc-600" />
              <span className="text-[9px] text-zinc-600 mt-1 block -translate-x-1/2 whitespace-nowrap">
                {tick.label}
              </span>
            </div>
          ))}
        </div>

        {/* Trade bars */}
        <div className="relative mt-6 space-y-2">
          {trades.map((trade, idx) => {
            const entryTime = trade.entry_time ? new Date(trade.entry_time).getTime() : start;
            const exitTime = trade.exit_time ? new Date(trade.exit_time).getTime() : entryTime + duration * 0.05;
            
            const leftPct = Math.max(0, ((entryTime - start) / duration) * 100);
            const widthPct = Math.max(2, ((exitTime - entryTime) / duration) * 100);
            const color = RESULT_COLORS[trade.result] || RESULT_COLORS.scratched;
            const borderColor = RESULT_BORDER[trade.result] || RESULT_BORDER.scratched;

            return (
              <div key={idx} className="relative h-7 flex items-center">
                <span className="absolute left-0 text-[10px] text-zinc-500 w-6">
                  #{idx + 1}
                </span>
                <div className="ml-7 relative flex-1 h-full">
                  <div
                    className={cn(
                      'absolute h-5 rounded-sm border flex items-center justify-center',
                      'transition-all text-[9px] font-medium text-white/90',
                      color, borderColor
                    )}
                    style={{
                      left: `${leftPct}%`,
                      width: `${Math.min(widthPct, 100 - leftPct)}%`,
                      minWidth: '24px',
                      top: '50%',
                      transform: 'translateY(-50%)',
                      opacity: 0.85,
                    }}
                  >
                    {trade.r_multiple != null && (
                      <span className="px-1 truncate">
                        {trade.r_multiple >= 0 ? '+' : ''}{trade.r_multiple.toFixed(1)}R
                      </span>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Legend */}
      <div className="flex items-center gap-4 justify-center">
        {Object.entries(RESULT_COLORS).map(([result, color]) => (
          <div key={result} className="flex items-center gap-1.5">
            <div className={cn('w-2.5 h-2.5 rounded-sm', color)} />
            <span className="text-[10px] text-zinc-500 capitalize">{result}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
