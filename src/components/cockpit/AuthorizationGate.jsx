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
