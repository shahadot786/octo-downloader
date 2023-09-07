/* eslint-disable react-hooks/exhaustive-deps */
import mobileAds from 'react-native-google-mobile-ads';
import {useFirebase} from '../../../hooks/Firebase/useFirebase';
import {keyStrings} from '../../../hooks/Firebase/keyStrings';
import {useEffect, useMemo} from 'react';
import {useAppDispatch} from '../../../store/store';
import {
  setAudio,
  setMovies,
  setPromotion,
  setSoftware,
  setVersion,
  setZip,
} from '../../../store/slices/firebase/firebaseSlice';

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
  const {data: audioData, loading: audioLoading} = useFirebase(
    keyStrings.audioDoc,
  );
  const {data: softwareData, loading: softwareLoading} = useFirebase(
    keyStrings.softwareDoc,
  );
  const {data: zipData, loading: zipLoading} = useFirebase(keyStrings.zipDoc);

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
        isForceUpdate: versionData?.version?.isForceUpdate,
      }),
    );
    dispatch(setMovies(moviesData?.movies));
    dispatch(setAudio(audioData?.audio));
    dispatch(setSoftware(softwareData?.software));
    dispatch(setZip(zipData?.zip));
    dispatch(
      setPromotion({
        imageUrl: promotionData?.promotion?.image,
        message: promotionData?.promotion?.message,
      }),
    );
  }, [
    dispatch,
    versionData,
    moviesData,
    promotionData,
    audioData,
    softwareData,
    zipData,
  ]);

  return {
    versionLoading,
    moviesLoading,
    promotionLoading,
    audioLoading,
    softwareLoading,
    zipLoading,
  };
};
