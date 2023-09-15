/* eslint-disable react-hooks/exhaustive-deps */
import {useState, useEffect} from 'react';
import firestore from '@react-native-firebase/firestore';
import NetInfo from '@react-native-community/netinfo';
import {keyStrings} from './keyStrings';
import localStorage from '../Utils/localStorage';

export const useFirebase = docId => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  const getData = async () => {
    const netInfoState = await NetInfo.fetch();
    if (netInfoState.isConnected) {
      try {
        const docRef = firestore().collection(keyStrings.collection).doc(docId);

        // Subscribe to real-time updates
        const unsubscribe = docRef.onSnapshot(snapshot => {
          if (snapshot.exists) {
            const tempData = snapshot.data();
            setData(tempData);
            // Set data to local storage
            try {
              localStorage.setItem(docId, JSON.stringify(tempData));
            } catch (error) {
              /* Handle local storage error */
            }
          }
        });

        return () => {
          // Unsubscribe from real-time updates when the component unmounts
          unsubscribe();
        };
      } catch (error) {
        /* Handle Firestore error */
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
    return () => {};
  }, []);

  return {data, loading};
};
