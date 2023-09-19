/* eslint-disable react-native/no-inline-styles */
import {StyleSheet, View} from 'react-native';
import React from 'react';
import CustomDropdown from '../../dropdown/CustomDropdown';
import CustomTextInput from '../../../atoms/inputs/CustomTextInput';
import PrimaryButton from '../../../atoms/buttons/PrimaryButton';
import metrics from '../../../../theme/constant/metrics';
import {
  options,
  saveOptions,
} from '../../../../screens/Download/Utils/constant';
import colors from '../../../../theme/constant/colors';

const RequestCard = ({
  handleSelectOption,
  selectedOption,
  onChangeDetailsText,
  onChangeTitleText,
  titleValue,
  detailsValue,
  isLoading,
  onSendRequestPressHandler,
  titleText,
  onPasteBtnPressHandler,
  btnText,
}) => {
  return (
    <View>
      <CustomDropdown
        options={options}
        onSelect={handleSelectOption}
        selectedValue={selectedOption}
        placeholder="Select Type"
      />
      <CustomTextInput
        containerStyle={{marginVertical: 5}}
        placeholder={titleText}
        onChangeText={onChangeTitleText}
        value={titleValue}
        onPasteBtnPressHandler={onPasteBtnPressHandler}
      />
      <CustomTextInput
        containerStyle={{marginVertical: 5}}
        placeholder={'Please write some details...'}
        onChangeText={onChangeDetailsText}
        value={detailsValue}
        inputStyle={styles.inputStyle}
      />
      <PrimaryButton
        title={btnText}
        background={colors.Green}
        onPress={() => onSendRequestPressHandler()}
        disabled={isLoading}
        loading={isLoading}
      />
    </View>
  );
};

export default RequestCard;

const styles = StyleSheet.create({
  inputStyle: {
    height:
      metrics.screenWidth <= 380 ? 100 : metrics.screenWidth <= 600 ? 120 : 140,
    textAlignVertical: 'top',
  },
});
