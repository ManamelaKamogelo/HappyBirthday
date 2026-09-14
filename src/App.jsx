import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Gate from "./components/Gate.jsx";
import FloatingHearts from "./components/FloatingHearts.jsx";
import YouTubeEmbed from "./components/YouTubeEmbed.jsx";

const STICKER = `${import.meta.env.BASE_URL}attachments/chatgpt-image-sep-12-2026-09_38_58-pm.png`;

const fadeVariants = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 0.9, ease: "easeInOut" } },
  exit: { opacity: 0, transition: { duration: 0.6, ease: "easeInOut" } },
};

function SectionShell({ children, sectionKey }) {
  return (
    <motion.section
      key={sectionKey}
      className="section"
      variants={fadeVariants}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      {children}
    </motion.section>
  );
}

function NavButtons({ onBack, onNext, backLabel = "Back", nextLabel = "Next" }) {
  return (
    <div className="nav-buttons">
      {onBack && (
        <button className="btn btn-ghost" onClick={onBack}>
          ← {backLabel}
        </button>
      )}
      {onNext && (
        <button className="btn btn-primary" onClick={onNext}>
          {nextLabel} →
        </button>
      )}
    </div>
  );
}

export default function App() {
  const [verified, setVerified] = useState(false);
  const [step, setStep] = useState(0);

  const totalSteps = 5;
  const next = () => setStep((s) => Math.min(s + 1, totalSteps - 1));
  const back = () => setStep((s) => Math.max(s - 1, 0));

  return (
    <div className="app-bg">
      <FloatingHearts />

      <AnimatePresence mode="wait">
        {!verified && (
          <motion.div
            key="gate"
            variants={fadeVariants}
            initial="initial"
            animate="animate"
            exit="exit"
          >
            <Gate onVerified={setVerified} />
          </motion.div>
        )}

        {verified && step === 0 && (
          <SectionShell sectionKey="welcome">
            <div className="card center">
              <img src={STICKER} alt="cute birthday sticker" className="sticker sticker-float" />
              <p className="eyebrow">It really is you 🥹💕</p>
              <h1 className="title">Happy Birthday, Refilwe</h1>
              <p className="subtitle">
                15th of September belongs to the most beautiful girl I know.
                <br />
                I made this just for you — small, simple, and full of me
                thinking about you.
              </p>
              <NavButtons onNext={next} nextLabel="Open your gift" />
            </div>
          </SectionShell>
        )}

        {verified && step === 1 && (
          <SectionShell sectionKey="letter">
            <div className="card">
              <p className="eyebrow">A letter, just for you</p>
              <h2 className="title small">My Refilwe,</h2>
              <p className="body-text">
                Happy Birthday to the girl who makes ordinary days feel
                cinematic. You are soft where the world is hard, funny when
                I least expect it, and somehow more beautiful every single
                time I look at you.
              </p>
              <p className="body-text">
                I wanted to give you something that felt like{" "}
                <em>us</em> — not loud, not extra, just honest. Simple,
                minimal, a little bit sexy, and completely, unapologetically
                obsessed with you. 😌🔥
              </p>
              <p className="body-text">
                So happy birthday, baby. Here's to more late-night calls,
                more laughs, and more of you being effortlessly you.
              </p>
              <img
                src={STICKER}
                alt="birthday sticker"
                className="sticker sticker-small"
              />
              <NavButtons onBack={back} onNext={next} nextLabel="Play our song" />
            </div>
          </SectionShell>
        )}

        {verified && step === 2 && (
          <SectionShell sectionKey="song">
            <div className="card center">
              <p className="eyebrow">Your pick, baby 😉</p>
              <h2 className="title small">
                YNW Melly – 772 Love 🎶
              </h2>
              <p className="subtitle">
                No one else gets this, only you. 772 Love is mine for you,
                and I won't share it. Press play, gorgeous — because I'm
                stingy with my love, and you're the only one who gets it 😉 💕 🥰
              </p>
              <YouTubeEmbed title="YNW Melly – 772 Love" />
              <p className="caption">turn it up, get close, and read on 💋</p>
              <NavButtons onBack={back} onNext={next} nextLabel="Keep going" />
            </div>
          </SectionShell>
        )}

        {verified && step === 3 && (
          <SectionShell sectionKey="reasons">
            <div className="card">
              <p className="eyebrow">Why you, always</p>
              <h2 className="title small">Reasons I'm obsessed with you</h2>
              <ul className="reasons-list">
                <li>🌹 The way you laugh at your own jokes before you finish them.</li>
                <li>💋 That look you give me that says way more than words.</li>
                <li>✨ How safe and warm it feels just being near you.</li>
                <li>🔥 The way you steal my hoodies and make them look better than me.</li>
                <li>💕 You, simply existing, is my favorite part of any day.</li>
              </ul>
              <NavButtons onBack={back} onNext={next} nextLabel="One more thing" />
            </div>
          </SectionShell>
        )}

        {verified && step === 4 && (
          <SectionShell sectionKey="final">
            <div className="card center">
              <img src={STICKER} alt="cute birthday sticker" className="sticker sticker-float" />
              <p className="eyebrow">Forever & always</p>
              <h2 className="title">Happy Birthday, my love</h2>
              <p className="subtitle">
                Thank you for being mine. Here's to celebrating you today, and
                every day after. I love you more than any page could hold.
              </p>
              <p className="signature">— Made with love, just for Refilwe 💕</p>
              <button className="btn btn-primary" onClick={() => setStep(0)}>
                Read it again 🥹
              </button>
            </div>
          </SectionShell>
        )}
      </AnimatePresence>
    </div>
  );
}
