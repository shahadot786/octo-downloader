import Text_Size from "./constant/fonts";

const getTheme = (initialMode) => {

  return {
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: initialMode ? '#000000' : '#FFFFFF',
    },
    text_1: {
      fontSize: Text_Size.Text_1,
      color: initialMode ? '#FFFFFF' : '#000000',
    },
  };
};

export default getTheme;
