import {useToast} from 'react-native-toast-notifications';
import useConnectionCheck from '../../../hooks/Network/useConnectionCheck';
import {useEffect} from 'react';
import {toastNotification} from '../../../utils/constants';
import {useAppSelector} from '../../../store/store';
import useBackButtonHandler from '../../../hooks/Utils/useBackButtonHandler';
import useTheme from '../../../hooks/theme/useTheme';
import strings from '../../../theme/constant/strings';

export const useHome = navigation => {
  const {isAdShown, isApplovin} = useAppSelector(state => state.ads);
  const toast = useToast();
  const {initialMode} = useTheme();
  const netInfoState = useConnectionCheck();
  const {
    isModalVisible,
    setIsModalVisible,
    exitAppPressHandler,
    cancelPressHandler,
  } = useBackButtonHandler(navigation);

  useEffect(() => {
    if (netInfoState === null) {
      // Handle the case when netInfoState is null (loading state or initial state)
      return;
    }
    if (!netInfoState.isConnected) {
      toast.show('Network is not available!!', toastNotification('normal'));
    }
  }, [netInfoState, toast]);

  //item press handler
  const onItemPressHandler = type => {
    navigation.navigate(strings.CloudItemScreen, {type: type});
  };

  return {
    isAdShown,
    isApplovin,
    isModalVisible,
    setIsModalVisible,
    exitAppPressHandler,
    cancelPressHandler,
    initialMode,
    onItemPressHandler,
  };
};
