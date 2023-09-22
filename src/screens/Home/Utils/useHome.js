import {useToast} from 'react-native-toast-notifications';
import useConnectionCheck from '../../../hooks/Network/useConnectionCheck';
import {useEffect} from 'react';
import {toastNotification} from '../../../utils/constants';
import {useAppSelector} from '../../../store/store';
import useBackButtonHandler from '../../../hooks/Utils/useBackButtonHandler';
import useTheme from '../../../hooks/theme/useTheme';
import strings from '../../../theme/constant/strings';
import useApplovinInterstitialAd from '../../../hooks/Ads/Interstitials/useApplovinInterstitialAd';
import useInterstitialAd from '../../../hooks/Ads/Interstitials/useInterstitialAd';

export const useHome = navigation => {
  const {isAdShown, isApplovin, interAdCount} = useAppSelector(
    state => state.ads,
  );
  const {isInterstitialReady, showInterstitial} = useApplovinInterstitialAd();
  const {playInterstitialAd, isLoading} = useInterstitialAd();
  const toast = useToast();
  const {initialMode} = useTheme();
  const netInfoState = useConnectionCheck();
  const {
    isModalVisible,
    setIsModalVisible,
    exitAppPressHandler,
    cancelPressHandler,
  } = useBackButtonHandler(navigation);
  let _count = 0;

  useEffect(() => {
    if (netInfoState === null) {
      return;
    }
    if (!netInfoState.isConnected) {
      toast.show('Network is not available!!', toastNotification('normal'));
    }
  }, [netInfoState, toast]);

  //item press handler
  const onItemPressHandler = type => {
    _count++;
    if (isAdShown) {
      if (_count % interAdCount === 0) {
        if (isApplovin) {
          if (isInterstitialReady) {
            handleShowInterstitial();
          } else {
            playInterstitialAd();
          }
        } else {
          playInterstitialAd();
        }
      }
    }
    navigation.navigate(strings.CloudItemScreen, {type: type});
  };

  const handleShowInterstitial = async () => {
    await showInterstitial();
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
    isLoading,
  };
};
