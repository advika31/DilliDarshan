//  components/VisitorsBarChart.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Svg, { Rect } from 'react-native-svg';

const DATA = [
  { label: 'Mon', value: 40 },
  { label: 'Tue', value: 55 },
  { label: 'Wed', value: 70 },
  { label: 'Thu', value: 60 },
  { label: 'Fri', value: 90 },
  { label: 'Sat', value: 120 },
  { label: 'Sun', value: 100 },
];

const MAX_VALUE = 120;
const CHART_HEIGHT = 120;
const BAR_WIDTH = 20;
const BAR_GAP = 14;

const CHART_WIDTH = DATA.length * (BAR_WIDTH + BAR_GAP);

const VisitorsBarChart = () => {
  return (
    <View style={styles.container}>
      <Svg width={CHART_WIDTH} height={CHART_HEIGHT}>
        {DATA.map((item, index) => {
          const barHeight = (item.value / MAX_VALUE) * CHART_HEIGHT;
          return (
            <Rect
              key={item.label}
              x={index * (BAR_WIDTH + BAR_GAP)}
              y={CHART_HEIGHT - barHeight}
              width={BAR_WIDTH}
              height={barHeight}
              rx={4}
              fill="#2563eb"
            />
          );
        })}
      </Svg>

      <View style={styles.labels}>
        {DATA.map(item => (
          <Text key={item.label} style={styles.label}>
            {item.label}
          </Text>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',  
    justifyContent: 'center',
    marginTop: 12,
  },
  labels: {
    flexDirection: 'row',
    marginTop: 8,
  },
  label: {
    width: BAR_WIDTH + BAR_GAP,
    textAlign: 'center',
    fontSize: 10,
    color: '#64748b',
  },
});

export default VisitorsBarChart;
