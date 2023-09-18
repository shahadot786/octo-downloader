import {Linking, Alert} from 'react-native';

function useOpenLink() {
  const openLink = async url => {
    try {
      const supported = await Linking.canOpenURL(url);
      if (supported) {
        await Linking.openURL(url);
      } else {
        Alert.alert('Error', `Cannot open URL: ${url}`);
      }
    } catch (error) {
      Alert.alert('Error', 'An error occurred while opening the link.');
    }
  };

  return openLink;
}

export default useOpenLink;
