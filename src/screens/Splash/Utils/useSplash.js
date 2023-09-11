/* eslint-disable react-hooks/exhaustive-deps */
import mobileAds from 'react-native-google-mobile-ads';
import {useFirebase} from '../../../hooks/Firebase/useFirebase';
import {keyStrings} from '../../../hooks/Firebase/keyStrings';
import {useEffect, useMemo} from 'react';
import {useAppDispatch} from '../../../store/store';
import {
  setAudio,
  setImages,
  setMovies,
  setPdf,
  setPromotion,
  setSoftware,
  setVersion,
  setVideos,
  setZip,
} from '../../../store/slices/firebase/firebaseSlice';
import {setIsAdPriority, setIsAdShown} from '../../../store/slices/ad/adSlice';

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
  const {data: videoData, loading: videoLoading} = useFirebase(
    keyStrings.videosDoc,
  );
  const {data: imageData, loading: imageLoading} = useFirebase(
    keyStrings.imagesDoc,
  );
  const {data: pdfData, loading: pdfLoading} = useFirebase(keyStrings.pdfDocs);
  const {data: adsData, loading: adsLoading} = useFirebase(keyStrings.adsDoc);

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
    dispatch(setMovies(moviesData?.movies));
    dispatch(setAudio(audioData?.audio));
    dispatch(setSoftware(softwareData?.software));
    dispatch(setZip(zipData?.zip));
    dispatch(setVideos(videoData?.videos));
    dispatch(setImages(imageData?.images));
    dispatch(setPdf(pdfData?.pdf));
    dispatch(
      setVersion({
        message: versionData?.version?.message,
        title: versionData?.version?.title,
        versionName: versionData?.version?.versionName,
        isForceUpdate: versionData?.version?.isForceUpdate,
      }),
    );
    dispatch(setIsAdShown(adsData?.ads?.isAdsShown));
    dispatch(setIsAdPriority(adsData?.ads?.isAdPriority));
    dispatch(
      setPromotion({
        imageUrl: promotionData?.promotion?.image,
        message: promotionData?.promotion?.message,
        uri: promotionData?.promotion?.uri,
        title: promotionData?.promotion?.title,
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
    adsData,
    videoData,
    pdfData,
    imageData,
  ]);

  return {
    versionLoading,
    moviesLoading,
    promotionLoading,
    audioLoading,
    softwareLoading,
    zipLoading,
    adsLoading,
    videoLoading,
    imageLoading,
    pdfLoading,
  };
};
