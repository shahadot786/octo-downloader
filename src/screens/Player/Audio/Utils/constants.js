export const formatTime = time => {
  const hours = Math.floor(time / 3600000);
  const minutes = Math.floor((time % 3600000) / 60000);
  const seconds = ((time % 60000) / 1000).toFixed(0);

  const formattedHours = hours > 0 ? `${hours}:` : '';
  const formattedMinutes = `${minutes < 10 ? '0' : ''}${minutes}:`;
  const formattedSeconds = `${seconds < 10 ? '0' : ''}${seconds}`;

  return `${formattedHours}${formattedMinutes}${formattedSeconds}`;
};
