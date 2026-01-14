import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Linking,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRoute, useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { usePoints } from "../context/PointsContext";
import { usePreferences } from "../context/PreferencesContext";
import { Card } from "../components/Card";
import { Button } from "../components/Button";
import { STORY_MODES } from "../constants/stories";
import { getPlaceById, getNearbyPlaces } from "../constants/places";

const PlaceDetailsScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { placeId } = route.params;
  const { points } = usePoints();
  const { preferences } = usePreferences();

  const place = getPlaceById(placeId);
  const nearbyPlaces = place ? getNearbyPlaces(placeId, 2) : [];

  if (!place) {
    return (
      <View style={styles.container}>
        <Text>Place not found</Text>
      </View>
    );
  }

  const crowdColor =
    place.crowdLevel === "low"
      ? "#10b981"
      : place.crowdLevel === "medium"
      ? "#f59e0b"
      : "#ef4444";

  const canUnlockStory = points >= 50;
  const quickStoryUnlocked = points >= 20;

  const handleStoryPress = (mode) => {
    if (mode === "quick" && !quickStoryUnlocked) {
      return;
    }
    if (mode !== "quick" && !canUnlockStory) {
      return;
    }
    navigation.navigate("Storytelling", { placeId, mode });
  };

  const handleBookTicket = () => {
    Linking.openURL("https://asi.paygov.org.in");
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.placeName}>{place.name}</Text>
          <Text style={styles.culturalHook}>{place.culturalHook}</Text>
          <View
            style={[styles.crowdBadge, { backgroundColor: `${crowdColor}20` }]}
          >
            <View style={[styles.crowdDot, { backgroundColor: crowdColor }]} />
            <Text style={[styles.crowdText, { color: crowdColor }]}>
              {place.crowdLevel.toUpperCase()} CROWD
            </Text>
          </View>
        </View>

        {/* Visit Info */}
        <Card style={styles.card}>
          <View style={styles.infoRow}>
            <Ionicons name="time-outline" size={20} color="#64748b" />
            <View style={styles.infoContent}>
              <Text style={styles.infoLabel}>Best time to visit</Text>
              <Text style={styles.infoValue}>{place.bestTimeToVisit}</Text>
            </View>
          </View>

          <View style={styles.infoRow}>
            <Ionicons name="clock-outline" size={20} color="#64748b" />
            <View style={styles.infoContent}>
              <Text style={styles.infoLabel}>Opening hours</Text>
              <Text style={styles.infoValue}>{place.openingHours}</Text>
            </View>
          </View>

          <View style={styles.infoRow}>
            <Ionicons name="cash-outline" size={20} color="#64748b" />
            <View style={styles.infoContent}>
              <Text style={styles.infoLabel}>Entry fee</Text>
              <Text style={styles.infoValue}>{place.entryFee}</Text>
            </View>
          </View>
          {place.entryFee !== "Free" && (
            <Button
              title="Book Tickets"
              onPress={handleBookTicket}
              style={styles.bookButton}
            />
          )}
        </Card>

        {/* How to Reach */}
        <Card style={styles.card}>
          <View style={styles.infoRow}>
            <Ionicons name="train-outline" size={20} color="#64748b" />
            <View style={styles.infoContent}>
              <Text style={styles.infoLabel}>Nearest metro</Text>
              <Text style={styles.infoValue}>{place.nearestMetro}</Text>
            </View>
          </View>

          <View style={styles.infoRow}>
            <Ionicons name="walk-outline" size={20} color="#64748b" />
            <View style={styles.infoContent}>
              <Text style={styles.infoLabel}>Walking distance</Text>
              <Text style={styles.infoValue}>{place.walkingDistance}</Text>
            </View>
          </View>

          <Text style={styles.transportTips}>{place.transportTips}</Text>
          <TouchableOpacity
            style={styles.transportButton}
            onPress={() => navigation.navigate("TransportInfo", { placeId })}
          >
            <Text style={styles.transportButtonText}>
              View detailed transport info
            </Text>
            <Ionicons name="chevron-forward" size={16} color="#2563eb" />
          </TouchableOpacity>
        </Card>

        {/* Comfort & Utilities */}
        <Card style={styles.card}>
          <View style={styles.utilitiesGrid}>
            <View style={styles.utilityItem}>
              <Ionicons name="water-outline" size={20} color="#64748b" />
              <Text style={styles.utilityLabel}>Toilets</Text>
              <Text style={styles.utilityValue}>
                {place.toilets === "none"
                  ? "Not available"
                  : place.toilets === "public"
                  ? "Public"
                  : "Paid"}
              </Text>
            </View>

            <View style={styles.utilityItem}>
              <Ionicons name="cafe-outline" size={20} color="#64748b" />
              <Text style={styles.utilityLabel}>Seating</Text>
              <Text style={styles.utilityValue}>
                {place.seating ? "Available" : "Limited"}
              </Text>
            </View>

            <View style={styles.utilityItem}>
              <Ionicons name="umbrella-outline" size={20} color="#64748b" />
              <Text style={styles.utilityLabel}>Shade</Text>
              <Text style={styles.utilityValue}>
                {place.shade ? "Available" : "Limited"}
              </Text>
            </View>
          </View>
          <Text style={styles.accessibilityNotes}>
            {place.accessibilityNotes}
          </Text>
        </Card>

        {/* AI Storytelling */}
        <Card style={styles.card}>
          <Text style={styles.storyDescription}>
            Unlock immersive cultural stories about this place
          </Text>

          <View style={styles.storyModes}>
            {STORY_MODES.map((mode) => {
              const unlocked =
                (mode.id === "quick" && quickStoryUnlocked) ||
                (mode.id !== "quick" && canUnlockStory);
              return (
                <TouchableOpacity
                  key={mode.id}
                  style={[
                    styles.storyModeButton,
                    !unlocked && styles.storyModeButtonLocked,
                  ]}
                  onPress={() => handleStoryPress(mode.id)}
                  disabled={!unlocked}
                >
                  {!unlocked && (
                    <Ionicons name="lock-closed" size={16} color="#94a3b8" />
                  )}
                  <View style={styles.storyModeContent}>
                    <Text
                      style={[
                        styles.storyModeTitle,
                        !unlocked && styles.storyModeTitleLocked,
                      ]}
                    >
                      {mode.title}
                    </Text>
                    <Text style={styles.storyModeDuration}>
                      {mode.duration}
                    </Text>
                  </View>
                  {!unlocked && (
                    <Text style={styles.unlockText}>
                      {mode.pointsRequired} points
                    </Text>
                  )}
                </TouchableOpacity>
              );
            })}
          </View>
        </Card>

        {/* Smart Nudge */}
        {place.crowdLevel === "high" && nearbyPlaces.length > 0 && (
          <Card style={styles.card}>
            <View style={styles.nudgeContainer}>
              <Ionicons name="bulb-outline" size={20} color="#f59e0b" />
              <View style={styles.nudgeContent}>
                <Text style={styles.nudgeText}>
                  This place is crowded. You may like {nearbyPlaces[0].name}{" "}
                  nearby.
                </Text>
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate("PlaceDetails", {
                      placeId: nearbyPlaces[0].id,
                    })
                  }
                >
                  <Text style={styles.nudgeLink}>View details</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Card>
        )}
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
  placeName: {
    fontSize: 28,
    fontWeight: "700",
    color: "#1e293b",
    marginBottom: 8,
  },
  culturalHook: {
    fontSize: 16,
    color: "#64748b",
    lineHeight: 24,
    marginBottom: 16,
  },
  crowdBadge: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "flex-start",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 16,
  },
  crowdDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 8,
  },
  crowdText: {
    fontSize: 12,
    fontWeight: "600",
  },
  card: {
    margin: 16,
    marginTop: 16,
  },
  infoRow: {
    flexDirection: "row",
    marginBottom: 16,
  },
  infoContent: {
    flex: 1,
    marginLeft: 12,
  },
  infoLabel: {
    fontSize: 13,
    color: "#64748b",
    marginBottom: 4,
  },
  infoValue: {
    fontSize: 15,
    color: "#1e293b",
    fontWeight: "600",
  },
  bookButton: {
    marginTop: 8,
  },
  transportTips: {
    fontSize: 14,
    color: "#64748b",
    marginTop: 8,
    lineHeight: 20,
  },
  transportButton: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 12,
    paddingVertical: 8,
  },
  transportButtonText: {
    flex: 1,
    fontSize: 14,
    color: "#2563eb",
    fontWeight: "600",
  },
  utilitiesGrid: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 16,
  },
  utilityItem: {
    alignItems: "center",
  },
  utilityLabel: {
    fontSize: 12,
    color: "#64748b",
    marginTop: 8,
    marginBottom: 4,
  },
  utilityValue: {
    fontSize: 12,
    color: "#1e293b",
    fontWeight: "600",
  },
  accessibilityNotes: {
    fontSize: 14,
    color: "#64748b",
    lineHeight: 20,
    marginTop: 8,
  },
  storyDescription: {
    fontSize: 14,
    color: "#64748b",
    marginBottom: 16,
    lineHeight: 20,
  },
  storyModes: {
    gap: 12,
  },
  storyModeButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f1f5f9",
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#e2e8f0",
  },
  storyModeButtonLocked: {
    opacity: 0.6,
  },
  storyModeContent: {
    flex: 1,
    marginLeft: 12,
  },
  storyModeTitle: {
    fontSize: 15,
    fontWeight: "600",
    color: "#1e293b",
    marginBottom: 4,
  },
  storyModeTitleLocked: {
    color: "#94a3b8",
  },
  storyModeDuration: {
    fontSize: 12,
    color: "#64748b",
  },
  unlockText: {
    fontSize: 12,
    color: "#64748b",
    fontWeight: "600",
  },
  nudgeContainer: {
    flexDirection: "row",
    alignItems: "flex-start",
  },
  nudgeContent: {
    flex: 1,
    marginLeft: 12,
  },
  nudgeText: {
    fontSize: 14,
    color: "#1e293b",
    lineHeight: 20,
    marginBottom: 8,
  },
  nudgeLink: {
    fontSize: 14,
    color: "#2563eb",
    fontWeight: "600",
  },
});

export default PlaceDetailsScreen;
