/* eslint-disable react-hooks/exhaustive-deps */
import {useState, useEffect} from 'react';
import DeviceInfo from 'react-native-device-info';
import Linking from 'react-native/Libraries/Linking/Linking';
import {useAppSelector} from '../../store/store';

const useAppUpdateModal = () => {
  const [showModal, setShowModal] = useState(false);
  let appVersion = DeviceInfo.getVersion();
  const {version} = useAppSelector(state => state.firebase);

  useEffect(() => {
    const modalVisibleHandler = () => {
      if (version?.versionName !== appVersion) {
        setShowModal(true);
      } else {
        setShowModal(false);
      }
    };

    modalVisibleHandler();
  }, [version]);

  const buttonPressHandler = async () => {
    const url = version?.appUrl;
    const isInstalled = await Linking.canOpenURL(url);
    if (isInstalled) {
      Linking.openURL(url);
    } else {
      // Handle the case when the app is not installed
    }
  };

  return {
    showModal,
    setShowModal,
    buttonPressHandler,
    versionTitle: version?.title,
    versionMessage: version?.message,
    isForceUpdate: version?.isForceUpdate === false,
  };
};

export default useAppUpdateModal;
