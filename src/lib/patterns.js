// Pattern Detection — auto-detect trading patterns from historical data

export function detectPatterns(sessions, allTrades) {
  const patterns = [];
  
  if (sessions.length < 5 || allTrades.length < 10) {
    return [{ type: 'info', text: 'Need at least 5 sessions and 10 trades for pattern detection.' }];
  }
  
  // 1. Third trade performance
  const thirdTrades = allTrades.filter(t => t.slot_index === 2);
  if (thirdTrades.length >= 5) {
    const thirdLosses = thirdTrades.filter(t => t.result === 'loss').length;
    const thirdLossRate = thirdLosses / thirdTrades.length;
    if (thirdLossRate > 0.6) {
      patterns.push({ type: 'warning', text: `Your 3rd trade of the day has a ${Math.round(thirdLossRate * 100)}% loss rate. Consider capping at 2 trades.` });
    }
  }
  
  // 2. Loss size vs win size
  const wins = allTrades.filter(t => t.result === 'win' && t.pnl > 0);
  const losses = allTrades.filter(t => t.result === 'loss' && t.pnl < 0);
  if (wins.length >= 3 && losses.length >= 3) {
    const avgWin = wins.reduce((s, t) => s + t.pnl, 0) / wins.length;
    const avgLoss = Math.abs(losses.reduce((s, t) => s + t.pnl, 0) / losses.length);
    if (avgLoss > avgWin * 2) {
      patterns.push({ type: 'danger', text: `Your average loss ($${avgLoss.toFixed(0)}) is ${(avgLoss / avgWin).toFixed(1)}x your average win ($${avgWin.toFixed(0)}). Tighten stops.` });
    }
    if (avgWin > avgLoss * 2) {
      patterns.push({ type: 'positive', text: `Your winners ($${avgWin.toFixed(0)} avg) are ${(avgWin / avgLoss).toFixed(1)}x your losers. Your exit game is strong.` });
    }
  }
  
  // 3. Time-of-day pattern
  const hourlyPnl = {};
  allTrades.forEach(t => {
    if (!t.entry_time) return;
    const h = new Date(t.entry_time).getHours();
    if (!hourlyPnl[h]) hourlyPnl[h] = { pnl: 0, count: 0 };
    hourlyPnl[h].pnl += t.pnl || 0;
    hourlyPnl[h].count++;
  });
  const worstHour = Object.entries(hourlyPnl).filter(([_, d]) => d.count >= 3).sort((a, b) => a[1].pnl - b[1].pnl)[0];
  const bestHour = Object.entries(hourlyPnl).filter(([_, d]) => d.count >= 3).sort((a, b) => b[1].pnl - a[1].pnl)[0];
  if (worstHour && worstHour[1].pnl < -50) {
    patterns.push({ type: 'warning', text: `Your worst hour is ${worstHour[0]}:00 (-$${Math.abs(worstHour[1].pnl).toFixed(0)} over ${worstHour[1].count} trades). Consider avoiding it.` });
  }
  if (bestHour && bestHour[1].pnl > 50) {
    patterns.push({ type: 'positive', text: `Your best hour is ${bestHour[0]}:00 (+$${bestHour[1].pnl.toFixed(0)} over ${bestHour[1].count} trades). Focus here.` });
  }
  
  // 4. Day-of-week pattern
  const dayPnl = {};
  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  sessions.forEach(s => {
    const day = new Date(s.created_date).getDay();
    if (!dayPnl[day]) dayPnl[day] = { pnl: 0, count: 0 };
    const sessTrades = allTrades.filter(t => t.session_id === s.id);
    dayPnl[day].pnl += sessTrades.reduce((sum, t) => sum + (t.pnl || 0), 0);
    dayPnl[day].count++;
  });
  const worstDay = Object.entries(dayPnl).filter(([_, d]) => d.count >= 2).sort((a, b) => a[1].pnl - b[1].pnl)[0];
  if (worstDay && worstDay[1].pnl < -100) {
    patterns.push({ type: 'warning', text: `You've lost $${Math.abs(worstDay[1].pnl).toFixed(0)} on ${dayNames[worstDay[0]]}s over ${worstDay[1].count} sessions. Consider skipping or going lighter.` });
  }
  
  // 5. Consecutive loss behavior
  let maxConsecLosses = 0, curConsec = 0;
  allTrades.forEach(t => {
    if (t.result === 'loss') { curConsec++; maxConsecLosses = Math.max(maxConsecLosses, curConsec); }
    else curConsec = 0;
  });
  if (maxConsecLosses >= 3) {
    patterns.push({ type: 'warning', text: `You've had ${maxConsecLosses} consecutive losses in a row at one point. The cooldown timer is your friend.` });
  }
  
  // 6. Conviction correlation
  const highConviction = allTrades.filter(t => t.conviction >= 4);
  const lowConviction = allTrades.filter(t => t.conviction > 0 && t.conviction <= 2);
  if (highConviction.length >= 5 && lowConviction.length >= 3) {
    const highWinRate = highConviction.filter(t => t.result === 'win').length / highConviction.length;
    const lowWinRate = lowConviction.filter(t => t.result === 'win').length / lowConviction.length;
    if (highWinRate > lowWinRate + 0.15) {
      patterns.push({ type: 'positive', text: `High conviction (4-5) trades win ${Math.round(highWinRate * 100)}% vs low conviction (1-2) at ${Math.round(lowWinRate * 100)}%. Trust your gut when it's strong.` });
    }
  }
  
  // 7. Overtrading signal
  const avgTradesPerSession = allTrades.length / sessions.length;
  const sessions3Plus = sessions.filter(s => allTrades.filter(t => t.session_id === s.id).length >= 3);
  if (sessions3Plus.length >= 3) {
    const pnl3Plus = sessions3Plus.reduce((sum, s) => sum + allTrades.filter(t => t.session_id === s.id).reduce((ss, t) => ss + (t.pnl || 0), 0), 0);
    const sessionsUnder3 = sessions.filter(s => allTrades.filter(t => t.session_id === s.id).length < 3);
    if (sessionsUnder3.length >= 3) {
      const pnlUnder3 = sessionsUnder3.reduce((sum, s) => sum + allTrades.filter(t => t.session_id === s.id).reduce((ss, t) => ss + (t.pnl || 0), 0), 0);
      const avgPer3Plus = pnl3Plus / sessions3Plus.length;
      const avgPerUnder3 = pnlUnder3 / sessionsUnder3.length;
      if (avgPerUnder3 > avgPer3Plus + 50) {
        patterns.push({ type: 'warning', text: `Sessions with <3 trades avg +$${avgPerUnder3.toFixed(0)} vs 3+ trades avg $${avgPer3Plus >= 0 ? '+' : ''}${avgPer3Plus.toFixed(0)}. Less might be more for you.` });
      }
    }
  }
  
  return patterns.length > 0 ? patterns : [{ type: 'info', text: 'No significant patterns detected yet. Keep logging trades consistently.' }];
}
