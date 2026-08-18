import { useState } from 'react';
import { useCockpit } from '@/lib/cockpitStore';
import { cn } from '@/lib/utils';
import { LEVEL_TYPES, DISTANCE_BANDS } from '@/lib/cockpitConstants';

function getDistanceBand(points) {
  const abs = Math.abs(points);
  for (const band of DISTANCE_BANDS) {
    if (abs >= band.min) return band;
  }
  return DISTANCE_BANDS[0];
}

export default function LevelsPanel() {
  const { levels, currentPrice, addLevel, removeLevel } = useCockpit();
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ name: '', price: '', type: 'Custom', direction: 'support', strength: 3 });

  const sorted = [...levels].sort((a, b) => {
    const da = currentPrice ? Math.abs(Number(a.price) - currentPrice) : 0;
    const db2 = currentPrice ? Math.abs(Number(b.price) - currentPrice) : 0;
    return da - db2;
  });

  const handleAdd = () => {
    if (!form.price) return;
    addLevel({ ...form, price: Number(form.price), strength: Number(form.strength) });
    setForm({ name: '', price: '', type: 'Custom', direction: 'support', strength: 3 });
    setShowForm(false);
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <h3 className="text-xs font-medium text-zinc-400 uppercase tracking-wider">
          Levels ({levels.length})
        </h3>
        <button
          onClick={() => setShowForm(!showForm)}
          className="text-[10px] text-teal-400 hover:text-teal-300"
        >
          {showForm ? 'Cancel' : '+ Add'}
        </button>
      </div>
      <div className="space-y-2">
        {showForm && (
          <div className="space-y-1.5 p-2 bg-zinc-900/50 border border-zinc-800 rounded">
            <input
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              placeholder="Name"
              className="w-full bg-zinc-900 border border-zinc-800 rounded px-2 py-1 text-xs text-zinc-300 focus:outline-none focus:border-teal-400/50"
            />
            <input
              type="number"
              value={form.price}
              onChange={(e) => setForm({ ...form, price: e.target.value })}
              placeholder="Price"
              className="w-full bg-zinc-900 border border-zinc-800 rounded px-2 py-1 text-xs text-zinc-300 tabular-nums focus:outline-none focus:border-teal-400/50"
            />
            <select
              value={form.type}
              onChange={(e) => setForm({ ...form, type: e.target.value })}
              className="w-full bg-zinc-900 border border-zinc-800 rounded px-2 py-1 text-xs text-zinc-300 focus:outline-none focus:border-teal-400/50"
            >
              {LEVEL_TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
            </select>
            <div className="flex gap-1">
              <select
                value={form.direction}
                onChange={(e) => setForm({ ...form, direction: e.target.value })}
                className="flex-1 bg-zinc-900 border border-zinc-800 rounded px-2 py-1 text-xs text-zinc-300 focus:outline-none focus:border-teal-400/50"
              >
                <option value="support">Support</option>
                <option value="resistance">Resistance</option>
              </select>
              <select
                value={form.strength}
                onChange={(e) => setForm({ ...form, strength: e.target.value })}
                className="w-16 bg-zinc-900 border border-zinc-800 rounded px-2 py-1 text-xs text-zinc-300 focus:outline-none focus:border-teal-400/50"
              >
                {[1, 2, 3, 4, 5].map((s) => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
            <button
              onClick={handleAdd}
              className="w-full py-1 rounded text-[10px] font-medium bg-teal-400/10 border border-teal-400/50 text-teal-400 hover:bg-teal-400/20"
            >
              Add Level
            </button>
          </div>
        )}

        <div className="space-y-1 max-h-48 overflow-y-auto">
          {sorted.map((level) => {
            const dist = currentPrice ? Number(level.price) - currentPrice : 0;
            const band = getDistanceBand(dist);
            return (
              <div
                key={level.id}
                className="group flex items-center gap-2 px-2 py-1 rounded bg-zinc-900/50 border border-zinc-800 hover:border-zinc-700"
              >
                <span className="text-[10px] text-zinc-500">
                  {level.direction === 'support' ? '▲' : '▼'}
                </span>
                <div className="flex-1 min-w-0">
                  <div className="text-xs text-zinc-300 truncate">
                    {level.name || level.type}
                  </div>
                  <div className="text-[10px] text-zinc-500">{level.type}</div>
                </div>
                <span className="text-xs tabular-nums text-zinc-300">{Number(level.price).toFixed(2)}</span>
                <span className="flex gap-0.5">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <span key={i} className={cn('w-1 h-1 rounded-full', i < level.strength ? 'bg-teal-400' : 'bg-zinc-700')} />
                  ))}
                </span>
                <span className="text-[10px] tabular-nums" style={{ color: band.color }}>
                  {dist > 0 ? '+' : ''}{dist.toFixed(1)}
                </span>
                <button
                  onClick={() => removeLevel(level.id)}
                  className="opacity-0 group-hover:opacity-100 text-zinc-500 hover:text-red-400 text-xs transition-opacity"
                >
                  ✕
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
