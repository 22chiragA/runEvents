import React from 'react';

const VideoBackground = () => {
  // Free stock running video (Wixstatic streaming node)
  const videoUrl = "https://video.wixstatic.com/video/8cd7ec_b15df650977f4bd281a02bf1a76347bf/480p/mp4/file.mp4";

  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden z-0">
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
        src={videoUrl}
      />
      {/* Dark overlay to ensure text is perfectly readable */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/60 z-10" />
    </div>
  );
};

export default VideoBackground;
