/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import MiddleModal from '../../common/MiddleModal';
import colors from '../../../theme/constant/colors';
import TitleText from '../../../theme/Text/TitleText';
import IOSButton from '../../atoms/buttons/IOSButton';
import metrics from '../../../theme/constant/metrics';
import Text_Size from '../../../theme/constant/fonts';
import {View, StyleSheet} from 'react-native';
import useAppUpdateModal from '../../../hooks/Utils/useAppUpdateModal';

const AppUpdateModal = () => {
  const {
    showModal,
    setShowModal,
    buttonPressHandler,
    versionTitle,
    versionMessage,
    isForceUpdate,
  } = useAppUpdateModal();

  return (
    <View>
      <MiddleModal
        crossIcon={isForceUpdate}
        header={versionTitle}
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
          <TitleText text={versionMessage} textStyle={styles.text} />
          <IOSButton
            onSelect={buttonPressHandler}
            containerStyle={styles.containerStyle}
            btnStyle={{backgroundColor: colors.Green}}
            textAlignment={styles.textAlignment}
            titleStyle={styles.textStyle}
            title={'Update'}
          />
        </View>
      </MiddleModal>
    </View>
  );
};

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

export default AppUpdateModal;
