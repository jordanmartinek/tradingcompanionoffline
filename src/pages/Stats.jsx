import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { TradingSession, Trade } from '@/api/db';
import { isAPlusTrade } from '@/shared/weeklyGoal';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import EquityCurve from '@/components/trading/EquityCurve';
import TimeHeatmap from '@/components/trading/TimeHeatmap';
import BadgesDisplay from '@/components/trading/BadgesDisplay';
import { cn } from '@/lib/utils';

export default function Stats() {
  const navigate = useNavigate();
  const [sessions, setSessions] = useState([]);
  const [allTrades, setAllTrades] = useState([]);
  const [timeRange, setTimeRange] = useState(7); // 7 or 30
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const endedSessions = await TradingSession.list({ status: 'ended' });
        // Sort by date descending
        endedSessions.sort((a, b) => new Date(b.created_date) - new Date(a.created_date));
        
        // Take the last N sessions based on timeRange
        const sliced = endedSessions.slice(0, timeRange);
        setSessions(sliced);

        // Load all trades for these sessions
        const trades = [];
        for (const sess of sliced) {
          const sessionTrades = await Trade.list({ session_id: sess.id });
          trades.push(...sessionTrades.map(t => ({ ...t, _session: sess })));
        }
        setAllTrades(trades);
      } catch (e) {
        console.error('Stats load error:', e);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [timeRange]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-teal-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  // Computed stats
  const totalTrades = allTrades.length;
  const wins = allTrades.filter(t => t.result === 'win');
  const losses = allTrades.filter(t => t.result === 'loss');
  const winRate = totalTrades > 0 ? Math.round((wins.length / totalTrades) * 100) : 0;
  
  const netPnl = allTrades.reduce((s, t) => s + (t.pnl || 0), 0);
  const totalR = allTrades.reduce((s, t) => s + (t.r_multiple || 0), 0);
  const avgR = totalTrades > 0 ? totalR / totalTrades : 0;

  // Expectancy
  const avgWin = wins.length > 0 ? wins.reduce((s, t) => s + (t.pnl || 0), 0) / wins.length : 0;
  const avgLoss = losses.length > 0 ? Math.abs(losses.reduce((s, t) => s + (t.pnl || 0), 0) / losses.length) : 0;
  const winP = totalTrades > 0 ? wins.length / totalTrades : 0;
  const lossP = 1 - winP;
  const expectancy = (winP * avgWin) - (lossP * avgLoss);
  
  const avgWinR = wins.length > 0 ? wins.reduce((s, t) => s + (t.r_multiple || 0), 0) / wins.length : 0;
  const avgLossR = losses.length > 0 ? Math.abs(losses.reduce((s, t) => s + (t.r_multiple || 0), 0) / losses.length) : 0;
  const expectancyR = (winP * avgWinR) - (lossP * avgLossR);

  // Rule compliance
  const allCompliance = allTrades.flatMap(t => t.rule_compliance || []);
  const complianceRate = allCompliance.length > 0
    ? Math.round((allCompliance.filter(r => r.followed).length / allCompliance.length) * 100)
    : 0;

  // Discipline streaks
  let currentStreak = 0;
  let bestStreak = 0;
  let tempStreak = 0;
  
  // A session is "disciplined" if every trade had full rule compliance
  const sortedSessions = [...sessions].sort((a, b) => new Date(a.created_date) - new Date(b.created_date));
  for (const sess of sortedSessions) {
    const sessionTrades = allTrades.filter(t => t.session_id === sess.id);
    const isDisciplined = sessionTrades.length > 0 && sessionTrades.every(t => {
      if (!t.rule_compliance || t.rule_compliance.length === 0) return false;
      return t.rule_compliance.every(r => r.followed);
    });
    
    if (isDisciplined) {
      tempStreak++;
      bestStreak = Math.max(bestStreak, tempStreak);
    } else {
      tempStreak = 0;
    }
  }
  // Current streak is from the end
  currentStreak = 0;
  for (let i = sortedSessions.length - 1; i >= 0; i--) {
    const sess = sortedSessions[i];
    const sessionTrades = allTrades.filter(t => t.session_id === sess.id);
    const isDisciplined = sessionTrades.length > 0 && sessionTrades.every(t => {
      if (!t.rule_compliance || t.rule_compliance.length === 0) return false;
      return t.rule_compliance.every(r => r.followed);
    });
    if (isDisciplined) currentStreak++;
    else break;
  }

  // Edge callout
  let edgeCallout = '';
  if (expectancy > 10) edgeCallout = 'Positive expectancy — you have an edge. Keep executing.';
  else if (expectancy > 0) edgeCallout = 'Slight positive expectancy. Stay consistent, the edge is there.';
  else if (expectancy === 0) edgeCallout = 'Break-even expectancy. Look for rule-compliance improvements.';
  else edgeCallout = 'Negative expectancy. Focus on cutting losses short and following rules.';

  return (
    <div className="min-h-screen p-4 md:p-6 max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <header className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 className="text-2xl font-bold text-zinc-100">Performance Stats</h1>
          <p className="text-sm text-zinc-500 mt-1">
            Last {timeRange} sessions ({sessions.length} found)
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant={timeRange === 7 ? 'default' : 'ghost'}
            size="sm"
            onClick={() => setTimeRange(7)}
          >
            7 Sessions
          </Button>
          <Button
            variant={timeRange === 30 ? 'default' : 'ghost'}
            size="sm"
            onClick={() => setTimeRange(30)}
          >
            30 Sessions
          </Button>
          <Button variant="ghost" size="sm" onClick={() => navigate('/')}>
            Dashboard
          </Button>
        </div>
      </header>

      {sessions.length === 0 ? (
        <Card>
          <CardContent className="py-12 text-center">
            <p className="text-zinc-400">No completed sessions yet. Start trading to see your stats!</p>
            <Button className="mt-4" onClick={() => navigate('/')}>Go to Dashboard</Button>
          </CardContent>
        </Card>
      ) : (
        <>
          {/* Overview Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[
              { label: 'Net PnL', value: `$${netPnl >= 0 ? '+' : ''}${netPnl.toFixed(0)}`, color: netPnl >= 0 ? 'text-emerald-400' : 'text-red-400' },
              { label: 'Win Rate', value: `${winRate}%`, color: winRate >= 50 ? 'text-emerald-400' : 'text-red-400' },
              { label: 'Avg R/Trade', value: `${avgR >= 0 ? '+' : ''}${avgR.toFixed(2)}R`, color: avgR >= 0 ? 'text-emerald-400' : 'text-red-400' },
              { label: 'Rule Compliance', value: `${complianceRate}%`, color: complianceRate >= 70 ? 'text-teal-400' : 'text-amber-400' },
            ].map((stat, i) => (
              <Card key={i}>
                <CardContent className="p-4 text-center">
                  <p className="text-[10px] text-zinc-500 uppercase tracking-wider">{stat.label}</p>
                  <p className={cn('text-xl font-mono font-bold tabular-nums mt-1', stat.color)}>{stat.value}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Expectancy */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Expectancy</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="p-3 rounded-lg bg-zinc-800/50 border border-zinc-700/50 text-center">
                  <p className="text-[10px] text-zinc-500 uppercase">$ Expectancy</p>
                  <p className={cn(
                    'text-lg font-mono font-bold mt-1',
                    expectancy >= 0 ? 'text-emerald-400' : 'text-red-400'
                  )}>
                    ${expectancy >= 0 ? '+' : ''}{expectancy.toFixed(2)}
                  </p>
                  <p className="text-[10px] text-zinc-600 mt-0.5">per trade</p>
                </div>
                <div className="p-3 rounded-lg bg-zinc-800/50 border border-zinc-700/50 text-center">
                  <p className="text-[10px] text-zinc-500 uppercase">R Expectancy</p>
                  <p className={cn(
                    'text-lg font-mono font-bold mt-1',
                    expectancyR >= 0 ? 'text-emerald-400' : 'text-red-400'
                  )}>
                    {expectancyR >= 0 ? '+' : ''}{expectancyR.toFixed(2)}R
                  </p>
                  <p className="text-[10px] text-zinc-600 mt-0.5">per trade</p>
                </div>
              </div>
              <div className={cn(
                'p-3 rounded-lg text-sm',
                expectancy > 0 ? 'bg-emerald-500/5 border border-emerald-500/20 text-emerald-300' :
                expectancy === 0 ? 'bg-zinc-800/50 border border-zinc-700/50 text-zinc-300' :
                'bg-red-500/5 border border-red-500/20 text-red-300'
              )}>
                {edgeCallout}
              </div>
            </CardContent>
          </Card>

          {/* Streaks */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Discipline Streaks</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <div className="p-3 rounded-lg bg-zinc-800/50 border border-zinc-700/50 text-center">
                  <p className="text-[10px] text-zinc-500 uppercase">Current Streak</p>
                  <p className="text-2xl font-mono font-bold text-teal-400 mt-1">{currentStreak}</p>
                  <p className="text-[10px] text-zinc-600">sessions</p>
                </div>
                <div className="p-3 rounded-lg bg-zinc-800/50 border border-zinc-700/50 text-center">
                  <p className="text-[10px] text-zinc-500 uppercase">Best Streak</p>
                  <p className="text-2xl font-mono font-bold text-amber-400 mt-1">{bestStreak}</p>
                  <p className="text-[10px] text-zinc-600">sessions</p>
                </div>
              </div>
              <p className="text-xs text-zinc-500 mt-3">
                A "disciplined" session = every trade had all rules followed.
              </p>
            </CardContent>
          </Card>

          {/* Equity Curve */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Equity Curve</CardTitle>
            </CardHeader>
            <CardContent>
              <EquityCurve />
            </CardContent>
          </Card>

          {/* Time-of-Day Heatmap */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Time-of-Day Performance</CardTitle>
            </CardHeader>
            <CardContent>
              <TimeHeatmap />
            </CardContent>
          </Card>

          {/* Win/Loss Streak */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Win/Loss Streaks</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <div className="p-3 rounded-lg bg-zinc-800/50 border border-zinc-700/50 text-center">
                  <p className="text-[10px] text-zinc-500 uppercase">Current W/L</p>
                  <p className={cn(
                    'text-2xl font-mono font-bold mt-1',
                    (() => {
                      let streak = 0, type = '';
                      for (let i = allTrades.length - 1; i >= 0; i--) {
                        const r = allTrades[i].result;
                        if (r !== 'win' && r !== 'loss') continue;
                        if (!type) type = r;
                        if (r === type) streak++;
                        else break;
                      }
                      return type === 'win' ? 'text-emerald-400' : streak > 0 ? 'text-red-400' : 'text-zinc-500';
                    })()
                  )}>
                    {(() => {
                      let streak = 0, type = '';
                      for (let i = allTrades.length - 1; i >= 0; i--) {
                        const r = allTrades[i].result;
                        if (r !== 'win' && r !== 'loss') continue;
                        if (!type) type = r;
                        if (r === type) streak++;
                        else break;
                      }
                      return streak > 0 ? `${streak}${type === 'win' ? 'W' : 'L'}` : '—';
                    })()}
                  </p>
                </div>
                <div className="p-3 rounded-lg bg-zinc-800/50 border border-zinc-700/50 text-center">
                  <p className="text-[10px] text-zinc-500 uppercase">Best Win Streak</p>
                  <p className="text-2xl font-mono font-bold text-emerald-400 mt-1">
                    {(() => {
                      let best = 0, cur = 0;
                      for (const t of allTrades) {
                        if (t.result === 'win') { cur++; best = Math.max(best, cur); }
                        else if (t.result === 'loss') cur = 0;
                      }
                      return best;
                    })()}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Badges */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Milestone Badges</CardTitle>
            </CardHeader>
            <CardContent>
              <BadgesDisplay />
            </CardContent>
          </Card>

          {/* Per-Session Breakdown */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Per-Session Breakdown</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {/* Header row */}
                <div className="grid grid-cols-6 gap-2 text-[10px] text-zinc-500 uppercase tracking-wider pb-2 border-b border-zinc-800">
                  <span>Date</span>
                  <span className="text-center">Trades</span>
                  <span className="text-center">Exec %</span>
                  <span className="text-right">PnL</span>
                  <span className="text-right">R</span>
                  <span className="text-center">Compliant</span>
                </div>
                
                {sessions.map((sess, idx) => {
                  const sessTrades = allTrades.filter(t => t.session_id === sess.id);
                  const sessPnl = sessTrades.reduce((s, t) => s + (t.pnl || 0), 0);
                  const sessR = sessTrades.reduce((s, t) => s + (t.r_multiple || 0), 0);
                  const isFullyCompliant = sessTrades.length > 0 && sessTrades.every(t =>
                    t.rule_compliance?.length > 0 && t.rule_compliance.every(r => r.followed)
                  );

                  return (
                    <div key={idx} className="grid grid-cols-6 gap-2 text-sm py-1.5 border-b border-zinc-800/50">
                      <span className="text-zinc-400 text-xs">
                        {new Date(sess.created_date).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
                      </span>
                      <span className="text-center text-zinc-300 font-mono text-xs">{sessTrades.length}</span>
                      <span className={cn(
                        'text-center font-mono text-xs',
                        (sess.execution_score || 0) >= 70 ? 'text-teal-400' : 'text-amber-400'
                      )}>
                        {sess.execution_score || 0}%
                      </span>
                      <span className={cn(
                        'text-right font-mono text-xs',
                        sessPnl >= 0 ? 'text-emerald-400' : 'text-red-400'
                      )}>
                        ${sessPnl >= 0 ? '+' : ''}{sessPnl.toFixed(0)}
                      </span>
                      <span className={cn(
                        'text-right font-mono text-xs',
                        sessR >= 0 ? 'text-emerald-400' : 'text-red-400'
                      )}>
                        {sessR >= 0 ? '+' : ''}{sessR.toFixed(1)}
                      </span>
                      <span className="text-center">
                        {isFullyCompliant ? (
                          <span className="text-emerald-400 text-xs">✓</span>
                        ) : (
                          <span className="text-zinc-600 text-xs">—</span>
                        )}
                      </span>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </>
      )}
    </div>
  );
}
