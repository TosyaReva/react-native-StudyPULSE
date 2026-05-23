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
      {/*
       * Inner View потрібен для iOS: LinearGradient не пропагує
       * flex-стилі (alignItems, justifyContent) до дочірніх елементів.
       * View бере на себе розподіл контенту всередині градієнту.
       */}
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
