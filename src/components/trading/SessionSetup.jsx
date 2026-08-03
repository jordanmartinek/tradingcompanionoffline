import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectOption } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { personalityList } from '@/shared/coachPersonalities';
import { affirmations } from '@/shared/tradingConcepts';
import { cn } from '@/lib/utils';

export default function SessionSetup({ onBeginSession }) {
  const [dailyObjective, setDailyObjective] = useState('');
  const [preMarketNotes, setPreMarketNotes] = useState('');
  const [dailyAffirmation, setDailyAffirmation] = useState(affirmations[0]);
  const [coachPersonality, setCoachPersonality] = useState('stoic_mentor');
  const [maxTrades, setMaxTrades] = useState(3);
  const [dailyLossLimit, setDailyLossLimit] = useState(0);

  const handleSubmit = (e) => {
    e.preventDefault();
    onBeginSession({
      daily_objective: dailyObjective,
      pre_market_notes: preMarketNotes,
      daily_affirmation: dailyAffirmation,
      coach_personality: coachPersonality,
      max_trades: maxTrades,
      daily_loss_limit: dailyLossLimit,
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl border-zinc-800/50 bg-zinc-900/80 backdrop-blur">
        <CardHeader className="text-center pb-6">
          <div className="mx-auto mb-4 w-16 h-16 rounded-full bg-teal-500/10 border border-teal-500/30 flex items-center justify-center">
            <svg className="w-8 h-8 text-teal-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <CardTitle className="text-2xl text-zinc-100">Begin Trading Session</CardTitle>
          <p className="text-zinc-400 text-sm mt-2">Set your intention before the market opens</p>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Daily Objective */}
            <div className="space-y-2">
              <Label htmlFor="objective">Daily Objective</Label>
              <Input
                id="objective"
                placeholder="e.g., Follow my rules perfectly on 2 A+ setups"
                value={dailyObjective}
                onChange={(e) => setDailyObjective(e.target.value)}
              />
            </div>

            {/* Pre-market Notes */}
            <div className="space-y-2">
              <Label htmlFor="notes">Pre-Market Notes</Label>
              <Textarea
                id="notes"
                placeholder="Market context, levels to watch, bias..."
                value={preMarketNotes}
                onChange={(e) => setPreMarketNotes(e.target.value)}
                className="min-h-[60px]"
              />
            </div>

            {/* Affirmation */}
            <div className="space-y-2">
              <Label htmlFor="affirmation">Daily Affirmation</Label>
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

            {/* Coach Personality */}
            <div className="space-y-2">
              <Label>Coach Personality</Label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {personalityList.map((p) => (
                  <button
                    key={p.key}
                    type="button"
                    onClick={() => setCoachPersonality(p.key)}
                    className={cn(
                      'p-3 rounded-lg border text-left transition-all text-sm',
                      coachPersonality === p.key
                        ? 'border-teal-500 bg-teal-500/10 text-teal-300'
                        : 'border-zinc-700 bg-zinc-800/50 text-zinc-400 hover:border-zinc-600'
                    )}
                  >
                    <div className="font-medium text-xs">{p.label}</div>
                    <div className="text-[10px] text-zinc-500 mt-0.5">{p.tagline}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Max Trades */}
            <div className="space-y-2">
              <Label>Max Trades Today</Label>
              <Slider
                value={maxTrades}
                min={1}
                max={5}
                step={1}
                onChange={setMaxTrades}
              />
            </div>

            {/* Daily Loss Limit */}
            <div className="space-y-2">
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
              <p className="text-xs text-zinc-500">Trading locks when cumulative PnL hits this negative amount. 0 = disabled.</p>
            </div>

            {/* Submit */}
            <Button type="submit" className="w-full h-12 text-base font-semibold">
              Begin Session
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
