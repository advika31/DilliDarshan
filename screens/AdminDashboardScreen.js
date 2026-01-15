// screens/AdminDashboardScreen.js
import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { Card } from "../components/Card";
import VisitorsBarChart from "../components/VisitorsBarChart";

const AdminDashboardScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.headerTitle}>Admin Insights</Text>
            <Text style={styles.headerSubtitle}>
              Real-time tourism analytics for Delhi
            </Text>
          </View>
          <TouchableOpacity style={styles.refreshBtn}>
            <Ionicons name="refresh" size={20} color="#FF8C00" />
          </TouchableOpacity>
        </View>

        {/* Primary Metrics Row */}
        <View style={styles.metricsRow}>
          <Card style={styles.metricCard}>
            <Text style={styles.metricLabel}>Total Visitors</Text>
            <Text style={styles.metricValue}>12,450</Text>
            <View style={styles.trendRow}>
              <Ionicons name="trending-up" size={14} color="#10b981" />
              <Text style={styles.trendText}>+8.2%</Text>
            </View>
          </Card>

          <Card style={styles.metricCard}>
            <Text style={styles.metricLabel}>Avg. Stay</Text>
            <Text style={styles.metricValue}>2.4h</Text>
            <View style={styles.trendRow}>
              <Ionicons name="time-outline" size={14} color="#84593C" />
              <Text style={[styles.trendText, { color: "#84593C" }]}>
                Stable
              </Text>
            </View>
          </Card>
        </View>

        {/* Analytics Chart */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Weekly Footfall Trend</Text>
          <Card style={styles.chartCard}>
            <VisitorsBarChart />
            <View style={styles.chartFooter}>
              <Text style={styles.chartFooterText}>
                Peak day: Saturday (120% capacity)
              </Text>
            </View>
          </Card>
        </View>

        {/* Crowd Flow Management */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Peak Visiting Hours</Text>
          <Card style={styles.peakCard}>
            {[
              {
                label: "6:00 PM - 8:00 PM",
                status: "Peak",
                val: 0.9,
                color: "#ef4444",
              },
              {
                label: "4:00 PM - 6:00 PM",
                status: "High",
                val: 0.7,
                color: "#f59e0b",
              },
              {
                label: "10:00 AM - 12:00 PM",
                status: "Moderate",
                val: 0.5,
                color: "#FF8C00",
              },
              {
                label: "8:00 AM - 10:00 AM",
                status: "Low",
                val: 0.2,
                color: "#10b981",
              },
            ].map((item, index) => (
              <View key={index} style={styles.peakItem}>
                <View style={styles.peakMeta}>
                  <Text style={styles.peakLabel}>{item.label}</Text>
                  <Text style={[styles.statusText, { color: item.color }]}>
                    {item.status}
                  </Text>
                </View>
                <View style={styles.progressBg}>
                  <View
                    style={[
                      styles.progressFill,
                      {
                        width: `${item.val * 100}%`,
                        backgroundColor: item.color,
                      },
                    ]}
                  />
                </View>
              </View>
            ))}
          </Card>
        </View>

        {/* Active Alerts */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Live System Alerts</Text>
          <Card style={[styles.alertCard, { borderColor: "#FDE68A" }]}>
            <View style={styles.alertRow}>
              <Ionicons name="warning" size={20} color="#f59e0b" />
              <Text style={styles.alertText}>
                High congestion reported near India Gate metro exit.
              </Text>
            </View>
          </Card>
        </View>

        <View style={{ height: 40 }} />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#FEFBF6" },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#FFF",
    borderBottomWidth: 1,
    borderBottomColor: "#F0E4D3",
  },
  headerTitle: { fontSize: 22, fontWeight: "800", color: "#2D241E" },
  headerSubtitle: { fontSize: 13, color: "#84593C", marginTop: 2 },
  refreshBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#FFF2E0",
    alignItems: "center",
    justifyContent: "center",
  },

  metricsRow: {
    flexDirection: "row",
    paddingHorizontal: 15,
    gap: 10,
    marginTop: 15,
  },
  metricCard: { flex: 1, padding: 15, borderRadius: 20 },
  metricLabel: {
    fontSize: 12,
    fontWeight: "700",
    color: "#84593C",
    textTransform: "uppercase",
  },
  metricValue: {
    fontSize: 26,
    fontWeight: "800",
    color: "#2D241E",
    marginVertical: 4,
  },
  trendRow: { flexDirection: "row", alignItems: "center", gap: 4 },
  trendText: { fontSize: 12, fontWeight: "700", color: "#10b981" },

  section: { marginTop: 25, paddingHorizontal: 20 },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#2D241E",
    marginBottom: 12,
  },

  chartCard: { padding: 20, alignItems: "center" },
  chartFooter: {
    marginTop: 15,
    paddingTop: 15,
    borderTopWidth: 1,
    borderTopColor: "#F0E4D3",
    width: "100%",
  },
  chartFooterText: {
    fontSize: 12,
    color: "#84593C",
    fontWeight: "600",
    textAlign: "center",
  },

  peakCard: { padding: 20 },
  peakItem: { marginBottom: 18 },
  peakMeta: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  peakLabel: { fontSize: 14, fontWeight: "600", color: "#2D241E" },
  statusText: { fontSize: 12, fontWeight: "800", textTransform: "uppercase" },
  progressBg: {
    height: 8,
    backgroundColor: "#F0E4D3",
    borderRadius: 4,
    overflow: "hidden",
  },
  progressFill: { height: "100%", borderRadius: 4 },

  alertCard: { backgroundColor: "#FFFBEB", padding: 15 },
  alertRow: { flexDirection: "row", alignItems: "center", gap: 12 },
  alertText: {
    flex: 1,
    fontSize: 13,
    color: "#92400E",
    fontWeight: "600",
    lineHeight: 18,
  },
});

export default AdminDashboardScreen;
