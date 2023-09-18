import {useCallback} from 'react';
import Share from 'react-native-share';

const useShareStaticURL = () => {
  const shareURL = useCallback(async (url, title, message) => {
    try {
      const options = {
        url,
        title,
        message,
        failOnCancel: false,
      };

      await Share.open(options);
    } catch (error) {
      console.error('Error sharing:', error);
    }
  }, []);

  return shareURL;
};

export default useShareStaticURL;
