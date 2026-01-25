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
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { PLACES } from "../constants/places";

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

  const places = selectedCategory
    ? PLACES.filter(p => p.category === selectedCategory)
    : PLACES;

  /* ---------------- main render ------------------- */
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Explore Delhi</Text>
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

        {/* Places */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            {selectedCategory || "All Places"}
          </Text>
          {places.map(p => (
            <View key={p.id}>{renderPlaceItem({ item: p })}</View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

/* ------------------- styles ---------------------- */
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#FEFBF6" },
  header: { padding: 20 },
  headerTitle: { fontSize: 22, fontWeight: "800", color: "#2D241E" },

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
});

export default ExploreScreen;