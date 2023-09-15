import {useCallback, useState} from 'react';
import {useAppSelector} from '../../../store/store';
import {useToast} from 'react-native-toast-notifications';
import {toastNotification} from '../../../utils/constants';
import firestore from '@react-native-firebase/firestore';
import {keyStrings} from '../../../hooks/Firebase/keyStrings';
import strings from '../../../theme/constant/strings';
import generateUniqueId from '../../../utils/generateUniqueId';
import Clipboard from '@react-native-clipboard/clipboard';
import {getFileNameFromUrl} from '../../Download/Utils/constant';

export const useSettingDetails = navigation => {
  const {version} = useAppSelector(state => state.firebase);
  const {isAdShown, isApplovin} = useAppSelector(state => state.ads);
  const [isLoading, setIsLoading] = useState(false);
  const [loading, setLoading] = useState(true);
  const [selectedOption, setSelectedOption] = useState('');
  const [titleValue, setTitleValue] = useState('');
  const [detailsValue, setDetailsValue] = useState('');
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

  const onSendRequestPressHandler = async (docID, isSaved) => {
    let payload = {};
    if (selectedOption === '') {
      toast.show('Please Select an Option', toastNotification('normal'));
    } else if (titleValue === '') {
      toast.show('Filed is required!', toastNotification('normal'));
    } else {
      setIsLoading(true);
      if (isSaved === 'save') {
        const fileName = getFileNameFromUrl(titleValue);
        payload = {
          id: generateUniqueId(),
          type: selectedOption,
          title: fileName,
          details: detailsValue,
          url: titleValue,
        };
      } else {
        payload = {
          id: generateUniqueId(),
          type: selectedOption,
          title: titleValue,
          details: detailsValue,
        };
      }
      try {
        const docRef = firestore().collection(keyStrings.collection).doc(docID);
        const doc = await docRef.get();
        const currentRequest = doc.data().data || [];
        currentRequest.push(payload);
        await docRef.update({data: currentRequest});
        setSelectedOption('');
        setTitleValue('');
        setDetailsValue('');
        toast.show('Data sent successfully.', toastNotification('success'));
        if (isSaved === 'save') {
          navigation.navigate(strings.SaveLinkScreen);
        } else {
          navigation.navigate(strings.SettingsTabScreen);
        }
      } catch (error) {
        toast.show('Please try again', toastNotification('danger'));
      } finally {
        setIsLoading(false);
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
