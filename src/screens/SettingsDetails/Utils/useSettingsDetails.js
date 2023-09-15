import {useCallback, useState} from 'react';
import {useAppSelector} from '../../../store/store';
import {useToast} from 'react-native-toast-notifications';
import {toastNotification} from '../../../utils/constants';
import firestore from '@react-native-firebase/firestore';
import {keyStrings} from '../../../hooks/Firebase/keyStrings';
import strings from '../../../theme/constant/strings';

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

  const onSendRequestPressHandler = async docID => {
    if (selectedOption === '') {
      toast.show('Please Select an Option', toastNotification('normal'));
    } else if (titleValue === '') {
      toast.show('Filed is required!', toastNotification('normal'));
    } else {
      setIsLoading(true);
      const payload = {
        type: selectedOption,
        title: titleValue,
        details: detailsValue,
      };
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
        navigation.navigate(strings.SettingsTabScreen);
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
  };
};
