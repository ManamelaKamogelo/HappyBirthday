import React, { useMemo } from "react";

const SYMBOLS = ["💕", "💖", "🌹", "✨", "💋"];

export default function FloatingHearts({ count = 18 }) {
  const hearts = useMemo(
    () =>
      Array.from({ length: count }).map((_, i) => ({
        id: i,
        left: Math.random() * 100,
        delay: Math.random() * 10,
        duration: 10 + Math.random() * 12,
        size: 0.8 + Math.random() * 1.6,
        symbol: SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)],
      })),
    [count]
  );

  return (
    <div className="floating-hearts" aria-hidden="true">
      {hearts.map((h) => (
        <span
          key={h.id}
          className="floating-heart"
          style={{
            left: `${h.left}%`,
            animationDelay: `${h.delay}s`,
            animationDuration: `${h.duration}s`,
            fontSize: `${h.size}rem`,
          }}
        >
          {h.symbol}
        </span>
      ))}
    </div>
  );
}
