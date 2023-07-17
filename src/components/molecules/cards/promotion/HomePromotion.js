import { StyleSheet, Pressable, View, Image } from 'react-native';
import React from 'react';
import { commonStyles } from '../../../../styles/commonStyles';
import DescriptionText from '../../../../theme/Text/DescriptionText';
import colors from '../../../../theme/constant/colors';
import { useFirebase } from '../../../../hooks/Firebase/useFirebase';
import { keyStrings } from '../../../../hooks/Firebase/keyStrings';
import AppActivityIndicator from '../../../common/AppActivityIndicator';
import images from '../../../../theme/constant/images';
import { useNavigation } from '@react-navigation/native';
import strings from '../../../../theme/constant/strings';
import Ionicons from 'react-native-vector-icons/Ionicons';
import useTheme from '../../../../hooks/theme/useTheme';

const HomePromotion = () => {
  const navigation = useNavigation();
  const { data, loading } = useFirebase(keyStrings.promotionDoc);
  const onPressHandler = () => {
    navigation.navigate(strings.UpdateVideoListScreen);
  };
  const { initialMode } = useTheme();
  return loading ? (
    <View style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }}>
      <AppActivityIndicator />
    </View>
  ) : (
    <Pressable
      onPress={onPressHandler}
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
        style={[
          { width: '70%', marginHorizontal: 10 },
          commonStyles.justifyCenter,
        ]}>
        <DescriptionText
          text={
            data?.promotion?.message
              ? data?.promotion?.message
              : 'Clicked to watch or download new videos..'
          }
        />
      </View>
      <View style={{ position: 'absolute', bottom: 2, right: 10 }}>
        <Ionicons
          name="arrow-forward-circle-sharp"
          color={initialMode ? colors.White : colors.Black}
          size={18}
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
