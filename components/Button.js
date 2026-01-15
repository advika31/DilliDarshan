// components/Button.js

import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { COLORS, RADIUS } from '../theme';

export const Button = ({ title, onPress, variant = 'primary', style }) => (
  <TouchableOpacity
    style={[
      styles.button,
      variant === 'secondary' && styles.secondary,
      style,
    ]}
    onPress={onPress}
    activeOpacity={0.85}
  >
    <Text style={styles.text}>{title}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  button: {
    backgroundColor: COLORS.primary,
    paddingVertical: 16,
    borderRadius: RADIUS.card,
    alignItems: 'center',
  },
  secondary: {
    backgroundColor: COLORS.secondary,
  },
  text: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
  },
});
