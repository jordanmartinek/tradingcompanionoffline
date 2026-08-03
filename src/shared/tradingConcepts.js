// Trading concept keyword dictionaries for NLP analysis

export const tradingConcepts = {
  trend: [
    'trend', 'uptrend', 'downtrend', 'bullish', 'bearish', 'higher high', 'higher low',
    'lower high', 'lower low', 'momentum', 'impulse', 'correction', 'pullback', 'retracement'
  ],
  priceAction: [
    'price action', 'candle', 'candlestick', 'doji', 'engulfing', 'hammer', 'shooting star',
    'pin bar', 'inside bar', 'outside bar', 'marubozu', 'rejection', 'wick', 'shadow'
  ],
  ict: [
    'ict', 'smart money', 'order block', 'breaker block', 'mitigation block', 'fair value gap',
    'fvg', 'imbalance', 'displacement', 'inducement', 'bos', 'choch', 'market structure shift',
    'mss', 'optimal trade entry', 'ote', 'killzone', 'judas swing', 'turtle soup'
  ],
  liquidity: [
    'liquidity', 'sweep', 'grab', 'raid', 'stop hunt', 'equal highs', 'equal lows',
    'buy side', 'sell side', 'pool', 'bsl', 'ssl', 'draw on liquidity'
  ],
  volume: [
    'volume', 'high volume', 'low volume', 'volume profile', 'poc', 'value area',
    'vwap', 'vpoc', 'hvn', 'lvn', 'delta', 'cumulative delta'
  ],
  orderFlow: [
    'order flow', 'footprint', 'tape', 'bid', 'ask', 'absorption', 'iceberg',
    'market order', 'limit order', 'stop order', 'dom', 'depth of market'
  ],
  indicators: [
    'ema', 'sma', 'macd', 'rsi', 'stochastic', 'bollinger', 'atr', 'adx',
    'moving average', 'fibonacci', 'fib', 'ichimoku', 'supertrend', 'vwap'
  ],
  sessions: [
    'london', 'new york', 'asian', 'tokyo', 'sydney', 'london open', 'ny open',
    'london close', 'pre-market', 'killzone', 'overlap', 'session'
  ],
  chartPatterns: [
    'head and shoulders', 'double top', 'double bottom', 'triple top', 'triple bottom',
    'wedge', 'flag', 'pennant', 'channel', 'triangle', 'cup and handle', 'range'
  ],
  psychology: [
    'discipline', 'patience', 'revenge', 'fomo', 'greed', 'fear', 'confidence',
    'overtrading', 'tilt', 'emotion', 'mindset', 'process', 'plan'
  ],
  risk: [
    'risk', 'reward', 'r:r', 'risk reward', 'stop loss', 'take profit', 'position size',
    'lot size', 'risk management', 'drawdown', 'max loss', 'risk per trade'
  ],
  tradeManagement: [
    'trail', 'trailing stop', 'break even', 'partial', 'scale in', 'scale out',
    'move stop', 'let it run', 'cut loss', 'hold', 'exit'
  ],
  news: [
    'news', 'nfp', 'cpi', 'fomc', 'fed', 'ecb', 'boj', 'interest rate',
    'earnings', 'gdp', 'pmi', 'unemployment', 'inflation', 'economic calendar'
  ],
  marketContext: [
    'market', 'sp500', 'nasdaq', 'dow', 'vix', 'dxy', 'dollar', 'bonds',
    'yields', 'correlation', 'sector', 'breadth', 'internals'
  ],
  emotions: [
    'anxious', 'nervous', 'excited', 'calm', 'frustrated', 'angry', 'scared',
    'confident', 'uncertain', 'bored', 'impatient', 'stressed', 'focused'
  ],
  conversation: [
    'think', 'feel', 'believe', 'want', 'need', 'should', 'might',
    'maybe', 'probably', 'definitely', 'absolutely', 'honestly'
  ]
};

export const receiptPhrases = [
  { phrase: "make it back", category: "revenge", weight: 3 },
  { phrase: "one more trade", category: "revenge", weight: 2 },
  { phrase: "easy money", category: "overconfidence", weight: 3 },
  { phrase: "can't lose", category: "overconfidence", weight: 3 },
  { phrase: "sure thing", category: "overconfidence", weight: 2 },
  { phrase: "guaranteed", category: "overconfidence", weight: 3 },
  { phrase: "free money", category: "overconfidence", weight: 3 },
  { phrase: "everyone is buying", category: "fomo", weight: 2 },
  { phrase: "missing out", category: "fomo", weight: 3 },
  { phrase: "it's going without me", category: "fomo", weight: 3 },
  { phrase: "just this once", category: "justification", weight: 2 },
  { phrase: "this time is different", category: "justification", weight: 3 },
  { phrase: "i deserve", category: "justification", weight: 2 },
  { phrase: "yolo", category: "overconfidence", weight: 3 },
  { phrase: "double down", category: "revenge", weight: 3 },
  { phrase: "average down", category: "justification", weight: 2 },
  { phrase: "it has to bounce", category: "justification", weight: 3 },
  { phrase: "i'll just hold", category: "fear", weight: 2 },
  { phrase: "it'll come back", category: "fear", weight: 3 },
  { phrase: "scared to enter", category: "fear", weight: 2 },
  { phrase: "too late", category: "fear", weight: 1 },
  { phrase: "should have", category: "general", weight: 1 },
  { phrase: "would have", category: "general", weight: 1 },
  { phrase: "could have", category: "general", weight: 1 },
  { phrase: "need to recover", category: "revenge", weight: 3 },
  { phrase: "revenge trade", category: "revenge", weight: 3 },
  { phrase: "get it back", category: "revenge", weight: 3 },
  { phrase: "bigger size", category: "revenge", weight: 2 },
  { phrase: "all in", category: "overconfidence", weight: 3 },
  { phrase: "no stop", category: "overconfidence", weight: 3 },
];

export const emotionPatterns = {
  calm: {
    keywords: ['calm', 'focused', 'clear', 'patient', 'disciplined', 'steady', 'relaxed', 'present', 'zen'],
    intensity: 'low',
    signals: ['good mindset', 'ready to trade'],
  },
  fomo: {
    keywords: ['missing', 'without me', 'left behind', 'everyone', 'hurry', 'quick', 'now', 'rush', 'fomo'],
    intensity: 'high',
    signals: ['wants to chase', 'impatient entry'],
  },
  fear: {
    keywords: ['scared', 'afraid', 'worried', 'nervous', 'anxious', 'uncertain', 'hesitant', 'doubt', 'fear'],
    intensity: 'medium',
    signals: ['may freeze', 'may exit early'],
  },
  overconfidence: {
    keywords: ['easy', 'guaranteed', 'sure', 'obvious', 'can\'t lose', 'perfect', 'best trade', 'killing it'],
    intensity: 'high',
    signals: ['may over-size', 'may skip rules'],
  },
  hesitation: {
    keywords: ['maybe', 'not sure', 'might', 'possibly', 'thinking', 'considering', 'idk', 'unsure'],
    intensity: 'low',
    signals: ['needs conviction', 'unclear setup'],
  },
  revenge: {
    keywords: ['back', 'recover', 'make up', 'revenge', 'anger', 'frustrated', 'pissed', 'stupid', 'hate'],
    intensity: 'critical',
    signals: ['emotional trading', 'break rules'],
  },
  frustration: {
    keywords: ['frustrated', 'annoyed', 'angry', 'wtf', 'why', 'unfair', 'rigged', 'broken', 'trash'],
    intensity: 'high',
    signals: ['tilt risk', 'may force trades'],
  },
  boredom: {
    keywords: ['bored', 'nothing', 'slow', 'quiet', 'dead', 'flat', 'waiting', 'when', 'tired'],
    intensity: 'medium',
    signals: ['may force setups', 'overtrading risk'],
  },
};

export const emotionsList = [
  'Calm', 'Focused', 'Confident', 'Excited', 'Anxious', 'Nervous',
  'Frustrated', 'Angry', 'Scared', 'Impatient', 'Bored', 'Euphoric',
  'Hesitant', 'Revenge-minded', 'FOMO', 'Overconfident'
];

export const affirmations = [
  "I trade my plan, not my emotions.",
  "One good trade is enough.",
  "I am patient. The market will provide.",
  "Process over profits.",
  "I respect my risk limits always.",
  "I don't need to trade every day.",
  "My edge plays out over many trades.",
  "I am disciplined and consistent.",
  "I wait for A+ setups only.",
  "I protect my capital first.",
  "I accept losses as part of the game.",
  "I follow my rules without exception.",
];
