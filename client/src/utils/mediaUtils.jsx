// client/src/utils/mediaUtils.js
export const isVideoUrl = (url) => {
  if (!url) return false;
  const videoExtensions = [".mp4", ".webm", ".mov", ".ogg", ".avi", ".m3u8"];
  return videoExtensions.some((ext) => url.toLowerCase().includes(ext));
};

export const renderMedia = (url, className = "", alt = "") => {
  if (isVideoUrl(url)) {
    return (
      <video
        className={className}
        src={url}
        autoPlay
        muted
        loop
        playsInline
        style={{ objectFit: "cover", width: "100%", height: "100%" }}
      />
    );
  }
  return <img className={className} src={url} alt={alt} />;
};
