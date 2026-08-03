import React, { useState, useEffect, useMemo } from 'react';
import { useTradingRules } from '@/hooks/useTradingRules';
import { TradingSession, Trade } from '@/api/db';
import { cn } from '@/lib/utils';

const UNLOCK_THRESHOLD = 75;

const RESULTS = [
  { value: 'win', label: 'W', color: 'bg-emerald-500/20 border-emerald-500/50 text-emerald-300' },
  { value: 'loss', label: 'L', color: 'bg-red-500/20 border-red-500/50 text-red-300' },
  { value: 'breakeven', label: 'BE', color: 'bg-zinc-600/20 border-zinc-500/50 text-zinc-300' },
  { value: 'scratched', label: 'S', color: 'bg-blue-500/20 border-blue-500/50 text-blue-300' },
];

export default function Widget() {
  const { rules, toggleRule, resetAllRules, loading } = useTradingRules();
  const [emaDirection, setEmaDirection] = useState(null);
  const [session, setSession] = useState(null);
  const [trades, setTrades] = useState([]);

  // Trade logging flow: 'idle' | 'logging' | 'done'
  const [tradePhase, setTradePhase] = useState('idle');
  const [pendingTradeId, setPendingTradeId] = useState(null);
  const [tradeResult, setTradeResult] = useState('win');
  const [tradeR, setTradeR] = useState('');
  const [tradePnl, setTradePnl] = useState('');
  const [tradeNotes, setTradeNotes] = useState('');

  // Load active session
  useEffect(() => {
    async function loadSession() {
      const activeId = localStorage.getItem('tcai_active_session');
      if (activeId) {
        const sess = await TradingSession.get(activeId);
        if (sess && sess.status === 'active') {
          setSession(sess);
          const sessionTrades = await Trade.list({ session_id: activeId });
          setTrades(sessionTrades);
        }
      }
    }
    loadSession();
  }, []);

  // Entry rules only
  const entryRules = useMemo(() => rules.filter(r => r.category === 'entry'), [rules]);
  const enabledCount = useMemo(() => entryRules.filter(r => r.enabled).length, [entryRules]);
  const totalCount = entryRules.length;
  const score = totalCount > 0 ? Math.round((enabledCount / totalCount) * 100) : 0;
  const isUnlocked = score >= UNLOCK_THRESHOLD;

  // Max trades check
  const maxTrades = session?.max_trades || 3;
  const allSlotsFilled = trades.length >= maxTrades;

  // Border glow color based on EMA direction
  const borderGlowClass = useMemo(() => {
    if (emaDirection === 'above') return 'shadow-[inset_0_0_0_2px_#10b981,0_0_20px_#10b98140,inset_0_0_20px_#10b98120]';
    if (emaDirection === 'below') return 'shadow-[inset_0_0_0_2px_#ef4444,0_0_20px_#ef444440,inset_0_0_20px_#ef444420]';
    return 'shadow-[inset_0_0_0_1px_#27272a]';
  }, [emaDirection]);

  // Step 1: Execute trade — create record, show logging form
  const handleExecute = async () => {
    const slotIndex = trades.length;
    const ruleCompliance = entryRules.map(r => ({ rule: r.title, followed: r.enabled }));

    if (session) {
      const newTrade = await Trade.create({
        session_id: session.id,
        slot_index: slotIndex,
        entry_time: new Date().toISOString(),
        result: 'scratched',
        r_multiple: 0,
        pnl: 0,
        notes: '',
        rule_compliance: ruleCompliance,
      });
      setPendingTradeId(newTrade.id);
      setTrades(prev => [...prev, newTrade]);
    }

    // Reset rules immediately so next trade requires re-checking
    await resetAllRules();

    // Show the quick-log form
    setTradeResult('win');
    setTradeR('');
    setTradePnl('');
    setTradeNotes('');
    setTradePhase('logging');
  };

  // Step 2: Save trade details
  const handleSaveTrade = async () => {
    if (pendingTradeId) {
      await Trade.update(pendingTradeId, {
        result: tradeResult,
        r_multiple: parseFloat(tradeR) || 0,
        pnl: parseFloat(tradePnl) || 0,
        notes: tradeNotes,
        exit_time: new Date().toISOString(),
      });

      // Update local trades state
      setTrades(prev => prev.map(t =>
        t.id === pendingTradeId
          ? { ...t, result: tradeResult, r_multiple: parseFloat(tradeR) || 0, pnl: parseFloat(tradePnl) || 0, notes: tradeNotes }
          : t
      ));
    }

    setTradePhase('done');
    setPendingTradeId(null);

    // Flash confirmation then reset
    setTimeout(() => setTradePhase('idle'), 1500);
  };

  // Skip logging — keep trade as scratched
  const handleSkipLog = () => {
    setTradePhase('done');
    setPendingTradeId(null);
    setTimeout(() => setTradePhase('idle'), 1500);
  };

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center bg-zinc-950">
        <div className="w-5 h-5 border-2 border-teal-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className={cn(
      'h-screen bg-zinc-950 flex flex-col transition-shadow duration-500 rounded-lg overflow-hidden',
      borderGlowClass
    )}>
      {/* Compact Header */}
      <div className="flex items-center justify-between px-3 py-2 border-b border-zinc-800/50 bg-zinc-900/80">
        <div className="flex items-center gap-2">
          <div className={cn(
            'w-2 h-2 rounded-full',
            session ? 'bg-emerald-400 animate-pulse' : 'bg-zinc-600'
          )} />
          <span className="text-[11px] font-medium text-zinc-400 uppercase tracking-wider">
            {tradePhase === 'logging' ? 'Log Trade' : 'Checklist'}
          </span>
        </div>
        <div className="flex items-center gap-1">
          <span className={cn(
            'text-xs font-mono tabular-nums px-1.5 py-0.5 rounded',
            tradePhase === 'logging'
              ? 'bg-amber-500/20 text-amber-300'
              : score >= UNLOCK_THRESHOLD
              ? 'bg-teal-500/20 text-teal-300'
              : score >= 40
              ? 'bg-amber-500/20 text-amber-300'
              : 'bg-zinc-800 text-zinc-500'
          )}>
            {tradePhase === 'logging' ? `#${trades.length}` : `${score}%`}
          </span>
        </div>
      </div>

      {/* EMA Toggle — always visible */}
      <div className="flex items-center gap-1 px-3 py-2 border-b border-zinc-800/30">
        <span className="text-[10px] text-zinc-500 mr-1.5 uppercase tracking-wider">20 EMA:</span>
        <button
          onClick={() => setEmaDirection(emaDirection === 'above' ? null : 'above')}
          className={cn(
            'flex-1 px-2 py-1 rounded text-[11px] font-medium transition-all text-center',
            emaDirection === 'above'
              ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/50 shadow-sm shadow-emerald-500/20'
              : 'bg-zinc-800/50 text-zinc-500 border border-zinc-700/50 hover:border-zinc-600'
          )}
        >
          Above
        </button>
        <button
          onClick={() => setEmaDirection(emaDirection === 'below' ? null : 'below')}
          className={cn(
            'flex-1 px-2 py-1 rounded text-[11px] font-medium transition-all text-center',
            emaDirection === 'below'
              ? 'bg-red-500/20 text-red-300 border border-red-500/50 shadow-sm shadow-red-500/20'
              : 'bg-zinc-800/50 text-zinc-500 border border-zinc-700/50 hover:border-zinc-600'
          )}
        >
          Below
        </button>
      </div>

      {/* Main content area — switches between checklist and trade logging */}
      {tradePhase === 'idle' && (
        <>
          {/* Rule Checkboxes */}
          <div className="flex-1 overflow-y-auto px-3 py-2 space-y-1.5">
            {entryRules.map((rule) => (
              <button
                key={rule.id}
                onClick={() => toggleRule(rule.id)}
                className={cn(
                  'w-full flex items-center gap-2.5 px-2.5 py-2 rounded-md text-left transition-all',
                  'border',
                  rule.enabled
                    ? 'border-teal-500/40 bg-teal-500/10 text-teal-200'
                    : 'border-zinc-800 bg-zinc-900/50 text-zinc-400 hover:border-zinc-700 hover:bg-zinc-800/50'
                )}
              >
                <div className={cn(
                  'w-4 h-4 rounded border-2 flex items-center justify-center flex-shrink-0 transition-all',
                  rule.enabled
                    ? 'border-teal-400 bg-teal-500'
                    : 'border-zinc-600 bg-transparent'
                )}>
                  {rule.enabled && (
                    <svg className="w-2.5 h-2.5 text-zinc-950" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={3}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  )}
                </div>
                <span className="text-[12px] leading-tight">{rule.title}</span>
              </button>
            ))}

            {entryRules.length === 0 && (
              <p className="text-xs text-zinc-600 italic text-center py-4">
                No entry rules configured. Add rules in the main dashboard.
              </p>
            )}
          </div>

          {/* Execute Button Area */}
          <div className="px-3 py-2.5 border-t border-zinc-800/50 bg-zinc-900/50">
            {allSlotsFilled ? (
              <div className="w-full py-2.5 rounded-md bg-zinc-800/50 border border-zinc-700/50 text-center">
                <span className="text-zinc-500 text-xs">All {maxTrades} slots filled</span>
              </div>
            ) : isUnlocked ? (
              <button
                onClick={handleExecute}
                className={cn(
                  'w-full py-2.5 rounded-md font-semibold text-sm transition-all',
                  'bg-teal-500 text-zinc-950 hover:bg-teal-400 active:scale-[0.98]',
                  'shadow-lg shadow-teal-500/25'
                )}
              >
                Execute Trade
              </button>
            ) : (
              <div className="w-full py-2.5 rounded-md bg-zinc-800/30 border border-zinc-700/30 text-center">
                <span className="text-zinc-500 text-[11px]">
                  Check {Math.ceil(totalCount * (UNLOCK_THRESHOLD / 100)) - enabledCount} more rule{Math.ceil(totalCount * (UNLOCK_THRESHOLD / 100)) - enabledCount !== 1 ? 's' : ''} to unlock
                </span>
              </div>
            )}
          </div>
        </>
      )}

      {/* Quick Trade Logging Form */}
      {tradePhase === 'logging' && (
        <div className="flex-1 flex flex-col px-3 py-3 space-y-3 overflow-y-auto animate-fade-in">
          {/* Result Picker */}
          <div className="space-y-1.5">
            <span className="text-[10px] text-zinc-500 uppercase tracking-wider">Result</span>
            <div className="grid grid-cols-4 gap-1.5">
              {RESULTS.map(({ value, label, color }) => (
                <button
                  key={value}
                  onClick={() => setTradeResult(value)}
                  className={cn(
                    'py-2 rounded-md border text-xs font-bold transition-all text-center',
                    tradeResult === value
                      ? color
                      : 'border-zinc-700/50 bg-zinc-800/30 text-zinc-500 hover:border-zinc-600'
                  )}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>

          {/* R-Multiple */}
          <div className="space-y-1.5">
            <span className="text-[10px] text-zinc-500 uppercase tracking-wider">R-Multiple</span>
            <input
              type="number"
              step="0.1"
              placeholder="e.g. 2.5 or -1"
              value={tradeR}
              onChange={(e) => setTradeR(e.target.value)}
              className={cn(
                'w-full h-9 px-3 rounded-md border border-zinc-700 bg-zinc-800/50',
                'text-sm text-zinc-100 placeholder:text-zinc-600',
                'focus:outline-none focus:ring-2 focus:ring-teal-500/50 focus:border-teal-500'
              )}
            />
          </div>

          {/* PnL */}
          <div className="space-y-1.5">
            <span className="text-[10px] text-zinc-500 uppercase tracking-wider">PnL ($)</span>
            <input
              type="number"
              step="1"
              placeholder="Dollar amount"
              value={tradePnl}
              onChange={(e) => setTradePnl(e.target.value)}
              className={cn(
                'w-full h-9 px-3 rounded-md border border-zinc-700 bg-zinc-800/50',
                'text-sm text-zinc-100 placeholder:text-zinc-600',
                'focus:outline-none focus:ring-2 focus:ring-teal-500/50 focus:border-teal-500'
              )}
            />
          </div>

          {/* Quick Note */}
          <div className="space-y-1.5">
            <span className="text-[10px] text-zinc-500 uppercase tracking-wider">Quick Note (optional)</span>
            <textarea
              placeholder="What happened?"
              value={tradeNotes}
              onChange={(e) => setTradeNotes(e.target.value)}
              rows={2}
              className={cn(
                'w-full px-3 py-2 rounded-md border border-zinc-700 bg-zinc-800/50',
                'text-xs text-zinc-100 placeholder:text-zinc-600 resize-none',
                'focus:outline-none focus:ring-2 focus:ring-teal-500/50 focus:border-teal-500'
              )}
            />
          </div>

          {/* Save / Skip buttons */}
          <div className="flex gap-2 pt-1">
            <button
              onClick={handleSaveTrade}
              className={cn(
                'flex-1 py-2.5 rounded-md font-semibold text-sm transition-all',
                'bg-teal-500 text-zinc-950 hover:bg-teal-400 active:scale-[0.98]'
              )}
            >
              Save
            </button>
            <button
              onClick={handleSkipLog}
              className="px-4 py-2.5 rounded-md text-xs text-zinc-500 border border-zinc-700/50 hover:text-zinc-300 hover:border-zinc-600 transition-colors"
            >
              Skip
            </button>
          </div>
        </div>
      )}

      {/* Success confirmation */}
      {tradePhase === 'done' && (
        <div className="flex-1 flex items-center justify-center px-3">
          <div className="text-center space-y-2 animate-fade-in">
            <div className="w-10 h-10 mx-auto rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center">
              <svg className="w-5 h-5 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <p className="text-sm text-emerald-300 font-medium">Trade Logged</p>
            <p className="text-[10px] text-zinc-500">Rules reset — check off for next trade</p>
          </div>
        </div>
      )}

      {/* Footer - trade count */}
      {session && (
        <div className="px-3 py-1.5 border-t border-zinc-800/30 text-center">
          <span className="text-[10px] text-zinc-600">
            Trades: {trades.length}/{maxTrades}
          </span>
        </div>
      )}
    </div>
  );
}
