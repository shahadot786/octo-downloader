import {useState} from 'react';
import useTheme from '../../../hooks/theme/useTheme';
import DeviceInfo from 'react-native-device-info';
import strings from '../../../theme/constant/strings';
import {useAppSelector} from '../../../store/store';
import useShareStaticURL from '../../../hooks/Utils/useShareStaticURL';
import useOpenLink from '../../../hooks/Utils/useOpenLink';

export const useSettings = navigation => {
  const {isAdShown, isApplovin} = useAppSelector(state => state.ads);
  const {version} = useAppSelector(state => state.firebase);
  const {toggleTheme, initialMode} = useTheme();
  const shareURL = useShareStaticURL();
  const openLink = useOpenLink();
  let appVersion = DeviceInfo.getVersion();
  const [isEnabled, setIsEnabled] = useState(true);
  const toggleSwitch = () => {
    setIsEnabled(previousState => !previousState);
    toggleTheme();
  };
  const handleShare = () => {
    shareURL(
      version?.appUrl,
      'Discover Octo Downloader',
      version?.appShareMessage,
    );
  };

  const onItemPressHandler = type => {
    if (type === 'Share with Friends') {
      handleShare();
    } else if (type === 'Rate Now') {
      openLink(version?.appUrl);
    } else {
      navigation.navigate(strings.SettingsDetailsScreen, {type: type});
    }
  };

  return {
    initialMode,
    isEnabled,
    toggleSwitch,
    appVersion,
    onItemPressHandler,
    isAdShown,
    isApplovin,
  };
};
