import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  isAdShown: false,
  isAdPriority: false,
  isPremium: false,
};

const adSlice = createSlice({
  name: 'ads',
  initialState,
  reducers: {
    setIsAdShown: (state, action) => {
      state.isAdShown = action.payload;
    },
    setIsAdPriority: (state, action) => {
      state.isAdPriority = action.payload;
    },
    setIsPremium: (state, action) => {
      state.isPremium = action.payload;
    },
  },
});

export const {setIsAdShown, setIsAdPriority, setIsPremium} = adSlice.actions;

export default adSlice.reducer;
