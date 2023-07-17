import { StyleSheet, View, Linking } from 'react-native';
import React, { useState, useEffect } from 'react';
import MiddleModal from '../../common/MiddleModal';
import colors from '../../../theme/constant/colors';
import { keyStrings } from '../../../hooks/Firebase/keyStrings';
import { useFirebase } from '../../../hooks/Firebase/useFirebase';
import TitleText from '../../../theme/Text/TitleText';
import IOSButton from '../../atoms/buttons/IOSButton';
import metrics from '../../../theme/constant/metrics';
import Text_Size from '../../../theme/constant/fonts';
import AppActivityIndicator from '../../common/AppActivityIndicator';
import DeviceInfo from 'react-native-device-info';

const AppUpdateModal = () => {
  const [showModal, setShowModal] = useState(false);
  const [appUpdateVersion, setAppUpdateVersion] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [title, setTitle] = useState('');
  const [message, setMessage] = useState('');
  const { data, loading } = useFirebase(keyStrings.versionDoc);
  let version = DeviceInfo.getVersion();

  useEffect(() => {
    setIsLoading(loading);
    setTitle(data?.version?.title);
    setMessage(data?.version?.message);
    setAppUpdateVersion(data?.version?.versionName);
    modalVisibleHandler();
  }, [data, loading]);

  const modalVisibleHandler = () => {
    if (appUpdateVersion === version) {
      setShowModal(true);
    } else {
      setShowModal(false);
    }
  };
  const buttonPressHandler = async () => {
    const url =
      'https://play.google.com/store/apps/details?id=com.octodownloader';
    const isInstalled = await Linking.canOpenURL(url);
    if (isInstalled) {
      Linking.openURL(url);
    } else {
      // Handle the case when the app is not installed
    }
  };

  return (
    <View>
      <MiddleModal
        crossIcon
        header={title}
        isModalVisible={showModal}
        setIsModalVisible={setShowModal}
        onBlur={undefined}
        notOutsidePress
        height={'20%'}>
        {isLoading ? (
          <AppActivityIndicator />
        ) : (
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              paddingHorizontal: '5%',
            }}>
            <TitleText text={message} textStyle={styles.text} />
            <IOSButton
              onSelect={buttonPressHandler}
              containerStyle={styles.containerStyle}
              btnStyle={{ backgroundColor: colors.Green }}
              textAlignment={styles.textAlignment}
              titleStyle={styles.textStyle}
              title={'Update'}
            />
          </View>
        )}
      </MiddleModal>
    </View>
  );
};

export default AppUpdateModal;

const styles = StyleSheet.create({
  containerStyle: {
    height: metrics.screenHeight <= 800 ? metrics.screenHeight * 0.04 : 30,
    width: '50%',
    borderRadius: 10,
    marginTop: '5%',
    marginBottom: '5%',
  },
  textAlignment: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  textStyle: {
    fontSize: Text_Size.Text_10,
    fontWeight: '600',
    color: colors.White,
  },
  text: {
    textAlign: 'center',
  },
});
