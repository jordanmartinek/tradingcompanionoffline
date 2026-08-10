// Browser notification system for trading discipline reminders
// Schedules notifications at configured times and sends rule-based reminders

const STORAGE_KEY = 'tcai_notification_settings';

const SESSION_START_PHRASES = [
  "Time to trade. Remember: process over profits.",
  "Market's opening. Clear mind, clear plan. Let's go.",
  "Your session starts now. Follow your rules — no exceptions.",
  "It's game time. You've prepared. Trust the process.",
  "8:30 AM. Time to execute with discipline.",
  "The market is open. Your job: follow the plan you wrote.",
  "New day, same rules. Consistency builds edge.",
  "Breathe. Focus. You know what to look for.",
  "Your edge is in your rules. Honor them today.",
  "Start calm, stay disciplined, end proud.",
];

const SESSION_END_PHRASES = [
  "Session over. Step away. You earned a break.",
  "Time's up. Close the charts. Reflect, don't revenge trade.",
  "Your session has ended. Whatever happened, it's data.",
  "Walk away. The market will be here tomorrow.",
  "Session complete. Rest your mind. Review later.",
  "Done for today. Protect what you earned (or learned).",
  "Close it down. The best traders know when to stop.",
  "That's a wrap. No more trades. Go live your life.",
  "Session ended. Remember: one good day at a time.",
  "Finished. Whether green or red, you showed up with a plan.",
];

const RULE_REMINDER_TEMPLATES = [
  "Reminder: {rule} — don't skip this one.",
  "Have you checked: {rule}? Wait for confirmation.",
  "Your rule says: {rule}. Trust it.",
  "{rule} — this is part of your edge. Don't ignore it.",
  "Before you trade: {rule}. Be patient.",
  "Quick check: Is {rule} confirmed on your chart?",
];

const GENERAL_STRATEGY_REMINDERS = [
  "Wait for your setup. The market rewards patience.",
  "No setup = no trade. Doing nothing IS a decision.",
  "Are all your required rules checked? If not, don't trade.",
  "Check the higher timeframe. Is the trend with you?",
  "Is this an A+ setup? If you hesitate, it's not.",
  "Risk management first. What's your stop before entry?",
  "One good trade > three mediocre ones.",
  "If you're forcing it, step away for 5 minutes.",
  "Is the R:R at least 1:2? If not, why are you trading?",
  "Trust your process. Your rules exist for a reason.",
];

function pickRandom(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

/**
 * Request notification permission
 */
export async function requestPermission() {
  if (!('Notification' in window)) return false;
  if (Notification.permission === 'granted') return true;
  if (Notification.permission === 'denied') return false;
  const result = await Notification.requestPermission();
  return result === 'granted';
}

/**
 * Send a browser notification (uses service worker if available for background support)
 */
export function sendNotification(title, body, tag = 'tcai') {
  if (!('Notification' in window) || Notification.permission !== 'granted') return;
  try {
    // Try service worker notification first (works in background)
    if ('serviceWorker' in navigator && navigator.serviceWorker.controller) {
      navigator.serviceWorker.ready.then(registration => {
        registration.showNotification(title, {
          body,
          icon: '/icon-192.svg',
          badge: '/icon-192.svg',
          tag: tag + '_' + Date.now(),
          vibrate: [200, 100, 200],
          requireInteraction: false,
        });
      });
    } else {
      // Fallback to regular notification
      new Notification(title, {
        body,
        icon: '/icon-192.svg',
        tag: tag + '_' + Date.now(),
        silent: false,
      });
    }
  } catch (e) {
    console.error('Notification error:', e);
  }
}

/**
 * Get notification settings from localStorage
 */
export function getNotificationSettings() {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (raw) {
    try { return JSON.parse(raw); } catch (e) {}
  }
  return {
    enabled: false,
    sessionStartTime: '08:30',
    sessionEndTime: '10:30',
    reminderIntervalMinutes: 15,
  };
}

/**
 * Save notification settings
 */
export function saveNotificationSettings(settings) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
}

/**
 * Generate a rule-based reminder using the trader's actual rules
 */
export function generateRuleReminder(rules) {
  const entryRules = rules.filter(r => r.category === 'entry');
  if (entryRules.length === 0) return pickRandom(GENERAL_STRATEGY_REMINDERS);

  // 50% chance to remind about a specific rule, 50% general
  if (Math.random() > 0.5 && entryRules.length > 0) {
    const rule = pickRandom(entryRules);
    const template = pickRandom(RULE_REMINDER_TEMPLATES);
    return template.replace('{rule}', rule.title);
  }
  return pickRandom(GENERAL_STRATEGY_REMINDERS);
}

/**
 * Get a session start phrase
 */
export function getSessionStartPhrase() {
  return pickRandom(SESSION_START_PHRASES);
}

/**
 * Get a session end phrase
 */
export function getSessionEndPhrase() {
  return pickRandom(SESSION_END_PHRASES);
}

/**
 * Start the notification scheduler
 * Returns a cleanup function to stop all timers
 */
export function startNotificationScheduler(rules = []) {
  const settings = getNotificationSettings();
  if (!settings.enabled) return () => {};

  const timers = [];

  // Parse times
  const [startH, startM] = settings.sessionStartTime.split(':').map(Number);
  const [endH, endM] = settings.sessionEndTime.split(':').map(Number);

  // Check every minute for scheduled notifications
  const checkInterval = setInterval(() => {
    const now = new Date();
    const h = now.getHours();
    const m = now.getMinutes();

    // Session start notification (exact minute match)
    if (h === startH && m === startM) {
      sendNotification('Trading Session Starting', getSessionStartPhrase(), 'session_start');
    }

    // Session end notification
    if (h === endH && m === endM) {
      sendNotification('Session Ending', getSessionEndPhrase(), 'session_end');
    }

    // Rule reminders during trading hours (every N minutes)
    const intervalMin = settings.reminderIntervalMinutes || 15;
    const startTotal = startH * 60 + startM;
    const endTotal = endH * 60 + endM;
    const nowTotal = h * 60 + m;

    if (nowTotal > startTotal && nowTotal < endTotal && m % intervalMin === 0) {
      const reminder = generateRuleReminder(rules);
      sendNotification('Rule Reminder', reminder, 'rule_reminder');
    }
  }, 60000); // Check every minute

  timers.push(checkInterval);

  // Cleanup
  return () => {
    timers.forEach(t => clearInterval(t));
  };
}
