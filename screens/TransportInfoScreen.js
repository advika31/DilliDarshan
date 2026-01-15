// TransportInfoScreen.js
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
import { useRoute } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { Card } from "../components/Card";
import { getPlaceById } from "../constants/places";

const TransportInfoScreen = () => {
  const route = useRoute();
  const { placeId } = route.params || {};
  const place = getPlaceById(placeId);

  if (!place) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.title}>Place not found</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>

        {/* HEADER */}
        <View style={styles.header}>
          <Text style={styles.title}>Transport & Last-Mile Guide</Text>
          <Text style={styles.subtitle}>Getting to {place.name}, the local way</Text>
        </View>

        {/* METRO */}
        <Card style={styles.card}>
          <View style={styles.row}>
            <Ionicons name="train-outline" size={24} color="#2563eb" />
            <View style={styles.col}>
              <Text style={styles.heading}>{place.nearestMetro}</Text>
              <Text style={styles.subText}>
                {place.walkingDistance} walk from metro exit
              </Text>
            </View>
          </View>

          <View style={styles.quickActions}>
            <Action icon="map-outline" label="Open Maps" />
            <Action icon="walk-outline" label="Walking Route" />
          </View>
        </Card>

        {/* FAIR FARE */}
        <Card style={styles.card}>
          <Text style={styles.sectionTitle}>Fair Fare Guide (Anti-Scam)</Text>

          <View style={styles.fareGrid}>
            <FareBox title="Auto-rickshaw" value="₹30 – ₹60" note="Normal daytime fare" />
            <FareBox title="E-rickshaw" value="₹20 – ₹40" note="Shared routes common" />
          </View>

          <Text style={styles.tip}>
            💡 Tip: If quoted higher, politely say “Meter se chalo” or show this screen.
          </Text>
        </Card>

        {/* LOCAL ROUTES */}
        <Card style={styles.card}>
          <Text style={styles.sectionTitle}>Local Routes (Community Verified)</Text>

          <Bullet text={`${place.nearestMetro} → ${place.name} (₹15 shared auto)`} />
          <Bullet text={`Connaught Place → ${place.name} (₹25 e-rickshaw)`} />
          <Bullet text={`India Gate → ${place.name} (₹20 walk + auto)`} />
        </Card>

        {/* YULU */}
        <Card style={styles.card}>
          <View style={styles.row}>
            <Ionicons name="bicycle-outline" size={22} color="#16a34a" />
            <Text style={styles.sectionTitle}>Yulu Last-Mile Ride</Text>
          </View>

          <Text style={styles.subText}>
            Best for traffic-free, short distance travel.
          </Text>

          <TouchableOpacity
            style={styles.yuluButton}
            onPress={() => Linking.openURL("https://www.yulu.bike/")}
          >
            <Text style={styles.yuluText}>Open Yulu App</Text>
          </TouchableOpacity>
        </Card>

        {/* SAFETY */}
        <Card style={styles.card}>
          <Text style={styles.sectionTitle}>Safety & Night Guidance</Text>

          <Bullet text="Stick to main roads after sunset" />
          <Bullet text="Avoid isolated shortcuts at night" />
          <Bullet text="Metro exits with shops are safer" />

          <View style={styles.safeBadge}>
            <Ionicons name="shield-checkmark" size={16} color="#10b981" />
            <Text style={styles.safeText}>Women-friendly route suggested</Text>
          </View>
        </Card>

        {/* FOOTER */}
        <Text style={styles.footer}>
          Crowd-sourced & locally verified • Updated recently
        </Text>

      </ScrollView>
    </SafeAreaView>
  );
};

/* ---------- SMALL UI COMPONENTS ---------- */

const Action = ({ icon, label }) => (
  <TouchableOpacity style={styles.action}>
    <Ionicons name={icon} size={18} color="#2563eb" />
    <Text style={styles.actionText}>{label}</Text>
  </TouchableOpacity>
);

const FareBox = ({ title, value, note }) => (
  <View style={styles.fareBox}>
    <Text style={styles.fareTitle}>{title}</Text>
    <Text style={styles.fareValue}>{value}</Text>
    <Text style={styles.fareNote}>{note}</Text>
  </View>
);

const Bullet = ({ text }) => (
  <Text style={styles.bullet}>• {text}</Text>
);

/* ---------- STYLES ---------- */

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f8fafc" },
  header: { padding: 20, backgroundColor: "#fff" },
  title: { fontSize: 24, fontWeight: "700", color: "#1e293b" },
  subtitle: { fontSize: 14, color: "#64748b", marginTop: 4 },

  card: { margin: 16 },
  row: { flexDirection: "row", alignItems: "center", gap: 12 },
  col: { flex: 1 },

  heading: { fontSize: 16, fontWeight: "600", color: "#1e293b" },
  subText: { fontSize: 14, color: "#64748b", marginTop: 4 },

  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 8,
    color: "#1e293b",
  },

  quickActions: { flexDirection: "row", gap: 16, marginTop: 12, alignItems: "center" },
  action: { alignItems: "center" },
  actionText: { fontSize: 12, color: "#2563eb", marginTop: 4 },

  fareGrid: { flexDirection: "row", gap: 12 },
  fareBox: {
    flex: 1,
    backgroundColor: "#f1f5f9",
    padding: 12,
    borderRadius: 8,
  },
  fareTitle: { fontSize: 13, color: "#64748b" },
  fareValue: { fontSize: 18, fontWeight: "700", color: "#1e293b" },
  fareNote: { fontSize: 12, color: "#64748b" },

  tip: { fontSize: 13, color: "#475569", marginTop: 8 },

  bullet: { fontSize: 14, color: "#475569", marginBottom: 6 },

  yuluButton: {
    marginTop: 12,
    backgroundColor: "#16a34a",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  yuluText: { color: "#fff", fontWeight: "600" },

  safeBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginTop: 10,
  },
  safeText: { color: "#10b981", fontSize: 13, fontWeight: "600" },

  footer: {
    textAlign: "center",
    fontSize: 12,
    color: "#94a3b8",
    marginBottom: 24,
  },
});

export default TransportInfoScreen;
