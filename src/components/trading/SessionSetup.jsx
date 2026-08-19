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
import TradingViewChart from '@/components/trading/TradingViewChart';
import EnvironmentPanel from '@/components/cockpit/EnvironmentPanel';
import LevelsPanel from '@/components/cockpit/LevelsPanel';
import LiquidityPanel from '@/components/cockpit/LiquidityPanel';
import FibCalculator from '@/components/cockpit/FibCalculator';
import { CockpitProvider } from '@/lib/cockpitStore';
import { cn } from '@/lib/utils';

function SetupInner({ onBeginSession }) {
  const [dailyObjective, setDailyObjective] = useState('');
  const [preMarketNotes, setPreMarketNotes] = useState('');
  const [dailyAffirmation, setDailyAffirmation] = useState(affirmations[0]);
  const [maxTrades, setMaxTrades] = useState(3);
  const [dailyLossLimit, setDailyLossLimit] = useState(0);
  const [maxSessionMinutes, setMaxSessionMinutes] = useState(180);
  const [lossCooldownSeconds, setLossCooldownSeconds] = useState(300);
  const [ritualMinutes, setRitualMinutes] = useState(5);
  const [activeTab, setActiveTab] = useState('environment'); // mobile tab

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
    });
  };

  return (
    <div className="h-screen flex flex-col overflow-hidden">
      {/* Top bar */}
      <header className="flex items-center justify-between px-4 py-2 border-b border-zinc-800/30 flex-shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-teal-500/10 border border-teal-500/30 flex items-center justify-center">
            <svg className="w-4 h-4 text-teal-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <div>
            <h1 className="text-sm font-bold text-zinc-100">Pre-Trade Planning</h1>
            <p className="text-[10px] text-zinc-500">Mark levels, analyze environment, then begin.</p>
          </div>
        </div>
        <Button onClick={handleSubmit} size="sm" className="text-xs">
          Begin Session →
        </Button>
      </header>

      {/* Mobile tab selector */}
      <div className="md:hidden flex border-b border-zinc-800/30 overflow-x-auto">
        {['environment', 'chart', 'config'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={cn(
              'flex-1 px-3 py-2 text-[10px] font-medium uppercase tracking-wider transition-colors',
              activeTab === tab ? 'text-teal-400 border-b-2 border-teal-400' : 'text-zinc-500'
            )}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Main content — 3 columns on desktop */}
      <div className="flex-1 flex flex-col md:flex-row min-h-0 overflow-hidden">
        {/* LEFT: Environment + Levels + Liquidity + Fib */}
        <div className={cn(
          'md:w-64 lg:w-72 flex-shrink-0 overflow-y-auto border-r border-zinc-800/30 px-3 py-3 space-y-5',
          activeTab !== 'environment' && 'hidden md:block'
        )}>
          <EnvironmentPanel />
          <LevelsPanel />
          <LiquidityPanel />
          <FibCalculator />
        </div>

        {/* CENTER: Chart */}
        <div className={cn(
          'flex-1 min-w-0 min-h-0',
          activeTab !== 'chart' && 'hidden md:flex'
        )}>
          <TradingViewChart className="w-full h-full" />
        </div>

        {/* RIGHT: Session config + objectives */}
        <div className={cn(
          'md:w-72 lg:w-80 flex-shrink-0 overflow-y-auto border-l border-zinc-800/30 px-4 py-4',
          activeTab !== 'config' && 'hidden md:block'
        )}>
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Templates */}
            <div className="space-y-1.5">
              <Label className="text-[10px]">Template</Label>
              <div className="flex gap-1.5 flex-wrap">
                {getTemplates().map((t) => (
                  <button key={t.id} type="button"
                    onClick={() => { setMaxTrades(t.max_trades); setDailyLossLimit(t.daily_loss_limit); setMaxSessionMinutes(t.max_session_minutes); setLossCooldownSeconds(t.loss_cooldown_seconds); setRitualMinutes(t.ritual_minutes); }}
                    className="px-2 py-1 rounded border border-zinc-700 bg-zinc-800/50 text-[10px] text-zinc-400 hover:border-teal-500/50 hover:text-teal-300 transition-all"
                  >{t.name}</button>
                ))}
              </div>
            </div>

            {/* Objective */}
            <div className="space-y-1">
              <Label htmlFor="objective" className="text-[10px]">Objective</Label>
              <Input id="objective" placeholder="e.g., 2 A+ setups only" value={dailyObjective} onChange={(e) => setDailyObjective(e.target.value)} className="h-8 text-xs" />
            </div>

            {/* Notes */}
            <div className="space-y-1">
              <Label htmlFor="notes" className="text-[10px]">Pre-Market Notes</Label>
              <Textarea id="notes" placeholder="Bias, context..." value={preMarketNotes} onChange={(e) => setPreMarketNotes(e.target.value)} className="min-h-[40px] text-xs" />
            </div>

            {/* Affirmation */}
            <div className="space-y-1">
              <Label className="text-[10px]">Affirmation</Label>
              <Select value={dailyAffirmation} onChange={(e) => setDailyAffirmation(e.target.value)} className="h-8 text-xs">
                {affirmations.map((a) => <SelectOption key={a} value={a}>{a}</SelectOption>)}
              </Select>
            </div>

            {/* Settings grid */}
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <Label className="text-[10px]">Max Trades</Label>
                <Input type="number" min={1} max={5} value={maxTrades} onChange={(e) => setMaxTrades(Number(e.target.value) || 3)} className="h-8 text-xs" />
              </div>
              <div className="space-y-1">
                <Label className="text-[10px]">Loss Limit ($)</Label>
                <Input type="number" min={0} step={50} value={dailyLossLimit || ''} onChange={(e) => setDailyLossLimit(Number(e.target.value) || 0)} className="h-8 text-xs" placeholder="0=off" />
              </div>
              <div className="space-y-1">
                <Label className="text-[10px]">Session (min)</Label>
                <Input type="number" min={15} max={480} step={15} value={maxSessionMinutes} onChange={(e) => setMaxSessionMinutes(Number(e.target.value) || 180)} className="h-8 text-xs" />
              </div>
              <div className="space-y-1">
                <Label className="text-[10px]">Cooldown (sec)</Label>
                <Input type="number" min={0} max={600} step={30} value={lossCooldownSeconds} onChange={(e) => setLossCooldownSeconds(Number(e.target.value) || 0)} className="h-8 text-xs" placeholder="0=off" />
              </div>
              <div className="space-y-1">
                <Label className="text-[10px]">Ritual (min)</Label>
                <Input type="number" min={1} max={10} value={ritualMinutes} onChange={(e) => setRitualMinutes(Number(e.target.value) || 5)} className="h-8 text-xs" />
              </div>
            </div>

            {/* Notifications */}
            <NotificationSettings />

            {/* Begin */}
            <Button type="submit" className="w-full h-10 text-sm font-semibold">
              Begin Session
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default function SessionSetup({ onBeginSession }) {
  return (
    <CockpitProvider>
      <SetupInner onBeginSession={onBeginSession} />
    </CockpitProvider>
  );
}
