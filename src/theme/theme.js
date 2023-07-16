import colors from './constant/colors';

const getTheme = initialMode => {
  return {
    backgroundColor: {
      backgroundColor: initialMode ? colors.Black : colors.White,
    },
    textColor: {
      color: initialMode ? colors.White : colors.Black,
    },
  };
};

export default getTheme;
