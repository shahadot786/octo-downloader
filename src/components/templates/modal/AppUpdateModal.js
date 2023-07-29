import { StyleSheet, View, Linking } from 'react-native';
import React, { useState, useEffect } from 'react';
import MiddleModal from '../../common/MiddleModal';
import colors from '../../../theme/constant/colors';
import TitleText from '../../../theme/Text/TitleText';
import IOSButton from '../../atoms/buttons/IOSButton';
import metrics from '../../../theme/constant/metrics';
import Text_Size from '../../../theme/constant/fonts';
import DeviceInfo from 'react-native-device-info';
import { useAppSelector } from '../../../store/store';

const AppUpdateModal = () => {
  const [showModal, setShowModal] = useState(false);
  let appVersion = DeviceInfo.getVersion();
  const { version } = useAppSelector(state => state.firebase);
  const modalVisibleHandler = () => {
    if (version.versionName !== appVersion) {
      setShowModal(true);
    } else {
      setShowModal(false);
    }
  };

  useEffect(() => {
    modalVisibleHandler();
  }, [version]);

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
        header={version.title}
        isModalVisible={showModal}
        setIsModalVisible={setShowModal}
        onBlur={undefined}
        notOutsidePress
        height={'20%'}>
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            paddingHorizontal: '5%',
          }}>
          <TitleText text={version.message} textStyle={styles.text} />
          <IOSButton
            onSelect={buttonPressHandler}
            containerStyle={styles.containerStyle}
            btnStyle={{ backgroundColor: colors.Green }}
            textAlignment={styles.textAlignment}
            titleStyle={styles.textStyle}
            title={'Update'}
          />
        </View>
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
