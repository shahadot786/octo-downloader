/* eslint-disable react-hooks/exhaustive-deps */
import {useState, useEffect} from 'react';
import RNFS from 'react-native-fs';

const basePath = '/storage/emulated/0/Download/OctoDownloader/';
export const useGallery = type => {
  const [dirData, setDirData] = useState();

  const getDirData = () => {
    RNFS.readDir(basePath + type)
      .then(result => {
        setDirData(result);
      })
      .catch(error => {
        console.log('Error reading directory:', error);
      });
  };

  useEffect(() => {
    getDirData();
  }, [type]);

  return {dirData};
};
