import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  movies: [],
  videos: [],
  images: [],
  pdf: [],
  version: {message: '', title: '', versionName: ''},
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
    setVersion: (state, action) => {
      const {message, title, versionName} = action.payload;
      state.version.message = message;
      state.version.title = title;
      state.version.versionName = versionName;
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
} = firebaseSlice.actions;
export default firebaseSlice.reducer;
