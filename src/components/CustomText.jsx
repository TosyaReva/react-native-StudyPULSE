import { StyleSheet, Text } from 'react-native';
import { COLORS } from '../constants/colors';
import { useTheme } from '../context/ThemeContext';

export default function CustomText({ type = 'subtitle', children, style }) {
  const { themeColors } = useTheme();

  const dynamicColor = {
    color:
      type === 'subtitle' ? themeColors.secondaryText : themeColors.primaryText,
  };

  return <Text style={[styles[type], dynamicColor, style]}>{children}</Text>;
}

const styles = StyleSheet.create({
  mainTitle: {
    fontSize: 48,
    color: COLORS.primaryText,
    fontWeight: 700,
  },
  title: {
    fontSize: 24,
    color: COLORS.primaryText,
    fontWeight: 700,
  },
  subtitle: {
    fontWeight: 400,
    fontSize: 18,
    color: COLORS.secondaryText,
  },
  text: {
    fontSize: 16,
    color: COLORS.primaryText,
  },
});
