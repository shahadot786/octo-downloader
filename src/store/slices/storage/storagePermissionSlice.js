import {createSlice} from '@reduxjs/toolkit';

const storagePermissionSlice = createSlice({
  name: 'storagePermission',
  initialState: null,
  reducers: {
    setPermission: (state, action) => action.payload,
  },
});

export const {setPermission} = storagePermissionSlice.actions;

export default storagePermissionSlice.reducer;
