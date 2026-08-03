import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { TradingSession, Trade, Receipt, getOrCreateDNA } from '@/api/db';
import { isAPlusTrade } from '@/shared/weeklyGoal';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import TradeTimeline from '@/components/trading/TradeTimeline';
import { cn } from '@/lib/utils';

export default function Reflection() {
  const location = useLocation();
  const navigate = useNavigate();
  const [session, setSession] = useState(null);
  const [trades, setTrades] = useState([]);
  const [receipts, setReceipts] = useState([]);
  const [dna, setDna] = useState(null);
  const [loading, setLoading] = useState(true);
  const [lockoutTimeLeft, setLockoutTimeLeft] = useState('');

  useEffect(() => {
    async function load() {
      try {
        // Get session ID from navigation state or localStorage
        let sessionId = location.state?.sessionId;
        if (!sessionId) {
          const lockoutRaw = localStorage.getItem('tcai_lockout');
          if (lockoutRaw) {
            sessionId = JSON.parse(lockoutRaw).sessionId;
          }
        }
        if (!sessionId) {
          // Try to get the most recent ended session
          const sessions = await TradingSession.list({ status: 'ended' });
          if (sessions.length > 0) {
            sessionId = sessions[0].id;
          }
        }

        if (sessionId) {
          const sess = await TradingSession.get(sessionId);
          setSession(sess);
          const sessionTrades = await Trade.list({ session_id: sessionId });
          setTrades(sessionTrades.sort((a, b) => (a.slot_index || 0) - (b.slot_index || 0)));
        }

        const allReceipts = await Receipt.list();
        setReceipts(allReceipts);

        const dnaRecord = await getOrCreateDNA();
        setDna(dnaRecord);
      } catch (e) {
        console.error('Reflection load error:', e);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [location.state]);

  // Lockout countdown
  useEffect(() => {
    const lockoutRaw = localStorage.getItem('tcai_lockout');
    if (!lockoutRaw) return;
    const { until } = JSON.parse(lockoutRaw);

    const update = () => {
      const diff = new Date(until).getTime() - Date.now();
      if (diff <= 0) {
        setLockoutTimeLeft('Expired');
        return;
      }
      const h = Math.floor(diff / 3600000).toString().padStart(2, '0');
      const m = Math.floor((diff % 3600000) / 60000).toString().padStart(2, '0');
      const s = Math.floor((diff % 60000) / 1000).toString().padStart(2, '0');
      setLockoutTimeLeft(`${h}:${m}:${s}`);
    };
    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-teal-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!session) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="text-center space-y-4">
          <p className="text-zinc-400">No session to reflect on.</p>
          <Button onClick={() => navigate('/')}>Go to Dashboard</Button>
        </div>
      </div>
    );
  }

  // Computed stats
  const totalTrades = trades.length;
  const wins = trades.filter(t => t.result === 'win').length;
  const losses = trades.filter(t => t.result === 'loss').length;
  const winRate = totalTrades > 0 ? Math.round((wins / totalTrades) * 100) : 0;
  const totalR = trades.reduce((s, t) => s + (t.r_multiple || 0), 0);
  const totalPnl = trades.reduce((s, t) => s + (t.pnl || 0), 0);
  const aPlusTrades = trades.filter(isAPlusTrade).length;

  // Emotional analysis
  const emotionCounts = {};
  if (session.emotional_log) {
    session.emotional_log.forEach(e => {
      emotionCounts[e.emotion] = (emotionCounts[e.emotion] || 0) + 1;
    });
  }
  // Also from trades
  trades.forEach(t => {
    if (t.emotion_before) emotionCounts[t.emotion_before] = (emotionCounts[t.emotion_before] || 0) + 1;
    if (t.emotion_after) emotionCounts[t.emotion_after] = (emotionCounts[t.emotion_after] || 0) + 1;
  });
  const topEmotions = Object.entries(emotionCounts).sort((a, b) => b[1] - a[1]).slice(0, 5);

  // Rule compliance score
  const allCompliance = trades.flatMap(t => t.rule_compliance || []);
  const followedCount = allCompliance.filter(r => r.followed).length;
  const complianceRate = allCompliance.length > 0 ? Math.round((followedCount / allCompliance.length) * 100) : 0;

  return (
    <div className="min-h-screen p-4 md:p-6 max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <header className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-zinc-100">Session Reflection</h1>
          <p className="text-sm text-zinc-500 mt-1">
            {new Date(session.start_time).toLocaleDateString(undefined, { weekday: 'long', month: 'short', day: 'numeric' })}
          </p>
        </div>
        <Button variant="ghost" onClick={() => navigate('/')}>
          Back to Dashboard
        </Button>
      </header>

      {/* Session Summary */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Session Summary</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {session.summary && (
            <p className="text-sm text-zinc-300 leading-relaxed">{session.summary}</p>
          )}
          
          {/* Stat Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
            {[
              { label: 'Trades', value: totalTrades, color: 'text-zinc-200' },
              { label: 'Win Rate', value: `${winRate}%`, color: winRate >= 50 ? 'text-emerald-400' : 'text-red-400' },
              { label: 'Total R', value: `${totalR >= 0 ? '+' : ''}${totalR.toFixed(1)}`, color: totalR >= 0 ? 'text-emerald-400' : 'text-red-400' },
              { label: 'Net PnL', value: `$${totalPnl >= 0 ? '+' : ''}${totalPnl.toFixed(0)}`, color: totalPnl >= 0 ? 'text-emerald-400' : 'text-red-400' },
              { label: 'Exec Score', value: `${session.execution_score || 0}%`, color: (session.execution_score || 0) >= 70 ? 'text-teal-400' : 'text-amber-400' },
            ].map((stat, i) => (
              <div key={i} className="p-3 rounded-lg bg-zinc-800/50 border border-zinc-700/50 text-center">
                <p className="text-[10px] text-zinc-500 uppercase tracking-wider">{stat.label}</p>
                <p className={cn('text-lg font-mono font-bold tabular-nums mt-1', stat.color)}>{stat.value}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Trade Timeline */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Trade Timeline</CardTitle>
        </CardHeader>
        <CardContent>
          <TradeTimeline
            trades={trades}
            sessionStart={session.start_time}
            sessionEnd={session.end_time}
          />
        </CardContent>
      </Card>

      {/* Execution Review */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Execution Review</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {[
            { label: 'Rule Compliance', value: complianceRate },
            { label: 'A+ Trades', value: totalTrades > 0 ? Math.round((aPlusTrades / totalTrades) * 100) : 0 },
            { label: 'Emotional Awareness', value: topEmotions.length > 0 ? 80 : 30 },
            { label: 'Engagement', value: (session.conversation_log?.length || 0) > 5 ? 90 : (session.conversation_log?.length || 0) > 0 ? 50 : 10 },
          ].map((item, i) => (
            <div key={i} className="space-y-1">
              <div className="flex justify-between text-sm">
                <span className="text-zinc-400">{item.label}</span>
                <span className="text-zinc-200 font-mono tabular-nums">{item.value}%</span>
              </div>
              <Progress value={item.value} max={100} className="h-2" />
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Trade Journal */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Trade Journal</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {trades.length === 0 ? (
            <p className="text-sm text-zinc-500 italic">No trades this session.</p>
          ) : (
            trades.map((trade, idx) => (
              <div key={idx} className="p-3 rounded-lg bg-zinc-800/30 border border-zinc-700/50 space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-zinc-500">#{idx + 1}</span>
                    <Badge variant={trade.result === 'win' ? 'success' : trade.result === 'loss' ? 'destructive' : 'secondary'}>
                      {trade.result}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-3 text-xs font-mono tabular-nums">
                    <span className={trade.r_multiple >= 0 ? 'text-emerald-400' : 'text-red-400'}>
                      {trade.r_multiple >= 0 ? '+' : ''}{(trade.r_multiple || 0).toFixed(1)}R
                    </span>
                    <span className={trade.pnl >= 0 ? 'text-emerald-400' : 'text-red-400'}>
                      ${trade.pnl >= 0 ? '+' : ''}{(trade.pnl || 0).toFixed(0)}
                    </span>
                  </div>
                </div>
                {trade.emotion_before && (
                  <div className="text-xs text-zinc-500">
                    Emotion: {trade.emotion_before} → {trade.emotion_after || '?'}
                  </div>
                )}
                {trade.notes && (
                  <p className="text-xs text-zinc-400">{trade.notes}</p>
                )}
                {trade.rule_compliance && trade.rule_compliance.length > 0 && (
                  <div className="flex flex-wrap gap-1">
                    {trade.rule_compliance.map((rc, ri) => (
                      <span key={ri} className={cn(
                        'text-[10px] px-1.5 py-0.5 rounded',
                        rc.followed ? 'bg-emerald-500/10 text-emerald-400' : 'bg-red-500/10 text-red-400'
                      )}>
                        {rc.followed ? '✓' : '✗'} {rc.rule}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            ))
          )}
        </CardContent>
      </Card>

      {/* Emotional Analysis */}
      {topEmotions.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Emotional Analysis</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {topEmotions.map(([emotion, count], idx) => (
                <Badge key={idx} variant={idx === 0 ? 'warning' : 'secondary'}>
                  {emotion} ({count}x)
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Voice Journal & Coaching Recap */}
      {session.voice_journal && (
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Voice Journal</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-zinc-300 leading-relaxed whitespace-pre-line">{session.voice_journal}</p>
          </CardContent>
        </Card>
      )}

      {session.coaching_recap && (
        <Card>
          <CardHeader>
            <CardTitle className="text-base">AI Coaching Recap</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-zinc-300 leading-relaxed italic">{session.coaching_recap}</p>
          </CardContent>
        </Card>
      )}

      {/* Receipts */}
      {receipts.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Receipts</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {receipts.slice(0, 10).map((r, idx) => (
                <div key={idx} className="flex items-center justify-between p-2 rounded bg-zinc-800/30 border border-zinc-700/50">
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-zinc-300">"{r.phrase}"</span>
                    <Badge variant="warning" className="text-[10px]">{r.category}</Badge>
                  </div>
                  <span className="text-xs text-zinc-500 font-mono">{r.count}x</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Trading DNA */}
      {dna && dna.total_sessions > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Trading DNA</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-zinc-500">Total Sessions</span>
                <p className="text-zinc-200 font-mono">{dna.total_sessions}</p>
              </div>
              <div>
                <span className="text-zinc-500">Avg Execution</span>
                <p className="text-zinc-200 font-mono">{dna.avg_execution_score}%</p>
              </div>
            </div>
            {dna.common_mistakes?.length > 0 && (
              <div>
                <span className="text-xs text-zinc-500">Common Mistakes</span>
                <div className="flex flex-wrap gap-1 mt-1">
                  {dna.common_mistakes.map((m, i) => (
                    <Badge key={i} variant="destructive" className="text-[10px]">{m}</Badge>
                  ))}
                </div>
              </div>
            )}
            {dna.most_profitable_behaviors?.length > 0 && (
              <div>
                <span className="text-xs text-zinc-500">Most Profitable Behaviors</span>
                <div className="flex flex-wrap gap-1 mt-1">
                  {dna.most_profitable_behaviors.map((b, i) => (
                    <Badge key={i} variant="success" className="text-[10px]">{b}</Badge>
                  ))}
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* Lockout Footer */}
      {lockoutTimeLeft && lockoutTimeLeft !== 'Expired' && (
        <div className="text-center py-4 border-t border-zinc-800">
          <p className="text-xs text-zinc-500">
            Session locked for <span className="font-mono text-amber-400">{lockoutTimeLeft}</span>
          </p>
        </div>
      )}
    </div>
  );
}
