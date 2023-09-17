import DeviceInfo from 'react-native-device-info';
import strings from '../../../theme/constant/strings';
import {useEffect, useState} from 'react';
import {useFirebase} from '../../../hooks/Firebase/useFirebase';
import {keyStrings} from '../../../hooks/Firebase/keyStrings';
import {useAppSelector} from '../../../store/store';

export const useSaveLink = navigation => {
  const [uniqueId, setUniqueId] = useState();
  const {data, loading} = useFirebase(keyStrings.saveLinkDoc);
  const {isAdShown, isApplovin} = useAppSelector(state => state.ads);

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

  const onDownloadPressHandler = item => {
    navigation.navigate(strings.DownloadTabScreen, {data: item});
  };
  const onPlayPressHandler = item => {
    navigation.navigate(strings.ItemViewerScreen, {
      data: item,
      type: item?.type,
    });
  };

  return {
    data: sortedData,
    loading,
    onDownloadPressHandler,
    onPlayPressHandler,
    isAdShown,
    isApplovin,
  };
};
