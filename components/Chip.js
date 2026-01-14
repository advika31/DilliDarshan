import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

export const Chip = ({
  label,
  onPress,
  selected = false,
  style,
}) => {
  return (
    <TouchableOpacity
      style={[styles.chip, selected && styles.selected, style]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <Text style={[styles.text, selected && styles.selectedText]}>
        {label}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  chip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#f1f5f9',
    marginRight: 8,
    marginBottom: 8,
  },
  selected: {
    backgroundColor: '#2563eb',
  },
  text: {
    fontSize: 14,
    color: '#64748b',
  },
  selectedText: {
    color: '#ffffff',
  },
});
