import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  isAdShown: false,
};

const adSlice = createSlice({
  name: 'ads',
  initialState,
  reducers: {
    setIsAdShown: (state, action) => {
      state.isAdShown = action.payload;
    },
  },
});

export const {setIsAdShown} = adSlice.actions;

export default adSlice.reducer;
