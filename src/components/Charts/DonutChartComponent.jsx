import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import Container from '../Container';
import CustomText from '../CustomText';
import { PieChart } from 'react-native-gifted-charts';
import { COLORS } from '../../constants/colors';

const mockData = [
  {
    value: 45,
    color: COLORS.iconColors[0],
    // gradientCenterColor: '#006DFF',
    // focused: true,
    label: 'React Native',
  },
  {
    value: 15,
    color: COLORS.iconColors[1],
    // gradientCenterColor: '#3BE9DE',
    label: 'Study',
  },
  {
    value: 28,
    color: COLORS.iconColors[2],
    // gradientCenterColor: '#8F80F3',
    label: 'Design',
  },
  {
    value: 42,
    color: COLORS.iconColors[3],
    // gradientCenterColor: '#FF7F97',
    label: 'English',
  },
  {
    value: 18,
    color: COLORS.iconColors[4],
    // gradientCenterColor: '#FF7F97',
    label: 'Other',
  },
];

const DonutChartComponent = ({ data = mockData, styleContainer }) => {
  const renderLegend = ({ label, value, color }) => {
    return (
      <View
        style={{
          flexDirection: 'row',
          marginBottom: 12,
          gap: 8,
          justifyContent: 'space-between',
        }}
      >
        <View
          style={{
            flexDirection: 'row',
          }}
        >
          <View
            style={{
              height: 18,
              width: 18,
              marginRight: 10,
              borderRadius: 90,
              backgroundColor: color || 'white',
            }}
          />
          <CustomText type="text">{label || ''}</CustomText>
        </View>
        <CustomText type="text">{value + '%' || '0%'}</CustomText>
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
          // sectionAutoFocus
          radius={90}
          innerRadius={60}
          strokeColor="#FFFFFF"
          strokeWidth={4}
          // innerCircleColor={'#232B5D'}
          centerLabelComponent={() => {
            return (
              <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                <CustomText type="title">5h 40m</CustomText>
                <CustomText>total</CustomText>
              </View>
            );
          }}
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
  header: { alignSelf: 'flex-start' },
  chart: { flexDirection: 'row', gap: 16, justifyContent: 'center' },
  legendConteiner: { gap: 8 },
});
