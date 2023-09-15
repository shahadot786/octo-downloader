import {StyleSheet, ScrollView, View} from 'react-native';
import React from 'react';
import ScreenSafeAreaView from '../../theme/Global/ScreenSafeAreaView';
import CustomHeader from '../../components/common/CustomHeader';
import TitleText from '../../theme/Text/TitleText';

const HomeItemListScreen = ({props}) => {
  return (
    <ScreenSafeAreaView>
      <CustomHeader title={props.type} />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.container}>
          <TitleText />
        </View>
      </ScrollView>
    </ScreenSafeAreaView>
  );
};

export default HomeItemListScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
