import {useCallback, useState} from 'react';
import {useAppSelector} from '../../../store/store';
import {useToast} from 'react-native-toast-notifications';
import {toastNotification} from '../../../utils/constants';
import firestore from '@react-native-firebase/firestore';
import {keyStrings} from '../../../hooks/Firebase/keyStrings';
import strings from '../../../theme/constant/strings';
import generateUniqueId from '../../../utils/generateUniqueId';
import Clipboard from '@react-native-clipboard/clipboard';
import {
  fileExtensions,
  fileTypes,
  getFileNameFromUrl,
  getFileTypeFromUrl,
  validateURL,
} from '../../Download/Utils/constant';
import DeviceInfo from 'react-native-device-info';

export const useSettingDetails = navigation => {
  const {version} = useAppSelector(state => state.firebase);
  const {isAdShown, isApplovin} = useAppSelector(state => state.ads);
  const [isLoading, setIsLoading] = useState(false);
  const [loading, setLoading] = useState(true);
  const [selectedOption, setSelectedOption] = useState('');
  const [titleValue, setTitleValue] = useState('');
  const [detailsValue, setDetailsValue] = useState('');
  const [uniqueId, setUniqueId] = useState();
  const toast = useToast();

  const handleSelectOption = useCallback(value => {
    setSelectedOption(value);
  }, []);

  const onChangeTitleText = useCallback(title => {
    setTitleValue(title);
  }, []);
  const onChangeDetailsText = useCallback(details => {
    setDetailsValue(details);
  }, []);

  const onPasteBtnPressHandler = useCallback(async () => {
    try {
      const clipboardValue = await Clipboard.getString();
      setTitleValue(titleValue === '' ? clipboardValue : '');
    } catch (error) {
      // Handle clipboard error
    }
  }, [titleValue]);

  DeviceInfo.getUniqueId().then(uId => {
    setUniqueId(uId);
  });

  const onSendRequestPressHandler = async (docID, isSaved) => {
    let payload = {};

    if (selectedOption === '') {
      toast.show('Please Select an Option', toastNotification('normal'));
    } else if (titleValue === '') {
      toast.show('Field is required!', toastNotification('normal'));
    } else {
      let showError = false;
      if (isSaved) {
        if (!validateURL(titleValue)) {
          toast.show('Enter a valid URL', toastNotification('normal'));
          showError = true;
        } else {
          const urlFileType = getFileTypeFromUrl(titleValue);

          if (!urlFileType) {
            toast.show(
              'Invalid File Type. Please select a valid file type.',
              toastNotification('normal'),
            );
            showError = true;
          } else {
            const selectedFileType = fileTypes[selectedOption];

            if (!selectedFileType) {
              toast.show(
                'Selected file type is invalid!',
                toastNotification('normal'),
              );
              showError = true;
            } else {
              const extension = fileExtensions[selectedOption];

              if (!extension.includes(urlFileType.toLowerCase())) {
                toast.show(
                  'Invalid file type for the selected option.',
                  toastNotification('normal'),
                );
                showError = true;
              }
            }
          }
        }
      }
      if (!showError) {
        setIsLoading(true);
        try {
          if (isSaved) {
            const fileName = getFileNameFromUrl(titleValue);

            payload = {
              id: generateUniqueId(),
              type: selectedOption,
              title: fileName,
              details: detailsValue,
              url: titleValue,
              uniqueId: uniqueId,
            };
          } else {
            payload = {
              id: generateUniqueId(),
              type: selectedOption,
              title: titleValue,
              details: detailsValue,
              uniqueId: uniqueId,
            };
          }

          const docRef = firestore()
            .collection(keyStrings.collection)
            .doc(docID);
          const doc = await docRef.get();
          const currentRequest = doc.data().data || [];
          currentRequest.push(payload);
          await docRef.update({data: currentRequest});
          setSelectedOption('');
          setTitleValue('');
          setDetailsValue('');
          toast.show('Data sent successfully.', toastNotification('success'));
          navigation.navigate(strings.SettingsTabScreen);
        } catch (error) {
          toast.show('Please try again', toastNotification('normal'));
        } finally {
          setIsLoading(false);
        }
      }
    }
  };

  return {
    handleSelectOption,
    selectedOption,
    onChangeTitleText,
    titleValue,
    onChangeDetailsText,
    detailsValue,
    isAdShown,
    isApplovin,
    onSendRequestPressHandler,
    isLoading,
    loading,
    setLoading,
    version,
    onPasteBtnPressHandler,
  };
};
