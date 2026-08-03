// Offline AI coaching engine — keyword/regex NLP, no external API calls
import { tradingConcepts, receiptPhrases, emotionPatterns } from './tradingConcepts';
import { coachPersonalities } from './coachPersonalities';

const recentResponses = new Set();
const MAX_RECENT = 10;

function trackResponse(response) {
  recentResponses.add(response);
  if (recentResponses.size > MAX_RECENT) {
    const first = recentResponses.values().next().value;
    recentResponses.delete(first);
  }
}

function pickUnique(arr) {
  const available = arr.filter(r => !recentResponses.has(r));
  const pool = available.length > 0 ? available : arr;
  const picked = pool[Math.floor(Math.random() * pool.length)];
  trackResponse(picked);
  return picked;
}

/**
 * Analyze user text for trading concepts, emotions, receipts, etc.
 */
export function analyzeInput(text) {
  if (!text || typeof text !== 'string') {
    return { concepts: [], emotions: [], receipts: [], prices: [], timeframes: [], assets: [] };
  }
  const lower = text.toLowerCase();

  // Detect trading concepts
  const concepts = [];
  for (const [category, keywords] of Object.entries(tradingConcepts)) {
    for (const kw of keywords) {
      if (lower.includes(kw)) {
        concepts.push({ category, keyword: kw });
        break;
      }
    }
  }

  // Detect emotions
  const emotions = [];
  for (const [emotion, data] of Object.entries(emotionPatterns)) {
    for (const kw of data.keywords) {
      if (lower.includes(kw)) {
        emotions.push({ emotion, intensity: data.intensity, signals: data.signals });
        break;
      }
    }
  }

  // Detect receipt phrases
  const receipts = [];
  for (const rp of receiptPhrases) {
    if (lower.includes(rp.phrase)) {
      receipts.push(rp);
    }
  }

  // Detect price levels (numbers with $ or decimal points in context)
  const prices = [];
  const priceRegex = /\$?\d+\.?\d*\s*(k|K)?/g;
  let match;
  while ((match = priceRegex.exec(text)) !== null) {
    const val = parseFloat(match[0].replace(/[$kK]/g, ''));
    if (val > 0 && val < 1000000) {
      prices.push(match[0].trim());
    }
  }

  // Detect timeframes
  const timeframes = [];
  const tfRegex = /\b(\d+[mhHMdDwW]|1\s*min|5\s*min|15\s*min|1\s*hour|4\s*hour|daily|weekly|monthly|M1|M5|M15|H1|H4|D1)\b/gi;
  while ((match = tfRegex.exec(text)) !== null) {
    timeframes.push(match[0]);
  }

  // Detect assets
  const assets = [];
  const assetRegex = /\b(ES|NQ|YM|RTY|SPY|QQQ|AAPL|TSLA|MSFT|AMZN|NVDA|EUR\/USD|GBP\/USD|USD\/JPY|XAU\/USD|BTC|ETH|EURUSD|GBPUSD|USDJPY|gold|crude|oil)\b/gi;
  while ((match = assetRegex.exec(text)) !== null) {
    assets.push(match[0].toUpperCase());
  }

  return { concepts, emotions, receipts, prices, timeframes, assets };
}

/**
 * Determine the dominant emotion from analysis
 */
function getDominantEmotion(emotions) {
  if (emotions.length === 0) return 'general';
  
  const intensityOrder = { critical: 4, high: 3, medium: 2, low: 1 };
  emotions.sort((a, b) => (intensityOrder[b.intensity] || 0) - (intensityOrder[a.intensity] || 0));
  return emotions[0].emotion;
}

/**
 * Generate a response from the AI coach
 */
export function generateResponse(userText, personalityKey, context = {}) {
  const personality = coachPersonalities[personalityKey] || coachPersonalities.stoic_mentor;
  const analysis = analyzeInput(userText);
  const emotion = getDominantEmotion(analysis.emotions);
  
  // Get base response for this emotion
  const emotionResponses = personality.style[emotion] || personality.style.general;
  let response = pickUnique(emotionResponses);

  // Add prefix sometimes
  if (Math.random() > 0.5) {
    const prefix = personality.prefixes[Math.floor(Math.random() * personality.prefixes.length)];
    response = `${prefix} ${response}`;
  }

  // Add context notes
  const notes = [];
  
  if (analysis.assets.length > 0) {
    notes.push(`I see you're looking at ${analysis.assets.join(', ')}.`);
  }
  if (analysis.timeframes.length > 0) {
    notes.push(`Timeframe: ${analysis.timeframes.join(', ')}.`);
  }
  if (analysis.concepts.length > 0 && Math.random() > 0.6) {
    const concept = analysis.concepts[0];
    notes.push(`Good — you're thinking about ${concept.category}.`);
  }

  // Receipt callouts
  if (analysis.receipts.length > 0) {
    const receipt = analysis.receipts[0];
    notes.push(`Receipt logged: "${receipt.phrase}" (${receipt.category}). I'm watching.`);
  }

  if (notes.length > 0) {
    response += ' ' + notes.join(' ');
  }

  return {
    text: response,
    analysis,
    emotion,
    receipts: analysis.receipts,
  };
}

/**
 * Generate a greeting when the session starts
 */
export function generateGreeting(personalityKey, dailyObjective = '') {
  const personality = coachPersonalities[personalityKey] || coachPersonalities.stoic_mentor;
  
  const greetings = {
    stoic_mentor: "The session begins. Clear your mind, center yourself, and remember: you trade your plan today.",
    drill_sergeant: "Alright, we're LIVE. Rules checked, plan ready, emotions in check. Let's execute with precision!",
    sarcastic_friend: "Oh look who showed up ready to trade! Let's not do anything dumb today, yeah?",
    wise_teacher: "Welcome to today's session. Every moment is an opportunity to practice our craft with intention.",
    meme_goblin: "gm anon. time to either make money or protect money. no in-between. let's go.",
    calm_psychologist: "Welcome. Take a breath. How are you feeling as we begin today's session?",
  };

  let greeting = greetings[personalityKey] || greetings.stoic_mentor;
  
  if (dailyObjective) {
    greeting += ` Your focus today: "${dailyObjective}". Let's hold that intention.`;
  }

  return greeting;
}

/**
 * Generate a reflection prompt at session end
 */
export function generateReflectionPrompt(personalityKey) {
  const prompts = {
    stoic_mentor: "Reflect: Did you honor your process today? What would the disciplined version of you change?",
    drill_sergeant: "Debrief time. What went right? What went wrong? No excuses, just facts.",
    sarcastic_friend: "Okay so... how'd we do? And be honest, I was watching the whole time.",
    wise_teacher: "Every session teaches us something. What did today's market teach you about yourself?",
    meme_goblin: "session review time. were we based or were we cringe? be real.",
    calm_psychologist: "Let's process today together. What emotions came up, and how did you respond to them?",
  };
  return prompts[personalityKey] || prompts.stoic_mentor;
}

/**
 * Generate a voice journal summary from conversation log
 */
export function generateVoiceJournal(conversationLog = [], personalityKey) {
  if (conversationLog.length === 0) {
    return "No conversation recorded this session.";
  }

  const userMessages = conversationLog.filter(m => m.role === 'user');
  const totalMessages = conversationLog.length;
  
  // Analyze all user messages
  const allEmotions = [];
  const allConcepts = [];
  const allReceipts = [];
  
  for (const msg of userMessages) {
    const analysis = analyzeInput(msg.text);
    allEmotions.push(...analysis.emotions);
    allConcepts.push(...analysis.concepts);
    allReceipts.push(...analysis.receipts);
  }

  const emotionCounts = {};
  allEmotions.forEach(e => { emotionCounts[e.emotion] = (emotionCounts[e.emotion] || 0) + 1; });
  const topEmotions = Object.entries(emotionCounts).sort((a, b) => b[1] - a[1]).slice(0, 3);

  const conceptCounts = {};
  allConcepts.forEach(c => { conceptCounts[c.category] = (conceptCounts[c.category] || 0) + 1; });
  const topConcepts = Object.entries(conceptCounts).sort((a, b) => b[1] - a[1]).slice(0, 3);

  let summary = `Session conversation summary (${totalMessages} messages, ${userMessages.length} from trader):\n\n`;
  
  if (topEmotions.length > 0) {
    summary += `Dominant emotions: ${topEmotions.map(([e, c]) => `${e} (${c}x)`).join(', ')}.\n`;
  }
  if (topConcepts.length > 0) {
    summary += `Topics discussed: ${topConcepts.map(([c]) => c).join(', ')}.\n`;
  }
  if (allReceipts.length > 0) {
    summary += `Receipts caught: ${allReceipts.map(r => `"${r.phrase}"`).join(', ')}.\n`;
  }
  
  summary += `\nEngagement level: ${userMessages.length > 10 ? 'High' : userMessages.length > 5 ? 'Moderate' : 'Low'}.`;

  return summary;
}

/**
 * Generate a coaching recap at session end
 */
export function generateCoachingRecap(personalityKey, sessionData = {}) {
  const { trades = [], executionScore = 0, cumulativePnl = 0 } = sessionData;
  const personality = coachPersonalities[personalityKey] || coachPersonalities.stoic_mentor;
  
  const winCount = trades.filter(t => t.result === 'win').length;
  const lossCount = trades.filter(t => t.result === 'loss').length;
  const totalTrades = trades.length;

  let recap = '';

  if (totalTrades === 0) {
    recap = "No trades taken today. Sometimes the best trade is no trade — if you were patient and disciplined, that's a win.";
  } else if (executionScore >= 80) {
    recap = `Strong execution today (${executionScore}%). ${winCount}W/${lossCount}L across ${totalTrades} trades. Your discipline is your edge — keep stacking these sessions.`;
  } else if (executionScore >= 50) {
    recap = `Mixed execution (${executionScore}%). ${totalTrades} trades taken. Review which rules you broke and ask: was it worth it? Usually, it's not.`;
  } else {
    recap = `Rough session (${executionScore}% execution). ${totalTrades} trades, $${cumulativePnl.toFixed(0)} net. The rules exist for a reason. Tomorrow is a fresh start.`;
  }

  if (cumulativePnl > 0) {
    recap += ` Profitable day (+$${cumulativePnl.toFixed(0)}) — but remember, process matters more than PnL.`;
  } else if (cumulativePnl < 0) {
    recap += ` Down day (-$${Math.abs(cumulativePnl).toFixed(0)}). It's tuition if you learn from it.`;
  }

  return recap;
}

/**
 * Generate session summary
 */
export function generateSessionSummary(sessionData = {}) {
  const { trades = [], executionScore = 0, startTime, endTime, dailyObjective } = sessionData;
  
  const totalTrades = trades.length;
  const wins = trades.filter(t => t.result === 'win').length;
  const losses = trades.filter(t => t.result === 'loss').length;
  const totalPnl = trades.reduce((sum, t) => sum + (t.pnl || 0), 0);
  const totalR = trades.reduce((sum, t) => sum + (t.r_multiple || 0), 0);
  
  const duration = startTime && endTime 
    ? Math.round((new Date(endTime) - new Date(startTime)) / 60000) 
    : 0;

  let summary = `Session completed in ${duration} minutes. `;
  summary += `${totalTrades} trade${totalTrades !== 1 ? 's' : ''} taken: ${wins}W/${losses}L. `;
  summary += `Net PnL: $${totalPnl >= 0 ? '+' : ''}${totalPnl.toFixed(0)}. Total R: ${totalR >= 0 ? '+' : ''}${totalR.toFixed(1)}R. `;
  summary += `Execution score: ${executionScore}%.`;
  
  if (dailyObjective) {
    summary += ` Daily objective was: "${dailyObjective}".`;
  }

  return summary;
}
