import {useState, useEffect} from 'react';
import useApplovinRewardedAd from '../../../hooks/Ads/Rewarded/useApplovinRewardedAd';
import {useAppSelector} from '../../../store/store';
import strings from '../../../theme/constant/strings';
import useRewardAd from '../../../hooks/Ads/Rewarded/useRewardedAd';

export const useCloudItem = ({navigation, type}) => {
  const [sortedData, setSortedData] = useState([]);
  const {movies, videos, images, audio, pdf, zip, software} = useAppSelector(
    state => state.firebase,
  );
  const {isApplovin, isAdShown, rewardAdCount} = useAppSelector(
    state => state.ads,
  );
  const {playRewardedAd, isLoading} = useRewardAd();
  const {isRewardedAdReady, showRewardedAd} = useApplovinRewardedAd();
  let _count = 0;
  let _count1 = 0;

  useEffect(() => {
    if (type === 'movies') {
      const sortedMovies = [...movies].sort((a, b) => b._id - a._id);
      setSortedData(sortedMovies);
    } else if (type === 'images') {
      const sortedImages = [...images].sort((a, b) => b._id - a._id);
      setSortedData(sortedImages);
    } else if (type === 'videos') {
      const sortedVideos = [...videos].sort((a, b) => b._id - a._id);
      setSortedData(sortedVideos);
    } else if (type === 'audio') {
      const sortedAudio = [...audio].sort((a, b) => b._id - a._id);
      setSortedData(sortedAudio);
    } else if (type === 'pdf') {
      const sortedPDF = [...pdf].sort((a, b) => b._id - a._id);
      setSortedData(sortedPDF);
    } else if (type === 'zip') {
      const sortedZip = [...zip].sort((a, b) => b._id - a._id);
      setSortedData(sortedZip);
    } else if (type === 'software') {
      const sortedSoftware = [...software].sort((a, b) => b._id - a._id);
      setSortedData(sortedSoftware);
    }
  }, [type, movies, images, videos, pdf, zip, audio, software]);

  const onDownloadPressHandler = item => {
    _count1++;
    if (isAdShown) {
      if (_count1 % rewardAdCount === 0) {
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
      if (_count % rewardAdCount === 0) {
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

  const handleShowRewardedAd = async () => {
    await showRewardedAd();
  };

  return {
    sortedData,
    onDownloadPressHandler,
    isLoading,
    onViewPressHandler,
    isAdShown,
    isApplovin,
  };
};
