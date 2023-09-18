export const toastNotification = type => {
  return {
    type: type,
    placement: 'top',
    duration: 3000,
    offset: 30,
    animationType: 'slide-in',
  };
};
