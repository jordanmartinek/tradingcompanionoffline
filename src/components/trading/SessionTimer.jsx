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
