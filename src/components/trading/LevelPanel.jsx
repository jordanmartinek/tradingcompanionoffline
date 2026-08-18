import React, { useMemo } from 'react';
import { cn } from '@/lib/utils';

/**
 * Parses price levels from free-text session fields.
 * Looks for patterns like: "BSL at 5480", "VAH: 5465", "5420 SSL", "equal lows at 5395"
 */
function parseLevels(session) {
  if (!session) return [];

  const levels = [];
  const sources = [
    { text: session.liquidity_pools || '', category: 'liquidity' },
    { text: session.likely_target || '', category: 'target' },
    { text: session.value_areas || '', category: 'value' },
  ];

  // Regex patterns to extract label + price
  const patterns = [
    // "BSL at 5480" or "SSL at 5420"
    /\b([A-Za-z/\s]{1,20})\s*(?:at|@|:)\s*\$?(\d+\.?\d*)/gi,
    // "5480 BSL" or "5420.50 level"
    /\$?(\d+\.?\d*)\s+([A-Za-z/\s]{1,20})/gi,
    // "VAH: 5465" or "POC: 5445"
    /\b([A-Z]{2,6})\s*[:=]\s*\$?(\d+\.?\d*)/gi,
  ];

  for (const source of sources) {
    if (!source.text) continue;

    // Split by common delimiters
    const segments = source.text.split(/[,;\n]+/);

    for (const segment of segments) {
      const trimmed = segment.trim();
      if (!trimmed) continue;

      let matched = false;

      // Try pattern 3 first (most specific: "VAH: 5465")
      const p3 = /\b([A-Z]{2,6})\s*[:=]\s*\$?(\d+\.?\d*)/i;
      const m3 = trimmed.match(p3);
      if (m3) {
        levels.push({ label: m3[1].trim().toUpperCase(), price: parseFloat(m3[2]), category: source.category });
        matched = true;
      }

      // Try pattern 1: "label at/@ price"
      if (!matched) {
        const p1 = /\b(.+?)\s*(?:at|@)\s*\$?(\d+\.?\d*)/i;
        const m1 = trimmed.match(p1);
        if (m1) {
          levels.push({ label: m1[1].trim(), price: parseFloat(m1[2]), category: source.category });
          matched = true;
        }
      }

      // Try pattern 2: "price label"
      if (!matched) {
        const p2 = /\$?(\d{3,6}\.?\d*)\s+(.+)/;
        const m2 = trimmed.match(p2);
        if (m2) {
          levels.push({ label: m2[2].trim(), price: parseFloat(m2[1]), category: source.category });
          matched = true;
        }
      }

      // Last resort: just find a number
      if (!matched) {
        const numMatch = trimmed.match(/\$?(\d{3,6}\.?\d*)/);
        if (numMatch) {
          levels.push({ label: trimmed.replace(numMatch[0], '').trim() || 'Level', price: parseFloat(numMatch[1]), category: source.category });
        }
      }
    }
  }

  // Deduplicate by price and sort descending
  const seen = new Set();
  const unique = levels.filter(l => {
    if (seen.has(l.price)) return false;
    seen.add(l.price);
    return true;
  });

  return unique.sort((a, b) => b.price - a.price);
}

const CATEGORY_COLORS = {
  liquidity: { bg: 'bg-purple-500/10', border: 'border-purple-500/30', text: 'text-purple-300', dot: 'bg-purple-400' },
  target: { bg: 'bg-amber-500/10', border: 'border-amber-500/30', text: 'text-amber-300', dot: 'bg-amber-400' },
  value: { bg: 'bg-blue-500/10', border: 'border-blue-500/30', text: 'text-blue-300', dot: 'bg-blue-400' },
};

export default function LevelPanel({ session }) {
  const levels = useMemo(() => parseLevels(session), [session]);

  if (levels.length === 0) return null;

  return (
    <div className="flex flex-col border-r border-zinc-800/30 w-28 flex-shrink-0 overflow-y-auto bg-zinc-950/50">
      {/* Header */}
      <div className="px-2 py-1.5 border-b border-zinc-800/30">
        <span className="text-[9px] text-zinc-500 uppercase tracking-wider font-medium">Levels</span>
      </div>

      {/* Level list */}
      <div className="flex-1 px-1 py-1 space-y-0.5">
        {levels.map((level, idx) => {
          const colors = CATEGORY_COLORS[level.category] || CATEGORY_COLORS.value;
          return (
            <div
              key={idx}
              className={cn(
                'flex items-center gap-1 px-1.5 py-1 rounded text-[9px]',
                colors.bg, 'border', colors.border
              )}
              title={`${level.label}: ${level.price}`}
            >
              <div className={cn('w-1 h-1 rounded-full flex-shrink-0', colors.dot)} />
              <span className={cn('font-mono tabular-nums font-medium', colors.text)}>
                {level.price % 1 === 0 ? level.price.toFixed(0) : level.price.toFixed(2)}
              </span>
              <span className="text-zinc-500 truncate ml-auto text-[8px]">
                {level.label.length > 6 ? level.label.slice(0, 6) : level.label}
              </span>
            </div>
          );
        })}
      </div>

      {/* Legend */}
      <div className="px-2 py-1 border-t border-zinc-800/30 space-y-0.5">
        <div className="flex items-center gap-1">
          <div className="w-1.5 h-1.5 rounded-full bg-purple-400" />
          <span className="text-[8px] text-zinc-600">Liquidity</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-1.5 h-1.5 rounded-full bg-amber-400" />
          <span className="text-[8px] text-zinc-600">Target</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-1.5 h-1.5 rounded-full bg-blue-400" />
          <span className="text-[8px] text-zinc-600">Value Area</span>
        </div>
      </div>
    </div>
  );
}
