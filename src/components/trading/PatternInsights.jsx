import React, { useState, useEffect } from 'react';
import { TradingSession, Trade } from '@/api/db';
import { detectPatterns } from '@/lib/patterns';
import { cn } from '@/lib/utils';

const TYPE_STYLES = {
  positive: 'bg-emerald-500/10 border-emerald-500/20 text-emerald-300',
  warning: 'bg-amber-500/10 border-amber-500/20 text-amber-300',
  danger: 'bg-red-500/10 border-red-500/20 text-red-300',
  info: 'bg-zinc-800/50 border-zinc-700/50 text-zinc-400',
};

export default function PatternInsights() {
  const [patterns, setPatterns] = useState([]);

  useEffect(() => {
    async function load() {
      const sessions = await TradingSession.list({ status: 'ended' });
      const allTrades = [];
      for (const sess of sessions) {
        const trades = await Trade.list({ session_id: sess.id });
        allTrades.push(...trades);
      }
      setPatterns(detectPatterns(sessions, allTrades));
    }
    load();
  }, []);

  return (
    <div className="space-y-2">
      {patterns.map((pattern, idx) => (
        <div
          key={idx}
          className={cn(
            'px-3 py-2 rounded-md border text-xs leading-relaxed',
            TYPE_STYLES[pattern.type] || TYPE_STYLES.info
          )}
        >
          {pattern.text}
        </div>
      ))}
    </div>
  );
}
