import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export default function ExecuteConfirmDialog({ open, onOpenChange, rules, onConfirm }) {
  const entryRules = rules.filter(r => r.category === 'entry' && r.enabled);
  const allRules = rules.filter(r => r.category === 'entry');

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <svg className="w-5 h-5 text-teal-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Confirm Trade Execution
          </DialogTitle>
          <DialogDescription>
            Review your checked entry rules before executing.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-3 my-4">
          <div className="text-xs text-zinc-400 uppercase tracking-wider font-medium">
            Active Entry Rules ({entryRules.length}/{allRules.length})
          </div>
          
          <div className="space-y-2 max-h-48 overflow-y-auto">
            {allRules.map((rule) => (
              <div
                key={rule.id}
                className={cn(
                  'flex items-center gap-2 px-3 py-2 rounded-md text-sm',
                  rule.enabled
                    ? 'bg-teal-500/10 border border-teal-500/30 text-teal-200'
                    : 'bg-zinc-800/50 border border-zinc-700/50 text-zinc-500'
                )}
              >
                <div className={cn(
                  'w-3.5 h-3.5 rounded-full flex-shrink-0',
                  rule.enabled ? 'bg-teal-500' : 'bg-zinc-700'
                )} />
                <span>{rule.title}</span>
                {!rule.enabled && (
                  <span className="ml-auto text-xs text-zinc-600">skipped</span>
                )}
              </div>
            ))}
          </div>

          {entryRules.length < allRules.length && (
            <p className="text-xs text-amber-400/80 mt-2">
              Note: {allRules.length - entryRules.length} entry rule(s) not checked. Proceeding anyway.
            </p>
          )}
        </div>

        <div className="p-3 rounded-lg bg-zinc-800/50 border border-zinc-700/50">
          <p className="text-xs text-zinc-400 leading-relaxed">
            Executing this trade will log it to your discipline wheel. After saving trade details, 
            all rules will reset to unchecked — you'll need to re-confirm before the next trade.
          </p>
        </div>

        <DialogFooter>
          <Button variant="ghost" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={onConfirm}>
            Execute Trade
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
