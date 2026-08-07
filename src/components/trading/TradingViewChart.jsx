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

export default function TradingViewChart({ className }) {
  const containerRef = useRef(null);
  const [symbol, setSymbol] = useState(() => localStorage.getItem('tcai_tv_symbol') || DEFAULT_SYMBOL);
  const [interval, setInterval_] = useState(() => localStorage.getItem('tcai_tv_interval') || '5');
  const [editingSymbol, setEditingSymbol] = useState(false);
  const [symbolInput, setSymbolInput] = useState(symbol);

  useEffect(() => {
    if (!containerRef.current) return;

    // Clear previous widget
    containerRef.current.innerHTML = '';

    const script = document.createElement('script');
    script.src = 'https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js';
    script.type = 'text/javascript';
    script.async = true;
    script.innerHTML = JSON.stringify({
      autosize: true,
      symbol: symbol,
      interval: interval,
      timezone: 'Etc/UTC',
      theme: 'dark',
      style: '1',
      locale: 'en',
      backgroundColor: 'rgba(9, 9, 11, 1)',
      gridColor: 'rgba(39, 39, 42, 0.3)',
      hide_top_toolbar: false,
      hide_legend: false,
      allow_symbol_change: true,
      save_image: false,
      calendar: false,
      hide_volume: false,
      support_host: 'https://www.tradingview.com',
      studies: ['MAExp@tv-basicstudies'],
    });

    containerRef.current.appendChild(script);

    // Persist preferences
    localStorage.setItem('tcai_tv_symbol', symbol);
    localStorage.setItem('tcai_tv_interval', interval);
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
      <div className="flex items-center justify-between px-2 py-1.5 border-b border-zinc-800/50">
        {/* Symbol */}
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

        {/* Interval tabs */}
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

      {/* Chart container */}
      <div className="flex-1 relative min-h-0">
        <div
          ref={containerRef}
          className="tradingview-widget-container absolute inset-0"
        />
      </div>
    </div>
  );
}
