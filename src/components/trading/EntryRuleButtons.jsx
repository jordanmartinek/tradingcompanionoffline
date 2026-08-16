import React from 'react';
import { cn } from '@/lib/utils';

const HOLD_DURATION = 3000;

export default function EntryRuleButtons({ rules, onToggle, onAdd, onDelete, onEdit, onReorder, disabled }) {
  const entryRules = rules.filter(r => r.category === 'entry');
  const enabledCount = entryRules.filter(r => r.enabled).length;
  const totalCount = entryRules.length;
  const score = totalCount > 0 ? Math.round((enabledCount / totalCount) * 100) : 0;
  const requiredCount = entryRules.filter(r => r.required).length;
  const requiredMet = entryRules.filter(r => r.required && r.enabled).length;

  const [showAdd, setShowAdd] = React.useState(false);
  const [newTitle, setNewTitle] = React.useState('');
  const [editMode, setEditMode] = React.useState(false);
  const [editingId, setEditingId] = React.useState(null);
  const [editTitle, setEditTitle] = React.useState('');

  // Hold-to-check state
  const [holdingId, setHoldingId] = React.useState(null);
  const [holdProgress, setHoldProgress] = React.useState(0);
  const holdTimerRef = React.useRef(null);
  const holdStartRef = React.useRef(null);

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

  const toggleRequired = (ruleId, currentRequired) => {
    onEdit(ruleId, { required: !currentRequired });
  };

  // Hold-to-check handlers (only active when NOT in edit mode)
  const startHold = (ruleId, isEnabled) => {
    if (disabled || editMode) return;
    if (isEnabled) { onToggle(ruleId); return; }
    setHoldingId(ruleId);
    setHoldProgress(0);
    holdStartRef.current = Date.now();

    holdTimerRef.current = setInterval(() => {
      const elapsed = Date.now() - holdStartRef.current;
      const progress = Math.min(100, (elapsed / HOLD_DURATION) * 100);
      setHoldProgress(progress);
      if (elapsed >= HOLD_DURATION) {
        clearInterval(holdTimerRef.current);
        holdTimerRef.current = null;
        setHoldingId(null);
        setHoldProgress(0);
        onToggle(ruleId);
      }
    }, 30);
  };

  const cancelHold = () => {
    if (holdTimerRef.current) {
      clearInterval(holdTimerRef.current);
      holdTimerRef.current = null;
    }
    setHoldingId(null);
    setHoldProgress(0);
  };

  React.useEffect(() => {
    return () => { if (holdTimerRef.current) clearInterval(holdTimerRef.current); };
  }, []);

  return (
    <div className="space-y-3">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <h3 className="text-sm font-medium text-zinc-300">Entry Rules</h3>
          {requiredCount > 0 && (
            <span className={cn(
              'text-[10px] px-1.5 py-0.5 rounded',
              requiredMet === requiredCount ? 'bg-emerald-500/10 text-emerald-400' : 'bg-amber-500/10 text-amber-400'
            )}>
              {requiredMet}/{requiredCount} req
            </span>
          )}
        </div>
        <div className="flex items-center gap-2">
          <span className={cn(
            'text-xs font-mono tabular-nums px-2 py-0.5 rounded',
            score >= 70 ? 'bg-teal-500/20 text-teal-300' :
            score >= 40 ? 'bg-amber-500/20 text-amber-300' :
            'bg-red-500/20 text-red-300'
          )}>
            {enabledCount}/{totalCount} ({score}%)
          </span>
          {/* Edit mode toggle */}
          <button
            onClick={() => { setEditMode(!editMode); setEditingId(null); }}
            className={cn(
              'p-1 rounded transition-colors',
              editMode ? 'text-teal-400 bg-teal-500/10' : 'text-zinc-500 hover:text-zinc-300'
            )}
            title={editMode ? 'Done editing' : 'Edit rules'}
          >
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.066 2.573c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.573 1.066c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.066-2.573c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </button>
          {editMode && (
            <button
              onClick={() => setShowAdd(!showAdd)}
              className="text-xs text-teal-400 hover:text-teal-300 transition-colors px-1.5 py-0.5 rounded hover:bg-teal-500/10"
            >
              + Add
            </button>
          )}
        </div>
      </div>

      {/* Hold instruction (only in trading mode) */}
      {!editMode && <p className="text-[10px] text-zinc-600 italic">Hold 3s to confirm each rule</p>}
      {editMode && <p className="text-[10px] text-teal-400/70">Editing mode — tap icons to manage rules</p>}

      {/* Add form */}
      {showAdd && editMode && (
        <div className="flex items-center gap-2 animate-fade-in">
          <input
            type="text"
            placeholder="New entry rule..."
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') handleAdd();
              if (e.key === 'Escape') { setShowAdd(false); setNewTitle(''); }
            }}
            autoFocus
            className="flex-1 h-8 px-3 py-1 rounded-md border border-zinc-700 bg-zinc-800/50 text-sm text-zinc-100 placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-teal-500/50 focus:border-teal-500"
          />
          <button onClick={handleAdd} disabled={!newTitle.trim()} className="h-8 px-3 rounded-md bg-teal-500 text-zinc-950 text-xs font-medium disabled:opacity-50">Add</button>
          <button onClick={() => { setShowAdd(false); setNewTitle(''); }} className="h-8 px-2 text-xs text-zinc-500">Cancel</button>
        </div>
      )}

      {/* Rules list */}
      <div className={cn('gap-2', editMode ? 'space-y-2' : 'grid grid-cols-1 sm:grid-cols-2 gap-2')}>
        {entryRules.map((rule, idx) => {
          const isHolding = holdingId === rule.id;
          const isDimmed = holdingId !== null && !isHolding;
          const isFirst = idx === 0;
          const isLast = idx === entryRules.length - 1;

          return (
            <div key={rule.id}>
              {editingId === rule.id ? (
                /* Inline rename */
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
                  <button onClick={() => handleEditSave(rule.id)} className="text-[10px] text-teal-400 px-1">Save</button>
                  <button onClick={() => { setEditingId(null); setEditTitle(''); }} className="text-[10px] text-zinc-500 px-1">Cancel</button>
                </div>
              ) : editMode ? (
                /* Edit mode row — shows controls inline */
                <div className={cn(
                  'flex items-center gap-2 px-3 py-2 rounded-lg border text-sm',
                  rule.required ? 'border-amber-500/30 bg-amber-500/5' : 'border-zinc-700 bg-zinc-800/30'
                )}>
                  {/* Reorder arrows */}
                  <div className="flex flex-col gap-0.5 flex-shrink-0">
                    <button
                      onClick={() => onReorder(rule.id, 'up')}
                      disabled={isFirst}
                      className={cn('p-0.5 rounded transition-colors', isFirst ? 'text-zinc-700' : 'text-zinc-500 hover:text-zinc-200')}
                    >
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" /></svg>
                    </button>
                    <button
                      onClick={() => onReorder(rule.id, 'down')}
                      disabled={isLast}
                      className={cn('p-0.5 rounded transition-colors', isLast ? 'text-zinc-700' : 'text-zinc-500 hover:text-zinc-200')}
                    >
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg>
                    </button>
                  </div>

                  {/* Rule title */}
                  <span className="flex-1 text-zinc-300 truncate">{rule.title}</span>

                  {/* Action buttons */}
                  <div className="flex items-center gap-1 flex-shrink-0">
                    <button
                      onClick={() => toggleRequired(rule.id, rule.required)}
                      className={cn('p-1.5 rounded transition-colors', rule.required ? 'text-amber-400' : 'text-zinc-600 hover:text-amber-400')}
                      title={rule.required ? 'Remove requirement' : 'Mark required'}
                    >
                      <svg className="w-3.5 h-3.5" fill={rule.required ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24" strokeWidth={rule.required ? 0 : 2}><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" /></svg>
                    </button>
                    <button
                      onClick={() => { setEditingId(rule.id); setEditTitle(rule.title); }}
                      className="p-1.5 rounded text-zinc-600 hover:text-zinc-200 transition-colors"
                      title="Rename"
                    >
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
                    </button>
                    <button
                      onClick={() => onDelete(rule.id)}
                      className="p-1.5 rounded text-zinc-600 hover:text-red-400 transition-colors"
                      title="Delete"
                    >
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                    </button>
                  </div>
                </div>
              ) : (
                /* Trading mode — clean, hold-to-check */
                <div
                  onMouseDown={() => startHold(rule.id, rule.enabled)}
                  onMouseUp={cancelHold}
                  onMouseLeave={cancelHold}
                  onTouchStart={() => startHold(rule.id, rule.enabled)}
                  onTouchEnd={cancelHold}
                  className={cn(
                    'w-full flex items-center gap-2 px-3 py-2.5 rounded-lg border text-left relative overflow-hidden',
                    'transition-all duration-200 text-sm select-none cursor-pointer',
                    rule.enabled
                      ? 'border-teal-500/50 bg-teal-500/10 text-teal-200'
                      : rule.required
                      ? 'border-amber-500/30 bg-amber-500/5 text-zinc-400'
                      : 'border-zinc-700 bg-zinc-800/30 text-zinc-400',
                    disabled && 'opacity-50 cursor-not-allowed',
                    isHolding && 'border-teal-500/60 scale-[1.02] z-10',
                    isDimmed && 'opacity-30 scale-[0.98]'
                  )}
                >
                  {/* Hold progress bar */}
                  {isHolding && (
                    <div className="absolute inset-y-0 left-0 bg-teal-500/20 transition-none" style={{ width: `${holdProgress}%` }} />
                  )}
                  {/* Checkbox */}
                  <div className={cn(
                    'w-4 h-4 rounded border-2 flex items-center justify-center flex-shrink-0 relative z-10',
                    rule.enabled ? 'border-teal-500 bg-teal-500' : isHolding ? 'border-teal-400/70' : 'border-zinc-600'
                  )}>
                    {rule.enabled && (
                      <svg className="w-3 h-3 text-zinc-950" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    )}
                  </div>
                  <span className="truncate flex-1 relative z-10">{rule.title}</span>
                  {rule.required && (
                    <span className="text-amber-400 flex-shrink-0 relative z-10">
                      <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" /></svg>
                    </span>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {totalCount === 0 && (
        <p className="text-xs text-zinc-500 italic">No entry rules configured. {editMode ? 'Click "+ Add" above.' : 'Tap the gear icon to add rules.'}</p>
      )}
    </div>
  );
}
