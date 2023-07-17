import { useState, useEffect } from 'react';
import firestore from '@react-native-firebase/firestore';
import NetInfo from '@react-native-community/netinfo';
import { keyStrings } from './keyStrings';
import localStorage from '../Utils/localStorage';

export const useFirebase = docId => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  const getData = async () => {
    const netInfoState = await NetInfo.fetch();
    if (netInfoState.isConnected) {
      try {
        const tempData = await firestore()
          .collection(keyStrings.collection)
          .doc(docId)
          .get();

        setData(tempData?._data);
        //set data to local storage
        try {
          await localStorage.setItem(docId, JSON.stringify(tempData?._data));
        } catch (error) {}
      } catch (error) {
      } finally {
        setLoading(false);
      }
    } else {
      setLoading(false);
      const localData = await localStorage.getItem(docId);
      const newData = JSON.parse(localData);
      setData(newData);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return { data, loading };
};
