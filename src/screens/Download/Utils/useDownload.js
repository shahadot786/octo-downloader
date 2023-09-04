import {useCallback, useState} from 'react';
import {Alert, Linking} from 'react-native';
import Clipboard from '@react-native-clipboard/clipboard';
import RNFetchBlob from 'react-native-blob-util';
import {useAppDispatch, useAppSelector} from '../../../store/store';
import {
  fileExtensions,
  fileTypes,
  getFileNameFromUrl,
  getFileTypeFromUrl,
  getFolderPath,
} from './constant';
import {setPermission} from '../../../store/slices/storage/storagePermissionSlice';
import localStorage from '../../../hooks/Utils/localStorage';
import {useToast} from 'react-native-toast-notifications';
import useConnectionCheck from '../../../hooks/Network/useConnectionCheck';
import {toastNotification} from '../../../utils/constants';
import {useRewardedAd} from '../../../hooks/Ads/Rewarded/useRewardedAd';

const STORAGE_PERMISSION_KEY = '@StoragePermission';

export const useDownload = () => {
  const {isAdShown} = useAppSelector(state => state.ads);
  const storagePermission = useAppSelector(state => state.storagePermission);
  const {loaded, showRewardedAd} = useRewardedAd();
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

  const downloadFile = async (url, path, mime, fileType) => {
    try {
      await RNFetchBlob.config({
        fileCache: true,
        addAndroidDownloads: {
          path: path,
          useDownloadManager: true,
          notification: true,
          title: getFileNameFromUrl(url),
          description: `${getFileNameFromUrl(url)} is downloading...`,
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
  };

  const onDownloadPressHandler = async fileType => {
    if (inputValue === '') {
      toast.show('Please enter the URL first.', toastNotification('danger'));
      return;
    } else if (fileType === '') {
      toast.show('Please select a file type.', toastNotification('danger'));
      return;
    }
    const urlFileType = getFileTypeFromUrl(inputValue);
    if (urlFileType) {
      const selectedFileType = fileTypes[fileType];
      if (selectedFileType) {
        const extension = fileExtensions[fileType];
        // Check if the URL's file extension is in the list of video file extensions
        if (extension.includes(urlFileType.toLowerCase())) {
          // It's a valid video file URL, you can proceed with downloading
          if (netInfoState.isConnected) {
            // Rest of your download logic here
            if (storagePermission) {
              setLoading(true);
              const url = inputValue;
              const mime = selectedFileType?.mime || fileTypes.text;
              const fileName = getFileNameFromUrl(url);
              const path = `${getFolderPath(fileType)}/${fileName}`;
              if (loaded === false) {
                downloadFile(url, path, mime, fileType);
                console.log('loaded file');
              } else {
                downloadFile(url, path, mime, fileType);
                if (isAdShown === true) {
                  showRewardedAd();
                }
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
            toast.show(
              'Network is not available!!',
              toastNotification('normal'),
            );
          }
        } else {
          toast.show(
            'Invalid file type for the selected option.',
            toastNotification('danger'),
          );
        }
      } else {
        toast.show('Invalid selected file type.', toastNotification('danger'));
      }
    } else {
      toast.show(
        'Invalid URL. Please enter a valid URL.',
        toastNotification('danger'),
      );
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
