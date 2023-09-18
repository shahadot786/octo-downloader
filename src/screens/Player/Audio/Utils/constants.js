export const formatTime = time => {
  const totalSeconds = Math.floor(time / 1000);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  const remainingMilliseconds = time % 1000;

  return `${hours}:${minutes}:${seconds}`;
};
