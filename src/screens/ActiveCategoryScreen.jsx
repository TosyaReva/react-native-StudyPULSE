import { View, StyleSheet, Pressable } from 'react-native';
import React from 'react';
import CustomText from '../components/CustomText';
import DonutBar from '../components/DonutBar.jsx';
import ButtonTimer from '../components/ButtonTimer.jsx';
import ScreenComponent from './ScreenComponent.jsx';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import { COLORS } from '../constants/colors';

import Animated from 'react-native-reanimated';
import { useScaleAnimation } from '../hooks/useScaleAnimation';

export default function ActiveCategoryScreen({ navigation, route }) {
  const task = route.params || {};

  const {
    animatedStyle: animatedClose,
    handlePressIn: handlePressInClose,
    handlePressOut: handlePressOutClose,
  } = useScaleAnimation(0.85);

  const {
    animatedStyle: animatedMore,
    handlePressIn: handlePressInMore,
    handlePressOut: handlePressOutMore,
  } = useScaleAnimation(0.85);

  return (
    <ScreenComponent style={{ marginTop: 40 }}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerRow}>
          {/* Back button */}
          <Pressable
            onPress={() => navigation.goBack()}
            onPressIn={handlePressInClose}
            onPressOut={handlePressOutClose}
          >
            <Animated.View style={[styles.backButton, animatedClose]}>
              <MaterialIcon name="close" size={24} color={COLORS.primaryText} />
            </Animated.View>
          </Pressable>
          <CustomText type="title">Deep Work</CustomText>
          <Pressable
            onPressIn={handlePressInMore}
            onPressOut={handlePressOutMore}
          >
            <Animated.View style={[styles.backButton, animatedMore]}>
              <MaterialIcon
                name="more-horiz"
                size={24}
                color={COLORS.primaryText}
              />
            </Animated.View>
          </Pressable>
        </View>

        <CustomText type="subtitle" style={styles.headerSubtitle}>
          Stay focused.
        </CustomText>
      </View>

      {/* Donut Bar */}
      <DonutBar progress={45} style={styles.donutBar} title={task.title} />

      {/* Buttons */}
      <View style={styles.buttons}>
        <ButtonTimer icon="pause" title="Pause" isActive={true} />
        <ButtonTimer icon="stop" title="Stop" isActive={false} />
      </View>
      <CustomText type="subtitle" style={styles.bottomText}>
        You’re doing great. Don’t break the chain.
      </CustomText>
    </ScreenComponent>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  backButton: {
    alignSelf: 'flex-start',
    marginBottom: 16,
    padding: 4,
  },
  header: {
    marginBottom: 38,
  },
  headerRow: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerSubtitle: {
    textAlign: 'center',
  },
  buttons: {
    marginTop: 64,
    marginBottom: 32,
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: '16',
  },
  bottomText: {
    width: 224,
    fontSize: 20,
    textAlign: 'center',
    alignSelf: 'center',
  },
});
