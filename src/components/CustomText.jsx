import { Pressable, StyleSheet, Text, View } from 'react-native';
import { COLORS } from '../constants/colors';
export default function CustomText({ type = 'subtitle', children }) {
  return <Text style={styles[type]}>{children}</Text>;
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
});
