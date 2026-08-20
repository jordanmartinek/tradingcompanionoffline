# Trading Companion — Full App Blueprint

## File Structure
```
./APP-BLUEPRINT.md
./index.html
./package.json
./postcss.config.js
./public/icon-192.svg
./public/icon-512.svg
./public/manifest.json
./public/sw.js
./public/vite.svg
./README.md
./src/api/db.js
./src/App.jsx
./src/components/cockpit/AuthorizationGate.jsx
./src/components/cockpit/ConfirmationPanel.jsx
./src/components/cockpit/DisciplinePanel.jsx
./src/components/cockpit/EnvironmentPanel.jsx
./src/components/cockpit/FibCalculator.jsx
./src/components/cockpit/LevelsPanel.jsx
./src/components/cockpit/LiquidityPanel.jsx
./src/components/cockpit/LocationPanel.jsx
./src/components/trading/BadgesDisplay.jsx
./src/components/trading/CoachSelector.jsx
./src/components/trading/CompactModeToggle.jsx
./src/components/trading/Confetti.jsx
./src/components/trading/ConfluenceCounter.jsx
./src/components/trading/ConvictionRating.jsx
./src/components/trading/DisciplineWheel.jsx
./src/components/trading/DisplacementTracker.jsx
./src/components/trading/EmaStatusToggle.jsx
./src/components/trading/EmergencyIntervention.jsx
./src/components/trading/EndSessionDialog.jsx
./src/components/trading/EntryRuleButtons.jsx
./src/components/trading/EquityCurve.jsx
./src/components/trading/ExecuteConfirmDialog.jsx
./src/components/trading/KillZoneBadge.jsx
./src/components/trading/LevelPanel.jsx
./src/components/trading/LevelQueue.jsx
./src/components/trading/LiquidityTargetToggle.jsx
./src/components/trading/LockedScreen.jsx
./src/components/trading/MotivationalPhrase.jsx
./src/components/trading/NotificationSettings.jsx
./src/components/trading/OtherRulesDropdown.jsx
./src/components/trading/PatternInsights.jsx
./src/components/trading/PipelineBar.jsx
./src/components/trading/PositionTimer.jsx
./src/components/trading/RiskBudget.jsx
./src/components/trading/RitualTimer.jsx
./src/components/trading/SessionSetup.jsx
./src/components/trading/SessionSummaryCard.jsx
./src/components/trading/SessionTimer.jsx
./src/components/trading/TimeHeatmap.jsx
./src/components/trading/TradeDetail.jsx
./src/components/trading/TradeTimeline.jsx
./src/components/trading/TradingViewChart.jsx
./src/components/trading/VoiceJournal.jsx
./src/components/trading/WeeklyGoalBar.jsx
./src/components/ui/badge.jsx
./src/components/ui/button.jsx
./src/components/ui/card.jsx
./src/components/ui/dialog.jsx
./src/components/ui/input.jsx
./src/components/ui/label.jsx
./src/components/ui/popover.jsx
./src/components/ui/progress.jsx
./src/components/ui/select.jsx
./src/components/ui/slider.jsx
./src/components/ui/switch.jsx
./src/components/ui/textarea.jsx
./src/components/ui/tooltip.jsx
./src/hooks/useTradingRules.js
./src/index.css
./src/lib/badges.js
./src/lib/cockpitConstants.js
./src/lib/cockpitDb.js
./src/lib/cockpitStore.jsx
./src/lib/integrity.js
./src/lib/levelCarryOver.js
./src/lib/notifications.js
./src/lib/patterns.js
./src/lib/shortcuts.js
./src/lib/sweepSound.js
./src/lib/sync.js
./src/lib/templates.js
./src/lib/tradingScore.js
./src/lib/utils.js
./src/main.jsx
./src/pages/Cockpit.jsx
./src/pages/Dashboard.jsx
./src/pages/Reflection.jsx
./src/pages/Stats.jsx
./src/pages/Widget.jsx
./src/shared/coachingEngine.js
./src/shared/coachPersonalities.js
./src/shared/tradingConcepts.js
./src/shared/weeklyGoal.js
./tailwind.config.js
./tsconfig.json
./vite.config.js
```

## Complete Source Code


### ./APP-BLUEPRINT.md
```

```

### ./index.html
```
<!DOCTYPE html>
<html lang="en" class="dark">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/vite.svg" />
    <link rel="manifest" href="/manifest.json" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="theme-color" content="#09090b" />
    <meta name="apple-mobile-web-app-capable" content="yes" />
    <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
    <title>Trading Companion</title>
  </head>
  <body class="bg-zinc-950 text-zinc-100 antialiased">
    <div id="root"></div>
    <script type="module" src="/src/main.jsx"></script>
    <script>
      // Register service worker for PWA + background notifications
      if ('serviceWorker' in navigator) {
        window.addEventListener('load', () => {
          navigator.serviceWorker.register('/sw.js').catch(() => {});
        });
      }
    </script>
  </body>
</html>

```

### ./package.json
```
{
  "name": "trading-companion-ai",
  "private": true,
  "version": "1.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  },
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-router-dom": "^6.20.0",
    "lucide-react": "^0.294.0",
    "clsx": "^2.0.0",
    "tailwind-merge": "^2.1.0"
  },
  "devDependencies": {
    "@vitejs/plugin-react": "^4.2.0",
    "vite": "^5.0.0",
    "tailwindcss": "^3.3.6",
    "postcss": "^8.4.32",
    "autoprefixer": "^10.4.16"
  }
}

```

### ./postcss.config.js
```
export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
};

```

### ./public/manifest.json
```
{
  "name": "Trading Companion",
  "short_name": "TradingComp",
  "description": "AI-powered trading discipline coach — rule enforcement, execution scoring, and session management.",
  "start_url": "/",
  "display": "standalone",
  "background_color": "#09090b",
  "theme_color": "#2dd4bf",
  "orientation": "any",
  "icons": [
    {
      "src": "/icon-192.svg",
      "sizes": "192x192",
      "type": "image/svg+xml"
    },
    {
      "src": "/icon-512.svg",
      "sizes": "512x512",
      "type": "image/svg+xml"
    }
  ]
}

```

### ./public/sw.js
```
// Service Worker for Trading Companion PWA
// Enables: installability, offline caching, background notifications

const CACHE_NAME = 'tcai-v1';

// Install — cache the app shell
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll([
        '/',
        '/index.html',
        '/vite.svg',
      ]);
    })
  );
  self.skipWaiting();
});

// Activate — clean old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k))
      );
    })
  );
  self.clients.claim();
});

// Fetch — network first, fall back to cache
self.addEventListener('fetch', (event) => {
  event.respondWith(
    fetch(event.request).catch(() => {
      return caches.match(event.request);
    })
  );
});

// Handle notification clicks
self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  event.waitUntil(
    clients.matchAll({ type: 'window' }).then((clientList) => {
      // Focus existing window if open
      for (const client of clientList) {
        if (client.url.includes(self.location.origin) && 'focus' in client) {
          return client.focus();
        }
      }
      // Otherwise open a new window
      return clients.openWindow('/');
    })
  );
});

```

### ./README.md
```
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

```

### ./src/api/db.js
```
// Local database — localStorage-based entity management
// Provides async CRUD operations for all entities with no external dependencies

const DB_PREFIX = 'tcai_db_';

function getCollection(entityName) {
  const raw = localStorage.getItem(`${DB_PREFIX}${entityName}`);
  return raw ? JSON.parse(raw) : [];
}

function saveCollection(entityName, data) {
  localStorage.setItem(`${DB_PREFIX}${entityName}`, JSON.stringify(data));
}

function generateId() {
  return `${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}

class Entity {
  constructor(name) {
    this.name = name;
  }

  async list(filters = {}) {
    let records = getCollection(this.name);
    
    // Apply basic filters
    for (const [key, value] of Object.entries(filters)) {
      if (key === 'sort_by') continue;
      if (key === 'limit') continue;
      records = records.filter(r => r[key] === value);
    }

    // Sort by created_date descending by default
    if (filters.sort_by) {
      const [field, dir] = filters.sort_by.split(':');
      records.sort((a, b) => {
        if (dir === 'asc') return a[field] > b[field] ? 1 : -1;
        return a[field] < b[field] ? 1 : -1;
      });
    } else {
      records.sort((a, b) => new Date(b.created_date) - new Date(a.created_date));
    }

    if (filters.limit) {
      records = records.slice(0, filters.limit);
    }

    return records;
  }

  async get(id) {
    const records = getCollection(this.name);
    return records.find(r => r.id === id) || null;
  }

  async create(data) {
    const records = getCollection(this.name);
    const now = new Date().toISOString();
    const record = {
      id: generateId(),
      created_date: now,
      updated_date: now,
      created_by_id: 'user_1',
      ...data,
    };
    records.push(record);
    saveCollection(this.name, records);
    return record;
  }

  async update(id, data) {
    const records = getCollection(this.name);
    const idx = records.findIndex(r => r.id === id);
    if (idx === -1) throw new Error(`${this.name} with id ${id} not found`);
    
    records[idx] = {
      ...records[idx],
      ...data,
      updated_date: new Date().toISOString(),
    };
    saveCollection(this.name, records);
    return records[idx];
  }

  async delete(id) {
    const records = getCollection(this.name);
    const filtered = records.filter(r => r.id !== id);
    saveCollection(this.name, filtered);
    return { success: true };
  }

  async filter(filterFn) {
    const records = getCollection(this.name);
    return records.filter(filterFn);
  }
}

// Entity instances
export const TradingSession = new Entity('trading_sessions');
export const Trade = new Entity('trades');
export const TradingRule = new Entity('trading_rules');
export const WeeklyGoal = new Entity('weekly_goals');
export const Receipt = new Entity('receipts');
export const TradingDNA = new Entity('trading_dna');

// Helper to get or create the singleton TradingDNA record
export async function getOrCreateDNA() {
  const records = await TradingDNA.list();
  if (records.length > 0) return records[0];
  return await TradingDNA.create({
    total_sessions: 0,
    best_hours: [],
    worst_hours: [],
    common_mistakes: [],
    strongest_habits: [],
    emotional_triggers: [],
    most_profitable_behaviors: [],
    recurring_patterns: [],
    avg_execution_score: 0,
  });
}

// Helper to bulk update rules
export async function bulkUpdateRules(updates) {
  const records = getCollection('trading_rules');
  for (const { id, ...data } of updates) {
    const idx = records.findIndex(r => r.id === id);
    if (idx !== -1) {
      records[idx] = { ...records[idx], ...data, updated_date: new Date().toISOString() };
    }
  }
  saveCollection('trading_rules', records);
  return records;
}

```

### ./src/App.jsx
```
import React from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Reflection from './pages/Reflection';
import Stats from './pages/Stats';
import Widget from './pages/Widget';

// Simple auth gate (always authenticated for this standalone version)
function AdminRoute({ children }) {
  return children;
}

export default function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<AdminRoute><Dashboard /></AdminRoute>} />
        <Route path="/reflection" element={<AdminRoute><Reflection /></AdminRoute>} />
        <Route path="/stats" element={<AdminRoute><Stats /></AdminRoute>} />
        <Route path="/widget" element={<Widget />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </HashRouter>
  );
}

```

### ./src/components/cockpit/AuthorizationGate.jsx
```
import { useState, useMemo } from 'react';
import { useCockpit } from '@/lib/cockpitStore';
import { cn } from '@/lib/utils';

export default function AuthorizationGate() {
  const {
    confirmationCount,
    confirmationTotal,
    internalStructure,
    location,
    disciplineLocked,
    risk,
    pointValue,
    todayTrades,
    saveTrade,
    logViolation,
  } = useCockpit();

  const [entry, setEntry] = useState('');
  const [stop, setStop] = useState('');
  const [target, setTarget] = useState('');
  const [contracts, setContracts] = useState('1');

  const entryN = Number(entry) || 0;
  const stopN = Number(stop) || 0;
  const targetN = Number(target) || 0;
  const contractsN = Number(contracts) || 1;

  const riskPoints = Math.abs(entryN - stopN);
  const rewardPoints = Math.abs(targetN - entryN);
  const riskDollars = riskPoints * pointValue * contractsN;
  const rr = riskPoints > 0 ? (rewardPoints / riskPoints).toFixed(2) : '0.00';

  const checks = useMemo(() => ({
    confirmation: confirmationCount >= confirmationTotal && confirmationTotal > 0,
    internal: internalStructure,
    location: !!location,
    discipline: !disciplineLocked,
    risk: riskDollars <= risk.max_trade_risk || riskDollars === 0,
  }), [confirmationCount, confirmationTotal, internalStructure, location, disciplineLocked, riskDollars, risk]);

  const allPassing = Object.values(checks).every(Boolean);
  const status = disciplineLocked ? 'LOCKED' : allPassing ? 'AUTHORIZED' : 'WAIT';
  const statusColor = status === 'AUTHORIZED' ? 'text-green-400' : status === 'WAIT' ? 'text-amber-400' : 'text-red-400';
  const statusBg = status === 'AUTHORIZED' ? 'bg-green-400/10 border-green-400/30' : status === 'WAIT' ? 'bg-amber-400/10 border-amber-400/30' : 'bg-red-400/10 border-red-400/30';

  const handleExecute = () => {
    if (!allPassing) {
      logViolation({
        type: 'premature_execution',
        reason: `Attempted execution while ${status}`,
        details: JSON.stringify(checks),
      });
      return;
    }
    saveTrade({
      entry: entryN,
      stop: stopN,
      target: targetN,
      contracts: contractsN,
      risk_points: riskPoints,
      risk_dollars: riskDollars,
      rr: Number(rr),
    });
    setEntry('');
    setStop('');
    setTarget('');
    setContracts('1');
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <h3 className="text-xs font-medium text-zinc-400 uppercase tracking-wider">Authorization</h3>
        <span className={cn('text-[10px] font-bold uppercase', statusColor)}>{status}</span>
      </div>
      <div className="space-y-2">
        {/* Status Banner */}
        <div className={cn('text-center py-1 rounded border', statusBg)}>
          <span className={cn('text-[10px] font-medium', statusColor)}>{status}</span>
        </div>

        {/* Check List */}
        <div className="space-y-0.5 text-[10px]">
          {Object.entries(checks).map(([key, passed]) => (
            <div key={key} className="flex items-center gap-1.5">
              <span className={passed ? 'text-green-400' : 'text-red-400'}>{passed ? '●' : '○'}</span>
              <span className={passed ? 'text-zinc-400' : 'text-zinc-500'}>{key}</span>
            </div>
          ))}
        </div>

        {/* Trade Inputs */}
        <div className="grid grid-cols-2 gap-1">
          <div className="space-y-0.5">
            <label className="text-[9px] text-zinc-500 uppercase">Entry</label>
            <input
              type="number"
              value={entry}
              onChange={(e) => setEntry(e.target.value)}
              className="w-full bg-zinc-900/50 border border-zinc-800 rounded px-2 py-1 text-xs text-zinc-300 tabular-nums focus:outline-none focus:border-teal-400/50"
            />
          </div>
          <div className="space-y-0.5">
            <label className="text-[9px] text-zinc-500 uppercase">Stop</label>
            <input
              type="number"
              value={stop}
              onChange={(e) => setStop(e.target.value)}
              className="w-full bg-zinc-900/50 border border-zinc-800 rounded px-2 py-1 text-xs text-zinc-300 tabular-nums focus:outline-none focus:border-teal-400/50"
            />
          </div>
          <div className="space-y-0.5">
            <label className="text-[9px] text-zinc-500 uppercase">Target</label>
            <input
              type="number"
              value={target}
              onChange={(e) => setTarget(e.target.value)}
              className="w-full bg-zinc-900/50 border border-zinc-800 rounded px-2 py-1 text-xs text-zinc-300 tabular-nums focus:outline-none focus:border-teal-400/50"
            />
          </div>
          <div className="space-y-0.5">
            <label className="text-[9px] text-zinc-500 uppercase">Contracts</label>
            <input
              type="number"
              value={contracts}
              onChange={(e) => setContracts(e.target.value)}
              className="w-full bg-zinc-900/50 border border-zinc-800 rounded px-2 py-1 text-xs text-zinc-300 tabular-nums focus:outline-none focus:border-teal-400/50"
              min="1"
            />
          </div>
        </div>

        {/* Risk Display */}
        <div className="flex items-center justify-between p-1.5 bg-zinc-900/50 border border-zinc-800 rounded">
          <div className="text-[10px] tabular-nums">
            <span className="text-zinc-500">Risk: </span>
            <span className={riskDollars > risk.max_trade_risk ? 'text-red-400' : 'text-zinc-300'}>
              {riskPoints.toFixed(1)}pts / ${riskDollars.toFixed(0)}
            </span>
          </div>
          <div className="text-[10px] tabular-nums">
            <span className="text-zinc-500">R:R </span>
            <span className={Number(rr) >= 2 ? 'text-green-400' : 'text-zinc-300'}>{rr}</span>
          </div>
        </div>

        {/* Execute Button */}
        <button
          onClick={handleExecute}
          disabled={!allPassing}
          className={cn(
            'w-full py-1.5 rounded text-xs font-bold uppercase tracking-wider border transition-colors',
            allPassing
              ? 'bg-green-400/10 border-green-400/50 text-green-400 hover:bg-green-400/20'
              : 'bg-zinc-900/50 border-zinc-800 text-zinc-600 cursor-not-allowed'
          )}
        >
          Execute
        </button>
      </div>
    </div>
  );
}

```

### ./src/components/cockpit/ConfirmationPanel.jsx
```
import { useCockpit } from '@/lib/cockpitStore';
import { cn } from '@/lib/utils';

export default function ConfirmationPanel() {
  const {
    confirmation,
    setConfirmation,
    internalStructure,
    setInternalStructure,
    confirmationCount,
    confirmationTotal,
  } = useCockpit();

  const allComplete = confirmationCount === confirmationTotal && internalStructure;

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <h3 className="text-xs font-medium text-zinc-400 uppercase tracking-wider">Confirmation</h3>
        <span className={cn(
          'text-[10px] tabular-nums font-medium',
          allComplete ? 'text-green-400' : 'text-zinc-500'
        )}>
          {confirmationCount}/{confirmationTotal}
        </span>
      </div>
      <div className="space-y-2">
        {/* Internal Structure Toggle */}
        <button
          onClick={() => setInternalStructure(!internalStructure)}
          className={cn(
            'w-full flex items-center gap-2 px-2 py-1.5 rounded border transition-colors text-left',
            internalStructure
              ? 'bg-green-400/5 border-green-400/30'
              : 'bg-zinc-900/50 border-zinc-800 hover:border-zinc-700'
          )}
        >
          <span className={cn(
            'flex-shrink-0 w-3.5 h-3.5 rounded-full border flex items-center justify-center text-[8px]',
            internalStructure
              ? 'border-green-400 bg-green-400/20 text-green-400'
              : 'border-zinc-600 text-transparent'
          )}>
            ✓
          </span>
          <span className={cn(
            'text-xs',
            internalStructure ? 'text-green-400' : 'text-zinc-400'
          )}>
            Internal Structure Supports
          </span>
        </button>

        {/* Confirmation Checklist */}
        <div className="space-y-1">
          {confirmation.map((item) => (
            <button
              key={item.id}
              onClick={() => setConfirmation(item.id, !item.checked)}
              className={cn(
                'w-full flex items-center gap-2 px-2 py-1 rounded border transition-colors text-left',
                item.checked
                  ? 'bg-green-400/5 border-green-400/20'
                  : 'bg-zinc-900/50 border-zinc-800 hover:border-zinc-700'
              )}
            >
              <span className={cn(
                'flex-shrink-0 w-3 h-3 rounded-full border flex items-center justify-center text-[7px]',
                item.checked
                  ? 'border-green-400 bg-green-400/20 text-green-400'
                  : 'border-zinc-600 text-transparent'
              )}>
                ✓
              </span>
              <span className={cn(
                'text-[11px]',
                item.checked ? 'text-green-400' : 'text-zinc-400'
              )}>
                {item.label}
              </span>
            </button>
          ))}
        </div>

        {/* Complete Banner */}
        {allComplete && (
          <div className="text-center py-1.5 rounded bg-green-400/10 border border-green-400/30">
            <span className="text-[10px] font-bold text-green-400 uppercase tracking-wider">
              Confirmation Complete
            </span>
          </div>
        )}
      </div>
    </div>
  );
}

```

### ./src/components/cockpit/DisciplinePanel.jsx
```
import { useState } from 'react';
import { useCockpit } from '@/lib/cockpitStore';
import { cn } from '@/lib/utils';
import { EMOTIONAL_STATES } from '@/lib/cockpitConstants';

const CALM_STATES = ['Calm', 'Focused'];

export default function DisciplinePanel() {
  const {
    emotionalState,
    setEmotionalState,
    disciplineLocked,
    lockReason,
    lock,
    unlock,
    logViolation,
    violations,
    todayTrades,
    risk,
  } = useCockpit();

  const [overrideReason, setOverrideReason] = useState('');
  const [showOverride, setShowOverride] = useState(false);

  const recentViolations = violations.slice(-3).reverse();

  // Stats
  const tradesTaken = todayTrades.length;
  const maxTrades = risk.max_trades;
  const consecutiveLosses = (() => {
    const sorted = [...todayTrades].sort(
      (a, b) => new Date(b.created_date) - new Date(a.created_date)
    );
    let count = 0;
    for (const t of sorted) {
      if (t.pnl != null && Number(t.pnl) < 0) count++;
      else break;
    }
    return count;
  })();

  const handleManualLock = () => {
    lock('Manual lock');
  };

  const handleOverride = () => {
    if (!overrideReason.trim()) return;
    logViolation({
      type: 'lock_override',
      reason: `Override: ${overrideReason}`,
    });
    unlock();
    setOverrideReason('');
    setShowOverride(false);
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <h3 className="text-xs font-medium text-zinc-400 uppercase tracking-wider">Discipline</h3>
        <span className={cn(
          'text-[10px] font-bold uppercase',
          disciplineLocked ? 'text-red-400' : 'text-green-400'
        )}>
          {disciplineLocked ? 'LOCKED' : 'ACTIVE'}
        </span>
      </div>
      <div className="space-y-2">
        {/* Emotional State Grid */}
        <div className="space-y-1">
          <label className="text-[10px] text-zinc-500 uppercase">Emotional State</label>
          <div className="grid grid-cols-4 gap-1">
            {EMOTIONAL_STATES.map((state) => {
              const isCalm = CALM_STATES.includes(state);
              const isSelected = emotionalState === state;
              return (
                <button
                  key={state}
                  onClick={() => setEmotionalState(state)}
                  className={cn(
                    'px-1 py-1 rounded text-[9px] font-medium border transition-colors text-center',
                    isSelected && isCalm && 'bg-green-400/10 border-green-400/50 text-green-400',
                    isSelected && !isCalm && 'bg-red-400/10 border-red-400/50 text-red-400',
                    !isSelected && 'bg-zinc-900/50 border-zinc-800 text-zinc-500 hover:text-zinc-300'
                  )}
                >
                  {state}
                </button>
              );
            })}
          </div>
        </div>

        {/* Lock Status */}
        {disciplineLocked && (
          <div className="p-2 rounded bg-red-400/5 border border-red-400/20">
            <div className="text-[10px] text-red-400 font-medium">{lockReason}</div>
            {!showOverride ? (
              <button
                onClick={() => setShowOverride(true)}
                className="mt-1 text-[9px] text-red-400/70 hover:text-red-400 underline"
              >
                Override Lock (logged)
              </button>
            ) : (
              <div className="mt-1.5 space-y-1">
                <textarea
                  value={overrideReason}
                  onChange={(e) => setOverrideReason(e.target.value)}
                  rows={2}
                  className="w-full bg-zinc-900 border border-red-400/30 rounded px-2 py-1 text-xs text-zinc-300 resize-none focus:outline-none focus:border-red-400/50"
                  placeholder="Explain override reason..."
                />
                <div className="flex gap-1">
                  <button
                    onClick={handleOverride}
                    className="flex-1 py-1 rounded text-[9px] font-medium bg-red-400/10 border border-red-400/40 text-red-400 hover:bg-red-400/20"
                  >
                    Confirm Override
                  </button>
                  <button
                    onClick={() => setShowOverride(false)}
                    className="px-2 py-1 rounded text-[9px] text-zinc-500 border border-zinc-800 hover:text-zinc-300"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {!disciplineLocked && (
          <button
            onClick={handleManualLock}
            className="w-full py-1 rounded text-[10px] font-medium bg-zinc-900/50 border border-zinc-800 text-zinc-500 hover:text-zinc-300 hover:border-zinc-700"
          >
            Manual Lock
          </button>
        )}

        {/* Recent Violations */}
        {recentViolations.length > 0 && (
          <div className="space-y-1">
            <label className="text-[10px] text-zinc-500 uppercase">Recent Violations</label>
            {recentViolations.map((v) => (
              <div key={v.id} className="text-[10px] text-red-400/80 px-2 py-0.5 bg-red-400/5 rounded truncate">
                {v.reason || v.type}
              </div>
            ))}
          </div>
        )}

        {/* Stats */}
        <div className="grid grid-cols-3 gap-1 text-center">
          <div className="p-1 bg-zinc-900/50 border border-zinc-800 rounded">
            <div className="text-[10px] tabular-nums text-zinc-300">{tradesTaken}/{maxTrades}</div>
            <div className="text-[8px] text-zinc-500 uppercase">Trades</div>
          </div>
          <div className="p-1 bg-zinc-900/50 border border-zinc-800 rounded">
            <div className={cn('text-[10px] tabular-nums', consecutiveLosses >= 2 ? 'text-red-400' : 'text-zinc-300')}>
              {consecutiveLosses}
            </div>
            <div className="text-[8px] text-zinc-500 uppercase">Losses</div>
          </div>
          <div className="p-1 bg-zinc-900/50 border border-zinc-800 rounded">
            <div className={cn('text-[10px] tabular-nums', violations.length > 0 ? 'text-amber-400' : 'text-zinc-300')}>
              {violations.length}
            </div>
            <div className="text-[8px] text-zinc-500 uppercase">Violations</div>
          </div>
        </div>
      </div>
    </div>
  );
}

```

### ./src/components/cockpit/EnvironmentPanel.jsx
```
import { useState } from 'react';
import { useCockpit } from '@/lib/cockpitStore';
import { cn } from '@/lib/utils';
import { STRUCTURE_TYPES, HTF_TIMEFRAMES, GAMMA_REGIMES } from '@/lib/cockpitConstants';

export default function EnvironmentPanel() {
  const { context, saveContext } = useCockpit();

  const handleChange = (key, value) => {
    saveContext({ [key]: value });
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <h3 className="text-xs font-medium text-zinc-400 uppercase tracking-wider">Environment</h3>
      </div>
      <div className="space-y-2">
        {/* Market Structure */}
        <div className="space-y-1">
          <label className="text-[10px] text-zinc-500 uppercase">Structure</label>
          <select
            value={context.market_structure}
            onChange={(e) => handleChange('market_structure', e.target.value)}
            className="w-full bg-zinc-900/50 border border-zinc-800 rounded px-2 py-1 text-xs text-zinc-300 focus:outline-none focus:border-teal-400/50"
          >
            <option value="">—</option>
            {STRUCTURE_TYPES.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
        </div>

        {/* HTF Bias */}
        <div className="space-y-1">
          <label className="text-[10px] text-zinc-500 uppercase">HTF Bias</label>
          <select
            value={context.htf_bias}
            onChange={(e) => handleChange('htf_bias', e.target.value)}
            className="w-full bg-zinc-900/50 border border-zinc-800 rounded px-2 py-1 text-xs text-zinc-300 focus:outline-none focus:border-teal-400/50"
          >
            <option value="">—</option>
            {HTF_TIMEFRAMES.map((t) => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>
        </div>

        {/* Gamma Regime */}
        <div className="space-y-1">
          <label className="text-[10px] text-zinc-500 uppercase">Gamma Regime</label>
          <div className="flex gap-1">
            {GAMMA_REGIMES.map((g) => (
              <button
                key={g}
                onClick={() => handleChange('gamma_regime', g)}
                className={cn(
                  'flex-1 px-2 py-1 rounded text-[10px] font-medium border transition-colors',
                  context.gamma_regime === g
                    ? 'bg-teal-400/10 border-teal-400/50 text-teal-400'
                    : 'bg-zinc-900/50 border-zinc-800 text-zinc-500 hover:text-zinc-300'
                )}
              >
                {g}
              </button>
            ))}
          </div>
        </div>

        {/* GEX — gamma flip only */}
        <div className="space-y-1">
          <label className="text-[10px] text-zinc-500 uppercase">Gamma Flip Level</label>
          <input
            type="number"
            value={context.gex_call_wall}
            onChange={(e) => handleChange('gex_call_wall', e.target.value)}
            className="w-full bg-zinc-900/50 border border-zinc-800 rounded px-2 py-1 text-xs text-zinc-300 tabular-nums focus:outline-none focus:border-teal-400/50"
            placeholder="0"
          />
        </div>

        {/* Scenarios */}
        <div className="space-y-1">
          <label className="text-[10px] text-zinc-500 uppercase">Scenarios</label>
          <textarea
            value={context.scenarios}
            onChange={(e) => handleChange('scenarios', e.target.value)}
            rows={3}
            className="w-full bg-zinc-900/50 border border-zinc-800 rounded px-2 py-1 text-xs text-zinc-300 resize-none focus:outline-none focus:border-teal-400/50"
            placeholder="If price does X, then Y..."
          />
        </div>
      </div>
    </div>
  );
}

```

### ./src/components/cockpit/FibCalculator.jsx
```
import { useMemo } from 'react';
import { useCockpit } from '@/lib/cockpitStore';
import { cn } from '@/lib/utils';

const FIB_LEVELS = [0.705, 0.786, 0.886];

export default function FibCalculator() {
  const { setup, updateSetup, currentPrice } = useCockpit();
  const { direction, swing_high, swing_low } = setup;

  const high = Number(swing_high) || 0;
  const low = Number(swing_low) || 0;
  const range = high - low;

  const fibs = useMemo(() => {
    if (!range || !high || !low) return [];
    return FIB_LEVELS.map((level) => {
      const price = direction === 'Short'
        ? low + range * level
        : high - range * level;
      return { level, price };
    });
  }, [direction, high, low, range]);

  const isInZone = useMemo(() => {
    if (!currentPrice || fibs.length < 2) return false;
    const fib705 = fibs[0].price;
    const fib786 = fibs[1].price;
    const min = Math.min(fib705, fib786);
    const max = Math.max(fib705, fib786);
    return currentPrice >= min && currentPrice <= max;
  }, [currentPrice, fibs]);

  const isInvalidated = useMemo(() => {
    if (!currentPrice || fibs.length < 3) return false;
    const fib886 = fibs[2].price;
    if (direction === 'Long') return currentPrice < fib886;
    if (direction === 'Short') return currentPrice > fib886;
    return false;
  }, [currentPrice, fibs, direction]);

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <h3 className="text-xs font-medium text-zinc-400 uppercase tracking-wider">Fibonacci</h3>
        <div className="flex gap-1">
          {isInZone && (
            <span className="text-[9px] px-1.5 py-0.5 rounded bg-teal-400/10 text-teal-400 font-medium">ZONE</span>
          )}
          {isInvalidated && (
            <span className="text-[9px] px-1.5 py-0.5 rounded bg-red-400/10 text-red-400 font-medium">INVALIDATED</span>
          )}
        </div>
      </div>
      <div className="space-y-2">
        {/* Direction Toggle */}
        <div className="flex gap-1">
          <button
            onClick={() => updateSetup({ direction: 'Long' })}
            className={cn(
              'flex-1 px-2 py-1 rounded text-[10px] font-medium border transition-colors',
              direction === 'Long'
                ? 'bg-green-400/10 border-green-400/50 text-green-400'
                : 'bg-zinc-900/50 border-zinc-800 text-zinc-500 hover:text-zinc-300'
            )}
          >
            Long
          </button>
          <button
            onClick={() => updateSetup({ direction: 'Short' })}
            className={cn(
              'flex-1 px-2 py-1 rounded text-[10px] font-medium border transition-colors',
              direction === 'Short'
                ? 'bg-red-400/10 border-red-400/50 text-red-400'
                : 'bg-zinc-900/50 border-zinc-800 text-zinc-500 hover:text-zinc-300'
            )}
          >
            Short
          </button>
        </div>

        {/* Swing Inputs */}
        <div className="grid grid-cols-2 gap-2">
          <div className="space-y-1">
            <label className="text-[10px] text-zinc-500 uppercase">Swing High</label>
            <input
              type="number"
              value={swing_high}
              onChange={(e) => updateSetup({ swing_high: e.target.value })}
              className="w-full bg-zinc-900/50 border border-zinc-800 rounded px-2 py-1 text-xs text-zinc-300 tabular-nums focus:outline-none focus:border-teal-400/50"
              placeholder="0"
            />
          </div>
          <div className="space-y-1">
            <label className="text-[10px] text-zinc-500 uppercase">Swing Low</label>
            <input
              type="number"
              value={swing_low}
              onChange={(e) => updateSetup({ swing_low: e.target.value })}
              className="w-full bg-zinc-900/50 border border-zinc-800 rounded px-2 py-1 text-xs text-zinc-300 tabular-nums focus:outline-none focus:border-teal-400/50"
              placeholder="0"
            />
          </div>
        </div>

        {/* Fib Levels Display */}
        {fibs.length > 0 && (
          <div className="space-y-1 p-2 bg-zinc-900/50 border border-zinc-800 rounded">
            {fibs.map(({ level, price }) => (
              <div key={level} className="flex items-center justify-between">
                <span className="text-[10px] text-zinc-500">{level}</span>
                <span className={cn(
                  'text-xs tabular-nums font-medium',
                  level === 0.705 || level === 0.786 ? 'text-teal-400' : 'text-zinc-400'
                )}>
                  {price.toFixed(2)}
                </span>
              </div>
            ))}
            {range > 0 && (
              <div className="flex items-center justify-between pt-1 border-t border-zinc-800">
                <span className="text-[10px] text-zinc-500">Range</span>
                <span className="text-[10px] tabular-nums text-zinc-400">{range.toFixed(2)} pts</span>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

```

### ./src/components/cockpit/LevelsPanel.jsx
```
import { useState } from 'react';
import { useCockpit } from '@/lib/cockpitStore';
import { cn } from '@/lib/utils';
import { LEVEL_TYPES, DISTANCE_BANDS } from '@/lib/cockpitConstants';

function getDistanceBand(points) {
  const abs = Math.abs(points);
  for (const band of DISTANCE_BANDS) {
    if (abs >= band.min) return band;
  }
  return DISTANCE_BANDS[0];
}

export default function LevelsPanel() {
  const { levels, currentPrice, addLevel, removeLevel } = useCockpit();
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ name: '', price: '', type: 'Custom', direction: 'support', strength: 3 });

  const sorted = [...levels].sort((a, b) => {
    const da = currentPrice ? Math.abs(Number(a.price) - currentPrice) : 0;
    const db2 = currentPrice ? Math.abs(Number(b.price) - currentPrice) : 0;
    return da - db2;
  });

  const handleAdd = () => {
    if (!form.price) return;
    addLevel({ ...form, price: Number(form.price), strength: Number(form.strength) });
    setForm({ name: '', price: '', type: 'Custom', direction: 'support', strength: 3 });
    setShowForm(false);
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <h3 className="text-xs font-medium text-zinc-400 uppercase tracking-wider">
          Levels ({levels.length})
        </h3>
        <button
          onClick={() => setShowForm(!showForm)}
          className="text-[10px] text-teal-400 hover:text-teal-300"
        >
          {showForm ? 'Cancel' : '+ Add'}
        </button>
      </div>
      <div className="space-y-2">
        {showForm && (
          <div className="space-y-1.5 p-2 bg-zinc-900/50 border border-zinc-800 rounded">
            <input
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              placeholder="Name"
              className="w-full bg-zinc-900 border border-zinc-800 rounded px-2 py-1 text-xs text-zinc-300 focus:outline-none focus:border-teal-400/50"
            />
            <input
              type="number"
              value={form.price}
              onChange={(e) => setForm({ ...form, price: e.target.value })}
              placeholder="Price"
              className="w-full bg-zinc-900 border border-zinc-800 rounded px-2 py-1 text-xs text-zinc-300 tabular-nums focus:outline-none focus:border-teal-400/50"
            />
            <select
              value={form.type}
              onChange={(e) => setForm({ ...form, type: e.target.value })}
              className="w-full bg-zinc-900 border border-zinc-800 rounded px-2 py-1 text-xs text-zinc-300 focus:outline-none focus:border-teal-400/50"
            >
              {LEVEL_TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
            </select>
            <div className="flex gap-1">
              <select
                value={form.direction}
                onChange={(e) => setForm({ ...form, direction: e.target.value })}
                className="flex-1 bg-zinc-900 border border-zinc-800 rounded px-2 py-1 text-xs text-zinc-300 focus:outline-none focus:border-teal-400/50"
              >
                <option value="support">Support</option>
                <option value="resistance">Resistance</option>
              </select>
              <select
                value={form.strength}
                onChange={(e) => setForm({ ...form, strength: e.target.value })}
                className="w-16 bg-zinc-900 border border-zinc-800 rounded px-2 py-1 text-xs text-zinc-300 focus:outline-none focus:border-teal-400/50"
              >
                {[1, 2, 3, 4, 5].map((s) => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
            <button
              onClick={handleAdd}
              className="w-full py-1 rounded text-[10px] font-medium bg-teal-400/10 border border-teal-400/50 text-teal-400 hover:bg-teal-400/20"
            >
              Add Level
            </button>
          </div>
        )}

        <div className="space-y-1 max-h-48 overflow-y-auto">
          {sorted.map((level) => {
            const dist = currentPrice ? Number(level.price) - currentPrice : 0;
            const band = getDistanceBand(dist);
            return (
              <div
                key={level.id}
                className="group flex items-center gap-2 px-2 py-1 rounded bg-zinc-900/50 border border-zinc-800 hover:border-zinc-700"
              >
                <span className="text-[10px] text-zinc-500">
                  {level.direction === 'support' ? '▲' : '▼'}
                </span>
                <div className="flex-1 min-w-0">
                  <div className="text-xs text-zinc-300 truncate">
                    {level.name || level.type}
                  </div>
                  <div className="text-[10px] text-zinc-500">{level.type}</div>
                </div>
                <span className="text-xs tabular-nums text-zinc-300">{Number(level.price).toFixed(2)}</span>
                <span className="flex gap-0.5">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <span key={i} className={cn('w-1 h-1 rounded-full', i < level.strength ? 'bg-teal-400' : 'bg-zinc-700')} />
                  ))}
                </span>
                <span className="text-[10px] tabular-nums" style={{ color: band.color }}>
                  {dist > 0 ? '+' : ''}{dist.toFixed(1)}
                </span>
                <button
                  onClick={() => removeLevel(level.id)}
                  className="opacity-0 group-hover:opacity-100 text-zinc-500 hover:text-red-400 text-xs transition-opacity"
                >
                  ✕
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

```

### ./src/components/cockpit/LiquidityPanel.jsx
```
import { useState } from 'react';
import { useCockpit } from '@/lib/cockpitStore';
import { cn } from '@/lib/utils';
import { LIQUIDITY_TYPES } from '@/lib/cockpitConstants';

export default function LiquidityPanel() {
  const { liquidity, currentPrice, addLiquidity, removeLiquidity } = useCockpit();
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ name: '', price: '', upper: '', lower: '', type: 'Buy-Side', strength: 3 });

  const sorted = [...liquidity].sort((a, b) => {
    const da = currentPrice ? Math.abs(Number(a.price) - currentPrice) : 0;
    const db2 = currentPrice ? Math.abs(Number(b.price) - currentPrice) : 0;
    return da - db2;
  });

  const handleAdd = () => {
    if (!form.price) return;
    addLiquidity({
      ...form,
      price: Number(form.price),
      upper: Number(form.upper || form.price),
      lower: Number(form.lower || form.price),
      strength: Number(form.strength),
    });
    setForm({ name: '', price: '', upper: '', lower: '', type: 'Buy-Side', strength: 3 });
    setShowForm(false);
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <h3 className="text-xs font-medium text-zinc-400 uppercase tracking-wider">
          Liquidity ({liquidity.length})
        </h3>
        <button
          onClick={() => setShowForm(!showForm)}
          className="text-[10px] text-teal-400 hover:text-teal-300"
        >
          {showForm ? 'Cancel' : '+ Add'}
        </button>
      </div>
      <div className="space-y-2">
        {showForm && (
          <div className="space-y-1.5 p-2 bg-zinc-900/50 border border-zinc-800 rounded">
            <input
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              placeholder="Name"
              className="w-full bg-zinc-900 border border-zinc-800 rounded px-2 py-1 text-xs text-zinc-300 focus:outline-none focus:border-teal-400/50"
            />
            <input
              type="number"
              value={form.price}
              onChange={(e) => setForm({ ...form, price: e.target.value })}
              placeholder="Price (mid)"
              className="w-full bg-zinc-900 border border-zinc-800 rounded px-2 py-1 text-xs text-zinc-300 tabular-nums focus:outline-none focus:border-teal-400/50"
            />
            <div className="grid grid-cols-2 gap-1">
              <input
                type="number"
                value={form.lower}
                onChange={(e) => setForm({ ...form, lower: e.target.value })}
                placeholder="Lower"
                className="bg-zinc-900 border border-zinc-800 rounded px-2 py-1 text-xs text-zinc-300 tabular-nums focus:outline-none focus:border-teal-400/50"
              />
              <input
                type="number"
                value={form.upper}
                onChange={(e) => setForm({ ...form, upper: e.target.value })}
                placeholder="Upper"
                className="bg-zinc-900 border border-zinc-800 rounded px-2 py-1 text-xs text-zinc-300 tabular-nums focus:outline-none focus:border-teal-400/50"
              />
            </div>
            <div className="flex gap-1">
              <select
                value={form.type}
                onChange={(e) => setForm({ ...form, type: e.target.value })}
                className="flex-1 bg-zinc-900 border border-zinc-800 rounded px-2 py-1 text-xs text-zinc-300 focus:outline-none focus:border-teal-400/50"
              >
                {LIQUIDITY_TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
              </select>
              <select
                value={form.strength}
                onChange={(e) => setForm({ ...form, strength: e.target.value })}
                className="w-16 bg-zinc-900 border border-zinc-800 rounded px-2 py-1 text-xs text-zinc-300 focus:outline-none focus:border-teal-400/50"
              >
                {[1, 2, 3, 4, 5].map((s) => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
            <button
              onClick={handleAdd}
              className="w-full py-1 rounded text-[10px] font-medium bg-teal-400/10 border border-teal-400/50 text-teal-400 hover:bg-teal-400/20"
            >
              Add Zone
            </button>
          </div>
        )}

        <div className="space-y-1 max-h-48 overflow-y-auto">
          {sorted.map((zone) => {
            const isInside = currentPrice && currentPrice >= Number(zone.lower) && currentPrice <= Number(zone.upper);
            const typeColor = zone.type === 'Buy-Side' || zone.type === 'Equal Highs' ? 'text-green-400' : 'text-red-400';
            return (
              <div
                key={zone.id}
                className="group flex items-center gap-2 px-2 py-1 rounded bg-zinc-900/50 border border-zinc-800 hover:border-zinc-700"
              >
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1">
                    <span className="text-xs text-zinc-300 truncate">{zone.name || zone.type}</span>
                    <span className={cn('text-[10px]', typeColor)}>{zone.type}</span>
                    {isInside && (
                      <span className="text-[9px] px-1 py-0.5 rounded bg-teal-400/10 text-teal-400 font-medium">INSIDE</span>
                    )}
                  </div>
                  <div className="text-[10px] text-zinc-500 tabular-nums">
                    {Number(zone.lower).toFixed(2)} — {Number(zone.upper).toFixed(2)}
                  </div>
                </div>
                <span className="flex gap-0.5">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <span key={i} className={cn('w-1 h-1 rounded-full', i < zone.strength ? 'bg-teal-400' : 'bg-zinc-700')} />
                  ))}
                </span>
                <button
                  onClick={() => removeLiquidity(zone.id)}
                  className="opacity-0 group-hover:opacity-100 text-zinc-500 hover:text-red-400 text-xs transition-opacity"
                >
                  ✕
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

```

### ./src/components/cockpit/LocationPanel.jsx
```
import { useCockpit } from '@/lib/cockpitStore';
import { cn } from '@/lib/utils';
import { LOCATION_TYPES } from '@/lib/cockpitConstants';

export default function LocationPanel() {
  const { location, setLocation } = useCockpit();

  const handleClick = (loc) => {
    setLocation(location === loc ? '' : loc);
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <h3 className="text-xs font-medium text-zinc-400 uppercase tracking-wider">Location</h3>
        {location && (
          <span className="text-[9px] px-1.5 py-0.5 rounded bg-teal-400/10 text-teal-400 font-medium">
            {location}
          </span>
        )}
      </div>
      <div className="space-y-2">
        <div className="grid grid-cols-3 gap-1">
          {LOCATION_TYPES.map((loc) => (
            <button
              key={loc}
              onClick={() => handleClick(loc)}
              className={cn(
                'px-1.5 py-1.5 rounded text-[10px] font-medium border transition-colors text-center',
                location === loc
                  ? 'bg-teal-400/10 border-teal-400/50 text-teal-400'
                  : 'bg-zinc-900/50 border-zinc-800 text-zinc-500 hover:text-zinc-300 hover:border-zinc-700'
              )}
            >
              {loc}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

```

### ./src/components/trading/BadgesDisplay.jsx
```
import React, { useState, useEffect } from 'react';
import { TradingSession, Trade } from '@/api/db';
import { getBadges } from '@/lib/badges';
import { cn } from '@/lib/utils';

export default function BadgesDisplay() {
  const [badges, setBadges] = useState([]);

  useEffect(() => {
    async function load() {
      const sessions = await TradingSession.list({ status: 'ended' });
      const trades = [];
      for (const sess of sessions) {
        const t = await Trade.list({ session_id: sess.id });
        trades.push(...t);
      }
      setBadges(getBadges(sessions, trades));
    }
    load();
  }, []);

  if (badges.length === 0) {
    return (
      <div className="text-center py-4">
        <p className="text-xs text-zinc-600 italic">No badges earned yet. Keep trading with discipline!</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
      {badges.map((badge) => (
        <div
          key={badge.id}
          className="flex flex-col items-center p-3 rounded-lg bg-zinc-800/30 border border-zinc-700/50 text-center"
        >
          <span className="text-2xl mb-1">{badge.icon}</span>
          <span className="text-[10px] font-medium text-zinc-200 leading-tight">{badge.title}</span>
          {badge.earnedDate && (
            <span className="text-[9px] text-zinc-600 mt-0.5">
              {new Date(badge.earnedDate).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
            </span>
          )}
        </div>
      ))}
    </div>
  );
}

```

### ./src/components/trading/CoachSelector.jsx
```
import React from 'react';
import { Select, SelectOption } from '@/components/ui/select';
import { personalityList } from '@/shared/coachPersonalities';

export default function CoachSelector({ value, onChange }) {
  return (
    <Select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="h-8 text-xs w-40"
    >
      {personalityList.map((p) => (
        <SelectOption key={p.key} value={p.key}>
          {p.label}
        </SelectOption>
      ))}
    </Select>
  );
}

```

### ./src/components/trading/CompactModeToggle.jsx
```
import { cn } from '@/lib/utils';

export default function CompactModeToggle({ compact, onToggle }) {
  return (
    <button
      onClick={onToggle}
      className={cn(
        'p-1 rounded text-[10px] text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/60 transition-colors',
        'border border-zinc-800/50'
      )}
      title={compact ? 'Expand view' : 'Compact view'}
    >
      {compact ? (
        // Expand icon
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 16 16"
          fill="currentColor"
          className="w-3 h-3"
        >
          <path d="M3.28 2.22a.75.75 0 0 0-1.06 1.06L5.44 6.5H3.75a.75.75 0 0 0 0 1.5h3.5a.75.75 0 0 0 .75-.75v-3.5a.75.75 0 0 0-1.5 0v1.69L3.28 2.22ZM12.72 13.78a.75.75 0 1 0 1.06-1.06L10.56 9.5h1.69a.75.75 0 0 0 0-1.5h-3.5a.75.75 0 0 0-.75.75v3.5a.75.75 0 0 0 1.5 0v-1.69l3.22 3.22Z" />
        </svg>
      ) : (
        // Compact/minimize icon
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 16 16"
          fill="currentColor"
          className="w-3 h-3"
        >
          <path d="M8.75 3.75a.75.75 0 0 0-1.5 0v3.5a.75.75 0 0 0 .75.75h3.5a.75.75 0 0 0 0-1.5h-1.69l3.22-3.22a.75.75 0 0 0-1.06-1.06L8.75 5.44V3.75ZM7.25 12.25a.75.75 0 0 0 1.5 0v-3.5a.75.75 0 0 0-.75-.75h-3.5a.75.75 0 0 0 0 1.5h1.69L2.97 12.72a.75.75 0 1 0 1.06 1.06l3.22-3.22v1.69Z" />
        </svg>
      )}
    </button>
  );
}

```

### ./src/components/trading/Confetti.jsx
```
import React, { useState, useEffect } from 'react';

// Lightweight confetti burst for A+ wins
export default function Confetti({ trigger }) {
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    if (!trigger) return;
    const colors = ['#2dd4bf', '#10b981', '#f59e0b', '#3b82f6', '#8b5cf6'];
    const newParticles = Array.from({ length: 30 }, (_, i) => ({
      id: Date.now() + i,
      x: 50 + (Math.random() - 0.5) * 20,
      y: 40,
      color: colors[Math.floor(Math.random() * colors.length)],
      angle: Math.random() * 360,
      velocity: 2 + Math.random() * 4,
      spin: (Math.random() - 0.5) * 10,
      size: 4 + Math.random() * 4,
    }));
    setParticles(newParticles);
    const timer = setTimeout(() => setParticles([]), 2000);
    return () => clearTimeout(timer);
  }, [trigger]);

  if (particles.length === 0) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-[200]">
      {particles.map((p) => (
        <div
          key={p.id}
          className="absolute animate-[confetti-fall_2s_ease-out_forwards]"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
            backgroundColor: p.color,
            borderRadius: Math.random() > 0.5 ? '50%' : '0',
            transform: `rotate(${p.angle}deg)`,
            '--vx': `${(Math.random() - 0.5) * 300}px`,
            '--vy': `${-100 - Math.random() * 200}px`,
            animation: `confetti-fall 2s ease-out forwards`,
          }}
        />
      ))}
      <style>{`
        @keyframes confetti-fall {
          0% { transform: translate(0, 0) rotate(0deg); opacity: 1; }
          100% { transform: translate(var(--vx, 100px), calc(var(--vy, -200px) + 500px)) rotate(720deg); opacity: 0; }
        }
      `}</style>
    </div>
  );
}

```

### ./src/components/trading/ConfluenceCounter.jsx
```
import React from 'react';
import { cn } from '@/lib/utils';

export default function ConfluenceCounter({ rules }) {
  const entryRules = rules.filter(r => r.category === 'entry');
  const enabledCount = entryRules.filter(r => r.enabled).length;
  const totalCount = entryRules.length;

  return (
    <div className="flex items-center gap-1.5">
      {entryRules.map((rule, idx) => (
        <div
          key={rule.id}
          className={cn(
            'w-2.5 h-2.5 rounded-full transition-all duration-300',
            rule.enabled
              ? 'bg-teal-400 shadow-sm shadow-teal-400/50'
              : 'bg-zinc-700'
          )}
          title={rule.title}
        />
      ))}
      <span className="ml-2 text-xs text-zinc-500 tabular-nums">
        {enabledCount}/{totalCount}
      </span>
    </div>
  );
}

```

### ./src/components/trading/ConvictionRating.jsx
```
import React from 'react';
import { cn } from '@/lib/utils';

/**
 * Conviction rating selector (1-5) shown in TradeDetail
 */
export default function ConvictionRating({ value, onChange }) {
  return (
    <div className="space-y-1.5">
      <div className="flex items-center gap-1">
        {[1, 2, 3, 4, 5].map((level) => (
          <button
            key={level}
            type="button"
            onClick={() => onChange(level)}
            className={cn(
              'w-8 h-8 rounded-md border text-xs font-bold transition-all',
              value === level
                ? level <= 2 ? 'border-red-500/50 bg-red-500/20 text-red-300'
                : level === 3 ? 'border-amber-500/50 bg-amber-500/20 text-amber-300'
                : 'border-teal-500/50 bg-teal-500/20 text-teal-300'
                : 'border-zinc-700 bg-zinc-800/30 text-zinc-500 hover:border-zinc-600'
            )}
          >
            {level}
          </button>
        ))}
      </div>
      <div className="flex justify-between text-[9px] text-zinc-600 px-0.5">
        <span>Low</span>
        <span>High</span>
      </div>
    </div>
  );
}

```

### ./src/components/trading/DisciplineWheel.jsx
```
import React, { useMemo } from 'react';
import { cn } from '@/lib/utils';

/**
 * Liquidity Hunt Tracker — each segment represents one entry rule.
 * Segments fill with color as rules are checked off.
 * At 80%+ = "TRADERS TRAPPED" — ready to enter.
 * Trade count shown separately beside the wheel.
 */

// Color ramp for segments based on how many are filled
const SEGMENT_COLORS = [
  '#ef4444', // first rule — red (just starting)
  '#f97316', // orange
  '#eab308', // yellow
  '#22c55e', // green
  '#14b8a6', // teal
  '#2dd4bf', // bright teal (high confluence)
  '#2dd4bf',
  '#2dd4bf',
  '#2dd4bf',
  '#2dd4bf',
];

function getSegmentColor(index, total) {
  // Color progresses from red → teal based on position relative to total
  const ratio = index / Math.max(1, total - 1);
  if (ratio <= 0.2) return '#ef4444';
  if (ratio <= 0.4) return '#f97316';
  if (ratio <= 0.6) return '#eab308';
  if (ratio <= 0.8) return '#22c55e';
  return '#2dd4bf';
}

export default function DisciplineWheel({
  rules = [],
  executionScore = 0,
  trades = [],
  maxTrades = 3,
  liquidityTarget = null, // 'bsl' | 'ssl' | 'both' | null
  onSlotClick,
}) {
  const entryRules = rules.filter(r => r.category === 'entry');
  const totalRules = entryRules.length;
  const checkedCount = entryRules.filter(r => r.enabled).length;
  const isTrapped = executionScore >= 80;

  const size = 260;
  const center = size / 2;
  const outerRadius = 108;
  const innerRadius = 64;
  const gap = 0.05;

  // Compute glow color based on score
  const glowColor = useMemo(() => {
    if (executionScore >= 80) return { r: 45, g: 212, b: 191 };
    if (executionScore >= 60) return { r: 34, g: 197, b: 94 };
    if (executionScore >= 40) return { r: 234, g: 179, b: 8 };
    if (executionScore >= 20) return { r: 249, g: 115, b: 22 };
    return { r: 239, g: 68, b: 68 };
  }, [executionScore]);
  const glowRgb = `${glowColor.r}, ${glowColor.g}, ${glowColor.b}`;

  // Build segments — one per entry rule
  const segments = useMemo(() => {
    if (totalRules === 0) return [];
    const anglePerSegment = (2 * Math.PI) / totalRules;

    return entryRules.map((rule, i) => {
      const startAngle = i * anglePerSegment - Math.PI / 2 + gap / 2;
      const endAngle = (i + 1) * anglePerSegment - Math.PI / 2 - gap / 2;

      const x1O = center + outerRadius * Math.cos(startAngle);
      const y1O = center + outerRadius * Math.sin(startAngle);
      const x2O = center + outerRadius * Math.cos(endAngle);
      const y2O = center + outerRadius * Math.sin(endAngle);
      const x1I = center + innerRadius * Math.cos(endAngle);
      const y1I = center + innerRadius * Math.sin(endAngle);
      const x2I = center + innerRadius * Math.cos(startAngle);
      const y2I = center + innerRadius * Math.sin(startAngle);

      const largeArc = anglePerSegment - gap > Math.PI ? 1 : 0;
      const path = `M ${x1O} ${y1O} A ${outerRadius} ${outerRadius} 0 ${largeArc} 1 ${x2O} ${y2O} L ${x1I} ${y1I} A ${innerRadius} ${innerRadius} 0 ${largeArc} 0 ${x2I} ${y2I} Z`;

      const midAngle = (startAngle + endAngle) / 2;
      const labelRadius = (outerRadius + innerRadius) / 2;
      const labelX = center + labelRadius * Math.cos(midAngle);
      const labelY = center + labelRadius * Math.sin(midAngle);

      return { path, rule, labelX, labelY, color: getSegmentColor(i, totalRules) };
    });
  }, [entryRules, totalRules]);

  const completedTrades = trades.length;

  return (
    <div className="relative flex flex-col items-center">
      {/* Wheel with glow */}
      <div className="relative">
        {/* Pulsing glow — intensity scales with progress */}
        <div
          className="absolute rounded-full animate-pulse-glow"
          style={{
            width: size + 50,
            height: size + 50,
            top: -25,
            left: -25,
            background: `radial-gradient(circle, rgba(${glowRgb}, ${0.05 + (executionScore / 100) * 0.35}) 0%, rgba(${glowRgb}, ${(executionScore / 100) * 0.15}) 40%, transparent 70%)`,
            boxShadow: `0 0 ${20 + (executionScore / 100) * 80}px rgba(${glowRgb}, ${0.1 + (executionScore / 100) * 0.5}), 0 0 ${40 + (executionScore / 100) * 120}px rgba(${glowRgb}, ${(executionScore / 100) * 0.25})`,
            transition: 'all 0.6s ease',
          }}
        />

        <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="relative z-10">
          {/* Liquidity target ring */}
          {liquidityTarget && (
            <circle cx={center} cy={center} r={outerRadius + 8} fill="none"
              stroke={liquidityTarget === 'bsl' ? '#10b981' : liquidityTarget === 'ssl' ? '#ef4444' : '#f59e0b'}
              strokeWidth={2.5 + (executionScore / 100) * 1.5} strokeDasharray="5 3" opacity={0.4 + (executionScore / 100) * 0.5} className="animate-pulse-glow" />
          )}

          {/* Segments — one per rule */}
          {segments.map(({ path, rule, labelX, labelY, color }, idx) => (
            <g key={rule.id}>
              <path
                d={path}
                fill={rule.enabled ? color : 'rgba(39, 39, 42, 0.3)'}
                stroke={rule.enabled ? color : '#27272a'}
                strokeWidth={rule.enabled ? 2 : 0.5}
                opacity={rule.enabled ? 0.9 + (executionScore / 100) * 0.1 : 0.35}
                filter={rule.enabled ? `drop-shadow(0 0 ${3 + (executionScore / 100) * 6}px ${color})` : 'none'}
                className="transition-all duration-300"
              />
              {/* Abbreviated label */}
              <text
                x={labelX} y={labelY}
                textAnchor="middle" dominantBaseline="central"
                fill={rule.enabled ? '#fff' : '#52525b'}
                fontSize={totalRules > 6 ? '8' : '9'}
                className="select-none pointer-events-none"
              >
                {rule.title.slice(0, 3).toUpperCase()}
              </text>
            </g>
          ))}

          {/* Center circle */}
          <circle cx={center} cy={center} r={innerRadius - 6}
            fill="rgba(9, 9, 11, 0.9)"
            stroke={`rgba(${glowRgb}, ${0.15 + (executionScore / 100) * 0.6})`}
            strokeWidth={1.5 + (executionScore / 100) * 1}
            style={{ transition: 'stroke 0.6s ease, stroke-width 0.6s ease' }}
          />

          {/* Center content */}
          {isTrapped ? (
            <>
              <text x={center} y={center - 8} textAnchor="middle" fill="#2dd4bf" fontSize="9" fontWeight="700" className="select-none uppercase">
                Traders
              </text>
              <text x={center} y={center + 6} textAnchor="middle" fill="#2dd4bf" fontSize="9" fontWeight="700" className="select-none uppercase">
                Trapped
              </text>
              <text x={center} y={center + 22} textAnchor="middle" fill="#2dd4bf" fontSize="10" fontWeight="600" className="select-none tabular-nums">
                {executionScore}%
              </text>
            </>
          ) : (
            <>
              <text x={center} y={center - 4} textAnchor="middle" fill="#fafafa" fontSize="22" fontWeight="bold" className="select-none tabular-nums">
                {checkedCount}/{totalRules}
              </text>
              <text x={center} y={center + 16} textAnchor="middle" fill={`rgb(${glowRgb})`} fontSize="10" className="select-none">
                {executionScore}%
              </text>
            </>
          )}
        </svg>
      </div>

      {/* Trade count — below wheel */}
      <div className="mt-3 flex items-center gap-1.5">
        <span className="text-[10px] text-zinc-500">Trades:</span>
        <span className="text-xs font-mono tabular-nums text-zinc-300">{completedTrades}/{maxTrades}</span>
      </div>
    </div>
  );
}

```

### ./src/components/trading/DisplacementTracker.jsx
```
import React, { useState } from 'react';
import { cn } from '@/lib/utils';

/**
 * Displacement Tracker — after a sweep, confirm displacement before entry.
 * Tracks: did you see displacement? How many points? Direction?
 * Only shows when there's a swept level (active hunt).
 */

export default function DisplacementTracker({ active, onConfirm }) {
  const [confirmed, setConfirmed] = useState(false);
  const [points, setPoints] = useState('');
  const [direction, setDirection] = useState(''); // 'bullish' | 'bearish'

  const handleConfirm = () => {
    setConfirmed(true);
    onConfirm?.({
      points: parseFloat(points) || 0,
      direction,
      time: new Date().toISOString(),
    });
  };

  const handleReset = () => {
    setConfirmed(false);
    setPoints('');
    setDirection('');
  };

  if (!active) return null;

  return (
    <div className={cn(
      'space-y-2 p-2.5 rounded-lg border transition-all',
      confirmed
        ? 'bg-teal-500/5 border-teal-500/30'
        : 'bg-amber-500/5 border-amber-500/20'
    )}>
      <div className="flex items-center justify-between">
        <h4 className="text-[10px] text-amber-400 uppercase tracking-wider font-medium">
          {confirmed ? '✓ Displacement Confirmed' : 'Awaiting Displacement'}
        </h4>
        {confirmed && (
          <button onClick={handleReset} className="text-[9px] text-zinc-500 hover:text-zinc-300">Reset</button>
        )}
      </div>

      {!confirmed ? (
        <div className="space-y-2">
          <p className="text-[10px] text-zinc-400">
            Sweep complete. Do you see aggressive displacement away from the level?
          </p>

          {/* Direction */}
          <div className="flex gap-1">
            <button
              onClick={() => setDirection('bullish')}
              className={cn(
                'flex-1 px-2 py-1.5 rounded text-[10px] font-medium border transition-all',
                direction === 'bullish'
                  ? 'bg-emerald-500/15 text-emerald-300 border-emerald-500/40'
                  : 'bg-zinc-800/50 text-zinc-500 border-zinc-700 hover:border-zinc-600'
              )}
            >
              Bullish ▲
            </button>
            <button
              onClick={() => setDirection('bearish')}
              className={cn(
                'flex-1 px-2 py-1.5 rounded text-[10px] font-medium border transition-all',
                direction === 'bearish'
                  ? 'bg-red-500/15 text-red-300 border-red-500/40'
                  : 'bg-zinc-800/50 text-zinc-500 border-zinc-700 hover:border-zinc-600'
              )}
            >
              Bearish ▼
            </button>
          </div>

          {/* Points of displacement */}
          <div className="flex items-center gap-2">
            <input
              type="number"
              value={points}
              onChange={(e) => setPoints(e.target.value)}
              placeholder="Points"
              className="flex-1 h-7 px-2 bg-zinc-900 border border-zinc-800 rounded text-[10px] text-zinc-300 tabular-nums focus:outline-none focus:border-teal-400/50"
            />
            <span className="text-[9px] text-zinc-500">pts displacement</span>
          </div>

          {/* Confirm button */}
          <button
            onClick={handleConfirm}
            disabled={!direction}
            className={cn(
              'w-full py-1.5 rounded text-[10px] font-medium border transition-all',
              direction
                ? 'bg-teal-500/10 border-teal-500/40 text-teal-400 hover:bg-teal-500/20'
                : 'bg-zinc-800/50 border-zinc-700 text-zinc-600 cursor-not-allowed'
            )}
          >
            Confirm Displacement
          </button>
        </div>
      ) : (
        <div className="flex items-center gap-3 text-[10px]">
          <span className={direction === 'bullish' ? 'text-emerald-400' : 'text-red-400'}>
            {direction === 'bullish' ? '▲ Bullish' : '▼ Bearish'}
          </span>
          {points && <span className="text-zinc-400 tabular-nums">{points} pts</span>}
          <span className="text-teal-400 font-medium">Ready for entry</span>
        </div>
      )}
    </div>
  );
}

```

### ./src/components/trading/EmaStatusToggle.jsx
```
import React from 'react';
import { cn } from '@/lib/utils';

export default function EmaStatusToggle({ direction, onChange }) {
  return (
    <div className="flex items-center gap-1">
      <span className="text-xs text-zinc-500 mr-1">EMA:</span>
      <button
        onClick={() => onChange(direction === 'above' ? null : 'above')}
        className={cn(
          'px-2 py-0.5 rounded text-xs font-medium transition-all',
          direction === 'above'
            ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
            : 'bg-zinc-800 text-zinc-500 border border-zinc-700 hover:border-zinc-600'
        )}
      >
        Above
      </button>
      <button
        onClick={() => onChange(direction === 'below' ? null : 'below')}
        className={cn(
          'px-2 py-0.5 rounded text-xs font-medium transition-all',
          direction === 'below'
            ? 'bg-red-500/20 text-red-300 border border-red-500/40'
            : 'bg-zinc-800 text-zinc-500 border border-zinc-700 hover:border-zinc-600'
        )}
      >
        Below
      </button>
    </div>
  );
}

```

### ./src/components/trading/EmergencyIntervention.jsx
```
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export default function EmergencyIntervention({ open, onClose }) {
  const [countdown, setCountdown] = useState(60);
  const [phase, setPhase] = useState('breathe'); // 'breathe' | 'reflect'
  const [breathCount, setBreathCount] = useState(0);
  const [breathPhase, setBreathPhase] = useState('in'); // 'in' | 'hold' | 'out'

  useEffect(() => {
    if (!open) return;
    setCountdown(60);
    setPhase('breathe');
    setBreathCount(0);
  }, [open]);

  useEffect(() => {
    if (!open || countdown <= 0) {
      if (countdown <= 0) setPhase('reflect');
      return;
    }
    const timer = setInterval(() => setCountdown(c => c - 1), 1000);
    return () => clearInterval(timer);
  }, [open, countdown]);

  // Breathing cycle: 4s in, 4s hold, 4s out
  useEffect(() => {
    if (!open || phase !== 'breathe') return;
    const cycle = () => {
      setBreathPhase('in');
      setTimeout(() => setBreathPhase('hold'), 4000);
      setTimeout(() => {
        setBreathPhase('out');
        setBreathCount(c => c + 1);
      }, 8000);
    };
    cycle();
    const interval = setInterval(cycle, 12000);
    return () => clearInterval(interval);
  }, [open, phase]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[100] bg-zinc-950/95 backdrop-blur-md flex items-center justify-center">
      <div className="max-w-md w-full p-8 text-center space-y-8 animate-fade-in">
        {/* Header */}
        <div className="space-y-2">
          <div className="w-16 h-16 mx-auto rounded-full bg-amber-500/20 border-2 border-amber-500/50 flex items-center justify-center">
            <svg className="w-8 h-8 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
          </div>
          <h2 className="text-xl font-bold text-amber-400">Circuit Breaker Active</h2>
          <p className="text-sm text-zinc-400">
            You activated the emergency intervention. Let's slow down.
          </p>
        </div>

        {/* Breathing Exercise */}
        {phase === 'breathe' && (
          <div className="space-y-6">
            <div className={cn(
              'w-32 h-32 mx-auto rounded-full border-4 transition-all duration-[4000ms] ease-in-out',
              'flex items-center justify-center',
              breathPhase === 'in' && 'scale-110 border-teal-400 bg-teal-500/10',
              breathPhase === 'hold' && 'scale-110 border-amber-400 bg-amber-500/10',
              breathPhase === 'out' && 'scale-90 border-zinc-600 bg-zinc-800/50',
            )}>
              <span className="text-lg font-medium text-zinc-200">
                {breathPhase === 'in' && 'Breathe In'}
                {breathPhase === 'hold' && 'Hold'}
                {breathPhase === 'out' && 'Breathe Out'}
              </span>
            </div>

            <div className="text-center">
              <p className="text-sm text-zinc-400">Cooldown: <span className="font-mono tabular-nums text-zinc-200">{countdown}s</span></p>
              <p className="text-xs text-zinc-600 mt-1">Breaths completed: {breathCount}</p>
            </div>
          </div>
        )}

        {/* Reflection Phase */}
        {phase === 'reflect' && (
          <div className="space-y-4">
            <p className="text-zinc-300 text-sm leading-relaxed">
              Good. You've taken a moment. Now ask yourself:
            </p>
            <div className="space-y-3 text-left">
              {[
                "Is this trade in my plan?",
                "Am I trading from emotion or analysis?",
                "Would I take this trade with a clear mind?",
                "What's the worst case, and can I accept it?",
              ].map((q, i) => (
                <div key={i} className="flex items-start gap-2 text-sm text-zinc-400">
                  <span className="text-teal-500 mt-0.5">?</span>
                  <span>{q}</span>
                </div>
              ))}
            </div>
            <Button onClick={onClose} className="mt-6 w-full">
              Return to Session
            </Button>
          </div>
        )}

        {/* Can still close during breathe phase if countdown done */}
        {phase === 'breathe' && countdown <= 0 && (
          <Button onClick={() => setPhase('reflect')} variant="outline">
            Continue to Reflection
          </Button>
        )}
      </div>
    </div>
  );
}

```

### ./src/components/trading/EndSessionDialog.jsx
```
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';

export default function EndSessionDialog({ open, onOpenChange, onConfirm, tradesCount, executionScore, onReflectionChange }) {
  const [answer, setAnswer] = useState('');

  const handleConfirm = () => {
    if (onReflectionChange) onReflectionChange(answer);
    onConfirm();
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-amber-400">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            End Trading Session?
          </DialogTitle>
          <DialogDescription>
            This will lock you out for 6 hours. Use this time to reflect and recharge.
          </DialogDescription>
        </DialogHeader>

        <div className="my-4 p-4 rounded-lg bg-zinc-800/50 border border-zinc-700/50 space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-zinc-400">Trades taken</span>
            <span className="text-zinc-200 font-mono tabular-nums">{tradesCount}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-zinc-400">Execution score</span>
            <span className="text-zinc-200 font-mono tabular-nums">{executionScore}%</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-zinc-400">Lockout until</span>
            <span className="text-zinc-200 font-mono tabular-nums">
              {new Date(Date.now() + 6 * 60 * 60 * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </span>
          </div>
        </div>

        {/* Mandatory reflection prompt */}
        <div className="space-y-2">
          <label className="text-xs font-medium text-zinc-300">
            If you could replay today, what's one thing you'd change?
          </label>
          <Textarea
            placeholder="e.g., I would have waited for the 5m confirmation instead of jumping in on the 1m..."
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            className="min-h-[60px] text-xs"
          />
          {answer.length === 0 && (
            <p className="text-[10px] text-amber-400/70">Required before ending session.</p>
          )}
        </div>

        <DialogFooter>
          <Button variant="ghost" onClick={() => onOpenChange(false)}>
            Keep Trading
          </Button>
          <Button
            variant="destructive"
            onClick={handleConfirm}
            disabled={answer.trim().length === 0}
          >
            End Session
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

```

### ./src/components/trading/EntryRuleButtons.jsx
```
import React from 'react';
import { cn } from '@/lib/utils';

export default function EntryRuleButtons({ rules, onToggle, onAdd, onDelete, onEdit, onReorder, disabled }) {
  const entryRules = rules.filter(r => r.category === 'entry');
  const enabledCount = entryRules.filter(r => r.enabled).length;
  const totalCount = entryRules.length;
  const score = totalCount > 0 ? Math.round((enabledCount / totalCount) * 100) : 0;
  const requiredCount = entryRules.filter(r => r.required).length;
  const requiredMet = entryRules.filter(r => r.required && r.enabled).length;

  const [showAdd, setShowAdd] = React.useState(false);
  const [newTitle, setNewTitle] = React.useState('');
  const [editMode, setEditMode] = React.useState(false);
  const [editingId, setEditingId] = React.useState(null);
  const [editTitle, setEditTitle] = React.useState('');

  const handleAdd = () => {
    if (!newTitle.trim()) return;
    onAdd({ title: newTitle.trim(), category: 'entry' });
    setNewTitle('');
    setShowAdd(false);
  };

  const handleEditSave = (ruleId) => {
    if (!editTitle.trim()) return;
    onEdit(ruleId, { title: editTitle.trim() });
    setEditingId(null);
    setEditTitle('');
  };

  const toggleRequired = (ruleId, currentRequired) => {
    onEdit(ruleId, { required: !currentRequired });
  };

  return (
    <div className="space-y-3">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <h3 className="text-sm font-medium text-zinc-300">Entry Rules</h3>
          {requiredCount > 0 && (
            <span className={cn(
              'text-[10px] px-1.5 py-0.5 rounded',
              requiredMet === requiredCount ? 'bg-emerald-500/10 text-emerald-400' : 'bg-amber-500/10 text-amber-400'
            )}>
              {requiredMet}/{requiredCount} req
            </span>
          )}
        </div>
        <div className="flex items-center gap-2">
          <span className={cn(
            'text-xs font-mono tabular-nums px-2 py-0.5 rounded',
            score >= 70 ? 'bg-teal-500/20 text-teal-300' :
            score >= 40 ? 'bg-amber-500/20 text-amber-300' :
            'bg-red-500/20 text-red-300'
          )}>
            {enabledCount}/{totalCount} ({score}%)
          </span>
          <button
            onClick={() => { setEditMode(!editMode); setEditingId(null); }}
            className={cn('p-1 rounded transition-colors', editMode ? 'text-teal-400 bg-teal-500/10' : 'text-zinc-500 hover:text-zinc-300')}
            title={editMode ? 'Done editing' : 'Edit rules'}
          >
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.066 2.573c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.573 1.066c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.066-2.573c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </button>
          {editMode && (
            <button onClick={() => setShowAdd(!showAdd)} className="text-xs text-teal-400 hover:text-teal-300 px-1.5 py-0.5 rounded hover:bg-teal-500/10">+ Add</button>
          )}
        </div>
      </div>

      {/* Add form */}
      {showAdd && editMode && (
        <div className="flex items-center gap-2 animate-fade-in">
          <input
            type="text"
            placeholder="New entry rule..."
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            onKeyDown={(e) => { if (e.key === 'Enter') handleAdd(); if (e.key === 'Escape') { setShowAdd(false); setNewTitle(''); } }}
            autoFocus
            className="flex-1 h-8 px-3 py-1 rounded-md border border-zinc-700 bg-zinc-800/50 text-sm text-zinc-100 placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-teal-500/50 focus:border-teal-500"
          />
          <button onClick={handleAdd} disabled={!newTitle.trim()} className="h-8 px-3 rounded-md bg-teal-500 text-zinc-950 text-xs font-medium disabled:opacity-50">Add</button>
          <button onClick={() => { setShowAdd(false); setNewTitle(''); }} className="h-8 px-2 text-xs text-zinc-500">Cancel</button>
        </div>
      )}

      {/* Rules list */}
      <div className={cn('gap-2', editMode ? 'space-y-2' : 'grid grid-cols-1 sm:grid-cols-2 gap-2')}>
        {entryRules.map((rule, idx) => {
          const isFirst = idx === 0;
          const isLast = idx === entryRules.length - 1;

          return (
            <div key={rule.id}>
              {editingId === rule.id ? (
                <div className="flex items-center gap-1.5 px-2 py-1.5 rounded-lg border border-teal-500/50 bg-zinc-800/50">
                  <input type="text" value={editTitle} onChange={(e) => setEditTitle(e.target.value)}
                    onKeyDown={(e) => { if (e.key === 'Enter') handleEditSave(rule.id); if (e.key === 'Escape') { setEditingId(null); setEditTitle(''); } }}
                    autoFocus className="flex-1 h-6 px-1.5 bg-transparent text-sm text-zinc-100 focus:outline-none" />
                  <button onClick={() => handleEditSave(rule.id)} className="text-[10px] text-teal-400 px-1">Save</button>
                  <button onClick={() => { setEditingId(null); setEditTitle(''); }} className="text-[10px] text-zinc-500 px-1">Cancel</button>
                </div>
              ) : editMode ? (
                <div className={cn('flex items-center gap-2 px-3 py-2 rounded-lg border text-sm', rule.required ? 'border-amber-500/30 bg-amber-500/5' : 'border-zinc-700 bg-zinc-800/30')}>
                  <div className="flex flex-col gap-0.5 flex-shrink-0">
                    <button onClick={() => onReorder(rule.id, 'up')} disabled={isFirst} className={cn('p-0.5 rounded', isFirst ? 'text-zinc-700' : 'text-zinc-500 hover:text-zinc-200')}>
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" /></svg>
                    </button>
                    <button onClick={() => onReorder(rule.id, 'down')} disabled={isLast} className={cn('p-0.5 rounded', isLast ? 'text-zinc-700' : 'text-zinc-500 hover:text-zinc-200')}>
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg>
                    </button>
                  </div>
                  <span className="flex-1 text-zinc-300 truncate">{rule.title}</span>
                  <div className="flex items-center gap-1 flex-shrink-0">
                    <button onClick={() => toggleRequired(rule.id, rule.required)} className={cn('p-1.5 rounded', rule.required ? 'text-amber-400' : 'text-zinc-600 hover:text-amber-400')}>
                      <svg className="w-3.5 h-3.5" fill={rule.required ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24" strokeWidth={rule.required ? 0 : 2}><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" /></svg>
                    </button>
                    <button onClick={() => { setEditingId(rule.id); setEditTitle(rule.title); }} className="p-1.5 rounded text-zinc-600 hover:text-zinc-200">
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
                    </button>
                    <button onClick={() => onDelete(rule.id)} className="p-1.5 rounded text-zinc-600 hover:text-red-400">
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                    </button>
                  </div>
                </div>
              ) : (
                /* Trading mode — instant tap to toggle */
                <button
                  onClick={() => !disabled && onToggle(rule.id)}
                  disabled={disabled}
                  className={cn(
                    'w-full flex items-center gap-2 px-3 py-2.5 rounded-lg border text-left',
                    'transition-all duration-200 text-sm select-none',
                    rule.enabled
                      ? 'border-teal-500/50 bg-teal-500/10 text-teal-200'
                      : rule.required
                      ? 'border-amber-500/30 bg-amber-500/5 text-zinc-400'
                      : 'border-zinc-700 bg-zinc-800/30 text-zinc-400 hover:border-zinc-600',
                    disabled && 'opacity-50 cursor-not-allowed'
                  )}
                >
                  <div className={cn(
                    'w-4 h-4 rounded border-2 flex items-center justify-center flex-shrink-0',
                    rule.enabled ? 'border-teal-500 bg-teal-500' : 'border-zinc-600'
                  )}>
                    {rule.enabled && (
                      <svg className="w-3 h-3 text-zinc-950" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    )}
                  </div>
                  <span className="truncate flex-1">{rule.title}</span>
                  {rule.required && (
                    <span className="text-amber-400 flex-shrink-0">
                      <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" /></svg>
                    </span>
                  )}
                </button>
              )}
            </div>
          );
        })}
      </div>

      {totalCount === 0 && (
        <p className="text-xs text-zinc-500 italic">No entry rules configured. {editMode ? 'Click "+ Add" above.' : 'Tap the gear icon to add rules.'}</p>
      )}
    </div>
  );
}

```

### ./src/components/trading/EquityCurve.jsx
```
import React, { useState, useEffect } from 'react';
import { TradingSession, Trade } from '@/api/db';
import { cn } from '@/lib/utils';

export default function EquityCurve() {
  const [data, setData] = useState({ all: [], aplus: [] });

  useEffect(() => {
    async function load() {
      const sessions = await TradingSession.list({ status: 'ended' });
      sessions.sort((a, b) => new Date(a.created_date) - new Date(b.created_date));

      let cumAll = 0;
      let cumAplus = 0;
      const allPoints = [{ x: 0, y: 0 }];
      const aplusPoints = [{ x: 0, y: 0 }];

      let tradeIdx = 0;
      for (const sess of sessions) {
        const trades = await Trade.list({ session_id: sess.id });
        trades.sort((a, b) => (a.slot_index || 0) - (b.slot_index || 0));
        for (const t of trades) {
          tradeIdx++;
          cumAll += t.pnl || 0;
          allPoints.push({ x: tradeIdx, y: cumAll });

          const isAplus = t.rule_compliance?.length > 0 && t.rule_compliance.every(r => r.followed);
          if (isAplus) {
            cumAplus += t.pnl || 0;
          }
          aplusPoints.push({ x: tradeIdx, y: cumAplus });
        }
      }
      setData({ all: allPoints, aplus: aplusPoints });
    }
    load();
  }, []);

  if (data.all.length <= 1) {
    return <p className="text-xs text-zinc-600 italic text-center py-4">Need more trades to show equity curve.</p>;
  }

  // SVG dimensions
  const w = 500, h = 160, pad = 30;
  const maxTrades = data.all[data.all.length - 1].x;
  const allYs = [...data.all.map(p => p.y), ...data.aplus.map(p => p.y)];
  const minY = Math.min(0, ...allYs);
  const maxY = Math.max(0, ...allYs);
  const yRange = maxY - minY || 1;

  const toSvg = (point) => ({
    x: pad + (point.x / (maxTrades || 1)) * (w - 2 * pad),
    y: pad + (1 - (point.y - minY) / yRange) * (h - 2 * pad),
  });

  const pathFromPoints = (points) => {
    return points.map((p, i) => {
      const { x, y } = toSvg(p);
      return `${i === 0 ? 'M' : 'L'} ${x} ${y}`;
    }).join(' ');
  };

  const zeroY = toSvg({ x: 0, y: 0 }).y;

  return (
    <div className="w-full overflow-x-auto">
      <svg viewBox={`0 0 ${w} ${h}`} className="w-full h-40">
        {/* Zero line */}
        <line x1={pad} y1={zeroY} x2={w - pad} y2={zeroY} stroke="#3f3f46" strokeWidth={0.5} strokeDasharray="4 2" />

        {/* All trades line */}
        <path d={pathFromPoints(data.all)} fill="none" stroke="#71717a" strokeWidth={1.5} />

        {/* A+ trades line */}
        <path d={pathFromPoints(data.aplus)} fill="none" stroke="#2dd4bf" strokeWidth={2} />

        {/* End labels */}
        {data.all.length > 1 && (
          <text x={w - pad + 4} y={toSvg(data.all[data.all.length - 1]).y + 3} fill="#71717a" fontSize="9">
            ${data.all[data.all.length - 1].y >= 0 ? '+' : ''}{data.all[data.all.length - 1].y.toFixed(0)}
          </text>
        )}
        {data.aplus.length > 1 && (
          <text x={w - pad + 4} y={toSvg(data.aplus[data.aplus.length - 1]).y + 3} fill="#2dd4bf" fontSize="9">
            ${data.aplus[data.aplus.length - 1].y >= 0 ? '+' : ''}{data.aplus[data.aplus.length - 1].y.toFixed(0)}
          </text>
        )}

        {/* Y axis labels */}
        <text x={2} y={pad + 3} fill="#52525b" fontSize="8">${maxY.toFixed(0)}</text>
        <text x={2} y={h - pad + 3} fill="#52525b" fontSize="8">${minY.toFixed(0)}</text>
        <text x={2} y={zeroY + 3} fill="#52525b" fontSize="8">$0</text>
      </svg>

      {/* Legend */}
      <div className="flex items-center justify-center gap-4 mt-1">
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-0.5 bg-zinc-500 rounded" />
          <span className="text-[9px] text-zinc-500">All trades</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-0.5 bg-teal-400 rounded" />
          <span className="text-[9px] text-teal-400">A+ trades only</span>
        </div>
      </div>
    </div>
  );
}

```

### ./src/components/trading/ExecuteConfirmDialog.jsx
```
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export default function ExecuteConfirmDialog({ open, onOpenChange, rules, onConfirm }) {
  const entryRules = rules.filter(r => r.category === 'entry' && r.enabled);
  const allRules = rules.filter(r => r.category === 'entry');

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <svg className="w-5 h-5 text-teal-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Confirm Trade Execution
          </DialogTitle>
          <DialogDescription>
            Review your checked entry rules before executing.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-3 my-4">
          <div className="text-xs text-zinc-400 uppercase tracking-wider font-medium">
            Active Entry Rules ({entryRules.length}/{allRules.length})
          </div>
          
          <div className="space-y-2 max-h-48 overflow-y-auto">
            {allRules.map((rule) => (
              <div
                key={rule.id}
                className={cn(
                  'flex items-center gap-2 px-3 py-2 rounded-md text-sm',
                  rule.enabled
                    ? 'bg-teal-500/10 border border-teal-500/30 text-teal-200'
                    : 'bg-zinc-800/50 border border-zinc-700/50 text-zinc-500'
                )}
              >
                <div className={cn(
                  'w-3.5 h-3.5 rounded-full flex-shrink-0',
                  rule.enabled ? 'bg-teal-500' : 'bg-zinc-700'
                )} />
                <span>{rule.title}</span>
                {!rule.enabled && (
                  <span className="ml-auto text-xs text-zinc-600">skipped</span>
                )}
              </div>
            ))}
          </div>

          {entryRules.length < allRules.length && (
            <p className="text-xs text-amber-400/80 mt-2">
              Note: {allRules.length - entryRules.length} entry rule(s) not checked. Proceeding anyway.
            </p>
          )}
        </div>

        <div className="p-3 rounded-lg bg-zinc-800/50 border border-zinc-700/50">
          <p className="text-xs text-zinc-400 leading-relaxed">
            Executing this trade will log it to your discipline wheel. After saving trade details, 
            all rules will reset to unchecked — you'll need to re-confirm before the next trade.
          </p>
        </div>

        <DialogFooter>
          <Button variant="ghost" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={onConfirm}>
            Execute Trade
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

```

### ./src/components/trading/KillZoneBadge.jsx
```
import React, { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

/**
 * Kill Zone Awareness — auto-detects current trading session based on NY time.
 * Shows colored badge: green if in an active KZ, red if outside.
 */

const KILL_ZONES = [
  { name: 'Asia', start: '20:00', end: '00:00', color: 'text-purple-400', bg: 'bg-purple-500/10', border: 'border-purple-500/30' },
  { name: 'London Open', start: '03:00', end: '05:00', color: 'text-blue-400', bg: 'bg-blue-500/10', border: 'border-blue-500/30' },
  { name: 'NY Open', start: '09:30', end: '11:00', color: 'text-emerald-400', bg: 'bg-emerald-500/10', border: 'border-emerald-500/30' },
  { name: 'NY Lunch', start: '12:00', end: '13:30', color: 'text-amber-400', bg: 'bg-amber-500/10', border: 'border-amber-500/30' },
  { name: 'NY PM', start: '14:00', end: '15:30', color: 'text-teal-400', bg: 'bg-teal-500/10', border: 'border-teal-500/30' },
];

function getNYMinutes() {
  const ny = new Date().toLocaleString('en-US', { timeZone: 'America/New_York', hour: 'numeric', minute: 'numeric', hour12: false });
  const [h, m] = ny.split(':').map(Number);
  return h * 60 + m;
}

function parseMinutes(timeStr) {
  const [h, m] = timeStr.split(':').map(Number);
  return h * 60 + m;
}

function getActiveKillZone() {
  const now = getNYMinutes();
  for (const kz of KILL_ZONES) {
    const start = parseMinutes(kz.start);
    const end = parseMinutes(kz.end);
    // Handle overnight (Asia crosses midnight)
    if (start > end) {
      if (now >= start || now <= end) return kz;
    } else {
      if (now >= start && now <= end) return kz;
    }
  }
  return null;
}

export default function KillZoneBadge() {
  const [activeKZ, setActiveKZ] = useState(getActiveKillZone);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveKZ(getActiveKillZone());
    }, 30000); // Check every 30s
    return () => clearInterval(interval);
  }, []);

  if (activeKZ) {
    return (
      <span className={cn('text-[10px] px-1.5 py-0.5 rounded font-medium border', activeKZ.bg, activeKZ.color, activeKZ.border)}>
        {activeKZ.name}
      </span>
    );
  }

  return (
    <span className="text-[10px] px-1.5 py-0.5 rounded font-medium bg-red-500/10 text-red-400 border border-red-500/30">
      Outside KZ
    </span>
  );
}

```

### ./src/components/trading/LevelPanel.jsx
```
import React, { useMemo } from 'react';
import { cn } from '@/lib/utils';

/**
 * Parses price levels from free-text session fields.
 * Looks for patterns like: "BSL at 5480", "VAH: 5465", "5420 SSL", "equal lows at 5395"
 */
function parseLevels(session) {
  if (!session) return [];

  const levels = [];
  const sources = [
    { text: session.liquidity_pools || '', category: 'liquidity' },
    { text: session.likely_target || '', category: 'target' },
    { text: session.value_areas || '', category: 'value' },
  ];

  // Regex patterns to extract label + price
  const patterns = [
    // "BSL at 5480" or "SSL at 5420"
    /\b([A-Za-z/\s]{1,20})\s*(?:at|@|:)\s*\$?(\d+\.?\d*)/gi,
    // "5480 BSL" or "5420.50 level"
    /\$?(\d+\.?\d*)\s+([A-Za-z/\s]{1,20})/gi,
    // "VAH: 5465" or "POC: 5445"
    /\b([A-Z]{2,6})\s*[:=]\s*\$?(\d+\.?\d*)/gi,
  ];

  for (const source of sources) {
    if (!source.text) continue;

    // Split by common delimiters
    const segments = source.text.split(/[,;\n]+/);

    for (const segment of segments) {
      const trimmed = segment.trim();
      if (!trimmed) continue;

      let matched = false;

      // Try pattern 3 first (most specific: "VAH: 5465")
      const p3 = /\b([A-Z]{2,6})\s*[:=]\s*\$?(\d+\.?\d*)/i;
      const m3 = trimmed.match(p3);
      if (m3) {
        levels.push({ label: m3[1].trim().toUpperCase(), price: parseFloat(m3[2]), category: source.category });
        matched = true;
      }

      // Try pattern 1: "label at/@ price"
      if (!matched) {
        const p1 = /\b(.+?)\s*(?:at|@)\s*\$?(\d+\.?\d*)/i;
        const m1 = trimmed.match(p1);
        if (m1) {
          levels.push({ label: m1[1].trim(), price: parseFloat(m1[2]), category: source.category });
          matched = true;
        }
      }

      // Try pattern 2: "price label"
      if (!matched) {
        const p2 = /\$?(\d{3,6}\.?\d*)\s+(.+)/;
        const m2 = trimmed.match(p2);
        if (m2) {
          levels.push({ label: m2[2].trim(), price: parseFloat(m2[1]), category: source.category });
          matched = true;
        }
      }

      // Last resort: just find a number
      if (!matched) {
        const numMatch = trimmed.match(/\$?(\d{3,6}\.?\d*)/);
        if (numMatch) {
          levels.push({ label: trimmed.replace(numMatch[0], '').trim() || 'Level', price: parseFloat(numMatch[1]), category: source.category });
        }
      }
    }
  }

  // Deduplicate by price and sort descending
  const seen = new Set();
  const unique = levels.filter(l => {
    if (seen.has(l.price)) return false;
    seen.add(l.price);
    return true;
  });

  return unique.sort((a, b) => b.price - a.price);
}

const CATEGORY_COLORS = {
  liquidity: { bg: 'bg-purple-500/10', border: 'border-purple-500/30', text: 'text-purple-300', dot: 'bg-purple-400' },
  target: { bg: 'bg-amber-500/10', border: 'border-amber-500/30', text: 'text-amber-300', dot: 'bg-amber-400' },
  value: { bg: 'bg-blue-500/10', border: 'border-blue-500/30', text: 'text-blue-300', dot: 'bg-blue-400' },
};

export default function LevelPanel({ session }) {
  const levels = useMemo(() => parseLevels(session), [session]);

  if (levels.length === 0) return null;

  return (
    <div className="flex flex-col border-r border-zinc-800/30 w-28 flex-shrink-0 overflow-y-auto bg-zinc-950/50">
      {/* Header */}
      <div className="px-2 py-1.5 border-b border-zinc-800/30">
        <span className="text-[9px] text-zinc-500 uppercase tracking-wider font-medium">Levels</span>
      </div>

      {/* Level list */}
      <div className="flex-1 px-1 py-1 space-y-0.5">
        {levels.map((level, idx) => {
          const colors = CATEGORY_COLORS[level.category] || CATEGORY_COLORS.value;
          return (
            <div
              key={idx}
              className={cn(
                'flex items-center gap-1 px-1.5 py-1 rounded text-[9px]',
                colors.bg, 'border', colors.border
              )}
              title={`${level.label}: ${level.price}`}
            >
              <div className={cn('w-1 h-1 rounded-full flex-shrink-0', colors.dot)} />
              <span className={cn('font-mono tabular-nums font-medium', colors.text)}>
                {level.price % 1 === 0 ? level.price.toFixed(0) : level.price.toFixed(2)}
              </span>
              <span className="text-zinc-500 truncate ml-auto text-[8px]">
                {level.label.length > 6 ? level.label.slice(0, 6) : level.label}
              </span>
            </div>
          );
        })}
      </div>

      {/* Legend */}
      <div className="px-2 py-1 border-t border-zinc-800/30 space-y-0.5">
        <div className="flex items-center gap-1">
          <div className="w-1.5 h-1.5 rounded-full bg-purple-400" />
          <span className="text-[8px] text-zinc-600">Liquidity</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-1.5 h-1.5 rounded-full bg-amber-400" />
          <span className="text-[8px] text-zinc-600">Target</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-1.5 h-1.5 rounded-full bg-blue-400" />
          <span className="text-[8px] text-zinc-600">Value Area</span>
        </div>
      </div>
    </div>
  );
}

```

### ./src/components/trading/LevelQueue.jsx
```
import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { playSweepSound } from '@/lib/sweepSound';

/**
 * Multi-Level Queue — watch multiple liquidity levels simultaneously.
 * Each level has: price, label, side (BSL/SSL), status (watching/sweeping/swept).
 * Persisted to localStorage.
 */

const STORAGE_KEY = 'tcai_level_queue';

function loadQueue() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch { return []; }
}

function saveQueue(queue) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(queue));
}

const STATUS_STYLES = {
  watching: { label: 'Watching', color: 'text-zinc-400', bg: 'bg-zinc-800/50', border: 'border-zinc-700' },
  sweeping: { label: 'Sweeping', color: 'text-amber-400', bg: 'bg-amber-500/10', border: 'border-amber-500/30' },
  swept: { label: 'Swept', color: 'text-teal-400', bg: 'bg-teal-500/10', border: 'border-teal-500/30' },
};

export default function LevelQueue({ onLevelSwept }) {
  const [queue, setQueue] = useState(loadQueue);
  const [showAdd, setShowAdd] = useState(false);
  const [form, setForm] = useState({ label: '', price: '', side: 'ssl' });

  const handleAdd = () => {
    if (!form.price) return;
    const updated = [...queue, {
      id: Date.now().toString(),
      label: form.label || (form.side === 'bsl' ? 'BSL' : 'SSL'),
      price: form.price,
      side: form.side,
      status: 'watching',
    }];
    setQueue(updated);
    saveQueue(updated);
    setForm({ label: '', price: '', side: 'ssl' });
    setShowAdd(false);
  };

  const updateStatus = (id, status) => {
    const updated = queue.map(l => l.id === id ? { ...l, status } : l);
    setQueue(updated);
    saveQueue(updated);
    if (status === 'swept') {
      playSweepSound();
      const level = updated.find(l => l.id === id);
      onLevelSwept?.(level);
    }
  };

  const removeLevel = (id) => {
    const updated = queue.filter(l => l.id !== id);
    setQueue(updated);
    saveQueue(updated);
  };

  const resetAll = () => {
    const updated = queue.map(l => ({ ...l, status: 'watching' }));
    setQueue(updated);
    saveQueue(updated);
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <h4 className="text-[10px] text-zinc-500 uppercase tracking-wider font-medium">Level Queue</h4>
        <div className="flex items-center gap-1">
          {queue.length > 0 && (
            <button onClick={resetAll} className="text-[9px] text-zinc-600 hover:text-zinc-400">Reset</button>
          )}
          <button onClick={() => setShowAdd(!showAdd)} className="text-[10px] text-teal-400 hover:text-teal-300">
            {showAdd ? 'Cancel' : '+ Add'}
          </button>
        </div>
      </div>

      {/* Add form */}
      {showAdd && (
        <div className="flex gap-1 items-end animate-fade-in">
          <input
            value={form.label}
            onChange={(e) => setForm({ ...form, label: e.target.value })}
            placeholder="Label"
            className="w-16 h-7 px-1.5 bg-zinc-900 border border-zinc-800 rounded text-[10px] text-zinc-300 focus:outline-none focus:border-teal-400/50"
          />
          <input
            type="number"
            value={form.price}
            onChange={(e) => setForm({ ...form, price: e.target.value })}
            placeholder="Price"
            className="w-20 h-7 px-1.5 bg-zinc-900 border border-zinc-800 rounded text-[10px] text-zinc-300 tabular-nums focus:outline-none focus:border-teal-400/50"
          />
          <select
            value={form.side}
            onChange={(e) => setForm({ ...form, side: e.target.value })}
            className="h-7 px-1 bg-zinc-900 border border-zinc-800 rounded text-[10px] text-zinc-300 focus:outline-none focus:border-teal-400/50"
          >
            <option value="ssl">SSL</option>
            <option value="bsl">BSL</option>
          </select>
          <button onClick={handleAdd} className="h-7 px-2 rounded text-[9px] font-medium bg-teal-400/10 border border-teal-400/50 text-teal-400">Add</button>
        </div>
      )}

      {/* Queue list */}
      <div className="space-y-1">
        {queue.map((level) => {
          const style = STATUS_STYLES[level.status];
          return (
            <div key={level.id} className={cn(
              'flex items-center gap-1.5 px-2 py-1.5 rounded border group transition-all',
              style.bg, style.border,
              level.status === 'sweeping' && 'animate-pulse-glow'
            )}>
              {/* Side indicator */}
              <span className={cn('text-[9px] font-bold', level.side === 'bsl' ? 'text-emerald-400' : 'text-red-400')}>
                {level.side === 'bsl' ? '▲' : '▼'}
              </span>

              {/* Label + Price */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1">
                  <span className="text-[10px] text-zinc-300 truncate">{level.label}</span>
                  <span className="text-[10px] tabular-nums text-zinc-400">{level.price}</span>
                </div>
              </div>

              {/* Status cycle buttons */}
              <div className="flex items-center gap-0.5">
                {level.status === 'watching' && (
                  <button onClick={() => updateStatus(level.id, 'sweeping')} className="text-[8px] px-1.5 py-0.5 rounded bg-amber-500/10 border border-amber-500/30 text-amber-400 hover:bg-amber-500/20">
                    Sweeping
                  </button>
                )}
                {level.status === 'sweeping' && (
                  <button onClick={() => updateStatus(level.id, 'swept')} className="text-[8px] px-1.5 py-0.5 rounded bg-teal-500/10 border border-teal-500/30 text-teal-400 hover:bg-teal-500/20">
                    Swept ✓
                  </button>
                )}
                {level.status === 'swept' && (
                  <span className="text-[8px] px-1.5 py-0.5 rounded bg-teal-500/10 text-teal-400 font-medium">✓ Swept</span>
                )}
              </div>

              {/* Remove */}
              <button onClick={() => removeLevel(level.id)} className="opacity-0 group-hover:opacity-100 text-zinc-600 hover:text-red-400 text-[10px] transition-opacity">✕</button>
            </div>
          );
        })}
      </div>

      {queue.length === 0 && !showAdd && (
        <p className="text-[10px] text-zinc-600 italic">No levels queued. Add levels you're watching.</p>
      )}
    </div>
  );
}

```

### ./src/components/trading/LiquidityTargetToggle.jsx
```
import React from 'react';
import { cn } from '@/lib/utils';

/**
 * Liquidity Target Selector — replaces EMA Above/Below.
 * BSL = Buy-Side Liquidity (hunting stops above highs, expecting reversal down)
 * SSL = Sell-Side Liquidity (hunting stops below lows, expecting reversal up)
 * Both = pools on both sides, watching for whichever gets taken first
 *
 * Values: 'bsl' | 'ssl' | 'both' | null
 */
export default function LiquidityTargetToggle({ target, onChange }) {
  return (
    <div className="flex items-center gap-1">
      <button
        onClick={() => onChange(target === 'bsl' ? null : 'bsl')}
        className={cn(
          'px-2.5 py-1 rounded text-[11px] font-medium transition-all border',
          target === 'bsl'
            ? 'bg-emerald-500/15 text-emerald-300 border-emerald-500/40 shadow-sm shadow-emerald-500/10'
            : 'bg-zinc-800/50 text-zinc-500 border-zinc-700/50 hover:border-zinc-600 hover:text-zinc-400'
        )}
      >
        BSL ▲
      </button>
      <button
        onClick={() => onChange(target === 'ssl' ? null : 'ssl')}
        className={cn(
          'px-2.5 py-1 rounded text-[11px] font-medium transition-all border',
          target === 'ssl'
            ? 'bg-red-500/15 text-red-300 border-red-500/40 shadow-sm shadow-red-500/10'
            : 'bg-zinc-800/50 text-zinc-500 border-zinc-700/50 hover:border-zinc-600 hover:text-zinc-400'
        )}
      >
        SSL ▼
      </button>
      <button
        onClick={() => onChange(target === 'both' ? null : 'both')}
        className={cn(
          'px-2.5 py-1 rounded text-[11px] font-medium transition-all border',
          target === 'both'
            ? 'bg-amber-500/15 text-amber-300 border-amber-500/40 shadow-sm shadow-amber-500/10'
            : 'bg-zinc-800/50 text-zinc-500 border-zinc-700/50 hover:border-zinc-600 hover:text-zinc-400'
        )}
      >
        Both ◆
      </button>
    </div>
  );
}

```

### ./src/components/trading/LockedScreen.jsx
```
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export default function LockedScreen({ lockoutUntil, onExpired, onGoToReflection }) {
  const [timeLeft, setTimeLeft] = useState('');
  const [expired, setExpired] = useState(false);

  useEffect(() => {
    const update = () => {
      const now = Date.now();
      const until = new Date(lockoutUntil).getTime();
      const diff = until - now;

      if (diff <= 0) {
        setExpired(true);
        setTimeLeft('00:00:00');
        onExpired?.();
        return;
      }

      const hours = Math.floor(diff / (1000 * 60 * 60)).toString().padStart(2, '0');
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)).toString().padStart(2, '0');
      const seconds = Math.floor((diff % (1000 * 60)) / 1000).toString().padStart(2, '0');
      setTimeLeft(`${hours}:${minutes}:${seconds}`);
    };

    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, [lockoutUntil, onExpired]);

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="max-w-md w-full text-center space-y-8 animate-fade-in">
        {/* Lock Icon */}
        <div className="relative mx-auto w-24 h-24">
          <div className="absolute inset-0 rounded-full bg-amber-500/10 animate-pulse-glow" />
          <div className="relative w-full h-full rounded-full border-2 border-amber-500/50 flex items-center justify-center">
            <svg className="w-10 h-10 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2" strokeWidth="2" />
              <path d="M7 11V7a5 5 0 0 1 10 0v4" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </div>
        </div>

        {/* Message */}
        <div className="space-y-2">
          <h1 className="text-2xl font-bold text-zinc-100">Session Locked</h1>
          <p className="text-zinc-400 text-sm">
            Your trading session has ended. Use this time to rest, reflect, and recharge.
          </p>
        </div>

        {/* Timer */}
        <div className="space-y-1">
          <p className="text-xs text-zinc-500 uppercase tracking-wider">Unlocks in</p>
          <p className="text-4xl font-mono font-bold tabular-nums text-amber-400">
            {timeLeft}
          </p>
        </div>

        {/* Actions */}
        <div className="space-y-3">
          {onGoToReflection && (
            <Button onClick={onGoToReflection} variant="outline" className="w-full">
              View Reflection
            </Button>
          )}
          {expired && (
            <Button onClick={onExpired} className="w-full">
              Start New Session
            </Button>
          )}
        </div>

        {/* Tips */}
        <div className="text-xs text-zinc-600 space-y-1">
          <p>While locked, consider:</p>
          <p>- Review your journal</p>
          <p>- Exercise or meditate</p>
          <p>- Step away from screens</p>
        </div>
      </div>
    </div>
  );
}

```

### ./src/components/trading/MotivationalPhrase.jsx
```
import React, { useState, useEffect } from 'react';

const PHRASES = [
  "Process over profits.",
  "One trade at a time.",
  "Trust your rules.",
  "Patience is edge.",
  "Discipline = Freedom.",
  "The market rewards patience.",
  "Trade the plan.",
  "Less is more.",
  "Quality over quantity.",
  "Protect your capital.",
  "Emotions are data.",
  "Wait for your pitch.",
];

export default function MotivationalPhrase({ hidden }) {
  const [index, setIndex] = useState(0);
  const [fade, setFade] = useState(true);

  useEffect(() => {
    if (hidden) return;
    const interval = setInterval(() => {
      setFade(false);
      setTimeout(() => {
        setIndex(prev => (prev + 1) % PHRASES.length);
        setFade(true);
      }, 300);
    }, 8000);
    return () => clearInterval(interval);
  }, [hidden]);

  if (hidden) return null;

  return (
    <div className={`text-xs text-zinc-600 italic transition-opacity duration-300 ${fade ? 'opacity-100' : 'opacity-0'}`}>
      {PHRASES[index]}
    </div>
  );
}

```

### ./src/components/trading/NotificationSettings.jsx
```
import React, { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { cn } from '@/lib/utils';
import {
  requestPermission,
  getNotificationSettings,
  saveNotificationSettings,
  sendNotification,
} from '@/lib/notifications';

export default function NotificationSettings() {
  const [settings, setSettings] = useState(getNotificationSettings);
  const [permissionStatus, setPermissionStatus] = useState(
    typeof Notification !== 'undefined' ? Notification.permission : 'denied'
  );

  useEffect(() => {
    saveNotificationSettings(settings);
  }, [settings]);

  const handleEnable = async (enabled) => {
    if (enabled) {
      const granted = await requestPermission();
      if (!granted) {
        setPermissionStatus(Notification.permission);
        return;
      }
      setPermissionStatus('granted');
      // Send a test notification
      sendNotification('Notifications Enabled', 'You will receive trading reminders at your scheduled times.', 'test');
    }
    setSettings(prev => ({ ...prev, enabled }));
  };

  const update = (key, value) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  return (
    <div className="space-y-3 p-3 rounded-lg bg-zinc-800/30 border border-zinc-800">
      <div className="flex items-center justify-between">
        <div>
          <Label className="text-xs">Push Notifications</Label>
          <p className="text-[10px] text-zinc-600 mt-0.5">Motivational reminders + rule alerts</p>
        </div>
        <Switch
          checked={settings.enabled}
          onCheckedChange={handleEnable}
        />
      </div>

      {permissionStatus === 'denied' && settings.enabled && (
        <p className="text-[10px] text-red-400">Browser blocked notifications. Enable in browser settings.</p>
      )}

      {settings.enabled && permissionStatus === 'granted' && (
        <div className="space-y-3 pt-2 border-t border-zinc-800/50 animate-fade-in">
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <Label className="text-[10px]">Session Start</Label>
              <Input
                type="time"
                value={settings.sessionStartTime}
                onChange={(e) => update('sessionStartTime', e.target.value)}
                className="h-8 text-xs"
              />
            </div>
            <div className="space-y-1">
              <Label className="text-[10px]">Session End</Label>
              <Input
                type="time"
                value={settings.sessionEndTime}
                onChange={(e) => update('sessionEndTime', e.target.value)}
                className="h-8 text-xs"
              />
            </div>
          </div>

          <div className="space-y-1">
            <Label className="text-[10px]">Rule Reminder Interval (minutes)</Label>
            <Input
              type="number"
              min={5}
              max={60}
              step={5}
              value={settings.reminderIntervalMinutes}
              onChange={(e) => update('reminderIntervalMinutes', Math.max(5, Number(e.target.value) || 15))}
              className="h-8 text-xs"
            />
            <p className="text-[10px] text-zinc-600">
              During trading hours, sends reminders about your specific rules every {settings.reminderIntervalMinutes} min.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

```

### ./src/components/trading/OtherRulesDropdown.jsx
```
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectOption } from '@/components/ui/select';
import { cn } from '@/lib/utils';

const NON_ENTRY_CATEGORIES = ['filter', 'risk', 'management', 'psychology'];

export default function OtherRulesDropdown({ rules, onToggle, onAdd, onDelete }) {
  const [isOpen, setIsOpen] = useState(false);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newCategory, setNewCategory] = useState('filter');

  const otherRules = rules.filter(r => r.category !== 'entry');

  const handleAdd = () => {
    if (!newTitle.trim()) return;
    onAdd({ title: newTitle.trim(), category: newCategory });
    setNewTitle('');
    setShowAddForm(false);
  };

  return (
    <div className="space-y-2">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 text-sm text-zinc-400 hover:text-zinc-200 transition-colors"
      >
        <svg
          className={cn('w-4 h-4 transition-transform', isOpen && 'rotate-90')}
          fill="none" stroke="currentColor" viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
        Other Rules ({otherRules.length})
      </button>

      {isOpen && (
        <div className="ml-6 space-y-2 animate-fade-in">
          {otherRules.map((rule) => (
            <div key={rule.id} className="flex items-center gap-2 group">
              <button
                onClick={() => onToggle(rule.id)}
                className={cn(
                  'flex-1 flex items-center gap-2 px-3 py-1.5 rounded text-sm text-left transition-all',
                  rule.enabled
                    ? 'bg-zinc-700/50 text-zinc-200 border border-zinc-600'
                    : 'bg-zinc-800/30 text-zinc-500 border border-zinc-800 hover:border-zinc-700'
                )}
              >
                <div className={cn(
                  'w-3 h-3 rounded-sm border flex-shrink-0',
                  rule.enabled ? 'border-zinc-400 bg-zinc-400' : 'border-zinc-600'
                )} />
                <span className="truncate">{rule.title}</span>
                <span className="ml-auto text-[10px] text-zinc-600 uppercase">{rule.category}</span>
              </button>
              <button
                onClick={() => onDelete(rule.id)}
                className="opacity-0 group-hover:opacity-100 p-1 text-red-400 hover:text-red-300 transition-opacity"
                title="Delete rule"
              >
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          ))}

          {showAddForm ? (
            <div className="flex items-end gap-2 mt-2">
              <div className="flex-1">
                <Input
                  placeholder="Rule title..."
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleAdd()}
                  className="h-8 text-xs"
                />
              </div>
              <Select
                value={newCategory}
                onChange={(e) => setNewCategory(e.target.value)}
                className="h-8 text-xs w-28"
              >
                {NON_ENTRY_CATEGORIES.map(c => (
                  <SelectOption key={c} value={c}>{c}</SelectOption>
                ))}
              </Select>
              <Button size="sm" onClick={handleAdd} className="h-8 text-xs">Add</Button>
              <Button size="sm" variant="ghost" onClick={() => setShowAddForm(false)} className="h-8 text-xs">Cancel</Button>
            </div>
          ) : (
            <button
              onClick={() => setShowAddForm(true)}
              className="text-xs text-teal-400 hover:text-teal-300 transition-colors mt-1"
            >
              + Add rule
            </button>
          )}
        </div>
      )}
    </div>
  );
}

```

### ./src/components/trading/PatternInsights.jsx
```
import React, { useState, useEffect } from 'react';
import { TradingSession, Trade } from '@/api/db';
import { detectPatterns } from '@/lib/patterns';
import { cn } from '@/lib/utils';

const TYPE_STYLES = {
  positive: 'bg-emerald-500/10 border-emerald-500/20 text-emerald-300',
  warning: 'bg-amber-500/10 border-amber-500/20 text-amber-300',
  danger: 'bg-red-500/10 border-red-500/20 text-red-300',
  info: 'bg-zinc-800/50 border-zinc-700/50 text-zinc-400',
};

export default function PatternInsights() {
  const [patterns, setPatterns] = useState([]);

  useEffect(() => {
    async function load() {
      const sessions = await TradingSession.list({ status: 'ended' });
      const allTrades = [];
      for (const sess of sessions) {
        const trades = await Trade.list({ session_id: sess.id });
        allTrades.push(...trades);
      }
      setPatterns(detectPatterns(sessions, allTrades));
    }
    load();
  }, []);

  return (
    <div className="space-y-2">
      {patterns.map((pattern, idx) => (
        <div
          key={idx}
          className={cn(
            'px-3 py-2 rounded-md border text-xs leading-relaxed',
            TYPE_STYLES[pattern.type] || TYPE_STYLES.info
          )}
        >
          {pattern.text}
        </div>
      ))}
    </div>
  );
}

```

### ./src/components/trading/PipelineBar.jsx
```
import { cn } from '@/lib/utils';

const STEPS = [
  { key: 'levelQueued', label: 'Queue Level' },
  { key: 'sweeping', label: 'Sweeping' },
  { key: 'swept', label: 'Swept' },
  { key: 'displacementConfirmed', label: 'Displacement' },
  { key: 'rulesScore', label: 'Rules' },
  { key: 'trapped', label: 'TRAPPED' },
  { key: 'executed', label: 'Execute' },
];

function getStepCompleted(step, props) {
  switch (step.key) {
    case 'levelQueued':
      return !!props.levelQueued;
    case 'sweeping':
      return !!props.sweeping;
    case 'swept':
      return !!props.swept;
    case 'displacementConfirmed':
      return !!props.displacementConfirmed;
    case 'rulesScore':
      return props.rulesScore >= 80;
    case 'trapped':
      return !!props.trapped;
    case 'executed':
      return !!props.executed;
    default:
      return false;
  }
}

function getActiveStepIndex(props) {
  for (let i = 0; i < STEPS.length; i++) {
    if (!getStepCompleted(STEPS[i], props)) {
      return i;
    }
  }
  return -1;
}

export default function PipelineBar({
  levelQueued = false,
  sweeping = false,
  swept = false,
  displacementConfirmed = false,
  rulesScore = 0,
  trapped = false,
  executed = false,
}) {
  const props = { levelQueued, sweeping, swept, displacementConfirmed, rulesScore, trapped, executed };
  const activeIndex = getActiveStepIndex(props);

  return (
    <div className="flex items-center w-full gap-0">
      {STEPS.map((step, i) => {
        const completed = getStepCompleted(step, props);
        const isActive = i === activeIndex;
        const nextCompleted = i < STEPS.length - 1 && getStepCompleted(STEPS[i + 1], props);

        return (
          <div key={step.key} className="flex items-center">
            {/* Step dot + label */}
            <div className="flex flex-col items-center">
              <div
                className={cn(
                  'w-2 h-2 rounded-full transition-all',
                  completed ? 'bg-teal-400' : 'bg-zinc-700',
                  isActive && 'animate-pulse ring-1 ring-teal-400/40'
                )}
              />
              <span
                className={cn(
                  'text-[9px] mt-0.5 whitespace-nowrap hidden sm:block',
                  completed ? 'text-teal-400' : 'text-zinc-500'
                )}
              >
                {step.label}
              </span>
            </div>

            {/* Connector line */}
            {i < STEPS.length - 1 && (
              <div
                className={cn(
                  'h-[1px] w-3 sm:w-5 mx-0.5',
                  completed && nextCompleted ? 'bg-teal-400' : completed ? 'bg-teal-400/40' : 'bg-zinc-800'
                )}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}

```

### ./src/components/trading/PositionTimer.jsx
```
import React, { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

export default function PositionTimer({ lastTradeTime, isInTrade }) {
  const [elapsed, setElapsed] = useState(0);

  useEffect(() => {
    if (!isInTrade || !lastTradeTime) {
      setElapsed(0);
      return;
    }

    const update = () => {
      const diff = Math.floor((Date.now() - new Date(lastTradeTime).getTime()) / 1000);
      setElapsed(Math.max(0, diff));
    };

    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, [isInTrade, lastTradeTime]);

  if (!isInTrade || elapsed === 0) return null;

  const minutes = Math.floor(elapsed / 60);
  const seconds = elapsed % 60;

  return (
    <div className="flex items-center gap-1.5">
      <div className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
      <span className={cn(
        'text-[10px] font-mono tabular-nums',
        elapsed < 60 ? 'text-zinc-500' :
        elapsed < 300 ? 'text-amber-400/70' :
        'text-amber-400'
      )}>
        In trade: {minutes}:{seconds.toString().padStart(2, '0')}
      </span>
    </div>
  );
}

```

### ./src/components/trading/RiskBudget.jsx
```
import React from 'react';
import { cn } from '@/lib/utils';

export default function RiskBudget({ dailyLossLimit, cumulativePnl }) {
  if (!dailyLossLimit || dailyLossLimit <= 0) return null;

  // How much of the risk budget has been used
  const lossAmount = Math.max(0, -cumulativePnl);
  const usedPercent = Math.min(100, (lossAmount / dailyLossLimit) * 100);
  const remaining = Math.max(0, dailyLossLimit - lossAmount);
  const isInProfit = cumulativePnl > 0;

  return (
    <div className="space-y-1">
      <div className="flex items-center justify-between text-[10px]">
        <span className="text-zinc-500">Risk Budget</span>
        <span className={cn(
          'font-mono tabular-nums',
          isInProfit ? 'text-emerald-400' :
          usedPercent >= 80 ? 'text-red-400' :
          usedPercent >= 50 ? 'text-amber-400' :
          'text-zinc-400'
        )}>
          {isInProfit ? `+$${cumulativePnl.toFixed(0)} safe` : `$${remaining.toFixed(0)} left`}
        </span>
      </div>
      <div className="w-full h-2 bg-zinc-800 rounded-full overflow-hidden">
        {isInProfit ? (
          <div className="h-full bg-emerald-500/40 rounded-full" style={{ width: '100%' }} />
        ) : (
          <div
            className={cn(
              'h-full rounded-full transition-all duration-500',
              usedPercent >= 80 ? 'bg-red-500' :
              usedPercent >= 50 ? 'bg-amber-500' :
              'bg-teal-500/60'
            )}
            style={{ width: `${100 - usedPercent}%` }}
          />
        )}
      </div>
      {!isInProfit && usedPercent > 0 && (
        <div className="flex justify-between text-[9px] text-zinc-600">
          <span>{Math.round(usedPercent)}% used</span>
          <span>Limit: ${dailyLossLimit}</span>
        </div>
      )}
    </div>
  );
}

```

### ./src/components/trading/RitualTimer.jsx
```
import React, { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

export default function RitualTimer({ duration, session, onComplete }) {
  const [secondsLeft, setSecondsLeft] = useState(duration);
  const [breathPhase, setBreathPhase] = useState('in'); // 'in' | 'hold' | 'out'

  // Countdown
  useEffect(() => {
    if (secondsLeft <= 0) {
      onComplete();
      return;
    }
    const timer = setTimeout(() => setSecondsLeft(s => s - 1), 1000);
    return () => clearTimeout(timer);
  }, [secondsLeft, onComplete]);

  // Breathing cycle: 4s in, 4s hold, 4s out
  useEffect(() => {
    const cycle = () => {
      setBreathPhase('in');
      setTimeout(() => setBreathPhase('hold'), 4000);
      setTimeout(() => setBreathPhase('out'), 8000);
    };
    cycle();
    const interval = setInterval(cycle, 12000);
    return () => clearInterval(interval);
  }, []);

  const minutes = Math.floor(secondsLeft / 60);
  const seconds = secondsLeft % 60;
  const progress = ((duration - secondsLeft) / duration) * 100;

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-8 text-center">
        {/* Breathing circle */}
        <div className="flex justify-center">
          <div className={cn(
            'w-28 h-28 rounded-full border-2 flex items-center justify-center transition-all duration-[4000ms] ease-in-out',
            breathPhase === 'in' && 'scale-110 border-teal-400/60 bg-teal-500/5',
            breathPhase === 'hold' && 'scale-110 border-teal-400/40 bg-teal-500/3',
            breathPhase === 'out' && 'scale-90 border-zinc-700 bg-zinc-800/30',
          )}>
            <div className="text-center">
              <p className="text-2xl font-mono font-bold tabular-nums text-zinc-100">
                {minutes}:{seconds.toString().padStart(2, '0')}
              </p>
              <p className="text-[10px] text-zinc-500 mt-1">
                {breathPhase === 'in' ? 'breathe in' : breathPhase === 'hold' ? 'hold' : 'breathe out'}
              </p>
            </div>
          </div>
        </div>

        {/* Progress bar */}
        <div className="w-full h-1 bg-zinc-800 rounded-full overflow-hidden">
          <div
            className="h-full bg-teal-500/50 transition-all duration-1000 ease-linear rounded-full"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Title */}
        <div className="space-y-1">
          <h2 className="text-lg font-semibold text-zinc-200">Preparing Your Mind</h2>
          <p className="text-xs text-zinc-500">Read your plan. Review your levels. Get centered.</p>
        </div>

        {/* Session content */}
        <div className="space-y-4 text-left">
          {session?.daily_objective && (
            <div className="px-4 py-3 rounded-lg bg-zinc-800/30 border border-zinc-800">
              <p className="text-[10px] text-zinc-500 uppercase tracking-wider mb-1">Today's Objective</p>
              <p className="text-sm text-zinc-200">{session.daily_objective}</p>
            </div>
          )}

          {session?.pre_market_notes && (
            <div className="px-4 py-3 rounded-lg bg-zinc-800/30 border border-zinc-800">
              <p className="text-[10px] text-zinc-500 uppercase tracking-wider mb-1">Pre-Market Notes</p>
              <p className="text-sm text-zinc-300 whitespace-pre-line">{session.pre_market_notes}</p>
            </div>
          )}

          {session?.daily_affirmation && (
            <div className="px-4 py-3 rounded-lg bg-teal-500/5 border border-teal-500/20">
              <p className="text-[10px] text-teal-400/70 uppercase tracking-wider mb-1">Affirmation</p>
              <p className="text-sm text-teal-300 italic">{session.daily_affirmation}</p>
            </div>
          )}

          {/* Pre-trade analysis answers */}
          {(session?.liquidity_pools || session?.likely_target || session?.gex_state || session?.value_areas || session?.open_location) && (
            <div className="px-4 py-3 rounded-lg bg-zinc-800/40 border border-zinc-700/30 space-y-2">
              <p className="text-[10px] text-amber-400/70 uppercase tracking-wider">Your Analysis</p>
              {session.liquidity_pools && (
                <div>
                  <p className="text-[9px] text-zinc-500">Liquidity Pools</p>
                  <p className="text-xs text-zinc-300">{session.liquidity_pools}</p>
                </div>
              )}
              {session.likely_target && (
                <div>
                  <p className="text-[9px] text-zinc-500">Likely Target</p>
                  <p className="text-xs text-zinc-300">{session.likely_target}</p>
                </div>
              )}
              {session.gex_state && (
                <div>
                  <p className="text-[9px] text-zinc-500">GEX State</p>
                  <p className="text-xs text-zinc-300">{session.gex_state}</p>
                </div>
              )}
              {session.value_areas && (
                <div>
                  <p className="text-[9px] text-zinc-500">Value Areas</p>
                  <p className="text-xs text-zinc-300">{session.value_areas}</p>
                </div>
              )}
              {session.open_location && (
                <div>
                  <p className="text-[9px] text-zinc-500">Open Location</p>
                  <p className="text-xs text-zinc-300">{session.open_location}</p>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Checklist reminders */}
        <div className="space-y-2 text-left px-4">
          <p className="text-[10px] text-zinc-600 uppercase tracking-wider">While you wait</p>
          <div className="space-y-1.5">
            {[
              'Review your key levels on the chart',
              'Check the economic calendar',
              'Identify the current market structure',
              'Take 3 deep breaths',
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-2 text-xs text-zinc-500">
                <div className="w-1 h-1 rounded-full bg-zinc-600 flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Non-skippable notice */}
        <p className="text-[10px] text-zinc-700">This timer cannot be skipped.</p>
      </div>
    </div>
  );
}

```

### ./src/components/trading/SessionSetup.jsx
```
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectOption } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { affirmations } from '@/shared/tradingConcepts';
import { getTemplates } from '@/lib/templates';
import NotificationSettings from '@/components/trading/NotificationSettings';
import TradingViewChart from '@/components/trading/TradingViewChart';
import EnvironmentPanel from '@/components/cockpit/EnvironmentPanel';
import LevelsPanel from '@/components/cockpit/LevelsPanel';
import LiquidityPanel from '@/components/cockpit/LiquidityPanel';
import FibCalculator from '@/components/cockpit/FibCalculator';
import { CockpitProvider } from '@/lib/cockpitStore';
import { cn } from '@/lib/utils';

function SetupInner({ onBeginSession }) {
  const [dailyObjective, setDailyObjective] = useState('');
  const [preMarketNotes, setPreMarketNotes] = useState('');
  const [dailyAffirmation, setDailyAffirmation] = useState(affirmations[0]);
  const [maxTrades, setMaxTrades] = useState(3);
  const [dailyLossLimit, setDailyLossLimit] = useState(0);
  const [maxSessionMinutes, setMaxSessionMinutes] = useState(180);
  const [lossCooldownSeconds, setLossCooldownSeconds] = useState(300);
  const [ritualMinutes, setRitualMinutes] = useState(5);
  const [activeTab, setActiveTab] = useState('environment'); // mobile tab

  const handleSubmit = (e) => {
    e.preventDefault();
    onBeginSession({
      daily_objective: dailyObjective,
      pre_market_notes: preMarketNotes,
      daily_affirmation: dailyAffirmation,
      max_trades: maxTrades,
      daily_loss_limit: dailyLossLimit,
      max_session_minutes: maxSessionMinutes,
      loss_cooldown_seconds: lossCooldownSeconds,
      ritual_minutes: ritualMinutes,
    });
  };

  return (
    <div className="h-screen flex flex-col overflow-hidden">
      {/* Top bar */}
      <header className="flex items-center justify-between px-4 py-2 border-b border-zinc-800/30 flex-shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-teal-500/10 border border-teal-500/30 flex items-center justify-center">
            <svg className="w-4 h-4 text-teal-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <div>
            <h1 className="text-sm font-bold text-zinc-100">Pre-Trade Planning</h1>
            <p className="text-[10px] text-zinc-500">Mark levels, analyze environment, then begin.</p>
          </div>
        </div>
        <Button onClick={handleSubmit} size="sm" className="text-xs">
          Begin Session →
        </Button>
      </header>

      {/* Mobile tab selector */}
      <div className="md:hidden flex border-b border-zinc-800/30 overflow-x-auto">
        {['environment', 'chart', 'config'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={cn(
              'flex-1 px-3 py-2 text-[10px] font-medium uppercase tracking-wider transition-colors',
              activeTab === tab ? 'text-teal-400 border-b-2 border-teal-400' : 'text-zinc-500'
            )}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Main content — 3 columns on desktop */}
      <div className="flex-1 flex flex-col md:flex-row min-h-0 overflow-hidden">
        {/* LEFT: Environment + Levels + Liquidity + Fib */}
        <div className={cn(
          'md:w-64 lg:w-72 flex-shrink-0 overflow-y-auto border-r border-zinc-800/30 px-3 py-3 space-y-5',
          activeTab !== 'environment' && 'hidden md:block'
        )}>
          <EnvironmentPanel />
          <LevelsPanel />
          <LiquidityPanel />
          <FibCalculator />
        </div>

        {/* CENTER: Chart */}
        <div className={cn(
          'flex-1 min-w-0 min-h-0',
          activeTab !== 'chart' && 'hidden md:flex'
        )}>
          <TradingViewChart className="w-full h-full" />
        </div>

        {/* RIGHT: Session config + objectives */}
        <div className={cn(
          'md:w-72 lg:w-80 flex-shrink-0 overflow-y-auto border-l border-zinc-800/30 px-4 py-4',
          activeTab !== 'config' && 'hidden md:block'
        )}>
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Templates */}
            <div className="space-y-1.5">
              <Label className="text-[10px]">Template</Label>
              <div className="flex gap-1.5 flex-wrap">
                {getTemplates().map((t) => (
                  <button key={t.id} type="button"
                    onClick={() => { setMaxTrades(t.max_trades); setDailyLossLimit(t.daily_loss_limit); setMaxSessionMinutes(t.max_session_minutes); setLossCooldownSeconds(t.loss_cooldown_seconds); setRitualMinutes(t.ritual_minutes); }}
                    className="px-2 py-1 rounded border border-zinc-700 bg-zinc-800/50 text-[10px] text-zinc-400 hover:border-teal-500/50 hover:text-teal-300 transition-all"
                  >{t.name}</button>
                ))}
              </div>
            </div>

            {/* Objective */}
            <div className="space-y-1">
              <Label htmlFor="objective" className="text-[10px]">Objective</Label>
              <Input id="objective" placeholder="e.g., 2 A+ setups only" value={dailyObjective} onChange={(e) => setDailyObjective(e.target.value)} className="h-8 text-xs" />
            </div>

            {/* Notes */}
            <div className="space-y-1">
              <Label htmlFor="notes" className="text-[10px]">Pre-Market Notes</Label>
              <Textarea id="notes" placeholder="Bias, context..." value={preMarketNotes} onChange={(e) => setPreMarketNotes(e.target.value)} className="min-h-[40px] text-xs" />
            </div>

            {/* Affirmation */}
            <div className="space-y-1">
              <Label className="text-[10px]">Affirmation</Label>
              <Select value={dailyAffirmation} onChange={(e) => setDailyAffirmation(e.target.value)} className="h-8 text-xs">
                {affirmations.map((a) => <SelectOption key={a} value={a}>{a}</SelectOption>)}
              </Select>
            </div>

            {/* Settings grid */}
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <Label className="text-[10px]">Max Trades</Label>
                <Input type="number" min={1} max={5} value={maxTrades} onChange={(e) => setMaxTrades(Number(e.target.value) || 3)} className="h-8 text-xs" />
              </div>
              <div className="space-y-1">
                <Label className="text-[10px]">Loss Limit ($)</Label>
                <Input type="number" min={0} step={50} value={dailyLossLimit || ''} onChange={(e) => setDailyLossLimit(Number(e.target.value) || 0)} className="h-8 text-xs" placeholder="0=off" />
              </div>
              <div className="space-y-1">
                <Label className="text-[10px]">Session (min)</Label>
                <Input type="number" min={15} max={480} step={15} value={maxSessionMinutes} onChange={(e) => setMaxSessionMinutes(Number(e.target.value) || 180)} className="h-8 text-xs" />
              </div>
              <div className="space-y-1">
                <Label className="text-[10px]">Cooldown (sec)</Label>
                <Input type="number" min={0} max={600} step={30} value={lossCooldownSeconds} onChange={(e) => setLossCooldownSeconds(Number(e.target.value) || 0)} className="h-8 text-xs" placeholder="0=off" />
              </div>
              <div className="space-y-1">
                <Label className="text-[10px]">Ritual (min)</Label>
                <Input type="number" min={1} max={10} value={ritualMinutes} onChange={(e) => setRitualMinutes(Number(e.target.value) || 5)} className="h-8 text-xs" />
              </div>
            </div>

            {/* Notifications */}
            <NotificationSettings />

            {/* Begin */}
            <Button type="submit" className="w-full h-10 text-sm font-semibold">
              Begin Session
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default function SessionSetup({ onBeginSession }) {
  return (
    <CockpitProvider>
      <SetupInner onBeginSession={onBeginSession} />
    </CockpitProvider>
  );
}

```

### ./src/components/trading/SessionSummaryCard.jsx
```
import { cn } from '@/lib/utils';

export default function SessionSummaryCard({ session }) {
  if (!session || (!session.daily_objective && !session.liquidityTarget && !session.daily_loss_limit && !session.max_trades)) {
    return null;
  }

  return (
    <div className="bg-zinc-900/30 border border-zinc-800/30 rounded px-3 py-1.5">
      <div className="flex flex-wrap items-center gap-x-3 gap-y-0.5 text-[10px] text-zinc-400">
        {session.daily_objective && (
          <span>
            <span className="text-zinc-500">Obj:</span>{' '}
            <span className="text-zinc-300">{session.daily_objective}</span>
          </span>
        )}
        {session.liquidityTarget && (
          <span>
            <span className="text-zinc-500">Liq:</span>{' '}
            <span className="text-zinc-300">{session.liquidityTarget}</span>
          </span>
        )}
        {session.daily_loss_limit && (
          <span>
            <span className="text-zinc-500">Loss Limit:</span>{' '}
            <span className="text-zinc-300">{session.daily_loss_limit}</span>
          </span>
        )}
        {session.max_trades && (
          <span>
            <span className="text-zinc-500">Max Trades:</span>{' '}
            <span className="text-zinc-300">{session.max_trades}</span>
          </span>
        )}
      </div>
    </div>
  );
}

```

### ./src/components/trading/SessionTimer.jsx
```
import React, { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

export default function SessionTimer({ startTime }) {
  const [elapsed, setElapsed] = useState('00:00:00');

  useEffect(() => {
    if (!startTime) return;

    const update = () => {
      const diff = Math.floor((Date.now() - new Date(startTime).getTime()) / 1000);
      const hours = Math.floor(diff / 3600).toString().padStart(2, '0');
      const minutes = Math.floor((diff % 3600) / 60).toString().padStart(2, '0');
      const seconds = (diff % 60).toString().padStart(2, '0');
      setElapsed(`${hours}:${minutes}:${seconds}`);
    };

    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, [startTime]);

  return (
    <div className="flex items-center gap-2">
      <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
      <span className="font-mono text-sm tabular-nums text-zinc-300">{elapsed}</span>
    </div>
  );
}

```

### ./src/components/trading/TimeHeatmap.jsx
```
import React, { useState, useEffect } from 'react';
import { TradingSession, Trade } from '@/api/db';
import { cn } from '@/lib/utils';

const HOURS = ['06', '07', '08', '09', '10', '11', '12', '13', '14', '15', '16'];

export default function TimeHeatmap() {
  const [hourData, setHourData] = useState({});

  useEffect(() => {
    async function load() {
      const sessions = await TradingSession.list({ status: 'ended' });
      const data = {};

      for (const sess of sessions) {
        const trades = await Trade.list({ session_id: sess.id });
        for (const trade of trades) {
          if (!trade.entry_time) continue;
          const hour = new Date(trade.entry_time).getHours().toString().padStart(2, '0');
          if (!data[hour]) data[hour] = { wins: 0, losses: 0, pnl: 0, count: 0 };
          data[hour].count++;
          data[hour].pnl += trade.pnl || 0;
          if (trade.result === 'win') data[hour].wins++;
          if (trade.result === 'loss') data[hour].losses++;
        }
      }
      setHourData(data);
    }
    load();
  }, []);

  const hasData = Object.keys(hourData).length > 0;

  if (!hasData) {
    return <p className="text-xs text-zinc-600 italic text-center py-4">Need trades with entry times to show heatmap.</p>;
  }

  // Find max absolute PnL for color scaling
  const maxAbsPnl = Math.max(1, ...Object.values(hourData).map(d => Math.abs(d.pnl)));

  return (
    <div className="space-y-2">
      <div className="grid grid-cols-11 gap-1">
        {HOURS.map(hour => {
          const d = hourData[hour];
          if (!d || d.count === 0) {
            return (
              <div key={hour} className="flex flex-col items-center">
                <div className="w-full aspect-square rounded bg-zinc-800/30 border border-zinc-800" />
                <span className="text-[8px] text-zinc-700 mt-0.5">{hour}</span>
              </div>
            );
          }

          const intensity = Math.min(1, Math.abs(d.pnl) / maxAbsPnl);
          const isGreen = d.pnl >= 0;
          const winRate = d.count > 0 ? Math.round((d.wins / d.count) * 100) : 0;

          return (
            <div key={hour} className="flex flex-col items-center" title={`${hour}:00 — ${d.count} trades, WR: ${winRate}%, PnL: $${d.pnl.toFixed(0)}`}>
              <div
                className="w-full aspect-square rounded border flex items-center justify-center"
                style={{
                  backgroundColor: isGreen
                    ? `rgba(16, 185, 129, ${0.1 + intensity * 0.5})`
                    : `rgba(239, 68, 68, ${0.1 + intensity * 0.5})`,
                  borderColor: isGreen
                    ? `rgba(16, 185, 129, ${0.2 + intensity * 0.4})`
                    : `rgba(239, 68, 68, ${0.2 + intensity * 0.4})`,
                }}
              >
                <span className="text-[8px] font-mono tabular-nums text-zinc-200">{winRate}%</span>
              </div>
              <span className="text-[8px] text-zinc-600 mt-0.5">{hour}</span>
            </div>
          );
        })}
      </div>

      {/* Legend */}
      <div className="flex items-center justify-center gap-3 text-[9px] text-zinc-500">
        <span>Green = profitable hour</span>
        <span>Red = losing hour</span>
        <span>Intensity = magnitude</span>
      </div>
    </div>
  );
}

```

### ./src/components/trading/TradeDetail.jsx
```
import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectOption } from '@/components/ui/select';
import ConvictionRating from '@/components/trading/ConvictionRating';
import { emotionsList } from '@/shared/tradingConcepts';
import { cn } from '@/lib/utils';

const RESULTS = [
  { value: 'win', label: 'Win', color: 'text-emerald-400' },
  { value: 'loss', label: 'Loss', color: 'text-red-400' },
  { value: 'breakeven', label: 'Breakeven', color: 'text-zinc-400' },
  { value: 'scratched', label: 'Scratched', color: 'text-blue-400' },
];

export default function TradeDetail({ open, onOpenChange, trade, rules, onSave, slotIndex }) {
  const [form, setForm] = useState({
    result: 'scratched',
    r_multiple: 0,
    pnl: 0,
    entry_time: '',
    exit_time: '',
    emotion_before: '',
    emotion_after: '',
    notes: '',
    rule_compliance: [],
  });

  useEffect(() => {
    if (trade) {
      setForm({
        result: trade.result || 'scratched',
        r_multiple: trade.r_multiple || 0,
        pnl: trade.pnl || 0,
        entry_time: trade.entry_time || '',
        exit_time: trade.exit_time || '',
        emotion_before: trade.emotion_before || '',
        emotion_after: trade.emotion_after || '',
        notes: trade.notes || '',
        rule_compliance: trade.rule_compliance || rules.map(r => ({ rule: r.title, followed: false })),
      });
    } else {
      setForm({
        result: 'scratched',
        r_multiple: 0,
        pnl: 0,
        entry_time: new Date().toISOString().slice(0, 16),
        exit_time: '',
        emotion_before: '',
        emotion_after: '',
        notes: '',
        conviction: 0,
        rule_compliance: rules.map(r => ({ rule: r.title, followed: false })),
      });
    }
  }, [trade, rules, open]);

  const toggleRuleCompliance = (index) => {
    const updated = [...form.rule_compliance];
    updated[index] = { ...updated[index], followed: !updated[index].followed };
    setForm({ ...form, rule_compliance: updated });
  };

  const handleSave = () => {
    onSave({
      ...form,
      slot_index: slotIndex,
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-xl">
        <DialogHeader>
          <DialogTitle>
            Trade #{slotIndex + 1} Details
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-2">
          {/* Result */}
          <div className="space-y-2">
            <Label>Result</Label>
            <div className="grid grid-cols-4 gap-2">
              {RESULTS.map(({ value, label, color }) => (
                <button
                  key={value}
                  type="button"
                  onClick={() => setForm({ ...form, result: value })}
                  className={cn(
                    'px-3 py-2 rounded-md border text-sm font-medium transition-all',
                    form.result === value
                      ? `border-current bg-current/10 ${color}`
                      : 'border-zinc-700 text-zinc-500 hover:border-zinc-600'
                  )}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>

          {/* R-Multiple & PnL */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="r_multiple">R-Multiple</Label>
              <Input
                id="r_multiple"
                type="number"
                step="0.1"
                value={form.r_multiple}
                onChange={(e) => setForm({ ...form, r_multiple: parseFloat(e.target.value) || 0 })}
                placeholder="e.g., 2.5 or -1"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="pnl">PnL ($)</Label>
              <Input
                id="pnl"
                type="number"
                step="1"
                value={form.pnl}
                onChange={(e) => setForm({ ...form, pnl: parseFloat(e.target.value) || 0 })}
                placeholder="Dollar amount"
              />
            </div>
          </div>

          {/* Entry/Exit Times */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="entry_time">Entry Time</Label>
              <Input
                id="entry_time"
                type="datetime-local"
                value={form.entry_time}
                onChange={(e) => setForm({ ...form, entry_time: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="exit_time">Exit Time</Label>
              <Input
                id="exit_time"
                type="datetime-local"
                value={form.exit_time}
                onChange={(e) => setForm({ ...form, exit_time: e.target.value })}
              />
            </div>
          </div>

          {/* Emotions */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Emotion Before</Label>
              <Select
                value={form.emotion_before}
                onChange={(e) => setForm({ ...form, emotion_before: e.target.value })}
              >
                <SelectOption value="">Select...</SelectOption>
                {emotionsList.map(e => (
                  <SelectOption key={e} value={e}>{e}</SelectOption>
                ))}
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Emotion After</Label>
              <Select
                value={form.emotion_after}
                onChange={(e) => setForm({ ...form, emotion_after: e.target.value })}
              >
                <SelectOption value="">Select...</SelectOption>
                {emotionsList.map(e => (
                  <SelectOption key={e} value={e}>{e}</SelectOption>
                ))}
              </Select>
            </div>
          </div>

          {/* Rule Compliance */}
          <div className="space-y-2">
            <Label>Rule Compliance</Label>
            <div className="space-y-1.5 max-h-40 overflow-y-auto">
              {form.rule_compliance.map((rc, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => toggleRuleCompliance(idx)}
                  className={cn(
                    'flex items-center gap-2 w-full px-3 py-1.5 rounded text-sm text-left transition-all',
                    rc.followed
                      ? 'bg-emerald-500/10 text-emerald-300 border border-emerald-500/30'
                      : 'bg-zinc-800/50 text-zinc-400 border border-zinc-700/50 hover:border-zinc-600'
                  )}
                >
                  <div className={cn(
                    'w-3 h-3 rounded-sm border flex-shrink-0 flex items-center justify-center',
                    rc.followed ? 'border-emerald-500 bg-emerald-500' : 'border-zinc-600'
                  )}>
                    {rc.followed && (
                      <svg className="w-2 h-2 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    )}
                  </div>
                  <span>{rc.rule}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Conviction Rating */}
          <div className="space-y-2">
            <Label>Conviction (1-5)</Label>
            <ConvictionRating value={form.conviction} onChange={(v) => setForm({ ...form, conviction: v })} />
          </div>

          {/* Notes */}
          <div className="space-y-2">
            <Label htmlFor="notes">Notes</Label>
            <Textarea
              id="notes"
              placeholder="What happened? What did you learn?"
              value={form.notes}
              onChange={(e) => setForm({ ...form, notes: e.target.value })}
            />
          </div>
        </div>

        <DialogFooter>
          <Button variant="ghost" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleSave}>
            Save Trade
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

```

### ./src/components/trading/TradeTimeline.jsx
```
import React from 'react';
import { cn } from '@/lib/utils';

const RESULT_COLORS = {
  win: 'bg-emerald-500',
  loss: 'bg-red-500',
  breakeven: 'bg-zinc-500',
  scratched: 'bg-blue-500',
};

const RESULT_BORDER = {
  win: 'border-emerald-500/40',
  loss: 'border-red-500/40',
  breakeven: 'border-zinc-500/40',
  scratched: 'border-blue-500/40',
};

export default function TradeTimeline({ trades, sessionStart, sessionEnd }) {
  if (!trades || trades.length === 0) {
    return <p className="text-sm text-zinc-500 italic">No trades recorded.</p>;
  }

  const start = new Date(sessionStart).getTime();
  const end = new Date(sessionEnd || Date.now()).getTime();
  const duration = end - start || 1;

  // Generate time ticks
  const ticks = [];
  const tickCount = 6;
  for (let i = 0; i <= tickCount; i++) {
    const t = new Date(start + (duration / tickCount) * i);
    ticks.push({
      label: t.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      position: (i / tickCount) * 100,
    });
  }

  return (
    <div className="space-y-4">
      {/* Timeline */}
      <div className="relative">
        {/* Time axis */}
        <div className="h-px bg-zinc-700 w-full relative">
          {ticks.map((tick, idx) => (
            <div
              key={idx}
              className="absolute top-0 -translate-x-1/2"
              style={{ left: `${tick.position}%` }}
            >
              <div className="w-px h-2 bg-zinc-600" />
              <span className="text-[9px] text-zinc-600 mt-1 block -translate-x-1/2 whitespace-nowrap">
                {tick.label}
              </span>
            </div>
          ))}
        </div>

        {/* Trade bars */}
        <div className="relative mt-6 space-y-2">
          {trades.map((trade, idx) => {
            const entryTime = trade.entry_time ? new Date(trade.entry_time).getTime() : start;
            const exitTime = trade.exit_time ? new Date(trade.exit_time).getTime() : entryTime + duration * 0.05;
            
            const leftPct = Math.max(0, ((entryTime - start) / duration) * 100);
            const widthPct = Math.max(2, ((exitTime - entryTime) / duration) * 100);
            const color = RESULT_COLORS[trade.result] || RESULT_COLORS.scratched;
            const borderColor = RESULT_BORDER[trade.result] || RESULT_BORDER.scratched;

            return (
              <div key={idx} className="relative h-7 flex items-center">
                <span className="absolute left-0 text-[10px] text-zinc-500 w-6">
                  #{idx + 1}
                </span>
                <div className="ml-7 relative flex-1 h-full">
                  <div
                    className={cn(
                      'absolute h-5 rounded-sm border flex items-center justify-center',
                      'transition-all text-[9px] font-medium text-white/90',
                      color, borderColor
                    )}
                    style={{
                      left: `${leftPct}%`,
                      width: `${Math.min(widthPct, 100 - leftPct)}%`,
                      minWidth: '24px',
                      top: '50%',
                      transform: 'translateY(-50%)',
                      opacity: 0.85,
                    }}
                  >
                    {trade.r_multiple != null && (
                      <span className="px-1 truncate">
                        {trade.r_multiple >= 0 ? '+' : ''}{trade.r_multiple.toFixed(1)}R
                      </span>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Legend */}
      <div className="flex items-center gap-4 justify-center">
        {Object.entries(RESULT_COLORS).map(([result, color]) => (
          <div key={result} className="flex items-center gap-1.5">
            <div className={cn('w-2.5 h-2.5 rounded-sm', color)} />
            <span className="text-[10px] text-zinc-500 capitalize">{result}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

```

### ./src/components/trading/TradingViewChart.jsx
```
import React, { useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';

const DEFAULT_SYMBOL = 'NASDAQ:NQ1!';
const INTERVALS = [
  { label: '1m', value: '1' },
  { label: '5m', value: '5' },
  { label: '15m', value: '15' },
  { label: '1H', value: '60' },
  { label: '4H', value: '240' },
  { label: 'D', value: 'D' },
];

export default function TradingViewChart({ className, compact = false }) {
  const containerRef = useRef(null);
  const widgetIdRef = useRef(`tv_${Date.now()}_${Math.random().toString(36).slice(2)}`);
  const [symbol, setSymbol] = useState(() => localStorage.getItem('tcai_tv_symbol') || DEFAULT_SYMBOL);
  const [interval, setInterval_] = useState(() => localStorage.getItem('tcai_tv_interval') || '5');
  const [editingSymbol, setEditingSymbol] = useState(false);
  const [symbolInput, setSymbolInput] = useState(symbol);

  useEffect(() => {
    if (!containerRef.current) return;

    // Clear previous
    containerRef.current.innerHTML = '';

    // Create widget container
    const widgetDiv = document.createElement('div');
    widgetDiv.id = widgetIdRef.current;
    widgetDiv.style.width = '100%';
    widgetDiv.style.height = '100%';
    containerRef.current.appendChild(widgetDiv);

    // Load TradingView library and create full widget with drawing tools
    const script = document.createElement('script');
    script.src = 'https://s3.tradingview.com/tv.js';
    script.type = 'text/javascript';
    script.async = true;
    script.onload = () => {
      if (window.TradingView) {
        new window.TradingView.widget({
          container_id: widgetIdRef.current,
          autosize: true,
          symbol: symbol,
          interval: interval,
          timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
          theme: 'dark',
          style: '1',
          locale: 'en',
          toolbar_bg: '#09090b',
          enable_publishing: false,
          allow_symbol_change: true,
          save_image: false,
          hide_side_toolbar: false,
          drawings_access: { type: 'all' },
          studies: ['MAExp@tv-basicstudies'],
          overrides: {
            'paneProperties.background': '#09090b',
            'paneProperties.backgroundType': 'solid',
            'paneProperties.vertGridProperties.color': '#18181b',
            'paneProperties.horzGridProperties.color': '#18181b',
            'scalesProperties.backgroundColor': '#09090b',
            'scalesProperties.lineColor': '#27272a',
            'scalesProperties.textColor': '#71717a',
          },
        });
      }
    };

    document.head.appendChild(script);

    // Persist preferences
    localStorage.setItem('tcai_tv_symbol', symbol);
    localStorage.setItem('tcai_tv_interval', interval);

    return () => {
      if (script.parentNode) script.parentNode.removeChild(script);
    };
  }, [symbol, interval]);

  const handleSymbolSubmit = () => {
    const cleaned = symbolInput.trim().toUpperCase();
    if (cleaned) {
      setSymbol(cleaned);
      setEditingSymbol(false);
    }
  };

  return (
    <div className={cn('flex flex-col', className)}>
      {/* Chart toolbar */}
      {!compact && (
        <div className="flex items-center justify-between px-2 py-1.5 border-b border-zinc-800/50">
          <div className="flex items-center gap-2">
            {editingSymbol ? (
              <div className="flex items-center gap-1">
                <input
                  type="text"
                  value={symbolInput}
                  onChange={(e) => setSymbolInput(e.target.value)}
                  onKeyDown={(e) => { if (e.key === 'Enter') handleSymbolSubmit(); if (e.key === 'Escape') setEditingSymbol(false); }}
                  autoFocus
                  className="h-6 w-32 px-1.5 bg-zinc-800 border border-zinc-600 rounded text-[11px] text-zinc-200 focus:outline-none focus:border-teal-500"
                  placeholder="e.g. NASDAQ:NQ1!"
                />
                <button onClick={handleSymbolSubmit} className="text-[10px] text-teal-400 hover:text-teal-300">Go</button>
              </div>
            ) : (
              <button
                onClick={() => { setSymbolInput(symbol); setEditingSymbol(true); }}
                className="text-[11px] font-mono text-zinc-300 hover:text-teal-400 transition-colors px-1.5 py-0.5 rounded hover:bg-zinc-800/50"
                title="Click to change symbol"
              >
                {symbol}
              </button>
            )}
          </div>

          <div className="flex items-center gap-0.5">
            {INTERVALS.map(({ label, value }) => (
              <button
                key={value}
                onClick={() => setInterval_(value)}
                className={cn(
                  'px-1.5 py-0.5 rounded text-[10px] font-medium transition-all',
                  interval === value
                    ? 'bg-teal-500/20 text-teal-300'
                    : 'text-zinc-500 hover:text-zinc-300 hover:bg-zinc-800/50'
                )}
              >
                {label}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Chart container */}
      <div className="flex-1 relative min-h-0">
        <div ref={containerRef} className="absolute inset-0" />
      </div>
    </div>
  );
}

```

### ./src/components/trading/VoiceJournal.jsx
```
import React, { useState, useRef, useEffect } from 'react';
import { cn } from '@/lib/utils';

// Check for browser support
const SpeechRecognition = typeof window !== 'undefined'
  ? window.SpeechRecognition || window.webkitSpeechRecognition
  : null;

export default function VoiceJournal({ entries = [], onNewEntry }) {
  const [isRecording, setIsRecording] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [duration, setDuration] = useState(0);
  const [error, setError] = useState(null);
  const recognitionRef = useRef(null);
  const timerRef = useRef(null);
  const startTimeRef = useRef(null);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, []);

  const startRecording = () => {
    if (!SpeechRecognition) {
      setError('Speech recognition not supported in this browser. Use Chrome or Edge.');
      return;
    }

    setError(null);
    setTranscript('');
    setDuration(0);
    startTimeRef.current = Date.now();

    const recognition = new SpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = 'en-US';

    let finalTranscript = '';

    recognition.onresult = (event) => {
      let interim = '';
      for (let i = event.resultIndex; i < event.results.length; i++) {
        const result = event.results[i];
        if (result.isFinal) {
          finalTranscript += result[0].transcript + ' ';
        } else {
          interim += result[0].transcript;
        }
      }
      setTranscript(finalTranscript + interim);
    };

    recognition.onerror = (event) => {
      if (event.error === 'no-speech') return; // ignore silence
      setError(`Recognition error: ${event.error}`);
      stopRecording();
    };

    recognition.onend = () => {
      // Auto-restart if still recording (browser may stop after silence)
      if (isRecording && recognitionRef.current) {
        try {
          recognitionRef.current.start();
        } catch (e) {
          // Already started
        }
      }
    };

    recognitionRef.current = recognition;
    recognition.start();
    setIsRecording(true);

    // Duration timer
    timerRef.current = setInterval(() => {
      setDuration(Math.floor((Date.now() - startTimeRef.current) / 1000));
    }, 1000);
  };

  const stopRecording = () => {
    setIsRecording(false);

    if (recognitionRef.current) {
      recognitionRef.current.stop();
      recognitionRef.current = null;
    }

    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }

    // Save the transcript if there's content
    const finalText = transcript.trim();
    if (finalText && onNewEntry) {
      onNewEntry({
        text: finalText,
        time: new Date().toISOString(),
        duration: duration,
      });
    }

    setTranscript('');
    setDuration(0);
  };

  const formatDuration = (secs) => {
    const m = Math.floor(secs / 60).toString().padStart(2, '0');
    const s = (secs % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  return (
    <div className="space-y-2">
      {/* Record button */}
      <div className="flex items-center gap-2">
        <button
          onClick={isRecording ? stopRecording : startRecording}
          className={cn(
            'flex items-center gap-2 px-3 py-1.5 rounded-md text-xs font-medium transition-all',
            isRecording
              ? 'bg-red-500/20 border border-red-500/40 text-red-300 hover:bg-red-500/30'
              : 'bg-zinc-800/50 border border-zinc-700 text-zinc-400 hover:text-zinc-200 hover:border-zinc-600'
          )}
        >
          {isRecording ? (
            <>
              <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
              Stop ({formatDuration(duration)})
            </>
          ) : (
            <>
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
              </svg>
              Journal
            </>
          )}
        </button>

        {entries.length > 0 && (
          <span className="text-[10px] text-zinc-600">
            {entries.length} note{entries.length !== 1 ? 's' : ''}
          </span>
        )}
      </div>

      {/* Live transcript while recording */}
      {isRecording && transcript && (
        <div className="px-3 py-2 rounded-md bg-zinc-800/50 border border-zinc-700/50 text-xs text-zinc-300 max-h-20 overflow-y-auto animate-fade-in">
          {transcript}
        </div>
      )}

      {/* Error */}
      {error && (
        <p className="text-[10px] text-red-400">{error}</p>
      )}

      {/* Recent entries preview */}
      {entries.length > 0 && !isRecording && (
        <div className="space-y-1 max-h-24 overflow-y-auto">
          {entries.slice(-3).map((entry, idx) => (
            <div key={idx} className="px-2 py-1 rounded bg-zinc-800/30 border border-zinc-800">
              <div className="flex items-center justify-between mb-0.5">
                <span className="text-[9px] text-zinc-600">
                  {new Date(entry.time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
                <span className="text-[9px] text-zinc-600">{formatDuration(entry.duration)}</span>
              </div>
              <p className="text-[10px] text-zinc-400 line-clamp-2">{entry.text}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

```

### ./src/components/trading/WeeklyGoalBar.jsx
```
import React, { useState } from 'react';
import { Progress } from '@/components/ui/progress';
import { cn } from '@/lib/utils';

export default function WeeklyGoalBar({ aPlusCount = 0, target = 10, avgScore = 0, onEditTarget }) {
  const [editing, setEditing] = useState(false);
  const [newTarget, setNewTarget] = useState(target);

  const percentage = target > 0 ? Math.round((aPlusCount / target) * 100) : 0;

  const handleSave = () => {
    onEditTarget?.(newTarget);
    setEditing(false);
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-xs text-zinc-400">Weekly A+ Goal</span>
          <span className={cn(
            'text-xs font-mono tabular-nums px-1.5 py-0.5 rounded',
            aPlusCount >= target
              ? 'bg-emerald-500/20 text-emerald-300'
              : 'bg-zinc-800 text-zinc-400'
          )}>
            {aPlusCount}/{target}
          </span>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-[10px] text-zinc-500">
            Avg Score: <span className="text-zinc-300 tabular-nums">{avgScore}%</span>
          </span>
          {editing ? (
            <div className="flex items-center gap-1">
              <input
                type="number"
                min={1}
                max={50}
                value={newTarget}
                onChange={(e) => setNewTarget(Number(e.target.value) || 1)}
                className="w-12 h-5 text-xs bg-zinc-800 border border-zinc-600 rounded px-1 text-center text-zinc-200"
                onKeyDown={(e) => e.key === 'Enter' && handleSave()}
              />
              <button onClick={handleSave} className="text-xs text-teal-400 hover:text-teal-300">
                Save
              </button>
            </div>
          ) : (
            <button
              onClick={() => setEditing(true)}
              className="text-[10px] text-zinc-600 hover:text-zinc-400 transition-colors"
            >
              Edit
            </button>
          )}
        </div>
      </div>
      <Progress value={aPlusCount} max={target} className="h-2" barClassName="bg-teal-500" />
    </div>
  );
}

```

### ./src/components/ui/badge.jsx
```
import React from 'react';
import { cn } from '@/lib/utils';

const variants = {
  default: 'bg-teal-500/20 text-teal-300 border-teal-500/30',
  success: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30',
  destructive: 'bg-red-500/20 text-red-300 border-red-500/30',
  warning: 'bg-amber-500/20 text-amber-300 border-amber-500/30',
  secondary: 'bg-zinc-700/50 text-zinc-300 border-zinc-600',
  outline: 'bg-transparent text-zinc-300 border-zinc-600',
};

export function Badge({ className, variant = 'default', children, ...props }) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium',
        'transition-colors',
        variants[variant],
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
}

```

### ./src/components/ui/button.jsx
```
import React from 'react';
import { cn } from '@/lib/utils';

const variants = {
  default: 'bg-teal-500 text-zinc-950 hover:bg-teal-400 font-medium',
  destructive: 'bg-red-600 text-white hover:bg-red-500',
  outline: 'border border-zinc-700 bg-transparent hover:bg-zinc-800 text-zinc-100',
  secondary: 'bg-zinc-800 text-zinc-100 hover:bg-zinc-700',
  ghost: 'hover:bg-zinc-800 text-zinc-300 hover:text-zinc-100',
  link: 'text-teal-400 underline-offset-4 hover:underline',
};

const sizes = {
  default: 'h-10 px-4 py-2',
  sm: 'h-8 px-3 text-sm',
  lg: 'h-12 px-6 text-lg',
  icon: 'h-10 w-10',
};

export function Button({ 
  className, variant = 'default', size = 'default', 
  disabled, children, ...props 
}) {
  return (
    <button
      className={cn(
        'inline-flex items-center justify-center rounded-md text-sm font-medium',
        'ring-offset-background transition-colors focus-visible:outline-none',
        'focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
        'disabled:pointer-events-none disabled:opacity-50',
        variants[variant],
        sizes[size],
        className
      )}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
}

```

### ./src/components/ui/card.jsx
```
import React from 'react';
import { cn } from '@/lib/utils';

export function Card({ className, children, ...props }) {
  return (
    <div
      className={cn(
        'rounded-lg border border-zinc-800 bg-zinc-900/50 text-zinc-100 shadow-sm',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

export function CardHeader({ className, children, ...props }) {
  return (
    <div className={cn('flex flex-col space-y-1.5 p-4 pb-2', className)} {...props}>
      {children}
    </div>
  );
}

export function CardTitle({ className, children, ...props }) {
  return (
    <h3 className={cn('text-lg font-semibold leading-none tracking-tight', className)} {...props}>
      {children}
    </h3>
  );
}

export function CardDescription({ className, children, ...props }) {
  return (
    <p className={cn('text-sm text-zinc-400', className)} {...props}>
      {children}
    </p>
  );
}

export function CardContent({ className, children, ...props }) {
  return (
    <div className={cn('p-4 pt-2', className)} {...props}>
      {children}
    </div>
  );
}

export function CardFooter({ className, children, ...props }) {
  return (
    <div className={cn('flex items-center p-4 pt-2', className)} {...props}>
      {children}
    </div>
  );
}

```

### ./src/components/ui/dialog.jsx
```
import React, { useEffect, useCallback } from 'react';
import { cn } from '@/lib/utils';

export function Dialog({ open, onOpenChange, children }) {
  const handleEscape = useCallback((e) => {
    if (e.key === 'Escape' && onOpenChange) onOpenChange(false);
  }, [onOpenChange]);

  useEffect(() => {
    if (open) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = '';
    };
  }, [open, handleEscape]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div 
        className="fixed inset-0 bg-black/70 backdrop-blur-sm"
        onClick={() => onOpenChange?.(false)}
      />
      <div className="relative z-50 w-full max-w-lg max-h-[85vh] overflow-y-auto animate-scale-in">
        {children}
      </div>
    </div>
  );
}

export function DialogContent({ className, children, ...props }) {
  return (
    <div
      className={cn(
        'rounded-lg border border-zinc-800 bg-zinc-900 p-6 shadow-xl',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

export function DialogHeader({ className, children, ...props }) {
  return (
    <div className={cn('flex flex-col space-y-2 mb-4', className)} {...props}>
      {children}
    </div>
  );
}

export function DialogTitle({ className, children, ...props }) {
  return (
    <h2 className={cn('text-xl font-semibold text-zinc-100', className)} {...props}>
      {children}
    </h2>
  );
}

export function DialogDescription({ className, children, ...props }) {
  return (
    <p className={cn('text-sm text-zinc-400', className)} {...props}>
      {children}
    </p>
  );
}

export function DialogFooter({ className, children, ...props }) {
  return (
    <div className={cn('flex justify-end gap-2 mt-6', className)} {...props}>
      {children}
    </div>
  );
}

```

### ./src/components/ui/input.jsx
```
import React from 'react';
import { cn } from '@/lib/utils';

export function Input({ className, type = 'text', ...props }) {
  return (
    <input
      type={type}
      className={cn(
        'flex h-10 w-full rounded-md border border-zinc-700 bg-zinc-800/50',
        'px-3 py-2 text-sm text-zinc-100 placeholder:text-zinc-500',
        'focus:outline-none focus:ring-2 focus:ring-teal-500/50 focus:border-teal-500',
        'disabled:cursor-not-allowed disabled:opacity-50',
        'transition-colors',
        className
      )}
      {...props}
    />
  );
}

```

### ./src/components/ui/label.jsx
```
import React from 'react';
import { cn } from '@/lib/utils';

export function Label({ className, children, ...props }) {
  return (
    <label
      className={cn(
        'text-sm font-medium text-zinc-300 leading-none',
        'peer-disabled:cursor-not-allowed peer-disabled:opacity-70',
        className
      )}
      {...props}
    >
      {children}
    </label>
  );
}

```

### ./src/components/ui/popover.jsx
```
import React, { useState, useRef, useEffect } from 'react';
import { cn } from '@/lib/utils';

export function Popover({ children }) {
  const [open, setOpen] = useState(false);
  
  return (
    <div className="relative inline-block">
      {React.Children.map(children, child => {
        if (child?.type === PopoverTrigger) {
          return React.cloneElement(child, { onClick: () => setOpen(!open) });
        }
        if (child?.type === PopoverContent) {
          return open ? React.cloneElement(child, { onClose: () => setOpen(false) }) : null;
        }
        return child;
      })}
    </div>
  );
}

export function PopoverTrigger({ children, onClick, className, ...props }) {
  return (
    <div className={cn('cursor-pointer', className)} onClick={onClick} {...props}>
      {children}
    </div>
  );
}

export function PopoverContent({ children, onClose, className, ...props }) {
  const ref = useRef(null);

  useEffect(() => {
    function handleClickOutside(e) {
      if (ref.current && !ref.current.contains(e.target)) {
        onClose?.();
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [onClose]);

  return (
    <div
      ref={ref}
      className={cn(
        'absolute z-50 mt-2 min-w-[200px] rounded-md border border-zinc-700',
        'bg-zinc-900 p-4 shadow-xl animate-fade-in',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

```

### ./src/components/ui/progress.jsx
```
import React from 'react';
import { cn } from '@/lib/utils';

export function Progress({ value = 0, max = 100, className, barClassName, ...props }) {
  const percentage = Math.min(100, Math.max(0, (value / max) * 100));
  
  return (
    <div
      className={cn(
        'relative h-3 w-full overflow-hidden rounded-full bg-zinc-800',
        className
      )}
      {...props}
    >
      <div
        className={cn(
          'h-full rounded-full transition-all duration-500 ease-out',
          percentage >= 70 ? 'bg-teal-500' : percentage >= 40 ? 'bg-amber-500' : 'bg-red-500',
          barClassName
        )}
        style={{ width: `${percentage}%` }}
      />
    </div>
  );
}

```

### ./src/components/ui/select.jsx
```
import React from 'react';
import { cn } from '@/lib/utils';

export function Select({ className, children, ...props }) {
  return (
    <select
      className={cn(
        'flex h-10 w-full rounded-md border border-zinc-700 bg-zinc-800/50',
        'px-3 py-2 text-sm text-zinc-100',
        'focus:outline-none focus:ring-2 focus:ring-teal-500/50 focus:border-teal-500',
        'disabled:cursor-not-allowed disabled:opacity-50',
        'appearance-none cursor-pointer transition-colors',
        className
      )}
      {...props}
    >
      {children}
    </select>
  );
}

export function SelectOption({ value, children, ...props }) {
  return (
    <option value={value} className="bg-zinc-900 text-zinc-100" {...props}>
      {children}
    </option>
  );
}

```

### ./src/components/ui/slider.jsx
```
import React from 'react';
import { cn } from '@/lib/utils';

export function Slider({ value = 0, min = 0, max = 100, step = 1, onChange, className, ...props }) {
  const percentage = ((value - min) / (max - min)) * 100;
  
  return (
    <div className={cn('relative w-full', className)} {...props}>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange?.(Number(e.target.value))}
        className={cn(
          'w-full h-2 rounded-full appearance-none cursor-pointer',
          'bg-zinc-700 accent-teal-500',
          '[&::-webkit-slider-thumb]:appearance-none',
          '[&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4',
          '[&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-teal-500',
          '[&::-webkit-slider-thumb]:cursor-pointer'
        )}
      />
      <div className="flex justify-between text-xs text-zinc-500 mt-1">
        <span>{min}</span>
        <span className="text-teal-400 font-medium">{value}</span>
        <span>{max}</span>
      </div>
    </div>
  );
}

```

### ./src/components/ui/switch.jsx
```
import React from 'react';
import { cn } from '@/lib/utils';

export function Switch({ checked, onCheckedChange, className, disabled, ...props }) {
  return (
    <button
      role="switch"
      aria-checked={checked}
      disabled={disabled}
      onClick={() => onCheckedChange?.(!checked)}
      className={cn(
        'inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full',
        'border-2 border-transparent transition-colors',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
        'disabled:cursor-not-allowed disabled:opacity-50',
        checked ? 'bg-teal-500' : 'bg-zinc-700',
        className
      )}
      {...props}
    >
      <span
        className={cn(
          'pointer-events-none block h-5 w-5 rounded-full bg-white shadow-lg',
          'ring-0 transition-transform',
          checked ? 'translate-x-5' : 'translate-x-0'
        )}
      />
    </button>
  );
}

```

### ./src/components/ui/textarea.jsx
```
import React from 'react';
import { cn } from '@/lib/utils';

export function Textarea({ className, ...props }) {
  return (
    <textarea
      className={cn(
        'flex min-h-[80px] w-full rounded-md border border-zinc-700 bg-zinc-800/50',
        'px-3 py-2 text-sm text-zinc-100 placeholder:text-zinc-500',
        'focus:outline-none focus:ring-2 focus:ring-teal-500/50 focus:border-teal-500',
        'disabled:cursor-not-allowed disabled:opacity-50',
        'resize-none transition-colors',
        className
      )}
      {...props}
    />
  );
}

```

### ./src/components/ui/tooltip.jsx
```
import React, { useState } from 'react';
import { cn } from '@/lib/utils';

export function Tooltip({ children, content, className }) {
  const [show, setShow] = useState(false);

  return (
    <div
      className="relative inline-block"
      onMouseEnter={() => setShow(true)}
      onMouseLeave={() => setShow(false)}
    >
      {children}
      {show && content && (
        <div
          className={cn(
            'absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1',
            'text-xs text-zinc-200 bg-zinc-800 border border-zinc-700',
            'rounded shadow-lg whitespace-nowrap z-50 animate-fade-in',
            className
          )}
        >
          {content}
        </div>
      )}
    </div>
  );
}

```

### ./src/hooks/useTradingRules.js
```
import { useState, useEffect, useCallback } from 'react';
import { TradingRule, bulkUpdateRules } from '@/api/db';
import { notifyChange, onSyncChange } from '@/lib/sync';

const DEFAULT_RULES = [
  { title: 'EMA Alignment', description: 'Price respecting EMA structure', category: 'entry', order: 1 },
  { title: 'Liquidity Sweep', description: 'Clear liquidity taken before entry', category: 'entry', order: 2 },
  { title: 'MSS on LTF', description: 'Market structure shift confirmed on lower timeframe', category: 'entry', order: 3 },
  { title: 'R/R Minimum 1:2', description: 'Risk to reward ratio at least 1:2', category: 'risk', order: 4 },
  { title: 'Max 3 Trades', description: 'Do not exceed 3 trades per day', category: 'risk', order: 5 },
  { title: 'No Red News', description: 'No high-impact news within 30 minutes', category: 'filter', order: 6 },
  { title: 'Killzone Hours Only', description: 'Only trade during London or NY killzones', category: 'filter', order: 7 },
];

export function useTradingRules() {
  const [rules, setRules] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadRules = useCallback(async () => {
    try {
      let existing = await TradingRule.list();
      
      // Seed defaults if empty
      if (existing.length === 0) {
        for (const rule of DEFAULT_RULES) {
          await TradingRule.create({ ...rule, enabled: false });
        }
        existing = await TradingRule.list();
      }
      
      // Sort by order
      existing.sort((a, b) => (a.order || 0) - (b.order || 0));
      setRules(existing);
    } catch (err) {
      console.error('Failed to load rules:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadRules();
  }, [loadRules]);

  // Listen for cross-window rule changes and reload
  useEffect(() => {
    const cleanup = onSyncChange((msg) => {
      if (msg.type === 'rules' || msg.type === 'trading_rules') {
        loadRules();
      }
    });
    return cleanup;
  }, [loadRules]);

  const toggleRule = useCallback(async (ruleId) => {
    setRules(prev => {
      const updated = prev.map(r => 
        r.id === ruleId ? { ...r, enabled: !r.enabled } : r
      );
      return updated;
    });
    
    const rule = rules.find(r => r.id === ruleId);
    if (rule) {
      await TradingRule.update(ruleId, { enabled: !rule.enabled });
      notifyChange('rules');
    }
  }, [rules]);

  const addRule = useCallback(async ({ title, category, description = '' }) => {
    const maxOrder = rules.reduce((max, r) => Math.max(max, r.order || 0), 0);
    const newRule = await TradingRule.create({
      title,
      category,
      description,
      enabled: false,
      order: maxOrder + 1,
    });
    setRules(prev => [...prev, newRule]);
    notifyChange('rules');
  }, [rules]);

  const deleteRule = useCallback(async (ruleId) => {
    await TradingRule.delete(ruleId);
    setRules(prev => prev.filter(r => r.id !== ruleId));
    notifyChange('rules');
  }, []);

  const editRule = useCallback(async (ruleId, updates) => {
    await TradingRule.update(ruleId, updates);
    setRules(prev => prev.map(r => r.id === ruleId ? { ...r, ...updates } : r));
    notifyChange('rules');
  }, []);

  const resetAllRules = useCallback(async () => {
    const updates = rules.map(r => ({ id: r.id, enabled: false }));
    await bulkUpdateRules(updates);
    setRules(prev => prev.map(r => ({ ...r, enabled: false })));
    notifyChange('rules');
  }, [rules]);

  const reorderRules = useCallback(async (ruleId, direction) => {
    // direction: 'up' or 'down'
    const category = rules.find(r => r.id === ruleId)?.category;
    if (!category) return;

    // Get rules of the same category, sorted by order
    const categoryRules = rules.filter(r => r.category === category).sort((a, b) => (a.order || 0) - (b.order || 0));
    const idx = categoryRules.findIndex(r => r.id === ruleId);
    if (idx === -1) return;
    if (direction === 'up' && idx === 0) return;
    if (direction === 'down' && idx === categoryRules.length - 1) return;

    const swapIdx = direction === 'up' ? idx - 1 : idx + 1;

    // Swap order values
    const orderA = categoryRules[idx].order || idx;
    const orderB = categoryRules[swapIdx].order || swapIdx;

    await TradingRule.update(categoryRules[idx].id, { order: orderB });
    await TradingRule.update(categoryRules[swapIdx].id, { order: orderA });

    setRules(prev => {
      const updated = prev.map(r => {
        if (r.id === categoryRules[idx].id) return { ...r, order: orderB };
        if (r.id === categoryRules[swapIdx].id) return { ...r, order: orderA };
        return r;
      });
      return updated.sort((a, b) => (a.order || 0) - (b.order || 0));
    });

    notifyChange('rules');
  }, [rules]);

  return { rules, setRules, toggleRule, addRule, editRule, deleteRule, reorderRules, resetAllRules, loading, reload: loadRules };
}

```

### ./src/index.css
```
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    --background: 240 10% 3.9%;
    --foreground: 0 0% 98%;
    --card: 240 10% 3.9%;
    --card-foreground: 0 0% 98%;
    --popover: 240 10% 3.9%;
    --popover-foreground: 0 0% 98%;
    --primary: 174 72% 56%;
    --primary-foreground: 240 10% 3.9%;
    --secondary: 240 3.7% 15.9%;
    --secondary-foreground: 0 0% 98%;
    --muted: 240 3.7% 15.9%;
    --muted-foreground: 240 5% 64.9%;
    --accent: 174 72% 56%;
    --accent-foreground: 240 10% 3.9%;
    --destructive: 0 62.8% 50.6%;
    --destructive-foreground: 0 0% 98%;
    --border: 240 3.7% 15.9%;
    --input: 240 3.7% 15.9%;
    --ring: 174 72% 56%;
    --radius: 0.5rem;
  }

  .dark {
    --background: 240 10% 3.9%;
    --foreground: 0 0% 98%;
    --card: 240 10% 5.9%;
    --card-foreground: 0 0% 98%;
    --popover: 240 10% 5.9%;
    --popover-foreground: 0 0% 98%;
    --primary: 174 72% 56%;
    --primary-foreground: 240 10% 3.9%;
    --secondary: 240 3.7% 15.9%;
    --secondary-foreground: 0 0% 98%;
    --muted: 240 3.7% 15.9%;
    --muted-foreground: 240 5% 64.9%;
    --accent: 174 72% 56%;
    --accent-foreground: 240 10% 3.9%;
    --destructive: 0 62.8% 50.6%;
    --destructive-foreground: 0 0% 98%;
    --border: 240 3.7% 15.9%;
    --input: 240 3.7% 15.9%;
    --ring: 174 72% 56%;
  }
}

@layer base {
  * {
    @apply border-border;
  }
  body {
    @apply bg-background text-foreground;
    font-feature-settings: "rlig" 1, "calt" 1;
  }
}

/* Custom scrollbar */
::-webkit-scrollbar {
  width: 6px;
  height: 6px;
}

::-webkit-scrollbar-track {
  background: transparent;
}

::-webkit-scrollbar-thumb {
  background: hsl(240 3.7% 25%);
  border-radius: 3px;
}

::-webkit-scrollbar-thumb:hover {
  background: hsl(240 3.7% 35%);
}

/* Screen edge glow overlay */
.screen-glow {
  position: fixed;
  inset: 0;
  pointer-events: none;
  z-index: 50;
  transition: box-shadow 0.5s ease;
}

/* Tabular numbers for trading data */
.tabular-nums {
  font-variant-numeric: tabular-nums;
}

/* Pulse animation for lock */
@keyframes pulse-shrink {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(0.95); }
}

.animate-pulse-shrink {
  animation: pulse-shrink 0.3s ease-in-out;
}

```

### ./src/lib/badges.js
```
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

```

### ./src/lib/cockpitConstants.js
```
// Instruments
export const INSTRUMENTS = [
  { symbol: 'NQ1!', label: 'NQ', point_value: 20, tick: 1 },
  { symbol: 'MNQ1!', label: 'MNQ', point_value: 2, tick: 0.25 },
  { symbol: 'ES1!', label: 'ES', point_value: 50, tick: 0.25 },
  { symbol: 'MES1!', label: 'MES', point_value: 5, tick: 0.25 },
];

export const DISTANCE_BANDS = [
  { key: 'far', label: 'FAR', min: 30, color: '#64748b' },
  { key: 'approaching', label: 'APPROACHING', min: 15, color: '#eab308' },
  { key: 'near', label: 'NEAR', min: 5, color: '#f97316' },
  { key: 'imminent', label: 'IMMINENT', min: 0.01, color: '#ef4444' },
];

export const LEVEL_TYPES = [
  'PDH', 'PDL', 'PWH', 'PWL',
  'Asia High', 'Asia Low', 'London High', 'London Low',
  'Session High', 'Session Low', 'Swing High', 'Swing Low',
  'POC', 'VAH', 'VAL', 'HVN', 'LVN',
  'GEX Call Wall', 'GEX Put Wall', 'Gamma Flip',
  'Psychological', 'Liquidity Pool', 'FVG', 'Custom',
];

export const LIQUIDITY_TYPES = [
  'Buy-Side', 'Sell-Side', 'Equal Highs', 'Equal Lows',
  'Swing High', 'Swing Low', 'Session High', 'Session Low',
  'Psychological', 'PDH', 'PDL', 'PWH', 'PWL',
];

export const STRUCTURE_TYPES = [
  'Value Up', 'Value Down', 'Sideways',
  'Strong Trend Up', 'Strong Trend Down',
  'Weak Trend', 'Transition', 'Searching',
];

export const HTF_TIMEFRAMES = ['1H', '4H', 'Daily', 'Weekly'];
export const GAMMA_REGIMES = ['Positive', 'Negative', 'Unknown'];

export const LOCATION_TYPES = [
  'Premium', 'Value', 'Discount', 'Outside Value',
  'Liquidity Zone', 'LVN', 'HVN',
  'Fib Discount', 'Fib Premium', 'GEX Level', 'Swing Level', 'Custom',
];

export const TIMEFRAMES = ['1m', '5m', '15m', '1H', '4H', 'Daily', 'Weekly'];

export const EMOTIONAL_STATES = [
  'Calm', 'Focused', 'Frustrated', 'FOMO',
  'Revenge', 'Bored', 'Overconfident', 'Distracted',
];

export const DEFAULT_RISK_PROFILE = {
  account_size: 50000,
  daily_loss_limit: 1000,
  max_trade_risk: 200,
  max_contracts: 5,
  max_trades: 3,
  max_consecutive_losses: 2,
  nq_point_value: 20,
  mnq_point_value: 2,
  es_point_value: 50,
  mes_point_value: 5,
  session_start: '09:30',
  session_end: '11:00',
  volume_threshold: 20000,
  imbalance_threshold: 400,
};

export const DEFAULT_CONFIRMATIONS = [
  { id: 'aggression', label: 'Aggressive buyers/sellers at level', checked: false },
  { id: 'effort_result', label: 'Effort vs Result divergence', checked: false },
  { id: 'delta_shift', label: 'Delta shift / absorption', checked: false },
  { id: 'imbalance', label: 'Stacked imbalances', checked: false },
  { id: 'second_test', label: 'Second test / failure', checked: false },
  { id: 'entry_trigger', label: 'Entry trigger (candle close / break)', checked: false },
];

```

### ./src/lib/cockpitDb.js
```
/**
 * Cockpit Database Layer — localStorage CRUD for the professional trading cockpit
 * Uses 'dt_' prefix to avoid conflicts with the main app's 'tcai_db_' prefix
 */

const DB_PREFIX = 'dt_';

function generateId() {
  return `${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}

function getCollection(entity) {
  const key = `${DB_PREFIX}${entity}`;
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveCollection(entity, data) {
  const key = `${DB_PREFIX}${entity}`;
  localStorage.setItem(key, JSON.stringify(data));
}

export function create(entity, record) {
  const collection = getCollection(entity);
  const now = new Date().toISOString();
  const newRecord = { id: generateId(), created_date: now, updated_date: now, ...record };
  collection.push(newRecord);
  saveCollection(entity, collection);
  return newRecord;
}

export function list(entity, filter = null) {
  const collection = getCollection(entity);
  if (!filter) return collection;
  return collection.filter((item) =>
    Object.entries(filter).every(([key, value]) => item[key] === value)
  );
}

export function get(entity, id) {
  return getCollection(entity).find((item) => item.id === id) || null;
}

export function update(entity, id, updates) {
  const collection = getCollection(entity);
  const index = collection.findIndex((item) => item.id === id);
  if (index === -1) return null;
  collection[index] = { ...collection[index], ...updates, updated_date: new Date().toISOString() };
  saveCollection(entity, collection);
  return collection[index];
}

export function remove(entity, id) {
  const collection = getCollection(entity);
  saveCollection(entity, collection.filter((item) => item.id !== id));
}

export function getOrCreate(entity, defaults, filter = null) {
  const existing = list(entity, filter);
  if (existing.length > 0) return existing[0];
  return create(entity, defaults);
}

export function upsert(entity, filter, data) {
  const existing = list(entity, filter);
  if (existing.length > 0) return update(entity, existing[0].id, data);
  return create(entity, { ...filter, ...data });
}

export const ENTITIES = {
  MARKET_LEVELS: 'market_levels',
  LIQUIDITY_ZONES: 'liquidity_zones',
  MARKET_CONTEXT: 'market_context',
  TRADES: 'trades',
  DISCIPLINE_VIOLATIONS: 'discipline_violations',
  RISK_PROFILE: 'risk_profile',
};

export default { create, list, get, update, remove, getOrCreate, upsert, ENTITIES };

```

### ./src/lib/cockpitStore.jsx
```
import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import db, { ENTITIES } from '@/lib/cockpitDb';
import { INSTRUMENTS, DEFAULT_RISK_PROFILE, DEFAULT_CONFIRMATIONS, DISTANCE_BANDS } from '@/lib/cockpitConstants';

const CockpitContext = createContext(null);

// ─── Helpers ──────────────────────────────────────────────────────────────────

function getTodayNY() {
  const now = new Date();
  const ny = new Intl.DateTimeFormat('en-US', {
    timeZone: 'America/New_York',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).formatToParts(now);
  const y = ny.find((p) => p.type === 'year').value;
  const m = ny.find((p) => p.type === 'month').value;
  const d = ny.find((p) => p.type === 'day').value;
  return `${y}-${m}-${d}`;
}

function getPointValue(symbol, risk) {
  const inst = INSTRUMENTS.find((i) => i.symbol === symbol);
  if (inst) return inst.point_value;
  if (risk) {
    if (symbol.startsWith('MNQ')) return risk.mnq_point_value;
    if (symbol.startsWith('NQ')) return risk.nq_point_value;
    if (symbol.startsWith('MES')) return risk.mes_point_value;
    if (symbol.startsWith('ES')) return risk.es_point_value;
  }
  return 20;
}

// ─── Provider ─────────────────────────────────────────────────────────────────

export function CockpitProvider({ children }) {
  const today = getTodayNY();

  // Symbol & Price
  const [symbol, setSymbolState] = useState('NQ1!');
  const [currentPrice, setCurrentPrice] = useState(null);
  const [priceInput, setPriceInput] = useState('');

  // Levels & Liquidity
  const [levels, setLevels] = useState([]);
  const [liquidity, setLiquidity] = useState([]);

  // Context (market structure, HTF bias, gamma regime, GEX walls, scenarios)
  const [context, setContext] = useState({
    market_structure: '',
    htf_bias: '',
    gamma_regime: 'Unknown',
    gex_call_wall: '',
    gex_put_wall: '',
    scenarios: '',
  });

  // Setup
  const [setup, setSetup] = useState({
    direction: '',
    swing_high: '',
    swing_low: '',
    fib_618: '',
    fib_65: '',
    fib_705: '',
    fib_786: '',
    state: 'idle', // idle | planning | ready | active
  });

  // Internal Structure
  const [internalStructure, setInternalStructureState] = useState(false);

  // Confirmations
  const [confirmation, setConfirmationState] = useState(
    DEFAULT_CONFIRMATIONS.map((c) => ({ ...c }))
  );

  // Location
  const [location, setLocationState] = useState('');

  // Emotional State
  const [emotionalState, setEmotionalStateState] = useState('Calm');

  // Discipline Lock
  const [disciplineLocked, setDisciplineLocked] = useState(false);
  const [lockReason, setLockReason] = useState('');

  // Risk Profile
  const [risk, setRisk] = useState({ ...DEFAULT_RISK_PROFILE });

  // Trades & Violations
  const [trades, setTrades] = useState([]);
  const [violations, setViolations] = useState([]);

  // ─── Load data on mount / symbol change ───────────────────────────────────

  useEffect(() => {
    // Load levels
    const allLevels = db.list(ENTITIES.MARKET_LEVELS, { symbol });
    setLevels(allLevels);

    // Load liquidity
    const allLiquidity = db.list(ENTITIES.LIQUIDITY_ZONES, { symbol });
    setLiquidity(allLiquidity);

    // Load context for today+symbol
    const savedContext = db.list(ENTITIES.MARKET_CONTEXT, { date: today, symbol });
    if (savedContext.length > 0) {
      const ctx = savedContext[0];
      setContext({
        market_structure: ctx.market_structure || '',
        htf_bias: ctx.htf_bias || '',
        gamma_regime: ctx.gamma_regime || 'Unknown',
        gex_call_wall: ctx.gex_call_wall || '',
        gex_put_wall: ctx.gex_put_wall || '',
        scenarios: ctx.scenarios || '',
      });
    } else {
      setContext({
        market_structure: '',
        htf_bias: '',
        gamma_regime: 'Unknown',
        gex_call_wall: '',
        gex_put_wall: '',
        scenarios: '',
      });
    }

    // Load risk profile
    const riskRecords = db.list(ENTITIES.RISK_PROFILE);
    if (riskRecords.length > 0) {
      setRisk({ ...DEFAULT_RISK_PROFILE, ...riskRecords[0] });
    }

    // Load today's trades
    const todayTrades = db.list(ENTITIES.TRADES, { date: today, symbol });
    setTrades(todayTrades);

    // Load today's violations
    const todayViolations = db.list(ENTITIES.DISCIPLINE_VIOLATIONS, { date: today });
    setViolations(todayViolations);
  }, [symbol, today]);

  // ─── Computed Values ──────────────────────────────────────────────────────

  const pointValue = getPointValue(symbol, risk);

  const todayTrades = trades.filter((t) => t.date === today);

  const dailyPnL = todayTrades.reduce((sum, t) => {
    if (t.pnl != null) return sum + Number(t.pnl);
    return sum;
  }, 0);

  const confirmationCount = confirmation.filter((c) => c.checked).length;
  const confirmationTotal = confirmation.length;

  const executionScore = confirmationTotal > 0
    ? Math.round((confirmationCount / confirmationTotal) * 100)
    : 0;

  // ─── Auto-lock logic ──────────────────────────────────────────────────────

  useEffect(() => {
    if (disciplineLocked) return;

    // Max trades reached
    if (todayTrades.length >= risk.max_trades) {
      setDisciplineLocked(true);
      setLockReason(`Max trades reached (${risk.max_trades})`);
      return;
    }

    // Consecutive losses
    const recentTrades = [...todayTrades].sort(
      (a, b) => new Date(b.created_date) - new Date(a.created_date)
    );
    let consecutiveLosses = 0;
    for (const t of recentTrades) {
      if (t.pnl != null && Number(t.pnl) < 0) {
        consecutiveLosses++;
      } else {
        break;
      }
    }
    if (consecutiveLosses >= risk.max_consecutive_losses) {
      setDisciplineLocked(true);
      setLockReason(`${consecutiveLosses} consecutive losses`);
      return;
    }

    // Daily loss limit exceeded
    if (dailyPnL <= -Math.abs(risk.daily_loss_limit)) {
      setDisciplineLocked(true);
      setLockReason(`Daily loss limit reached ($${Math.abs(risk.daily_loss_limit)})`);
    }
  }, [todayTrades, dailyPnL, risk, disciplineLocked]);

  // ─── Level CRUD ───────────────────────────────────────────────────────────

  const addLevel = useCallback((level) => {
    const record = db.create(ENTITIES.MARKET_LEVELS, { ...level, symbol });
    setLevels((prev) => [...prev, record]);
    return record;
  }, [symbol]);

  const removeLevel = useCallback((id) => {
    db.remove(ENTITIES.MARKET_LEVELS, id);
    setLevels((prev) => prev.filter((l) => l.id !== id));
  }, []);

  // ─── Liquidity CRUD ───────────────────────────────────────────────────────

  const addLiquidity = useCallback((zone) => {
    const record = db.create(ENTITIES.LIQUIDITY_ZONES, { ...zone, symbol });
    setLiquidity((prev) => [...prev, record]);
    return record;
  }, [symbol]);

  const removeLiquidity = useCallback((id) => {
    db.remove(ENTITIES.LIQUIDITY_ZONES, id);
    setLiquidity((prev) => prev.filter((l) => l.id !== id));
  }, []);

  // ─── Context persistence ──────────────────────────────────────────────────

  const saveContext = useCallback((updates) => {
    const newContext = { ...context, ...updates };
    setContext(newContext);
    db.upsert(ENTITIES.MARKET_CONTEXT, { date: today, symbol }, newContext);
  }, [context, today, symbol]);

  // ─── Setup management ─────────────────────────────────────────────────────

  const updateSetup = useCallback((updates) => {
    setSetup((prev) => ({ ...prev, ...updates }));
  }, []);

  const resetSetup = useCallback(() => {
    setSetup({
      direction: '',
      swing_high: '',
      swing_low: '',
      fib_618: '',
      fib_65: '',
      fib_705: '',
      fib_786: '',
      state: 'idle',
    });
    setInternalStructureState(false);
    setConfirmationState(DEFAULT_CONFIRMATIONS.map((c) => ({ ...c })));
    setLocationState('');
  }, []);

  // ─── Confirmations ────────────────────────────────────────────────────────

  const setConfirmation = useCallback((id, checked) => {
    setConfirmationState((prev) =>
      prev.map((c) => (c.id === id ? { ...c, checked } : c))
    );
  }, []);

  // ─── Internal Structure ───────────────────────────────────────────────────

  const setInternalStructure = useCallback((value) => {
    setInternalStructureState(value);
  }, []);

  // ─── Location ─────────────────────────────────────────────────────────────

  const setLocation = useCallback((value) => {
    setLocationState(value);
  }, []);

  // ─── Emotional State ──────────────────────────────────────────────────────

  const setEmotionalState = useCallback((value) => {
    setEmotionalStateState(value);
  }, []);

  // ─── Trade CRUD ───────────────────────────────────────────────────────────

  const saveTrade = useCallback((trade) => {
    const record = db.create(ENTITIES.TRADES, {
      ...trade,
      date: today,
      symbol,
      confirmations_met: confirmationCount,
      confirmations_total: confirmationTotal,
      execution_score: executionScore,
      emotional_state: emotionalState,
      location,
    });
    setTrades((prev) => [...prev, record]);
    return record;
  }, [today, symbol, confirmationCount, confirmationTotal, executionScore, emotionalState, location]);

  const updateTrade = useCallback((id, updates) => {
    const updated = db.update(ENTITIES.TRADES, id, updates);
    if (updated) {
      setTrades((prev) => prev.map((t) => (t.id === id ? updated : t)));
    }
    return updated;
  }, []);

  // ─── Violations ───────────────────────────────────────────────────────────

  const logViolation = useCallback((violation) => {
    const record = db.create(ENTITIES.DISCIPLINE_VIOLATIONS, {
      ...violation,
      date: today,
      symbol,
      emotional_state: emotionalState,
    });
    setViolations((prev) => [...prev, record]);
    return record;
  }, [today, symbol, emotionalState]);

  // ─── Risk Profile ─────────────────────────────────────────────────────────

  const updateRisk = useCallback((updates) => {
    const riskRecords = db.list(ENTITIES.RISK_PROFILE);
    let updated;
    if (riskRecords.length > 0) {
      updated = db.update(ENTITIES.RISK_PROFILE, riskRecords[0].id, updates);
    } else {
      updated = db.create(ENTITIES.RISK_PROFILE, { ...DEFAULT_RISK_PROFILE, ...updates });
    }
    setRisk((prev) => ({ ...prev, ...updates }));
    return updated;
  }, []);

  // ─── Lock / Unlock ────────────────────────────────────────────────────────

  const lock = useCallback((reason) => {
    setDisciplineLocked(true);
    setLockReason(reason || 'Manually locked');
  }, []);

  const unlock = useCallback(() => {
    setDisciplineLocked(false);
    setLockReason('');
  }, []);

  // ─── Price & Symbol ───────────────────────────────────────────────────────

  const updatePrice = useCallback((price) => {
    setCurrentPrice(Number(price));
  }, []);

  const setSymbol = useCallback((sym) => {
    setSymbolState(sym);
    setPriceInput('');
    setCurrentPrice(null);
  }, []);

  // ─── Context Value ────────────────────────────────────────────────────────

  const value = {
    // State
    symbol,
    currentPrice,
    priceInput,
    levels,
    liquidity,
    context,
    setup,
    internalStructure,
    confirmation,
    location,
    emotionalState,
    disciplineLocked,
    lockReason,
    risk,
    trades,
    violations,

    // Computed
    pointValue,
    todayTrades,
    dailyPnL,
    confirmationCount,
    confirmationTotal,
    executionScore,

    // Actions
    addLevel,
    removeLevel,
    addLiquidity,
    removeLiquidity,
    saveContext,
    updateSetup,
    resetSetup,
    setConfirmation,
    setInternalStructure,
    setLocation,
    setEmotionalState,
    saveTrade,
    updateTrade,
    logViolation,
    updateRisk,
    lock,
    unlock,
    updatePrice,
    setSymbol,
    setPriceInput,
  };

  return (
    <CockpitContext.Provider value={value}>
      {children}
    </CockpitContext.Provider>
  );
}

// ─── Hook ─────────────────────────────────────────────────────────────────────

export function useCockpit() {
  const ctx = useContext(CockpitContext);
  if (!ctx) {
    throw new Error('useCockpit must be used within a CockpitProvider');
  }
  return ctx;
}

export default CockpitProvider;

```

### ./src/lib/integrity.js
```
// Integrity Score — tracks consistency of app usage over time

const STORAGE_KEY = 'tcai_integrity';

export function getIntegrityData() {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (raw) {
    try { return JSON.parse(raw); } catch (e) {}
  }
  return { tradingDays: [], expectedDaysPerWeek: 5 };
}

export function saveIntegrityData(data) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

// Log that the app was used today
export function logAppUsageToday() {
  const data = getIntegrityData();
  const today = new Date().toISOString().slice(0, 10); // YYYY-MM-DD
  if (!data.tradingDays.includes(today)) {
    data.tradingDays.push(today);
    // Keep only last 90 days
    const cutoff = new Date();
    cutoff.setDate(cutoff.getDate() - 90);
    data.tradingDays = data.tradingDays.filter(d => new Date(d) >= cutoff);
    saveIntegrityData(data);
  }
  return data;
}

// Calculate integrity score for a given period (last N days, default 30)
export function calculateIntegrity(days = 30) {
  const data = getIntegrityData();
  const cutoff = new Date();
  cutoff.setDate(cutoff.getDate() - days);
  
  const recentDays = data.tradingDays.filter(d => new Date(d) >= cutoff);
  
  // Count expected trading days (weekdays only) in the period
  let expectedDays = 0;
  const now = new Date();
  for (let i = 0; i < days; i++) {
    const d = new Date(now);
    d.setDate(d.getDate() - i);
    const dow = d.getDay();
    if (dow >= 1 && dow <= 5) expectedDays++; // Mon-Fri
  }
  
  // Scale by expected days per week setting
  const weeklyScale = (data.expectedDaysPerWeek || 5) / 5;
  expectedDays = Math.round(expectedDays * weeklyScale);
  
  const score = expectedDays > 0 ? Math.min(100, Math.round((recentDays.length / expectedDays) * 100)) : 0;
  
  return {
    score,
    daysUsed: recentDays.length,
    expectedDays,
    period: days,
  };
}

```

### ./src/lib/levelCarryOver.js
```
const STORAGE_KEY = 'tcai_level_queue';
const CARRYOVER_KEY = 'tcai_level_carryover';

// Save current unswept levels for tomorrow
export function saveUnsweptLevels() {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) return;
  const queue = JSON.parse(raw);
  const unswept = queue.filter(l => l.status !== 'swept');
  if (unswept.length > 0) {
    localStorage.setItem(CARRYOVER_KEY, JSON.stringify({
      levels: unswept,
      date: new Date().toISOString().slice(0, 10),
    }));
  }
}

// Get yesterday's unswept levels (if any)
export function getCarryOverLevels() {
  const raw = localStorage.getItem(CARRYOVER_KEY);
  if (!raw) return [];
  const data = JSON.parse(raw);
  // Only offer if saved yesterday (not older)
  const today = new Date().toISOString().slice(0, 10);
  if (data.date === today) return []; // same day, no carryover needed
  return data.levels || [];
}

// Clear carryover after importing
export function clearCarryOver() {
  localStorage.removeItem(CARRYOVER_KEY);
}

// Import carryover levels into the active queue
export function importCarryOverLevels() {
  const levels = getCarryOverLevels();
  if (levels.length === 0) return false;
  const raw = localStorage.getItem(STORAGE_KEY);
  const current = raw ? JSON.parse(raw) : [];
  // Reset status to 'watching' and add
  const imported = levels.map(l => ({ ...l, status: 'watching', id: Date.now() + '_' + Math.random().toString(36).slice(2) }));
  localStorage.setItem(STORAGE_KEY, JSON.stringify([...current, ...imported]));
  clearCarryOver();
  return true;
}

```

### ./src/lib/notifications.js
```
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

    // Weekend review prompt (Saturday at 10:00 AM)
    const day = now.getDay();
    if (day === 6 && h === 10 && m === 0) {
      sendNotification('Weekly Review', 'Time to review your week. Open the app to see your stats and patterns.', 'weekend_review');
    }
  }, 60000); // Check every minute

  timers.push(checkInterval);

  // Cleanup
  return () => {
    timers.forEach(t => clearInterval(t));
  };
}

```

### ./src/lib/patterns.js
```
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

```

### ./src/lib/shortcuts.js
```
import { useEffect } from 'react';

const STORAGE_KEY = 'tcai_shortcuts';

export const DEFAULT_SHORTCUTS = {
  execute: 'e',
  voiceJournal: ' ',
  emergency: 'Escape',
  toggleFirstRule: 'r',
  endSession: 'q',
};

export function getShortcuts() {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (!stored) {
    return { ...DEFAULT_SHORTCUTS };
  }
  const overrides = JSON.parse(stored);
  return { ...DEFAULT_SHORTCUTS, ...overrides };
}

export function saveShortcuts(shortcuts) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(shortcuts));
}

export function useKeyboardShortcuts(shortcuts, handlers) {
  useEffect(() => {
    function handleKeyDown(event) {
      const tag = document.activeElement?.tagName?.toLowerCase();
      if (tag === 'input' || tag === 'textarea') {
        return;
      }

      const key = event.key;

      if (key === shortcuts.execute && handlers.execute) {
        handlers.execute(event);
      } else if (key === shortcuts.voiceJournal && handlers.voiceJournal) {
        handlers.voiceJournal(event);
      } else if (key === shortcuts.emergency && handlers.emergency) {
        handlers.emergency(event);
      } else if (key === shortcuts.toggleFirstRule && handlers.toggleFirstRule) {
        handlers.toggleFirstRule(event);
      } else if (key === shortcuts.endSession && handlers.endSession) {
        handlers.endSession(event);
      }
    }

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [shortcuts, handlers]);
}

```

### ./src/lib/sweepSound.js
```
// Plays a short confirmation tone when a level is swept
// Uses Web Audio API — no external files needed

let audioCtx = null;

export function playSweepSound() {
  try {
    if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    
    const oscillator = audioCtx.createOscillator();
    const gainNode = audioCtx.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioCtx.destination);
    
    oscillator.type = 'sine';
    oscillator.frequency.setValueAtTime(880, audioCtx.currentTime); // A5
    oscillator.frequency.exponentialRampToValueAtTime(1320, audioCtx.currentTime + 0.1); // E6
    
    gainNode.gain.setValueAtTime(0.15, audioCtx.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.3);
    
    oscillator.start(audioCtx.currentTime);
    oscillator.stop(audioCtx.currentTime + 0.3);
  } catch (e) {
    // Silent fail if audio not available
  }
}

export function playTrappedSound() {
  try {
    if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    
    // Two-tone confirmation
    const osc1 = audioCtx.createOscillator();
    const osc2 = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    
    osc1.connect(gain);
    osc2.connect(gain);
    gain.connect(audioCtx.destination);
    
    osc1.type = 'sine';
    osc2.type = 'sine';
    osc1.frequency.value = 660; // E5
    osc2.frequency.value = 880; // A5
    
    gain.gain.setValueAtTime(0.1, audioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.4);
    
    osc1.start(audioCtx.currentTime);
    osc1.stop(audioCtx.currentTime + 0.2);
    osc2.start(audioCtx.currentTime + 0.15);
    osc2.stop(audioCtx.currentTime + 0.4);
  } catch (e) {}
}

```

### ./src/lib/sync.js
```
// Cross-window state synchronization via BroadcastChannel + storage event
// When one window writes to localStorage, the other detects it and reloads.

const CHANNEL_NAME = 'tcai_sync';

let channel = null;
try {
  channel = new BroadcastChannel(CHANNEL_NAME);
} catch (e) {
  // BroadcastChannel not supported — fall back to storage event only
}

/**
 * Notify other windows that data has changed.
 * @param {string} type - e.g. 'rules', 'trades', 'session'
 */
export function notifyChange(type) {
  const msg = { type, timestamp: Date.now() };
  
  // BroadcastChannel works across tabs/windows on same origin
  if (channel) {
    channel.postMessage(msg);
  }

  // Also set a volatile localStorage key to trigger the 'storage' event
  // (storage event fires on OTHER windows, not the current one)
  localStorage.setItem('tcai_sync_signal', JSON.stringify(msg));
}

/**
 * Listen for changes from other windows.
 * @param {function} callback - called with { type, timestamp } when another window signals a change
 * @returns {function} cleanup function
 */
export function onSyncChange(callback) {
  // Listen via BroadcastChannel
  const handleMessage = (event) => {
    callback(event.data);
  };
  if (channel) {
    channel.addEventListener('message', handleMessage);
  }

  // Listen via storage event (fires when another tab/window modifies localStorage)
  const handleStorage = (event) => {
    if (event.key === 'tcai_sync_signal' && event.newValue) {
      try {
        const msg = JSON.parse(event.newValue);
        callback(msg);
      } catch (e) {}
    }
    // Also catch direct DB changes
    if (event.key && event.key.startsWith('tcai_db_')) {
      const entityName = event.key.replace('tcai_db_', '');
      callback({ type: entityName, timestamp: Date.now() });
    }
  };
  window.addEventListener('storage', handleStorage);

  return () => {
    if (channel) channel.removeEventListener('message', handleMessage);
    window.removeEventListener('storage', handleStorage);
  };
}

```

### ./src/lib/templates.js
```
const STORAGE_KEY = 'tcai_templates';

export const DEFAULT_TEMPLATES = [
  {
    id: 'scalp',
    name: 'Scalp Day',
    max_trades: 5,
    daily_loss_limit: 200,
    max_session_minutes: 120,
    loss_cooldown_seconds: 180,
    ritual_minutes: 3,
  },
  {
    id: 'swing',
    name: 'Swing Day',
    max_trades: 2,
    daily_loss_limit: 500,
    max_session_minutes: 240,
    loss_cooldown_seconds: 300,
    ritual_minutes: 5,
  },
  {
    id: 'recovery',
    name: 'Recovery Mode',
    max_trades: 1,
    daily_loss_limit: 100,
    max_session_minutes: 60,
    loss_cooldown_seconds: 600,
    ritual_minutes: 10,
  },
];

export function getTemplates() {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (!stored) {
    return [...DEFAULT_TEMPLATES];
  }
  return JSON.parse(stored);
}

export function saveTemplate(template) {
  const templates = getTemplates();
  const newTemplate = {
    id: template.id || crypto.randomUUID(),
    name: template.name,
    max_trades: template.max_trades,
    daily_loss_limit: template.daily_loss_limit,
    max_session_minutes: template.max_session_minutes,
    loss_cooldown_seconds: template.loss_cooldown_seconds,
    ritual_minutes: template.ritual_minutes,
  };

  const existingIndex = templates.findIndex((t) => t.id === newTemplate.id);
  if (existingIndex >= 0) {
    templates[existingIndex] = newTemplate;
  } else {
    templates.push(newTemplate);
  }

  localStorage.setItem(STORAGE_KEY, JSON.stringify(templates));
  return newTemplate;
}

export function deleteTemplate(templateId) {
  const templates = getTemplates();
  const filtered = templates.filter((t) => t.id !== templateId);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
  return filtered;
}

```

### ./src/lib/tradingScore.js
```
// Daily Trading Score — single 0-100 number combining multiple metrics
// Formula: (compliance * 0.3) + (pnlDirection * 0.2) + (emotionalControl * 0.2) + (convictionAvg * 0.15) + (ruleAdherence * 0.15)

export function calculateTradingScore(trades, executionScore) {
  if (trades.length === 0) return 0;
  
  // Compliance (0-100): average rule compliance across trades
  const complianceScores = trades.map(t => {
    if (!t.rule_compliance || t.rule_compliance.length === 0) return 0;
    return (t.rule_compliance.filter(r => r.followed).length / t.rule_compliance.length) * 100;
  });
  const compliance = complianceScores.reduce((a, b) => a + b, 0) / complianceScores.length;
  
  // PnL Direction (0-100): 100 if net positive, 50 if breakeven, scaled 0-100
  const netPnl = trades.reduce((s, t) => s + (t.pnl || 0), 0);
  const pnlDirection = netPnl > 0 ? 100 : netPnl === 0 ? 50 : Math.max(0, 50 + netPnl); // rough scale
  
  // Emotional Control (0-100): absence of bad emotions (revenge, FOMO, etc.)
  const badEmotions = ['Revenge-minded', 'FOMO', 'Angry', 'Frustrated', 'Impatient'];
  const emotionIssues = trades.filter(t => badEmotions.includes(t.emotion_before) || badEmotions.includes(t.emotion_after)).length;
  const emotionalControl = Math.max(0, 100 - (emotionIssues / trades.length) * 100);
  
  // Conviction Average (0-100): average conviction scaled to 100
  const convictions = trades.filter(t => t.conviction > 0).map(t => t.conviction);
  const convictionAvg = convictions.length > 0 ? (convictions.reduce((a, b) => a + b, 0) / convictions.length / 5) * 100 : 50;
  
  // Rule Adherence (0-100): execution score passed in
  const ruleAdherence = executionScore;
  
  const score = Math.round(
    (compliance * 0.3) +
    (Math.min(100, Math.max(0, pnlDirection)) * 0.2) +
    (emotionalControl * 0.2) +
    (convictionAvg * 0.15) +
    (ruleAdherence * 0.15)
  );
  
  return Math.min(100, Math.max(0, score));
}

// Get letter grade from score
export function getGrade(score) {
  if (score >= 90) return { grade: 'A+', color: 'text-teal-400' };
  if (score >= 80) return { grade: 'A', color: 'text-teal-400' };
  if (score >= 70) return { grade: 'B+', color: 'text-emerald-400' };
  if (score >= 60) return { grade: 'B', color: 'text-emerald-400' };
  if (score >= 50) return { grade: 'C', color: 'text-amber-400' };
  if (score >= 40) return { grade: 'D', color: 'text-amber-400' };
  return { grade: 'F', color: 'text-red-400' };
}

```

### ./src/lib/utils.js
```
// Utility for merging class names (simplified clsx + tailwind-merge)
export function cn(...inputs) {
  return inputs.filter(Boolean).join(' ');
}

```

### ./src/main.jsx
```
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

```

### ./src/pages/Cockpit.jsx
```
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { CockpitProvider, useCockpit } from '@/lib/cockpitStore';
import { INSTRUMENTS } from '@/lib/cockpitConstants';
import EnvironmentPanel from '@/components/cockpit/EnvironmentPanel';
import LevelsPanel from '@/components/cockpit/LevelsPanel';
import LiquidityPanel from '@/components/cockpit/LiquidityPanel';
import FibCalculator from '@/components/cockpit/FibCalculator';
import LocationPanel from '@/components/cockpit/LocationPanel';
import ConfirmationPanel from '@/components/cockpit/ConfirmationPanel';
import AuthorizationGate from '@/components/cockpit/AuthorizationGate';
import DisciplinePanel from '@/components/cockpit/DisciplinePanel';
import TradingViewChart from '@/components/trading/TradingViewChart';
import { cn } from '@/lib/utils';

function CockpitInner() {
  const navigate = useNavigate();
  const {
    symbol, setSymbol, currentPrice, updatePrice, priceInput, setPriceInput,
    dailyPnL, confirmationCount, confirmationTotal, executionScore,
    todayTrades, disciplineLocked, emotionalState,
  } = useCockpit();

  const handlePriceSubmit = (e) => {
    e.preventDefault();
    if (priceInput) updatePrice(priceInput);
  };

  return (
    <div className="h-screen flex flex-col bg-zinc-950 overflow-hidden md:overflow-hidden">
      {/* Top Bar */}
      <header className="flex items-center justify-between px-3 py-1.5 border-b border-zinc-800/50 flex-shrink-0 bg-zinc-900/50">
        <div className="flex items-center gap-3">
          <select
            value={symbol}
            onChange={(e) => setSymbol(e.target.value)}
            className="bg-zinc-900 border border-zinc-800 rounded px-2 py-1 text-xs font-medium text-zinc-200 focus:outline-none focus:border-teal-400/50"
          >
            {INSTRUMENTS.map((i) => (
              <option key={i.symbol} value={i.symbol}>{i.label}</option>
            ))}
          </select>

          <form onSubmit={handlePriceSubmit} className="flex items-center gap-1">
            <input
              value={priceInput}
              onChange={(e) => setPriceInput(e.target.value)}
              placeholder="Price"
              className="w-24 bg-zinc-900 border border-zinc-800 rounded px-2 py-1 text-xs tabular-nums text-zinc-200 focus:outline-none focus:border-teal-400/50"
            />
            <button type="submit" className="px-2 py-1 rounded text-[10px] bg-zinc-800 border border-zinc-700 text-zinc-400 hover:text-zinc-200">Set</button>
          </form>

          {currentPrice > 0 && (
            <span className="text-xs tabular-nums text-zinc-200 font-medium">{currentPrice.toFixed(2)}</span>
          )}
        </div>

        <div className="flex items-center gap-4 text-[10px]">
          <span className="text-zinc-500">CONFIRMS: <span className={confirmationCount > 0 ? 'text-amber-400' : 'text-zinc-400'}>{confirmationCount}/{confirmationTotal}</span></span>
          <span className="text-zinc-500">TRADES: <span className="text-zinc-300">{todayTrades.length}</span></span>
          <span className="text-zinc-500">P&L: <span className={cn(dailyPnL > 0 ? 'text-green-400' : dailyPnL < 0 ? 'text-red-400' : 'text-zinc-400')}>${dailyPnL.toFixed(0)}</span></span>
          <span className={cn('font-medium', disciplineLocked ? 'text-red-400' : 'text-green-400')}>{disciplineLocked ? '🔒' : '●'}</span>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-[10px] text-zinc-600">{emotionalState}</span>
          <button
            onClick={() => navigate('/')}
            className="px-2 py-1 rounded text-[10px] bg-zinc-800 border border-zinc-700 text-zinc-400 hover:text-teal-400 transition-colors"
          >
            Dashboard
          </button>
        </div>
      </header>

      {/* Main: responsive layout */}
      <div className="flex-1 flex flex-col md:flex-row min-h-0 overflow-y-auto md:overflow-hidden">
        {/* LEFT RAIL — full width on mobile */}
        <div className="md:w-56 lg:w-64 flex-shrink-0 md:overflow-y-auto border-b md:border-b-0 md:border-r border-zinc-800/30 px-3 py-3 space-y-5">
          <EnvironmentPanel />
          <LevelsPanel />
          <LiquidityPanel />
        </div>

        {/* CENTER — Chart (hidden on mobile) */}
        <TradingViewChart className="hidden md:flex flex-1 min-w-0" />

        {/* RIGHT RAIL — full width on mobile */}
        <div className="md:w-56 lg:w-64 flex-shrink-0 md:overflow-y-auto border-t md:border-t-0 md:border-l border-zinc-800/30 px-3 py-3 space-y-5">
          <FibCalculator />
          <LocationPanel />
          <ConfirmationPanel />
          <AuthorizationGate />
          <DisciplinePanel />
        </div>
      </div>
    </div>
  );
}

export default function CockpitPage() {
  return (
    <CockpitProvider>
      <CockpitInner />
    </CockpitProvider>
  );
}

```

### ./src/pages/Dashboard.jsx
```
import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { TradingSession, Trade, WeeklyGoal, getOrCreateDNA } from '@/api/db';
import { useTradingRules } from '@/hooks/useTradingRules';
import { getWeekRange, isAPlusTrade } from '@/shared/weeklyGoal';
import { generateSessionSummary } from '@/shared/coachingEngine';
import { onSyncChange } from '@/lib/sync';
import { startNotificationScheduler, sendNotification, getSessionStartPhrase, getSessionEndPhrase } from '@/lib/notifications';
import { getShortcuts, useKeyboardShortcuts } from '@/lib/shortcuts';
import { logAppUsageToday } from '@/lib/integrity';
import { calculateTradingScore, getGrade } from '@/lib/tradingScore';

import SessionSetup from '@/components/trading/SessionSetup';
import DisciplineWheel from '@/components/trading/DisciplineWheel';
import EntryRuleButtons from '@/components/trading/EntryRuleButtons';
import OtherRulesDropdown from '@/components/trading/OtherRulesDropdown';
import EmaStatusToggle from '@/components/trading/EmaStatusToggle';
import LiquidityTargetToggle from '@/components/trading/LiquidityTargetToggle';
import KillZoneBadge from '@/components/trading/KillZoneBadge';
import LevelQueue from '@/components/trading/LevelQueue';
import DisplacementTracker from '@/components/trading/DisplacementTracker';
import PipelineBar from '@/components/trading/PipelineBar';
import SessionSummaryCard from '@/components/trading/SessionSummaryCard';
import CompactModeToggle from '@/components/trading/CompactModeToggle';
import { playTrappedSound } from '@/lib/sweepSound';
import { getCarryOverLevels, importCarryOverLevels, saveUnsweptLevels } from '@/lib/levelCarryOver';
import ExecuteConfirmDialog from '@/components/trading/ExecuteConfirmDialog';
import TradeDetail from '@/components/trading/TradeDetail';
import SessionTimer from '@/components/trading/SessionTimer';
import WeeklyGoalBar from '@/components/trading/WeeklyGoalBar';
import EndSessionDialog from '@/components/trading/EndSessionDialog';
import LockedScreen from '@/components/trading/LockedScreen';
import EmergencyIntervention from '@/components/trading/EmergencyIntervention';
import TradingViewChart from '@/components/trading/TradingViewChart';
import VoiceJournal from '@/components/trading/VoiceJournal';
import RitualTimer from '@/components/trading/RitualTimer';
import Confetti from '@/components/trading/Confetti';
import RiskBudget from '@/components/trading/RiskBudget';
import PositionTimer from '@/components/trading/PositionTimer';
import LevelPanel from '@/components/trading/LevelPanel';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const LOCK_THRESHOLD = 70;

// Motivational phrases that flank the wheel when locked
const LEFT_PHRASES = [
  "Wait for confluence.",
  "Patience pays.",
  "No setup, no trade.",
  "Protect your capital.",
  "Less is more.",
  "Wait for your pitch.",
];
const RIGHT_PHRASES = [
  "Trust the process.",
  "Discipline first.",
  "Quality over quantity.",
  "The market will wait.",
  "Check your rules.",
  "Earn the trade.",
];

function WheelPhrase({ side, isLocked }) {
  const phrases = side === 'left' ? LEFT_PHRASES : RIGHT_PHRASES;
  const [idx, setIdx] = useState(Math.floor(Math.random() * phrases.length));
  const [fade, setFade] = useState(true);

  useEffect(() => {
    if (!isLocked) return;
    const interval = setInterval(() => {
      setFade(false);
      setTimeout(() => { setIdx(prev => (prev + 1) % phrases.length); setFade(true); }, 250);
    }, 6000);
    return () => clearInterval(interval);
  }, [isLocked, phrases.length]);

  if (!isLocked) return <div className="w-20 hidden md:block" />;

  return (
    <div className={cn(
      'w-20 hidden md:flex items-center',
      side === 'left' ? 'justify-end text-right' : 'justify-start text-left'
    )}>
      <p className={cn(
        'text-[10px] leading-tight italic transition-opacity duration-300',
        fade ? 'opacity-60' : 'opacity-0',
        'text-zinc-500'
      )}>
        {phrases[idx]}
      </p>
    </div>
  );
}

export default function Dashboard() {
  const navigate = useNavigate();
  const { rules, toggleRule, addRule, editRule, deleteRule, reorderRules, resetAllRules, loading: rulesLoading } = useTradingRules();

  const [phase, setPhase] = useState('loading');
  const [session, setSession] = useState(null);
  const [trades, setTrades] = useState([]);
  const [lockoutUntil, setLockoutUntil] = useState(null);

  const [emaDirection, setEmaDirection] = useState(null);  // kept for wheel compat
  const [liquidityTarget, setLiquidityTarget] = useState(null); // 'bsl' | 'ssl' | 'both' | null
  const [levelSwept, setLevelSwept] = useState(false);
  const [displacementConfirmed, setDisplacementConfirmed] = useState(false);
  const [compactMode, setCompactMode] = useState(false);
  const [showCarryOver, setShowCarryOver] = useState(false);
  const [carryOverLevels, setCarryOverLevels] = useState([]);
  const [showExecuteDialog, setShowExecuteDialog] = useState(false);
  const [showTradeDetail, setShowTradeDetail] = useState(false);
  const [activeSlot, setActiveSlot] = useState(null);
  const [showEndDialog, setShowEndDialog] = useState(false);
  const [showEmergency, setShowEmergency] = useState(false);

  const [weeklyData, setWeeklyData] = useState({ aPlusCount: 0, target: 10, avgScore: 0 });

  // Discipline streak tracking
  const [streak, setStreak] = useState(0);
  const [speedWarning, setSpeedWarning] = useState(null);
  const ruleCheckTimesRef = React.useRef([]);

  // Anti-revenge cooldown
  const [cooldownUntil, setCooldownUntil] = useState(null);
  const [cooldownLeft, setCooldownLeft] = useState(0);

  // Session auto-end
  const [sessionTimeLeft, setSessionTimeLeft] = useState(null);

  // Voice journal entries
  const [voiceEntries, setVoiceEntries] = useState([]);

  // Confetti trigger for A+ wins
  const [confettiTrigger, setConfettiTrigger] = useState(0);

  // "What would you change" prompt (shown at end session)
  const [showReflectionPrompt, setShowReflectionPrompt] = useState(false);
  const [reflectionAnswer, setReflectionAnswer] = useState('');

  // Keyboard shortcuts
  const shortcuts = getShortcuts();
  useKeyboardShortcuts(shortcuts, {
    execute: () => { if (!isLocked && phase === 'trading') setShowExecuteDialog(true); },
    voiceJournal: () => {}, // handled by VoiceJournal component
    emergency: () => { if (phase === 'trading') setShowEmergency(true); },
    toggleFirstRule: () => {
      const firstUnchecked = entryRules.find(r => !r.enabled);
      if (firstUnchecked && phase === 'trading') toggleRule(firstUnchecked.id);
    },
    endSession: () => { if (phase === 'trading') setShowEndDialog(true); },
  });

  // Computed
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
  const requiredRulesMet = useMemo(() => {
    const requiredEntryRules = entryRules.filter(r => r.required);
    return requiredEntryRules.length === 0 || requiredEntryRules.every(r => r.enabled);
  }, [entryRules]);
  const isCoolingDown = cooldownLeft > 0;
  const isLocked = executionScore < LOCK_THRESHOLD || !requiredRulesMet || lossLimitHit || allSlotsFilled || isCoolingDown;

  // Screen-edge glow
  const glowStyle = useMemo(() => {
    const stops = [
      { at: 0, h: 0 }, { at: 30, h: 25 }, { at: 50, h: 40 },
      { at: 70, h: 55 }, { at: 80, h: 160 }, { at: 100, h: 174 },
    ];
    let lower = stops[0], upper = stops[1];
    for (let i = 0; i < stops.length - 1; i++) {
      if (executionScore >= stops[i].at && executionScore <= stops[i + 1].at) {
        lower = stops[i]; upper = stops[i + 1]; break;
      }
    }
    const t = (executionScore - lower.at) / ((upper.at - lower.at) || 1);
    const hue = lower.h + (upper.h - lower.h) * t;
    const alpha = 0.03 + (executionScore / 100) * 0.12;
    const spread = 30 + (executionScore / 100) * 50;
    return { boxShadow: `inset 0 0 ${spread}px hsla(${hue}, 80%, 50%, ${alpha})` };
  }, [executionScore]);

  // Score color RGB for execute button (same ramp as wheel)
  const scoreColorRgb = useMemo(() => {
    const stops = [
      { at: 0,   r: 239, g: 68,  b: 68  },
      { at: 30,  r: 249, g: 115, b: 22  },
      { at: 50,  r: 234, g: 179, b: 8   },
      { at: 70,  r: 34,  g: 197, b: 94  },
      { at: 80,  r: 45,  g: 212, b: 191 },
      { at: 100, r: 45,  g: 212, b: 191 },
    ];
    let lower = stops[0], upper = stops[1];
    for (let i = 0; i < stops.length - 1; i++) {
      if (executionScore >= stops[i].at && executionScore <= stops[i + 1].at) {
        lower = stops[i]; upper = stops[i + 1]; break;
      }
    }
    const t = (executionScore - lower.at) / ((upper.at - lower.at) || 1);
    const r = Math.round(lower.r + (upper.r - lower.r) * t);
    const g = Math.round(lower.g + (upper.g - lower.g) * t);
    const b = Math.round(lower.b + (upper.b - lower.b) * t);
    return `${r}, ${g}, ${b}`;
  }, [executionScore]);

  // Init
  useEffect(() => {
    async function init() {
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

      const activeId = localStorage.getItem('tcai_active_session');
      if (activeId) {
        try {
          const sess = await TradingSession.get(activeId);
          if (sess && sess.status === 'active') {
            setSession(sess);
            const sessionTrades = await Trade.list({ session_id: activeId });
            setTrades(sessionTrades.sort((a, b) => (a.slot_index || 0) - (b.slot_index || 0)));
            // Restore voice entries
            if (sess.voice_entries) setVoiceEntries(sess.voice_entries);
            setPhase('trading');
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

  // Listen for cross-window changes (trades from widget, rules toggled elsewhere)
  useEffect(() => {
    const cleanup = onSyncChange(async (msg) => {
      if (msg.type === 'trades' || msg.type === 'trading_rules' || msg.type === 'rules') {
        const activeId = localStorage.getItem('tcai_active_session');
        if (activeId) {
          const sessionTrades = await Trade.list({ session_id: activeId });
          setTrades(sessionTrades.sort((a, b) => (a.slot_index || 0) - (b.slot_index || 0)));
        }
      }
    });
    return cleanup;
  }, []);

  // Calculate discipline streak on load
  useEffect(() => {
    async function calcStreak() {
      const sessions = await TradingSession.list({ status: 'ended' });
      sessions.sort((a, b) => new Date(b.created_date) - new Date(a.created_date));
      let count = 0;
      for (const sess of sessions) {
        const sessionTrades = await Trade.list({ session_id: sess.id });
        const isDisciplined = sessionTrades.length > 0 && sessionTrades.every(t =>
          t.rule_compliance?.length > 0 && t.rule_compliance.every(r => r.followed)
        );
        if (isDisciplined) count++;
        else break;
      }
      setStreak(count);
    }
    calcStreak();
  }, [trades]);

  // Update browser tab title with streak
  useEffect(() => {
    if (phase === 'trading') {
      const fire = streak > 0 ? '\uD83D\uDD25' : '';
      document.title = `${fire}${streak > 0 ? ` ${streak} streak` : ''} ${executionScore}% — Trading Companion`;
    } else if (phase === 'locked') {
      document.title = '\uD83D\uDD12 Locked — Trading Companion';
    } else {
      document.title = 'Trading Companion';
    }
  }, [phase, streak, executionScore]);

  // Track rule-check speed and warn if too fast
  const prevEnabledCountRef = React.useRef(enabledEntryCount);
  useEffect(() => {
    if (enabledEntryCount > prevEnabledCountRef.current) {
      // A rule was just checked
      ruleCheckTimesRef.current.push(Date.now());

      // Check if last 3+ rules were checked within 8 seconds total
      const times = ruleCheckTimesRef.current;
      if (times.length >= 3) {
        const last3 = times.slice(-3);
        const span = last3[last3.length - 1] - last3[0];
        if (span < 8000) {
          setSpeedWarning('Slow down — are you actually confirming each condition on the chart?');
          setTimeout(() => setSpeedWarning(null), 6000);
        }
      }
    } else if (enabledEntryCount < prevEnabledCountRef.current) {
      // Rules were reset — clear timestamps
      ruleCheckTimesRef.current = [];
      setSpeedWarning(null);
    }
    prevEnabledCountRef.current = enabledEntryCount;
  }, [enabledEntryCount]);

  // Play trapped sound when execution score hits 80%
  const prevScoreRef = React.useRef(executionScore);
  useEffect(() => {
    if (executionScore >= 80 && prevScoreRef.current < 80) {
      playTrappedSound();
    }
    prevScoreRef.current = executionScore;
  }, [executionScore]);

  // Cooldown countdown timer
  useEffect(() => {
    if (!cooldownUntil) return;
    const interval = setInterval(() => {
      const remaining = Math.max(0, Math.ceil((cooldownUntil - Date.now()) / 1000));
      setCooldownLeft(remaining);
      if (remaining <= 0) {
        setCooldownUntil(null);
        setCooldownLeft(0);
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [cooldownUntil]);

  // Session auto-end timer
  useEffect(() => {
    if (phase !== 'trading' || !session?.start_time || !session?.max_session_minutes) return;
    // Don't run if already locked
    if (localStorage.getItem('tcai_lockout')) return;

    const maxMs = session.max_session_minutes * 60 * 1000;
    const endTime = new Date(session.start_time).getTime() + maxMs;

    // If the end time has already passed (e.g., page was refreshed after expiry), don't auto-fire
    if (Date.now() >= endTime) return;

    const interval = setInterval(() => {
      const remaining = Math.max(0, endTime - Date.now());
      setSessionTimeLeft(remaining);
      if (remaining <= 0) {
        clearInterval(interval);
        handleEndSession();
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [phase, session?.start_time, session?.max_session_minutes]);

  // Notification scheduler — runs during trading, uses actual rules
  useEffect(() => {
    if (phase !== 'trading') return;
    const cleanup = startNotificationScheduler(rules);
    // Check for carry-over levels
    const carryOver = getCarryOverLevels();
    if (carryOver.length > 0) {
      setCarryOverLevels(carryOver);
      setShowCarryOver(true);
    }
    return cleanup;
  }, [phase, rules]);

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
        if (sess.execution_score != null) { totalScore += sess.execution_score; scoreCount++; }
      }
      if (session) aPlusCount += trades.filter(isAPlusTrade).length;

      const goals = await WeeklyGoal.list();
      const weekGoal = goals.find(g => new Date(g.week_start) >= weekStart && new Date(g.week_start) <= weekEnd);

      setWeeklyData({
        aPlusCount,
        target: weekGoal?.a_plus_target || 10,
        avgScore: scoreCount > 0 ? Math.round(totalScore / scoreCount) : 0,
      });
    } catch (e) {
      console.error('Failed to load weekly data:', e);
    }
  }, [session, trades]);

  const handleBeginSession = async (config) => {
    logAppUsageToday();
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
    // Go to ritual phase (or straight to trading if ritual is 0/undefined)
    const ritualSecs = (config.ritual_minutes || 0) * 60;
    if (ritualSecs > 0) {
      setPhase('ritual');
    } else {
      setPhase('trading');
    }
    await loadWeeklyData();
  };

  const handleExecuteTrade = () => {
    setActiveSlot(trades.length);
    setShowExecuteDialog(false);
    setShowTradeDetail(true);
  };

  const handleSaveTrade = async (tradeData) => {
    const existing = trades.find(t => t.slot_index === tradeData.slot_index);
    if (existing) {
      await Trade.update(existing.id, tradeData);
      setTrades(prev => prev.map(t => t.id === existing.id ? { ...t, ...tradeData } : t));
    } else {
      const newTrade = await Trade.create({ ...tradeData, session_id: session.id });
      setTrades(prev => [...prev, newTrade]);

      // Trigger cooldown if this was a loss
      const cooldownSecs = session?.loss_cooldown_seconds || 0;
      if (tradeData.result === 'loss' && cooldownSecs > 0) {
        const until = Date.now() + cooldownSecs * 1000;
        setCooldownUntil(until);
        setCooldownLeft(cooldownSecs);
      }
    }
    if (!existing) await resetAllRules();
    setShowTradeDetail(false);
    await loadWeeklyData();

    // Trigger confetti if it's an A+ win (all rules followed + win)
    if (!existing && tradeData.result === 'win') {
      const isAplus = tradeData.rule_compliance?.length > 0 && tradeData.rule_compliance.every(r => r.followed);
      if (isAplus) setConfettiTrigger(prev => prev + 1);
    }
  };

  const handleSlotClick = (index) => {
    if (trades[index]) { setActiveSlot(index); setShowTradeDetail(true); }
  };

  const handleVoiceEntry = async (entry) => {
    const updated = [...voiceEntries, entry];
    setVoiceEntries(updated);
    // Persist to session
    if (session) {
      await TradingSession.update(session.id, { voice_entries: updated });
    }
  };

  const handleEndSession = async () => {
    // Guard: don't re-end an already-ended session
    if (!session || session.status === 'ended') return;

    // Save unswept levels for carry-over
    saveUnsweptLevels();

    const endTime = new Date().toISOString();
    const lockUntil = new Date(Date.now() + 6 * 60 * 60 * 1000).toISOString();

    // Calculate session execution score from actual trade rule_compliance data
    // (not from current checkbox state, which resets after each trade)
    let sessionExecScore = 0;
    if (trades.length > 0) {
      const tradeScores = trades.map(t => {
        if (!t.rule_compliance || t.rule_compliance.length === 0) return 0;
        const followed = t.rule_compliance.filter(r => r.followed).length;
        return Math.round((followed / t.rule_compliance.length) * 100);
      });
      sessionExecScore = Math.round(tradeScores.reduce((a, b) => a + b, 0) / tradeScores.length);
    }

    const summary = generateSessionSummary({
      trades, executionScore: sessionExecScore, startTime: session.start_time, endTime, dailyObjective: session.daily_objective,
    });

    // Compile voice journal from voice entries
    const voiceJournalText = voiceEntries.length > 0
      ? voiceEntries.map(e => {
          const time = new Date(e.time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
          return `[${time}] ${e.text}`;
        }).join('\n\n')
      : null;

    // Calculate daily trading score
    const dailyScore = calculateTradingScore(trades, sessionExecScore);

    await TradingSession.update(session.id, {
      status: 'ended', end_time: endTime, lockout_until: lockUntil,
      execution_score: sessionExecScore, summary,
      voice_journal: voiceJournalText,
      trading_score: dailyScore,
      reflection_answer: reflectionAnswer || null,
    });

    try {
      const dna = await getOrCreateDNA();
      const newTotal = (dna.total_sessions || 0) + 1;
      const newAvgScore = Math.round(((dna.avg_execution_score || 0) * (newTotal - 1) + sessionExecScore) / newTotal);
      if (dna.id) {
        const { TradingDNA } = await import('@/api/db');
        await TradingDNA.update(dna.id, { total_sessions: newTotal, avg_execution_score: newAvgScore });
      }
    } catch (e) { console.error('DNA update error:', e); }

    localStorage.setItem('tcai_lockout', JSON.stringify({ until: lockUntil, sessionId: session.id }));
    localStorage.removeItem('tcai_active_session');
    setShowEndDialog(false);
    setSession(prev => prev ? { ...prev, status: 'ended' } : prev);
    navigate('/reflection', { state: { sessionId: session.id } });
  };

  const handleLockoutExpired = () => {
    localStorage.removeItem('tcai_lockout');
    setPhase('setup');
    setSession(null);
    setTrades([]);
  };

  const handleEditWeeklyTarget = async (newTarget) => {
    const { weekStart, weekEnd } = getWeekRange();
    const goals = await WeeklyGoal.list();
    const existing = goals.find(g => new Date(g.week_start) >= weekStart && new Date(g.week_start) <= weekEnd);
    if (existing) await WeeklyGoal.update(existing.id, { a_plus_target: newTarget });
    else await WeeklyGoal.create({ week_start: weekStart.toISOString(), week_end: weekEnd.toISOString(), a_plus_target: newTarget });
    setWeeklyData(prev => ({ ...prev, target: newTarget }));
  };

  // --- Render ---

  if (phase === 'loading' || rulesLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-teal-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (phase === 'locked') {
    return <LockedScreen lockoutUntil={lockoutUntil} onExpired={handleLockoutExpired} onGoToReflection={() => navigate('/reflection')} />;
  }

  if (phase === 'setup') {
    return <SessionSetup onBeginSession={handleBeginSession} />;
  }

  if (phase === 'ritual') {
    return (
      <RitualTimer
        duration={(session?.ritual_minutes || 5) * 60}
        session={session}
        onComplete={() => setPhase('trading')}
      />
    );
  }

  // --- Trading Phase ---
  const totalR = trades.reduce((s, t) => s + (t.r_multiple || 0), 0);

  return (
    <>
      <div className="screen-glow animate-pulse-glow" style={glowStyle} />
      <EmergencyIntervention open={showEmergency} onClose={() => setShowEmergency(false)} />
      <Confetti trigger={confettiTrigger} />

      <div className="h-screen flex flex-col overflow-hidden">
        {/* Header bar */}
        <header className="flex items-center justify-between px-4 py-2 border-b border-zinc-800/30 flex-shrink-0">
          <div className="flex items-center gap-3">
            <SessionTimer startTime={session?.start_time} />
            <KillZoneBadge />
            {streak > 0 && (
              <span className="text-[10px] px-1.5 py-0.5 rounded bg-amber-500/10 text-amber-300 font-medium" title={`${streak} disciplined sessions in a row`}>
                {'\uD83D\uDD25'} {streak}
              </span>
            )}
            {sessionTimeLeft != null && session?.max_session_minutes > 0 && (
              <span className={cn(
                'text-[10px] font-mono tabular-nums px-1.5 py-0.5 rounded',
                sessionTimeLeft < 300000 ? 'bg-red-500/10 text-red-400' :
                sessionTimeLeft < 900000 ? 'bg-amber-500/10 text-amber-300' :
                'text-zinc-500'
              )} title="Time remaining in session">
                {Math.floor(sessionTimeLeft / 60000)}:{((Math.floor(sessionTimeLeft / 1000) % 60)).toString().padStart(2, '0')} left
              </span>
            )}
            <span className="text-[10px] text-zinc-600 uppercase tracking-wider hidden sm:inline">
              {session?.daily_objective}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => window.open(window.location.origin + '/#/widget', 'TradingWidget', 'width=280,height=520,resizable=yes,scrollbars=no,toolbar=no,menubar=no,location=no,status=no')}
              className="p-1.5 rounded text-zinc-500 hover:text-teal-400 hover:bg-zinc-800/50 transition-colors"
              title="Pop out widget"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </button>
            <button
              onClick={() => setShowEmergency(true)}
              className="p-1.5 rounded text-zinc-500 hover:text-amber-400 hover:bg-zinc-800/50 transition-colors"
              title="Circuit Breaker"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
            </button>
            <button
              onClick={() => navigate('/stats')}
              className="p-1.5 rounded text-zinc-500 hover:text-zinc-300 hover:bg-zinc-800/50 transition-colors"
              title="Stats"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </button>
            <Button variant="ghost" size="sm" onClick={() => setShowEndDialog(true)} className="text-xs text-zinc-500 hover:text-red-400">
              End
            </Button>
            <CompactModeToggle compact={compactMode} onToggle={() => setCompactMode(!compactMode)} />
          </div>
        </header>

        {/* Pipeline Status Bar */}
        <div className="px-4 py-1.5 border-b border-zinc-800/20">
          <PipelineBar
            levelQueued={levelSwept || displacementConfirmed || executionScore > 0}
            sweeping={levelSwept || displacementConfirmed}
            swept={levelSwept}
            displacementConfirmed={displacementConfirmed}
            rulesScore={executionScore}
            trapped={executionScore >= 80}
            executed={false}
          />
        </div>

        {/* Session Summary Card */}
        <SessionSummaryCard session={session} />

        {/* Carry-over prompt */}
        {showCarryOver && carryOverLevels.length > 0 && (
          <div className="mx-4 mt-2 p-2.5 rounded-lg bg-amber-500/5 border border-amber-500/20 flex items-center justify-between">
            <div>
              <p className="text-[10px] text-amber-300 font-medium">{carryOverLevels.length} level(s) from yesterday</p>
              <p className="text-[9px] text-zinc-500">Import unswept levels?</p>
            </div>
            <div className="flex gap-1.5">
              <button onClick={() => { importCarryOverLevels(); setShowCarryOver(false); window.location.reload(); }} className="px-2 py-1 rounded text-[9px] bg-teal-400/10 border border-teal-400/40 text-teal-400">Import</button>
              <button onClick={() => setShowCarryOver(false)} className="px-2 py-1 rounded text-[9px] text-zinc-500 border border-zinc-700">Dismiss</button>
            </div>
          </div>
        )}

        {/* Main content: Chart + Controls — responsive */}
        <div className="flex-1 flex flex-col md:flex-row min-h-0">
          {/* TradingView Chart — hidden on mobile, shown on desktop */}
          <TradingViewChart className="hidden md:flex flex-1 min-w-0 border-r border-zinc-800/30" />

          {/* Price Level Reference Panel — hidden on mobile */}
          <div className="hidden md:block">
            <LevelPanel session={session} />
          </div>

          {/* Controls panel — full width on mobile, sidebar on desktop */}
          <div className="flex-1 md:flex-none md:w-80 lg:w-96 overflow-y-auto px-4 py-4 space-y-4">
            {/* Wheel with motivational phrases */}
            <div className="flex items-center justify-center gap-2">
              <WheelPhrase side="left" isLocked={isLocked} />

              <div className="flex flex-col items-center">
                <div className="mb-2">
                  <LiquidityTargetToggle target={liquidityTarget} onChange={setLiquidityTarget} />
                </div>

                {/* Level Queue — hidden in compact mode */}
                {!compactMode && (
                  <div className="mb-3 w-full max-w-xs">
                    <LevelQueue onLevelSwept={() => setLevelSwept(true)} />
                  </div>
                )}

                {/* Displacement Tracker — hidden in compact mode */}
                {!compactMode && (
                  <div className="mb-3 w-full max-w-xs">
                    <DisplacementTracker
                      active={levelSwept}
                      onConfirm={() => setDisplacementConfirmed(true)}
                    />
                  </div>
                )}

                <DisciplineWheel
                  rules={rules}
                  executionScore={executionScore}
                  trades={trades}
                  maxTrades={session?.max_trades || 3}
                  liquidityTarget={liquidityTarget}
                  onSlotClick={handleSlotClick}
                />

                {/* Inline stats */}
                <div className="flex items-center gap-4 mt-3 text-xs font-mono tabular-nums">
                  <span className={cn(cumulativePnl >= 0 ? 'text-emerald-400' : 'text-red-400')}>
                    ${cumulativePnl >= 0 ? '+' : ''}{cumulativePnl.toFixed(0)}
                  </span>
                  <span className={cn(totalR >= 0 ? 'text-emerald-400/70' : 'text-red-400/70')}>
                    {totalR >= 0 ? '+' : ''}{totalR.toFixed(1)}R
                  </span>
                  {dailyLossLimit > 0 && (
                    <span className={cn(lossLimitHit ? 'text-red-400' : 'text-zinc-600')}>
                      -{dailyLossLimit}
                    </span>
                  )}
                </div>
              </div>

              <WheelPhrase side="right" isLocked={isLocked} />
            </div>

            {/* Risk Budget + Position Timer */}
            <RiskBudget dailyLossLimit={dailyLossLimit} cumulativePnl={cumulativePnl} />
            <PositionTimer
              lastTradeTime={trades.length > 0 ? trades[trades.length - 1]?.entry_time : null}
              isInTrade={trades.length > 0 && !trades[trades.length - 1]?.exit_time}
            />

            {/* Status line */}
            <div className={cn(
              'text-center text-[11px] font-medium py-1 rounded transition-all',
              lossLimitHit ? 'text-red-300 bg-red-500/5' :
              allSlotsFilled ? 'text-amber-300 bg-amber-500/5' :
              isLocked ? 'text-zinc-500' :
              'text-teal-300 bg-teal-500/5'
            )}>
              {lossLimitHit ? 'Loss limit hit.'
                : allSlotsFilled ? 'All slots filled.'
                : isCoolingDown ? `Cooldown: ${Math.floor(cooldownLeft / 60)}:${(cooldownLeft % 60).toString().padStart(2, '0')} — breathe`
                : !requiredRulesMet ? 'Required rules not met'
                : isLocked ? `Check ${Math.max(0, Math.ceil(totalEntryCount * 0.7) - enabledEntryCount)} more to unlock`
                : 'Unlocked'}
            </div>

            {/* Speed warning */}
            {speedWarning && (
              <div className="px-3 py-2 rounded-md bg-amber-500/10 border border-amber-500/20 text-amber-300 text-[11px] text-center animate-fade-in mb-2">
                {speedWarning}
              </div>
            )}

            {/* Cooldown overlay — hides rules after a loss */}
            {isCoolingDown ? (
              <div className="flex flex-col items-center justify-center py-8 space-y-4">
                <div className="w-16 h-16 rounded-full border-2 border-red-500/40 bg-red-500/10 flex items-center justify-center">
                  <span className="text-xl font-mono font-bold text-red-400 tabular-nums">
                    {Math.floor(cooldownLeft / 60)}:{(cooldownLeft % 60).toString().padStart(2, '0')}
                  </span>
                </div>
                <p className="text-xs text-zinc-400 text-center max-w-[200px]">
                  Post-loss cooldown active. Step back, breathe, and reset your mindset.
                </p>
                <p className="text-[10px] text-zinc-600 italic">Rules will reappear when the timer ends.</p>
              </div>
            ) : (
              <>
                {/* Entry Rules */}
                <EntryRuleButtons rules={rules} onToggle={toggleRule} onAdd={addRule} onDelete={deleteRule} onEdit={editRule} onReorder={reorderRules} disabled={false} />
              </>
            )}

            {/* Other Rules */}
            <OtherRulesDropdown rules={rules} onToggle={toggleRule} onAdd={addRule} onDelete={deleteRule} />

            {/* Execute Button */}
            <button
              className={cn(
                'w-full h-11 rounded-md text-sm font-bold transition-all duration-500',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950',
                isLocked
                  ? 'cursor-not-allowed'
                  : 'hover:brightness-110 active:scale-[0.98] shadow-lg'
              )}
              disabled={isLocked}
              onClick={() => !isLocked && setShowExecuteDialog(true)}
              style={{
                backgroundColor: isLocked ? `rgba(${scoreColorRgb}, 0.15)` : `rgb(${scoreColorRgb})`,
                color: isLocked ? `rgb(${scoreColorRgb})` : '#09090b',
                boxShadow: isLocked ? 'none' : `0 4px 20px rgba(${scoreColorRgb}, 0.3)`,
                border: isLocked ? `1px solid rgba(${scoreColorRgb}, 0.3)` : 'none',
              }}
            >
              {isLocked ? 'Locked' : 'Execute Trade'}
            </button>

            {/* Weekly goal */}
            <div className="opacity-70">
              <WeeklyGoalBar
                aPlusCount={weeklyData.aPlusCount}
                target={weeklyData.target}
                avgScore={weeklyData.avgScore}
                onEditTarget={handleEditWeeklyTarget}
              />
            </div>

            {/* Voice Journal */}
            <VoiceJournal entries={voiceEntries} onNewEntry={handleVoiceEntry} />

            {/* Affirmation */}
            {session?.daily_affirmation && (
              <p className="text-center text-[10px] text-zinc-600 italic">{session.daily_affirmation}</p>
            )}
          </div>
        </div>
      </div>

      {/* Dialogs */}
      <ExecuteConfirmDialog open={showExecuteDialog} onOpenChange={setShowExecuteDialog} rules={rules} onConfirm={handleExecuteTrade} />
      <TradeDetail open={showTradeDetail} onOpenChange={setShowTradeDetail} trade={activeSlot != null ? trades[activeSlot] : null} rules={rules} slotIndex={activeSlot ?? trades.length} onSave={handleSaveTrade} />
      <EndSessionDialog open={showEndDialog} onOpenChange={setShowEndDialog} onConfirm={handleEndSession} tradesCount={trades.length} executionScore={executionScore} onReflectionChange={setReflectionAnswer} />
    </>
  );
}

```

### ./src/pages/Reflection.jsx
```
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

```

### ./src/pages/Stats.jsx
```
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
import PatternInsights from '@/components/trading/PatternInsights';
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

          {/* Pattern Detection */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Pattern Insights</CardTitle>
            </CardHeader>
            <CardContent>
              <PatternInsights />
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

```

### ./src/pages/Widget.jsx
```
import React, { useState, useEffect, useMemo } from 'react';
import { useTradingRules } from '@/hooks/useTradingRules';
import { TradingSession, Trade } from '@/api/db';
import { notifyChange } from '@/lib/sync';
import { cn } from '@/lib/utils';

const UNLOCK_THRESHOLD = 75;

const RESULTS = [
  { value: 'win', label: 'W', color: 'bg-emerald-500/20 border-emerald-500/50 text-emerald-300' },
  { value: 'loss', label: 'L', color: 'bg-red-500/20 border-red-500/50 text-red-300' },
  { value: 'breakeven', label: 'BE', color: 'bg-zinc-600/20 border-zinc-500/50 text-zinc-300' },
  { value: 'scratched', label: 'S', color: 'bg-blue-500/20 border-blue-500/50 text-blue-300' },
];

export default function Widget() {
  const { rules, toggleRule, resetAllRules, loading } = useTradingRules();
  const [liquidityTarget, setLiquidityTarget] = useState(null); // 'bsl' | 'ssl' | 'both' | null
  const [session, setSession] = useState(null);
  const [trades, setTrades] = useState([]);

  // Trade logging flow: 'idle' | 'logging' | 'done'
  const [tradePhase, setTradePhase] = useState('idle');
  const [pendingTradeId, setPendingTradeId] = useState(null);
  const [tradeResult, setTradeResult] = useState('win');
  const [tradeR, setTradeR] = useState('');
  const [tradePnl, setTradePnl] = useState('');
  const [tradeNotes, setTradeNotes] = useState('');

  // Load active session
  useEffect(() => {
    async function loadSession() {
      const activeId = localStorage.getItem('tcai_active_session');
      if (activeId) {
        const sess = await TradingSession.get(activeId);
        if (sess && sess.status === 'active') {
          setSession(sess);
          const sessionTrades = await Trade.list({ session_id: activeId });
          setTrades(sessionTrades);
        }
      }
    }
    loadSession();
  }, []);

  // Entry rules only
  const entryRules = useMemo(() => rules.filter(r => r.category === 'entry'), [rules]);
  const enabledCount = useMemo(() => entryRules.filter(r => r.enabled).length, [entryRules]);
  const totalCount = entryRules.length;
  const score = totalCount > 0 ? Math.round((enabledCount / totalCount) * 100) : 0;
  const isUnlocked = score >= UNLOCK_THRESHOLD;

  // Max trades check
  const maxTrades = session?.max_trades || 3;
  const allSlotsFilled = trades.length >= maxTrades;

  // Border glow color based on liquidity target
  const borderGlowClass = useMemo(() => {
    if (liquidityTarget === 'bsl') return 'shadow-[inset_0_0_0_2px_#10b981,0_0_20px_#10b98140,inset_0_0_20px_#10b98120]';
    if (liquidityTarget === 'ssl') return 'shadow-[inset_0_0_0_2px_#ef4444,0_0_20px_#ef444440,inset_0_0_20px_#ef444420]';
    if (liquidityTarget === 'both') return 'shadow-[inset_0_0_0_2px_#f59e0b,0_0_20px_#f59e0b40,inset_0_0_20px_#f59e0b20]';
    return 'shadow-[inset_0_0_0_1px_#27272a]';
  }, [liquidityTarget]);

  // Step 1: Execute trade — create record, show logging form
  const handleExecute = async () => {
    const slotIndex = trades.length;
    const ruleCompliance = entryRules.map(r => ({ rule: r.title, followed: r.enabled }));

    if (session) {
      const newTrade = await Trade.create({
        session_id: session.id,
        slot_index: slotIndex,
        entry_time: new Date().toISOString(),
        result: 'scratched',
        r_multiple: 0,
        pnl: 0,
        notes: '',
        rule_compliance: ruleCompliance,
      });
      setPendingTradeId(newTrade.id);
      setTrades(prev => [...prev, newTrade]);
    }

    // Reset rules immediately so next trade requires re-checking
    await resetAllRules();

    // Notify main window about the new trade
    notifyChange('trades');

    // Show the quick-log form
    setTradeResult('win');
    setTradeR('');
    setTradePnl('');
    setTradeNotes('');
    setTradePhase('logging');
  };

  // Step 2: Save trade details
  const handleSaveTrade = async () => {
    if (pendingTradeId) {
      await Trade.update(pendingTradeId, {
        result: tradeResult,
        r_multiple: parseFloat(tradeR) || 0,
        pnl: parseFloat(tradePnl) || 0,
        notes: tradeNotes,
        exit_time: new Date().toISOString(),
      });

      // Update local trades state
      setTrades(prev => prev.map(t =>
        t.id === pendingTradeId
          ? { ...t, result: tradeResult, r_multiple: parseFloat(tradeR) || 0, pnl: parseFloat(tradePnl) || 0, notes: tradeNotes }
          : t
      ));
    }

    // Notify main window about the trade update
    notifyChange('trades');

    setTradePhase('done');
    setPendingTradeId(null);

    // Flash confirmation then reset
    setTimeout(() => setTradePhase('idle'), 1500);
  };

  // Skip logging — keep trade as scratched
  const handleSkipLog = () => {
    setTradePhase('done');
    setPendingTradeId(null);
    setTimeout(() => setTradePhase('idle'), 1500);
  };

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center bg-zinc-950">
        <div className="w-5 h-5 border-2 border-teal-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className={cn(
      'h-screen bg-zinc-950 flex flex-col transition-shadow duration-500 rounded-lg overflow-hidden',
      borderGlowClass
    )}>
      {/* Compact Header */}
      <div className="flex items-center justify-between px-3 py-2 border-b border-zinc-800/50 bg-zinc-900/80">
        <div className="flex items-center gap-2">
          <div className={cn(
            'w-2 h-2 rounded-full',
            session ? 'bg-emerald-400 animate-pulse' : 'bg-zinc-600'
          )} />
          <span className="text-[11px] font-medium text-zinc-400 uppercase tracking-wider">
            {tradePhase === 'logging' ? 'Log Trade' : 'Checklist'}
          </span>
        </div>
        <div className="flex items-center gap-1">
          <span className={cn(
            'text-xs font-mono tabular-nums px-1.5 py-0.5 rounded',
            tradePhase === 'logging'
              ? 'bg-amber-500/20 text-amber-300'
              : score >= UNLOCK_THRESHOLD
              ? 'bg-teal-500/20 text-teal-300'
              : score >= 40
              ? 'bg-amber-500/20 text-amber-300'
              : 'bg-zinc-800 text-zinc-500'
          )}>
            {tradePhase === 'logging' ? `#${trades.length}` : `${score}%`}
          </span>
        </div>
      </div>

      {/* Liquidity Target Toggle */}
      <div className="flex items-center gap-1 px-3 py-2 border-b border-zinc-800/30">
        <button
          onClick={() => setLiquidityTarget(liquidityTarget === 'bsl' ? null : 'bsl')}
          className={cn(
            'flex-1 px-2 py-1 rounded text-[11px] font-medium transition-all text-center border',
            liquidityTarget === 'bsl'
              ? 'bg-emerald-500/15 text-emerald-300 border-emerald-500/50 shadow-sm shadow-emerald-500/20'
              : 'bg-zinc-800/50 text-zinc-500 border-zinc-700/50 hover:border-zinc-600'
          )}
        >
          BSL ▲
        </button>
        <button
          onClick={() => setLiquidityTarget(liquidityTarget === 'ssl' ? null : 'ssl')}
          className={cn(
            'flex-1 px-2 py-1 rounded text-[11px] font-medium transition-all text-center border',
            liquidityTarget === 'ssl'
              ? 'bg-red-500/15 text-red-300 border-red-500/50 shadow-sm shadow-red-500/20'
              : 'bg-zinc-800/50 text-zinc-500 border-zinc-700/50 hover:border-zinc-600'
          )}
        >
          SSL ▼
        </button>
        <button
          onClick={() => setLiquidityTarget(liquidityTarget === 'both' ? null : 'both')}
          className={cn(
            'flex-1 px-2 py-1 rounded text-[11px] font-medium transition-all text-center border',
            liquidityTarget === 'both'
              ? 'bg-amber-500/15 text-amber-300 border-amber-500/50 shadow-sm shadow-amber-500/20'
              : 'bg-zinc-800/50 text-zinc-500 border-zinc-700/50 hover:border-zinc-600'
          )}
        >
          Both ◆
        </button>
      </div>

      {/* Main content area — switches between checklist and trade logging */}
      {tradePhase === 'idle' && (
        <>
          {/* Rule Checkboxes */}
          <div className="flex-1 overflow-y-auto px-3 py-2 space-y-1.5">
            {entryRules.map((rule) => (
              <button
                key={rule.id}
                onClick={() => toggleRule(rule.id)}
                className={cn(
                  'w-full flex items-center gap-2.5 px-2.5 py-2 rounded-md text-left transition-all',
                  'border',
                  rule.enabled
                    ? 'border-teal-500/40 bg-teal-500/10 text-teal-200'
                    : 'border-zinc-800 bg-zinc-900/50 text-zinc-400 hover:border-zinc-700 hover:bg-zinc-800/50'
                )}
              >
                <div className={cn(
                  'w-4 h-4 rounded border-2 flex items-center justify-center flex-shrink-0 transition-all',
                  rule.enabled
                    ? 'border-teal-400 bg-teal-500'
                    : 'border-zinc-600 bg-transparent'
                )}>
                  {rule.enabled && (
                    <svg className="w-2.5 h-2.5 text-zinc-950" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={3}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  )}
                </div>
                <span className="text-[12px] leading-tight">{rule.title}</span>
              </button>
            ))}

            {entryRules.length === 0 && (
              <p className="text-xs text-zinc-600 italic text-center py-4">
                No entry rules configured. Add rules in the main dashboard.
              </p>
            )}
          </div>

          {/* Execute Button Area */}
          <div className="px-3 py-2.5 border-t border-zinc-800/50 bg-zinc-900/50">
            {allSlotsFilled ? (
              <div className="w-full py-2.5 rounded-md bg-zinc-800/50 border border-zinc-700/50 text-center">
                <span className="text-zinc-500 text-xs">All {maxTrades} slots filled</span>
              </div>
            ) : isUnlocked ? (
              <button
                onClick={handleExecute}
                className={cn(
                  'w-full py-2.5 rounded-md font-semibold text-sm transition-all',
                  'bg-teal-500 text-zinc-950 hover:bg-teal-400 active:scale-[0.98]',
                  'shadow-lg shadow-teal-500/25'
                )}
              >
                Execute Trade
              </button>
            ) : (
              <div className="w-full py-2.5 rounded-md bg-zinc-800/30 border border-zinc-700/30 text-center">
                <span className="text-zinc-500 text-[11px]">
                  Check {Math.ceil(totalCount * (UNLOCK_THRESHOLD / 100)) - enabledCount} more rule{Math.ceil(totalCount * (UNLOCK_THRESHOLD / 100)) - enabledCount !== 1 ? 's' : ''} to unlock
                </span>
              </div>
            )}
          </div>
        </>
      )}

      {/* Quick Trade Logging Form */}
      {tradePhase === 'logging' && (
        <div className="flex-1 flex flex-col px-3 py-3 space-y-3 overflow-y-auto animate-fade-in">
          {/* Result Picker */}
          <div className="space-y-1.5">
            <span className="text-[10px] text-zinc-500 uppercase tracking-wider">Result</span>
            <div className="grid grid-cols-4 gap-1.5">
              {RESULTS.map(({ value, label, color }) => (
                <button
                  key={value}
                  onClick={() => setTradeResult(value)}
                  className={cn(
                    'py-2 rounded-md border text-xs font-bold transition-all text-center',
                    tradeResult === value
                      ? color
                      : 'border-zinc-700/50 bg-zinc-800/30 text-zinc-500 hover:border-zinc-600'
                  )}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>

          {/* R-Multiple */}
          <div className="space-y-1.5">
            <span className="text-[10px] text-zinc-500 uppercase tracking-wider">R-Multiple</span>
            <input
              type="number"
              step="0.1"
              placeholder="e.g. 2.5 or -1"
              value={tradeR}
              onChange={(e) => setTradeR(e.target.value)}
              className={cn(
                'w-full h-9 px-3 rounded-md border border-zinc-700 bg-zinc-800/50',
                'text-sm text-zinc-100 placeholder:text-zinc-600',
                'focus:outline-none focus:ring-2 focus:ring-teal-500/50 focus:border-teal-500'
              )}
            />
          </div>

          {/* PnL */}
          <div className="space-y-1.5">
            <span className="text-[10px] text-zinc-500 uppercase tracking-wider">PnL ($)</span>
            <input
              type="number"
              step="1"
              placeholder="Dollar amount"
              value={tradePnl}
              onChange={(e) => setTradePnl(e.target.value)}
              className={cn(
                'w-full h-9 px-3 rounded-md border border-zinc-700 bg-zinc-800/50',
                'text-sm text-zinc-100 placeholder:text-zinc-600',
                'focus:outline-none focus:ring-2 focus:ring-teal-500/50 focus:border-teal-500'
              )}
            />
          </div>

          {/* Quick Note */}
          <div className="space-y-1.5">
            <span className="text-[10px] text-zinc-500 uppercase tracking-wider">Quick Note (optional)</span>
            <textarea
              placeholder="What happened?"
              value={tradeNotes}
              onChange={(e) => setTradeNotes(e.target.value)}
              rows={2}
              className={cn(
                'w-full px-3 py-2 rounded-md border border-zinc-700 bg-zinc-800/50',
                'text-xs text-zinc-100 placeholder:text-zinc-600 resize-none',
                'focus:outline-none focus:ring-2 focus:ring-teal-500/50 focus:border-teal-500'
              )}
            />
          </div>

          {/* Save / Skip buttons */}
          <div className="flex gap-2 pt-1">
            <button
              onClick={handleSaveTrade}
              className={cn(
                'flex-1 py-2.5 rounded-md font-semibold text-sm transition-all',
                'bg-teal-500 text-zinc-950 hover:bg-teal-400 active:scale-[0.98]'
              )}
            >
              Save
            </button>
            <button
              onClick={handleSkipLog}
              className="px-4 py-2.5 rounded-md text-xs text-zinc-500 border border-zinc-700/50 hover:text-zinc-300 hover:border-zinc-600 transition-colors"
            >
              Skip
            </button>
          </div>
        </div>
      )}

      {/* Success confirmation */}
      {tradePhase === 'done' && (
        <div className="flex-1 flex items-center justify-center px-3">
          <div className="text-center space-y-2 animate-fade-in">
            <div className="w-10 h-10 mx-auto rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center">
              <svg className="w-5 h-5 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <p className="text-sm text-emerald-300 font-medium">Trade Logged</p>
            <p className="text-[10px] text-zinc-500">Rules reset — check off for next trade</p>
          </div>
        </div>
      )}

      {/* Footer - trade count */}
      {session && (
        <div className="px-3 py-1.5 border-t border-zinc-800/30 text-center">
          <span className="text-[10px] text-zinc-600">
            Trades: {trades.length}/{maxTrades}
          </span>
        </div>
      )}
    </div>
  );
}

```

### ./src/shared/coachingEngine.js
```
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

```

### ./src/shared/coachPersonalities.js
```
// Six AI coach personalities with emotion-keyed response arrays

export const coachPersonalities = {
  stoic_mentor: {
    label: "Stoic Mentor",
    icon: "Shield",
    tagline: "Discipline is freedom.",
    description: "Calm, measured, philosophical. Draws on stoic principles.",
    tone: "measured",
    prefixes: ["Remember:", "Consider:", "Reflect:", "The wise trader knows:"],
    style: {
      calm: [
        "Good. You're centered. This is where clarity lives.",
        "A calm mind sees the market clearly. Stay here.",
        "This presence is your edge. Guard it.",
      ],
      fomo: [
        "The market will be here tomorrow. Will your capital?",
        "Chasing is the enemy of process. Let it go.",
        "What you miss costs nothing. What you chase costs everything.",
      ],
      fear: [
        "Fear is data, not a command. What is it telling you?",
        "Courage isn't absence of fear—it's trading your plan despite it.",
        "If the setup is valid, trust it. If not, wait.",
      ],
      overconfidence: [
        "Confidence without humility is the market's favorite prey.",
        "The moment you feel invincible is when you're most vulnerable.",
        "Stay humble. The market doesn't care about your streak.",
      ],
      hesitation: [
        "Hesitation often masks wisdom. But don't let it become paralysis.",
        "If your rules say go, go. Trust the process you built.",
        "Analysis is preparation. At some point, you must act.",
      ],
      revenge: [
        "Stop. The market owes you nothing. This path leads to ruin.",
        "You cannot trade your way out of tilt. Step away.",
        "Revenge trading has never worked. Not once. Walk away.",
      ],
      frustration: [
        "Frustration means expectations don't match reality. Adjust expectations.",
        "The market is indifferent. Your frustration only hurts you.",
        "Channel this energy into review, not into the next trade.",
      ],
      boredom: [
        "Boredom is a trap. It leads to manufactured setups.",
        "The disciplined trader waits. Boredom is the cost of patience.",
        "No setup is better than a bad setup. Always.",
      ],
      general: [
        "Stay present. Trade what you see, not what you hope.",
        "Your only job is to follow your rules today.",
        "Process. Patience. Precision.",
      ],
    },
  },
  drill_sergeant: {
    label: "Drill Sergeant",
    icon: "Siren",
    tagline: "No excuses. Execute.",
    description: "Tough love, direct, no-nonsense accountability.",
    tone: "commanding",
    prefixes: ["Listen up:", "Soldier:", "Focus:", "No excuses:"],
    style: {
      calm: [
        "Good. Head in the game. Keep it there.",
        "That's the mindset. Now maintain it.",
        "Focused. Disciplined. That's what I want to see.",
      ],
      fomo: [
        "You WILL NOT chase. Stand down!",
        "That's not a setup, that's a trap. Eyes forward!",
        "Missing a trade is free. Breaking rules costs money. Stand down!",
      ],
      fear: [
        "Fear is fine. Cowardice is not. Do you have a valid setup or not?",
        "Check your rules. If they say go, you GO. That's the job.",
        "Scared money doesn't make money. But reckless money loses it all.",
      ],
      overconfidence: [
        "Wipe that smile off. The market will humble you FAST.",
        "Overconfidence has destroyed better traders than you. Stay sharp!",
        "One win doesn't make you a god. Back to basics!",
      ],
      hesitation: [
        "Make a decision! Hesitation kills edge.",
        "You've done the analysis. Now EXECUTE or STAND DOWN.",
        "This isn't a democracy. Your rules say yes or no. WHICH IS IT?",
      ],
      revenge: [
        "STAND DOWN! That is an ORDER! You are compromised!",
        "You are DONE for today. End the session NOW.",
        "Revenge trading is DESERTION of your plan. I won't allow it!",
      ],
      frustration: [
        "Feel frustrated? Good. Use it in your review, not your next trade.",
        "The market doesn't care about your feelings. Neither do I. Focus!",
        "Frustration means you expected something. Drop expectations, follow rules.",
      ],
      boredom: [
        "Bored? GOOD. That means you're not forcing garbage trades.",
        "Patience IS the job. You don't get paid for button-pressing.",
        "If you trade because you're bored, you'll lose because you're undisciplined.",
      ],
      general: [
        "Check your rules. Follow your plan. No deviation.",
        "You know what to do. Now DO IT.",
        "Discipline isn't a suggestion. It's the mission.",
      ],
    },
  },
  sarcastic_friend: {
    label: "Sarcastic Friend",
    icon: "Smile",
    tagline: "Oh, you again?",
    description: "Witty, irreverent, but actually cares. Roasts with love.",
    tone: "playful",
    prefixes: ["Okay listen,", "Bro.", "My guy.", "Oh cool,"],
    style: {
      calm: [
        "Look at you being all zen. Love that for you.",
        "Wow, actually focused today? Who is this person?",
        "This is the version of you that makes money. Stay here.",
      ],
      fomo: [
        "Oh you wanna chase? Let me get my popcorn for this disaster.",
        "FOMO entering the chat. FOMO has never made you money. Just saying.",
        "The trade left without you? Cool, there'll be another one in like 5 minutes.",
      ],
      fear: [
        "Scared? Valid. But also... is the setup there or not?",
        "Your palms are sweating. Is it fear or just too much coffee?",
        "If you're scared, reduce size. Don't just stare at the screen frozen.",
      ],
      overconfidence: [
        "Oh you think you're hot stuff now? Market says hold my beer.",
        "Confidence is great. Delusion is expensive. Which one is this?",
        "I've seen this movie before. It doesn't end well for the cocky one.",
      ],
      hesitation: [
        "So are we trading today or just... looking at charts recreationally?",
        "The setup is either there or it's not. It's not quantum physics.",
        "Blink twice if you need help pressing the button.",
      ],
      revenge: [
        "Oh you're angry and want to trade bigger? What could go wrong? EVERYTHING.",
        "Let me translate: 'I want to revenge trade' = 'I want to donate money.'",
        "Step. Away. From. The. Keyboard. I'm serious this time.",
      ],
      frustration: [
        "Frustrated? Welcome to trading. First time?",
        "The market is doing market things. Shocking, I know.",
        "Deep breaths. Or punch a pillow. Just don't punch in a trade.",
      ],
      boredom: [
        "Bored = about to do something dumb. I know you.",
        "There's nothing wrong with doing nothing. Try it sometime.",
        "Netflix exists for days like this. Just saying.",
      ],
      general: [
        "You know the rules. I know you know the rules. Follow them.",
        "How about we just... do what the plan says? Wild concept, I know.",
        "I believe in you. Mostly. Okay, partially. Just follow the rules.",
      ],
    },
  },
  wise_teacher: {
    label: "Wise Teacher",
    icon: "BookOpen",
    tagline: "Every trade is a lesson.",
    description: "Patient, educational, frames everything as growth.",
    tone: "nurturing",
    prefixes: ["Let's observe:", "Notice:", "What can we learn:", "Consider this:"],
    style: {
      calm: [
        "Beautiful. This centered state is where your best decisions live.",
        "You've cultivated this awareness through practice. Honor it.",
        "From this place of calm, your pattern recognition is sharpest.",
      ],
      fomo: [
        "FOMO is the market testing your patience. What will you choose?",
        "There are thousands of setups every week. This one doesn't define you.",
        "Notice the urgency. Name it. Let it pass. The next setup is coming.",
      ],
      fear: [
        "Fear is information. What specifically is it protecting you from?",
        "Sometimes fear says 'bad idea.' Sometimes it says 'unfamiliar.' Which is this?",
        "Acknowledge the fear, then return to your checklist. What do the rules say?",
      ],
      overconfidence: [
        "Confidence is earned through consistency, not a single result.",
        "The best traders stay humble because they've seen how fast things change.",
        "Let's channel this energy into precision rather than aggression.",
      ],
      hesitation: [
        "Hesitation can be wisdom or it can be avoidance. Which feels true here?",
        "What would help you commit? More confluence? Or just courage?",
        "The perfect trade doesn't exist. A good-enough setup with good rules does.",
      ],
      revenge: [
        "Pause. This impulse comes from pain, not from analysis.",
        "Your future self will thank you for not taking this trade.",
        "Loss is tuition. Revenge trading is paying tuition twice.",
      ],
      frustration: [
        "Frustration is a signal that something needs adjusting. What is it?",
        "The market is the ultimate teacher—but only if we listen without ego.",
        "This feeling will pass. Your capital doesn't have to pass with it.",
      ],
      boredom: [
        "Patience is not passive—it's an active choice to wait for quality.",
        "The market rewards those who can sit still. This is the test.",
        "Use this time to review, study, or simply rest. All are productive.",
      ],
      general: [
        "What does your trading plan say about this moment?",
        "Trust the process you've built. It was built in calm, for moments like this.",
        "Every session is practice. What are we practicing today?",
      ],
    },
  },
  meme_goblin: {
    label: "Meme Goblin",
    icon: "Laugh",
    tagline: "ser, this is a Wendy's.",
    description: "Chaotic, meme-heavy, zoomer energy. Surprisingly wise beneath the chaos.",
    tone: "chaotic",
    prefixes: ["ser.", "anon,", "fren,", "ayo"],
    style: {
      calm: [
        "you're in the zone rn. gigachad energy. keep it.",
        "this is the way. literally just vibing with the charts.",
        "based and disciplined-pilled. love to see it.",
      ],
      fomo: [
        "sir this is not the dip you think it is. ngmi if you chase.",
        "FOMO is literally a skill issue. touch grass and wait.",
        "the chart will still be there in 5 minutes. chill.",
      ],
      fear: [
        "scared money don't make money BUT rekt money don't make money either sooo",
        "if the setup is valid, send it. if not, go touch grass.",
        "fear is just your brain saying 'hey maybe check the checklist again.'",
      ],
      overconfidence: [
        "oh you're him now? the market has humbled better. stay humble ser.",
        "this is exactly when the market goes 'and I took that personally.'",
        "pride cometh before the margin call. just saying.",
      ],
      hesitation: [
        "are we trading or are we watching paint dry? valid either way tbh.",
        "the setup is either bussin or it's cap. decide.",
        "hesitation is just FOMO's introvert cousin.",
      ],
      revenge: [
        "BRO NO. this is how accounts go to zero. literally stop.",
        "revenge trading speedrun any%. don't be that guy.",
        "you're about to be a cautionary tale on fintwit. please stop.",
      ],
      frustration: [
        "the market said 'skill issue' and honestly... let's just reset.",
        "frustration = expectations not met. lower the expectations, raise the discipline.",
        "it's giving tilt. step away before you become the exit liquidity.",
      ],
      boredom: [
        "bored = about to ape into something dumb. i know you anon.",
        "there's literally no shame in 'no trade today.' log off king.",
        "the best trade is no trade when there's no trade. big brain.",
      ],
      general: [
        "check the rules, follow the plan, don't be cringe. simple as.",
        "we're here to make money, not content. follow the process.",
        "one good trade > ten degen trades. this is the way.",
      ],
    },
  },
  calm_psychologist: {
    label: "Calm Psychologist",
    icon: "Heart",
    tagline: "How does that make you feel?",
    description: "Empathetic, validating, helps process emotions before acting.",
    tone: "empathetic",
    prefixes: ["I notice:", "Let's explore:", "That's valid.", "I hear you."],
    style: {
      calm: [
        "I notice you're grounded right now. That's a powerful place to trade from.",
        "This sense of calm—can you name what's supporting it today?",
        "You've done the work to get here. Acknowledge that.",
      ],
      fomo: [
        "I hear urgency in that. Let's slow down—what's driving this feeling?",
        "FOMO often masks a deeper need. What do you really need right now?",
        "The feeling of missing out is uncomfortable, but acting on it rarely helps.",
      ],
      fear: [
        "Fear is valid. It's your nervous system trying to protect you.",
        "What would you tell a friend feeling this way about a trade?",
        "Can we separate the fear from the analysis? What do the facts say?",
      ],
      overconfidence: [
        "I notice a lot of certainty. Where is that certainty coming from?",
        "Confidence is healthy. Let's just make sure it's rooted in process, not ego.",
        "How would you feel if this trade went against you? Prepare for both outcomes.",
      ],
      hesitation: [
        "It's okay to not be sure. What specifically feels unclear?",
        "Sometimes hesitation is our intuition noticing something our logic missed.",
        "There's no shame in waiting. What would make you feel ready?",
      ],
      revenge: [
        "I can feel the intensity here. Let's breathe before we do anything.",
        "You're in pain from the loss. That's human. But trading from pain amplifies it.",
        "What do you need right now? It's not another trade. What is it?",
      ],
      frustration: [
        "That frustration is valid. The market can feel deeply unfair sometimes.",
        "Let's sit with this feeling for a moment instead of acting on it.",
        "Frustration often comes from a gap between expectation and reality. Can we close that gap?",
      ],
      boredom: [
        "Boredom in trading is actually a sign of discipline. Reframe it.",
        "What else could you do with this time that would serve your growth?",
        "The discomfort of waiting is real. But it's much less painful than a bad trade.",
      ],
      general: [
        "How are you feeling about your process today?",
        "Let's check in: are you in a state where you trust your decisions?",
        "Remember, you're not just trading the market—you're managing yourself.",
      ],
    },
  },
};

export const personalityList = Object.entries(coachPersonalities).map(([key, val]) => ({
  key,
  ...val,
}));

```

### ./src/shared/tradingConcepts.js
```
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

```

### ./src/shared/weeklyGoal.js
```
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

```

### ./tailwind.config.js
```
/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      fontFamily: {
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
      },
      keyframes: {
        "pulse-glow": {
          "0%, 100%": { opacity: "0.6" },
          "50%": { opacity: "1" },
        },
        "fade-in": {
          "0%": { opacity: "0", transform: "translateY(10px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "scale-in": {
          "0%": { transform: "scale(0.95)", opacity: "0" },
          "100%": { transform: "scale(1)", opacity: "1" },
        },
      },
      animation: {
        "pulse-glow": "pulse-glow 2s ease-in-out infinite",
        "fade-in": "fade-in 0.3s ease-out",
        "scale-in": "scale-in 0.2s ease-out",
      },
    },
  },
  plugins: [],
};

```

### ./tsconfig.json
```
{
  "compilerOptions": {
    "jsx": "react-jsx",
    "module": "ESNext",
    "moduleResolution": "bundler",
    "target": "ES2020",
    "allowJs": true,
    "checkJs": false,
    "noEmit": true,
    "strict": false,
    "skipLibCheck": true,
    "paths": {
      "@/*": ["./src/*"],
      "*": ["./*"]
    }
  },
  "include": ["src/**/*"]
}

```

### ./vite.config.js
```
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  // Ensure all routes fall back to index.html for client-side routing
  server: {
    historyApiFallback: true,
  },
  preview: {
    historyApiFallback: true,
  },
  build: {
    rollupOptions: {
      input: path.resolve(__dirname, 'index.html'),
    },
  },
});

```
