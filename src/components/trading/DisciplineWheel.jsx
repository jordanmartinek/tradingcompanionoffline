import React from 'react';
import { cn } from '@/lib/utils';

const RESULT_COLORS = {
  win: { fill: '#10b981', glow: '#10b98140', label: 'W' },
  loss: { fill: '#ef4444', glow: '#ef444440', label: 'L' },
  breakeven: { fill: '#71717a', glow: '#71717a40', label: 'BE' },
  scratched: { fill: '#3b82f6', glow: '#3b82f640', label: 'S' },
};

export default function DisciplineWheel({
  maxTrades = 3,
  trades = [],
  isLocked = false,
  executionScore = 0,
  emaDirection = null, // 'above' | 'below' | null
  onSlotClick,
}) {
  const size = 240;
  const center = size / 2;
  const outerRadius = 100;
  const innerRadius = 60;
  const gap = 0.04; // radians gap between segments

  const segments = [];
  const anglePerSegment = (2 * Math.PI) / maxTrades;

  for (let i = 0; i < maxTrades; i++) {
    const startAngle = i * anglePerSegment - Math.PI / 2 + gap / 2;
    const endAngle = (i + 1) * anglePerSegment - Math.PI / 2 - gap / 2;
    const trade = trades[i] || null;

    const x1Outer = center + outerRadius * Math.cos(startAngle);
    const y1Outer = center + outerRadius * Math.sin(startAngle);
    const x2Outer = center + outerRadius * Math.cos(endAngle);
    const y2Outer = center + outerRadius * Math.sin(endAngle);
    const x1Inner = center + innerRadius * Math.cos(endAngle);
    const y1Inner = center + innerRadius * Math.sin(endAngle);
    const x2Inner = center + innerRadius * Math.cos(startAngle);
    const y2Inner = center + innerRadius * Math.sin(startAngle);

    const largeArc = anglePerSegment - gap > Math.PI ? 1 : 0;

    const path = [
      `M ${x1Outer} ${y1Outer}`,
      `A ${outerRadius} ${outerRadius} 0 ${largeArc} 1 ${x2Outer} ${y2Outer}`,
      `L ${x1Inner} ${y1Inner}`,
      `A ${innerRadius} ${innerRadius} 0 ${largeArc} 0 ${x2Inner} ${y2Inner}`,
      'Z',
    ].join(' ');

    // Label position (midpoint of segment)
    const midAngle = (startAngle + endAngle) / 2;
    const labelRadius = (outerRadius + innerRadius) / 2;
    const labelX = center + labelRadius * Math.cos(midAngle);
    const labelY = center + labelRadius * Math.sin(midAngle);

    segments.push({ path, trade, index: i, labelX, labelY, midAngle });
  }

  const completedTrades = trades.filter(Boolean).length;

  return (
    <div className="relative flex items-center justify-center">
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        className={cn(
          'transition-transform duration-200',
          isLocked && 'animate-pulse-shrink'
        )}
      >
        {/* EMA direction ring */}
        {emaDirection && (
          <circle
            cx={center}
            cy={center}
            r={outerRadius + 8}
            fill="none"
            stroke={emaDirection === 'above' ? '#10b981' : '#ef4444'}
            strokeWidth={3}
            strokeDasharray="6 4"
            opacity={0.6}
            className="animate-pulse-glow"
          />
        )}

        {/* Segments */}
        {segments.map(({ path, trade, index, labelX, labelY }) => {
          const result = trade?.result;
          const colors = result ? RESULT_COLORS[result] : null;
          const isEmpty = !trade;

          return (
            <g
              key={index}
              onClick={() => {
                if (!isLocked && trade) onSlotClick?.(index);
              }}
              className={cn(
                !isLocked && trade && 'cursor-pointer',
                isLocked && 'cursor-not-allowed'
              )}
            >
              {/* Glow filter for filled segments */}
              {colors && (
                <path
                  d={path}
                  fill={colors.glow}
                  stroke={colors.fill}
                  strokeWidth={1.5}
                />
              )}
              <path
                d={path}
                fill={isEmpty ? 'rgba(63, 63, 70, 0.3)' : colors?.fill || '#3f3f46'}
                stroke={isEmpty ? '#52525b' : colors?.fill || '#52525b'}
                strokeWidth={isEmpty ? 1 : 2}
                opacity={isEmpty ? 0.4 : 0.85}
                className="transition-all duration-300"
              />
              {/* Result label */}
              {colors && (
                <text
                  x={labelX}
                  y={labelY}
                  textAnchor="middle"
                  dominantBaseline="central"
                  fill="white"
                  fontSize="12"
                  fontWeight="bold"
                  className="select-none"
                >
                  {colors.label}
                </text>
              )}
              {/* Empty slot number */}
              {isEmpty && (
                <text
                  x={labelX}
                  y={labelY}
                  textAnchor="middle"
                  dominantBaseline="central"
                  fill="#71717a"
                  fontSize="10"
                  className="select-none"
                >
                  {index + 1}
                </text>
              )}
            </g>
          );
        })}

        {/* Center content */}
        <circle
          cx={center}
          cy={center}
          r={innerRadius - 8}
          fill="rgba(9, 9, 11, 0.8)"
          stroke="#27272a"
          strokeWidth={1}
        />
        
        {isLocked ? (
          <>
            {/* Lock icon */}
            <svg x={center - 12} y={center - 16} width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#f59e0b" strokeWidth="2">
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
              <path d="M7 11V7a5 5 0 0 1 10 0v4" />
            </svg>
            <text
              x={center}
              y={center + 18}
              textAnchor="middle"
              fill="#f59e0b"
              fontSize="9"
              className="select-none"
            >
              LOCKED
            </text>
          </>
        ) : (
          <>
            <text
              x={center}
              y={center - 6}
              textAnchor="middle"
              fill="#fafafa"
              fontSize="22"
              fontWeight="bold"
              className="select-none tabular-nums"
            >
              {completedTrades}/{maxTrades}
            </text>
            <text
              x={center}
              y={center + 14}
              textAnchor="middle"
              fill="#71717a"
              fontSize="9"
              className="select-none"
            >
              TRADES
            </text>
          </>
        )}
      </svg>
    </div>
  );
}
