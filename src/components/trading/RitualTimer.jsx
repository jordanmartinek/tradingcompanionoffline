import React, { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

export default function RitualTimer({ duration, session, onComplete }) {
  const [secondsLeft, setSecondsLeft] = useState(duration);
  const [breathPhase, setBreathPhase] = useState('in'); // 'in' | 'hold' | 'out'

  // Countdown
  useEffect(() => {
    if (secondsLeft <= 0) {
      onComplete();
      return;
    }
    const timer = setTimeout(() => setSecondsLeft(s => s - 1), 1000);
    return () => clearTimeout(timer);
  }, [secondsLeft, onComplete]);

  // Breathing cycle: 4s in, 4s hold, 4s out
  useEffect(() => {
    const cycle = () => {
      setBreathPhase('in');
      setTimeout(() => setBreathPhase('hold'), 4000);
      setTimeout(() => setBreathPhase('out'), 8000);
    };
    cycle();
    const interval = setInterval(cycle, 12000);
    return () => clearInterval(interval);
  }, []);

  const minutes = Math.floor(secondsLeft / 60);
  const seconds = secondsLeft % 60;
  const progress = ((duration - secondsLeft) / duration) * 100;

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-8 text-center">
        {/* Breathing circle */}
        <div className="flex justify-center">
          <div className={cn(
            'w-28 h-28 rounded-full border-2 flex items-center justify-center transition-all duration-[4000ms] ease-in-out',
            breathPhase === 'in' && 'scale-110 border-teal-400/60 bg-teal-500/5',
            breathPhase === 'hold' && 'scale-110 border-teal-400/40 bg-teal-500/3',
            breathPhase === 'out' && 'scale-90 border-zinc-700 bg-zinc-800/30',
          )}>
            <div className="text-center">
              <p className="text-2xl font-mono font-bold tabular-nums text-zinc-100">
                {minutes}:{seconds.toString().padStart(2, '0')}
              </p>
              <p className="text-[10px] text-zinc-500 mt-1">
                {breathPhase === 'in' ? 'breathe in' : breathPhase === 'hold' ? 'hold' : 'breathe out'}
              </p>
            </div>
          </div>
        </div>

        {/* Progress bar */}
        <div className="w-full h-1 bg-zinc-800 rounded-full overflow-hidden">
          <div
            className="h-full bg-teal-500/50 transition-all duration-1000 ease-linear rounded-full"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Title */}
        <div className="space-y-1">
          <h2 className="text-lg font-semibold text-zinc-200">Preparing Your Mind</h2>
          <p className="text-xs text-zinc-500">Read your plan. Review your levels. Get centered.</p>
        </div>

        {/* Session content */}
        <div className="space-y-4 text-left">
          {session?.daily_objective && (
            <div className="px-4 py-3 rounded-lg bg-zinc-800/30 border border-zinc-800">
              <p className="text-[10px] text-zinc-500 uppercase tracking-wider mb-1">Today's Objective</p>
              <p className="text-sm text-zinc-200">{session.daily_objective}</p>
            </div>
          )}

          {session?.pre_market_notes && (
            <div className="px-4 py-3 rounded-lg bg-zinc-800/30 border border-zinc-800">
              <p className="text-[10px] text-zinc-500 uppercase tracking-wider mb-1">Pre-Market Notes</p>
              <p className="text-sm text-zinc-300 whitespace-pre-line">{session.pre_market_notes}</p>
            </div>
          )}

          {session?.daily_affirmation && (
            <div className="px-4 py-3 rounded-lg bg-teal-500/5 border border-teal-500/20">
              <p className="text-[10px] text-teal-400/70 uppercase tracking-wider mb-1">Affirmation</p>
              <p className="text-sm text-teal-300 italic">{session.daily_affirmation}</p>
            </div>
          )}

          {/* Pre-trade analysis answers */}
          {(session?.liquidity_pools || session?.likely_target || session?.gex_state || session?.value_areas || session?.open_location) && (
            <div className="px-4 py-3 rounded-lg bg-zinc-800/40 border border-zinc-700/30 space-y-2">
              <p className="text-[10px] text-amber-400/70 uppercase tracking-wider">Your Analysis</p>
              {session.liquidity_pools && (
                <div>
                  <p className="text-[9px] text-zinc-500">Liquidity Pools</p>
                  <p className="text-xs text-zinc-300">{session.liquidity_pools}</p>
                </div>
              )}
              {session.likely_target && (
                <div>
                  <p className="text-[9px] text-zinc-500">Likely Target</p>
                  <p className="text-xs text-zinc-300">{session.likely_target}</p>
                </div>
              )}
              {session.gex_state && (
                <div>
                  <p className="text-[9px] text-zinc-500">GEX State</p>
                  <p className="text-xs text-zinc-300">{session.gex_state}</p>
                </div>
              )}
              {session.value_areas && (
                <div>
                  <p className="text-[9px] text-zinc-500">Value Areas</p>
                  <p className="text-xs text-zinc-300">{session.value_areas}</p>
                </div>
              )}
              {session.open_location && (
                <div>
                  <p className="text-[9px] text-zinc-500">Open Location</p>
                  <p className="text-xs text-zinc-300">{session.open_location}</p>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Checklist reminders */}
        <div className="space-y-2 text-left px-4">
          <p className="text-[10px] text-zinc-600 uppercase tracking-wider">While you wait</p>
          <div className="space-y-1.5">
            {[
              'Review your key levels on the chart',
              'Check the economic calendar',
              'Identify the current market structure',
              'Take 3 deep breaths',
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-2 text-xs text-zinc-500">
                <div className="w-1 h-1 rounded-full bg-zinc-600 flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Non-skippable notice */}
        <p className="text-[10px] text-zinc-700">This timer cannot be skipped.</p>
      </div>
    </div>
  );
}
