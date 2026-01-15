// components/Card.js
import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

export const Card = ({ title, description, onPress, children, style }) => {
  const content = (
    <View style={[styles.card, style]}>
      {title && <Text style={styles.title}>{title}</Text>}
      {description && <Text style={styles.description}>{description}</Text>}
      {children}
    </View>
  );

  if (onPress) {
    return (
      <TouchableOpacity
        onPress={onPress}
        activeOpacity={0.85}
        style={styles.touchable}
      >
        {content}
      </TouchableOpacity>
    );
  }

  return content;
};

const styles = StyleSheet.create({
  touchable: {
    marginVertical: 10,
  },
  card: {
    backgroundColor: "#FFF9F1",
    borderRadius: 24,
    padding: 16,
    borderWidth: 1,
    borderColor: "#F0E4D3",
    shadowColor: "#84593C",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  title: {
    fontSize: 18,
    fontWeight: "700",
    color: "#2D241E",
    marginBottom: 6,
    letterSpacing: -0.3,
  },
  description: {
    fontSize: 14,
    color: "#84593C",
    lineHeight: 20,
    fontWeight: "500",
  },
});
