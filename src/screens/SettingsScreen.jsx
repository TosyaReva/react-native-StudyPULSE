import { Alert, Share, StyleSheet, Switch, View } from 'react-native';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ScreenComponent from './ScreenComponent.jsx';
import CustomText from '../components/CustomText';
import ButtonWrapper from '../components/Settings/ButtonWrapper.jsx';
import { COLORS } from '../constants/colors.js';
import { useTheme } from '../context/ThemeContext.js';
import { selectAuthMode, signOutAsync } from '../redux/slices/authSlice.js';
import {
  fetchCategoriesAsync,
  selectAllCategories,
} from '../redux/slices/categoriesSlice.js';
import {
  fetchSessionsAsync,
  selectAllSessions,
} from '../redux/slices/sessionsSlice.js';
import { resetAllData } from '../api/api.js';
import { buildStatisticsCsv } from '../helpers/csv.js';
import SCREENS from '../constants/screens.js';

const SettingsScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const mode = useSelector(selectAuthMode);
  const categories = useSelector(selectAllCategories);
  const sessions = useSelector(selectAllSessions);
  const { theme, toggleTheme } = useTheme();
  const isDarkMode = theme === 'dark';
  const [isResetting, setIsResetting] = useState(false);

  const handleExportStatistics = async () => {
    const csv = buildStatisticsCsv({ sessions, categories });

    if (sessions.length === 0) {
      Alert.alert('No statistics yet', 'Complete a focus session first.');
      return;
    }

    try {
      await Share.share({
        title: 'StudyPulse statistics.csv',
        message: csv,
      });
    } catch (error) {
      Alert.alert('Export failed', error.message || 'Could not export data.');
    }
  };

  const refreshData = () => {
    dispatch(fetchCategoriesAsync());
    dispatch(fetchSessionsAsync());
  };

  const handleResetAllData = () => {
    Alert.alert(
      'Reset all data?',
      'This will remove all focus sessions and custom categories for the current mode.',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Reset',
          style: 'destructive',
          onPress: async () => {
            setIsResetting(true);

            try {
              await resetAllData({ mode });
              refreshData();
              Alert.alert('Done', 'Your StudyPulse data has been reset.');
            } catch (error) {
              Alert.alert(
                'Reset failed',
                error.message || 'Could not reset data.',
              );
            } finally {
              setIsResetting(false);
            }
          },
        },
      ],
    );
  };

  const handleLogout = () => {
    Alert.alert('Log out?', 'You will return to the welcome screen.', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Log Out',
        style: 'destructive',
        onPress: () => {
          dispatch(signOutAsync())
            .unwrap()
            .then(() => {
              navigation.reset({
                index: 0,
                routes: [{ name: SCREENS.SPLASH_SCREEN }],
              });
            })
            .catch(error => {
              Alert.alert(
                'Logout failed',
                error.message || 'Could not log out.',
              );
            });
        },
      },
    ]);
  };

  return (
    <ScreenComponent style={styles.container}>
      <CustomText type="title" style={styles.categoryTitle}>
        Settings
      </CustomText>
      <View style={styles.settingsContainersList}>
        <View style={styles.categoryContainer}>
          <CustomText type="subtitle" style={styles.categoryTitle}>
            General
          </CustomText>
          <ButtonWrapper
            icon={isDarkMode ? 'dark-mode' : 'light-mode'}
            title={'Dark Mode'}
            rightElement={
              <Switch
                value={isDarkMode}
                onValueChange={toggleTheme}
                trackColor={{
                  false: COLORS.secondaryText,
                  true: COLORS.brand,
                }}
                thumbColor={COLORS.white}
              />
            }
          />
        </View>
        <View style={styles.categoryContainer}>
          <CustomText type="subtitle" style={styles.categoryTitle}>
            Data
          </CustomText>
          <ButtonWrapper
            icon={'ios-share'}
            title={'Export Statistics'}
            onPress={handleExportStatistics}
          />
          <ButtonWrapper
            icon={'delete-outline'}
            title={isResetting ? 'Resetting...' : 'Reset All Data'}
            onPress={handleResetAllData}
            disabled={isResetting}
          />
          <ButtonWrapper
            icon={'logout'}
            title={mode === 'guest' ? 'Exit Guest Mode' : 'Log Out'}
            onPress={handleLogout}
          />
        </View>
      </View>
    </ScreenComponent>
  );
};

export default SettingsScreen;

const styles = StyleSheet.create({
  settingsContainersList: {
    gap: 40,
  },
  categoryContainer: {
    gap: 12,
  },
  categoryTitle: {
    marginBottom: 12,
  },
});
