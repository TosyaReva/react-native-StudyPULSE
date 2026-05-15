import { View, Text, StyleSheet } from 'react-native';
import React from 'react';
import Logo from '../components/Logo';
import CustomText from '../components/CustomText';
import { COLORS } from '../constants/colors';
import Button from '../components/Button';
import SCREENS from '../constants/screens';
import ScreenComponent from './ScreenComponent.jsx';

export default function SplashScreen({ navigation }) {
  const navigateToHome = () => navigation.replace(SCREENS.HOME);
  return (
    <ScreenComponent style={styles.container}>
      <View style={styles.containerTop}>
        <Logo />
        <View style={styles.title}>
          <CustomText type="mainTitle">Study</CustomText>
          <CustomText type="mainTitle" style={styles.mainTitle}>
            PULSE
          </CustomText>
        </View>
        <CustomText type="title">Focus Better. Work Deeper.</CustomText>
        <CustomText type="subtitle" style={styles.textCenter}>
          Pomodoro timer for students, coders and creators.
        </CustomText>
      </View>
      <View style={styles.containerButtons}>
        <Button
          title="Get Started"
          primary
          style={styles.button}
          onPress={navigateToHome}
        />
        <Button
          title="Continue as Guest"
          style={styles.button}
          onPress={navigateToHome}
        />
      </View>
    </ScreenComponent>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  containerTop: {
    alignItems: 'center',
    marginBottom: 165,
  },
  title: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20,
  },
  mainTitle: {
    color: COLORS.brand,
  },
  textCenter: {
    textAlign: 'center',
    marginTop: 16,
  },
  containerButtons: {
    gap: 20,
    width: '100%',
  },
  button: {
    width: '100%',
  },
});
