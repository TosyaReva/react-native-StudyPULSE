import { Pressable } from 'react-native';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import { useTheme } from '../context/ThemeContext';

export default function ThemeToggle() {
  const { theme, toggleTheme, themeColors } = useTheme();

  return (
    <Pressable onPress={toggleTheme} style={{ marginRight: 20 }}>
      <MaterialIcon
        name={theme === 'light' ? 'dark-mode' : 'light-mode'}
        size={24}
        color={themeColors.primaryText}
      />
    </Pressable>
  );
}
