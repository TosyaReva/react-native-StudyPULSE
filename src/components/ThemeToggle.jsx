import { Pressable } from 'react-native';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import { useTheme } from '../context/ThemeContext';
import Animated from 'react-native-reanimated';
import { useScaleAnimation } from '../hooks/useScaleAnimation';

export default function ThemeToggle() {
  const { theme, toggleTheme, themeColors } = useTheme();

  const { animatedStyle, handlePressIn, handlePressOut } = useScaleAnimation(0.85);

  return (
    <Pressable 
      onPress={toggleTheme} 
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      style={{ marginRight: 20 }}
    >
      <Animated.View style={animatedStyle}>
        <MaterialIcon
          name={theme === 'light' ? 'dark-mode' : 'light-mode'}
          size={24}
          color={themeColors.primaryText}
        />
      </Animated.View>
    </Pressable>
  );
}
