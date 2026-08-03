import React, { useMemo } from 'react';
import { cn } from '@/lib/utils';

const RESULT_COLORS = {
  win: { fill: '#10b981', glow: '#10b98150', label: 'W' },
  loss: { fill: '#ef4444', glow: '#ef444450', label: 'L' },
  breakeven: { fill: '#71717a', glow: '#71717a40', label: 'BE' },
  scratched: { fill: '#3b82f6', glow: '#3b82f640', label: 'S' },
};

/**
 * Returns a CSS color string for the wheel's pulsing glow based on execution score.
 * 0-30: red, 30-50: orange, 50-70: yellow, 70-80: green, 80-100: bright teal
 */
function getScoreColor(score) {
  if (score <= 30) return { r: 239, g: 68, b: 68 };    // red
  if (score <= 50) return { r: 249, g: 115, b: 22 };   // orange
  if (score <= 70) return { r: 234, g: 179, b: 8 };    // yellow
  if (score <= 80) return { r: 34, g: 197, b: 94 };    // green
  return { r: 45, g: 212, b: 191 };                     // bright teal
}

function lerpColor(score) {
  // Smooth interpolation between color stops
  const stops = [
    { at: 0,   r: 239, g: 68,  b: 68  },  // red
    { at: 30,  r: 249, g: 115, b: 22  },  // orange
    { at: 50,  r: 234, g: 179, b: 8   },  // yellow
    { at: 70,  r: 34,  g: 197, b: 94  },  // green
    { at: 80,  r: 45,  g: 212, b: 191 },  // teal
    { at: 100, r: 45,  g: 212, b: 191 },  // teal (hold)
  ];

  // Find the two stops we're between
  let lower = stops[0], upper = stops[1];
  for (let i = 0; i < stops.length - 1; i++) {
    if (score >= stops[i].at && score <= stops[i + 1].at) {
      lower = stops[i];
      upper = stops[i + 1];
      break;
    }
  }

  const range = upper.at - lower.at || 1;
  const t = (score - lower.at) / range;
  const r = Math.round(lower.r + (upper.r - lower.r) * t);
  const g = Math.round(lower.g + (upper.g - lower.g) * t);
  const b = Math.round(lower.b + (upper.b - lower.b) * t);
  return { r, g, b };
}

export default function DisciplineWheel({
  maxTrades = 3,
  trades = [],
  isLocked = false,
  executionScore = 0,
  emaDirection = null,
  onSlotClick,
}) {
  const size = 280;
  const center = size / 2;
  const outerRadius = 115;
  const innerRadius = 70;
  const gap = 0.04;

  // Compute the pulsing glow color
  const scoreColor = useMemo(() => lerpColor(executionScore), [executionScore]);
  const glowRgb = `${scoreColor.r}, ${scoreColor.g}, ${scoreColor.b}`;

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

    const midAngle = (startAngle + endAngle) / 2;
    const labelRadius = (outerRadius + innerRadius) / 2;
    const labelX = center + labelRadius * Math.cos(midAngle);
    const labelY = center + labelRadius * Math.sin(midAngle);

    segments.push({ path, trade, index: i, labelX, labelY });
  }

  const completedTrades = trades.filter(Boolean).length;

  return (
    <div className="relative flex items-center justify-center">
      {/* Pulsing glow ring behind the wheel */}
      <div
        className="absolute rounded-full animate-pulse-glow"
        style={{
          width: size + 40,
          height: size + 40,
          background: `radial-gradient(circle, rgba(${glowRgb}, 0.15) 0%, rgba(${glowRgb}, 0.05) 50%, transparent 70%)`,
          boxShadow: `0 0 60px rgba(${glowRgb}, 0.2), 0 0 120px rgba(${glowRgb}, 0.1)`,
          transition: 'background 0.8s ease, box-shadow 0.8s ease',
        }}
      />

      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        className="relative z-10"
      >
        {/* Outer score-colored ring */}
        <circle
          cx={center}
          cy={center}
          r={outerRadius + 6}
          fill="none"
          stroke={`rgba(${glowRgb}, 0.4)`}
          strokeWidth={2.5}
          strokeDasharray="4 3"
          className="animate-pulse-glow"
          style={{ transition: 'stroke 0.8s ease' }}
        />

        {/* EMA direction ring */}
        {emaDirection && (
          <circle
            cx={center}
            cy={center}
            r={outerRadius + 12}
            fill="none"
            stroke={emaDirection === 'above' ? '#10b981' : '#ef4444'}
            strokeWidth={3}
            strokeDasharray="6 4"
            opacity={0.7}
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
              {colors && (
                <path d={path} fill={colors.glow} stroke={colors.fill} strokeWidth={1.5} />
              )}
              <path
                d={path}
                fill={isEmpty ? 'rgba(63, 63, 70, 0.25)' : colors?.fill || '#3f3f46'}
                stroke={isEmpty ? '#3f3f46' : colors?.fill || '#52525b'}
                strokeWidth={isEmpty ? 0.5 : 2}
                opacity={isEmpty ? 0.5 : 0.9}
                className="transition-all duration-300"
              />
              {colors && (
                <text
                  x={labelX} y={labelY}
                  textAnchor="middle" dominantBaseline="central"
                  fill="white" fontSize="13" fontWeight="bold"
                  className="select-none"
                >
                  {colors.label}
                </text>
              )}
              {isEmpty && (
                <text
                  x={labelX} y={labelY}
                  textAnchor="middle" dominantBaseline="central"
                  fill="#52525b" fontSize="11"
                  className="select-none"
                >
                  {index + 1}
                </text>
              )}
            </g>
          );
        })}

        {/* Center */}
        <circle
          cx={center} cy={center} r={innerRadius - 8}
          fill="rgba(9, 9, 11, 0.9)"
          stroke={`rgba(${glowRgb}, 0.3)`}
          strokeWidth={1.5}
          style={{ transition: 'stroke 0.8s ease' }}
        />

        {isLocked ? (
          <>
            <svg x={center - 12} y={center - 16} width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={`rgb(${glowRgb})`} strokeWidth="2">
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
              <path d="M7 11V7a5 5 0 0 1 10 0v4" />
            </svg>
            <text x={center} y={center + 20} textAnchor="middle" fill={`rgb(${glowRgb})`} fontSize="10" fontWeight="600" className="select-none">
              {executionScore}%
            </text>
          </>
        ) : (
          <>
            <text x={center} y={center - 4} textAnchor="middle" fill="#fafafa" fontSize="26" fontWeight="bold" className="select-none tabular-nums">
              {completedTrades}/{maxTrades}
            </text>
            <text x={center} y={center + 16} textAnchor="middle" fill={`rgb(${glowRgb})`} fontSize="10" fontWeight="500" className="select-none">
              {executionScore}%
            </text>
          </>
        )}
      </svg>
    </div>
  );
}
