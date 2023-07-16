import { StyleSheet, Pressable, View, Image } from 'react-native';
import React from 'react';
import { commonStyles } from '../../../../styles/commonStyles';
import DescriptionText from '../../../../theme/Text/DescriptionText';
import colors from '../../../../theme/constant/colors';
import { useFirebase } from '../../../../hooks/Firebase/useFirebase';
import { keyStrings } from '../../../../hooks/Firebase/keyStrings';
import AppActivityIndicator from '../../../common/AppActivityIndicator';
import images from '../../../../theme/constant/images';
import metrics from '../../../../theme/constant/metrics';

const HomePromotion = () => {
  const { data, loading } = useFirebase(keyStrings.promotionDoc);
  return loading ? (
    <View style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }}>
      <AppActivityIndicator />
    </View>
  ) : (
    <Pressable
      style={({ pressed }) => [
        styles.promotion,
        commonStyles.flexRow,
        commonStyles.justifyBetween,
        { opacity: pressed ? 0.7 : 1 },
      ]}>
      {/* image */}
      <View style={{ width: '25%' }}>
        <Image
          source={
            data?.promotion?.image
              ? { uri: data?.promotion?.image }
              : images.promo_icon
          }
          style={[styles.image, commonStyles.smallImageSize]}
        />
      </View>
      <View
        style={[{ width: '70%', marginRight: 5 }, commonStyles.justifyCenter]}>
        <DescriptionText
          text={
            data?.promotion?.message
              ? data?.promotion?.message
              : 'Clicked to watch or download new videos..'
          }
        />
      </View>
    </Pressable>
  );
};

export default HomePromotion;

const styles = StyleSheet.create({
  promotion: {
    backgroundColor: colors.Error,
    width: '65%',
    borderRadius: 10,
    marginVertical: '9%',
  },
  image: {
    resizeMode: 'contain',
    margin: 5,
    borderRadius: 5,
  },
});
