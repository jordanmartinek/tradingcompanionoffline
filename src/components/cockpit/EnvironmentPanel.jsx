import { useState } from 'react';
import { useCockpit } from '@/lib/cockpitStore';
import { cn } from '@/lib/utils';
import { STRUCTURE_TYPES, HTF_TIMEFRAMES, GAMMA_REGIMES } from '@/lib/cockpitConstants';

export default function EnvironmentPanel() {
  const { context, saveContext } = useCockpit();

  const handleChange = (key, value) => {
    saveContext({ [key]: value });
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <h3 className="text-xs font-medium text-zinc-400 uppercase tracking-wider">Environment</h3>
      </div>
      <div className="space-y-2">
        {/* Market Structure */}
        <div className="space-y-1">
          <label className="text-[10px] text-zinc-500 uppercase">Structure</label>
          <select
            value={context.market_structure}
            onChange={(e) => handleChange('market_structure', e.target.value)}
            className="w-full bg-zinc-900/50 border border-zinc-800 rounded px-2 py-1 text-xs text-zinc-300 focus:outline-none focus:border-teal-400/50"
          >
            <option value="">—</option>
            {STRUCTURE_TYPES.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
        </div>

        {/* HTF Bias */}
        <div className="space-y-1">
          <label className="text-[10px] text-zinc-500 uppercase">HTF Bias</label>
          <select
            value={context.htf_bias}
            onChange={(e) => handleChange('htf_bias', e.target.value)}
            className="w-full bg-zinc-900/50 border border-zinc-800 rounded px-2 py-1 text-xs text-zinc-300 focus:outline-none focus:border-teal-400/50"
          >
            <option value="">—</option>
            {HTF_TIMEFRAMES.map((t) => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>
        </div>

        {/* Gamma Regime */}
        <div className="space-y-1">
          <label className="text-[10px] text-zinc-500 uppercase">Gamma Regime</label>
          <div className="flex gap-1">
            {GAMMA_REGIMES.map((g) => (
              <button
                key={g}
                onClick={() => handleChange('gamma_regime', g)}
                className={cn(
                  'flex-1 px-2 py-1 rounded text-[10px] font-medium border transition-colors',
                  context.gamma_regime === g
                    ? 'bg-teal-400/10 border-teal-400/50 text-teal-400'
                    : 'bg-zinc-900/50 border-zinc-800 text-zinc-500 hover:text-zinc-300'
                )}
              >
                {g}
              </button>
            ))}
          </div>
        </div>

        {/* GEX Walls */}
        <div className="grid grid-cols-2 gap-2">
          <div className="space-y-1">
            <label className="text-[10px] text-zinc-500 uppercase">Call Wall</label>
            <input
              type="number"
              value={context.gex_call_wall}
              onChange={(e) => handleChange('gex_call_wall', e.target.value)}
              className="w-full bg-zinc-900/50 border border-zinc-800 rounded px-2 py-1 text-xs text-zinc-300 tabular-nums focus:outline-none focus:border-teal-400/50"
              placeholder="0"
            />
          </div>
          <div className="space-y-1">
            <label className="text-[10px] text-zinc-500 uppercase">Put Wall</label>
            <input
              type="number"
              value={context.gex_put_wall}
              onChange={(e) => handleChange('gex_put_wall', e.target.value)}
              className="w-full bg-zinc-900/50 border border-zinc-800 rounded px-2 py-1 text-xs text-zinc-300 tabular-nums focus:outline-none focus:border-teal-400/50"
              placeholder="0"
            />
          </div>
        </div>

        {/* Scenarios */}
        <div className="space-y-1">
          <label className="text-[10px] text-zinc-500 uppercase">Scenarios</label>
          <textarea
            value={context.scenarios}
            onChange={(e) => handleChange('scenarios', e.target.value)}
            rows={3}
            className="w-full bg-zinc-900/50 border border-zinc-800 rounded px-2 py-1 text-xs text-zinc-300 resize-none focus:outline-none focus:border-teal-400/50"
            placeholder="If price does X, then Y..."
          />
        </div>
      </div>
    </div>
  );
}
