import { Alert, View, StyleSheet, ScrollView } from 'react-native';
import React, { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CustomText from '../components/CustomText';
import UserAvatar from '../components/UserAvatar';
import Stat from '../components/Stat.jsx';
import DonutBar from '../components/DonutBar.jsx';
import RadioButtonList from '../components/RadioButtonList.jsx';
import Button from '../components/Button.jsx';
import ScreenComponent from './ScreenComponent.jsx';
import SCREENS from '../constants/screens.js';
import {
  fetchCategoriesAsync,
  selectAllCategories,
} from '../redux/slices/categoriesSlice';
import {
  fetchSessionsAsync,
  selectAllSessions,
} from '../redux/slices/sessionsSlice';
import { buildStatistics, formatDuration } from '../helpers/statistics.js';
import { selectActiveFocus } from '../redux/slices/focusSlice.js';

const DATA = ['15 min', '25 min', '50 min', 'custom'];
const DAILY_GOAL_SECONDS = 2 * 60 * 60;

const formatTime = seconds => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;

  return `${String(minutes).padStart(2, '0')}:${String(
    remainingSeconds,
  ).padStart(2, '0')}`;
};

export default function HomeScreen({ navigation }) {
  const dispatch = useDispatch();
  const categories = useSelector(selectAllCategories);
  const sessions = useSelector(selectAllSessions);
  const activeFocus = useSelector(selectActiveFocus);
  const [selectedDuration, setSelectedDuration] = useState(DATA[1]);

  const todayStatistics = useMemo(
    () => buildStatistics({ sessions, categories, period: 'day' }),
    [categories, sessions],
  );
  const goalProgress = Math.min(
    Math.round((todayStatistics.totalSeconds / DAILY_GOAL_SECONDS) * 100),
    100,
  );
  const hasActiveFocus = Boolean(activeFocus.category);
  const activeFocusPlannedSeconds = activeFocus.plannedDurationMin * 60;
  const activeFocusProgress =
    activeFocusPlannedSeconds > 0
      ? Math.round(
          ((activeFocusPlannedSeconds - activeFocus.remainingSeconds) /
            activeFocusPlannedSeconds) *
            100,
        )
      : 0;
  const nextBreakMinutes =
    selectedDuration === 'custom'
      ? 5
      : Math.max(Math.round(Number(selectedDuration.split(' ')[0]) / 5), 5);

  useEffect(() => {
    dispatch(fetchCategoriesAsync());
    dispatch(fetchSessionsAsync());
  }, [dispatch]);

  const handleBeginFocus = () => {
    if (activeFocus.category) {
      navigation.navigate(SCREENS.ACTIVE_CATEGORY, activeFocus.category);
      return;
    }

    if (categories.length === 0) {
      Alert.alert(
        'No categories yet',
        'Create a category before starting focus.',
      );
      navigation.navigate(SCREENS.CATEGORY);
      return;
    }

    navigation.navigate(SCREENS.ACTIVE_CATEGORY, {
      ...categories[0],
      initialDuration:
        selectedDuration === 'custom'
          ? 'custom'
          : Number(selectedDuration.split(' ')[0]),
    });
  };

  return (
    <ScreenComponent>
      <ScrollView>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerGreetings}>
            <CustomText type="title">Good Evening</CustomText>
            <CustomText type="subtitle">
              Today is a great day to focus.
            </CustomText>
          </View>

          <UserAvatar image={require('../assets/default_avatar.png')} />
        </View>
        {/* Status */}
        <View style={styles.containerStatus}>
          <Stat
            icon="check-circle-outline"
            title={todayStatistics.totalLabel}
            subtitle="focused today"
            iconActive
            style={styles.statusItems}
          />
          <Stat
            icon="check-circle-outline"
            title={String(todayStatistics.sessionsCount)}
            subtitle="sessions completed"
            iconActive
            style={styles.statusItems}
          />
        </View>

        {/* Donut Bar */}
        <DonutBar
          progress={hasActiveFocus ? activeFocusProgress : goalProgress}
          displayValue={
            hasActiveFocus
              ? formatTime(activeFocus.remainingSeconds)
              : formatDuration(todayStatistics.totalSeconds)
          }
          style={styles.donutBar}
          title={
            hasActiveFocus
              ? activeFocus.category.title
              : todayStatistics.topCategory
          }
        />

        {/* Form */}
        <View style={styles.form}>
          {hasActiveFocus && (
            <View style={styles.activeFocusHeader}>
              <CustomText type="title">Active focus</CustomText>
              <CustomText type="subtitle">
                {activeFocus.isRunning ? 'In progress' : 'Paused'}
              </CustomText>
            </View>
          )}
          <Button
            icon={hasActiveFocus ? 'timer' : 'play-arrow'}
            title={hasActiveFocus ? 'Open Active Focus' : 'Begin Focus'}
            primary
            onPress={handleBeginFocus}
          />
          {!hasActiveFocus && (
            <RadioButtonList
              data={DATA}
              defautlValue={selectedDuration}
              onChange={setSelectedDuration}
            />
          )}
          {/* Status */}
          <View style={styles.containerStatus}>
            <Stat
              icon="access-time"
              iconActive
              title={
                hasActiveFocus
                  ? `${activeFocus.plannedDurationMin} min`
                  : `${nextBreakMinutes} min`
              }
              subtitle={hasActiveFocus ? 'planned focus' : 'next break'}
              style={styles.statusItems}
            />
            <Stat
              icon="local-fire-department"
              title={String(todayStatistics.streak)}
              subtitle="day streak"
              style={styles.statusItems}
            />
          </View>
        </View>
      </ScrollView>
    </ScreenComponent>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 38,
  },
  headerGreetings: {
    gap: 12,
  },
  containerStatus: {
    gap: 16,
    flexDirection: 'row',
  },
  statusItems: {
    flex: 1,
    maxWidth: '48%',
  },
  donutBar: {
    marginVertical: 18,
  },
  form: {
    gap: 16,
    marginBottom: 64,
  },
  activeFocusHeader: {
    alignItems: 'center',
    gap: 4,
  },
});
