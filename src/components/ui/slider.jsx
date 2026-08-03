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
