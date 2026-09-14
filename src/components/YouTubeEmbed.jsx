import React from "react";

export default function YouTubeEmbed({ title = "Music Video" }) {
  return (
    <div className="yt-card">
      <div className="video-frame">
        <iframe
          className="yt-video"
          src="https://www.youtube.com/embed/WfzI9gxsdR8?si=e_YLDGj25vVavAwm"
          title={title}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        />
      </div>
    </div>
  );
}
