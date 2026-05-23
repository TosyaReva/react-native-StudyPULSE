import {
  ActivityIndicator,
  View,
  StyleSheet,
  ScrollView,
} from 'react-native';
import React, { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import RadioButton from '../components/RadioButton';
import ScreenComponent from './ScreenComponent';
import CustomText from '../components/CustomText';
import BarChart from '../components/Charts/BarChartComponent';
import DonutChartComponent from '../components/Charts/DonutChartComponent';
import capitalize from '../helpers/capitalize';
import { COLORS } from '../constants/colors';
import Container from '../components/Container';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import shadowStyle from '../constants/shadowStyle';
import {
  fetchSessionsAsync,
  selectAllSessions,
  selectSessionsLoading,
} from '../redux/slices/sessionsSlice';
import {
  fetchCategoriesAsync,
  selectAllCategories,
} from '../redux/slices/categoriesSlice';
import { buildStatistics } from '../helpers/statistics';

const innerTabs = ['day', 'week', 'month'];
const periodLabels = {
  day: 'today',
  week: 'this week',
  month: 'this month',
};

export default function StatisticsScreen({ navigation }) {
  const dispatch = useDispatch();
  const [tab, setTab] = useState(innerTabs[1]);
  const sessions = useSelector(selectAllSessions);
  const categories = useSelector(selectAllCategories);
  const loading = useSelector(selectSessionsLoading);
  const statistics = useMemo(
    () => buildStatistics({ sessions, categories, period: tab }),
    [sessions, categories, tab],
  );

  useEffect(() => {
    dispatch(fetchSessionsAsync());
    dispatch(fetchCategoriesAsync());
  }, [dispatch]);

  return (
    <ScreenComponent style={[styles.container, styles.screenPadding]}>
      <View style={styles.header}>
        <CustomText type="title">Progress</CustomText>
        <CustomText type="subtitle">
          {statistics.sessionsCount} sessions
        </CustomText>
      </View>
      <View style={styles.innerTabs}>
        {innerTabs.map(tabTitle => (
          <RadioButton
            key={tabTitle}
            style={styles.tabItem}
            containerStyle={styles.tabContainer}
            title={tabTitle}
            onPress={setTab}
            isActive={tabTitle === tab}
          >
            <CustomText
              style={[styles.tabText, tabTitle === tab && styles.tabTextActive]}
            >
              {capitalize(tabTitle)}
            </CustomText>
          </RadioButton>
        ))}
      </View>
      <ScrollView>
        {loading && (
          <ActivityIndicator color={COLORS.brand} style={styles.centered} />
        )}
        <BarChart
          data={statistics.chartData}
          totalLabel={statistics.totalLabel}
          periodLabel={periodLabels[tab]}
        />
        <DonutChartComponent
          data={statistics.donutData}
          totalLabel={statistics.totalLabel}
          styleContainer={styles.infoContainerMargin}
        />
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
              {statistics.streak}
            </CustomText>
            <CustomText type="subtitle">day streak</CustomText>
          </View>
        </Container>
        <Container
          style={[styles.infoContainerMargin, styles.progressSumUpContainer]}
        >
          <View style={styles.SumUpItem}>
            <MaterialIcon name={'access-time'} size={24} color={COLORS.brand} />
            <CustomText style={styles.SumUpItemText} type="subtitle">
              Best focus time:
            </CustomText>
            <CustomText style={styles.SumUpItemText} type="subtitle">
              {statistics.bestFocusTime}
            </CustomText>
          </View>
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
              {statistics.averageSession}
            </CustomText>
          </View>
          <View style={styles.SumUpItem}>
            <MaterialIcon name={'mode-edit'} size={24} color={COLORS.brand} />
            <CustomText style={styles.SumUpItemText} type="subtitle">
              Top category:
            </CustomText>
            <CustomText style={styles.SumUpItemText} type="subtitle">
              {statistics.topCategory}
            </CustomText>
          </View>
        </Container>
      </ScrollView>
    </ScreenComponent>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 16,
  },
  screenPadding: {
    paddingBottom: 80,
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
