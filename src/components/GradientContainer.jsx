import { View, Text } from 'react-native';

import LinearGradient from 'react-native-linear-gradient';
import { COLORS } from '../constants/colors';

export default function GradientContainer({ children, style }) {
  return (
    <LinearGradient
      colors={[COLORS.gradientStart, COLORS.gradientEnd]}
      style={style}
      useAngle={true}
      angle={45}
      angleCenter={{ x: 0.5, y: 0.5 }}
    >
      {children}
    </LinearGradient>
  );
}
