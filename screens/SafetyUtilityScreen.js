// screens/SafetyUtilityScreen.js
import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Linking,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { Card } from "../components/Card";

const SafetyUtilityScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <View style={styles.header}>
          <Text style={styles.title}>Safety & Utilities</Text>
          <Text style={styles.subtitle}>24/7 Support for a secure journey</Text>
        </View>

        {/* EMERGENCY QUICK DIAL */}
        <View style={styles.sosRow}>
          <TouchableOpacity
            style={[styles.sosBtn, { backgroundColor: "#ef4444" }]}
            onPress={() => Linking.openURL("tel:112")}
          >
            <Ionicons name="shield" size={28} color="#FFF" />
            <Text style={styles.sosText}>Police (112)</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.sosBtn, { backgroundColor: "#2563eb" }]}
            onPress={() => Linking.openURL("tel:102")}
          >
            <Ionicons name="medical" size={28} color="#FFF" />
            <Text style={styles.sosText}>Ambulance</Text>
          </TouchableOpacity>
        </View>

        {/* NEARBY SERVICES */}
        <Text style={styles.sectionTitle}>Nearby Assistance</Text>
        <Card style={styles.serviceCard}>
          <ServiceItem
            icon="medkit"
            title="AIIMS Hospital"
            dist="1.4 km"
            open={true}
          />
          <View style={styles.divider} />
          <ServiceItem
            icon="business"
            title="Connaught Place Police Stn"
            dist="0.8 km"
            open={true}
          />
        </Card>

        {/* WOMEN SAFETY FEATURES */}
        <Text style={styles.sectionTitle}>Women-Safe Features</Text>
        <Card style={styles.womenCard}>
          <View style={styles.row}>
            <View style={styles.pinkIcon}>
              <Ionicons name="woman" size={24} color="#db2777" />
            </View>
            <View style={styles.col}>
              <Text style={styles.womenTitle}>Safe-Route Tracking</Text>
              <Text style={styles.womenSub}>
                Routes verified for lighting and crowd presence.
              </Text>
            </View>
          </View>
          <TouchableOpacity style={styles.enableBtn}>
            <Text style={styles.enableBtnText}>Activate Live Tracking</Text>
          </TouchableOpacity>
        </Card>

        {/* TRAVEL ADVISORY */}
        <Card style={styles.advisoryCard}>
          <View style={styles.row}>
            <Ionicons name="information-circle" size={24} color="#84593C" />
            <Text style={styles.advisoryTitle}>Current Night Advisory</Text>
          </View>
          <Text style={styles.advisoryText}>
            Public transport is highly active until 11 PM. After midnight, we
            recommend using app-based cabs (Uber/Ola) only.
          </Text>
        </Card>
      </ScrollView>
    </SafeAreaView>
  );
};

const ServiceItem = ({ icon, title, dist, open }) => (
  <View style={styles.row}>
    <View style={styles.iconCircle}>
      <Ionicons name={icon} size={20} color="#FF8C00" />
    </View>
    <View style={styles.col}>
      <Text style={styles.serviceName}>{title}</Text>
      <Text style={styles.serviceDist}>
        {dist} away • {open ? "Open" : "Closed"}
      </Text>
    </View>
    <TouchableOpacity style={styles.navCircle}>
      <Ionicons name="navigate" size={18} color="#FF8C00" />
    </TouchableOpacity>
  </View>
);

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#FEFBF6" },
  scrollContent: { padding: 20 },
  header: { marginBottom: 25 },
  title: { fontSize: 28, fontWeight: "800", color: "#2D241E" },
  subtitle: { fontSize: 15, color: "#84593C", marginTop: 4, fontWeight: "500" },

  sosRow: { flexDirection: "row", gap: 15, marginBottom: 30 },
  sosBtn: {
    flex: 1,
    height: 100,
    borderRadius: 24,
    alignItems: "center",
    justifyContent: "center",
    elevation: 4,
  },
  sosText: { color: "#FFF", fontWeight: "800", marginTop: 8, fontSize: 14 },

  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#2D241E",
    marginBottom: 15,
  },

  serviceCard: { padding: 10 },
  divider: { height: 1, backgroundColor: "#F0E4D3", marginVertical: 10 },
  row: { flexDirection: "row", alignItems: "center" },
  iconCircle: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: "#FFF2E0",
    alignItems: "center",
    justifyContent: "center",
  },
  col: { flex: 1, marginLeft: 15 },
  serviceName: { fontSize: 15, fontWeight: "700", color: "#2D241E" },
  serviceDist: { fontSize: 12, color: "#84593C", marginTop: 2 },
  navCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "#FFF2E0",
    alignItems: "center",
    justifyContent: "center",
  },

  womenCard: {
    padding: 20,
    backgroundColor: "#FFF9FB",
    borderColor: "#FCE7F3",
  },
  pinkIcon: {
    width: 48,
    height: 48,
    borderRadius: 15,
    backgroundColor: "#FCE7F3",
    alignItems: "center",
    justifyContent: "center",
  },
  womenTitle: { fontSize: 16, fontWeight: "800", color: "#9D174D" },
  womenSub: { fontSize: 13, color: "#BE185D", marginTop: 4, lineHeight: 18 },
  enableBtn: {
    backgroundColor: "#db2777",
    padding: 12,
    borderRadius: 12,
    marginTop: 15,
    alignItems: "center",
  },
  enableBtnText: { color: "#FFF", fontWeight: "800" },

  advisoryCard: { padding: 20, marginTop: 20 },
  advisoryTitle: {
    fontSize: 16,
    fontWeight: "800",
    color: "#2D241E",
    marginLeft: 10,
  },
  advisoryText: {
    fontSize: 14,
    color: "#84593C",
    marginTop: 10,
    lineHeight: 22,
    fontWeight: "500",
  },
});

export default SafetyUtilityScreen;
