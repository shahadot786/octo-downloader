import { MMKV } from 'react-native-mmkv';

const storage = new MMKV();

const localStorage = {
  setItem: (key, value) => {
    storage.set(key, value);
    return Promise.resolve(true);
  },
  getItem: key => {
    const value = storage.getString(key);
    return Promise.resolve(value);
  },
  getNumber: key => {
    const value = storage.getNumber(key);
    return Promise.resolve(value);
  },
  getArray: key => {
    const value = storage.getBuffer(key);
    return Promise.resolve(value);
  },
  removeItem: key => {
    storage.delete(key);
    return Promise.resolve();
  },
};

export default localStorage;
