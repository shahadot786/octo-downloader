import {useState} from 'react';
import {Alert, Linking} from 'react-native';
import Clipboard from '@react-native-clipboard/clipboard';
import RNFetchBlob from 'react-native-blob-util';
import {useAppDispatch, useAppSelector} from '../../../store/store';
import {fileTypes} from './constant';
import {setPermission} from '../../../store/slices/storage/storagePermissionSlice';
import localStorage from '../../../hooks/Utils/localStorage';
const STORAGE_PERMISSION_KEY = '@StoragePermission';

export const useDownload = () => {
  const {isAdShown} = useAppSelector(state => state.ads);
  const [selectedOption, setSelectedOption] = useState('');
  const [inputValue, setInputValue] = useState('');
  const [downloadProgress, setDownloadProgress] = useState(0);
  const [currentSize, setCurrentSize] = useState(0);
  const [totalSize, setTotalSize] = useState(0);
  const [loading, setLoading] = useState(false);
  const storagePermission = useAppSelector(state => state.storagePermission);

  const dispatch = useAppDispatch();

  const handleSelectOption = value => {
    setSelectedOption(value);
  };

  const onChangeInputText = url => {
    setInputValue(url);
  };

  const openAppSettings = async () => {
    Linking.openSettings();
    dispatch(setPermission(true));
    await localStorage.setItem(STORAGE_PERMISSION_KEY, 'true');
  };

  const onPasteBtnPressHandler = async () => {
    try {
      const clipboardValue = await Clipboard.getString();
      if (inputValue === '') {
        setInputValue(clipboardValue);
      } else {
        setInputValue('');
      }
    } catch (error) {
      // console.log('Error pasting from clipboard:', error);
    }
  };

  const appPath = '/storage/emulated/0/Download'; //sd card path
  // const internalPath = '/data/user/0/Download'; // internal path

  const getFolderPath = fileType => {
    const folder = fileTypes[fileType]?.folder || 'Miscellaneous';
    return `${appPath}/OctoDownloader/${folder}`;
  };

  const getFileNameFromUrl = url => {
    const index = url.lastIndexOf('/');
    let filename = url.substring(index + 1);
    // Replace %20 with underscores
    filename = filename.replace(/%20/g, '_');
    // Replace remaining spaces with underscores
    filename = filename.replace(/\s+/g, '_');
    return filename;
  };

  const onDownloadPressHandler = async fileType => {
    if (inputValue === '') {
      Alert.alert('Download Error', 'Please enter a valid URL.', [
        {
          text: 'Cancel',
          style: 'cancel',
        },
      ]);
      return;
    } else if (fileType === '') {
      Alert.alert('Download Error', 'Please select a file type.', [
        {
          text: 'Cancel',
          style: 'cancel',
        },
      ]);
      return;
    }
    if (storagePermission) {
      setLoading(true);
      const url = inputValue;
      const {mime} = fileTypes[fileType] || fileTypes.text;
      const fileName = getFileNameFromUrl(url);
      const path = `${getFolderPath(fileType)}/${fileName}`;

      try {
        // Configure the download
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
            const progress = received / total;
            setCurrentSize(received);
            setTotalSize(total);
            setDownloadProgress(progress);
            setInputValue('');
            setSelectedOption('');
          })
          .then(async res => {
            setDownloadProgress(0);
            setInputValue('');
            setSelectedOption('');
            setLoading(false);
          });
      } catch (error) {
        setDownloadProgress(0);
        setInputValue('');
        setSelectedOption('');
        setLoading(false);
      }
    } else {
      Alert.alert(
        'Storage Permission',
        'OctoDownloader needs access to your storage in order to save files.',
        [
          {
            text: 'Cancel',
            style: 'cancel',
          },
          {
            text: 'Settings',
            onPress: () => openAppSettings(),
          },
        ],
      );
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
    currentSize,
    totalSize,
    loading,
  };
};
