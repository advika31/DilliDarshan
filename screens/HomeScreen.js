// screens/HomeScreen.js
import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { Button } from "../components/Button";
import { Card } from "../components/Card";
import SOSButton from "../components/SOSButton";
import { usePoints } from "../context/PointsContext";
import { COLORS } from "../theme";

const QUICK_ACTIONS = [
  { icon: "map-outline", label: "Nearby Places", route: "Explore" },
  { icon: "chatbubble-ellipses-outline", label: "Ask AI", route: "Chat" },
  { icon: "bus-outline", label: "Transport", route: "Explore" },
  { icon: "calendar-outline", label: "Events", route: "Events" },
];

const FEATURE_CARDS = [
  {
    icon: "sparkles",
    title: "AI Travel Guide",
    desc: "Smart suggestions based on time, crowd & location",
  },
  {
    icon: "people",
    title: "Crowd-Aware Planning",
    desc: "Avoid rush & discover calmer heritage spots",
  },
  {
    icon: "book",
    title: "Cultural Stories",
    desc: "Unlock immersive audio & local narratives",
  },
];

const HomeScreen = () => {
  const navigation = useNavigation();
  const { points } = usePoints();

  const handleFeaturePress = (title) => {
    if (title === "Smart Plan") {
      navigation.navigate("PersonalizedPlan", { places: ["1", "2", "4"] });
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* HEADER */}
        <View style={styles.header}>
          <Image source={require("../assets/icon.png")} style={styles.logo} />
          <Text style={styles.appName}>DilliDarshan</Text>
          <Text style={styles.tagline}>
            Explore Delhi like a local — smartly & safely
          </Text>
          <View style={styles.pointsBadge}>
            <Ionicons name="star" size={16} color="#92400e" />
            <Text style={styles.pointsText}>{points} points</Text>
          </View>
        </View>

        {/* CTA BUTTONS */}
        <View style={styles.ctaSection}>
          <Button
            title="Start Exploring"
            onPress={() => navigation.navigate("Explore")}
          />
          <Button
            title="Ask AI Guide"
            variant="secondary"
            onPress={() => navigation.navigate("Chat")}
          />
        </View>

        {/* QUICK ACTIONS */}
        <View style={styles.quickActionsContainer}>
          <Text style={styles.sectionTitle}>Quick Links</Text>
          <View style={styles.quickActionsGrid}>
            {QUICK_ACTIONS.map((item, index) => (
              <TouchableOpacity
                key={index}
                style={styles.quickCard}
                onPress={() => navigation.navigate(item.route)}
              >
                <View style={styles.quickIconCircle}>
                  <Ionicons name={item.icon} size={22} color={COLORS.primary} />
                </View>
                <Text style={styles.quickText}>{item.label}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* SMART TOOLS SECTION */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Smart Tools</Text>
          <Card 
            style={styles.smartPlanCard} 
            onPress={() => handleFeaturePress("Smart Plan")}
          >
            <View style={styles.featureRow}>
              <View style={[styles.featureIcon, { backgroundColor: '#FFF2E0' }]}>
                <Ionicons name="sparkles" size={24} color="#FF8C00" />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.featureTitle}>Generate Smart Plan</Text>
                <Text style={styles.featureDesc}>AI-powered itinerary for your day</Text>
              </View>
              <Ionicons name="chevron-forward" size={20} color="#84593C" />
            </View>
          </Card>
        </View>

        {/* WHY DILLIDARSHAN FEATURES */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Why DilliDarshan?</Text>
          {FEATURE_CARDS.map((f, index) => (
            <Card key={index} style={styles.featureCardMargin}>
              <View style={styles.featureRow}>
                <View style={styles.featureIcon}>
                  <Ionicons name={f.icon} size={24} color={COLORS.primary} />
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={styles.featureTitle}>{f.title}</Text>
                  <Text style={styles.featureDesc}>{f.desc}</Text>
                </View>
              </View>
            </Card>
          ))}
        </View>
        
        {/* BOTTOM SPACER */}
        <View style={{ height: 100 }} />
      </ScrollView>

      {/* FLOATING SOS */}
      <SOSButton />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.bg,
  },
  header: {
    alignItems: "center",
    paddingTop: 40,
    paddingBottom: 24,
    paddingHorizontal: 20,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#F0E4D3',
  },
  logo: {
    width: 70,
    height: 70,
    resizeMode: "contain",
    marginBottom: 10,
  },
  appName: {
    fontSize: 32,
    fontWeight: "800",
    color: "#2D241E",
  },
  tagline: {
    fontSize: 14,
    color: "#84593C",
    marginTop: 4,
    textAlign: "center",
    fontWeight: "500",
  },
  pointsBadge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FEF3C7",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 24,
    marginTop: 16,
    borderWidth: 1,
    borderColor: '#FDE68A',
  },
  pointsText: {
    marginLeft: 6,
    fontWeight: "800",
    color: "#92400e",
  },
  ctaSection: {
    paddingHorizontal: 20,
    marginTop: 24,
    gap: 12,
  },
  quickActionsContainer: {
    paddingHorizontal: 20,
    marginTop: 32,
  },
  quickActionsGrid: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 12,
  },
  quickCard: {
    width: "23%",
    alignItems: "center",
  },
  quickIconCircle: {
    width: 50,
    height: 50,
    borderRadius: 15,
    backgroundColor: '#FFF',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#F0E4D3',
    marginBottom: 8,
  },
  quickText: {
    fontSize: 11,
    fontWeight: "700",
    color: "#84593C",
    textAlign: "center",
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 20,
  },
  section: {
    paddingHorizontal: 20,
    marginTop: 32,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "800",
    color: "#2D241E",
    marginBottom: 12,
  },
  smartPlanCard: {
    backgroundColor: '#FFF9F1',
    borderColor: '#FDE68A',
  },
  featureCardMargin: {
    marginVertical: 6, 
  },
  featureRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
  },
  featureIcon: {
    width: 48,
    height: 48,
    borderRadius: 16,
    backgroundColor: "#FFF3E8",
    alignItems: "center",
    justifyContent: "center",
  },
  featureTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#2D241E",
  },
  featureDesc: {
    fontSize: 13,
    color: "#84593C",
    marginTop: 2,
    lineHeight: 18,
  },
});

export default HomeScreen;