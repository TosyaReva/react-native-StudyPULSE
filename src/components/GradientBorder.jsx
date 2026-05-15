import LinearGradient from 'react-native-linear-gradient';
import { COLORS } from '../constants/colors';

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
    <LinearGradient
      colors={[COLORS.gradientStart, COLORS.gradientEnd]}
      useAngle={true}
      angle={45}
      angleCenter={{ x: 0.5, y: 0.5 }}
      style={[{ padding: borderWidth, borderRadius, overflow: 'hidden' }, style]}
    >
      {children}
    </LinearGradient>
  );
}
