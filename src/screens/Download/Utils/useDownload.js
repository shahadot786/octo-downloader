import {useState} from 'react';
import Clipboard from '@react-native-clipboard/clipboard';
import RNFetchBlob from 'react-native-blob-util';
import {useAppSelector} from '../../../store/store';
import {fileTypes} from './constant';

export const useDownload = () => {
  const {isAdShown} = useAppSelector(state => state.ads);
  const [selectedOption, setSelectedOption] = useState('');
  const [inputValue, setInputValue] = useState('');
  const [downloadProgress, setDownloadProgress] = useState(0);
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
      console.log('Error pasting from clipboard:', error);
    }
  };

  const docPath = RNFetchBlob.fs.dirs.SDCardDir;

  const getFolderPath = fileType => {
    const folder = fileTypes[fileType]?.folder || 'Miscellaneous';
    return `${docPath}/Octodownloader/${folder}`;
  };
  const getFileNameFromUrl = url => {
    const index = url.lastIndexOf('/');
    let filename = url.substring(index + 1);
    // Replace %20 with underscores
    filename = filename.replace(/%20/g, '-');
    // Replace remaining spaces with underscores
    filename = filename.replace(/\s+/g, '-');
    return filename;
  };
  const onDownloadPressHandler = async fileType => {
    const url =
      'https://sofj.ch/audio/songs/Total%20Eclipse%20Of%20The%20Heart.mp3';
    const {mime} = fileTypes[fileType] || fileTypes.text;
    const fileName = getFileNameFromUrl(url);
    const path = `${getFolderPath(fileType)}/${fileName}`;

    try {
      await RNFetchBlob.config({
        fileCache: true,
        addAndroidDownloads: {
          path: path,
          useDownloadManager: true,
          notification: true,
          title: fileName,
          description: `A ${fileType} file.`,
          mime: mime,
          mediaScannable: true,
        },
      })
        .fetch('GET', url)
        .progress((received, total) => {
          const progress = (received / total) * 100;
          setDownloadProgress(progress);
        })
        .then(async res => {
          console.log(res?.path(), 'download successfully');
        });

      // You can do something with the downloaded file using the 'res.data' here if needed
    } catch (error) {
      console.log('Download error:', error);
    }
  };
  // const percentage = Math.floor(downloadProgress) + '%';

  return {
    handleSelectOption,
    selectedOption,
    onChangeInputText,
    onPasteBtnPressHandler,
    inputValue,
    isAdShown,
    onDownloadPressHandler,
    downloadProgress,
  };
};
