import {useToast} from 'react-native-toast-notifications';
import useConnectionCheck from '../../../hooks/Network/useConnectionCheck';
import {useEffect} from 'react';
import {toastNotification} from '../../../utils/constants';
import {useAppSelector} from '../../../store/store';

export const useHome = () => {
  const {isAdShown, isApplovin} = useAppSelector(state => state.ads);
  const toast = useToast();
  const netInfoState = useConnectionCheck();

  useEffect(() => {
    if (netInfoState === null) {
      // Handle the case when netInfoState is null (loading state or initial state)
      return;
    }
    if (!netInfoState.isConnected) {
      toast.show('Network is not available!!', toastNotification('normal'));
    }
  }, [netInfoState, toast]);

  return {isAdShown, isApplovin};
};
