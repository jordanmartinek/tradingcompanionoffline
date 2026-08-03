// Weekly goal utilities

/**
 * Get the Monday-Sunday range for a given date
 * @param {Date} date - any date within the week
 * @returns {{ weekStart: Date, weekEnd: Date }}
 */
export function getWeekRange(date = new Date()) {
  const d = new Date(date);
  const day = d.getDay();
  // Monday = 1, so offset: if Sunday (0), go back 6 days; otherwise go back (day - 1)
  const mondayOffset = day === 0 ? -6 : 1 - day;
  
  const weekStart = new Date(d);
  weekStart.setDate(d.getDate() + mondayOffset);
  weekStart.setHours(0, 0, 0, 0);
  
  const weekEnd = new Date(weekStart);
  weekEnd.setDate(weekStart.getDate() + 6);
  weekEnd.setHours(23, 59, 59, 999);
  
  return { weekStart, weekEnd };
}

/**
 * Determine if a trade is an A+ trade (all logged rules were followed)
 * @param {Object} trade - trade object with rule_compliance array
 * @returns {boolean}
 */
export function isAPlusTrade(trade) {
  if (!trade.rule_compliance || trade.rule_compliance.length === 0) {
    return false;
  }
  return trade.rule_compliance.every(r => r.followed === true);
}

/**
 * Get ISO week number for a date
 */
export function getISOWeekNumber(date) {
  const d = new Date(date);
  d.setHours(0, 0, 0, 0);
  d.setDate(d.getDate() + 3 - (d.getDay() + 6) % 7);
  const week1 = new Date(d.getFullYear(), 0, 4);
  return 1 + Math.round(((d - week1) / 86400000 - 3 + (week1.getDay() + 6) % 7) / 7);
}
