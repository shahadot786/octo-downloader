import { StyleSheet, Pressable, View, Image } from 'react-native';
import React from 'react';
import { commonStyles } from '../../../../styles/commonStyles';
import DescriptionText from '../../../../theme/Text/DescriptionText';
import colors from '../../../../theme/constant/colors';
import images from '../../../../theme/constant/images';
import { useNavigation } from '@react-navigation/native';
import strings from '../../../../theme/constant/strings';
import Ionicons from 'react-native-vector-icons/Ionicons';
import useTheme from '../../../../hooks/theme/useTheme';
import { useAppSelector } from '../../../../store/store';

const HomePromotion = () => {
  const navigation = useNavigation();
  const { promotion } = useAppSelector(state => state.firebase);
  const onPressHandler = () => {
    navigation.navigate(strings.MovieScreen);
  };
  const { initialMode } = useTheme();
  return (
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
            promotion?.imageUrl
              ? { uri: promotion?.imageUrl }
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
            promotion?.message
              ? promotion?.message
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
    marginVertical: 20,
  },
  image: {
    resizeMode: 'contain',
    margin: 5,
    borderRadius: 5,
  },
});
