import mobileAds from 'react-native-google-mobile-ads';
import { useFirebase } from '../Firebase/useFirebase';
import { keyStrings } from '../Firebase/keyStrings';
import { useEffect } from 'react';
import { useAppDispatch } from '../../store/store';
import {
  setMovies,
  setPromotion,
  setVersion,
} from '../../store/slices/firebase/firebaseSlice';

export const useSplash = () => {
  const { data: versionData, loading: versionLoading } = useFirebase(
    keyStrings.versionDoc,
  );
  const { data: moviesData, loading: moviesLoading } = useFirebase(
    keyStrings.moviesDoc,
  );
  const { data: promotionData, loading: promotionLoading } = useFirebase(
    keyStrings.promotionDoc,
  );

  const dispatch = useAppDispatch();
  // initial google ad
  const initialGoogleAds = () => {
    mobileAds()
      .initialize()
      .then(adapterStatuses => {
        // Initialization complete!
        // console.log(adapterStatuses);
      });
  };
  useEffect(() => {
    initialGoogleAds();
  }, []);
  useEffect(() => {
    dispatch(
      setVersion({
        message: versionData?.version?.message,
        title: versionData?.version?.title,
        versionName: versionData?.version?.versionName,
      }),
    );
  }, [versionData]);
  useEffect(() => {
    dispatch(setMovies(moviesData?.movies));
  }, [moviesData]);

  useEffect(() => {
    dispatch(
      setPromotion({
        imageUrl: promotionData?.promotion?.image,
        message: promotionData?.promotion?.message,
      }),
    );
  }, [promotionData]);

  return { versionLoading, moviesLoading, promotionLoading };
};
