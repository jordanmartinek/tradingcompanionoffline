import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectOption } from '@/components/ui/select';
import ConvictionRating from '@/components/trading/ConvictionRating';
import { emotionsList } from '@/shared/tradingConcepts';
import { cn } from '@/lib/utils';

const RESULTS = [
  { value: 'win', label: 'Win', color: 'text-emerald-400' },
  { value: 'loss', label: 'Loss', color: 'text-red-400' },
  { value: 'breakeven', label: 'Breakeven', color: 'text-zinc-400' },
  { value: 'scratched', label: 'Scratched', color: 'text-blue-400' },
];

export default function TradeDetail({ open, onOpenChange, trade, rules, onSave, slotIndex }) {
  const [form, setForm] = useState({
    result: 'scratched',
    r_multiple: 0,
    pnl: 0,
    entry_time: '',
    exit_time: '',
    emotion_before: '',
    emotion_after: '',
    notes: '',
    rule_compliance: [],
  });

  useEffect(() => {
    if (trade) {
      setForm({
        result: trade.result || 'scratched',
        r_multiple: trade.r_multiple || 0,
        pnl: trade.pnl || 0,
        entry_time: trade.entry_time || '',
        exit_time: trade.exit_time || '',
        emotion_before: trade.emotion_before || '',
        emotion_after: trade.emotion_after || '',
        notes: trade.notes || '',
        rule_compliance: trade.rule_compliance || rules.map(r => ({ rule: r.title, followed: false })),
      });
    } else {
      setForm({
        result: 'scratched',
        r_multiple: 0,
        pnl: 0,
        entry_time: new Date().toISOString().slice(0, 16),
        exit_time: '',
        emotion_before: '',
        emotion_after: '',
        notes: '',
        conviction: 0,
        rule_compliance: rules.map(r => ({ rule: r.title, followed: false })),
      });
    }
  }, [trade, rules, open]);

  const toggleRuleCompliance = (index) => {
    const updated = [...form.rule_compliance];
    updated[index] = { ...updated[index], followed: !updated[index].followed };
    setForm({ ...form, rule_compliance: updated });
  };

  const handleSave = () => {
    onSave({
      ...form,
      slot_index: slotIndex,
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-xl">
        <DialogHeader>
          <DialogTitle>
            Trade #{slotIndex + 1} Details
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-2">
          {/* Result */}
          <div className="space-y-2">
            <Label>Result</Label>
            <div className="grid grid-cols-4 gap-2">
              {RESULTS.map(({ value, label, color }) => (
                <button
                  key={value}
                  type="button"
                  onClick={() => setForm({ ...form, result: value })}
                  className={cn(
                    'px-3 py-2 rounded-md border text-sm font-medium transition-all',
                    form.result === value
                      ? `border-current bg-current/10 ${color}`
                      : 'border-zinc-700 text-zinc-500 hover:border-zinc-600'
                  )}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>

          {/* R-Multiple & PnL */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="r_multiple">R-Multiple</Label>
              <Input
                id="r_multiple"
                type="number"
                step="0.1"
                value={form.r_multiple}
                onChange={(e) => setForm({ ...form, r_multiple: parseFloat(e.target.value) || 0 })}
                placeholder="e.g., 2.5 or -1"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="pnl">PnL ($)</Label>
              <Input
                id="pnl"
                type="number"
                step="1"
                value={form.pnl}
                onChange={(e) => setForm({ ...form, pnl: parseFloat(e.target.value) || 0 })}
                placeholder="Dollar amount"
              />
            </div>
          </div>

          {/* Entry/Exit Times */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="entry_time">Entry Time</Label>
              <Input
                id="entry_time"
                type="datetime-local"
                value={form.entry_time}
                onChange={(e) => setForm({ ...form, entry_time: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="exit_time">Exit Time</Label>
              <Input
                id="exit_time"
                type="datetime-local"
                value={form.exit_time}
                onChange={(e) => setForm({ ...form, exit_time: e.target.value })}
              />
            </div>
          </div>

          {/* Emotions */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Emotion Before</Label>
              <Select
                value={form.emotion_before}
                onChange={(e) => setForm({ ...form, emotion_before: e.target.value })}
              >
                <SelectOption value="">Select...</SelectOption>
                {emotionsList.map(e => (
                  <SelectOption key={e} value={e}>{e}</SelectOption>
                ))}
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Emotion After</Label>
              <Select
                value={form.emotion_after}
                onChange={(e) => setForm({ ...form, emotion_after: e.target.value })}
              >
                <SelectOption value="">Select...</SelectOption>
                {emotionsList.map(e => (
                  <SelectOption key={e} value={e}>{e}</SelectOption>
                ))}
              </Select>
            </div>
          </div>

          {/* Rule Compliance */}
          <div className="space-y-2">
            <Label>Rule Compliance</Label>
            <div className="space-y-1.5 max-h-40 overflow-y-auto">
              {form.rule_compliance.map((rc, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => toggleRuleCompliance(idx)}
                  className={cn(
                    'flex items-center gap-2 w-full px-3 py-1.5 rounded text-sm text-left transition-all',
                    rc.followed
                      ? 'bg-emerald-500/10 text-emerald-300 border border-emerald-500/30'
                      : 'bg-zinc-800/50 text-zinc-400 border border-zinc-700/50 hover:border-zinc-600'
                  )}
                >
                  <div className={cn(
                    'w-3 h-3 rounded-sm border flex-shrink-0 flex items-center justify-center',
                    rc.followed ? 'border-emerald-500 bg-emerald-500' : 'border-zinc-600'
                  )}>
                    {rc.followed && (
                      <svg className="w-2 h-2 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    )}
                  </div>
                  <span>{rc.rule}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Conviction Rating */}
          <div className="space-y-2">
            <Label>Conviction (1-5)</Label>
            <ConvictionRating value={form.conviction} onChange={(v) => setForm({ ...form, conviction: v })} />
          </div>

          {/* Notes */}
          <div className="space-y-2">
            <Label htmlFor="notes">Notes</Label>
            <Textarea
              id="notes"
              placeholder="What happened? What did you learn?"
              value={form.notes}
              onChange={(e) => setForm({ ...form, notes: e.target.value })}
            />
          </div>
        </div>

        <DialogFooter>
          <Button variant="ghost" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleSave}>
            Save Trade
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
