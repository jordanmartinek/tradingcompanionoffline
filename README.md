# Trading Companion AI

An AI-powered **trading psychology coach** that helps discretionary traders maintain discipline, manage emotions, and execute their trading plans with consistency.

## Quick Start

```bash
npm install
npm run dev
```

Open http://localhost:5173 in your browser.

## Features

- **Session State Machine** — Setup -> Trading -> 6hr Lockout cycle
- **Execution Score** — Only entry rules drive the score; trading locks below 70%
- **Discipline Wheel** — SVG donut showing trade slots colored by result
- **Per-Trade Rule Reset** — Rules uncheck after each trade, re-locking execution
- **Daily Loss Limit** — Hard-locks trading when cumulative PnL hits the limit
- **Weekly A+ Goal** — Tracks trades where every rule was followed
- **6 AI Coach Personalities** — Offline NLP-based keyword/emotion detection
- **Emergency Intervention** — 60-second breathing exercise circuit breaker
- **Reflection Page** — Trade timeline, summary, emotional analysis, receipts, DNA
- **Stats Page** — Expectancy, discipline streaks, per-session breakdown
- **Screen-Edge Glow** — Ambient color that shifts with execution score
- **Dark Trading Terminal Aesthetic** — Zinc-950 base, teal accents, monospace numbers

## Tech Stack

- React 18 + Vite
- Tailwind CSS with custom dark theme
- react-router-dom v6
- localStorage for all persistence (no external services)
- Zero external API calls — fully offline AI coach

## Architecture

```
src/
  App.jsx                    # Router + auth scaffold
  pages/
    Dashboard.jsx            # Main cockpit (state machine)
    Reflection.jsx           # Post-session review
    Stats.jsx                # Historical performance
  components/
    trading/                 # All trading-specific components
    ui/                      # shadcn/ui-style primitives
  hooks/
    useTradingRules.js       # Rule management hook
  api/
    db.js                    # localStorage-based entity CRUD
  shared/
    coachingEngine.js        # Offline AI NLP engine
    coachPersonalities.js    # 6 personality definitions
    tradingConcepts.js       # Keyword dictionaries + receipts
    weeklyGoal.js            # Week range + A+ trade logic
  lib/
    utils.js                 # cn() class name utility
```

## Business Rules

1. Cannot execute a trade until >= 70% of entry rules are checked
2. Rules reset after each saved trade, re-locking execution
3. Daily loss limit hard-locks trading when cumulative PnL hits the negative limit
4. Max trades caps the wheel; once full, no more trades
5. Ending a session triggers a 6-hour lockout
6. A+ trade = every logged rule was followed
7. Trading DNA accumulates across all sessions
8. AI coach is fully offline — personality-driven responses via keyword matching
