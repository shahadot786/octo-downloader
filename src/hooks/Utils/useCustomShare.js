// CustomShareHook.js
import {useState} from 'react';
import {Share} from 'react-native';

const useCustomShare = () => {
  const [shareError, setShareError] = useState(null);

  const shareUrl = async url => {
    try {
      const result = await Share.share({
        url,
      });

      if (result.action === Share.sharedAction) {
        // URL was successfully shared
        console.log('URL shared successfully');
      } else if (result.action === Share.dismissedAction) {
        // Share was dismissed
        console.log('Sharing dismissed');
      }
    } catch (error) {
      console.error('Error sharing URL:', error);
      setShareError(error.message);
    }
  };

  return {shareUrl, shareError};
};

export default useCustomShare;
