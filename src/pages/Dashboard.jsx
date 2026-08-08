import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { TradingSession, Trade, WeeklyGoal, getOrCreateDNA } from '@/api/db';
import { useTradingRules } from '@/hooks/useTradingRules';
import { getWeekRange, isAPlusTrade } from '@/shared/weeklyGoal';
import { generateSessionSummary } from '@/shared/coachingEngine';
import { onSyncChange } from '@/lib/sync';

import SessionSetup from '@/components/trading/SessionSetup';
import DisciplineWheel from '@/components/trading/DisciplineWheel';
import EntryRuleButtons from '@/components/trading/EntryRuleButtons';
import OtherRulesDropdown from '@/components/trading/OtherRulesDropdown';
import EmaStatusToggle from '@/components/trading/EmaStatusToggle';
import ExecuteConfirmDialog from '@/components/trading/ExecuteConfirmDialog';
import TradeDetail from '@/components/trading/TradeDetail';
import SessionTimer from '@/components/trading/SessionTimer';
import WeeklyGoalBar from '@/components/trading/WeeklyGoalBar';
import EndSessionDialog from '@/components/trading/EndSessionDialog';
import LockedScreen from '@/components/trading/LockedScreen';
import EmergencyIntervention from '@/components/trading/EmergencyIntervention';
import TradingViewChart from '@/components/trading/TradingViewChart';
import VoiceJournal from '@/components/trading/VoiceJournal';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const LOCK_THRESHOLD = 70;

// Motivational phrases that flank the wheel when locked
const LEFT_PHRASES = [
  "Wait for confluence.",
  "Patience pays.",
  "No setup, no trade.",
  "Protect your capital.",
  "Less is more.",
  "Wait for your pitch.",
];
const RIGHT_PHRASES = [
  "Trust the process.",
  "Discipline first.",
  "Quality over quantity.",
  "The market will wait.",
  "Check your rules.",
  "Earn the trade.",
];

function WheelPhrase({ side, isLocked }) {
  const phrases = side === 'left' ? LEFT_PHRASES : RIGHT_PHRASES;
  const [idx, setIdx] = useState(Math.floor(Math.random() * phrases.length));
  const [fade, setFade] = useState(true);

  useEffect(() => {
    if (!isLocked) return;
    const interval = setInterval(() => {
      setFade(false);
      setTimeout(() => { setIdx(prev => (prev + 1) % phrases.length); setFade(true); }, 250);
    }, 6000);
    return () => clearInterval(interval);
  }, [isLocked, phrases.length]);

  if (!isLocked) return <div className="w-20 hidden md:block" />;

  return (
    <div className={cn(
      'w-20 hidden md:flex items-center',
      side === 'left' ? 'justify-end text-right' : 'justify-start text-left'
    )}>
      <p className={cn(
        'text-[10px] leading-tight italic transition-opacity duration-300',
        fade ? 'opacity-60' : 'opacity-0',
        'text-zinc-500'
      )}>
        {phrases[idx]}
      </p>
    </div>
  );
}

export default function Dashboard() {
  const navigate = useNavigate();
  const { rules, toggleRule, addRule, editRule, deleteRule, reorderRules, resetAllRules, loading: rulesLoading } = useTradingRules();

  const [phase, setPhase] = useState('loading');
  const [session, setSession] = useState(null);
  const [trades, setTrades] = useState([]);
  const [lockoutUntil, setLockoutUntil] = useState(null);

  const [emaDirection, setEmaDirection] = useState(null);
  const [showExecuteDialog, setShowExecuteDialog] = useState(false);
  const [showTradeDetail, setShowTradeDetail] = useState(false);
  const [activeSlot, setActiveSlot] = useState(null);
  const [showEndDialog, setShowEndDialog] = useState(false);
  const [showEmergency, setShowEmergency] = useState(false);

  const [weeklyData, setWeeklyData] = useState({ aPlusCount: 0, target: 10, avgScore: 0 });

  // Discipline streak tracking
  const [streak, setStreak] = useState(0);
  const [speedWarning, setSpeedWarning] = useState(null);
  const ruleCheckTimesRef = React.useRef([]);

  // Anti-revenge cooldown
  const [cooldownUntil, setCooldownUntil] = useState(null);
  const [cooldownLeft, setCooldownLeft] = useState(0);

  // Session auto-end
  const [sessionTimeLeft, setSessionTimeLeft] = useState(null);

  // Voice journal entries
  const [voiceEntries, setVoiceEntries] = useState([]);

  // Computed
  const entryRules = useMemo(() => rules.filter(r => r.category === 'entry'), [rules]);
  const enabledEntryCount = useMemo(() => entryRules.filter(r => r.enabled).length, [entryRules]);
  const totalEntryCount = entryRules.length;
  const executionScore = useMemo(
    () => totalEntryCount > 0 ? Math.round((enabledEntryCount / totalEntryCount) * 100) : 0,
    [enabledEntryCount, totalEntryCount]
  );

  const cumulativePnl = useMemo(() => trades.reduce((sum, t) => sum + (t.pnl || 0), 0), [trades]);
  const dailyLossLimit = session?.daily_loss_limit || 0;
  const lossLimitHit = dailyLossLimit > 0 && cumulativePnl <= -dailyLossLimit;
  const allSlotsFilled = trades.length >= (session?.max_trades || 3);
  const requiredRulesMet = useMemo(() => {
    const requiredEntryRules = entryRules.filter(r => r.required);
    return requiredEntryRules.length === 0 || requiredEntryRules.every(r => r.enabled);
  }, [entryRules]);
  const isCoolingDown = cooldownLeft > 0;
  const isLocked = executionScore < LOCK_THRESHOLD || !requiredRulesMet || lossLimitHit || allSlotsFilled || isCoolingDown;

  // Screen-edge glow
  const glowStyle = useMemo(() => {
    const stops = [
      { at: 0, h: 0 }, { at: 30, h: 25 }, { at: 50, h: 40 },
      { at: 70, h: 55 }, { at: 80, h: 160 }, { at: 100, h: 174 },
    ];
    let lower = stops[0], upper = stops[1];
    for (let i = 0; i < stops.length - 1; i++) {
      if (executionScore >= stops[i].at && executionScore <= stops[i + 1].at) {
        lower = stops[i]; upper = stops[i + 1]; break;
      }
    }
    const t = (executionScore - lower.at) / ((upper.at - lower.at) || 1);
    const hue = lower.h + (upper.h - lower.h) * t;
    const alpha = 0.03 + (executionScore / 100) * 0.12;
    const spread = 30 + (executionScore / 100) * 50;
    return { boxShadow: `inset 0 0 ${spread}px hsla(${hue}, 80%, 50%, ${alpha})` };
  }, [executionScore]);

  // Score color RGB for execute button (same ramp as wheel)
  const scoreColorRgb = useMemo(() => {
    const stops = [
      { at: 0,   r: 239, g: 68,  b: 68  },
      { at: 30,  r: 249, g: 115, b: 22  },
      { at: 50,  r: 234, g: 179, b: 8   },
      { at: 70,  r: 34,  g: 197, b: 94  },
      { at: 80,  r: 45,  g: 212, b: 191 },
      { at: 100, r: 45,  g: 212, b: 191 },
    ];
    let lower = stops[0], upper = stops[1];
    for (let i = 0; i < stops.length - 1; i++) {
      if (executionScore >= stops[i].at && executionScore <= stops[i + 1].at) {
        lower = stops[i]; upper = stops[i + 1]; break;
      }
    }
    const t = (executionScore - lower.at) / ((upper.at - lower.at) || 1);
    const r = Math.round(lower.r + (upper.r - lower.r) * t);
    const g = Math.round(lower.g + (upper.g - lower.g) * t);
    const b = Math.round(lower.b + (upper.b - lower.b) * t);
    return `${r}, ${g}, ${b}`;
  }, [executionScore]);

  // Init
  useEffect(() => {
    async function init() {
      const lockoutRaw = localStorage.getItem('tcai_lockout');
      if (lockoutRaw) {
        const lockout = JSON.parse(lockoutRaw);
        if (new Date(lockout.until) > new Date()) {
          setLockoutUntil(lockout.until);
          setPhase('locked');
          return;
        } else {
          localStorage.removeItem('tcai_lockout');
        }
      }

      const activeId = localStorage.getItem('tcai_active_session');
      if (activeId) {
        try {
          const sess = await TradingSession.get(activeId);
          if (sess && sess.status === 'active') {
            setSession(sess);
            const sessionTrades = await Trade.list({ session_id: activeId });
            setTrades(sessionTrades.sort((a, b) => (a.slot_index || 0) - (b.slot_index || 0)));
            // Restore voice entries
            if (sess.voice_entries) setVoiceEntries(sess.voice_entries);
            setPhase('trading');
            await loadWeeklyData();
            return;
          }
        } catch (e) {
          console.error('Failed to resume session:', e);
        }
        localStorage.removeItem('tcai_active_session');
      }
      setPhase('setup');
    }
    init();
  }, []);

  // Listen for cross-window changes (trades from widget, rules toggled elsewhere)
  useEffect(() => {
    const cleanup = onSyncChange(async (msg) => {
      if (msg.type === 'trades' || msg.type === 'trading_rules' || msg.type === 'rules') {
        const activeId = localStorage.getItem('tcai_active_session');
        if (activeId) {
          const sessionTrades = await Trade.list({ session_id: activeId });
          setTrades(sessionTrades.sort((a, b) => (a.slot_index || 0) - (b.slot_index || 0)));
        }
      }
    });
    return cleanup;
  }, []);

  // Calculate discipline streak on load
  useEffect(() => {
    async function calcStreak() {
      const sessions = await TradingSession.list({ status: 'ended' });
      sessions.sort((a, b) => new Date(b.created_date) - new Date(a.created_date));
      let count = 0;
      for (const sess of sessions) {
        const sessionTrades = await Trade.list({ session_id: sess.id });
        const isDisciplined = sessionTrades.length > 0 && sessionTrades.every(t =>
          t.rule_compliance?.length > 0 && t.rule_compliance.every(r => r.followed)
        );
        if (isDisciplined) count++;
        else break;
      }
      setStreak(count);
    }
    calcStreak();
  }, [trades]);

  // Update browser tab title with streak
  useEffect(() => {
    if (phase === 'trading') {
      const fire = streak > 0 ? '\uD83D\uDD25' : '';
      document.title = `${fire}${streak > 0 ? ` ${streak} streak` : ''} ${executionScore}% — Trading Companion`;
    } else if (phase === 'locked') {
      document.title = '\uD83D\uDD12 Locked — Trading Companion';
    } else {
      document.title = 'Trading Companion';
    }
  }, [phase, streak, executionScore]);

  // Track rule-check speed and warn if too fast
  const prevEnabledCountRef = React.useRef(enabledEntryCount);
  useEffect(() => {
    if (enabledEntryCount > prevEnabledCountRef.current) {
      // A rule was just checked
      ruleCheckTimesRef.current.push(Date.now());

      // Check if last 3+ rules were checked within 8 seconds total
      const times = ruleCheckTimesRef.current;
      if (times.length >= 3) {
        const last3 = times.slice(-3);
        const span = last3[last3.length - 1] - last3[0];
        if (span < 8000) {
          setSpeedWarning('Slow down — are you actually confirming each condition on the chart?');
          setTimeout(() => setSpeedWarning(null), 6000);
        }
      }
    } else if (enabledEntryCount < prevEnabledCountRef.current) {
      // Rules were reset — clear timestamps
      ruleCheckTimesRef.current = [];
      setSpeedWarning(null);
    }
    prevEnabledCountRef.current = enabledEntryCount;
  }, [enabledEntryCount]);

  // Cooldown countdown timer
  useEffect(() => {
    if (!cooldownUntil) return;
    const interval = setInterval(() => {
      const remaining = Math.max(0, Math.ceil((cooldownUntil - Date.now()) / 1000));
      setCooldownLeft(remaining);
      if (remaining <= 0) {
        setCooldownUntil(null);
        setCooldownLeft(0);
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [cooldownUntil]);

  // Session auto-end timer
  useEffect(() => {
    if (phase !== 'trading' || !session?.start_time || !session?.max_session_minutes) return;
    const maxMs = session.max_session_minutes * 60 * 1000;
    const endTime = new Date(session.start_time).getTime() + maxMs;

    const interval = setInterval(() => {
      const remaining = Math.max(0, endTime - Date.now());
      setSessionTimeLeft(remaining);
      if (remaining <= 0) {
        clearInterval(interval);
        // Auto-end the session
        handleEndSession();
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [phase, session?.start_time, session?.max_session_minutes]);

  const loadWeeklyData = useCallback(async () => {
    try {
      const { weekStart, weekEnd } = getWeekRange();
      const sessions = await TradingSession.list({ status: 'ended' });
      const weekSessions = sessions.filter(s => {
        const d = new Date(s.created_date);
        return d >= weekStart && d <= weekEnd;
      });

      let aPlusCount = 0;
      let totalScore = 0;
      let scoreCount = 0;

      for (const sess of weekSessions) {
        const sessionTrades = await Trade.list({ session_id: sess.id });
        aPlusCount += sessionTrades.filter(isAPlusTrade).length;
        if (sess.execution_score != null) { totalScore += sess.execution_score; scoreCount++; }
      }
      if (session) aPlusCount += trades.filter(isAPlusTrade).length;

      const goals = await WeeklyGoal.list();
      const weekGoal = goals.find(g => new Date(g.week_start) >= weekStart && new Date(g.week_start) <= weekEnd);

      setWeeklyData({
        aPlusCount,
        target: weekGoal?.a_plus_target || 10,
        avgScore: scoreCount > 0 ? Math.round(totalScore / scoreCount) : 0,
      });
    } catch (e) {
      console.error('Failed to load weekly data:', e);
    }
  }, [session, trades]);

  const handleBeginSession = async (config) => {
    const sess = await TradingSession.create({
      ...config,
      status: 'active',
      start_time: new Date().toISOString(),
      execution_score: 0,
      emotional_log: [],
      conversation_log: [],
    });
    setSession(sess);
    localStorage.setItem('tcai_active_session', sess.id);
    setPhase('trading');
    await loadWeeklyData();
  };

  const handleExecuteTrade = () => {
    setActiveSlot(trades.length);
    setShowExecuteDialog(false);
    setShowTradeDetail(true);
  };

  const handleSaveTrade = async (tradeData) => {
    const existing = trades.find(t => t.slot_index === tradeData.slot_index);
    if (existing) {
      await Trade.update(existing.id, tradeData);
      setTrades(prev => prev.map(t => t.id === existing.id ? { ...t, ...tradeData } : t));
    } else {
      const newTrade = await Trade.create({ ...tradeData, session_id: session.id });
      setTrades(prev => [...prev, newTrade]);

      // Trigger cooldown if this was a loss
      const cooldownSecs = session?.loss_cooldown_seconds || 0;
      if (tradeData.result === 'loss' && cooldownSecs > 0) {
        const until = Date.now() + cooldownSecs * 1000;
        setCooldownUntil(until);
        setCooldownLeft(cooldownSecs);
      }
    }
    if (!existing) await resetAllRules();
    setShowTradeDetail(false);
    await loadWeeklyData();
  };

  const handleSlotClick = (index) => {
    if (trades[index]) { setActiveSlot(index); setShowTradeDetail(true); }
  };

  const handleVoiceEntry = async (entry) => {
    const updated = [...voiceEntries, entry];
    setVoiceEntries(updated);
    // Persist to session
    if (session) {
      await TradingSession.update(session.id, { voice_entries: updated });
    }
  };

  const handleEndSession = async () => {
    const endTime = new Date().toISOString();
    const lockUntil = new Date(Date.now() + 6 * 60 * 60 * 1000).toISOString();

    // Calculate session execution score from actual trade rule_compliance data
    // (not from current checkbox state, which resets after each trade)
    let sessionExecScore = 0;
    if (trades.length > 0) {
      const tradeScores = trades.map(t => {
        if (!t.rule_compliance || t.rule_compliance.length === 0) return 0;
        const followed = t.rule_compliance.filter(r => r.followed).length;
        return Math.round((followed / t.rule_compliance.length) * 100);
      });
      sessionExecScore = Math.round(tradeScores.reduce((a, b) => a + b, 0) / tradeScores.length);
    }

    const summary = generateSessionSummary({
      trades, executionScore: sessionExecScore, startTime: session.start_time, endTime, dailyObjective: session.daily_objective,
    });

    // Compile voice journal from voice entries
    const voiceJournalText = voiceEntries.length > 0
      ? voiceEntries.map(e => {
          const time = new Date(e.time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
          return `[${time}] ${e.text}`;
        }).join('\n\n')
      : null;

    await TradingSession.update(session.id, {
      status: 'ended', end_time: endTime, lockout_until: lockUntil,
      execution_score: sessionExecScore, summary,
      voice_journal: voiceJournalText,
    });

    try {
      const dna = await getOrCreateDNA();
      const newTotal = (dna.total_sessions || 0) + 1;
      const newAvgScore = Math.round(((dna.avg_execution_score || 0) * (newTotal - 1) + sessionExecScore) / newTotal);
      if (dna.id) {
        const { TradingDNA } = await import('@/api/db');
        await TradingDNA.update(dna.id, { total_sessions: newTotal, avg_execution_score: newAvgScore });
      }
    } catch (e) { console.error('DNA update error:', e); }

    localStorage.setItem('tcai_lockout', JSON.stringify({ until: lockUntil, sessionId: session.id }));
    localStorage.removeItem('tcai_active_session');
    setShowEndDialog(false);
    navigate('/reflection', { state: { sessionId: session.id } });
  };

  const handleLockoutExpired = () => {
    localStorage.removeItem('tcai_lockout');
    setPhase('setup');
    setSession(null);
    setTrades([]);
  };

  const handleEditWeeklyTarget = async (newTarget) => {
    const { weekStart, weekEnd } = getWeekRange();
    const goals = await WeeklyGoal.list();
    const existing = goals.find(g => new Date(g.week_start) >= weekStart && new Date(g.week_start) <= weekEnd);
    if (existing) await WeeklyGoal.update(existing.id, { a_plus_target: newTarget });
    else await WeeklyGoal.create({ week_start: weekStart.toISOString(), week_end: weekEnd.toISOString(), a_plus_target: newTarget });
    setWeeklyData(prev => ({ ...prev, target: newTarget }));
  };

  // --- Render ---

  if (phase === 'loading' || rulesLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-teal-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (phase === 'locked') {
    return <LockedScreen lockoutUntil={lockoutUntil} onExpired={handleLockoutExpired} onGoToReflection={() => navigate('/reflection')} />;
  }

  if (phase === 'setup') {
    return <SessionSetup onBeginSession={handleBeginSession} />;
  }

  // --- Trading Phase ---
  const totalR = trades.reduce((s, t) => s + (t.r_multiple || 0), 0);

  return (
    <>
      <div className="screen-glow animate-pulse-glow" style={glowStyle} />
      <EmergencyIntervention open={showEmergency} onClose={() => setShowEmergency(false)} />

      <div className="h-screen flex flex-col overflow-hidden">
        {/* Header bar */}
        <header className="flex items-center justify-between px-4 py-2 border-b border-zinc-800/30 flex-shrink-0">
          <div className="flex items-center gap-3">
            <SessionTimer startTime={session?.start_time} />
            {streak > 0 && (
              <span className="text-[10px] px-1.5 py-0.5 rounded bg-amber-500/10 text-amber-300 font-medium" title={`${streak} disciplined sessions in a row`}>
                {'\uD83D\uDD25'} {streak}
              </span>
            )}
            {sessionTimeLeft != null && session?.max_session_minutes > 0 && (
              <span className={cn(
                'text-[10px] font-mono tabular-nums px-1.5 py-0.5 rounded',
                sessionTimeLeft < 300000 ? 'bg-red-500/10 text-red-400' :
                sessionTimeLeft < 900000 ? 'bg-amber-500/10 text-amber-300' :
                'text-zinc-500'
              )} title="Time remaining in session">
                {Math.floor(sessionTimeLeft / 60000)}:{((Math.floor(sessionTimeLeft / 1000) % 60)).toString().padStart(2, '0')} left
              </span>
            )}
            <span className="text-[10px] text-zinc-600 uppercase tracking-wider hidden sm:inline">
              {session?.daily_objective}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => window.open(window.location.origin + '/#/widget', 'TradingWidget', 'width=280,height=520,resizable=yes,scrollbars=no,toolbar=no,menubar=no,location=no,status=no')}
              className="p-1.5 rounded text-zinc-500 hover:text-teal-400 hover:bg-zinc-800/50 transition-colors"
              title="Pop out widget"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </button>
            <button
              onClick={() => setShowEmergency(true)}
              className="p-1.5 rounded text-zinc-500 hover:text-amber-400 hover:bg-zinc-800/50 transition-colors"
              title="Circuit Breaker"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
            </button>
            <button
              onClick={() => navigate('/stats')}
              className="p-1.5 rounded text-zinc-500 hover:text-zinc-300 hover:bg-zinc-800/50 transition-colors"
              title="Stats"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </button>
            <Button variant="ghost" size="sm" onClick={() => setShowEndDialog(true)} className="text-xs text-zinc-500 hover:text-red-400">
              End
            </Button>
          </div>
        </header>

        {/* Main content: Chart left, Controls right */}
        <div className="flex-1 flex min-h-0">
          {/* TradingView Chart — left panel */}
          <TradingViewChart className="flex-1 min-w-0 border-r border-zinc-800/30" />

          {/* Controls panel — right side, scrollable */}
          <div className="w-80 lg:w-96 flex-shrink-0 overflow-y-auto px-4 py-4 space-y-4">
            {/* Wheel with motivational phrases */}
            <div className="flex items-center justify-center gap-2">
              <WheelPhrase side="left" isLocked={isLocked} />

              <div className="flex flex-col items-center">
                <div className="mb-2">
                  <EmaStatusToggle direction={emaDirection} onChange={setEmaDirection} />
                </div>

                <DisciplineWheel
                  maxTrades={session?.max_trades || 3}
                  trades={trades}
                  isLocked={isLocked}
                  executionScore={executionScore}
                  emaDirection={emaDirection}
                  onSlotClick={handleSlotClick}
                />

                {/* Inline stats */}
                <div className="flex items-center gap-4 mt-3 text-xs font-mono tabular-nums">
                  <span className={cn(cumulativePnl >= 0 ? 'text-emerald-400' : 'text-red-400')}>
                    ${cumulativePnl >= 0 ? '+' : ''}{cumulativePnl.toFixed(0)}
                  </span>
                  <span className={cn(totalR >= 0 ? 'text-emerald-400/70' : 'text-red-400/70')}>
                    {totalR >= 0 ? '+' : ''}{totalR.toFixed(1)}R
                  </span>
                  {dailyLossLimit > 0 && (
                    <span className={cn(lossLimitHit ? 'text-red-400' : 'text-zinc-600')}>
                      -{dailyLossLimit}
                    </span>
                  )}
                </div>
              </div>

              <WheelPhrase side="right" isLocked={isLocked} />
            </div>

            {/* Status line */}
            <div className={cn(
              'text-center text-[11px] font-medium py-1 rounded transition-all',
              lossLimitHit ? 'text-red-300 bg-red-500/5' :
              allSlotsFilled ? 'text-amber-300 bg-amber-500/5' :
              isLocked ? 'text-zinc-500' :
              'text-teal-300 bg-teal-500/5'
            )}>
              {lossLimitHit ? 'Loss limit hit.'
                : allSlotsFilled ? 'All slots filled.'
                : isCoolingDown ? `Cooldown: ${Math.floor(cooldownLeft / 60)}:${(cooldownLeft % 60).toString().padStart(2, '0')} — breathe`
                : !requiredRulesMet ? 'Required rules not met'
                : isLocked ? `Check ${Math.max(0, Math.ceil(totalEntryCount * 0.7) - enabledEntryCount)} more to unlock`
                : 'Unlocked'}
            </div>

            {/* Speed warning */}
            {speedWarning && (
              <div className="px-3 py-2 rounded-md bg-amber-500/10 border border-amber-500/20 text-amber-300 text-[11px] text-center animate-fade-in mb-2">
                {speedWarning}
              </div>
            )}

            {/* Cooldown overlay — hides rules after a loss */}
            {isCoolingDown ? (
              <div className="flex flex-col items-center justify-center py-8 space-y-4">
                <div className="w-16 h-16 rounded-full border-2 border-red-500/40 bg-red-500/10 flex items-center justify-center">
                  <span className="text-xl font-mono font-bold text-red-400 tabular-nums">
                    {Math.floor(cooldownLeft / 60)}:{(cooldownLeft % 60).toString().padStart(2, '0')}
                  </span>
                </div>
                <p className="text-xs text-zinc-400 text-center max-w-[200px]">
                  Post-loss cooldown active. Step back, breathe, and reset your mindset.
                </p>
                <p className="text-[10px] text-zinc-600 italic">Rules will reappear when the timer ends.</p>
              </div>
            ) : (
              <>
                {/* Entry Rules */}
                <EntryRuleButtons rules={rules} onToggle={toggleRule} onAdd={addRule} onDelete={deleteRule} onEdit={editRule} onReorder={reorderRules} disabled={false} />
              </>
            )}

            {/* Other Rules */}
            <OtherRulesDropdown rules={rules} onToggle={toggleRule} onAdd={addRule} onDelete={deleteRule} />

            {/* Execute Button */}
            <button
              className={cn(
                'w-full h-11 rounded-md text-sm font-bold transition-all duration-500',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950',
                isLocked
                  ? 'cursor-not-allowed'
                  : 'hover:brightness-110 active:scale-[0.98] shadow-lg'
              )}
              disabled={isLocked}
              onClick={() => !isLocked && setShowExecuteDialog(true)}
              style={{
                backgroundColor: isLocked ? `rgba(${scoreColorRgb}, 0.15)` : `rgb(${scoreColorRgb})`,
                color: isLocked ? `rgb(${scoreColorRgb})` : '#09090b',
                boxShadow: isLocked ? 'none' : `0 4px 20px rgba(${scoreColorRgb}, 0.3)`,
                border: isLocked ? `1px solid rgba(${scoreColorRgb}, 0.3)` : 'none',
              }}
            >
              {isLocked ? 'Locked' : 'Execute Trade'}
            </button>

            {/* Weekly goal */}
            <div className="opacity-70">
              <WeeklyGoalBar
                aPlusCount={weeklyData.aPlusCount}
                target={weeklyData.target}
                avgScore={weeklyData.avgScore}
                onEditTarget={handleEditWeeklyTarget}
              />
            </div>

            {/* Voice Journal */}
            <VoiceJournal entries={voiceEntries} onNewEntry={handleVoiceEntry} />

            {/* Affirmation */}
            {session?.daily_affirmation && (
              <p className="text-center text-[10px] text-zinc-600 italic">{session.daily_affirmation}</p>
            )}
          </div>
        </div>
      </div>

      {/* Dialogs */}
      <ExecuteConfirmDialog open={showExecuteDialog} onOpenChange={setShowExecuteDialog} rules={rules} onConfirm={handleExecuteTrade} />
      <TradeDetail open={showTradeDetail} onOpenChange={setShowTradeDetail} trade={activeSlot != null ? trades[activeSlot] : null} rules={rules} slotIndex={activeSlot ?? trades.length} onSave={handleSaveTrade} />
      <EndSessionDialog open={showEndDialog} onOpenChange={setShowEndDialog} onConfirm={handleEndSession} tradesCount={trades.length} executionScore={executionScore} />
    </>
  );
}
