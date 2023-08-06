import {useState} from 'react';
import Clipboard from '@react-native-clipboard/clipboard';
import RNFetchBlob from 'react-native-blob-util';
import {useAppSelector} from '../../../store/store';

export const useDownload = () => {
  const {isAdShown} = useAppSelector(state => state.ads);
  const [selectedOption, setSelectedOption] = useState('');
  const [inputValue, setInputValue] = useState('');
  const docPath = RNFetchBlob.fs.dirs.DownloadDir;

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
  // const onDownloadPressHandler = async () => {};
  // handle download image function
  const onDownloadPressHandler = async () => {
    const url =
      'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4';
    const path = `${docPath}/DownloadImage.mp4`;
    await RNFetchBlob.config({
      path: path,
      fileCache: true,
      addAndroidDownloads: {
        useDownloadManager: true,
        notification: true,
        title: 'Download Successful! Click to view',
        description: 'An Video file.',
        mime: 'video/mp4',
      },
    })
      .fetch('GET', url)
      .then(async res => {
        if (res && res.info().status === 200) {
          console.log(res);
        } else {
          console.log(res);
        }
      })
      .catch(error => console.log(error));
  };

  return {
    handleSelectOption,
    selectedOption,
    onChangeInputText,
    onPasteBtnPressHandler,
    inputValue,
    isAdShown,
    onDownloadPressHandler,
  };
};
