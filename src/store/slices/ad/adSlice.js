import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  isAdShown: false,
  isAdPriority: false,
  isApplovin: false,
  interAdCount: 2,
  rewardAdCount: 3,
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
    setIsApplovin: (state, action) => {
      state.isApplovin = action.payload;
    },
    setInterAdCount: (state, action) => {
      state.interAdCount = action.payload;
    },
    setRewardAdCount: (state, action) => {
      state.rewardAdCount = action.payload;
    },
  },
});

export const {
  setIsAdShown,
  setIsAdPriority,
  setIsApplovin,
  setInterAdCount,
  setRewardAdCount,
} = adSlice.actions;

export default adSlice.reducer;
