// screens/PersonalizedPlanScreen.js
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
import { useRoute, useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { Card } from "../components/Card";
import { getPlaceById } from "../constants/places";

const PersonalizedPlanScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();

  const { places: placeIds } = route.params || { places: ["1", "2", "4"] };
  const places = placeIds
    .map((id) => getPlaceById(id))
    .filter((p) => p !== undefined);

  const timelineSteps = ["Morning", "Afternoon", "Evening"];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {places.map((place, index) => (
          <View key={place.id} style={styles.timelineWrapper}>
            {/* Timeline Line and Marker */}
            <View style={styles.timelineSidebar}>
              <View
                style={[
                  styles.dot,
                  { backgroundColor: index === 0 ? "#FF8C00" : "#84593C" },
                ]}
              />
              {index < places.length - 1 && <View style={styles.line} />}
            </View>

            {/* Stop Content */}
            <View style={styles.stopContent}>
              <Text style={styles.timeLabel}>
                {timelineSteps[index] || "Later"}
              </Text>

              <Card
                style={styles.planCard}
                onPress={() =>
                  navigation.navigate("PlaceDetails", { placeId: place.id })
                }
              >
                <Image source={{ uri: place.image }} style={styles.placeImg} />
                <View style={styles.cardInfo}>
                  <Text style={styles.placeName}>{place.name}</Text>
                  <Text style={styles.placeContext}>
                    Why: {place.crowdLevel} crowds at this hour.
                  </Text>

                  <View style={styles.cardActions}>
                    <TouchableOpacity style={styles.actionBtn}>
                      <Ionicons
                        name="navigate-outline"
                        size={16}
                        color="#FF8C00"
                      />
                      <Text style={styles.actionText}>Navigate</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={[styles.actionBtn, { backgroundColor: "#F0E4D3" }]}
                      onPress={() =>
                        navigation.navigate("PlaceDetails", {
                          placeId: place.id,
                        })
                      }
                    >
                      <Text style={[styles.actionText, { color: "#84593C" }]}>
                        Details
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </Card>

              {/* Travel Info Indicator */}
              {index < places.length - 1 && (
                <View style={styles.travelIndicator}>
                  <Ionicons name="bus-outline" size={14} color="#84593C" />
                  <Text style={styles.travelText}>
                    15 mins via Metro / Auto
                  </Text>
                </View>
              )}
            </View>
          </View>
        ))}

        <View style={styles.footer}>
          <TouchableOpacity
            style={styles.mainStartBtn}
            onPress={() => navigation.navigate("Explore")}
          >
            <Text style={styles.mainStartBtnText}>Start Journey</Text>
            <Ionicons name="chevron-forward" size={20} color="#FFF" />
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#FEFBF6" },
  shareBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#FFF2E0",
    justifyContent: "center",
    alignItems: "center",
  },

  scrollContent: { padding: 20 },

  timelineWrapper: { flexDirection: "row" },
  timelineSidebar: { width: 30, alignItems: "center" },
  dot: { width: 14, height: 14, borderRadius: 7, marginTop: 5, zIndex: 1 },
  line: { width: 2, flex: 1, backgroundColor: "#F0E4D3", marginVertical: 4 },

  stopContent: { flex: 1, paddingLeft: 10, paddingBottom: 30 },
  timeLabel: {
    fontSize: 14,
    fontWeight: "800",
    color: "#FF8C00",
    marginBottom: 10,
    textTransform: "uppercase",
  },

  planCard: { padding: 0, overflow: "hidden", borderRadius: 20 },
  placeImg: { width: "100%", height: 140 },
  cardInfo: { padding: 15 },
  placeName: { fontSize: 18, fontWeight: "800", color: "#2D241E" },
  placeContext: {
    fontSize: 13,
    color: "#84593C",
    marginTop: 4,
    fontStyle: "italic",
  },

  cardActions: { flexDirection: "row", gap: 10, marginTop: 15 },
  actionBtn: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFF2E0",
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 10,
    gap: 6,
  },
  actionText: { fontSize: 13, fontWeight: "700", color: "#FF8C00" },

  travelIndicator: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 15,
    backgroundColor: "#FFF",
    alignSelf: "flex-start",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#F0E4D3",
    gap: 8,
  },
  travelText: { fontSize: 12, color: "#84593C", fontWeight: "600" },

  footer: { marginTop: 10, marginBottom: 30 },
  mainStartBtn: {
    backgroundColor: "#FF8C00",
    height: 56,
    borderRadius: 18,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    elevation: 4,
  },
  mainStartBtnText: { color: "#FFF", fontSize: 18, fontWeight: "800" },
});

export default PersonalizedPlanScreen;
