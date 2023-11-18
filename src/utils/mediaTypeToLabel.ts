export const mediaTypeToLabel = (type: string) => {
  if (type === "movie") {
    return "Movie";
  }
  if (type === "tv-show") {
    return "TV Show";
  }
  if (type === "game") {
    return "Game";
  }

  return "Unknown";
};
