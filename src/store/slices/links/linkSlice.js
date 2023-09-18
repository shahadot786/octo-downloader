import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  isSaveLinkData: null,
};

const linkSlice = createSlice({
  name: 'link',
  initialState,
  reducers: {
    setIsSaveLinkData: (state, action) => {
      state.isSaveLinkData = action.payload;
    },
  },
});

export const {setIsSaveLinkData} = linkSlice.actions;

export default linkSlice.reducer;
