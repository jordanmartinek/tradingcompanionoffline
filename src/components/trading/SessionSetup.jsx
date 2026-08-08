import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectOption } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { affirmations } from '@/shared/tradingConcepts';
import { cn } from '@/lib/utils';

export default function SessionSetup({ onBeginSession }) {
  const [dailyObjective, setDailyObjective] = useState('');
  const [preMarketNotes, setPreMarketNotes] = useState('');
  const [dailyAffirmation, setDailyAffirmation] = useState(affirmations[0]);
  const [maxTrades, setMaxTrades] = useState(3);
  const [dailyLossLimit, setDailyLossLimit] = useState(0);
  const [maxSessionMinutes, setMaxSessionMinutes] = useState(180);
  const [lossCooldownSeconds, setLossCooldownSeconds] = useState(300);

  const handleSubmit = (e) => {
    e.preventDefault();
    onBeginSession({
      daily_objective: dailyObjective,
      pre_market_notes: preMarketNotes,
      daily_affirmation: dailyAffirmation,
      max_trades: maxTrades,
      daily_loss_limit: dailyLossLimit,
      max_session_minutes: maxSessionMinutes,
      loss_cooldown_seconds: lossCooldownSeconds,
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-8">
        {/* Header */}
        <div className="text-center space-y-3">
          <div className="mx-auto w-14 h-14 rounded-full bg-teal-500/10 border border-teal-500/30 flex items-center justify-center">
            <svg className="w-7 h-7 text-teal-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <h1 className="text-xl font-bold text-zinc-100">Begin Session</h1>
          <p className="text-zinc-500 text-sm">Set your intention.</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-1.5">
            <Label htmlFor="objective">Daily Objective</Label>
            <Input
              id="objective"
              placeholder="e.g., 2 A+ setups, follow rules perfectly"
              value={dailyObjective}
              onChange={(e) => setDailyObjective(e.target.value)}
            />
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="notes">Pre-Market Notes</Label>
            <Textarea
              id="notes"
              placeholder="Bias, key levels, context..."
              value={preMarketNotes}
              onChange={(e) => setPreMarketNotes(e.target.value)}
              className="min-h-[50px]"
            />
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="affirmation">Affirmation</Label>
            <Select
              id="affirmation"
              value={dailyAffirmation}
              onChange={(e) => setDailyAffirmation(e.target.value)}
            >
              {affirmations.map((a) => (
                <SelectOption key={a} value={a}>{a}</SelectOption>
              ))}
            </Select>
          </div>

          <div className="space-y-1.5">
            <Label>Max Trades</Label>
            <Slider value={maxTrades} min={1} max={5} step={1} onChange={setMaxTrades} />
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="lossLimit">Daily Loss Limit ($)</Label>
            <Input
              id="lossLimit"
              type="number"
              min={0}
              step={50}
              placeholder="0 = no limit"
              value={dailyLossLimit || ''}
              onChange={(e) => setDailyLossLimit(Number(e.target.value) || 0)}
            />
            <p className="text-[11px] text-zinc-600">Locks trading when cumulative PnL hits this. 0 = off.</p>
          </div>

          {/* Session Time Limit */}
          <div className="space-y-1.5">
            <Label htmlFor="sessionTime">Max Session Length (minutes)</Label>
            <Input
              id="sessionTime"
              type="number"
              min={15}
              max={480}
              step={15}
              value={maxSessionMinutes}
              onChange={(e) => setMaxSessionMinutes(Number(e.target.value) || 180)}
            />
            <p className="text-[11px] text-zinc-600">Session auto-ends when this time is reached. No override.</p>
          </div>

          {/* Loss Cooldown */}
          <div className="space-y-1.5">
            <Label htmlFor="cooldown">Post-Loss Cooldown (seconds)</Label>
            <Input
              id="cooldown"
              type="number"
              min={0}
              max={600}
              step={30}
              value={lossCooldownSeconds}
              onChange={(e) => setLossCooldownSeconds(Number(e.target.value) || 0)}
            />
            <p className="text-[11px] text-zinc-600">After logging a loss, rules are hidden for this long. 0 = off.</p>
          </div>

          <Button type="submit" className="w-full h-11 text-sm font-semibold mt-2">
            Begin Session
          </Button>
        </form>
      </div>
    </div>
  );
}
