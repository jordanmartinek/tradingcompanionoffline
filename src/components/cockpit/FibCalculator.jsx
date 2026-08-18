import { useMemo } from 'react';
import { useCockpit } from '@/lib/cockpitStore';
import { cn } from '@/lib/utils';

const FIB_LEVELS = [0.705, 0.786, 0.886];

export default function FibCalculator() {
  const { setup, updateSetup, currentPrice } = useCockpit();
  const { direction, swing_high, swing_low } = setup;

  const high = Number(swing_high) || 0;
  const low = Number(swing_low) || 0;
  const range = high - low;

  const fibs = useMemo(() => {
    if (!range || !high || !low) return [];
    return FIB_LEVELS.map((level) => {
      const price = direction === 'Short'
        ? low + range * level
        : high - range * level;
      return { level, price };
    });
  }, [direction, high, low, range]);

  const isInZone = useMemo(() => {
    if (!currentPrice || fibs.length < 2) return false;
    const fib705 = fibs[0].price;
    const fib786 = fibs[1].price;
    const min = Math.min(fib705, fib786);
    const max = Math.max(fib705, fib786);
    return currentPrice >= min && currentPrice <= max;
  }, [currentPrice, fibs]);

  const isInvalidated = useMemo(() => {
    if (!currentPrice || fibs.length < 3) return false;
    const fib886 = fibs[2].price;
    if (direction === 'Long') return currentPrice < fib886;
    if (direction === 'Short') return currentPrice > fib886;
    return false;
  }, [currentPrice, fibs, direction]);

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <h3 className="text-xs font-medium text-zinc-400 uppercase tracking-wider">Fibonacci</h3>
        <div className="flex gap-1">
          {isInZone && (
            <span className="text-[9px] px-1.5 py-0.5 rounded bg-teal-400/10 text-teal-400 font-medium">ZONE</span>
          )}
          {isInvalidated && (
            <span className="text-[9px] px-1.5 py-0.5 rounded bg-red-400/10 text-red-400 font-medium">INVALIDATED</span>
          )}
        </div>
      </div>
      <div className="space-y-2">
        {/* Direction Toggle */}
        <div className="flex gap-1">
          <button
            onClick={() => updateSetup({ direction: 'Long' })}
            className={cn(
              'flex-1 px-2 py-1 rounded text-[10px] font-medium border transition-colors',
              direction === 'Long'
                ? 'bg-green-400/10 border-green-400/50 text-green-400'
                : 'bg-zinc-900/50 border-zinc-800 text-zinc-500 hover:text-zinc-300'
            )}
          >
            Long
          </button>
          <button
            onClick={() => updateSetup({ direction: 'Short' })}
            className={cn(
              'flex-1 px-2 py-1 rounded text-[10px] font-medium border transition-colors',
              direction === 'Short'
                ? 'bg-red-400/10 border-red-400/50 text-red-400'
                : 'bg-zinc-900/50 border-zinc-800 text-zinc-500 hover:text-zinc-300'
            )}
          >
            Short
          </button>
        </div>

        {/* Swing Inputs */}
        <div className="grid grid-cols-2 gap-2">
          <div className="space-y-1">
            <label className="text-[10px] text-zinc-500 uppercase">Swing High</label>
            <input
              type="number"
              value={swing_high}
              onChange={(e) => updateSetup({ swing_high: e.target.value })}
              className="w-full bg-zinc-900/50 border border-zinc-800 rounded px-2 py-1 text-xs text-zinc-300 tabular-nums focus:outline-none focus:border-teal-400/50"
              placeholder="0"
            />
          </div>
          <div className="space-y-1">
            <label className="text-[10px] text-zinc-500 uppercase">Swing Low</label>
            <input
              type="number"
              value={swing_low}
              onChange={(e) => updateSetup({ swing_low: e.target.value })}
              className="w-full bg-zinc-900/50 border border-zinc-800 rounded px-2 py-1 text-xs text-zinc-300 tabular-nums focus:outline-none focus:border-teal-400/50"
              placeholder="0"
            />
          </div>
        </div>

        {/* Fib Levels Display */}
        {fibs.length > 0 && (
          <div className="space-y-1 p-2 bg-zinc-900/50 border border-zinc-800 rounded">
            {fibs.map(({ level, price }) => (
              <div key={level} className="flex items-center justify-between">
                <span className="text-[10px] text-zinc-500">{level}</span>
                <span className={cn(
                  'text-xs tabular-nums font-medium',
                  level === 0.705 || level === 0.786 ? 'text-teal-400' : 'text-zinc-400'
                )}>
                  {price.toFixed(2)}
                </span>
              </div>
            ))}
            {range > 0 && (
              <div className="flex items-center justify-between pt-1 border-t border-zinc-800">
                <span className="text-[10px] text-zinc-500">Range</span>
                <span className="text-[10px] tabular-nums text-zinc-400">{range.toFixed(2)} pts</span>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
