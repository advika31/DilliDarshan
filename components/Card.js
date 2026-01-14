import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

export const Card = ({
  title,
  description,
  onPress,
  children,
  style,
}) => {
  const content = (
    <View style={[styles.card, style]}>
      {title && <Text style={styles.title}>{title}</Text>}
      {description && <Text style={styles.description}>{description}</Text>}
      {children}
    </View>
  );

  if (onPress) {
    return (
      <TouchableOpacity onPress={onPress} activeOpacity={0.7}>
        {content}
      </TouchableOpacity>
    );
  }

  return content;
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    marginVertical: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1e293b',
    marginBottom: 8,
  },
  description: {
    fontSize: 14,
    color: '#64748b',
    lineHeight: 20,
  },
});
