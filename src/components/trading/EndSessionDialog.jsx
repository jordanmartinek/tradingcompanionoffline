import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';

export default function EndSessionDialog({ open, onOpenChange, onConfirm, tradesCount, executionScore, onReflectionChange }) {
  const [answer, setAnswer] = useState('');

  const handleConfirm = () => {
    if (onReflectionChange) onReflectionChange(answer);
    onConfirm();
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-amber-400">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            End Trading Session?
          </DialogTitle>
          <DialogDescription>
            This will lock you out for 6 hours. Use this time to reflect and recharge.
          </DialogDescription>
        </DialogHeader>

        <div className="my-4 p-4 rounded-lg bg-zinc-800/50 border border-zinc-700/50 space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-zinc-400">Trades taken</span>
            <span className="text-zinc-200 font-mono tabular-nums">{tradesCount}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-zinc-400">Execution score</span>
            <span className="text-zinc-200 font-mono tabular-nums">{executionScore}%</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-zinc-400">Lockout until</span>
            <span className="text-zinc-200 font-mono tabular-nums">
              {new Date(Date.now() + 6 * 60 * 60 * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </span>
          </div>
        </div>

        {/* Mandatory reflection prompt */}
        <div className="space-y-2">
          <label className="text-xs font-medium text-zinc-300">
            If you could replay today, what's one thing you'd change?
          </label>
          <Textarea
            placeholder="e.g., I would have waited for the 5m confirmation instead of jumping in on the 1m..."
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            className="min-h-[60px] text-xs"
          />
          {answer.length === 0 && (
            <p className="text-[10px] text-amber-400/70">Required before ending session.</p>
          )}
        </div>

        <DialogFooter>
          <Button variant="ghost" onClick={() => onOpenChange(false)}>
            Keep Trading
          </Button>
          <Button
            variant="destructive"
            onClick={handleConfirm}
            disabled={answer.trim().length === 0}
          >
            End Session
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
