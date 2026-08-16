import React, { useState, useEffect } from 'react';
import { TradingSession, Trade } from '@/api/db';
import { cn } from '@/lib/utils';

const HOURS = ['06', '07', '08', '09', '10', '11', '12', '13', '14', '15', '16'];

export default function TimeHeatmap() {
  const [hourData, setHourData] = useState({});

  useEffect(() => {
    async function load() {
      const sessions = await TradingSession.list({ status: 'ended' });
      const data = {};

      for (const sess of sessions) {
        const trades = await Trade.list({ session_id: sess.id });
        for (const trade of trades) {
          if (!trade.entry_time) continue;
          const hour = new Date(trade.entry_time).getHours().toString().padStart(2, '0');
          if (!data[hour]) data[hour] = { wins: 0, losses: 0, pnl: 0, count: 0 };
          data[hour].count++;
          data[hour].pnl += trade.pnl || 0;
          if (trade.result === 'win') data[hour].wins++;
          if (trade.result === 'loss') data[hour].losses++;
        }
      }
      setHourData(data);
    }
    load();
  }, []);

  const hasData = Object.keys(hourData).length > 0;

  if (!hasData) {
    return <p className="text-xs text-zinc-600 italic text-center py-4">Need trades with entry times to show heatmap.</p>;
  }

  // Find max absolute PnL for color scaling
  const maxAbsPnl = Math.max(1, ...Object.values(hourData).map(d => Math.abs(d.pnl)));

  return (
    <div className="space-y-2">
      <div className="grid grid-cols-11 gap-1">
        {HOURS.map(hour => {
          const d = hourData[hour];
          if (!d || d.count === 0) {
            return (
              <div key={hour} className="flex flex-col items-center">
                <div className="w-full aspect-square rounded bg-zinc-800/30 border border-zinc-800" />
                <span className="text-[8px] text-zinc-700 mt-0.5">{hour}</span>
              </div>
            );
          }

          const intensity = Math.min(1, Math.abs(d.pnl) / maxAbsPnl);
          const isGreen = d.pnl >= 0;
          const winRate = d.count > 0 ? Math.round((d.wins / d.count) * 100) : 0;

          return (
            <div key={hour} className="flex flex-col items-center" title={`${hour}:00 — ${d.count} trades, WR: ${winRate}%, PnL: $${d.pnl.toFixed(0)}`}>
              <div
                className="w-full aspect-square rounded border flex items-center justify-center"
                style={{
                  backgroundColor: isGreen
                    ? `rgba(16, 185, 129, ${0.1 + intensity * 0.5})`
                    : `rgba(239, 68, 68, ${0.1 + intensity * 0.5})`,
                  borderColor: isGreen
                    ? `rgba(16, 185, 129, ${0.2 + intensity * 0.4})`
                    : `rgba(239, 68, 68, ${0.2 + intensity * 0.4})`,
                }}
              >
                <span className="text-[8px] font-mono tabular-nums text-zinc-200">{winRate}%</span>
              </div>
              <span className="text-[8px] text-zinc-600 mt-0.5">{hour}</span>
            </div>
          );
        })}
      </div>

      {/* Legend */}
      <div className="flex items-center justify-center gap-3 text-[9px] text-zinc-500">
        <span>Green = profitable hour</span>
        <span>Red = losing hour</span>
        <span>Intensity = magnitude</span>
      </div>
    </div>
  );
}
