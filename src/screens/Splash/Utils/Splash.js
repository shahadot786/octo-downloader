/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useMemo, useState} from 'react';
import mobileAds from 'react-native-google-mobile-ads';
import {useFirebase} from '../../../hooks/Firebase/useFirebase';
import {keyStrings} from '../../../hooks/Firebase/keyStrings';
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
import {
  setInterAdCount,
  setIsAdPriority,
  setIsAdShown,
  setIsApplovin,
  setRewardAdCount,
} from '../../../store/slices/ad/adSlice';
import AppLovinMAX from 'react-native-applovin-max';
import SplashScreen from '../SplashScreen';
import {ToastProvider} from 'react-native-toast-notifications';
import {StoragePermissionProvider} from '../../../hooks/Permission/StoragePermissionProvider';
import Routes from '../../../navigation/Routes';
import strings from '../../../theme/constant/strings';

const Splash = () => {
  const [loading, setLoading] = useState(true);
  const dispatch = useAppDispatch();
  const {data: versionData} = useFirebase(keyStrings.versionDoc);
  const {data: moviesData} = useFirebase(keyStrings.moviesDoc);
  const {data: promotionData} = useFirebase(keyStrings.promotionDoc);
  const {data: audioData} = useFirebase(keyStrings.audioDoc);
  const {data: softwareData} = useFirebase(keyStrings.softwareDoc);
  const {data: zipData} = useFirebase(keyStrings.zipDoc);
  const {data: videoData} = useFirebase(keyStrings.videosDoc);
  const {data: imageData} = useFirebase(keyStrings.imagesDoc);
  const {data: pdfData} = useFirebase(keyStrings.pdfDocs);
  const {data: adsData} = useFirebase(keyStrings.adsDoc);

  const initialApplovinAds = useMemo(() => {
    return () => {
      AppLovinMAX.initialize(strings.ApplovinAPIKey)
        .then(configuration => {
          // console.log(configuration, 'start loading ads');
        })
        .catch(error => {});
      AppLovinMAX.setHasUserConsent(true);
    };
  }, []);

  const initialGoogleAds = useMemo(() => {
    return () => {
      mobileAds()
        .initialize()
        .then(() => {});
    };
  }, []);

  useEffect(() => {
    let timer = null;
    if (loading === true) {
      timer = setTimeout(() => {
        return setLoading(false);
      }, 3000);
    }
    return () => clearTimeout(timer);
  }, [loading]);

  useEffect(() => {
    initialGoogleAds();
    initialApplovinAds();
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
        updateVersion: versionData?.version?.updateVersion,
        isForceUpdate: versionData?.version?.isForceUpdate,
        isGenericUpdate: versionData?.version?.isGenericUpdate,
        appPrivacyUrl: versionData?.version?.appPrivacyUrl,
        appShareMessage: versionData?.version?.appShareMessage,
        appUrl: versionData?.version?.appUrl,
      }),
    );
    dispatch(setIsAdShown(adsData?.ads?.isAdsShown));
    dispatch(setIsAdPriority(adsData?.ads?.isAdPriority));
    dispatch(setIsApplovin(adsData?.ads?.isApplovin));
    dispatch(setInterAdCount(adsData?.ads?.interAdCount));
    dispatch(setRewardAdCount(adsData?.ads?.rewardAdCount));
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
    adsData,
    videoData,
    pdfData,
    imageData,
  ]);

  if (loading) {
    return <SplashScreen />;
  } else {
    return (
      <ToastProvider>
        <StoragePermissionProvider>
          <Routes />
        </StoragePermissionProvider>
      </ToastProvider>
    );
  }
};

export default Splash;
