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

  const docPath = RNFetchBlob.fs.dirs.DownloadDir;

  const getFolderPath = fileType => {
    const folder = fileTypes[fileType]?.folder || 'Miscellaneous';
    return `${docPath}/Octodownloader/${folder}`;
  };
  const getFileNameFromUrl = url => {
    const index = url.lastIndexOf('/');
    return url.substring(index + 1);
  };
  const onDownloadPressHandler = async fileType => {
    const url = 'https://www.africau.edu/images/default/sample.pdf';
    const {mime} = fileTypes[fileType] || fileTypes.text;
    const fileName = getFileNameFromUrl(url);
    const path = `${getFolderPath(fileType)}/${fileName}.${fileType}`;

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

          // Get the cached path of the downloaded file
          // const cachedFilePath = res.path();
          // // Construct the new path in local storage
          // const newFilePath = `${docPath}/Octodownloader/Local/${fileName}.${fileType}`;
          // // Check if the cached file exists before moving
          // const isCachedFileExists = await RNFetchBlob.fs.exists(
          //   cachedFilePath,
          // );

          // if (isCachedFileExists) {
          //   try {
          //     // Move the file from cache to local storage
          //     await RNFetchBlob.fs.mv(cachedFilePath, newFilePath);
          //     console.log('File moved to local storage:', newFilePath);
          //   } catch (moveError) {
          //     console.log('Error moving file:', moveError);
          //   }
          // } else {
          //   console.log('Cached file does not exist:', cachedFilePath);
          // }
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
