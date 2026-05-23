import { View, Text, StyleSheet } from 'react-native';
import React from 'react';
import CustomText from '../components/CustomText';
import Svg, { Circle, Defs, LinearGradient, Stop } from 'react-native-svg';
import { COLORS } from '../constants/colors.js';
import { useTheme } from '../context/ThemeContext';

const SIZE = 276;
const STROKE_WIDTH = 20;
const RADIUS = 128;
const CENTER = SIZE / 2;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

export default function DonutBar({
  style,
  progress = 0,
  title = 'Task Title',
  displayValue,
}) {
  const { themeColors, theme } = useTheme();
  const normalizedProgress = Math.min(Math.max(Number(progress) || 0, 0), 100);
  const strokeDashoffset =
    CIRCUMFERENCE - (CIRCUMFERENCE * normalizedProgress) / 100;

  return (
    <View style={[styles.container, style]}>
      <Svg width={SIZE} height={SIZE} viewBox={`0 0 ${SIZE} ${SIZE}`}>
        <Defs>
          <LinearGradient id="donutProgress" x1="0" y1="0" x2="1" y2="1">
            <Stop offset="0" stopColor={COLORS.gradientStart} />
            <Stop offset="1" stopColor={COLORS.gradientEnd} />
          </LinearGradient>
        </Defs>
        <Circle
          cx={CENTER}
          cy={CENTER}
          r={RADIUS}
          stroke={theme === 'light' ? 'rgba(0,0,0,0.05)' : '#333333'}
          strokeWidth={STROKE_WIDTH}
          fill="transparent"
        />
        <Circle
          cx={CENTER}
          cy={CENTER}
          r={RADIUS}
          stroke="url(#donutProgress)"
          strokeWidth={STROKE_WIDTH}
          strokeLinecap="round"
          strokeDasharray={`${CIRCUMFERENCE} ${CIRCUMFERENCE}`}
          strokeDashoffset={strokeDashoffset}
          fill="transparent"
          transform={`rotate(-90 ${CENTER} ${CENTER})`}
        />
      </Svg>
      <View style={styles.labelContainer}>
        <Text style={[styles.title, { color: themeColors.primaryText }]}>
          {displayValue || `${normalizedProgress}.00`}
        </Text>
        <CustomText style={styles.subtitle}>Current Task</CustomText>
        <CustomText style={[styles.subtitle, styles.textTask]}>
          {title}
        </CustomText>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { alignItems: 'center', justifyContent: 'center' },
  labelContainer: {
    position: 'absolute',
    alignItems: 'center',
  },
  title: { fontSize: 64 },
  subtitle: { fontSize: 20, textAlign: 'center' },
  textTask: { color: COLORS.brand },
});
