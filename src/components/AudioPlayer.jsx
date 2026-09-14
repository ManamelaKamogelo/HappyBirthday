import React, { useEffect, useRef, useState } from "react";

function formatTime(sec) {
  if (!sec || Number.isNaN(sec)) return "0:00";
  const m = Math.floor(sec / 60);
  const s = Math.floor(sec % 60)
    .toString()
    .padStart(2, "0");
  return `${m}:${s}`;
}

export default function AudioPlayer({ src, title }) {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [status, setStatus] = useState("checking"); // checking | ready | missing

  // Verify the audio file actually exists (and is really audio) before we
  // ever let the <audio> element try to load/decode it. Without this, a
  // missing mp3 gets served the SPA's index.html fallback, and the browser
  // attempts to decode that HTML as audio, throwing an uncaught error.
  useEffect(() => {
    let cancelled = false;

    fetch(src, { method: "GET", headers: { Range: "bytes=0-1" } })
      .then((res) => {
        if (cancelled) return;
        const type = res.headers.get("content-type") || "";
        if (res.ok && type.startsWith("audio")) {
          setStatus("ready");
        } else {
          setStatus("missing");
        }
      })
      .catch(() => {
        if (!cancelled) setStatus("missing");
      });

    return () => {
      cancelled = true;
    };
  }, [src]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || status !== "ready") return;

    const onLoaded = () => setDuration(audio.duration || 0);
    const onTime = () => setCurrentTime(audio.currentTime || 0);
    const onEnd = () => setIsPlaying(false);
    const onError = () => setStatus("missing");

    audio.addEventListener("loadedmetadata", onLoaded);
    audio.addEventListener("timeupdate", onTime);
    audio.addEventListener("ended", onEnd);
    audio.addEventListener("error", onError);

    return () => {
      audio.removeEventListener("loadedmetadata", onLoaded);
      audio.removeEventListener("timeupdate", onTime);
      audio.removeEventListener("ended", onEnd);
      audio.removeEventListener("error", onError);
    };
  }, [status]);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      audio
        .play()
        .then(() => setIsPlaying(true))
        .catch(() => setStatus("missing"));
    }
  };

  const onSeek = (e) => {
    const audio = audioRef.current;
    if (!audio || !duration) return;
    const value = Number(e.target.value);
    audio.currentTime = value;
    setCurrentTime(value);
  };

  const progressPct = duration ? (currentTime / duration) * 100 : 0;

  if (status !== "ready") {
    return (
      <div className="audio-player audio-player-placeholder">
        <div className="audio-play-btn audio-play-btn-disabled">🎵</div>
        <div className="audio-meta">
          <p className="audio-title">{title}</p>
          {status === "checking" ? (
            <p className="audio-hint">Loading song...</p>
          ) : (
            <p className="audio-error">
              The song file isn't uploaded yet — add calling-my-phone.mp3 to
              /public/audio to hear it play here.
            </p>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="audio-player">
      <audio ref={audioRef} src={src} preload="metadata" />
      <button
        className="audio-play-btn"
        onClick={togglePlay}
        aria-label={isPlaying ? "Pause" : "Play"}
      >
        {isPlaying ? "⏸" : "▶"}
      </button>

      <div className="audio-meta">
        <p className="audio-title">{title}</p>
        <input
          type="range"
          className="audio-seek"
          min={0}
          max={duration || 0}
          step={0.1}
          value={currentTime}
          onChange={onSeek}
          style={{
            background: `linear-gradient(to right, #ff5c8a ${progressPct}%, rgba(255,255,255,0.25) ${progressPct}%)`,
          }}
        />
        <div className="audio-time">
          <span>{formatTime(currentTime)}</span>
          <span>{formatTime(duration)}</span>
        </div>
      </div>
    </div>
  );
}
