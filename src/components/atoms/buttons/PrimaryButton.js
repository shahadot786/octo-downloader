import {StyleSheet, View, Pressable, ActivityIndicator} from 'react-native';
import React from 'react';
import TitleText from '../../../theme/Text/TitleText';
import colors from '../../../theme/constant/colors';
import useTheme from '../../../hooks/theme/useTheme';

const PrimaryButton = ({
  loading = false,
  title,
  background,
  onPress,
  textAlign,
  disabled,
  minWidth,
  paddingVertical,
}) => {
  const {initialMode} = useTheme();
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      activeOpacity={0.6}
      style={({pressed}) => [
        {
          backgroundColor: pressed ? background : background,
          minWidth: minWidth ? minWidth : '30%',
          opacity: pressed ? 0.7 : 1,
          paddingVertical: paddingVertical ? paddingVertical : '3%',
        },
        styles.button,
      ]}>
      <View style={styles.btnView}>
        <TitleText
          text={title}
          textStyle={[
            {
              color: initialMode ? colors.Black : colors.White,
              textAlign: textAlign,
            },
            ...styles.btnText,
          ]}
        />
        {loading && (
          <ActivityIndicator
            color={initialMode ? colors.Black : colors.White}
            size={'small'}
          />
        )}
      </View>
    </Pressable>
  );
};

export default PrimaryButton;

const styles = StyleSheet.create({
  button: {
    paddingHorizontal: '5%',
    borderRadius: 5,
  },
  btnView: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
  },
  btnText: {
    fontWeight: 500,
    textTransform: 'capitalize',
  },
});
