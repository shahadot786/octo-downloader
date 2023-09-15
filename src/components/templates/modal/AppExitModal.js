/* eslint-disable react-native/no-inline-styles */
import {StyleSheet, View} from 'react-native';
import React from 'react';
import MiddleModal from '../../common/MiddleModal';
import colors from '../../../theme/constant/colors';
import metrics from '../../../theme/constant/metrics';
import Text_Size from '../../../theme/constant/fonts';
import BigText from '../../../theme/Text/BigText';
import LargeBannerAd from '../../../hooks/Ads/Banner/LargeBannerAd';
import PrimaryButton from '../../atoms/buttons/PrimaryButton';
import {useAppSelector} from '../../../store/store';
import ApplovinMREcAd from '../../../hooks/Ads/Banner/ApplovinMREcAd';

const AppExitModal = ({
  isModalVisible,
  setIsModalVisible,
  exitAppPressHandler,
  cancelPressHandler,
}) => {
  const {isAdShown, isApplovin} = useAppSelector(state => state.ads);

  return (
    <View>
      <MiddleModal
        header={'Exit App'}
        isModalVisible={isModalVisible}
        setIsModalVisible={setIsModalVisible}
        onBlur={undefined}
        notOutsidePress
        height={'30%'}>
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            paddingHorizontal: '5%',
          }}>
          {isAdShown && (
            <>{isApplovin ? <ApplovinMREcAd /> : <LargeBannerAd />}</>
          )}
          <BigText
            text={'Are you sure to exit the app?'}
            textStyle={styles.text}
          />
          <View
            style={{
              justifyContent: 'space-between',
              flexDirection: 'row',
              gap: 20,
              marginVertical: 10,
            }}>
            <PrimaryButton
              title={'Cancel'}
              background={colors.Grey}
              onPress={cancelPressHandler}
              paddingVertical={'2%'}
            />
            <PrimaryButton
              title={'Exit'}
              background={colors.Green}
              onPress={exitAppPressHandler}
              paddingVertical={'2%'}
            />
          </View>
        </View>
      </MiddleModal>
    </View>
  );
};

export default AppExitModal;

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
