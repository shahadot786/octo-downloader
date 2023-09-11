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
  validateURL,
} from './constant';
import {setPermission} from '../../../store/slices/storage/storagePermissionSlice';
import localStorage from '../../../hooks/Utils/localStorage';
import {useToast} from 'react-native-toast-notifications';
import useConnectionCheck from '../../../hooks/Network/useConnectionCheck';
import {toastNotification} from '../../../utils/constants';
import useRewardAd from '../../../hooks/Ads/Rewarded/useRewardedAd';

const STORAGE_PERMISSION_KEY = '@StoragePermission';

export const useDownload = () => {
  const {isAdShown, isAdPriority} = useAppSelector(state => state.ads);
  const storagePermission = useAppSelector(state => state.storagePermission);
  const {playRewardedAd} = useRewardAd();
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
      setInputValue(inputValue === '' ? clipboardValue : '');
    } catch (error) {
      // Handle clipboard error
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
    if (validateURL(inputValue)) {
      const urlFileType = getFileTypeFromUrl(inputValue);
      if (urlFileType) {
        const selectedFileType = fileTypes[fileType];
        if (selectedFileType) {
          const extension = fileExtensions[fileType];
          if (extension.includes(urlFileType.toLowerCase())) {
            if (netInfoState.isConnected) {
              if (storagePermission) {
                const url = inputValue;
                const mime = selectedFileType?.mime || fileTypes.text;
                const fileName = getFileNameFromUrl(url);
                const path = `${getFolderPath(fileType)}/${fileName}`;
                if (isAdShown === true) {
                  setLoading(true);
                  playRewardedAd();
                  downloadFile(url, path, mime, fileType);
                } else {
                  setLoading(true);
                  downloadFile(url, path, mime, fileType);
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
          toast.show(
            'Selected file type is invalid!',
            toastNotification('danger'),
          );
        }
      } else {
        toast.show(
          'Invalid File Type. Please select a valid file type.',
          toastNotification('danger'),
        );
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
    isAdPriority,
    onDownloadPressHandler,
    downloadProgress,
    currentSize,
    totalSize,
    loading,
  };
};
