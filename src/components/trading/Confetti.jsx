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
