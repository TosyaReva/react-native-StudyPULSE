import { StyleSheet, View } from 'react-native';
import React, { useCallback } from 'react';
import Container from '../Container';
import CustomText from '../CustomText';
import { PieChart } from 'react-native-gifted-charts';
import { COLORS } from '../../constants/colors';

const fallbackData = [
  {
    value: 45,
    color: COLORS.iconColors[0],
    label: 'React Native',
  },
  {
    value: 15,
    color: COLORS.iconColors[1],
    label: 'Study',
  },
  {
    value: 28,
    color: COLORS.iconColors[2],
    label: 'Design',
  },
  {
    value: 42,
    color: COLORS.iconColors[3],
    label: 'English',
  },
  {
    value: 18,
    color: COLORS.iconColors[4],
    label: 'Other',
  },
];

const CenterLabel = ({ totalLabel }) => (
  <View style={styles.centerLabel}>
    <CustomText type="title">{totalLabel}</CustomText>
    <CustomText>total</CustomText>
  </View>
);

const DonutChartComponent = ({
  data = fallbackData,
  styleContainer,
  totalLabel = '5h 40m',
}) => {
  const renderCenterLabel = useCallback(
    () => <CenterLabel totalLabel={totalLabel} />,
    [totalLabel],
  );

  const renderLegend = ({ label, value, color }) => {
    return (
      <View
        key={label || color || value}
        style={styles.legendItem}
      >
        <View style={styles.legendTitle}>
          <View
            style={[styles.legendColor, { backgroundColor: color || 'white' }]}
          />
          <CustomText type="text">{label || ''}</CustomText>
        </View>
        <CustomText type="text">{value ? `${value}%` : '0%'}</CustomText>
      </View>
    );
  };

  return (
    <Container style={[styles.container, styleContainer]}>
      <View style={styles.header}>
        <CustomText type="title">Focus by category</CustomText>
      </View>
      <View style={styles.chart}>
        <PieChart
          data={data}
          donut
          showGradient
          radius={90}
          innerRadius={60}
          strokeColor="#FFFFFF"
          strokeWidth={4}
          centerLabelComponent={renderCenterLabel}
        />
        <View style={styles.legendConteiner}>
          {data.map(item => renderLegend(item))}
        </View>
      </View>
    </Container>
  );
};

export default DonutChartComponent;

const styles = StyleSheet.create({
  container: { flexDirection: 'column' },
  header: { alignSelf: 'flex-start', marginBottom: 16 },
  chart: { flexDirection: 'row', gap: 16, justifyContent: 'center' },
  legendConteiner: { gap: 8 },
  legendItem: {
    flexDirection: 'row',
    marginBottom: 12,
    gap: 8,
    justifyContent: 'space-between',
  },
  legendTitle: {
    flexDirection: 'row',
  },
  legendColor: {
    height: 18,
    width: 18,
    marginRight: 10,
    borderRadius: 90,
  },
  centerLabel: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});
