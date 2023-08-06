import {useState} from 'react';
import Clipboard from '@react-native-clipboard/clipboard';
import RNFetchBlob from 'react-native-blob-util';
import {useAppSelector} from '../../../store/store';
import {fileTypes} from './constant';

export const useDownload = () => {
  const {isAdShown} = useAppSelector(state => state.ads);
  const [selectedOption, setSelectedOption] = useState('');
  const [inputValue, setInputValue] = useState('');
  const [downloadProgress, setDownloadProgress] = useState(0); // State to store download progress

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
      // console.log('Error pasting from clipboard:', error);
    }
  };

  const docPath = RNFetchBlob.fs.dirs.DocumentDir;
  const getFolderPath = fileType => {
    const folder = fileTypes[fileType]?.folder || 'Miscellaneous';
    return `${docPath}/Octodownloader/${folder}`;
  };

  const getFileNameFromUrl = url => {
    const index = url.lastIndexOf('/');
    return url.substring(index + 1);
  };

  const onDownloadPressHandler = async fileType => {
    const url =
      'https://scienceandfilm.org/uploads/videos/files/Beneath_Hill_60_Trailer.mp4';
    const {mime} = fileTypes[fileType] || fileTypes.text;
    const path = `${getFolderPath(fileType)}/DownloadedFile.${fileType}`;
    const fileName = getFileNameFromUrl(url);

    try {
      await RNFetchBlob.config({
        path: path,
        fileCache: true,
        addAndroidDownloads: {
          useDownloadManager: true,
          notification: true,
          title: fileName,
          description: `A ${fileType} file.`,
          mime: mime,
        },
      })
        .fetch('GET', url)
        .progress((received, total) => {
          const progress = (received / total) * 100;
          setDownloadProgress(progress);
        })
        .then(async res => {
          const filePath = res?.data;
          console.log(filePath);
        });

      // You can do something with the downloaded file using the 'res.data' here if needed
    } catch (error) {
      console.log('Download error:', error);
    }
  };
  const percentage = Math.floor(downloadProgress * 10) + '%';
  console.log(percentage, 'downloadProgress');
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
