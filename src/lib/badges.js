const STORAGE_KEY = 'tcai_badges';

const BADGE_DEFINITIONS = [
  {
    id: 'first_aplus',
    title: 'First A+ Trade',
    description: 'Earned when any trade has rule_compliance where every rule was followed',
    icon: '⭐',
  },
  {
    id: 'five_disciplined',
    title: '5 Disciplined Sessions',
    description: '5 sessions where execution_score >= 80',
    icon: '🎯',
  },
  {
    id: 'survived_loss_limit',
    title: 'Survived a Loss Limit Day',
    description: 'Any session has daily_loss_limit > 0 and ended normally (didn\'t break)',
    icon: '🛡️',
  },
  {
    id: 'ten_streak',
    title: '10-Session Streak',
    description: '10 consecutive sessions with execution_score >= 80',
    icon: '🔥',
  },
  {
    id: 'thirty_days',
    title: '30 Days Active',
    description: 'Total sessions >= 30 in TradingDNA',
    icon: '📅',
  },
  {
    id: 'perfect_session',
    title: 'Perfect Session',
    description: 'Any session with execution_score === 100',
    icon: '💎',
  },
  {
    id: 'comeback_king',
    title: 'Comeback King',
    description: 'A session where first trade was a loss but session ended green (cumulative pnl > 0)',
    icon: '👑',
  },
  {
    id: 'patience_master',
    title: 'Patience Master',
    description: 'A session with max_trades >= 3 but only 1 trade taken (showing restraint)',
    icon: '🧘',
  },
];

function checkFirstAplus(sessions, trades) {
  for (const trade of trades) {
    if (trade.rule_compliance && Array.isArray(trade.rule_compliance) && trade.rule_compliance.length > 0) {
      if (trade.rule_compliance.every(r => r.followed === true)) {
        return { earned: true, earnedDate: trade.created_date || trade.entry_time || new Date().toISOString() };
      }
    }
  }
  return { earned: false, earnedDate: null };
}

function checkFiveDisciplined(sessions, trades) {
  const disciplined = sessions.filter((s) => s.execution_score >= 80);
  if (disciplined.length >= 5) {
    const sorted = [...disciplined].sort((a, b) => new Date(a.date || a.timestamp) - new Date(b.date || b.timestamp));
    return { earned: true, earnedDate: sorted[4].created_date || new Date().toISOString() };
  }
  return { earned: false, earnedDate: null };
}

function checkSurvivedLossLimit(sessions, trades) {
  for (const session of sessions) {
    if (session.daily_loss_limit > 0 && !session.loss_limit_broken) {
      return { earned: true, earnedDate: session.created_date || new Date().toISOString() };
    }
  }
  return { earned: false, earnedDate: null };
}

function checkTenStreak(sessions, trades) {
  const sorted = [...sessions].sort((a, b) => new Date(a.date || a.timestamp) - new Date(b.date || b.timestamp));
  let streak = 0;
  let streakEndDate = null;
  for (const session of sorted) {
    if (session.execution_score >= 80) {
      streak++;
      if (streak >= 10) {
        streakEndDate = session.created_date || new Date().toISOString();
        break;
      }
    } else {
      streak = 0;
    }
  }
  if (streak >= 10) {
    return { earned: true, earnedDate: streakEndDate };
  }
  return { earned: false, earnedDate: null };
}

function checkThirtyDays(sessions, trades) {
  if (sessions.length >= 30) {
    const sorted = [...sessions].sort((a, b) => new Date(a.date || a.timestamp) - new Date(b.date || b.timestamp));
    return { earned: true, earnedDate: sorted[29].created_date || new Date().toISOString() };
  }
  return { earned: false, earnedDate: null };
}

function checkPerfectSession(sessions, trades) {
  for (const session of sessions) {
    if (session.execution_score === 100) {
      return { earned: true, earnedDate: session.created_date || new Date().toISOString() };
    }
  }
  return { earned: false, earnedDate: null };
}

function checkComebackKing(sessions, trades) {
  for (const session of sessions) {
    const sessionTrades = trades.filter((t) => t.session_id === session.id);
    if (sessionTrades.length > 0) {
      const firstTrade = sessionTrades[0];
      if (firstTrade.pnl < 0) {
        const cumulativePnl = sessionTrades.reduce((sum, t) => sum + (t.pnl || 0), 0);
        if (cumulativePnl > 0) {
          return { earned: true, earnedDate: session.created_date || new Date().toISOString() };
        }
      }
    }
  }
  return { earned: false, earnedDate: null };
}

function checkPatienceMaster(sessions, trades) {
  for (const session of sessions) {
    if (session.max_trades >= 3) {
      const sessionTrades = trades.filter((t) => t.session_id === session.id);
      if (sessionTrades.length === 1) {
        return { earned: true, earnedDate: session.created_date || new Date().toISOString() };
      }
    }
  }
  return { earned: false, earnedDate: null };
}

const BADGE_CHECKERS = {
  first_aplus: checkFirstAplus,
  five_disciplined: checkFiveDisciplined,
  survived_loss_limit: checkSurvivedLossLimit,
  ten_streak: checkTenStreak,
  thirty_days: checkThirtyDays,
  perfect_session: checkPerfectSession,
  comeback_king: checkComebackKing,
  patience_master: checkPatienceMaster,
};

export function getBadges(sessions, trades) {
  const storedBadges = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
  const earnedBadges = [];

  for (const definition of BADGE_DEFINITIONS) {
    const checker = BADGE_CHECKERS[definition.id];
    const result = checker(sessions, trades);

    if (result.earned) {
      const existing = storedBadges.find((b) => b.id === definition.id);
      const earnedDate = existing ? existing.earnedDate : result.earnedDate;

      earnedBadges.push({
        id: definition.id,
        title: definition.title,
        description: definition.description,
        earnedDate,
        icon: definition.icon,
      });
    }
  }

  localStorage.setItem(STORAGE_KEY, JSON.stringify(earnedBadges));

  return earnedBadges;
}
