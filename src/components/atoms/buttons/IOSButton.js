import React from 'react';
import { View, StyleSheet, Pressable } from 'react-native';
import TitleText from '../../../theme/Text/TitleText';

const IOSButton = ({
  containerStyle,
  progressStyle,
  onSelect,
  textAlignment,
  isLeftIcon,
  titleStyle,
  title,
  icon,
  disabled,
  btnStyle,
}) => {
  return (
    <View
      style={{
        ...styles.cardlist,
        ...containerStyle,
      }}>
      <View style={{ ...styles.progressContainer, ...progressStyle }} />
      <View style={{ ...styles.touchable }}>
        <Pressable
          onPress={onSelect}
          disabled={disabled}
          style={({ pressed }) => [
            { ...btnStyle, opacity: pressed ? 0.7 : 1 },
          ]}>
          <View style={{ ...styles.card, ...textAlignment }}>
            <TitleText
              textStyle={{
                ...titleStyle,
              }}
              text={title}
            />
          </View>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  cardlist: {
    marginBottom: 5,
  },
  touchable: {
    borderRadius: 4,
    overflow: 'hidden',
    height: '100%',
    width: '100%',
  },
  card: {
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingLeft: '5%',
    paddingRight: '5%',
    height: '100%',
    width: '100%',
    flexDirection: 'row',
  },
  progressContainer: {
    height: '100%',
    position: 'absolute',
  },
});
export default IOSButton;
