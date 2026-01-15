// screens/PlaceDetailsScreen.js
import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ImageBackground,
  TouchableOpacity,
  Linking,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRoute, useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { usePoints } from "../context/PointsContext";
import { Card } from "../components/Card";
import { getPlaceById } from "../constants/places";

const PlaceDetailsScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { placeId } = route.params;
  const { points } = usePoints();

  const place = getPlaceById(placeId);

  if (!place)
    return (
      <View style={styles.container}>
        <Text>Place not found</Text>
      </View>
    );

  const crowdColor =
    place.crowdLevel === "low"
      ? "#10b981"
      : place.crowdLevel === "medium"
      ? "#f59e0b"
      : "#ef4444";

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* HERO HEADER */}
        <ImageBackground source={{ uri: place.image }} style={styles.heroImage}>
          <SafeAreaView style={styles.heroOverlay}>
            <TouchableOpacity
              style={styles.backBtn}
              onPress={() => navigation.goBack()}
            >
              <Ionicons name="arrow-back" size={24} color="#FFF" />
            </TouchableOpacity>

            <View style={styles.heroBottom}>
              <View
                style={[styles.crowdStatus, { backgroundColor: crowdColor }]}
              >
                <Text style={styles.crowdStatusText}>
                  {place.crowdLevel.toUpperCase()} CROWD
                </Text>
              </View>
              <Text style={styles.placeName}>{place.name}</Text>
              <Text style={styles.placeHook}>{place.culturalHook}</Text>
            </View>
          </SafeAreaView>
        </ImageBackground>

        {/* INFO TILES */}
        <View style={styles.content}>
          <View style={styles.infoGrid}>
            <View style={styles.infoTile}>
              <Ionicons name="time-outline" size={20} color="#FF8C00" />
              <Text style={styles.tileLabel}>Best Time</Text>
              <Text style={styles.tileValue}>
                {place.bestTimeToVisit.split("(")[0]}
              </Text>
            </View>
            <View style={styles.infoTile}>
              <Ionicons name="cash-outline" size={20} color="#FF8C00" />
              <Text style={styles.tileLabel}>Entry Fee</Text>
              <Text style={styles.tileValue}>
                {place.entryFee.split("(")[0]}
              </Text>
            </View>
            <View style={styles.infoTile}>
              <Ionicons name="train-outline" size={20} color="#FF8C00" />
              <Text style={styles.tileLabel}>Metro</Text>
              <Text style={styles.tileValue}>
                {place.nearestMetro.split("(")[0]}
              </Text>
            </View>
          </View>

          {/* AI STORYTELLING UNLOCK - PREMIUM UI */}
          <Text style={styles.sectionTitle}>AI Storytelling</Text>
          <Card
            style={styles.storyCard}
            onPress={() => navigation.navigate("Storytelling", { placeId })}
          >
            <View style={styles.storyRow}>
              <View style={styles.storyIcon}>
                <Ionicons name="mic-outline" size={24} color="#FFF" />
              </View>
              <View style={styles.storyInfo}>
                <Text style={styles.storyTitle}>Unlock Cultural Secrets</Text>
                <Text style={styles.storySub}>
                  Immersive audio stories & historical facts.
                </Text>
              </View>
              <View style={styles.pointsReq}>
                <Text style={styles.pointsReqText}>20 pts</Text>
              </View>
            </View>
          </Card>

          {/* TRANSPORT & CONNECTIVITY SECTION */}
          <Text style={styles.sectionTitle}>Transport & Connectivity</Text>
          <Card style={styles.transportCard}>
            <View style={styles.transportHeader}>
              <View style={styles.metroBadge}>
                <Ionicons name="train" size={16} color="#FFF" />
                <Text style={styles.metroBadgeText}>Metro Accessible</Text>
              </View>
              <Text style={styles.nearestStn}>{place.nearestMetro}</Text>
            </View>

            <Text style={styles.transportBrief}>
              Located approximately {place.walkingDistance} from the station.
              E-rickshaws and Autos are readily available at the exit.
            </Text>

            <TouchableOpacity
              style={styles.viewDetailedBtn}
              onPress={() =>
                navigation.navigate("TransportInfo", { placeId: place.id })
              }
            >
              <Text style={styles.viewDetailedBtnText}>
                View Detailed Transport Info
              </Text>
              <Ionicons name="chevron-forward" size={18} color="#FF8C00" />
            </TouchableOpacity>
          </Card>

          {/* TRAVEL & COMFORT */}
          <Text style={styles.sectionTitle}>Traveler's Guide</Text>
          <Card style={styles.guideCard}>
            <View style={styles.guideItem}>
              <Ionicons name="walk" size={18} color="#84593C" />
              <Text style={styles.guideText}>
                {place.walkingDistance} from {place.nearestMetro}
              </Text>
            </View>
            <View style={styles.guideItem}>
              <Ionicons name="bus" size={18} color="#84593C" />
              <Text style={styles.guideText}>{place.transportTips}</Text>
            </View>
            <View style={styles.divider} />
            <View style={styles.utilityRow}>
              <Utility icon="water" label="Toilets" status={place.toilets} />
              <Utility
                icon="cafe"
                label="Seating"
                status={place.seating ? "Yes" : "No"}
              />
              <Utility
                icon="umbrella"
                label="Shade"
                status={place.shade ? "Yes" : "No"}
              />
            </View>
          </Card>

          <View style={{ height: 100 }} />
        </View>
      </ScrollView>

      {/* FLOATING ACTION BAR */}
      <View style={styles.actionBar}>
        <TouchableOpacity
          style={styles.navBtn}
          onPress={() =>
            Linking.openURL(
              `https://www.google.com/maps/search/?api=1&query=${place.name}`
            )
          }
        >
          <Ionicons name="navigate" size={20} color="#FF8C00" />
          <Text style={styles.navBtnText}>Navigate</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.bookBtn}
          onPress={() => Linking.openURL("https://asi.paygov.org.in")}
        >
          <Text style={styles.bookBtnText}>Book Tickets</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const Utility = ({ icon, label, status }) => (
  <View style={styles.util}>
    <Ionicons name={`${icon}-outline`} size={18} color="#84593C" />
    <Text style={styles.utilLabel}>{label}</Text>
    <Text style={styles.utilStatus}>{status}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#FEFBF6" },
  heroImage: { width: "100%", height: 350 },
  heroOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.3)",
    justifyContent: "space-between",
  },
  backBtn: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "rgba(255,255,255,0.2)",
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 20,
    marginTop: 10,
  },
  heroBottom: { padding: 25 },
  crowdStatus: {
    alignSelf: "flex-start",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    marginBottom: 10,
  },
  crowdStatusText: { color: "#FFF", fontSize: 10, fontWeight: "800" },
  placeName: {
    fontSize: 32,
    fontWeight: "800",
    color: "#FFF",
    letterSpacing: -0.5,
  },
  placeHook: { fontSize: 16, color: "#EEE", fontWeight: "500", marginTop: 4 },

  content: {
    padding: 20,
    marginTop: -30,
    backgroundColor: "#FEFBF6",
    borderTopLeftRadius: 35,
    borderTopRightRadius: 35,
  },
  infoGrid: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 25,
  },
  infoTile: {
    width: "31%",
    backgroundColor: "#FFF",
    borderRadius: 20,
    padding: 15,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#F0E4D3",
  },
  tileLabel: {
    fontSize: 11,
    color: "#84593C",
    fontWeight: "700",
    marginTop: 8,
    textTransform: "uppercase",
  },
  tileValue: {
    fontSize: 13,
    color: "#2D241E",
    fontWeight: "700",
    marginTop: 2,
    textAlign: "center",
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#2D241E",
    marginBottom: 15,
    marginTop: 10,
  },
  storyCard: {
    backgroundColor: "#FFF9F1",
    borderColor: "#FDE68A",
    padding: 15,
  },
  storyRow: { flexDirection: "row", alignItems: "center" },
  storyIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#FF8C00",
    alignItems: "center",
    justifyContent: "center",
  },
  storyInfo: { flex: 1, marginLeft: 15 },
  storyTitle: { fontSize: 16, fontWeight: "800", color: "#2D241E" },
  storySub: { fontSize: 12, color: "#84593C", marginTop: 2 },
  pointsReq: {
    backgroundColor: "#FEF3C7",
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 10,
  },
  pointsReqText: { color: "#92400E", fontWeight: "800", fontSize: 11 },
  transportCard: {
    padding: 20,
    backgroundColor: "#FFF",
    borderColor: "#F0E4D3",
    borderWidth: 1,
  },
  transportHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
    gap: 10,
  },
  metroBadge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#2563eb",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    gap: 4,
  },
  metroBadgeText: {
    color: "#FFF",
    fontSize: 10,
    fontWeight: "800",
  },
  nearestStn: {
    fontSize: 14,
    fontWeight: "700",
    color: "#2D241E",
  },
  transportBrief: {
    fontSize: 13,
    color: "#84593C",
    lineHeight: 20,
    marginBottom: 15,
  },
  viewDetailedBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#FFF2E0",
    padding: 15,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#FDE68A",
  },
  viewDetailedBtnText: {
    fontSize: 14,
    fontWeight: "700",
    color: "#FF8C00",
  },
  guideCard: { padding: 20 },
  guideItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    marginBottom: 12,
  },
  guideText: { fontSize: 14, color: "#2D241E", fontWeight: "500", flex: 1 },
  divider: { height: 1, backgroundColor: "#F0E4D3", marginVertical: 15 },
  utilityRow: { flexDirection: "row", justifyContent: "space-between" },
  util: { alignItems: "center" },
  utilLabel: { fontSize: 10, color: "#84593C", marginTop: 4 },
  utilStatus: {
    fontSize: 11,
    color: "#2D241E",
    fontWeight: "700",
    marginTop: 2,
  },

  actionBar: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "#FFF",
    padding: 20,
    flexDirection: "row",
    borderTopWidth: 1,
    borderTopColor: "#F0E4D3",
    gap: 15,
  },
  navBtn: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FFF2E0",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#FF8C00",
    gap: 8,
  },
  navBtnText: { color: "#FF8C00", fontWeight: "800", fontSize: 16 },
  bookBtn: {
    flex: 1.5,
    backgroundColor: "#FF8C00",
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    height: 56,
  },
  bookBtnText: { color: "#FFF", fontWeight: "800", fontSize: 16 },
});

export default PlaceDetailsScreen;
