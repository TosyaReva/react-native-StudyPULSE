import { View, Text, StyleSheet, Image } from 'react-native';
import React from 'react';
import CustomText from '../components/CustomText';
import CircularProgress from 'react-native-circular-progress-indicator';
import { COLORS } from '../constants/colors.js';

export default function DonutBar({ style, progress = 0, title = "Task Title" }) {
  return (
    <View style={[styles.container, style]}>
      <CircularProgress
        value={progress}
        radius={128}
        duration={2000}
        maxValue={100}
        showProgressValue={false}
        activeStrokeColor={COLORS.gradientStart}
        activeStrokeSecondaryColor={COLORS.gradientEnd}
        inActiveStrokeColor={'transparent'}
        activeStrokeWidth={20}
        inActiveStrokeWidth={20}
        rotation={-45}
      />
      <View style={{ position: 'absolute' }}>
        <Text style={styles.title}>{progress}.00</Text>
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
  title: { fontSize: 64 },
  subtitle: { fontSize: 20, textAlign: 'center' },
  textTask: { color: COLORS.brand },
});
