// screens/ExploreScreen.js
import React from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { PLACES } from "../constants/places";

const CATEGORIES = [
  { id: "1", name: "Heritage", icon: "business" },
  { id: "2", name: "History", icon: "time" },
  { id: "3", name: "Market", icon: "cart" },
  { id: "4", name: "Culture", icon: "color-palette" },
  { id: "5", name: "Food", icon: "restaurant" },
];

const ExploreScreen = () => {
  const navigation = useNavigation();
  const mapImageUrl =
    "https://static-maps.yandex.ru/1.x/?ll=77.2295,28.6129&z=14&l=map&size=600,300";

  const renderCategory = ({ item }) => (
    <TouchableOpacity style={styles.catItem}>
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
        <View style={styles.placeHeader}>
          <Text style={styles.placeName}>{item.name}</Text>
          <View style={styles.distBadge}>
            <Text style={styles.distText}>{item.distance}</Text>
          </View>
        </View>
        <Text style={styles.placeHook} numberOfLines={1}>
          {item.culturalHook}
        </Text>
        <View style={styles.crowdRow}>
          <View
            style={[
              styles.dot,
              {
                backgroundColor:
                  item.crowdLevel === "low" ? "#10b981" : "#f59e0b",
              },
            ]}
          />
          <Text style={styles.crowdText}>{item.crowdLevel} Crowded</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Explore Delhi</Text>
        <TouchableOpacity style={styles.searchBtn}>
          <Ionicons name="search" size={20} color="#84593C" />
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* FIXED MAP SECTION */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Delhi at a Glance</Text>
          <TouchableOpacity
            style={styles.mapContainer}
            activeOpacity={0.9}
            onPress={() => navigation.navigate("SafetyUtility")}
          >
            <Image
              source={{ uri: mapImageUrl }}
              style={styles.mapPlaceholder}
              resizeMode="cover"
            />
            <View style={styles.mapPin}>
              <Ionicons name="location" size={36} color="#FF8C00" />
              <View style={styles.pinShadow} />
            </View>

            <View style={styles.mapOverlayBtn}>
              <Ionicons name="expand" size={18} color="#2D241E" />
              <Text style={styles.mapBtnText}>Expand Map</Text>
            </View>
          </TouchableOpacity>
        </View>

        {/* CATEGORY SECTION */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Explore by Category</Text>
          <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            data={CATEGORIES}
            renderItem={renderCategory}
            keyExtractor={(item) => item.id}
            contentContainerStyle={styles.catList}
          />
        </View>

        {/* LIST SECTION */}
        <View style={styles.section}>
          <View style={styles.listHeader}>
            <Text style={styles.sectionTitle}>Trending Now</Text>
            <TouchableOpacity>
              <Text style={styles.seeAll}>See All</Text>
            </TouchableOpacity>
          </View>

          {PLACES.map((item) => (
            <View key={item.id}>{renderPlaceItem({ item })}</View>
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
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#FFF",
    borderBottomWidth: 1,
    borderBottomColor: "#F0E4D3",
  },
  headerTitle: { fontSize: 22, fontWeight: "800", color: "#2D241E" },
  searchBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#F8F1E7",
    alignItems: "center",
    justifyContent: "center",
  },
  section: { marginTop: 20 },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#2D241E",
    paddingHorizontal: 20,
    marginBottom: 12,
  },

  mapContainer: {
    marginHorizontal: 20,
    height: 200,
    borderRadius: 24,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "#F0E4D3",
    backgroundColor: "#F8F1E7",
    justifyContent: "center",
    alignItems: "center",
    elevation: 3,
    shadowColor: "#84593C",
    shadowOpacity: 0.1,
    shadowRadius: 10,
  },
  mapPlaceholder: { width: "100%", height: "100%" },
  mapPin: {
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
    transform: [{ translateY: -18 }],
  },
  pinShadow: {
    width: 10,
    height: 4,
    backgroundColor: "rgba(0,0,0,0.2)",
    borderRadius: 5,
    marginTop: -2,
  },
  mapOverlayBtn: {
    position: "absolute",
    bottom: 12,
    right: 12,
    backgroundColor: "#FFF",
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 12,
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    elevation: 4,
    shadowColor: "#000",
    shadowOpacity: 0.1,
  },
  mapBtnText: { fontSize: 12, fontWeight: "800", color: "#2D241E" },

  catList: { paddingHorizontal: 15 },
  catItem: { alignItems: "center", marginRight: 20 },
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
  listHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingRight: 20,
  },
  seeAll: { color: "#FF8C00", fontWeight: "700", fontSize: 14 },
  placeCard: {
    flexDirection: "row",
    marginHorizontal: 20,
    marginBottom: 15,
    backgroundColor: "#FFF9F1",
    borderRadius: 20,
    padding: 10,
    borderWidth: 1,
    borderColor: "#F0E4D3",
  },
  placeImage: { width: 90, height: 90, borderRadius: 15 },
  placeInfo: { flex: 1, marginLeft: 15, justifyContent: "center" },
  placeHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  placeName: { fontSize: 16, fontWeight: "700", color: "#2D241E" },
  distBadge: {
    backgroundColor: "#FF8C00",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  distText: { color: "#FFF", fontSize: 10, fontWeight: "800" },
  placeHook: { fontSize: 13, color: "#84593C", marginVertical: 4 },
  crowdRow: { flexDirection: "row", alignItems: "center" },
  dot: { width: 6, height: 6, borderRadius: 3, marginRight: 6 },
  crowdText: { fontSize: 11, color: "#84593C", fontWeight: "600" },
});

export default ExploreScreen;
