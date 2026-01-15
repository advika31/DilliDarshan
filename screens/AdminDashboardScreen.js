// AdminDashboardScreen.js
import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { Card } from "../components/Card";
import VisitorsBarChart from "../components/VisitorsBarChart";

const AdminDashboardScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Admin Dashboard</Text>
          <Text style={styles.subtitle}>
            Tourism insights and analytics
          </Text>
        </View>

        {/* Metrics */}
        <Card style={styles.card}>
          <View style={styles.metricContainer}>
            <View style={styles.metricItem}>
              <Text style={styles.metricValue}>12,450</Text>
              <Text style={styles.metricLabel}>Today</Text>
            </View>

            <View style={styles.metricItem}>
              <Text style={styles.metricValue}>+8.2%</Text>
              <Text style={styles.metricLabel}>vs Last Week</Text>
            </View>
          </View>

          
            <VisitorsBarChart />
          
        </Card>

        {/* Peak Hours */}
        <Card style={styles.card}>
          <Text style={styles.sectionTitle}>Peak Visiting Hours</Text>

          <View style={styles.peakHoursList}>
            {[
              { label: "6:00 PM - 8:00 PM", value: "Peak", width: "90%" },
              { label: "4:00 PM - 6:00 PM", value: "High", width: "70%" },
              { label: "10:00 AM - 12:00 PM", value: "Moderate", width: "50%" },
              { label: "8:00 AM - 10:00 AM", value: "Low", width: "30%" },
            ].map((item, index) => (
              <View key={index} style={styles.peakHourItem}>
                <View style={styles.peakHourBar}>
                  <View style={[styles.peakHourFill, { width: item.width }]} />
                </View>
                <Text style={styles.peakHourLabel}>{item.label}</Text>
                <Text style={styles.peakHourValue}>{item.value}</Text>
              </View>
            ))}
          </View>
        </Card>

      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8fafc",
  },
  scrollView: {
    flex: 1,
  },
  header: {
    backgroundColor: "#ffffff",
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#e2e8f0",
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    color: "#1e293b",
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: "#64748b",
  },
  card: {
    margin: 16,
    marginTop: 16,
  },
  metricContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 20,
  },
  metricItem: {
    alignItems: "center",
  },
  metricValue: {
    fontSize: 32,
    fontWeight: "700",
    color: "#1e293b",
    marginBottom: 4,
  },
  metricLabel: {
    fontSize: 14,
    color: "#64748b",
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1e293b",
    marginBottom: 16,
  },
  peakHoursList: {
    gap: 16,
  },
  peakHourItem: {
    flexDirection: "row",
    alignItems: "center",
  },
  peakHourBar: {
    flex: 1,
    height: 8,
    backgroundColor: "#e2e8f0",
    borderRadius: 4,
    marginRight: 12,
  },
  peakHourFill: {
    height: "100%",
    backgroundColor: "#2563eb",
    borderRadius: 4,
  },
  peakHourLabel: {
    fontSize: 13,
    color: "#64748b",
    minWidth: 120,
  },
  peakHourValue: {
    fontSize: 12,
    fontWeight: "600",
    color: "#1e293b",
    minWidth: 60,
  },
  footer: {
    padding: 20,
    paddingBottom: 32,
    alignItems: "center",
  },
  footerText: {
    fontSize: 12,
    color: "#94a3b8",
    fontStyle: "italic",
    textAlign: "center",
  },
});

export default AdminDashboardScreen;
