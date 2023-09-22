/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useRef} from 'react';
import {View, StyleSheet, TouchableOpacity, Text} from 'react-native';
import AppLovinMAX from 'react-native-applovin-max';

const adUnitId = '5356efc71275e6c8';
const NativeAdView = () => {
  const nativeAdViewRef = useRef();
  useEffect(() => {
    nativeAdViewRef.current?.loadAd();
  }, []);

  return (
    <View style={styles.container}>
      <AppLovinMAX.NativeAdView
        adUnitId={adUnitId}
        ref={nativeAdViewRef}
        style={styles.nativead}
        onAdLoaded={adInfo => {
          console.log('Native ad loaded from ' + adInfo.networkName);
        }}
        onAdLoadFailed={errorInfo => {
          console.log(
            'Native ad failed to load with error code ' +
              errorInfo.code +
              ' and message: ' +
              errorInfo.message,
          );
        }}
        onAdClicked={adInfo => {
          console.log('Native ad clicked');
        }}
        onAdRevenuePaid={adInfo => {
          console.log('Native ad revenue paid: ' + adInfo.revenue);
        }}>
        <View style={{flex: 1, flexDirection: 'column'}}>
          <View style={{flexDirection: 'row'}}>
            <AppLovinMAX.NativeAdView.IconView style={styles.icon} />
            <View style={{flexDirection: 'column', flexGrow: 1}}>
              <AppLovinMAX.NativeAdView.TitleView style={styles.title} />
              <AppLovinMAX.NativeAdView.AdvertiserView
                style={styles.advertiser}
              />
            </View>
            <AppLovinMAX.NativeAdView.OptionsView style={styles.optionsView} />
          </View>
          <AppLovinMAX.NativeAdView.BodyView style={styles.body} />
          <AppLovinMAX.NativeAdView.MediaView style={styles.mediaView} />
          <TouchableOpacity
            onPress={() => {
              nativeAdViewRef.current?.performClick();
            }}
            style={styles.callToAction}>
            <Text style={styles.callToActionText}>Learn More</Text>
          </TouchableOpacity>
        </View>
      </AppLovinMAX.NativeAdView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  nativead: {
    width: 300,
    height: 400,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
  },
  icon: {
    width: 50,
    height: 50,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  advertiser: {
    fontSize: 14,
    color: 'gray',
  },
  optionsView: {
    flex: 1,
    alignItems: 'flex-end',
  },
  body: {
    marginVertical: 10,
    fontSize: 16,
  },
  mediaView: {
    width: '100%',
    height: 200,
    backgroundColor: 'lightgray',
    marginBottom: 10,
  },
  callToAction: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  callToActionText: {
    color: 'white',
  },
  loadButton: {
    marginTop: 20,
    backgroundColor: 'green',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  loadButtonText: {
    color: 'white',
  },
});

export default NativeAdView;
