import React, { useRef, useState } from "react";
import { motion } from "framer-motion";

export default function Gate({ onVerified }) {
  const containerRef = useRef(null);
  const [noPos, setNoPos] = useState({ top: "58%", left: "62%" });
  const [dodges, setDodges] = useState(0);
  const [teasing, setTeasing] = useState(false);

  const teases = [
    "Nice try 😏",
    "Nope, that's not you 👀",
    "Not so fast, baby...",
    "Keep trying, I dare you 💋",
    "You can't escape me that easily",
    "Wrong button, gorgeous",
  ];

  const dodge = () => {
    const container = containerRef.current;
    if (!container) return;
    const bounds = container.getBoundingClientRect();
    const btnW = 130;
    const btnH = 56;
    const maxLeft = Math.max(bounds.width - btnW, 40);
    const maxTop = Math.max(bounds.height - btnH, 40);
    const newLeft = 20 + Math.random() * (maxLeft - 20);
    const newTop = 20 + Math.random() * (maxTop - 20);
    setNoPos({ left: `${newLeft}px`, top: `${newTop}px` });
    setDodges((d) => d + 1);
    setTeasing(true);
    setTimeout(() => setTeasing(false), 1300);
  };

  return (
    <div className="gate-screen">
      <motion.div
        className="gate-card"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <p className="gate-eyebrow">A little something for</p>
        <h1 className="gate-title">Refilwe 💕</h1>
        <p className="gate-question">
          Before we go any further... is this really you, my love?
        </p>

        <div className="gate-buttons" ref={containerRef}>
          <motion.button
            className="btn btn-yes"
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onVerified(true)}
          >
            Yes, it's me 🥰
          </motion.button>

          <motion.button
            className="btn btn-no"
            style={{ position: "absolute", top: noPos.top, left: noPos.left }}
            onMouseEnter={dodge}
            onClick={dodge}
            onTouchStart={dodge}
            animate={{ top: noPos.top, left: noPos.left }}
            transition={{ type: "spring", stiffness: 300, damping: 18 }}
          >
            No
          </motion.button>
        </div>

        <div className="gate-tease-space">
          {teasing && (
            <motion.p
              className="gate-tease"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
            >
              {teases[Math.min(dodges - 1, teases.length - 1)] || teases[0]}
            </motion.p>
          )}
        </div>
      </motion.div>
    </div>
  );
}
