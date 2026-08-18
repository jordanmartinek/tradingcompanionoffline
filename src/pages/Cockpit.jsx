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
    <div className="h-screen flex flex-col bg-zinc-950 overflow-hidden">
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
      <div className="flex-1 flex flex-col md:flex-row min-h-0">
        {/* LEFT RAIL — full width on mobile */}
        <div className="md:w-56 lg:w-64 flex-shrink-0 overflow-y-auto border-b md:border-b-0 md:border-r border-zinc-800/30 px-3 py-3 space-y-5">
          <EnvironmentPanel />
          <LevelsPanel />
          <LiquidityPanel />
        </div>

        {/* CENTER — Chart (hidden on mobile) */}
        <TradingViewChart className="hidden md:flex flex-1 min-w-0" />

        {/* RIGHT RAIL — full width on mobile */}
        <div className="md:w-56 lg:w-64 flex-shrink-0 overflow-y-auto border-t md:border-t-0 md:border-l border-zinc-800/30 px-3 py-3 space-y-5">
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
