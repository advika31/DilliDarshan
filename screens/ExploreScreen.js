// screens/ExploreScreen.js
import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
  ScrollView,
  Modal,
  ImageBackground,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import * as Location from "expo-location";
import { PLACES } from "../constants/places";
import { FOOD_ITEMS, FOOD_CATEGORIES, getFoodItemsByCategory } from "./Food";

const CATEGORIES = [
  { id: "1", name: "Heritage", icon: "business" },
  { id: "2", name: "History", icon: "time" },
  { id: "3", name: "Market",  icon: "cart" },
  { id: "4", name: "Culture", icon: "color-palette" },
  { id: "5", name: "Food",    icon: "restaurant" },
];

const ExploreScreen = () => {
  const navigation = useNavigation();
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedFoodSubCategory, setSelectedFoodSubCategory] = useState(null);
  const [selectedFoodItem, setSelectedFoodItem] = useState(null);
  const [showFoodDetailsModal, setShowFoodDetailsModal] = useState(false);

  /* ---------------- render helpers ---------------- */
  const renderCategory = ({ item }) => (
    <TouchableOpacity
      style={[
        styles.catItem,
        selectedCategory === item.name && styles.catItemActive,
      ]}
      onPress={() =>
        setSelectedCategory(prev => (prev === item.name ? null : item.name))
      }
    >
      <View style={styles.catIconWrapper}>
        <Ionicons name={item.icon} size={22} color="#FF8C00" />
      </View>
      <Text style={styles.catText}>{item.name}</Text>
    </TouchableOpacity>
  );

  const renderPlaceItem = ({ item }) => (
    <TouchableOpacity
      style={styles.placeCard}
      onPress={() => navigation.navigate("PlaceDetails", { placeId: item.id })}
      activeOpacity={0.9}
    >
      <Image source={{ uri: item.image }} style={styles.placeImage} />
      <View style={styles.placeInfo}>
        <Text style={styles.placeName}>{item.name}</Text>
        <Text style={styles.placeHook} numberOfLines={1}>
          {item.culturalHook || item.category}
        </Text>
      </View>
    </TouchableOpacity>
  );

  const renderFoodItem = ({ item }) => (
    <TouchableOpacity
      style={styles.placeCard}
      onPress={() => {
        setSelectedFoodItem(item);
        setShowFoodDetailsModal(true);
      }}
      activeOpacity={0.9}
    >
      <Image source={{ uri: item.image }} style={styles.placeImage} />
      <View style={styles.placeInfo}>
        <Text style={styles.placeName}>{item.name}</Text>
        <Text style={styles.placeHook} numberOfLines={1}>
          {item.description}
        </Text>
      </View>
    </TouchableOpacity>
  );

  const renderFoodCategory = ({ item }) => (
    <TouchableOpacity
      style={[
        styles.catItem,
        selectedFoodSubCategory === item.id && styles.catItemActive,
      ]}
      onPress={() =>
        setSelectedFoodSubCategory(prev => (prev === item.id ? null : item.id))
      }
    >
      <View style={[styles.catIconWrapper, { backgroundColor: item.color + '20' }]}>
        <Text style={styles.categoryEmoji}>{item.icon}</Text>
      </View>
      <Text style={styles.catText}>{item.name}</Text>
    </TouchableOpacity>
  );

  const places = selectedCategory
    ? PLACES.filter(p => p.category === selectedCategory)
    : PLACES;

  const foodItems = selectedCategory === "Food" && selectedFoodSubCategory
    ? getFoodItemsByCategory(selectedFoodSubCategory)
    : [];

  const handleNavigate = async (coordinates) => {
    try {
      const [latitude, longitude] = coordinates.split(", ").map(Number);
      const url = `https://www.google.com/maps/dir/?api=1&destination=${latitude},${longitude}`;
      await Location.openURL(url);
    } catch (error) {
      console.log("Navigation error:", error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerContent}>
            <Text style={styles.headerTitle}>Explore Delhi</Text>
            {selectedCategory === "Food" && selectedFoodSubCategory && (
              <TouchableOpacity
                onPress={() => setSelectedFoodSubCategory(null)}
                style={styles.backButton}
              >
                <Ionicons name="arrow-back" size={24} color="#FF8C00" />
                <Text style={styles.backText}>Back</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>

        {/* Categories */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Explore by Category</Text>
          <FlatList
            horizontal
            data={CATEGORIES}
            renderItem={renderCategory}
            keyExtractor={i => i.id}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.catList}
          />
        </View>

        {/* Places or Food */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            {selectedCategory === "Food"
              ? selectedFoodSubCategory
                ? FOOD_CATEGORIES.find(c => c.id === selectedFoodSubCategory)?.name || "Food Items"
                : "Food Categories"
              : selectedCategory || "All Places"}
          </Text>

          {selectedCategory === "Food" ? (
            !selectedFoodSubCategory ? (
              // Show Food Categories
              <FlatList
                horizontal
                data={FOOD_CATEGORIES}
                renderItem={renderFoodCategory}
                keyExtractor={i => i.id}
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.catList}
              />
            ) : (
              // Show Food Items in Selected Category
              foodItems.map(item => (
                <View key={item.id}>{renderFoodItem({ item })}</View>
              ))
            )
          ) : (
            // Show Places
            places.map(p => (
              <View key={p.id}>{renderPlaceItem({ item: p })}</View>
            ))
          )}
        </View>
      </ScrollView>

      {/* FOOD ITEM DETAILS MODAL */}
      <Modal
        visible={showFoodDetailsModal}
        transparent={false}
        animationType="slide"
        onRequestClose={() => {
          setShowFoodDetailsModal(false);
          setSelectedFoodItem(null);
        }}
      >
        <View style={styles.detailsModalContainer}>
          <ScrollView showsVerticalScrollIndicator={false}>
            {selectedFoodItem && (
              <>
                {/* HERO IMAGE WITH BACK BUTTON */}
                <ImageBackground
                  source={{ uri: selectedFoodItem.image }}
                  style={styles.heroImage}
                >
                  <SafeAreaView style={styles.heroOverlay}>
                    <TouchableOpacity
                      style={styles.backBtn}
                      onPress={() => {
                        setShowFoodDetailsModal(false);
                        setSelectedFoodItem(null);
                      }}
                    >
                      <Ionicons name="arrow-back" size={24} color="#FFF" />
                    </TouchableOpacity>

                    <View style={styles.heroBottom}>
                      <View style={[styles.crowdStatus, { backgroundColor: "#FF8C00" }]}>
                        <Text style={styles.crowdStatusText}>FOOD PLACE</Text>
                      </View>
                      <Text style={styles.placeName}>{selectedFoodItem.name}</Text>
                      <Text style={styles.placeHook}>{selectedFoodItem.description}</Text>
                    </View>
                  </SafeAreaView>
                </ImageBackground>

                {/* INFO TILES */}
                <View style={styles.content}>
                  <View style={styles.infoGrid}>
                    <View style={styles.infoTile}>
                      <Ionicons name="time-outline" size={20} color="#FF8C00" />
                      <Text style={styles.tileLabel}>Best Time</Text>
                      <Text style={styles.tileValue}>{selectedFoodItem.bestTime}</Text>
                    </View>
                    <View style={styles.infoTile}>
                      <Ionicons name="pricetag-outline" size={20} color="#FF8C00" />
                      <Text style={styles.tileLabel}>Price Range</Text>
                      <Text style={styles.tileValue}>{selectedFoodItem.priceRange}</Text>
                    </View>
                    <View style={styles.infoTile}>
                      <Ionicons name="star" size={20} color="#FFB800" />
                      <Text style={styles.tileLabel}>Rating</Text>
                      <Text style={styles.tileValue}>{selectedFoodItem.ratings}</Text>
                    </View>
                  </View>

                  {/* NEAREST METRO */}
                  <View style={styles.section}>
                    <Text style={styles.sectionHeading}>Transport & Connectivity</Text>
                    <View style={styles.metroCard}>
                      <View style={styles.metroTag}>
                        <Ionicons name="train" size={16} color="#FFF" />
                        <Text style={styles.metroTagText}>Metro Accessible</Text>
                      </View>
                      <Text style={styles.metroName}>{selectedFoodItem.nearestMetro}</Text>
                      <Text style={styles.metroDistance}>{selectedFoodItem.metroDistance}</Text>
                    </View>
                  </View>

                  {/* TRANSPORT INFO */}
                  <View style={styles.transportInfo}>
                    <Text style={styles.transportLabel}>How to Reach</Text>
                    <View style={styles.transportCardsRow}>
                      <View style={styles.transportCard}>
                        <Ionicons name="car" size={18} color="#FF8C00" />
                        <Text style={styles.transportCardTitle}>Auto-Rickshaw</Text>
                        <Text style={styles.transportCardText}>₹40-60</Text>
                      </View>
                      <View style={styles.transportCard}>
                        <Ionicons name="bus" size={18} color="#FF8C00" />
                        <Text style={styles.transportCardTitle}>Bus Routes</Text>
                        <Text style={styles.transportCardText}>52, 231, 232</Text>
                      </View>
                    </View>
                  </View>

                  {/* HERITAGE/TRAVELERS GUIDE */}
                  <View style={styles.section}>
                    <Text style={styles.sectionHeading}>Travelers Guide</Text>
                    <View style={styles.guideCard}>
                      <Text style={styles.guideText}>{selectedFoodItem.heritageInfo}</Text>
                    </View>
                  </View>

                  {/* HIGHLIGHTS */}
                  <View style={styles.section}>
                    <Text style={styles.sectionHeading}>Must Try</Text>
                    <View style={styles.highlightsContainer}>
                      {selectedFoodItem.highlights.map((highlight, idx) => (
                        <View key={idx} style={styles.highlightItemFood}>
                          <Ionicons name="checkmark-circle" size={16} color="#FF8C00" />
                          <Text style={styles.highlightTextFood}>{highlight}</Text>
                        </View>
                      ))}
                    </View>
                  </View>

                  {/* LOCATION */}
                  <View style={styles.section}>
                    <Text style={styles.sectionHeading}>Location</Text>
                    <View style={styles.locationCard}>
                      <Ionicons name="location" size={20} color="#10b981" />
                      <View style={styles.locationInfo}>
                        <Text style={styles.locationName}>{selectedFoodItem.location}</Text>
                      </View>
                    </View>
                  </View>

                  {/* ACTION BUTTONS */}
                  <View style={styles.actionButtons}>
                    <TouchableOpacity 
                      style={styles.navigateBtn}
                      onPress={() => handleNavigate(selectedFoodItem.navigateCoordinates)}
                    >
                      <Ionicons name="navigate" size={20} color="#FFF" />
                      <Text style={styles.navigateBtnText}>Navigate</Text>
                    </TouchableOpacity>
                  </View>

                  <View style={{ height: 30 }} />
                </View>
              </>
            )}
          </ScrollView>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

/* ------------------- styles ---------------------- */
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#FEFBF6" },
  header: { padding: 20 },
  headerContent: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  headerTitle: { fontSize: 22, fontWeight: "800", color: "#2D241E" },
  backButton: { flexDirection: "row", alignItems: "center", gap: 6 },
  backText: { fontSize: 14, fontWeight: "700", color: "#FF8C00" },

  section: { marginTop: 20 },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#2D241E",
    paddingHorizontal: 20,
    marginBottom: 12,
  },

  catList: { paddingHorizontal: 15 },
  catItem: { alignItems: "center", marginRight: 20 },
  catItemActive: { transform: [{ scale: 1.05 }], opacity: 0.9 },
  catIconWrapper: {
    width: 56,
    height: 56,
    borderRadius: 18,
    backgroundColor: "#FFF2E0",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 6,
    borderWidth: 1,
    borderColor: "#FDE68A",
  },
  catText: { fontSize: 12, fontWeight: "700", color: "#84593C" },
  categoryEmoji: { fontSize: 28 },

  placeCard: {
    flexDirection: "row",
    marginHorizontal: 20,
    marginBottom: 12,
    backgroundColor: "#FFF9F1",
    borderRadius: 18,
    padding: 10,
    borderWidth: 1,
    borderColor: "#F0E4D3",
  },
  placeImage: { width: 70, height: 70, borderRadius: 14 },
  placeInfo: { flex: 1, marginLeft: 12, justifyContent: "center" },
  placeName: { fontSize: 16, fontWeight: "700", color: "#2D241E" },
  placeHook: { fontSize: 12, color: "#84593C", marginTop: 4 },

  // FOOD DETAILS MODAL STYLES (Heritage-like UI)
  detailsModalContainer: {
    flex: 1,
    backgroundColor: "#FEFBF6",
  },
  heroImage: {
    width: "100%",
    height: 280,
    justifyContent: "space-between",
  },
  heroOverlay: {
    flex: 1,
    justifyContent: "space-between",
    paddingHorizontal: 20,
  },
  backBtn: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 8,
  },
  heroBottom: {
    paddingBottom: 24,
  },
  crowdStatus: {
    alignSelf: "flex-start",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    marginBottom: 12,
  },
  crowdStatusText: {
    fontSize: 12,
    fontWeight: "800",
    color: "#FFF",
  },
  content: {
    backgroundColor: "#FEFBF6",
    paddingTop: 20,
  },
  infoGrid: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginHorizontal: 20,
    marginBottom: 24,
  },
  infoTile: {
    alignItems: "center",
    backgroundColor: "#FFF9F1",
    paddingVertical: 12,
    paddingHorizontal: 14,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#F0E4D3",
    flex: 0.3,
  },
  tileLabel: {
    fontSize: 11,
    fontWeight: "700",
    color: "#FF8C00",
    marginTop: 6,
  },
  tileValue: {
    fontSize: 12,
    fontWeight: "800",
    color: "#2D241E",
    marginTop: 4,
    textAlign: "center",
  },
  section: {
    marginTop: 20,
    marginHorizontal: 20,
  },
  sectionHeading: {
    fontSize: 18,
    fontWeight: "800",
    color: "#2D241E",
    marginBottom: 12,
  },
  metroCard: {
    backgroundColor: "#FFF9F1",
    borderRadius: 12,
    padding: 14,
    borderWidth: 1,
    borderColor: "#F0E4D3",
  },
  metroTag: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#1976D2",
    alignSelf: "flex-start",
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 20,
    marginBottom: 8,
    gap: 6,
  },
  metroTagText: {
    fontSize: 12,
    fontWeight: "700",
    color: "#FFF",
  },
  metroName: {
    fontSize: 16,
    fontWeight: "800",
    color: "#2D241E",
    marginBottom: 4,
  },
  metroDistance: {
    fontSize: 13,
    color: "#84593C",
    lineHeight: 18,
  },
  transportInfo: {
    marginHorizontal: 20,
    marginTop: 12,
  },
  transportLabel: {
    fontSize: 14,
    fontWeight: "700",
    color: "#FF8C00",
    marginBottom: 12,
  },
  transportCardsRow: {
    flexDirection: "row",
    gap: 12,
  },
  transportCard: {
    flex: 1,
    backgroundColor: "#FFF9F1",
    borderRadius: 10,
    padding: 14,
    borderWidth: 1,
    borderColor: "#F0E4D3",
    alignItems: "center",
  },
  transportCardTitle: {
    fontSize: 12,
    fontWeight: "700",
    color: "#2D241E",
    marginTop: 8,
  },
  transportCardText: {
    fontSize: 11,
    color: "#84593C",
    marginTop: 4,
    textAlign: "center",
  },
  guideCard: {
    backgroundColor: "#FFF9F1",
    borderRadius: 12,
    padding: 14,
    borderWidth: 1,
    borderColor: "#F0E4D3",
  },
  guideText: {
    fontSize: 13,
    color: "#84593C",
    lineHeight: 20,
  },
  highlightsContainer: {
    backgroundColor: "#FFF9F1",
    borderRadius: 12,
    padding: 14,
    borderWidth: 1,
    borderColor: "#F0E4D3",
  },
  highlightItemFood: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 10,
    gap: 10,
  },
  highlightTextFood: {
    fontSize: 13,
    color: "#84593C",
    flex: 1,
  },
  locationCard: {
    flexDirection: "row",
    alignItems: "flex-start",
    backgroundColor: "#FFF9F1",
    borderRadius: 12,
    padding: 14,
    borderWidth: 1,
    borderColor: "#F0E4D3",
    gap: 12,
  },
  locationInfo: {
    flex: 1,
  },
  locationName: {
    fontSize: 14,
    fontWeight: "700",
    color: "#2D241E",
    marginBottom: 4,
  },
  actionButtons: {
    flexDirection: "row",
    gap: 12,
    marginHorizontal: 20,
    marginTop: 24,
    marginBottom: 20,
  },
  navigateBtn: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#10b981",
    paddingVertical: 14,
    borderRadius: 10,
    gap: 8,
  },
  navigateBtnText: {
    color: "#FFF",
    fontSize: 14,
    fontWeight: "700",
  },
});

export default ExploreScreen;