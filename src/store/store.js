import {
  combineReducers,
  configureStore,
  ThunkDispatch,
} from '@reduxjs/toolkit';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import linkSlice from './slices/links/linkSlice';
import loadingSlice from './slices/loading/loadingSlice';
import themeSlice from './slices/themeSlice/themeSlice';

const appReducer = combineReducers({
  loading: loadingSlice,
  link: linkSlice,
  theme: themeSlice,
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
