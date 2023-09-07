import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  movies: [],
  videos: [],
  images: [],
  software: [],
  audio: [],
  zip: [],
  pdf: [],
  version: {message: '', title: '', versionName: '', isForceUpdate: false},
  promotion: {imageUrl: '', message: ''},
};

const firebaseSlice = createSlice({
  name: 'firebase',
  initialState,
  reducers: {
    setMovies: (state, action) => {
      state.movies = action.payload;
    },
    setVideos: (state, action) => {
      state.videos = action.payload;
    },
    setImages: (state, action) => {
      state.images = action.payload;
    },
    setPdf: (state, action) => {
      state.pdf = action.payload;
    },
    setAudio: (state, action) => {
      state.audio = action.payload;
    },
    setSoftware: (state, action) => {
      state.software = action.payload;
    },
    setZip: (state, action) => {
      state.zip = action.payload;
    },
    setVersion: (state, action) => {
      const {message, title, versionName, isForceUpdate} = action.payload;
      state.version.message = message;
      state.version.title = title;
      state.version.versionName = versionName;
      state.version.isForceUpdate = isForceUpdate;
    },
    setPromotion: (state, action) => {
      const {imageUrl, message} = action.payload;
      state.promotion.imageUrl = imageUrl;
      state.promotion.message = message;
    },
  },
});

export const {
  setMovies,
  setImages,
  setPdf,
  setVideos,
  setPromotion,
  setVersion,
  setAudio,
  setSoftware,
  setZip,
} = firebaseSlice.actions;
export default firebaseSlice.reducer;
