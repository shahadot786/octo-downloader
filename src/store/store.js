import {combineReducers, configureStore, ThunkDispatch} from '@reduxjs/toolkit';
import {useSelector} from 'react-redux';
import {useDispatch} from 'react-redux';
import linkSlice from './slices/links/linkSlice';
import themeSlice from './slices/themeSlice/themeSlice';
import firebaseSlice from './slices/firebase/firebaseSlice';
import adSlice from './slices/ad/adSlice';
import storagePermissionSlice from './slices/storage/storagePermissionSlice';

const appReducer = combineReducers({
  link: linkSlice,
  theme: themeSlice,
  firebase: firebaseSlice,
  ads: adSlice,
  storagePermission: storagePermissionSlice,
});

const RootReducer = (state, action) => {
  if (action.type === 'auth/logout') {
    state = undefined;
  }
  return appReducer(state, action);
};

const store = configureStore({
  reducer: RootReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const RootState = typeof RootReducer;
export const AppDispatch = store.dispatch;

export const AppThunkDispatch = ThunkDispatch;

export const AppStore = {
  ...store,
  dispatch: AppThunkDispatch,
};

export const useAppDispatch = () => useDispatch();
export const useAppSelector = useSelector;

export default store;
