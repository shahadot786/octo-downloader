import mobileAds from 'react-native-google-mobile-ads';
import {useFirebase} from '../Firebase/useFirebase';
import {keyStrings} from '../Firebase/keyStrings';
import {useEffect} from 'react';
import {PERMISSIONS} from 'react-native-permissions';
import {useAppDispatch} from '../../store/store';
import {
  setMovies,
  setPromotion,
  setVersion,
} from '../../store/slices/firebase/firebaseSlice';
import {checkPermissions} from '../../utils/checkPermissions';

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
  // initial google ad
  const initialGoogleAds = () => {
    mobileAds()
      .initialize()
      .then(() => {
        // Initialization complete!
        // console.log(adapterStatuses);
      });
  };
  //get all the permission
  const getAllPermission = async () => {
    await checkPermissions([
      PERMISSIONS.ANDROID.POST_NOTIFICATIONS,
      PERMISSIONS.ANDROID.READ_MEDIA_AUDIO,
      PERMISSIONS.ANDROID.READ_MEDIA_VIDEO,
      PERMISSIONS.ANDROID.READ_MEDIA_IMAGES,
      PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE,
      PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE,
    ]);
  };
  useEffect(() => {
    initialGoogleAds();
    getAllPermission();
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

  return {versionLoading, moviesLoading, promotionLoading};
};
