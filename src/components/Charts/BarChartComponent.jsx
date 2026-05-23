import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import Container from '../Container';
import CustomText from '../CustomText';
import { BarChart } from 'react-native-gifted-charts';
import { COLORS } from '../../constants/colors';

const mockData = [
  { value: 250, label: 'M' },
  { value: 500, label: 'T' },
  { value: 745, label: 'W' },
  { value: 320, label: 'T' },
  { value: 600, label: 'F' },
  { value: 256, label: 'S' },
  { value: 300, label: 'S' },
];

const BarChartComponent = ({ data = mockData, styleContainer }) => {
  return (
    <Container style={[styles.container, styleContainer]}>
      <View style={styles.header}>
        <CustomText type="title" style={styles.title}>
          5h 40m
        </CustomText>
        <CustomText>focused This week</CustomText>
      </View>
      <BarChart
        data={data}
        hideYAxisText
        yAxisThickness={0}
        xAxisThickness={0}
        initialSpacing={0}
        endSpacing={0}
        hideRules
        frontColor={COLORS.brand}
        roundedBottom
        roundedTop
      />
    </Container>
  );
};

export default BarChartComponent;

const styles = StyleSheet.create({
  container: { flexDirection: 'column' },
  header: { alignSelf: 'flex-start' },
  title: { fontSize: 48 },
});
