import React from 'react';
import { cn } from '@/lib/utils';

export default function EntryRuleButtons({ rules, onToggle, onAdd, onDelete, onEdit, disabled }) {
  const entryRules = rules.filter(r => r.category === 'entry');
  const enabledCount = entryRules.filter(r => r.enabled).length;
  const totalCount = entryRules.length;
  const score = totalCount > 0 ? Math.round((enabledCount / totalCount) * 100) : 0;

  const [showAdd, setShowAdd] = React.useState(false);
  const [newTitle, setNewTitle] = React.useState('');
  const [editingId, setEditingId] = React.useState(null);
  const [editTitle, setEditTitle] = React.useState('');

  const handleAdd = () => {
    if (!newTitle.trim()) return;
    onAdd({ title: newTitle.trim(), category: 'entry' });
    setNewTitle('');
    setShowAdd(false);
  };

  const handleEditSave = (ruleId) => {
    if (!editTitle.trim()) return;
    onEdit(ruleId, { title: editTitle.trim() });
    setEditingId(null);
    setEditTitle('');
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-medium text-zinc-300">Entry Rules</h3>
        <div className="flex items-center gap-2">
          <span className={cn(
            'text-xs font-mono tabular-nums px-2 py-0.5 rounded',
            score >= 70 ? 'bg-teal-500/20 text-teal-300' :
            score >= 40 ? 'bg-amber-500/20 text-amber-300' :
            'bg-red-500/20 text-red-300'
          )}>
            {enabledCount}/{totalCount} ({score}%)
          </span>
          <button
            onClick={() => setShowAdd(!showAdd)}
            className="text-xs text-teal-400 hover:text-teal-300 transition-colors px-1.5 py-0.5 rounded hover:bg-teal-500/10"
            title="Add entry rule"
          >
            + Add
          </button>
        </div>
      </div>

      {/* Add new entry rule form */}
      {showAdd && (
        <div className="flex items-center gap-2 animate-fade-in">
          <input
            type="text"
            placeholder="New entry rule title..."
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') handleAdd();
              if (e.key === 'Escape') { setShowAdd(false); setNewTitle(''); }
            }}
            autoFocus
            className={cn(
              'flex-1 h-8 px-3 py-1 rounded-md border border-zinc-700 bg-zinc-800/50',
              'text-sm text-zinc-100 placeholder:text-zinc-500',
              'focus:outline-none focus:ring-2 focus:ring-teal-500/50 focus:border-teal-500'
            )}
          />
          <button
            onClick={handleAdd}
            disabled={!newTitle.trim()}
            className="h-8 px-3 rounded-md bg-teal-500 text-zinc-950 text-xs font-medium disabled:opacity-50 hover:bg-teal-400 transition-colors"
          >
            Add
          </button>
          <button
            onClick={() => { setShowAdd(false); setNewTitle(''); }}
            className="h-8 px-2 text-xs text-zinc-500 hover:text-zinc-300 transition-colors"
          >
            Cancel
          </button>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
        {entryRules.map((rule) => (
          <div key={rule.id} className="group relative">
            {editingId === rule.id ? (
              /* Editing mode */
              <div className="flex items-center gap-1.5 px-2 py-1.5 rounded-lg border border-teal-500/50 bg-zinc-800/50">
                <input
                  type="text"
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') handleEditSave(rule.id);
                    if (e.key === 'Escape') { setEditingId(null); setEditTitle(''); }
                  }}
                  autoFocus
                  className="flex-1 h-6 px-1.5 bg-transparent text-sm text-zinc-100 focus:outline-none"
                />
                <button
                  onClick={() => handleEditSave(rule.id)}
                  className="text-[10px] text-teal-400 hover:text-teal-300 px-1"
                >
                  Save
                </button>
                <button
                  onClick={() => { setEditingId(null); setEditTitle(''); }}
                  className="text-[10px] text-zinc-500 hover:text-zinc-300 px-1"
                >
                  Cancel
                </button>
              </div>
            ) : (
              /* Normal mode */
              <button
                onClick={() => !disabled && onToggle(rule.id)}
                disabled={disabled}
                className={cn(
                  'w-full flex items-center gap-2 px-3 py-2 rounded-lg border text-left',
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
                <span className="truncate flex-1">{rule.title}</span>
              </button>
            )}

            {/* Edit/Delete controls — show on hover */}
            {editingId !== rule.id && (
              <div className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 flex items-center gap-0.5 transition-opacity">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setEditingId(rule.id);
                    setEditTitle(rule.title);
                  }}
                  className="p-1 rounded text-zinc-500 hover:text-zinc-200 hover:bg-zinc-700/50 transition-colors"
                  title="Edit rule"
                >
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onDelete(rule.id);
                  }}
                  className="p-1 rounded text-zinc-500 hover:text-red-400 hover:bg-red-500/10 transition-colors"
                  title="Delete rule"
                >
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            )}
          </div>
        ))}
      </div>

      {totalCount === 0 && (
        <p className="text-xs text-zinc-500 italic">No entry rules configured. Click "+ Add" above to create your first rule.</p>
      )}
    </div>
  );
}
