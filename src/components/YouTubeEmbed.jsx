import React from "react";

// NOTE: verify this is the exact official video you want, then update
// VIDEO_ID and/or SEARCH_QUERY below if needed.
const VIDEO_ID = "3P_QGvhqiWY";
const SEARCH_QUERY = "Meek Mill Bad For You Nicki Minaj official video";
const WATCH_URL = `https://www.youtube.com/watch?v=${VIDEO_ID}`;
const SEARCH_URL = `https://www.youtube.com/results?search_query=${encodeURIComponent(
  SEARCH_QUERY
)}`;

export default function YouTubeEmbed({ title = "Music Video" }) {
  return (
    <div className="yt-card">
      <div className="yt-thumb">
        <img
          src={`https://img.youtube.com/vi/${VIDEO_ID}/hqdefault.jpg`}
          alt={title}
          className="yt-thumb-img"
          onError={(e) => {
            e.currentTarget.style.display = "none";
          }}
        />
        <div className="yt-play-badge">▶</div>
      </div>

      <a
        className="btn btn-primary yt-btn"
        href={WATCH_URL}
        target="_blank"
        rel="noopener noreferrer"
      >
        ▶ Watch on YouTube
      </a>

      <a className="yt-fallback-link" href={SEARCH_URL} target="_blank" rel="noopener noreferrer">
        Can't find it? Search it here
      </a>
    </div>
  );
}
