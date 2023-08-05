import {useEffect, useState} from 'react';
import NetInfo from '@react-native-community/netinfo';

const useNetInfo = () => {
  const [netInfoState, setNetInfoState] = useState(null);

  useEffect(() => {
    const fetchNetInfoState = async () => {
      try {
        const state = await NetInfo.fetch();
        setNetInfoState(state);
      } catch (error) {
        // Handle any errors that might occur during fetching the network state
        console.error('Error fetching network state:', error);
      }
    };

    const unsubscribe = NetInfo.addEventListener(state => {
      setNetInfoState(state);
    });

    fetchNetInfoState();

    // Clean up the event listener on unmount
    return () => {
      unsubscribe();
    };
  }, []);

  return netInfoState;
};

export default useNetInfo;
