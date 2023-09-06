/* eslint-disable react-hooks/exhaustive-deps */
import {useState, useEffect} from 'react';
import RNFS from 'react-native-fs';
import strings from '../../../theme/constant/strings';

const basePath = '/storage/emulated/0/Download/OctoDownloader/';
export const useGallery = type => {
  const [dirData, setDirData] = useState();
  const [loading, setLoading] = useState(false);
  const [sortData, setSortData] = useState([]);

  const onItemPressHandler = (navigation, data, itemType) => {
    navigation.navigate(strings.ItemViewerScreen, {
      path: data?.path,
      type: itemType,
    });
  };

  const onDeletePressHandler = path => {
    RNFS.unlink(path);
  };

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
  }, [type, dirData]);

  useEffect(() => {
    if (!dirData || dirData.length === 0) {
      setLoading(true);
    } else {
      const sortedData = dirData.slice();
      sortedData.sort((a, b) => {
        if (a.mtime === undefined && b.mtime === undefined) {
          return 0;
        }
        if (a.mtime === undefined) {
          return 1;
        }
        if (b.mtime === undefined) {
          return -1;
        }
        const dateA = new Date(a.mtime);
        const dateB = new Date(b.mtime);
        return dateB - dateA;
      });
      setSortData(sortedData);
      setLoading(false);
    }
  }, [dirData]);

  return {sortData, loading, onItemPressHandler, onDeletePressHandler};
};
