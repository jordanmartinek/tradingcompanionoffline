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
