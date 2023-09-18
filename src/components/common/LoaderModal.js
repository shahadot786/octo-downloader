/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, Modal, ActivityIndicator} from 'react-native';
import colors from '../../theme/constant/colors';
import BigText from '../../theme/Text/BigText';

const LoaderModal = ({visible}) => {
  return (
    <Modal
      animationType="fade"
      transparent
      visible={visible}
      onRequestClose={() => {}}>
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
        }}>
        <ActivityIndicator size={'large'} color={colors.Primary} />
        <BigText text={'Loading...'} />
      </View>
    </Modal>
  );
};

export default LoaderModal;
