import React from "react";

// YNW Melly – 772 Love (Official Video)
const VIDEO_ID = "dNPbJ_prGWY";

export default function YouTubeEmbed({ title = "Music Video" }) {
  return (
    <div className="yt-iframe-wrapper">
      <iframe
        className="yt-iframe"
        src={`https://www.youtube.com/embed/${VIDEO_ID}?rel=0&modestbranding=1`}
        title={title}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    </div>
  );
}
