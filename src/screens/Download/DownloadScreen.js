/* eslint-disable react-native/no-inline-styles */
import {StyleSheet, View, Pressable, Keyboard, ScrollView} from 'react-native';
import React from 'react';
import ScreenSafeAreaView from '../../theme/Global/ScreenSafeAreaView';
import CustomTextInput from '../../components/atoms/inputs/CustomTextInput';
import CustomDropdown from '../../components/molecules/dropdown/CustomDropdown';
import {options} from './Utils/constant';
import {useDownload} from './Utils/useDownload';
import LargeBannerAd from '../../hooks/Ads/Banner/LargeBannerAd';
import BottomSpacing from '../../theme/Global/BottomSpacing';
import PrimaryButton from '../../components/atoms/buttons/PrimaryButton';
import colors from '../../theme/constant/colors';
import CustomProgressBar from '../../components/atoms/progress/CustomProgressBar';
import ApplovinMREcAd from '../../hooks/Ads/Banner/ApplovinMREcAd';

const DownloadScreen = () => {
  const {
    handleSelectOption,
    selectedOption,
    onChangeInputText,
    onPasteBtnPressHandler,
    inputValue,
    onDownloadPressHandler,
    isAdShown,
    isAdPriority,
    isApplovin,
    downloadProgress,
    currentSize,
    totalSize,
    loading,
  } = useDownload();
  return (
    <ScreenSafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Pressable
          style={{
            flex: 1,
            marginHorizontal: 15,
          }}
          onPress={() => Keyboard.dismiss()}>
          {loading === false && (
            <View>
              <CustomTextInput
                containerStyle={{marginVertical: 5}}
                placeholder={'Please paste the url here..'}
                onChangeText={onChangeInputText}
                onPasteBtnPressHandler={onPasteBtnPressHandler}
                value={inputValue}
              />
              <CustomDropdown
                options={options}
                onSelect={handleSelectOption}
                selectedValue={selectedOption}
                placeholder="Select a file type"
              />
            </View>
          )}
          {/* MREc Ad */}
          {isAdShown && (
            <View style={{marginVertical: 10, alignItems: 'center'}}>
              {isApplovin ? <ApplovinMREcAd /> : <LargeBannerAd />}
            </View>
          )}
          <View>
            {loading === true && (
              <View
                style={{
                  borderWidth: 1,
                  borderRadius: 5,
                  paddingTop: 15,
                  borderColor: colors.Grey,
                  marginBottom: 15,
                  marginHorizontal: 15,
                }}>
                <CustomProgressBar
                  progress={downloadProgress}
                  currentSize={currentSize}
                  totalSize={totalSize}
                />
              </View>
            )}
            {loading === false && (
              <PrimaryButton
                title={'Download'}
                background={colors.Green}
                onPress={() => onDownloadPressHandler(selectedOption)}
                disabled={loading}
              />
            )}
          </View>
          {/* MREc Ad */}
          {loading === true && (
            <>
              {isAdPriority && (
                <View style={{marginVertical: 10, alignItems: 'center'}}>
                  {isApplovin ? <ApplovinMREcAd /> : <LargeBannerAd />}
                </View>
              )}
            </>
          )}
        </Pressable>
        <BottomSpacing />
        <BottomSpacing />
      </ScrollView>
    </ScreenSafeAreaView>
  );
};

export default DownloadScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
