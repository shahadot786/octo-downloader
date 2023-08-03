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
import CustomProgressBar from '../../components/molecules/progressBar/CustomProgressBar';
import {useAppSelector} from '../../store/store';

const DownloadScreen = () => {
  const {
    handleSelectOption,
    selectedOption,
    onChangeInputText,
    onPasteBtnPressHandler,
    inputValue,
    onDownloadPressHandler,
  } = useDownload();

  const {isAdShown} = useAppSelector(state => state.ads);

  return (
    <ScreenSafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Pressable
          style={{flex: 1, marginHorizontal: 15}}
          onPress={() => Keyboard.dismiss()}>
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
            placeholder="Select a type"
          />
          <View style={{marginVertical: 10, alignItems: 'center'}}>
            {isAdShown && <LargeBannerAd />}
          </View>
          <View>
            <PrimaryButton
              title={'Download'}
              background={colors.Green}
              onPress={onDownloadPressHandler}
            />
          </View>
          <View>
            <CustomProgressBar />
          </View>
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
