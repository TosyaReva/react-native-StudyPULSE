import { StyleSheet, View } from 'react-native';

import LinearGradient from 'react-native-linear-gradient';
import { COLORS } from '../constants/colors';

export default function GradientContainer({ children, style, innerStyle }) {
  return (
    <LinearGradient
      colors={[COLORS.gradientStart, COLORS.gradientEnd]}
      style={style}
      useAngle={true}
      angle={45}
      angleCenter={{ x: 0.5, y: 0.5 }}
    >
      <View style={[styles.inner, innerStyle]}>
        {children}
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  inner: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
});
