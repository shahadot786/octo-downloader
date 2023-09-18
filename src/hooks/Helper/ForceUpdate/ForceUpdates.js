/* eslint-disable react-hooks/exhaustive-deps */
import {Alert, BackHandler} from 'react-native';
import {useEffect} from 'react';
import {Linking} from 'react-native';
import DeviceInfo from 'react-native-device-info';
import {useAppSelector} from '../../../store/store';

const ForceUpdates = () => {
  let currentVersion = DeviceInfo.getVersion();
  const {version} = useAppSelector(state => state.firebase);
  const checkIfUpdateIsNeeded = async () => {
    if (version?.updateVersion !== currentVersion && version?.isForceUpdate) {
      Alert.alert(
        'Please Update',
        'You will have to update your app to the latest version to continue.',
        [
          {
            text: 'Update',
            onPress: async () => {
              await Linking.openURL(version?.appUrl);
              BackHandler.exitApp();
            },
          },
        ],
      );
    } else if (
      version?.updateVersion !== currentVersion &&
      version?.isGenericUpdate
    ) {
      Alert.alert(
        'Please Update',
        'You can update your app to the latest version.',
        [
          {
            text: 'Later',
            onPress: () => {},
          },
          {
            text: 'Update',
            onPress: async () => {
              await Linking.openURL(version?.appUrl);
              BackHandler.exitApp();
            },
          },
        ],
      );
    }
  };
  useEffect(() => {
    checkIfUpdateIsNeeded();
  }, []);
  return null;
};

export default ForceUpdates;
