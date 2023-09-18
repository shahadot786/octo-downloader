/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {View, Pressable, ScrollView, StyleSheet} from 'react-native';
import DescriptionText from '../../../theme/Text/DescriptionText';
import colors from '../../../theme/constant/colors';
import useTheme from '../../../hooks/theme/useTheme';
import metrics from '../../../theme/constant/metrics';

const CustomDropdown = ({options, onSelect, selectedValue, placeholder}) => {
  const {initialMode} = useTheme();
  const [showDropdown, setShowDropdown] = useState(false);

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  const handleSelect = value => {
    onSelect(value);
    toggleDropdown();
  };

  const renderDropdown = () => {
    return (
      <View
        style={[
          styles.dropdownContainer,
          {
            backgroundColor: initialMode ? colors.Grey : colors.SoftBlack,
          },
        ]}>
        <ScrollView showsVerticalScrollIndicator={false}>
          {options.map(item => (
            <Pressable
              key={item.value}
              style={({pressed}) => [{opacity: pressed ? 0.7 : 1}]}
              onPress={() => handleSelect(item.value)}>
              <DescriptionText
                text={item.value}
                textStyle={{
                  color: initialMode ? colors.Black : colors.White,
                  paddingVertical: 8,
                  textTransform: 'uppercase',
                }}
              />
            </Pressable>
          ))}
        </ScrollView>
      </View>
    );
  };

  return (
    <View>
      <Pressable
        style={({pressed}) => [
          {
            opacity: pressed ? 0.7 : 1,
            backgroundColor: initialMode ? colors.Grey : colors.SoftBlack,
          },
          styles.selectButton,
        ]}
        onPress={toggleDropdown}>
        <DescriptionText
          text={selectedValue ? selectedValue : placeholder}
          textStyle={{
            color: initialMode ? colors.Black : colors.White,
            textTransform: 'uppercase',
          }}
        />
      </Pressable>
      {showDropdown && renderDropdown()}
    </View>
  );
};

const styles = StyleSheet.create({
  selectButton: {
    paddingHorizontal: 10,
    borderRadius: 5,

    paddingVertical: 15,
  },
  dropdownContainer: {
    borderRadius: 8,
    padding: 8,
    marginTop: 2,
    maxHeight: metrics.screenHeight / 5,
    overflow: 'hidden',
  },
});

export default CustomDropdown;
