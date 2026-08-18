import { useState } from 'react';
import { useCockpit } from '@/lib/cockpitStore';
import { cn } from '@/lib/utils';
import { LIQUIDITY_TYPES } from '@/lib/cockpitConstants';

export default function LiquidityPanel() {
  const { liquidity, currentPrice, addLiquidity, removeLiquidity } = useCockpit();
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ name: '', price: '', upper: '', lower: '', type: 'Buy-Side', strength: 3 });

  const sorted = [...liquidity].sort((a, b) => {
    const da = currentPrice ? Math.abs(Number(a.price) - currentPrice) : 0;
    const db2 = currentPrice ? Math.abs(Number(b.price) - currentPrice) : 0;
    return da - db2;
  });

  const handleAdd = () => {
    if (!form.price) return;
    addLiquidity({
      ...form,
      price: Number(form.price),
      upper: Number(form.upper || form.price),
      lower: Number(form.lower || form.price),
      strength: Number(form.strength),
    });
    setForm({ name: '', price: '', upper: '', lower: '', type: 'Buy-Side', strength: 3 });
    setShowForm(false);
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <h3 className="text-xs font-medium text-zinc-400 uppercase tracking-wider">
          Liquidity ({liquidity.length})
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
              placeholder="Price (mid)"
              className="w-full bg-zinc-900 border border-zinc-800 rounded px-2 py-1 text-xs text-zinc-300 tabular-nums focus:outline-none focus:border-teal-400/50"
            />
            <div className="grid grid-cols-2 gap-1">
              <input
                type="number"
                value={form.lower}
                onChange={(e) => setForm({ ...form, lower: e.target.value })}
                placeholder="Lower"
                className="bg-zinc-900 border border-zinc-800 rounded px-2 py-1 text-xs text-zinc-300 tabular-nums focus:outline-none focus:border-teal-400/50"
              />
              <input
                type="number"
                value={form.upper}
                onChange={(e) => setForm({ ...form, upper: e.target.value })}
                placeholder="Upper"
                className="bg-zinc-900 border border-zinc-800 rounded px-2 py-1 text-xs text-zinc-300 tabular-nums focus:outline-none focus:border-teal-400/50"
              />
            </div>
            <div className="flex gap-1">
              <select
                value={form.type}
                onChange={(e) => setForm({ ...form, type: e.target.value })}
                className="flex-1 bg-zinc-900 border border-zinc-800 rounded px-2 py-1 text-xs text-zinc-300 focus:outline-none focus:border-teal-400/50"
              >
                {LIQUIDITY_TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
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
              Add Zone
            </button>
          </div>
        )}

        <div className="space-y-1 max-h-48 overflow-y-auto">
          {sorted.map((zone) => {
            const isInside = currentPrice && currentPrice >= Number(zone.lower) && currentPrice <= Number(zone.upper);
            const typeColor = zone.type === 'Buy-Side' || zone.type === 'Equal Highs' ? 'text-green-400' : 'text-red-400';
            return (
              <div
                key={zone.id}
                className="group flex items-center gap-2 px-2 py-1 rounded bg-zinc-900/50 border border-zinc-800 hover:border-zinc-700"
              >
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1">
                    <span className="text-xs text-zinc-300 truncate">{zone.name || zone.type}</span>
                    <span className={cn('text-[10px]', typeColor)}>{zone.type}</span>
                    {isInside && (
                      <span className="text-[9px] px-1 py-0.5 rounded bg-teal-400/10 text-teal-400 font-medium">INSIDE</span>
                    )}
                  </div>
                  <div className="text-[10px] text-zinc-500 tabular-nums">
                    {Number(zone.lower).toFixed(2)} — {Number(zone.upper).toFixed(2)}
                  </div>
                </div>
                <span className="flex gap-0.5">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <span key={i} className={cn('w-1 h-1 rounded-full', i < zone.strength ? 'bg-teal-400' : 'bg-zinc-700')} />
                  ))}
                </span>
                <button
                  onClick={() => removeLiquidity(zone.id)}
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
