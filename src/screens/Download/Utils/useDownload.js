import {useCallback, useState} from 'react';
import {Alert, Linking} from 'react-native';
import Clipboard from '@react-native-clipboard/clipboard';
import RNFetchBlob from 'react-native-blob-util';
import {useAppDispatch, useAppSelector} from '../../../store/store';
import {fileTypes, getFileNameFromUrl, getFolderPath} from './constant';
import {setPermission} from '../../../store/slices/storage/storagePermissionSlice';
import localStorage from '../../../hooks/Utils/localStorage';
import {useToast} from 'react-native-toast-notifications';
import useConnectionCheck from '../../../hooks/Network/useConnectionCheck';
import {toastNotification} from '../../../utils/constants';

const STORAGE_PERMISSION_KEY = '@StoragePermission';

export const useDownload = () => {
  const {isAdShown} = useAppSelector(state => state.ads);
  const storagePermission = useAppSelector(state => state.storagePermission);

  const [selectedOption, setSelectedOption] = useState('');
  const [inputValue, setInputValue] = useState('');
  const [downloadProgress, setDownloadProgress] = useState(0);
  const [currentSize, setCurrentSize] = useState(0);
  const [totalSize, setTotalSize] = useState(0);
  const [loading, setLoading] = useState(false);

  const dispatch = useAppDispatch();
  const toast = useToast();
  const netInfoState = useConnectionCheck();

  const handleSelectOption = useCallback(value => {
    setSelectedOption(value);
  }, []);

  const onChangeInputText = useCallback(url => {
    setInputValue(url);
  }, []);

  const openAppSettings = useCallback(async () => {
    Linking.openSettings();
    dispatch(setPermission(true));
    await localStorage.setItem(STORAGE_PERMISSION_KEY, 'true');
  }, [dispatch]);

  const onPasteBtnPressHandler = useCallback(async () => {
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
  }, [inputValue]);

  const onDownloadPressHandler = async fileType => {
    if (inputValue === '') {
      toast.show('Please enter the url first.', toastNotification('danger'));
      return;
    } else if (fileType === '') {
      toast.show('Please select a file type.', toastNotification('danger'));
      return;
    }
    if (netInfoState.isConnected) {
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
              description: `${fileName} is downloading...`,
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
              toast.show(
                `Download ${fileType} Successfully.`,
                toastNotification('success'),
              );
            });
        } catch (error) {
          setDownloadProgress(0);
          setInputValue('');
          setSelectedOption('');
          setLoading(false);
          toast.show(
            'Download Error. Please try again.',
            toastNotification('danger'),
          );
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
    } else {
      toast.show('Network is not available!!', toastNotification('normal'));
    }
  };

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
