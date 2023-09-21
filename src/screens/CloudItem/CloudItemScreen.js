import {StyleSheet, View} from 'react-native';
import React from 'react';
import ScreenSafeAreaView from '../../theme/Global/ScreenSafeAreaView';
import CustomHeader from '../../components/common/CustomHeader';

const CloudItemScreen = ({navigation, route}) => {
  const {type} = route.params;
  return (
    <ScreenSafeAreaView>
      <CustomHeader title={type} navigation={navigation} />
    </ScreenSafeAreaView>
  );
};

export default CloudItemScreen;

const styles = StyleSheet.create({});
