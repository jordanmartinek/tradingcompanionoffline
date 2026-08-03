import React from 'react';
import { cn } from '@/lib/utils';

export default function EntryRuleButtons({ rules, onToggle, disabled }) {
  const entryRules = rules.filter(r => r.category === 'entry');
  const enabledCount = entryRules.filter(r => r.enabled).length;
  const totalCount = entryRules.length;
  const score = totalCount > 0 ? Math.round((enabledCount / totalCount) * 100) : 0;

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-medium text-zinc-300">Entry Rules</h3>
        <span className={cn(
          'text-xs font-mono tabular-nums px-2 py-0.5 rounded',
          score >= 70 ? 'bg-teal-500/20 text-teal-300' :
          score >= 40 ? 'bg-amber-500/20 text-amber-300' :
          'bg-red-500/20 text-red-300'
        )}>
          {enabledCount}/{totalCount} ({score}%)
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
        {entryRules.map((rule) => (
          <button
            key={rule.id}
            onClick={() => !disabled && onToggle(rule.id)}
            disabled={disabled}
            className={cn(
              'flex items-center gap-2 px-3 py-2 rounded-lg border text-left',
              'transition-all duration-200 text-sm',
              rule.enabled
                ? 'border-teal-500/50 bg-teal-500/10 text-teal-200'
                : 'border-zinc-700 bg-zinc-800/30 text-zinc-400 hover:border-zinc-600',
              disabled && 'opacity-50 cursor-not-allowed'
            )}
          >
            {/* Checkbox indicator */}
            <div className={cn(
              'w-4 h-4 rounded border-2 flex items-center justify-center flex-shrink-0',
              'transition-all duration-200',
              rule.enabled
                ? 'border-teal-500 bg-teal-500'
                : 'border-zinc-600'
            )}>
              {rule.enabled && (
                <svg className="w-3 h-3 text-zinc-950" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                </svg>
              )}
            </div>
            <span className="truncate">{rule.title}</span>
          </button>
        ))}
      </div>

      {totalCount === 0 && (
        <p className="text-xs text-zinc-500 italic">No entry rules configured. Add some in the rules manager.</p>
      )}
    </div>
  );
}
