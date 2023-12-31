import {useAppDispatch, useAppSelector} from '../../store/store';
import {toggleMode} from '../../store/slices/themeSlice/themeSlice';
import {MMKV} from 'react-native-mmkv';
import getTheme from '../../theme/theme';
const storage = new MMKV();

const useTheme = () => {
  const dispatch = useAppDispatch();
  const isDarkMode = useAppSelector(state => state.theme.isDarkMode);
  // Get the saved theme mode from MMKV storage
  const savedMode = storage.getString('themeMode');
  // Check if a saved mode exists and use it, otherwise use the default mode
  const initialMode = savedMode ? savedMode === 'dark' : isDarkMode;
  const theme = getTheme(initialMode);
  const toggleTheme = () => {
    // Toggle the mode
    const newMode = !initialMode;
    dispatch(toggleMode(newMode));
    // Save the updated mode to MMKV storage
    storage.set('themeMode', newMode ? 'dark' : 'light');
  };

  return {...theme, toggleTheme, initialMode};
};

export default useTheme;
