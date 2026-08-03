import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

export default function EndSessionDialog({ open, onOpenChange, onConfirm, tradesCount, executionScore }) {
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

        <p className="text-xs text-zinc-500">
          After ending, you'll be taken to the Reflection page where you can review your session.
        </p>

        <DialogFooter>
          <Button variant="ghost" onClick={() => onOpenChange(false)}>
            Keep Trading
          </Button>
          <Button variant="destructive" onClick={onConfirm}>
            End Session
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
