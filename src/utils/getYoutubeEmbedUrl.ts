export function getYouTubeEmbedUrl(url: string): string | null {
  let videoId: string | null = null;

  // Regular YouTube URL
  const regularMatch = url.match(
    /(?:https?:\/\/)?(?:www\.)?youtube\.com\/watch\?v=([^&]+)/
  );
  if (regularMatch) {
    videoId = regularMatch[1];
  }

  // YouTube Shorts URL
  const shortsMatch = url.match(
    /(?:https?:\/\/)?(?:www\.)?youtube\.com\/shorts\/([^?]+)/
  );
  if (shortsMatch) {
    videoId = shortsMatch[1];
  }

  // YouTube Share URL
  const shareMatch = url.match(/(?:https?:\/\/)?youtu\.be\/([^?]+)/);
  if (shareMatch) {
    videoId = shareMatch[1];
  }

  if (videoId) {
    return `https://www.youtube.com/embed/${videoId}`;
  }

  return null;
}
