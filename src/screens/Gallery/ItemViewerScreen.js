/* eslint-disable react-native/no-inline-styles */
import {Image, StyleSheet, View} from 'react-native';
import React from 'react';
import ScreenSafeAreaView from '../../theme/Global/ScreenSafeAreaView';
import metrics from '../../theme/constant/metrics';
import Pdf from 'react-native-pdf';

const ItemViewerScreen = ({route}) => {
  const {path, type} = route.params;
  return (
    <ScreenSafeAreaView>
      <View style={{flex: 1}}>
        {/* image */}
        {type === 'image' && (
          <View
            style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <Image
              source={{uri: `file://${path}`}}
              height={metrics.screenHeight}
              width={metrics.screenWidth}
              resizeMode="contain"
            />
          </View>
        )}
        {/* pdf */}
        {type === 'pdf' && (
          <Pdf
            trustAllCerts={false}
            source={{uri: `file://${path}`}}
            onLoadComplete={(numberOfPages, filePath) => {}}
            onPageChanged={(page, numberOfPages) => {}}
            onError={error => {}}
            onPressLink={uri => {}}
            style={styles.pdf}
          />
        )}
      </View>
    </ScreenSafeAreaView>
  );
};

export default ItemViewerScreen;

const styles = StyleSheet.create({
  pdf: {
    flex: 1,
    height: metrics.screenHeight,
    width: metrics.screenWidth,
  },
});
