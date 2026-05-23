import { Alert, Pressable, StyleSheet, TextInput, View } from 'react-native';
import React, { useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Animated from 'react-native-reanimated';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import ButtonTimer from '../components/ButtonTimer.jsx';
import CustomText from '../components/CustomText';
import DonutBar from '../components/DonutBar.jsx';
import RadioButton from '../components/RadioButton.jsx';
import ScreenComponent from './ScreenComponent.jsx';
import { createFocusSessionPayload } from '../components/FocusTimerHost.jsx';
import { COLORS } from '../constants/colors';
import { useTheme } from '../context/ThemeContext';
import { useScaleAnimation } from '../hooks/useScaleAnimation';
import {
  clearFocus,
  pauseFocus,
  resumeFocus,
  selectActiveFocus,
  startFocus,
} from '../redux/slices/focusSlice';
import { fetchCategoriesAsync } from '../redux/slices/categoriesSlice';
import {
  addSessionAsync,
  fetchSessionsAsync,
} from '../redux/slices/sessionsSlice';

const durationOptions = [15, 25, 50, 'custom'];

const formatTime = seconds => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;

  return `${String(minutes).padStart(2, '0')}:${String(
    remainingSeconds,
  ).padStart(2, '0')}`;
};

export default function ActiveCategoryScreen({ navigation, route }) {
  const dispatch = useDispatch();
  const routeCategory = route.params || {};
  const focus = useSelector(selectActiveFocus);
  const activeCategory = focus.category || routeCategory;
  const hasActiveFocus = Boolean(focus.category);
  const { themeColors } = useTheme();
  const [selectedDuration, setSelectedDuration] = useState(
    routeCategory.initialDuration || 25,
  );
  const [customDuration, setCustomDuration] = useState('30');

  const plannedMinutes = useMemo(() => {
    if (selectedDuration === 'custom') {
      const parsed = Number(customDuration);
      return Number.isFinite(parsed) && parsed > 0 ? parsed : 1;
    }

    return selectedDuration;
  }, [customDuration, selectedDuration]);

  const plannedSeconds = hasActiveFocus
    ? focus.plannedDurationMin * 60
    : plannedMinutes * 60;
  const remainingSeconds = hasActiveFocus
    ? focus.remainingSeconds
    : plannedSeconds;
  const focusedSeconds = Math.max(plannedSeconds - remainingSeconds, 0);
  const progress =
    plannedSeconds > 0 ? Math.round((focusedSeconds / plannedSeconds) * 100) : 0;

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

  const refreshFocusData = () => {
    dispatch(fetchCategoriesAsync());
    dispatch(fetchSessionsAsync());
  };

  const handleStart = () => {
    if (!activeCategory.id) {
      Alert.alert('No category', 'Choose a category before starting focus.');
      return;
    }

    if (hasActiveFocus) {
      dispatch(resumeFocus());
      return;
    }

    dispatch(
      startFocus({
        category: activeCategory,
        plannedDurationMin: plannedMinutes,
      }),
    );
  };

  const handlePause = () => {
    dispatch(pauseFocus());
  };

  const handleStop = () => {
    if (!hasActiveFocus) {
      return;
    }

    const payload = createFocusSessionPayload(
      focus,
      'stopped',
      focus.remainingSeconds,
    );

    dispatch(clearFocus());

    if (payload.focused_seconds <= 0) {
      return;
    }

    dispatch(addSessionAsync(payload))
      .unwrap()
      .then(refreshFocusData)
      .catch(error => {
        Alert.alert('Помилка', error || 'Не вдалося зберегти сесію');
      });
  };

  return (
    <ScreenComponent style={styles.screen}>
      <View style={styles.header}>
        <View style={styles.headerRow}>
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
          {hasActiveFocus ? 'One focus is active.' : 'Stay focused.'}
        </CustomText>
      </View>

      {!hasActiveFocus && (
        <View style={styles.durationList}>
          {durationOptions.map(option => (
            <RadioButton
              key={option}
              title={option}
              isActive={selectedDuration === option}
              onPress={setSelectedDuration}
              style={styles.durationItem}
              containerStyle={styles.durationContainer}
            >
              <CustomText type="text">
                {option === 'custom' ? 'Custom' : `${option} min`}
              </CustomText>
            </RadioButton>
          ))}
        </View>
      )}

      {!hasActiveFocus && selectedDuration === 'custom' && (
        <TextInput
          value={customDuration}
          onChangeText={setCustomDuration}
          keyboardType="numeric"
          placeholder="Minutes"
          placeholderTextColor={themeColors.secondaryText}
          style={[
            styles.customInput,
            {
              backgroundColor: themeColors.surface,
              borderColor: themeColors.border,
              color: themeColors.primaryText,
            },
          ]}
        />
      )}

      <DonutBar
        progress={progress}
        style={styles.donutBar}
        title={activeCategory.title}
        displayValue={formatTime(remainingSeconds)}
      />

      <View style={styles.buttons}>
        <ButtonTimer
          icon={focus.isRunning ? 'pause' : 'play-arrow'}
          title={
            focus.isRunning ? 'Pause' : focusedSeconds > 0 ? 'Resume' : 'Start'
          }
          isActive
          onPress={focus.isRunning ? handlePause : handleStart}
        />
        <ButtonTimer
          icon="stop"
          title="Stop"
          isActive={false}
          onPress={handleStop}
        />
      </View>
      <CustomText type="subtitle" style={styles.bottomText}>
        You’re doing great. Don’t break the chain.
      </CustomText>
    </ScreenComponent>
  );
}

const styles = StyleSheet.create({
  screen: {
    marginTop: 40,
  },
  backButton: {
    alignSelf: 'flex-start',
    marginBottom: 16,
    padding: 4,
  },
  header: {
    marginBottom: 24,
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
  durationList: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 16,
  },
  durationItem: {
    flex: 1,
  },
  durationContainer: {
    justifyContent: 'center',
    paddingVertical: 10,
  },
  customInput: {
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginBottom: 16,
  },
  donutBar: {
    marginTop: 8,
  },
  buttons: {
    marginTop: 40,
    marginBottom: 32,
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 16,
  },
  bottomText: {
    width: 224,
    fontSize: 20,
    textAlign: 'center',
    alignSelf: 'center',
  },
});
