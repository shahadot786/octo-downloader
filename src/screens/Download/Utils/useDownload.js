import { useState } from 'react';
import Clipboard from '@react-native-clipboard/clipboard';

export const useDownload = () => {
  const [selectedOption, setSelectedOption] = useState('');
  const [inputValue, setInputValue] = useState('');

  const handleSelectOption = value => {
    setSelectedOption(value);
  };

  const onChangeInputText = url => {
    setInputValue(url);
  };

  const onPasteBtnPressHandler = async () => {
    try {
      const clipboardValue = await Clipboard.getString();
      setInputValue(clipboardValue);
    } catch (error) {
      //   console.log('Error pasting from clipboard:', error);
    }
  };

  return {
    handleSelectOption,
    selectedOption,
    onChangeInputText,
    onPasteBtnPressHandler,
    inputValue,
  };
};
