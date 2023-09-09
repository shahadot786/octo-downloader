/* eslint-disable react-hooks/exhaustive-deps */
import {useState, useEffect, useCallback} from 'react';
import RNFS from 'react-native-fs';
import strings from '../../../theme/constant/strings';
import {useAppSelector} from '../../../store/store';
import useInterstitialAd from '../../../hooks/Ads/Interstitials/useInterstitialAd';

const basePath = '/storage/emulated/0/Download/OctoDownloader/';
let _count = 0;

export const useGallery = type => {
  const [dirData, setDirData] = useState();
  const [loading, setLoading] = useState(true);
  const [sortData, setSortData] = useState([]);
  const {isAdShown} = useAppSelector(state => state.ads);
  const {playInterstitialAd, isLoading} = useInterstitialAd();

  const onItemPressHandler = (navigation, data, itemType) => {
    _count++;
    if (isAdShown) {
      if (_count % 2 === 0) {
        playInterstitialAd();
      }
    }
    console.log(_count);
    navigation.navigate(strings.ItemViewerScreen, {
      data: data,
      type: itemType,
    });
  };

  const onDeletePressHandler = useCallback(path => {
    RNFS.unlink(path)
      .then(() => {
        getDirData();
      })
      .catch(e => {});
  }, []);

  const getDirData = useCallback(() => {
    RNFS.readDir(basePath + type)
      .then(result => {
        setDirData(result);
        setLoading(false);
      })
      .catch(e => {
        setLoading(false);
      });
  }, [type]);

  useEffect(() => {
    getDirData();
  }, [type, dirData]);

  useEffect(() => {
    if (!dirData || dirData.length === 0) {
      setLoading(true);
    } else {
      const sortedData = dirData.slice();
      sortedData.sort((a, b) => {
        if (a.mtime === undefined && b.mtime === undefined) {
          return 0;
        }
        if (a.mtime === undefined) {
          return 1;
        }
        if (b.mtime === undefined) {
          return -1;
        }
        const dateA = new Date(a.mtime);
        const dateB = new Date(b.mtime);
        return dateB - dateA;
      });
      setSortData(sortedData);
      setLoading(false);
    }
  }, [dirData]);

  return {
    sortData,
    loading,
    onItemPressHandler,
    onDeletePressHandler,
    isLoading,
  };
};
