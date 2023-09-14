import {useState} from 'react';
import useTheme from '../../../hooks/theme/useTheme';
import DeviceInfo from 'react-native-device-info';
import strings from '../../../theme/constant/strings';
import {useAppSelector} from '../../../store/store';
import useCustomShare from '../../../hooks/Utils/useCustomShare';

export const useSettings = navigation => {
  const {isAdShown, isApplovin} = useAppSelector(state => state.ads);
  const {shareUrl} = useCustomShare();
  const {toggleTheme, initialMode} = useTheme();
  let version = DeviceInfo.getVersion();
  const [isEnabled, setIsEnabled] = useState(true);
  const toggleSwitch = () => {
    setIsEnabled(previousState => !previousState);
    toggleTheme();
  };
  const handleShare = () => {
    const urlToShare = strings.AppUrl;
    shareUrl(urlToShare);
  };
  const onItemPressHandler = type => {
    if (type === 'Share with Friends') {
      handleShare();
    } else {
      navigation.navigate(strings.SettingsDetailsScreen, {type: type});
    }
  };

  return {
    initialMode,
    isEnabled,
    toggleSwitch,
    version,
    onItemPressHandler,
    isAdShown,
    isApplovin,
  };
};
