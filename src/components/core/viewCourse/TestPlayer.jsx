import React from "react";

export default function TestPlayer() {
  const videoUrl = "https://www.w3schools.com/html/mov_bbb.mp4";

  return (
    <div style={{ width: "640px", height: "360px", background: "#000" }}>
      {videoUrl ? (
        <video src={videoUrl} controls width="500px" height="500px" />
      ) : (
        <p>No video URL provided</p>
      )}
    </div>
  );
}
