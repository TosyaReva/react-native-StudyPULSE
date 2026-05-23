import { View, Text, StyleSheet, ScrollView } from 'react-native';
import React, { useState } from 'react';
import RadioButton from '../components/RadioButton';
import ScreenComponent from './ScreenComponent';
import ButtonPlusCircle from '../components/ButtonPlusCircle';
import CustomText from '../components/CustomText';
import BarChart from '../components/Charts/BarChartComponent';
import DonutChartComponent from '../components/Charts/DonutChartComponent';
import capitalize from '../helpers/capitalize';
import { COLORS } from '../constants/colors';
import Container from '../components/Container';
import SumUp from '../components/SumUp';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import shadowStyle from '../constants/shadowStyle';

const innerTabs = ['day', 'week', 'month'];

export default function StatisticsScreen({ navigation }) {
  const [tab, setTab] = useState(innerTabs[1]);
  return (
    <ScreenComponent style={[styles.container, { paddingBottom: 80 }]}>
      {/* Header row */}
      <View style={styles.header}>
        <CustomText type="title">Progress</CustomText>
        <ButtonPlusCircle onPress={() => {}} />
      </View>
      {/* Inner Tabs */}
      <View style={styles.innerTabs}>
        {innerTabs.map(tabTitle => (
          <RadioButton
            style={styles.tabItem}
            containerStyle={styles.tabContainer}
            title={tabTitle}
            onPress={setTab}
            isActive={tabTitle === tab}
          >
            <Text
              style={[styles.tabText, tabTitle === tab && styles.tabTextActive]}
            >
              {capitalize(tabTitle)}
            </Text>
          </RadioButton>
        ))}
      </View>
      <ScrollView>
        <BarChart />
        <DonutChartComponent styleContainer={styles.infoContainerMargin} />
        {/* Progress container 1 */}
        <Container
          style={[styles.infoContainerMargin, styles.progressContainer]}
        >
          <MaterialIcon
            name={'local-fire-department'}
            size={80}
            color={COLORS.brand}
          />
          <View>
            <CustomText type="title" style={[styles.progressContainerCounter]}>
              7
            </CustomText>
            <CustomText type="subtitle">day streak</CustomText>
          </View>
        </Container>
        {/* SumUp Progress container*/}
        <View
          style={[styles.infoContainerMargin, styles.progressSumUpContainer]}
        >
          {/* Best focus time */}
          <View style={styles.SumUpItem}>
            <MaterialIcon name={'access-time'} size={24} color={COLORS.brand} />
            <CustomText style={styles.SumUpItemText} type="subtitle">
              Best focus time:
            </CustomText>
            <CustomText style={styles.SumUpItemText} type="subtitle">
              10-12
            </CustomText>
          </View>
          {/* Average session */}
          <View style={styles.SumUpItem}>
            <MaterialIcon
              name={'access-alarm'}
              size={24}
              color={COLORS.brand}
            />
            <CustomText style={styles.SumUpItemText} type="subtitle">
              Average session:
            </CustomText>
            <CustomText style={styles.SumUpItemText} type="subtitle">
              32 min
            </CustomText>
          </View>
          {/*  Top category: Design */}
          <View style={styles.SumUpItem}>
            <MaterialIcon name={'mode-edit'} size={24} color={COLORS.brand} />
            <CustomText style={styles.SumUpItemText} type="subtitle">
              Top category:
            </CustomText>
            <CustomText style={styles.SumUpItemText} type="subtitle">
              Design
            </CustomText>
          </View>
        </View>
      </ScrollView>
    </ScreenComponent>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  centered: {
    marginTop: 40,
  },
  innerTabs: {
    flexDirection: 'row',
    gap: 2,
  },
  tabItem: {
    flex: 1,
    justifyContent: 'center',
  },
  tabContainer: {
    paddingVertical: 6,
  },
  tabText: {
    fontSize: 12,
    lineHeight: '133%',
    textAlign: 'center',
    flex: 1,
  },
  tabTextActive: {
    color: COLORS.brand,
  },
  infoContainerMargin: {
    marginTop: 12,
  },
  progressContainer: {
    gap: 16,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  progressContainerCounter: {
    fontSize: 40,
    color: COLORS.brand,
  },
  progressSumUpContainer: {
    backgroundColor: COLORS.white2,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 4,
    paddingHorizontal: 8,
    ...shadowStyle,
  },
  SumUpItem: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  SumUpItemText: {
    fontWeight: 500,
    fontSize: 12,
  },
});
