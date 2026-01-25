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
          <View style={styles.ctaContainer}>
            <Button
              title="Ask AI Guide"
              variant="primary"
              onPress={() => navigation.navigate("Chat")}
            />
          </View>
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
    </SafeAreaView >
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
  recommendationContainer: {
    paddingHorizontal: 20,
    marginTop: 24,
  },
  recommendationTitle: {
    fontSize: 18,
    fontWeight: "800",
    color: "#2D241E",
    marginBottom: 12,
  },
  recommendationCard: {
    backgroundColor: '#FFF9F1',
    borderColor: '#FDE68A',
    borderWidth: 1,
  },
  recommendationContent: {
    padding: 4,
  },
  recommendationHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  recommendationPlace: {
    fontSize: 18,
    fontWeight: "700",
    color: "#2D241E",
    marginLeft: 8,
    flex: 1,
  },
  recommendationReason: {
    fontSize: 14,
    color: "#84593C",
    lineHeight: 20,
    marginBottom: 12,
  },
  recommendationMeta: {
    flexDirection: "row",
    alignItems: "center",
  },
  recommendationDistance: {
    fontSize: 13,
    color: "#84593C",
    marginLeft: 4,
    flex: 1,
  },
  scoreBadge: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  scoreText: {
    fontSize: 12,
    fontWeight: "700",
    color: "#FFFFFF",
  },
  recommendationsContainer: {
    paddingHorizontal: 20,
    marginTop: 24,
  },
  recommendationsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  recommendationsTitle: {
    fontSize: 18,
    fontWeight: "800",
    color: "#2D241E",
  },
  viewToggle: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F0E4D3',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  viewToggleText: {
    fontSize: 12,
    fontWeight: '600',
    color: COLORS.primary,
    marginLeft: 4,
  },
  mapPlaceholder: {
    height: 200,
    backgroundColor: '#F8F9FA',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
    borderWidth: 2,
    borderColor: '#E9ECEF',
    borderStyle: 'dashed',
  },
  mapPlaceholderTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#2D241E',
    marginTop: 12,
    marginBottom: 4,
  },
  mapPlaceholderText: {
    fontSize: 14,
    color: '#84593C',
    textAlign: 'center',
    marginBottom: 16,
  },
  mapPlaceholderButton: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
  },
  mapPlaceholderButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
  placeCard: {
    marginBottom: 12,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#F0E4D3',
  },
  topRecommendation: {
    backgroundColor: '#FFF9F1',
    borderColor: '#FDE68A',
    borderWidth: 2,
  },
  placeCardContent: {
    padding: 4,
  },
  placeHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 8,
  },
  placeInfo: {
    flex: 1,
    marginRight: 12,
  },
  placeName: {
    fontSize: 16,
    fontWeight: "700",
    color: "#2D241E",
    marginBottom: 4,
  },
  categoryBadge: {
    backgroundColor: '#E8F4FD',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 8,
    alignSelf: 'flex-start',
    marginBottom: 4,
  },
  categoryText: {
    fontSize: 10,
    fontWeight: "600",
    color: '#1976D2',
  },
  placeReason: {
    fontSize: 13,
    color: "#84593C",
    lineHeight: 18,
  },
  placeMeta: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  metaItem: {
    flexDirection: "row",
    alignItems: "center",
  },
  metaText: {
    fontSize: 12,
    color: "#84593C",
    marginLeft: 4,
  },
  bestChoiceBadge: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  bestChoiceText: {
    fontSize: 10,
    fontWeight: "700",
    color: "#FFFFFF",
  },
  modalOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  modalContent: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    width: '100%',
    maxWidth: 400,
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 16,
  },
  modalTitleContainer: {
    flex: 1,
    marginRight: 12,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "800",
    color: "#2D241E",
    marginBottom: 4,
  },
  modalCategoryBadge: {
    backgroundColor: '#E8F4FD',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 10,
    alignSelf: 'flex-start',
  },
  modalCategoryText: {
    fontSize: 11,
    fontWeight: "600",
    color: '#1976D2',
  },
  closeButton: {
    padding: 4,
  },
  modalBody: {
    marginBottom: 20,
  },
  modalDescription: {
    fontSize: 14,
    color: "#84593C",
    lineHeight: 20,
    marginBottom: 16,
  },
  modalMeta: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  modalMetaItem: {
    flexDirection: "row",
    alignItems: "center",
  },
  modalMetaText: {
    fontSize: 13,
    color: "#2D241E",
    marginLeft: 6,
    fontWeight: "500",
  },
  modalReason: {
    fontSize: 13,
    color: "#84593C",
    fontStyle: 'italic',
  },
  visitButton: {
    backgroundColor: COLORS.primary,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  visitButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },
  noRecommendationCard: {
    backgroundColor: '#F8F9FA',
    borderColor: '#E9ECEF',
    borderWidth: 1,
  },
  noRecommendationContent: {
    flexDirection: "row",
    alignItems: "flex-start",
    padding: 4,
  },
  noRecommendationText: {
    fontSize: 14,
    color: "#84593C",
    marginLeft: 8,
    flex: 1,
    lineHeight: 20,
  },
});

export default HomeScreen;