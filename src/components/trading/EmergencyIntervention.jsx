import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export default function EmergencyIntervention({ open, onClose }) {
  const [countdown, setCountdown] = useState(60);
  const [phase, setPhase] = useState('breathe'); // 'breathe' | 'reflect'
  const [breathCount, setBreathCount] = useState(0);
  const [breathPhase, setBreathPhase] = useState('in'); // 'in' | 'hold' | 'out'

  useEffect(() => {
    if (!open) return;
    setCountdown(60);
    setPhase('breathe');
    setBreathCount(0);
  }, [open]);

  useEffect(() => {
    if (!open || countdown <= 0) {
      if (countdown <= 0) setPhase('reflect');
      return;
    }
    const timer = setInterval(() => setCountdown(c => c - 1), 1000);
    return () => clearInterval(timer);
  }, [open, countdown]);

  // Breathing cycle: 4s in, 4s hold, 4s out
  useEffect(() => {
    if (!open || phase !== 'breathe') return;
    const cycle = () => {
      setBreathPhase('in');
      setTimeout(() => setBreathPhase('hold'), 4000);
      setTimeout(() => {
        setBreathPhase('out');
        setBreathCount(c => c + 1);
      }, 8000);
    };
    cycle();
    const interval = setInterval(cycle, 12000);
    return () => clearInterval(interval);
  }, [open, phase]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[100] bg-zinc-950/95 backdrop-blur-md flex items-center justify-center">
      <div className="max-w-md w-full p-8 text-center space-y-8 animate-fade-in">
        {/* Header */}
        <div className="space-y-2">
          <div className="w-16 h-16 mx-auto rounded-full bg-amber-500/20 border-2 border-amber-500/50 flex items-center justify-center">
            <svg className="w-8 h-8 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
          </div>
          <h2 className="text-xl font-bold text-amber-400">Circuit Breaker Active</h2>
          <p className="text-sm text-zinc-400">
            You activated the emergency intervention. Let's slow down.
          </p>
        </div>

        {/* Breathing Exercise */}
        {phase === 'breathe' && (
          <div className="space-y-6">
            <div className={cn(
              'w-32 h-32 mx-auto rounded-full border-4 transition-all duration-[4000ms] ease-in-out',
              'flex items-center justify-center',
              breathPhase === 'in' && 'scale-110 border-teal-400 bg-teal-500/10',
              breathPhase === 'hold' && 'scale-110 border-amber-400 bg-amber-500/10',
              breathPhase === 'out' && 'scale-90 border-zinc-600 bg-zinc-800/50',
            )}>
              <span className="text-lg font-medium text-zinc-200">
                {breathPhase === 'in' && 'Breathe In'}
                {breathPhase === 'hold' && 'Hold'}
                {breathPhase === 'out' && 'Breathe Out'}
              </span>
            </div>

            <div className="text-center">
              <p className="text-sm text-zinc-400">Cooldown: <span className="font-mono tabular-nums text-zinc-200">{countdown}s</span></p>
              <p className="text-xs text-zinc-600 mt-1">Breaths completed: {breathCount}</p>
            </div>
          </div>
        )}

        {/* Reflection Phase */}
        {phase === 'reflect' && (
          <div className="space-y-4">
            <p className="text-zinc-300 text-sm leading-relaxed">
              Good. You've taken a moment. Now ask yourself:
            </p>
            <div className="space-y-3 text-left">
              {[
                "Is this trade in my plan?",
                "Am I trading from emotion or analysis?",
                "Would I take this trade with a clear mind?",
                "What's the worst case, and can I accept it?",
              ].map((q, i) => (
                <div key={i} className="flex items-start gap-2 text-sm text-zinc-400">
                  <span className="text-teal-500 mt-0.5">?</span>
                  <span>{q}</span>
                </div>
              ))}
            </div>
            <Button onClick={onClose} className="mt-6 w-full">
              Return to Session
            </Button>
          </div>
        )}

        {/* Can still close during breathe phase if countdown done */}
        {phase === 'breathe' && countdown <= 0 && (
          <Button onClick={() => setPhase('reflect')} variant="outline">
            Continue to Reflection
          </Button>
        )}
      </div>
    </div>
  );
}
