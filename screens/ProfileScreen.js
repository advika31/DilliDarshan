// screens/ProfileScreen.js
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
import { useNavigation } from "@react-navigation/native";
import { usePoints } from "../context/PointsContext";
import { usePreferences } from "../context/PreferencesContext";
import { Card } from "../components/Card";
import { Button } from "../components/Button";

const ProfileScreen = () => {
  const navigation = useNavigation();
  const { points } = usePoints();
  const { preferences, setHasCompletedOnboarding } = usePreferences();

  const handleResetTutorial = async () => {
    await setHasCompletedOnboarding(false);
    navigation.navigate("Tutorial");
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* HEADER & POINTS */}
        <View style={styles.header}>
          <View style={styles.avatar}>
            <Ionicons name="person" size={40} color="#84593C" />
          </View>
          <Text style={styles.userName}>Dilli Traveler</Text>
          <View style={styles.pointsBadge}>
            <Ionicons name="star" size={16} color="#92400E" />
            <Text style={styles.pointsText}>{points} Points</Text>
          </View>
        </View>

        {/* FULL PREFERENCES LIST */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Your Travel DNA</Text>
          <Card style={styles.prefCard}>
            <PrefRow
              label="Traveler Type"
              value={preferences?.userType || "N/A"}
            />
            <PrefRow
              label="Interests"
              value={preferences?.interests?.join(", ") || "N/A"}
            />
            <PrefRow
              label="Vibe"
              value={preferences?.crowdPreference || "N/A"}
            />
            <PrefRow label="Language" value={preferences?.language || "N/A"} />
            <PrefRow
              label="Accessibility"
              value={preferences?.accessibilityMode ? "Enabled" : "Disabled"}
            />
          </Card>
        </View>

        {/* TOOLBOX LINKS */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Explore Tools</Text>
          <Card style={styles.menuList}>
            <MenuBtn
              label="Safety & SOS"
              icon="shield-checkmark"
              color="#ef4444"
              onPress={() => navigation.navigate("SafetyUtility")}
            />
            <MenuBtn
              label="Food Recommendations"
              icon="restaurant"
              color="#FF8C00"
              onPress={() => navigation.navigate("FoodRecommendation")}
            />
            <MenuBtn
              label="Events & Culture"
              icon="calendar"
              color="#0284c7"
              onPress={() => navigation.navigate("Events")}
            />
            <MenuBtn
              label="Contribute"
              icon="add-circle"
              color="#10b981"
              onPress={() => navigation.navigate("Contribution")}
            />
            <MenuBtn
              label="Admin Insights"
              icon="stats-chart"
              color="#84593C"
              onPress={() => navigation.navigate("AdminDashboard")}
            />
          </Card>
        </View>

        {/* TUTORIAL ACTION */}
        <View style={styles.footer}>
          <Button
            variant="outline"
            title="View Tutorial Again"
            onPress={handleResetTutorial}
            style={styles.tutorialBtn}
          />
          <Text style={styles.versionText}>DilliDarshan v1.2.0</Text>
        </View>

        <View style={{ height: 40 }} />
      </ScrollView>
    </SafeAreaView>
  );
};

const PrefRow = ({ label, value }) => (
  <View style={styles.prefRow}>
    <Text style={styles.prefLabel}>{label}</Text>
    <Text style={styles.prefValue}>{value}</Text>
  </View>
);

const MenuBtn = ({ label, icon, color, onPress }) => (
  <TouchableOpacity style={styles.menuItem} onPress={onPress}>
    <Ionicons name={icon} size={20} color={color} style={{ width: 30 }} />
    <Text style={styles.menuLabel}>{label}</Text>
    <Ionicons name="chevron-forward" size={16} color="#F0E4D3" />
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#FEFBF6" },
  header: {
    alignItems: "center",
    padding: 30,
    backgroundColor: "#FFF",
    borderBottomWidth: 1,
    borderBottomColor: "#F0E4D3",
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "#F8F1E7",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 12,
  },
  userName: { fontSize: 22, fontWeight: "800", color: "#2D241E" },
  pointsBadge: {
    flexDirection: "row",
    backgroundColor: "#FEF3C7",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    marginTop: 10,
  },
  pointsText: {
    color: "#92400E",
    fontWeight: "800",
    fontSize: 13,
    marginLeft: 5,
  },
  section: { paddingHorizontal: 20, marginTop: 25 },
  sectionTitle: {
    fontSize: 14,
    fontWeight: "800",
    color: "#84593C",
    marginBottom: 12,
    textTransform: "uppercase",
  },
  prefCard: { padding: 15 },
  prefRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 8,
    borderBottomWidth: 0.5,
    borderBottomColor: "#F0E4D3",
  },
  prefLabel: { color: "#84593C", fontWeight: "600", fontSize: 13 },
  prefValue: {
    color: "#2D241E",
    fontWeight: "700",
    fontSize: 13,
    textTransform: "capitalize",
  },
  menuList: { padding: 5 },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
    borderBottomWidth: 0.5,
    borderBottomColor: "#F0E4D3",
  },
  menuLabel: { flex: 1, fontSize: 15, fontWeight: "600", color: "#2D241E" },
  footer: {
    paddingHorizontal: 25,
    paddingVertical: 40,
    alignItems: "center",
    width: "100%",
  },
  tutorialBtn: {
    marginTop: 10,
    width: "100%",
  },
  versionText: {
    marginTop: 20,
    color: "#84593C",
    fontSize: 12,
    fontWeight: "700",
    opacity: 0.6,
  },
});

export default ProfileScreen;
