/* eslint-disable react-hooks/exhaustive-deps */
import {useState, useEffect} from 'react';
import RNFS from 'react-native-fs';

const basePath = '/storage/emulated/0/Download/OctoDownloader/';
export const useGallery = type => {
  const [dirData, setDirData] = useState();
  const [loading, setLoading] = useState(false);

  const getDirData = () => {
    setLoading(true);
    RNFS.readDir(basePath + type)
      .then(result => {
        setDirData(result);
        setLoading(false);
      })
      .catch(error => {
        console.log('Error reading directory:', error);
        setLoading(false);
      });
  };

  useEffect(() => {
    getDirData();
  }, [type]);

  return {dirData, loading};
};
