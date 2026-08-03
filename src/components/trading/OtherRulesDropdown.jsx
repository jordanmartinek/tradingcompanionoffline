import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectOption } from '@/components/ui/select';
import { cn } from '@/lib/utils';

const NON_ENTRY_CATEGORIES = ['filter', 'risk', 'management', 'psychology'];

export default function OtherRulesDropdown({ rules, onToggle, onAdd, onDelete }) {
  const [isOpen, setIsOpen] = useState(false);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newCategory, setNewCategory] = useState('filter');

  const otherRules = rules.filter(r => r.category !== 'entry');

  const handleAdd = () => {
    if (!newTitle.trim()) return;
    onAdd({ title: newTitle.trim(), category: newCategory });
    setNewTitle('');
    setShowAddForm(false);
  };

  return (
    <div className="space-y-2">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 text-sm text-zinc-400 hover:text-zinc-200 transition-colors"
      >
        <svg
          className={cn('w-4 h-4 transition-transform', isOpen && 'rotate-90')}
          fill="none" stroke="currentColor" viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
        Other Rules ({otherRules.length})
      </button>

      {isOpen && (
        <div className="ml-6 space-y-2 animate-fade-in">
          {otherRules.map((rule) => (
            <div key={rule.id} className="flex items-center gap-2 group">
              <button
                onClick={() => onToggle(rule.id)}
                className={cn(
                  'flex-1 flex items-center gap-2 px-3 py-1.5 rounded text-sm text-left transition-all',
                  rule.enabled
                    ? 'bg-zinc-700/50 text-zinc-200 border border-zinc-600'
                    : 'bg-zinc-800/30 text-zinc-500 border border-zinc-800 hover:border-zinc-700'
                )}
              >
                <div className={cn(
                  'w-3 h-3 rounded-sm border flex-shrink-0',
                  rule.enabled ? 'border-zinc-400 bg-zinc-400' : 'border-zinc-600'
                )} />
                <span className="truncate">{rule.title}</span>
                <span className="ml-auto text-[10px] text-zinc-600 uppercase">{rule.category}</span>
              </button>
              <button
                onClick={() => onDelete(rule.id)}
                className="opacity-0 group-hover:opacity-100 p-1 text-red-400 hover:text-red-300 transition-opacity"
                title="Delete rule"
              >
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          ))}

          {showAddForm ? (
            <div className="flex items-end gap-2 mt-2">
              <div className="flex-1">
                <Input
                  placeholder="Rule title..."
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleAdd()}
                  className="h-8 text-xs"
                />
              </div>
              <Select
                value={newCategory}
                onChange={(e) => setNewCategory(e.target.value)}
                className="h-8 text-xs w-28"
              >
                {NON_ENTRY_CATEGORIES.map(c => (
                  <SelectOption key={c} value={c}>{c}</SelectOption>
                ))}
              </Select>
              <Button size="sm" onClick={handleAdd} className="h-8 text-xs">Add</Button>
              <Button size="sm" variant="ghost" onClick={() => setShowAddForm(false)} className="h-8 text-xs">Cancel</Button>
            </div>
          ) : (
            <button
              onClick={() => setShowAddForm(true)}
              className="text-xs text-teal-400 hover:text-teal-300 transition-colors mt-1"
            >
              + Add rule
            </button>
          )}
        </div>
      )}
    </div>
  );
}
