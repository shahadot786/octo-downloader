import mobileAds from 'react-native-google-mobile-ads';
import {useFirebase} from '../Firebase/useFirebase';
import {keyStrings} from '../Firebase/keyStrings';
import {useEffect, useMemo} from 'react';
import {useAppDispatch} from '../../store/store';
import {
  setMovies,
  setPromotion,
  setVersion,
} from '../../store/slices/firebase/firebaseSlice';

export const useSplash = () => {
  const {data: versionData, loading: versionLoading} = useFirebase(
    keyStrings.versionDoc,
  );
  const {data: moviesData, loading: moviesLoading} = useFirebase(
    keyStrings.moviesDoc,
  );
  const {data: promotionData, loading: promotionLoading} = useFirebase(
    keyStrings.promotionDoc,
  );

  const dispatch = useAppDispatch();

  const initialGoogleAds = useMemo(() => {
    return () => {
      mobileAds()
        .initialize()
        .then(() => {
          // Initialization complete!
        });
    };
  }, []);

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
    dispatch(setMovies(moviesData?.movies));
    dispatch(
      setPromotion({
        imageUrl: promotionData?.promotion?.image,
        message: promotionData?.promotion?.message,
      }),
    );
  }, [dispatch, versionData, moviesData, promotionData]);

  return {versionLoading, moviesLoading, promotionLoading};
};
