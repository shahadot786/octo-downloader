import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  isAdShown: true,
  isAdPriority: true,
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
  },
});

export const {setIsAdShown, setIsAdPriority} = adSlice.actions;

export default adSlice.reducer;
