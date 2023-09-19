import DeviceInfo from 'react-native-device-info';
import strings from '../../../theme/constant/strings';
import {useEffect, useState} from 'react';
import {useFirebase} from '../../../hooks/Firebase/useFirebase';
import {keyStrings} from '../../../hooks/Firebase/keyStrings';
import {useAppSelector} from '../../../store/store';
import useApplovinInterstitialAd from '../../../hooks/Ads/Interstitials/useApplovinInterstitialAd';
import useInterstitialAd from '../../../hooks/Ads/Interstitials/useInterstitialAd';

export const useSaveLink = navigation => {
  const [uniqueId, setUniqueId] = useState();
  const {data, loading} = useFirebase(keyStrings.saveLinkDoc);
  let _count = 0;
  let _count1 = 0;
  const {isAdPriority, isApplovin, isAdShown} = useAppSelector(
    state => state.ads,
  );
  const {isInterstitialReady, showInterstitial} = useApplovinInterstitialAd();
  const {playInterstitialAd, isLoading} = useInterstitialAd();

  useEffect(() => {
    DeviceInfo.getUniqueId().then(uId => {
      setUniqueId(uId);
    });
  }, []);

  let sortedData = null;
  if (data && data.data && Array.isArray(data.data)) {
    const filteredData = data.data.filter(item => item?.uniqueId === uniqueId);
    sortedData = filteredData ? [...filteredData] : null;
    if (sortedData) {
      sortedData.sort((a, b) => parseInt(b.id, 10) - parseInt(a.id, 10));
    }
  }
  const handleShowInterstitial = async () => {
    await showInterstitial();
  };
  const onDownloadPressHandler = item => {
    _count1++;
    if (isAdPriority) {
      if (_count1 % 2 === 0) {
        if (isApplovin) {
          if (isInterstitialReady) {
            handleShowInterstitial();
          } else {
            playInterstitialAd();
          }
        } else {
          playInterstitialAd();
        }
      }
    }
    navigation.navigate(strings.CloudDownloadScreen, {data: item});
  };

  const onViewPressHandler = item => {
    _count++;
    if (isAdPriority) {
      if (_count % 2 === 0) {
        if (isApplovin) {
          if (isInterstitialReady) {
            handleShowInterstitial();
          } else {
            playInterstitialAd();
          }
        } else {
          playInterstitialAd();
        }
      }
    }
    navigation.navigate(strings.ItemViewerScreen, {
      data: item,
      type: item?.type,
    });
  };

  return {
    data: sortedData,
    loading,
    isLoading,
    onDownloadPressHandler,
    onViewPressHandler,
    isAdShown,
    isApplovin,
  };
};
