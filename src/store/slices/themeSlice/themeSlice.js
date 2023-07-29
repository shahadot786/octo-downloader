import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isDarkMode: false,
};

const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    toggleMode: state => {
      state.isDarkMode = !state.isDarkMode;
    },
  },
});

export const { toggleMode } = themeSlice.actions;
export default themeSlice.reducer;
