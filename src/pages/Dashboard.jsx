import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { TradingSession, Trade, WeeklyGoal, Receipt, getOrCreateDNA } from '@/api/db';
import { useTradingRules } from '@/hooks/useTradingRules';
import { getWeekRange, isAPlusTrade } from '@/shared/weeklyGoal';
import { generateGreeting, generateResponse, generateCoachingRecap, generateSessionSummary, generateVoiceJournal } from '@/shared/coachingEngine';

import SessionSetup from '@/components/trading/SessionSetup';
import DisciplineWheel from '@/components/trading/DisciplineWheel';
import EntryRuleButtons from '@/components/trading/EntryRuleButtons';
import OtherRulesDropdown from '@/components/trading/OtherRulesDropdown';
import ConfluenceCounter from '@/components/trading/ConfluenceCounter';
import EmaStatusToggle from '@/components/trading/EmaStatusToggle';
import ExecuteConfirmDialog from '@/components/trading/ExecuteConfirmDialog';
import TradeDetail from '@/components/trading/TradeDetail';
import SessionTimer from '@/components/trading/SessionTimer';
import CoachSelector from '@/components/trading/CoachSelector';
import WeeklyGoalBar from '@/components/trading/WeeklyGoalBar';
import MotivationalPhrase from '@/components/trading/MotivationalPhrase';
import EndSessionDialog from '@/components/trading/EndSessionDialog';
import LockedScreen from '@/components/trading/LockedScreen';
import EmergencyIntervention from '@/components/trading/EmergencyIntervention';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

const LOCK_THRESHOLD = 70;

export default function Dashboard() {
  const navigate = useNavigate();
  const { rules, toggleRule, addRule, editRule, deleteRule, resetAllRules, loading: rulesLoading } = useTradingRules();

  // Phase: 'loading' | 'setup' | 'trading' | 'locked'
  const [phase, setPhase] = useState('loading');
  const [session, setSession] = useState(null);
  const [trades, setTrades] = useState([]);
  const [lockoutUntil, setLockoutUntil] = useState(null);

  // Trading state
  const [emaDirection, setEmaDirection] = useState(null);
  const [showExecuteDialog, setShowExecuteDialog] = useState(false);
  const [showTradeDetail, setShowTradeDetail] = useState(false);
  const [activeSlot, setActiveSlot] = useState(null);
  const [showEndDialog, setShowEndDialog] = useState(false);
  const [showEmergency, setShowEmergency] = useState(false);

  // Coach chat
  const [chatInput, setChatInput] = useState('');
  const [chatMessages, setChatMessages] = useState([]);

  // Weekly goal
  const [weeklyData, setWeeklyData] = useState({ aPlusCount: 0, target: 10, avgScore: 0 });

  // Computed values
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
  const isLocked = executionScore < LOCK_THRESHOLD || lossLimitHit || allSlotsFilled;

  // Screen-edge glow color based on execution score
  const glowStyle = useMemo(() => {
    // Hue: 25 (orange) at 0% → 50 (yellow) at 50% → 170 (teal) at 100%
    const hue = executionScore < 50
      ? 25 + (executionScore / 50) * 25
      : 50 + ((executionScore - 50) / 50) * 120;
    const alpha = 0.05 + (executionScore / 100) * 0.15;
    const spread = 40 + (executionScore / 100) * 60;
    return {
      boxShadow: `inset 0 0 ${spread}px hsla(${hue}, 80%, 50%, ${alpha})`,
    };
  }, [executionScore]);

  // Initialize: check localStorage for active session or lockout
  useEffect(() => {
    async function init() {
      // Check lockout
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

      // Check active session
      const activeId = localStorage.getItem('tcai_active_session');
      if (activeId) {
        try {
          const sess = await TradingSession.get(activeId);
          if (sess && sess.status === 'active') {
            setSession(sess);
            const sessionTrades = await Trade.list({ session_id: activeId });
            setTrades(sessionTrades.sort((a, b) => (a.slot_index || 0) - (b.slot_index || 0)));
            setPhase('trading');
            // Restore chat
            if (sess.conversation_log) {
              setChatMessages(sess.conversation_log);
            }
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

  // Load weekly goal data
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
        if (sess.execution_score != null) {
          totalScore += sess.execution_score;
          scoreCount++;
        }
      }

      // Also count current session trades
      if (session) {
        aPlusCount += trades.filter(isAPlusTrade).length;
      }

      // Get or create weekly goal
      const goals = await WeeklyGoal.list();
      const weekGoal = goals.find(g => {
        const gs = new Date(g.week_start);
        return gs >= weekStart && gs <= weekEnd;
      });

      setWeeklyData({
        aPlusCount,
        target: weekGoal?.a_plus_target || 10,
        avgScore: scoreCount > 0 ? Math.round(totalScore / scoreCount) : 0,
      });
    } catch (e) {
      console.error('Failed to load weekly data:', e);
    }
  }, [session, trades]);

  // Begin session
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

    // Generate greeting
    const greeting = generateGreeting(config.coach_personality, config.daily_objective);
    const msg = { role: 'ai', text: greeting, time: new Date().toISOString() };
    setChatMessages([msg]);
    await TradingSession.update(sess.id, { conversation_log: [msg] });
    await loadWeeklyData();
  };

  // Execute trade
  const handleExecuteTrade = () => {
    const nextSlot = trades.length;
    setActiveSlot(nextSlot);
    setShowExecuteDialog(false);
    setShowTradeDetail(true);
  };

  // Save trade
  const handleSaveTrade = async (tradeData) => {
    const existing = trades.find(t => t.slot_index === tradeData.slot_index);

    if (existing) {
      await Trade.update(existing.id, tradeData);
      setTrades(prev => prev.map(t => t.id === existing.id ? { ...t, ...tradeData } : t));
    } else {
      const newTrade = await Trade.create({
        ...tradeData,
        session_id: session.id,
      });
      setTrades(prev => [...prev, newTrade]);
    }

    // Reset all rules after saving a NEW trade (not editing)
    if (!existing) {
      await resetAllRules();
    }

    setShowTradeDetail(false);
    await loadWeeklyData();
  };

  // Click wheel slot
  const handleSlotClick = (index) => {
    if (trades[index]) {
      setActiveSlot(index);
      setShowTradeDetail(true);
    }
  };

  // Coach chat
  const handleSendChat = async () => {
    if (!chatInput.trim() || !session) return;
    const userMsg = { role: 'user', text: chatInput, time: new Date().toISOString() };
    const response = generateResponse(chatInput, session.coach_personality, { trades, executionScore });
    const aiMsg = { role: 'ai', text: response.text, time: new Date().toISOString() };

    const updated = [...chatMessages, userMsg, aiMsg];
    setChatMessages(updated);
    setChatInput('');

    // Save receipts
    if (response.receipts && response.receipts.length > 0) {
      for (const r of response.receipts) {
        const existing = await Receipt.list();
        const found = existing.find(e => e.phrase === r.phrase);
        if (found) {
          await Receipt.update(found.id, { count: (found.count || 0) + 1, last_seen: new Date().toISOString() });
        } else {
          await Receipt.create({ phrase: r.phrase, count: 1, category: r.category, first_seen: new Date().toISOString(), last_seen: new Date().toISOString(), associated_results: [] });
        }
      }
    }

    await TradingSession.update(session.id, { conversation_log: updated });
  };

  // End session
  const handleEndSession = async () => {
    const endTime = new Date().toISOString();
    const lockUntil = new Date(Date.now() + 6 * 60 * 60 * 1000).toISOString();

    const summary = generateSessionSummary({
      trades,
      executionScore,
      startTime: session.start_time,
      endTime,
      dailyObjective: session.daily_objective,
    });
    const voiceJournal = generateVoiceJournal(chatMessages, session.coach_personality);
    const coachingRecap = generateCoachingRecap(session.coach_personality, { trades, executionScore, cumulativePnl });

    await TradingSession.update(session.id, {
      status: 'ended',
      end_time: endTime,
      lockout_until: lockUntil,
      execution_score: executionScore,
      summary,
      voice_journal: voiceJournal,
      coaching_recap: coachingRecap,
    });

    // Update Trading DNA
    try {
      const dna = await getOrCreateDNA();
      const newTotal = (dna.total_sessions || 0) + 1;
      const newAvgScore = Math.round(((dna.avg_execution_score || 0) * (newTotal - 1) + executionScore) / newTotal);
      await dna.id && await (await import('@/api/db')).TradingDNA.update(dna.id, {
        total_sessions: newTotal,
        avg_execution_score: newAvgScore,
      });
    } catch (e) {
      console.error('DNA update error:', e);
    }

    localStorage.setItem('tcai_lockout', JSON.stringify({ until: lockUntil, sessionId: session.id }));
    localStorage.removeItem('tcai_active_session');

    setShowEndDialog(false);
    navigate('/reflection', { state: { sessionId: session.id } });
  };

  // Handle lockout expiry
  const handleLockoutExpired = () => {
    localStorage.removeItem('tcai_lockout');
    setPhase('setup');
    setSession(null);
    setTrades([]);
  };

  // Edit weekly target
  const handleEditWeeklyTarget = async (newTarget) => {
    const { weekStart, weekEnd } = getWeekRange();
    const goals = await WeeklyGoal.list();
    const existing = goals.find(g => {
      const gs = new Date(g.week_start);
      return gs >= weekStart && gs <= weekEnd;
    });
    if (existing) {
      await WeeklyGoal.update(existing.id, { a_plus_target: newTarget });
    } else {
      await WeeklyGoal.create({ week_start: weekStart.toISOString(), week_end: weekEnd.toISOString(), a_plus_target: newTarget });
    }
    setWeeklyData(prev => ({ ...prev, target: newTarget }));
  };

  // Loading phase
  if (phase === 'loading' || rulesLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="w-8 h-8 border-2 border-teal-500 border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-zinc-500 text-sm">Loading session...</p>
        </div>
      </div>
    );
  }

  // Locked phase
  if (phase === 'locked') {
    return (
      <LockedScreen
        lockoutUntil={lockoutUntil}
        onExpired={handleLockoutExpired}
        onGoToReflection={() => navigate('/reflection')}
      />
    );
  }

  // Setup phase
  if (phase === 'setup') {
    return <SessionSetup onBeginSession={handleBeginSession} />;
  }

  // Trading phase
  return (
    <>
      {/* Screen-edge glow */}
      <div className="screen-glow animate-pulse-glow" style={glowStyle} />

      {/* Emergency Intervention */}
      <EmergencyIntervention open={showEmergency} onClose={() => setShowEmergency(false)} />

      <div className="min-h-screen p-4 md:p-6 max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <header className="flex items-center justify-between flex-wrap gap-3">
          <div className="flex items-center gap-4">
            <h1 className="text-lg font-bold text-zinc-100">Trading Cockpit</h1>
            <SessionTimer startTime={session?.start_time} />
          </div>
          <div className="flex items-center gap-3">
            <CoachSelector value={session?.coach_personality} onChange={async (v) => {
              await TradingSession.update(session.id, { coach_personality: v });
              setSession(prev => ({ ...prev, coach_personality: v }));
            }} />
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                window.open(
                  '/widget',
                  'TradingWidget',
                  'width=280,height=480,resizable=yes,scrollbars=no,toolbar=no,menubar=no,location=no,status=no'
                );
              }}
              className="text-teal-400 hover:text-teal-300"
              title="Pop out compact widget"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowEmergency(true)}
              className="text-amber-400 hover:text-amber-300"
              title="Emergency Circuit Breaker"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
            </Button>
            <Button variant="destructive" size="sm" onClick={() => setShowEndDialog(true)}>
              End Session
            </Button>
          </div>
        </header>

        {/* Status Banner */}
        <div className={cn(
          'px-4 py-2 rounded-lg text-sm font-medium text-center transition-all',
          lossLimitHit
            ? 'bg-red-500/10 border border-red-500/30 text-red-300'
            : allSlotsFilled
            ? 'bg-amber-500/10 border border-amber-500/30 text-amber-300'
            : isLocked
            ? 'bg-amber-500/10 border border-amber-500/30 text-amber-300'
            : 'bg-teal-500/10 border border-teal-500/30 text-teal-300'
        )}>
          {lossLimitHit
            ? 'Daily loss limit reached — stop trading.'
            : allSlotsFilled
            ? `All ${session?.max_trades} trade slots filled. End your session.`
            : isLocked
            ? `Trading Locked — check ${Math.ceil(totalEntryCount * 0.7) - enabledEntryCount} more entry rule(s) to unlock.`
            : 'Trading Unlocked — Execute with Discipline'}
        </div>

        {/* Weekly Goal */}
        <WeeklyGoalBar
          aPlusCount={weeklyData.aPlusCount}
          target={weeklyData.target}
          avgScore={weeklyData.avgScore}
          onEditTarget={handleEditWeeklyTarget}
        />

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column: Rules & Execute */}
          <div className="lg:col-span-2 space-y-4">
            {/* Entry Rules */}
            <div className="p-4 rounded-xl border border-zinc-800 bg-zinc-900/50">
              <EntryRuleButtons rules={rules} onToggle={toggleRule} onAdd={addRule} onDelete={deleteRule} onEdit={editRule} disabled={false} />
            </div>

            {/* Other Rules */}
            <div className="p-4 rounded-xl border border-zinc-800 bg-zinc-900/50">
              <OtherRulesDropdown
                rules={rules}
                onToggle={toggleRule}
                onAdd={addRule}
                onDelete={deleteRule}
              />
            </div>

            {/* Execute Button */}
            <Button
              className={cn(
                'w-full h-14 text-lg font-bold transition-all',
                isLocked && 'opacity-50'
              )}
              disabled={isLocked}
              onClick={() => setShowExecuteDialog(true)}
            >
              {isLocked ? (
                <span className="flex items-center gap-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" strokeWidth="2" />
                    <path d="M7 11V7a5 5 0 0 1 10 0v4" strokeWidth="2" strokeLinecap="round" />
                  </svg>
                  Locked
                </span>
              ) : (
                'Execute Trade'
              )}
            </Button>

            {/* Coach Chat */}
            <div className="p-4 rounded-xl border border-zinc-800 bg-zinc-900/50 space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-medium text-zinc-300">AI Coach</h3>
                <Badge variant="secondary" className="text-[10px]">
                  {session?.coach_personality?.replace('_', ' ')}
                </Badge>
              </div>

              {/* Messages */}
              <div className="max-h-48 overflow-y-auto space-y-2 pr-1">
                {chatMessages.slice(-8).map((msg, idx) => (
                  <div key={idx} className={cn(
                    'text-sm px-3 py-2 rounded-lg max-w-[85%]',
                    msg.role === 'ai'
                      ? 'bg-zinc-800 text-zinc-300 mr-auto'
                      : 'bg-teal-500/10 text-teal-200 ml-auto border border-teal-500/20'
                  )}>
                    {msg.text}
                  </div>
                ))}
              </div>

              {/* Input */}
              <div className="flex gap-2">
                <Input
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSendChat()}
                  placeholder="Talk to your coach..."
                  className="flex-1"
                />
                <Button size="sm" onClick={handleSendChat} disabled={!chatInput.trim()}>
                  Send
                </Button>
              </div>
            </div>
          </div>

          {/* Right Column: Wheel & Info */}
          <div className="space-y-4">
            {/* Discipline Wheel */}
            <div className="p-4 rounded-xl border border-zinc-800 bg-zinc-900/50 flex flex-col items-center gap-4">
              <div className="flex items-center justify-between w-full">
                <ConfluenceCounter rules={rules} />
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

              <MotivationalPhrase hidden={session?.focus_mode} />
            </div>

            {/* Session Info */}
            <div className="p-4 rounded-xl border border-zinc-800 bg-zinc-900/50 space-y-3">
              <h3 className="text-sm font-medium text-zinc-300">Session Info</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-zinc-500">Execution Score</span>
                  <span className={cn(
                    'font-mono tabular-nums font-medium',
                    executionScore >= 70 ? 'text-teal-400' : executionScore >= 40 ? 'text-amber-400' : 'text-red-400'
                  )}>{executionScore}%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-zinc-500">Cumulative PnL</span>
                  <span className={cn(
                    'font-mono tabular-nums',
                    cumulativePnl >= 0 ? 'text-emerald-400' : 'text-red-400'
                  )}>${cumulativePnl >= 0 ? '+' : ''}{cumulativePnl.toFixed(0)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-zinc-500">Total R</span>
                  <span className="font-mono tabular-nums text-zinc-300">
                    {trades.reduce((s, t) => s + (t.r_multiple || 0), 0).toFixed(1)}R
                  </span>
                </div>
                {dailyLossLimit > 0 && (
                  <div className="flex justify-between">
                    <span className="text-zinc-500">Loss Limit</span>
                    <span className={cn(
                      'font-mono tabular-nums',
                      lossLimitHit ? 'text-red-400' : 'text-zinc-300'
                    )}>-${dailyLossLimit}</span>
                  </div>
                )}
                {session?.daily_objective && (
                  <div className="pt-2 border-t border-zinc-800">
                    <span className="text-zinc-500 text-xs">Objective:</span>
                    <p className="text-zinc-300 text-xs mt-0.5">{session.daily_objective}</p>
                  </div>
                )}
                {session?.daily_affirmation && (
                  <div className="pt-2 border-t border-zinc-800">
                    <p className="text-teal-400/70 text-xs italic">{session.daily_affirmation}</p>
                  </div>
                )}
              </div>
            </div>

            {/* Quick Stats */}
            <div className="flex items-center justify-center gap-2">
              <Button variant="ghost" size="sm" onClick={() => navigate('/stats')}>
                View Stats
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Dialogs */}
      <ExecuteConfirmDialog
        open={showExecuteDialog}
        onOpenChange={setShowExecuteDialog}
        rules={rules}
        onConfirm={handleExecuteTrade}
      />

      <TradeDetail
        open={showTradeDetail}
        onOpenChange={setShowTradeDetail}
        trade={activeSlot != null ? trades[activeSlot] : null}
        rules={rules}
        slotIndex={activeSlot ?? trades.length}
        onSave={handleSaveTrade}
      />

      <EndSessionDialog
        open={showEndDialog}
        onOpenChange={setShowEndDialog}
        onConfirm={handleEndSession}
        tradesCount={trades.length}
        executionScore={executionScore}
      />
    </>
  );
}
