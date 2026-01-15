// screens/FoodRecommendationScreen.js
import React, { useState } from "react";
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
import { Card } from "../components/Card";
import { Chip } from "../components/Chip";

const FOOD_PLACES = [
  {
    id: "1",
    name: "Paranthe Wali Gali",
    image:
      "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/15/41/7f/3d/mvimg-20181104-192114.jpg?w=800&h=500&s=1",
    description: "A Delhi street food legend since the 1870s.",
    distance: "0.5 km",
    budget: "₹",
    mood: "Street Food",
    whyNow: "Perfect for a warm morning breakfast",
  },
  {
    id: "2",
    name: "Karim's Restaurant",
    image:
      "https://images.unsplash.com/photo-1541014741259-de529411b96a?q=80&w=800",
    description: "Iconic Mughlai cuisine near Jama Masjid.",
    distance: "1.2 km",
    budget: "₹₹",
    mood: "Culture",
    whyNow: "Authentic lunch experience",
  },
  {
    id: "3",
    name: "Indian Accent",
    image:
      "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=800",
    description: "Modern Indian fine dining, award-winning.",
    distance: "2.5 km",
    budget: "₹₹₹",
    mood: "Chill",
    whyNow: "Perfect for a special evening",
  },
];

const FoodRecommendationScreen = () => {
  const [selectedMood, setSelectedMood] = useState("All");

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Taste of Delhi</Text>
          <Text style={styles.headerSubtitle}>
            Curated flavors based on your mood & budget
          </Text>
        </View>

        {/* Filters Section */}
        <View style={styles.filterSection}>
          <Text style={styles.sectionLabel}>What's the vibe?</Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.filterScroll}
          >
            {["All", "Street Food", "Chill", "Culture", "Fine Dining"].map(
              (mood) => (
                <Chip
                  key={mood}
                  label={mood}
                  selected={selectedMood === mood}
                  onPress={() => setSelectedMood(mood)}
                />
              )
            )}
          </ScrollView>
        </View>

        {/* Recommendation Cards */}
        <View style={styles.listSection}>
          {FOOD_PLACES.map((place) => (
            <Card key={place.id} style={styles.foodCard}>
              <View style={styles.cardContent}>
                <Image source={{ uri: place.image }} style={styles.foodImage} />
                <View style={styles.infoWrapper}>
                  <View style={styles.nameRow}>
                    <Text style={styles.foodName}>{place.name}</Text>
                    <View style={styles.budgetBadge}>
                      <Text style={styles.budgetText}>{place.budget}</Text>
                    </View>
                  </View>
                  <Text style={styles.foodDesc} numberOfLines={2}>
                    {place.description}
                  </Text>

                  <View style={styles.metaRow}>
                    <View style={styles.distBadge}>
                      <Ionicons name="location" size={12} color="#FFF" />
                      <Text style={styles.distText}>{place.distance}</Text>
                    </View>
                    <View style={styles.moodBadge}>
                      <Text style={styles.moodText}>{place.mood}</Text>
                    </View>
                  </View>
                </View>
              </View>
              <View style={styles.whyNowContainer}>
                <Ionicons name="sparkles" size={14} color="#FF8C00" />
                <Text style={styles.whyNowText}>{place.whyNow}</Text>
              </View>
            </Card>
          ))}
        </View>

        <View style={{ height: 40 }} />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#FEFBF6" },
  header: {
    padding: 20,
    backgroundColor: "#FFF",
    borderBottomWidth: 1,
    borderBottomColor: "#F0E4D3",
  },
  headerTitle: { fontSize: 24, fontWeight: "800", color: "#2D241E" },
  headerSubtitle: { fontSize: 13, color: "#84593C", marginTop: 4 },

  filterSection: { marginTop: 20 },
  sectionLabel: {
    fontSize: 16,
    fontWeight: "700",
    color: "#2D241E",
    paddingHorizontal: 20,
    marginBottom: 12,
  },
  filterScroll: { paddingHorizontal: 15 },

  listSection: { padding: 20 },
  foodCard: { padding: 12, marginBottom: 16 },
  cardContent: { flexDirection: "row" },
  foodImage: { width: 100, height: 100, borderRadius: 16 },
  infoWrapper: { flex: 1, marginLeft: 15, justifyContent: "space-between" },
  nameRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  foodName: {
    fontSize: 17,
    fontWeight: "800",
    color: "#2D241E",
    flex: 1,
    marginRight: 8,
  },
  budgetBadge: {
    backgroundColor: "#FFF2E0",
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: "#FF8C00",
  },
  budgetText: { color: "#FF8C00", fontSize: 12, fontWeight: "800" },
  foodDesc: {
    fontSize: 13,
    color: "#84593C",
    lineHeight: 18,
    marginVertical: 4,
  },

  metaRow: { flexDirection: "row", gap: 8, marginTop: 8 },
  distBadge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FF8C00",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    gap: 4,
  },
  distText: { color: "#FFF", fontSize: 11, fontWeight: "700" },
  moodBadge: {
    backgroundColor: "#F0E4D3",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  moodText: { color: "#84593C", fontSize: 11, fontWeight: "700" },

  whyNowContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: "#F0E4D3",
    gap: 8,
  },
  whyNowText: {
    fontSize: 12,
    color: "#2D241E",
    fontWeight: "600",
    fontStyle: "italic",
  },
});

export default FoodRecommendationScreen;
