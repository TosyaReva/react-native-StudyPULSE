import { StyleSheet, Switch, View } from 'react-native';
import React from 'react';
import ScreenComponent from './ScreenComponent.jsx';
import CustomText from '../components/CustomText';
import ButtonWrapper from '../components/Settings/ButtonWrapper.jsx';
import { COLORS } from '../constants/colors.js';
import { useTheme } from '../context/ThemeContext.js';

const SettingsScreen = () => {
  const { theme, toggleTheme } = useTheme();
  const isDarkMode = theme === 'dark';

  return (
    <ScreenComponent style={styles.container}>
      {/* Header row */}
      {/* <View style={styles.header}> */}
      <CustomText type="title" style={styles.categoryTitle}>
        Settings
      </CustomText>
      {/* </View> */}
      <View style={styles.settingsContainersList}>
        {/* General Settings */}
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
        {/* Data Settings */}
        <View style={styles.categoryContainer}>
          <CustomText type="subtitle" style={styles.categoryTitle}>
            Data
          </CustomText>
          <ButtonWrapper title={'Export Statistics'} />
          <ButtonWrapper title={'Reset All Data'} />
        </View>
      </View>
    </ScreenComponent>
  );
};

export default SettingsScreen;

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
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
