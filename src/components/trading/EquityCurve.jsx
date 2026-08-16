import React, { useState, useEffect } from 'react';
import { TradingSession, Trade } from '@/api/db';
import { cn } from '@/lib/utils';

export default function EquityCurve() {
  const [data, setData] = useState({ all: [], aplus: [] });

  useEffect(() => {
    async function load() {
      const sessions = await TradingSession.list({ status: 'ended' });
      sessions.sort((a, b) => new Date(a.created_date) - new Date(b.created_date));

      let cumAll = 0;
      let cumAplus = 0;
      const allPoints = [{ x: 0, y: 0 }];
      const aplusPoints = [{ x: 0, y: 0 }];

      let tradeIdx = 0;
      for (const sess of sessions) {
        const trades = await Trade.list({ session_id: sess.id });
        trades.sort((a, b) => (a.slot_index || 0) - (b.slot_index || 0));
        for (const t of trades) {
          tradeIdx++;
          cumAll += t.pnl || 0;
          allPoints.push({ x: tradeIdx, y: cumAll });

          const isAplus = t.rule_compliance?.length > 0 && t.rule_compliance.every(r => r.followed);
          if (isAplus) {
            cumAplus += t.pnl || 0;
          }
          aplusPoints.push({ x: tradeIdx, y: cumAplus });
        }
      }
      setData({ all: allPoints, aplus: aplusPoints });
    }
    load();
  }, []);

  if (data.all.length <= 1) {
    return <p className="text-xs text-zinc-600 italic text-center py-4">Need more trades to show equity curve.</p>;
  }

  // SVG dimensions
  const w = 500, h = 160, pad = 30;
  const maxTrades = data.all[data.all.length - 1].x;
  const allYs = [...data.all.map(p => p.y), ...data.aplus.map(p => p.y)];
  const minY = Math.min(0, ...allYs);
  const maxY = Math.max(0, ...allYs);
  const yRange = maxY - minY || 1;

  const toSvg = (point) => ({
    x: pad + (point.x / (maxTrades || 1)) * (w - 2 * pad),
    y: pad + (1 - (point.y - minY) / yRange) * (h - 2 * pad),
  });

  const pathFromPoints = (points) => {
    return points.map((p, i) => {
      const { x, y } = toSvg(p);
      return `${i === 0 ? 'M' : 'L'} ${x} ${y}`;
    }).join(' ');
  };

  const zeroY = toSvg({ x: 0, y: 0 }).y;

  return (
    <div className="w-full overflow-x-auto">
      <svg viewBox={`0 0 ${w} ${h}`} className="w-full h-40">
        {/* Zero line */}
        <line x1={pad} y1={zeroY} x2={w - pad} y2={zeroY} stroke="#3f3f46" strokeWidth={0.5} strokeDasharray="4 2" />

        {/* All trades line */}
        <path d={pathFromPoints(data.all)} fill="none" stroke="#71717a" strokeWidth={1.5} />

        {/* A+ trades line */}
        <path d={pathFromPoints(data.aplus)} fill="none" stroke="#2dd4bf" strokeWidth={2} />

        {/* End labels */}
        {data.all.length > 1 && (
          <text x={w - pad + 4} y={toSvg(data.all[data.all.length - 1]).y + 3} fill="#71717a" fontSize="9">
            ${data.all[data.all.length - 1].y >= 0 ? '+' : ''}{data.all[data.all.length - 1].y.toFixed(0)}
          </text>
        )}
        {data.aplus.length > 1 && (
          <text x={w - pad + 4} y={toSvg(data.aplus[data.aplus.length - 1]).y + 3} fill="#2dd4bf" fontSize="9">
            ${data.aplus[data.aplus.length - 1].y >= 0 ? '+' : ''}{data.aplus[data.aplus.length - 1].y.toFixed(0)}
          </text>
        )}

        {/* Y axis labels */}
        <text x={2} y={pad + 3} fill="#52525b" fontSize="8">${maxY.toFixed(0)}</text>
        <text x={2} y={h - pad + 3} fill="#52525b" fontSize="8">${minY.toFixed(0)}</text>
        <text x={2} y={zeroY + 3} fill="#52525b" fontSize="8">$0</text>
      </svg>

      {/* Legend */}
      <div className="flex items-center justify-center gap-4 mt-1">
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-0.5 bg-zinc-500 rounded" />
          <span className="text-[9px] text-zinc-500">All trades</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-0.5 bg-teal-400 rounded" />
          <span className="text-[9px] text-teal-400">A+ trades only</span>
        </div>
      </div>
    </div>
  );
}
