import {useState} from 'react';
import Clipboard from '@react-native-clipboard/clipboard';
// import RNFetchBlob from 'react-native-blob-util';
import {PERMISSIONS} from 'react-native-permissions';
import {checkPermissions} from '../../../utils/checkPermissions';
import {useAppSelector} from '../../../store/store';

export const useDownload = () => {
  const {isAdShown} = useAppSelector(state => state.ads);
  const [selectedOption, setSelectedOption] = useState('');
  const [inputValue, setInputValue] = useState('');

  const handleSelectOption = value => {
    setSelectedOption(value);
  };

  const onChangeInputText = url => {
    setInputValue(url);
  };

  const onPasteBtnPressHandler = async () => {
    try {
      const clipboardValue = await Clipboard.getString();
      setInputValue(clipboardValue);
    } catch (error) {
      //   console.log('Error pasting from clipboard:', error);
    }
  };

  //download press handler
  const onDownloadPressHandler = async () => {
    // first check the storage permission
    const permissionsGranted = await checkPermissions([
      PERMISSIONS.ANDROID.POST_NOTIFICATIONS,
      PERMISSIONS.ANDROID.READ_MEDIA_AUDIO,
      PERMISSIONS.ANDROID.READ_MEDIA_VIDEO,
      PERMISSIONS.ANDROID.READ_MEDIA_IMAGES,
      PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE,
      PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE,
    ]);
    console.log(permissionsGranted);
    if (permissionsGranted) {
      console.log('Granted');
    }
  };

  return {
    handleSelectOption,
    selectedOption,
    onChangeInputText,
    onPasteBtnPressHandler,
    inputValue,
    onDownloadPressHandler,
    isAdShown,
  };
};
