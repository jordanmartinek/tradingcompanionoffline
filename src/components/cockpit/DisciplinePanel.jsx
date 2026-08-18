import { useState } from 'react';
import { useCockpit } from '@/lib/cockpitStore';
import { cn } from '@/lib/utils';
import { EMOTIONAL_STATES } from '@/lib/cockpitConstants';

const CALM_STATES = ['Calm', 'Focused'];

export default function DisciplinePanel() {
  const {
    emotionalState,
    setEmotionalState,
    disciplineLocked,
    lockReason,
    lock,
    unlock,
    logViolation,
    violations,
    todayTrades,
    risk,
  } = useCockpit();

  const [overrideReason, setOverrideReason] = useState('');
  const [showOverride, setShowOverride] = useState(false);

  const recentViolations = violations.slice(-3).reverse();

  // Stats
  const tradesTaken = todayTrades.length;
  const maxTrades = risk.max_trades;
  const consecutiveLosses = (() => {
    const sorted = [...todayTrades].sort(
      (a, b) => new Date(b.created_date) - new Date(a.created_date)
    );
    let count = 0;
    for (const t of sorted) {
      if (t.pnl != null && Number(t.pnl) < 0) count++;
      else break;
    }
    return count;
  })();

  const handleManualLock = () => {
    lock('Manual lock');
  };

  const handleOverride = () => {
    if (!overrideReason.trim()) return;
    logViolation({
      type: 'lock_override',
      reason: `Override: ${overrideReason}`,
    });
    unlock();
    setOverrideReason('');
    setShowOverride(false);
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <h3 className="text-xs font-medium text-zinc-400 uppercase tracking-wider">Discipline</h3>
        <span className={cn(
          'text-[10px] font-bold uppercase',
          disciplineLocked ? 'text-red-400' : 'text-green-400'
        )}>
          {disciplineLocked ? 'LOCKED' : 'ACTIVE'}
        </span>
      </div>
      <div className="space-y-2">
        {/* Emotional State Grid */}
        <div className="space-y-1">
          <label className="text-[10px] text-zinc-500 uppercase">Emotional State</label>
          <div className="grid grid-cols-4 gap-1">
            {EMOTIONAL_STATES.map((state) => {
              const isCalm = CALM_STATES.includes(state);
              const isSelected = emotionalState === state;
              return (
                <button
                  key={state}
                  onClick={() => setEmotionalState(state)}
                  className={cn(
                    'px-1 py-1 rounded text-[9px] font-medium border transition-colors text-center',
                    isSelected && isCalm && 'bg-green-400/10 border-green-400/50 text-green-400',
                    isSelected && !isCalm && 'bg-red-400/10 border-red-400/50 text-red-400',
                    !isSelected && 'bg-zinc-900/50 border-zinc-800 text-zinc-500 hover:text-zinc-300'
                  )}
                >
                  {state}
                </button>
              );
            })}
          </div>
        </div>

        {/* Lock Status */}
        {disciplineLocked && (
          <div className="p-2 rounded bg-red-400/5 border border-red-400/20">
            <div className="text-[10px] text-red-400 font-medium">{lockReason}</div>
            {!showOverride ? (
              <button
                onClick={() => setShowOverride(true)}
                className="mt-1 text-[9px] text-red-400/70 hover:text-red-400 underline"
              >
                Override Lock (logged)
              </button>
            ) : (
              <div className="mt-1.5 space-y-1">
                <textarea
                  value={overrideReason}
                  onChange={(e) => setOverrideReason(e.target.value)}
                  rows={2}
                  className="w-full bg-zinc-900 border border-red-400/30 rounded px-2 py-1 text-xs text-zinc-300 resize-none focus:outline-none focus:border-red-400/50"
                  placeholder="Explain override reason..."
                />
                <div className="flex gap-1">
                  <button
                    onClick={handleOverride}
                    className="flex-1 py-1 rounded text-[9px] font-medium bg-red-400/10 border border-red-400/40 text-red-400 hover:bg-red-400/20"
                  >
                    Confirm Override
                  </button>
                  <button
                    onClick={() => setShowOverride(false)}
                    className="px-2 py-1 rounded text-[9px] text-zinc-500 border border-zinc-800 hover:text-zinc-300"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {!disciplineLocked && (
          <button
            onClick={handleManualLock}
            className="w-full py-1 rounded text-[10px] font-medium bg-zinc-900/50 border border-zinc-800 text-zinc-500 hover:text-zinc-300 hover:border-zinc-700"
          >
            Manual Lock
          </button>
        )}

        {/* Recent Violations */}
        {recentViolations.length > 0 && (
          <div className="space-y-1">
            <label className="text-[10px] text-zinc-500 uppercase">Recent Violations</label>
            {recentViolations.map((v) => (
              <div key={v.id} className="text-[10px] text-red-400/80 px-2 py-0.5 bg-red-400/5 rounded truncate">
                {v.reason || v.type}
              </div>
            ))}
          </div>
        )}

        {/* Stats */}
        <div className="grid grid-cols-3 gap-1 text-center">
          <div className="p-1 bg-zinc-900/50 border border-zinc-800 rounded">
            <div className="text-[10px] tabular-nums text-zinc-300">{tradesTaken}/{maxTrades}</div>
            <div className="text-[8px] text-zinc-500 uppercase">Trades</div>
          </div>
          <div className="p-1 bg-zinc-900/50 border border-zinc-800 rounded">
            <div className={cn('text-[10px] tabular-nums', consecutiveLosses >= 2 ? 'text-red-400' : 'text-zinc-300')}>
              {consecutiveLosses}
            </div>
            <div className="text-[8px] text-zinc-500 uppercase">Losses</div>
          </div>
          <div className="p-1 bg-zinc-900/50 border border-zinc-800 rounded">
            <div className={cn('text-[10px] tabular-nums', violations.length > 0 ? 'text-amber-400' : 'text-zinc-300')}>
              {violations.length}
            </div>
            <div className="text-[8px] text-zinc-500 uppercase">Violations</div>
          </div>
        </div>
      </div>
    </div>
  );
}
