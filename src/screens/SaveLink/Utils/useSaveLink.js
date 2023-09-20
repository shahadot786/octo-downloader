import DeviceInfo from 'react-native-device-info';
import strings from '../../../theme/constant/strings';
import {useEffect, useState} from 'react';
import {useFirebase} from '../../../hooks/Firebase/useFirebase';
import {keyStrings} from '../../../hooks/Firebase/keyStrings';
import {useAppSelector} from '../../../store/store';

import useRewardAd from '../../../hooks/Ads/Rewarded/useRewardedAd';
import useApplovinRewardedAd from '../../../hooks/Ads/Rewarded/useApplovinRewardedAd';

export const useSaveLink = navigation => {
  const [uniqueId, setUniqueId] = useState();
  const {data, loading} = useFirebase(keyStrings.saveLinkDoc);
  let _count = 0;
  let _count1 = 0;
  const {isApplovin, isAdShown} = useAppSelector(state => state.ads);
  const {playRewardedAd, isLoading} = useRewardAd();
  const {isRewardedAdReady, showRewardedAd} = useApplovinRewardedAd();

  useEffect(() => {
    DeviceInfo.getAndroidId().then(uId => {
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
  const handleShowRewardedAd = async () => {
    await showRewardedAd();
  };
  const onDownloadPressHandler = item => {
    _count1++;
    if (isAdShown) {
      if (_count1 % 2 === 0) {
        if (isApplovin) {
          if (isRewardedAdReady) {
            handleShowRewardedAd();
          } else {
            playRewardedAd();
          }
        } else {
          playRewardedAd();
        }
      }
    }
    navigation.navigate(strings.CloudDownloadScreen, {data: item});
  };

  const onViewPressHandler = item => {
    _count++;
    if (isAdShown) {
      if (_count % 2 === 0) {
        if (isApplovin) {
          if (isRewardedAdReady) {
            handleShowRewardedAd();
          } else {
            playRewardedAd();
          }
        } else {
          playRewardedAd();
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
