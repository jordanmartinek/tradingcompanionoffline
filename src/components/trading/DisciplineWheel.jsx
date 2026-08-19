import React, { useMemo } from 'react';
import { cn } from '@/lib/utils';

/**
 * Liquidity Hunt Tracker — each segment represents one entry rule.
 * Segments fill with color as rules are checked off.
 * At 80%+ = "TRADERS TRAPPED" — ready to enter.
 * Trade count shown separately beside the wheel.
 */

// Color ramp for segments based on how many are filled
const SEGMENT_COLORS = [
  '#ef4444', // first rule — red (just starting)
  '#f97316', // orange
  '#eab308', // yellow
  '#22c55e', // green
  '#14b8a6', // teal
  '#2dd4bf', // bright teal (high confluence)
  '#2dd4bf',
  '#2dd4bf',
  '#2dd4bf',
  '#2dd4bf',
];

function getSegmentColor(index, total) {
  // Color progresses from red → teal based on position relative to total
  const ratio = index / Math.max(1, total - 1);
  if (ratio <= 0.2) return '#ef4444';
  if (ratio <= 0.4) return '#f97316';
  if (ratio <= 0.6) return '#eab308';
  if (ratio <= 0.8) return '#22c55e';
  return '#2dd4bf';
}

export default function DisciplineWheel({
  rules = [],
  executionScore = 0,
  trades = [],
  maxTrades = 3,
  liquidityTarget = null, // 'bsl' | 'ssl' | 'both' | null
  onSlotClick,
}) {
  const entryRules = rules.filter(r => r.category === 'entry');
  const totalRules = entryRules.length;
  const checkedCount = entryRules.filter(r => r.enabled).length;
  const isTrapped = executionScore >= 80;

  const size = 260;
  const center = size / 2;
  const outerRadius = 108;
  const innerRadius = 64;
  const gap = 0.05;

  // Compute glow color based on score
  const glowColor = useMemo(() => {
    if (executionScore >= 80) return { r: 45, g: 212, b: 191 };
    if (executionScore >= 60) return { r: 34, g: 197, b: 94 };
    if (executionScore >= 40) return { r: 234, g: 179, b: 8 };
    if (executionScore >= 20) return { r: 249, g: 115, b: 22 };
    return { r: 239, g: 68, b: 68 };
  }, [executionScore]);
  const glowRgb = `${glowColor.r}, ${glowColor.g}, ${glowColor.b}`;

  // Build segments — one per entry rule
  const segments = useMemo(() => {
    if (totalRules === 0) return [];
    const anglePerSegment = (2 * Math.PI) / totalRules;

    return entryRules.map((rule, i) => {
      const startAngle = i * anglePerSegment - Math.PI / 2 + gap / 2;
      const endAngle = (i + 1) * anglePerSegment - Math.PI / 2 - gap / 2;

      const x1O = center + outerRadius * Math.cos(startAngle);
      const y1O = center + outerRadius * Math.sin(startAngle);
      const x2O = center + outerRadius * Math.cos(endAngle);
      const y2O = center + outerRadius * Math.sin(endAngle);
      const x1I = center + innerRadius * Math.cos(endAngle);
      const y1I = center + innerRadius * Math.sin(endAngle);
      const x2I = center + innerRadius * Math.cos(startAngle);
      const y2I = center + innerRadius * Math.sin(startAngle);

      const largeArc = anglePerSegment - gap > Math.PI ? 1 : 0;
      const path = `M ${x1O} ${y1O} A ${outerRadius} ${outerRadius} 0 ${largeArc} 1 ${x2O} ${y2O} L ${x1I} ${y1I} A ${innerRadius} ${innerRadius} 0 ${largeArc} 0 ${x2I} ${y2I} Z`;

      const midAngle = (startAngle + endAngle) / 2;
      const labelRadius = (outerRadius + innerRadius) / 2;
      const labelX = center + labelRadius * Math.cos(midAngle);
      const labelY = center + labelRadius * Math.sin(midAngle);

      return { path, rule, labelX, labelY, color: getSegmentColor(i, totalRules) };
    });
  }, [entryRules, totalRules]);

  const completedTrades = trades.length;

  return (
    <div className="relative flex flex-col items-center">
      {/* Wheel with glow */}
      <div className="relative">
        {/* Pulsing glow — intensity scales with progress */}
        <div
          className="absolute rounded-full animate-pulse-glow"
          style={{
            width: size + 50,
            height: size + 50,
            top: -25,
            left: -25,
            background: `radial-gradient(circle, rgba(${glowRgb}, ${0.05 + (executionScore / 100) * 0.35}) 0%, rgba(${glowRgb}, ${(executionScore / 100) * 0.15}) 40%, transparent 70%)`,
            boxShadow: `0 0 ${20 + (executionScore / 100) * 80}px rgba(${glowRgb}, ${0.1 + (executionScore / 100) * 0.5}), 0 0 ${40 + (executionScore / 100) * 120}px rgba(${glowRgb}, ${(executionScore / 100) * 0.25})`,
            transition: 'all 0.6s ease',
          }}
        />

        <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="relative z-10">
          {/* Liquidity target ring */}
          {liquidityTarget && (
            <circle cx={center} cy={center} r={outerRadius + 8} fill="none"
              stroke={liquidityTarget === 'bsl' ? '#10b981' : liquidityTarget === 'ssl' ? '#ef4444' : '#f59e0b'}
              strokeWidth={2.5 + (executionScore / 100) * 1.5} strokeDasharray="5 3" opacity={0.4 + (executionScore / 100) * 0.5} className="animate-pulse-glow" />
          )}

          {/* Segments — one per rule */}
          {segments.map(({ path, rule, labelX, labelY, color }, idx) => (
            <g key={rule.id}>
              <path
                d={path}
                fill={rule.enabled ? color : 'rgba(39, 39, 42, 0.3)'}
                stroke={rule.enabled ? color : '#27272a'}
                strokeWidth={rule.enabled ? 2 : 0.5}
                opacity={rule.enabled ? 0.9 + (executionScore / 100) * 0.1 : 0.35}
                filter={rule.enabled ? `drop-shadow(0 0 ${3 + (executionScore / 100) * 6}px ${color})` : 'none'}
                className="transition-all duration-300"
              />
              {/* Abbreviated label */}
              <text
                x={labelX} y={labelY}
                textAnchor="middle" dominantBaseline="central"
                fill={rule.enabled ? '#fff' : '#52525b'}
                fontSize={totalRules > 6 ? '8' : '9'}
                className="select-none pointer-events-none"
              >
                {rule.title.slice(0, 3).toUpperCase()}
              </text>
            </g>
          ))}

          {/* Center circle */}
          <circle cx={center} cy={center} r={innerRadius - 6}
            fill="rgba(9, 9, 11, 0.9)"
            stroke={`rgba(${glowRgb}, ${0.15 + (executionScore / 100) * 0.6})`}
            strokeWidth={1.5 + (executionScore / 100) * 1}
            style={{ transition: 'stroke 0.6s ease, stroke-width 0.6s ease' }}
          />

          {/* Center content */}
          {isTrapped ? (
            <>
              <text x={center} y={center - 8} textAnchor="middle" fill="#2dd4bf" fontSize="9" fontWeight="700" className="select-none uppercase">
                Traders
              </text>
              <text x={center} y={center + 6} textAnchor="middle" fill="#2dd4bf" fontSize="9" fontWeight="700" className="select-none uppercase">
                Trapped
              </text>
              <text x={center} y={center + 22} textAnchor="middle" fill="#2dd4bf" fontSize="10" fontWeight="600" className="select-none tabular-nums">
                {executionScore}%
              </text>
            </>
          ) : (
            <>
              <text x={center} y={center - 4} textAnchor="middle" fill="#fafafa" fontSize="22" fontWeight="bold" className="select-none tabular-nums">
                {checkedCount}/{totalRules}
              </text>
              <text x={center} y={center + 16} textAnchor="middle" fill={`rgb(${glowRgb})`} fontSize="10" className="select-none">
                {executionScore}%
              </text>
            </>
          )}
        </svg>
      </div>

      {/* Trade count — below wheel */}
      <div className="mt-3 flex items-center gap-1.5">
        <span className="text-[10px] text-zinc-500">Trades:</span>
        <span className="text-xs font-mono tabular-nums text-zinc-300">{completedTrades}/{maxTrades}</span>
      </div>
    </div>
  );
}
