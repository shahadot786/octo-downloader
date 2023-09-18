export function formatDuration(durationInSeconds) {
  const hours = Math.floor(durationInSeconds / 3600);
  const minutes = Math.floor((durationInSeconds % 3600) / 60);
  const seconds = ('0' + Math.floor(durationInSeconds % 60)).slice(-2);

  if (hours > 0) {
    return `${hours}:${('0' + minutes).slice(-2)}:${seconds}`;
  } else {
    return `${minutes}:${seconds}`;
  }
}
