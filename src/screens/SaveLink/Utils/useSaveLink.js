import {useFirebase} from '../../../hooks/Firebase/useFirebase';
import {keyStrings} from '../../../hooks/Firebase/keyStrings';
import {useAppSelector} from '../../../store/store';
import strings from '../../../theme/constant/strings';

export const useSaveLink = navigation => {
  const {data, loading} = useFirebase(keyStrings.saveLinkDoc);
  const {isAdShown, isApplovin} = useAppSelector(state => state.ads);

  const sortedData = data ? [...data.data] : null;

  if (sortedData) {
    sortedData.sort((a, b) => parseInt(b.id, 10) - parseInt(a.id, 10));
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
