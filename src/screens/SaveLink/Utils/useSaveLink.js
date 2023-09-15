import {useFirebase} from '../../../hooks/Firebase/useFirebase';
import {keyStrings} from '../../../hooks/Firebase/keyStrings';

export const useSaveLink = () => {
  const {data, loading} = useFirebase(keyStrings.saveLinkDoc);

  const sortedData = data ? [...data.data] : null;

  if (sortedData) {
    sortedData.sort((a, b) => parseInt(b.id, 10) - parseInt(a.id, 10));
  }

  return {data: sortedData, loading};
};
