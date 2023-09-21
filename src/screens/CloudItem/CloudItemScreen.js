import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import ScreenSafeAreaView from '../../theme/Global/ScreenSafeAreaView';
import CustomHeader from '../../components/common/CustomHeader';

const CloudItemScreen = ({navigation}) => {
  return (
    <ScreenSafeAreaView>
      <CustomHeader title={'Promotion'} navigation={navigation} />
    </ScreenSafeAreaView>
  );
};

export default CloudItemScreen;

const styles = StyleSheet.create({});
