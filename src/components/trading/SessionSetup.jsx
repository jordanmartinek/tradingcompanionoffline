import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectOption } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { affirmations } from '@/shared/tradingConcepts';
import { getTemplates } from '@/lib/templates';
import NotificationSettings from '@/components/trading/NotificationSettings';
import { cn } from '@/lib/utils';

export default function SessionSetup({ onBeginSession }) {
  const [dailyObjective, setDailyObjective] = useState('');
  const [preMarketNotes, setPreMarketNotes] = useState('');
  const [dailyAffirmation, setDailyAffirmation] = useState(affirmations[0]);
  const [maxTrades, setMaxTrades] = useState(3);
  const [dailyLossLimit, setDailyLossLimit] = useState(0);
  const [maxSessionMinutes, setMaxSessionMinutes] = useState(180);
  const [lossCooldownSeconds, setLossCooldownSeconds] = useState(300);
  const [ritualMinutes, setRitualMinutes] = useState(5);

  // Pre-trade analysis questions
  const [liquidityPools, setLiquidityPools] = useState('');
  const [likelyTarget, setLikelyTarget] = useState('');
  const [gexState, setGexState] = useState('');
  const [valueAreas, setValueAreas] = useState('');
  const [openLocation, setOpenLocation] = useState('');

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
      ritual_minutes: ritualMinutes,
      // Pre-trade analysis
      liquidity_pools: liquidityPools,
      likely_target: likelyTarget,
      gex_state: gexState,
      value_areas: valueAreas,
      open_location: openLocation,
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
          {/* Template Quick-Start */}
          <div className="space-y-1.5">
            <Label>Quick Start Template</Label>
            <div className="flex gap-2 flex-wrap">
              {getTemplates().map((t) => (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => {
                    setMaxTrades(t.max_trades);
                    setDailyLossLimit(t.daily_loss_limit);
                    setMaxSessionMinutes(t.max_session_minutes);
                    setLossCooldownSeconds(t.loss_cooldown_seconds);
                    setRitualMinutes(t.ritual_minutes);
                  }}
                  className="px-3 py-1.5 rounded-md border border-zinc-700 bg-zinc-800/50 text-xs text-zinc-400 hover:border-teal-500/50 hover:text-teal-300 transition-all"
                >
                  {t.name}
                </button>
              ))}
            </div>
          </div>

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

          {/* Pre-Trade Analysis Questions */}
          <div className="space-y-4 p-4 rounded-lg bg-zinc-800/20 border border-zinc-800/50">
            <p className="text-[11px] text-teal-400/80 uppercase tracking-wider font-medium">Pre-Trade Analysis</p>

            <div className="space-y-1.5">
              <Label htmlFor="liquidity">Where are the closest major liquidity pools?</Label>
              <Textarea
                id="liquidity"
                placeholder="e.g., BSL at 5480, SSL at 5420, equal lows at 5395..."
                value={liquidityPools}
                onChange={(e) => setLiquidityPools(e.target.value)}
                className="min-h-[40px]"
              />
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="target">Which one is price likely to attack first?</Label>
              <Input
                id="target"
                placeholder="e.g., SSL at 5420 — downside sweep before reversal"
                value={likelyTarget}
                onChange={(e) => setLikelyTarget(e.target.value)}
              />
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="gex">Is the market in a GEX positive or negative state?</Label>
              <div className="flex gap-2">
                {['Positive', 'Negative', 'Neutral/Unknown'].map((opt) => (
                  <button
                    key={opt}
                    type="button"
                    onClick={() => setGexState(opt)}
                    className={cn(
                      'flex-1 px-3 py-2 rounded-md border text-xs font-medium transition-all',
                      gexState === opt
                        ? opt === 'Positive' ? 'border-emerald-500/50 bg-emerald-500/10 text-emerald-300'
                        : opt === 'Negative' ? 'border-red-500/50 bg-red-500/10 text-red-300'
                        : 'border-zinc-500/50 bg-zinc-500/10 text-zinc-300'
                        : 'border-zinc-700 bg-zinc-800/50 text-zinc-500 hover:border-zinc-600'
                    )}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="va">Where are your value areas?</Label>
              <Textarea
                id="va"
                placeholder="e.g., VAH: 5465, POC: 5445, VAL: 5425..."
                value={valueAreas}
                onChange={(e) => setValueAreas(e.target.value)}
                className="min-h-[40px]"
              />
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="openLoc">Has price opened inside or outside the previous day's value area?</Label>
              <div className="flex gap-2">
                {['Inside VA', 'Above VA', 'Below VA'].map((opt) => (
                  <button
                    key={opt}
                    type="button"
                    onClick={() => setOpenLocation(opt)}
                    className={cn(
                      'flex-1 px-3 py-2 rounded-md border text-xs font-medium transition-all',
                      openLocation === opt
                        ? 'border-teal-500/50 bg-teal-500/10 text-teal-300'
                        : 'border-zinc-700 bg-zinc-800/50 text-zinc-500 hover:border-zinc-600'
                    )}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>
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

          {/* Post-Loss Cooldown */}
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

          {/* Pre-Market Ritual */}
          <div className="space-y-1.5">
            <Label htmlFor="ritual">Pre-Market Ritual (minutes)</Label>
            <Input
              id="ritual"
              type="number"
              min={1}
              max={10}
              step={1}
              value={ritualMinutes}
              onChange={(e) => setRitualMinutes(Math.max(1, Math.min(10, Number(e.target.value) || 5)))}
            />
            <p className="text-[11px] text-zinc-600">Forced preparation time before trading begins. Cannot be skipped.</p>
          </div>

          {/* Notifications */}
          <NotificationSettings />

          <Button type="submit" className="w-full h-11 text-sm font-semibold mt-2">
            Begin Session
          </Button>
        </form>
      </div>
    </div>
  );
}
