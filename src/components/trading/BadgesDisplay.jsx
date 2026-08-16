import React, { useState, useEffect } from 'react';
import { TradingSession, Trade } from '@/api/db';
import { getBadges } from '@/lib/badges';
import { cn } from '@/lib/utils';

export default function BadgesDisplay() {
  const [badges, setBadges] = useState([]);

  useEffect(() => {
    async function load() {
      const sessions = await TradingSession.list({ status: 'ended' });
      const trades = [];
      for (const sess of sessions) {
        const t = await Trade.list({ session_id: sess.id });
        trades.push(...t);
      }
      setBadges(getBadges(sessions, trades));
    }
    load();
  }, []);

  if (badges.length === 0) {
    return (
      <div className="text-center py-4">
        <p className="text-xs text-zinc-600 italic">No badges earned yet. Keep trading with discipline!</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
      {badges.map((badge) => (
        <div
          key={badge.id}
          className="flex flex-col items-center p-3 rounded-lg bg-zinc-800/30 border border-zinc-700/50 text-center"
        >
          <span className="text-2xl mb-1">{badge.icon}</span>
          <span className="text-[10px] font-medium text-zinc-200 leading-tight">{badge.title}</span>
          {badge.earnedDate && (
            <span className="text-[9px] text-zinc-600 mt-0.5">
              {new Date(badge.earnedDate).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
            </span>
          )}
        </div>
      ))}
    </div>
  );
}
