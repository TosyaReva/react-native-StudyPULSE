import LinearGradient from 'react-native-linear-gradient';
import { COLORS } from '../constants/colors';
import { View, StyleSheet } from 'react-native';

/**
 * @param {number} borderWidth - товщина градієнтного бордеру (default: 1)
 * @param {number} borderRadius - радіус кутів (default: 8)
 * @param {object} style - додаткові стилі для LinearGradient
 */
export default function GradientBorder({
  children,
  borderWidth = 1,
  borderRadius = 8,
  style,
}) {
  return (
    <View style={[styles.container, { borderRadius, padding: borderWidth }, style]}>
      <LinearGradient
        colors={[COLORS.gradientStart, COLORS.gradientEnd]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={StyleSheet.absoluteFill}
      />
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    overflow: 'hidden',
  },
});
