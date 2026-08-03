import React, { useState } from 'react';
import { Progress } from '@/components/ui/progress';
import { cn } from '@/lib/utils';

export default function WeeklyGoalBar({ aPlusCount = 0, target = 10, avgScore = 0, onEditTarget }) {
  const [editing, setEditing] = useState(false);
  const [newTarget, setNewTarget] = useState(target);

  const percentage = target > 0 ? Math.round((aPlusCount / target) * 100) : 0;

  const handleSave = () => {
    onEditTarget?.(newTarget);
    setEditing(false);
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-xs text-zinc-400">Weekly A+ Goal</span>
          <span className={cn(
            'text-xs font-mono tabular-nums px-1.5 py-0.5 rounded',
            aPlusCount >= target
              ? 'bg-emerald-500/20 text-emerald-300'
              : 'bg-zinc-800 text-zinc-400'
          )}>
            {aPlusCount}/{target}
          </span>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-[10px] text-zinc-500">
            Avg Score: <span className="text-zinc-300 tabular-nums">{avgScore}%</span>
          </span>
          {editing ? (
            <div className="flex items-center gap-1">
              <input
                type="number"
                min={1}
                max={50}
                value={newTarget}
                onChange={(e) => setNewTarget(Number(e.target.value) || 1)}
                className="w-12 h-5 text-xs bg-zinc-800 border border-zinc-600 rounded px-1 text-center text-zinc-200"
                onKeyDown={(e) => e.key === 'Enter' && handleSave()}
              />
              <button onClick={handleSave} className="text-xs text-teal-400 hover:text-teal-300">
                Save
              </button>
            </div>
          ) : (
            <button
              onClick={() => setEditing(true)}
              className="text-[10px] text-zinc-600 hover:text-zinc-400 transition-colors"
            >
              Edit
            </button>
          )}
        </div>
      </div>
      <Progress value={aPlusCount} max={target} className="h-2" barClassName="bg-teal-500" />
    </div>
  );
}
