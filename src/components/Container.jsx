import { View, StyleSheet, Platform } from 'react-native';
import { useTheme } from '../context/ThemeContext';
import shadowStyle from '../constants/shadowStyle';

export default function Container({ children, style = {} }) {
  const { themeColors } = useTheme();

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: themeColors.surface,
          borderColor: themeColors.border,
        },
        style,
      ]}
    >
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 12,
    paddingVertical: 16,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    borderRadius: 8,
    borderWidth: 1,
    ...shadowStyle,
  },
});
