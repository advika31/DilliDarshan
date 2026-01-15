// components/Chip.jsimport React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { COLORS, RADIUS } from '../theme';

export const Chip = ({ label, selected, onPress }) => (
  <TouchableOpacity
    onPress={onPress}
    style={[
      styles.chip,
      selected && styles.active,
    ]}
  >
    <Text style={[styles.text, selected && styles.activeText]}>
      {label}
    </Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  chip: {
    paddingHorizontal: 18,
    paddingVertical: 10,
    borderRadius: RADIUS.pill,
    backgroundColor: '#EEE',
    marginRight: 10,
    marginBottom: 10,
  },
  active: {
    backgroundColor: COLORS.primary,
  },
  text: {
    fontSize: 14,
    color: COLORS.secondary,
    fontWeight: '600',
  },
  activeText: {
    color: '#fff',
  },
});
