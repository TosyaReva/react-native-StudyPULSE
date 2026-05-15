import { View, StyleSheet } from 'react-native';
import React from 'react';
import CustomText from '../components/CustomText';
import UserAvatar from '../components/UserAvatar';
import Stat from '../components/Stat.jsx';
import DonutBar from '../components/DonutBar.jsx';
import RadioButtonList from '../components/RadioButtonList.jsx';
import Button from '../components/Button.jsx';
import ScreenComponent from './ScreenComponent.jsx';

const DATA = ['15 min', '25 min', '50 min', 'custom'];

export default function HomeScreen({ navigation }) {
  return (
    <ScreenComponent>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerGreetings}>
          <CustomText type="title">Good Evening, Tosya</CustomText>
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
          title="1h 25m"
          subtitle="focused"
          iconActive
          style={styles.statusItems}
        />
        <Stat
          icon="check-circle-outline"
          title="3"
          subtitle="sessions completed"
          iconActive
          style={styles.statusItems}
        />
      </View>

      {/* Donut Bar */}
      <DonutBar progress={45} style={styles.donutBar} />

      {/* Form */}
      <View style={styles.form}>
        <Button icon={'play-arrow'} title="Begin Focus" primary />
        <RadioButtonList data={DATA} />
        {/* Status */}
        <View style={styles.containerStatus}>
          <Stat
            icon="access-time"
            iconActive
            title="5 min"
            subtitle="next break"
            style={styles.statusItems}
          />
          <Stat
            icon="local-fire-department"
            title="4"
            subtitle="day streak"
            style={styles.statusItems}
          />
        </View>
      </View>
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
  },
});
