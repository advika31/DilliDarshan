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
  Linking,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { PLACES } from "../constants/places";
import { FOOD_ITEMS, FOOD_CATEGORIES, getFoodItemsByCategory } from "./Food";
import { MARKET_ITEMS, MARKET_CATEGORIES, getMarketItemsByCategory } from "./Market";
import { FESTIVAL_ITEMS, FESTIVAL_CATEGORIES, getFestivalItemsByCategory } from "./Culture";

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
  const [selectedMarketSubCategory, setSelectedMarketSubCategory] = useState(null);
  const [selectedMarketItem, setSelectedMarketItem] = useState(null);
  const [showMarketDetailsModal, setShowMarketDetailsModal] = useState(false);
  const [selectedFestivalSubCategory, setSelectedFestivalSubCategory] = useState(null);
  const [selectedFestivalItem, setSelectedFestivalItem] = useState(null);
  const [showFestivalDetailsModal, setShowFestivalDetailsModal] = useState(false);

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

  const renderMarketCategory = ({ item }) => (
    <TouchableOpacity
      style={[
        styles.catItem,
        selectedMarketSubCategory === item.id && styles.catItemActive,
      ]}
      onPress={() =>
        setSelectedMarketSubCategory(prev => (prev === item.id ? null : item.id))
      }
    >
      <View style={[styles.catIconWrapper, { backgroundColor: item.color + '20' }]}>
        <Text style={styles.categoryEmoji}>{item.icon}</Text>
      </View>
      <Text style={styles.catText}>{item.name}</Text>
    </TouchableOpacity>
  );

  const renderMarketItem = ({ item }) => (
    <TouchableOpacity
      style={styles.placeCard}
      onPress={() => {
        setSelectedMarketItem(item);
        setShowMarketDetailsModal(true);
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

  const renderFestivalCategory = ({ item }) => (
    <TouchableOpacity
      style={[
        styles.catItem,
        selectedFestivalSubCategory === item.id && styles.catItemActive,
      ]}
      onPress={() =>
        setSelectedFestivalSubCategory(prev => (prev === item.id ? null : item.id))
      }
    >
      <View style={[styles.catIconWrapper, { backgroundColor: item.color + '20' }]}>
        <Text style={styles.categoryEmoji}>{item.icon}</Text>
      </View>
      <Text style={styles.catText}>{item.name}</Text>
    </TouchableOpacity>
  );

  const renderFestivalItem = ({ item }) => (
    <TouchableOpacity
      style={styles.placeCard}
      onPress={() => {
        setSelectedFestivalItem(item);
        setShowFestivalDetailsModal(true);
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

  const places = selectedCategory
    ? PLACES.filter(p => p.category === selectedCategory)
    : PLACES;

  const foodItems = selectedCategory === "Food" && selectedFoodSubCategory
    ? getFoodItemsByCategory(selectedFoodSubCategory)
    : [];

  const marketItems = selectedCategory === "Market" && selectedMarketSubCategory
    ? getMarketItemsByCategory(selectedMarketSubCategory)
    : [];

  const festivalItems = selectedCategory === "Culture" && selectedFestivalSubCategory
    ? getFestivalItemsByCategory(selectedFestivalSubCategory)
    : [];

  const handleNavigate = async (coordinates) => {
    try {
      const [latitude, longitude] = coordinates.split(", ").map(Number);
      const url = `https://www.google.com/maps/dir/?api=1&destination=${latitude},${longitude}`;
      await Linking.openURL(url);
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
            {(selectedCategory === "Food" || selectedCategory === "Market" || selectedCategory === "Culture" || selectedCategory === "Heritage") && (
              <TouchableOpacity
                onPress={() => {
                  if (selectedCategory === "Food" && selectedFoodSubCategory) {
                    setSelectedFoodSubCategory(null);
                  } else if (selectedCategory === "Market" && selectedMarketSubCategory) {
                    setSelectedMarketSubCategory(null);
                  } else if (selectedCategory === "Culture" && selectedFestivalSubCategory) {
                    setSelectedFestivalSubCategory(null);
                  } else {
                    setSelectedCategory(null);
                  }
                }}
                style={styles.backButton}
              >
                <Ionicons name="arrow-back" size={24} color="#FF8C00" />
                <Text style={[styles.backText, { color: "#FF8C00" }]}>Back</Text>
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

        {/* Places, Food, Market or Culture */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            {selectedCategory === "Food"
              ? selectedFoodSubCategory
                ? FOOD_CATEGORIES.find(c => c.id === selectedFoodSubCategory)?.name || "Food Items"
                : "Food Categories"
              : selectedCategory === "Market"
              ? selectedMarketSubCategory
                ? MARKET_CATEGORIES.find(c => c.id === selectedMarketSubCategory)?.name || "Marketplaces"
                : "Market Categories"
              : selectedCategory === "Culture"
              ? selectedFestivalSubCategory
                ? FESTIVAL_CATEGORIES.find(c => c.id === selectedFestivalSubCategory)?.name || "Festivals"
                : "Festival Categories"
              : selectedCategory || "All Places"}
          </Text>

          {selectedCategory === "Food" ? (
            !selectedFoodSubCategory ? (
              // Show Food Categories in Grid (2 per row)
              <View style={styles.foodCategoryGrid}>
                {FOOD_CATEGORIES.map((item) => (
                  <TouchableOpacity
                    key={item.id}
                    style={[
                      styles.foodCategoryItem,
                      selectedFoodSubCategory === item.id && styles.catItemActive,
                    ]}
                    onPress={() => setSelectedFoodSubCategory(item.id)}
                  >
                    <View style={[styles.foodCategoryIconWrapper, { backgroundColor: item.color + '20' }]}>
                      <Text style={styles.foodCategoryEmoji}>{item.icon}</Text>
                    </View>
                    <Text style={styles.foodCategoryText}>{item.name}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            ) : (
              // Show Food Items in Selected Category - VERTICAL
              foodItems.map(item => (
                <View key={item.id}>{renderFoodItem({ item })}</View>
              ))
            )
          ) : selectedCategory === "Market" ? (
            !selectedMarketSubCategory ? (
              // Show Market Categories in Grid (2 per row)
              <View style={styles.foodCategoryGrid}>
                {MARKET_CATEGORIES.map((item) => (
                  <TouchableOpacity
                    key={item.id}
                    style={[
                      styles.foodCategoryItem,
                      selectedMarketSubCategory === item.id && styles.catItemActive,
                    ]}
                    onPress={() => setSelectedMarketSubCategory(item.id)}
                  >
                    <View style={[styles.foodCategoryIconWrapper, { backgroundColor: item.color + '20' }]}>
                      <Text style={styles.foodCategoryEmoji}>{item.icon}</Text>
                    </View>
                    <Text style={styles.foodCategoryText}>{item.name}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            ) : (
              // Show Market Items in Selected Category - VERTICAL
              marketItems.map(item => (
                <View key={item.id}>{renderMarketItem({ item })}</View>
              ))
            )
          ) : selectedCategory === "Culture" ? (
            !selectedFestivalSubCategory ? (
              // Show Festival Categories in Grid (2 per row)
              <View style={styles.foodCategoryGrid}>
                {FESTIVAL_CATEGORIES.map((item) => (
                  <TouchableOpacity
                    key={item.id}
                    style={[
                      styles.foodCategoryItem,
                      selectedFestivalSubCategory === item.id && styles.catItemActive,
                    ]}
                    onPress={() => setSelectedFestivalSubCategory(item.id)}
                  >
                    <View style={[styles.foodCategoryIconWrapper, { backgroundColor: item.color + '20' }]}>
                      <Text style={styles.foodCategoryEmoji}>{item.icon}</Text>
                    </View>
                    <Text style={styles.foodCategoryText}>{item.name}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            ) : (
              // Show Festival Items in Selected Category - VERTICAL
              festivalItems.map(item => (
                <View key={item.id}>{renderFestivalItem({ item })}</View>
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
        <SafeAreaView style={styles.container}>
          {/* Modal Header */}
          <View style={styles.modalHeader}>
            <TouchableOpacity
              onPress={() => {
                setShowFoodDetailsModal(false);
                setSelectedFoodItem(null);
              }}
              style={styles.modalBackButton}
            >
              <Ionicons name="arrow-back" size={24} color="#2563eb" />
              <Text style={styles.modalBackText}>Main</Text>
            </TouchableOpacity>
            <Text style={styles.modalTitle}>Food Details</Text>
            <View style={{ width: 60 }} />
          </View>
          <ScrollView showsVerticalScrollIndicator={false}>
            {selectedFoodItem && (
              <>
                {/* HERO IMAGE WITH BACK BUTTON */}
                <ImageBackground
                  source={{ uri: selectedFoodItem.image }}
                  style={styles.heroImage}
                >
                  <SafeAreaView style={[styles.heroOverlay, { alignItems: 'flex-end' }]}>
                    <TouchableOpacity
                      style={styles.backBtn}
                      onPress={() => {
                        setShowFoodDetailsModal(false);
                        setSelectedFoodItem(null);
                      }}
                    >
                      <Text style={styles.backBtnText}>Back</Text>
                      <Ionicons name="arrow-forward" size={20} color="#FF8C00" />
                    </TouchableOpacity>
                  </SafeAreaView>
                </ImageBackground>

                {/* FOOD ITEM NAME & DESCRIPTION */}
                <View style={[styles.heroBottom, { paddingHorizontal: 20, paddingVertical: 16, backgroundColor: "#FEFBF6" }]}>
                  <View style={[styles.crowdStatus, { backgroundColor: "#FF8C00" }]}>
                    <Text style={styles.crowdStatusText}>FOOD PLACE</Text>
                  </View>
                  <View style={styles.detailsNameBox}>
                    <Text style={styles.detailsPlaceName}>{selectedFoodItem.name}</Text>
                    <Text style={styles.detailsPlaceHook}>{selectedFoodItem.description}</Text>
                  </View>
                </View>

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
        </SafeAreaView>
      </Modal>

      {/* MARKET ITEM DETAILS MODAL */}
      <Modal
        visible={showMarketDetailsModal}
        transparent={false}
        animationType="slide"
        onRequestClose={() => {
          setShowMarketDetailsModal(false);
          setSelectedMarketItem(null);
        }}
      >
        <SafeAreaView style={styles.container}>
          {/* Modal Header */}
          <View style={styles.modalHeader}>
            <TouchableOpacity
              onPress={() => {
                setShowMarketDetailsModal(false);
                setSelectedMarketItem(null);
              }}
              style={styles.modalBackButton}
            >
              <Ionicons name="arrow-back" size={24} color="#2563eb" />
              <Text style={styles.modalBackText}>Main</Text>
            </TouchableOpacity>
            <Text style={styles.modalTitle}>Market Details</Text>
            <View style={{ width: 60 }} />
          </View>
          <ScrollView showsVerticalScrollIndicator={false}>
            {selectedMarketItem && (
              <>
                {/* HERO IMAGE WITH BACK BUTTON */}
                <ImageBackground
                  source={{ uri: selectedMarketItem.image }}
                  style={styles.heroImage}
                >
                  <SafeAreaView style={[styles.heroOverlay, { alignItems: 'flex-end' }]}>
                    <TouchableOpacity
                      style={styles.backBtn}
                      onPress={() => {
                        setShowMarketDetailsModal(false);
                        setSelectedMarketItem(null);
                      }}
                    >
                      <Text style={styles.backBtnText}>Back</Text>
                      <Ionicons name="arrow-forward" size={20} color="#FF8C00" />
                    </TouchableOpacity>
                  </SafeAreaView>
                </ImageBackground>

                {/* MARKET ITEM NAME & DESCRIPTION */}
                <View style={[styles.heroBottom, { paddingHorizontal: 20, paddingVertical: 16, backgroundColor: "#FEFBF6" }]}>
                  <View style={[styles.crowdStatus, { backgroundColor: "#FF8C00" }]}>
                    <Text style={styles.crowdStatusText}>MARKETPLACE</Text>
                  </View>
                  <View style={styles.detailsNameBox}>
                    <Text style={styles.detailsPlaceName}>{selectedMarketItem.name}</Text>
                    <Text style={styles.detailsPlaceHook}>{selectedMarketItem.description}</Text>
                  </View>
                </View>

                {/* INFO TILES */}
                <View style={styles.content}>
                  <View style={styles.infoGrid}>
                    <View style={styles.infoTile}>
                      <Ionicons name="time-outline" size={20} color="#FF8C00" />
                      <Text style={[styles.tileLabel, { color: "#FF8C00" }]}>Best Time</Text>
                      <Text style={styles.tileValue}>{selectedMarketItem.bestTime}</Text>
                    </View>
                    <View style={styles.infoTile}>
                      <Ionicons name="pricetag-outline" size={20} color="#FF8C00" />
                      <Text style={[styles.tileLabel, { color: "#FF8C00" }]}>Price Range</Text>
                      <Text style={styles.tileValue}>{selectedMarketItem.priceRange}</Text>
                    </View>
                    <View style={styles.infoTile}>
                      <Ionicons name="star" size={20} color="#FFB800" />
                      <Text style={styles.tileLabel}>Rating</Text>
                      <Text style={styles.tileValue}>{selectedMarketItem.ratings}</Text>
                    </View>
                  </View>

                  {/* NEAREST METRO */}
                  <View style={styles.section}>
                    <Text style={styles.sectionHeading}>Transport & Connectivity</Text>
                    <View style={styles.metroCard}>
                      <View style={[styles.metroTag, { backgroundColor: "#FF8C00" }]}>
                        <Ionicons name="train" size={16} color="#FFF" />
                        <Text style={styles.metroTagText}>Metro Accessible</Text>
                      </View>
                      <Text style={styles.metroName}>{selectedMarketItem.nearestMetro}</Text>
                      <Text style={styles.metroDistance}>{selectedMarketItem.metroDistance}</Text>
                    </View>
                  </View>

                  {/* TRANSPORT INFO */}
                  <View style={styles.transportInfo}>
                    <Text style={[styles.transportLabel, { color: "#FF8C00" }]}>How to Reach</Text>
                    <View style={styles.transportCardsRow}>
                      <View style={styles.transportCard}>
                        <Ionicons name="car" size={18} color="#FF8C00" />
                        <Text style={styles.transportCardTitle}>Auto-Rickshaw</Text>
                        <Text style={styles.transportCardText}>₹40-60</Text>
                      </View>
                      <View style={styles.transportCard}>
                        <Ionicons name="bus" size={18} color="#FF8C00" />
                        <Text style={styles.transportCardTitle}>Bus Routes</Text>
                        <Text style={styles.transportCardText}>Available</Text>
                      </View>
                    </View>
                  </View>

                  {/* MARKET INFO */}
                  <View style={styles.section}>
                    <Text style={styles.sectionHeading}>About This Market</Text>
                    <View style={styles.guideCard}>
                      <Text style={styles.guideText}>{selectedMarketItem.marketInfo}</Text>
                    </View>
                  </View>

                  {/* HIGHLIGHTS */}
                  <View style={styles.section}>
                    <Text style={styles.sectionHeading}>What to Find</Text>
                    <View style={styles.highlightsContainer}>
                      {selectedMarketItem.highlights.map((highlight, idx) => (
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
                        <Text style={styles.locationName}>{selectedMarketItem.location}</Text>
                      </View>
                    </View>
                  </View>

                  {/* ACTION BUTTONS */}
                  <View style={styles.actionButtons}>
                    <TouchableOpacity 
                      style={styles.navigateBtn}
                      onPress={() => handleNavigate(selectedMarketItem.navigateCoordinates)}
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
        </SafeAreaView>
      </Modal>

      {/* FESTIVAL ITEM DETAILS MODAL */}
      <Modal
        visible={showFestivalDetailsModal}
        transparent={false}
        animationType="slide"
        onRequestClose={() => {
          setShowFestivalDetailsModal(false);
          setSelectedFestivalItem(null);
        }}
      >
        <SafeAreaView style={styles.container}>
          {/* Modal Header */}
          <View style={styles.modalHeader}>
            <TouchableOpacity
              onPress={() => {
                setShowFestivalDetailsModal(false);
                setSelectedFestivalItem(null);
              }}
              style={styles.modalBackButton}
            >
              <Ionicons name="arrow-back" size={24} color="#2563eb" />
              <Text style={styles.modalBackText}>Main</Text>
            </TouchableOpacity>
            <Text style={styles.modalTitle}>Festival Details</Text>
            <View style={{ width: 60 }} />
          </View>
          <ScrollView showsVerticalScrollIndicator={false}>
            {selectedFestivalItem && (
              <>
                {/* HERO IMAGE WITH BACK BUTTON */}
                <ImageBackground
                  source={{ uri: selectedFestivalItem.image }}
                  style={styles.heroImage}
                >
                  <SafeAreaView style={[styles.heroOverlay, { alignItems: 'flex-end' }]}>
                    <TouchableOpacity
                      style={styles.backBtn}
                      onPress={() => {
                        setShowFestivalDetailsModal(false);
                        setSelectedFestivalItem(null);
                      }}
                    >
                      <Text style={styles.backBtnText}>Back</Text>
                      <Ionicons name="arrow-forward" size={20} color="#FF8C00" />
                    </TouchableOpacity>
                  </SafeAreaView>
                </ImageBackground>

                {/* FESTIVAL ITEM NAME & DESCRIPTION */}
                <View style={[styles.heroBottom, { paddingHorizontal: 20, paddingVertical: 16, backgroundColor: "#FEFBF6" }]}>
                  <View style={[styles.crowdStatus, { backgroundColor: "#FF8C00" }]}>
                    <Text style={styles.crowdStatusText}>FESTIVAL</Text>
                  </View>
                  <View style={styles.detailsNameBox}>
                    <Text style={styles.detailsPlaceName}>{selectedFestivalItem.name}</Text>
                    <Text style={styles.detailsPlaceHook}>{selectedFestivalItem.description}</Text>
                  </View>
                </View>

                {/* INFO TILES */}
                <View style={styles.content}>
                  <View style={styles.infoGrid}>
                    <View style={styles.infoTile}>
                      <Ionicons name="calendar-outline" size={20} color="#FF8C00" />
                      <Text style={[styles.tileLabel, { color: "#FF8C00" }]}>Date</Text>
                      <Text style={styles.tileValue}>{selectedFestivalItem.dateInfo}</Text>
                    </View>
                    <View style={styles.infoTile}>
                      <Ionicons name="star" size={20} color="#FFB800" />
                      <Text style={styles.tileLabel}>Rating</Text>
                      <Text style={styles.tileValue}>{selectedFestivalItem.ratings}</Text>
                    </View>
                    <View style={styles.infoTile}>
                      <Ionicons name="pricetag-outline" size={20} color="#FF8C00" />
                      <Text style={[styles.tileLabel, { color: "#FF8C00" }]}>Cost</Text>
                      <Text style={styles.tileValue}>{selectedFestivalItem.priceRange.split(', ')[0]}</Text>
                    </View>
                  </View>

                  {/* CELEBRATION LOCATION */}
                  <View style={styles.section}>
                    <Text style={styles.sectionHeading}>Celebration Locations</Text>
                    <View style={styles.metroCard}>
                      <Text style={styles.metroName}>{selectedFestivalItem.celebrationLocation}</Text>
                    </View>
                  </View>

                  {/* NEAREST METRO */}
                  <View style={styles.section}>
                    <Text style={styles.sectionHeading}>Transport & Connectivity</Text>
                    <View style={styles.metroCard}>
                      <View style={[styles.metroTag, { backgroundColor: "#FF8C00" }]}>
                        <Ionicons name="train" size={16} color="#FFF" />
                        <Text style={styles.metroTagText}>Metro Accessible</Text>
                      </View>
                      <Text style={styles.metroName}>{selectedFestivalItem.nearestMetro}</Text>
                      <Text style={styles.metroDistance}>{selectedFestivalItem.metroDistance}</Text>
                    </View>
                  </View>

                  {/* TRANSPORT INFO */}
                  <View style={styles.transportInfo}>
                    <Text style={[styles.transportLabel, { color: "#FF8C00" }]}>How to Reach</Text>
                    <View style={styles.transportCardsRow}>
                      <View style={styles.transportCard}>
                        <Ionicons name="car" size={18} color="#FF8C00" />
                        <Text style={styles.transportCardTitle}>Auto-Rickshaw</Text>
                        <Text style={styles.transportCardText}>₹40-60</Text>
                      </View>
                      <View style={styles.transportCard}>
                        <Ionicons name="bus" size={18} color="#FF8C00" />
                        <Text style={styles.transportCardTitle}>Bus Routes</Text>
                        <Text style={styles.transportCardText}>Available</Text>
                      </View>
                    </View>
                  </View>

                  {/* FESTIVITIES */}
                  <View style={styles.section}>
                    <Text style={styles.sectionHeading}>Festival Festivities</Text>
                    <View style={styles.guideCard}>
                      <Text style={styles.guideText}>{selectedFestivalItem.festivities}</Text>
                    </View>
                  </View>

                  {/* HIGHLIGHTS */}
                  <View style={styles.section}>
                    <Text style={styles.sectionHeading}>Festival Highlights</Text>
                    <View style={styles.highlightsContainer}>
                      {selectedFestivalItem.highlights.map((highlight, idx) => (
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
                        <Text style={styles.locationName}>{selectedFestivalItem.location}</Text>
                      </View>
                    </View>
                  </View>

                  {/* ACTION BUTTONS */}
                  <View style={styles.actionButtons}>
                    <TouchableOpacity 
                      style={styles.navigateBtn}
                      onPress={() => handleNavigate(selectedFestivalItem.navigateCoordinates)}
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
        </SafeAreaView>
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

  // Modal Header Styles
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 12,
    backgroundColor: "#FFFFFF",
    borderBottomWidth: 1,
    borderBottomColor: "#F0E4D3",
  },
  modalBackButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  modalBackText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#2563eb",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "800",
    color: "#2D241E",
  },

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
    width: 76,
    height: 76,
    borderRadius: 22,
    backgroundColor: "#FFF2E0",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 8,
    borderWidth: 1,
    borderColor: "#FDE68A",
  },
  catText: { fontSize: 12, fontWeight: "700", color: "#84593C" },
  categoryEmoji: { fontSize: 40 },

  // Food Category Grid Styles
  foodCategoryGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-around",
    paddingHorizontal: 10,
    gap: 15,
  },
  foodCategoryItem: {
    width: "45%",
    alignItems: "center",
    marginBottom: 20,
  },
  foodCategoryIconWrapper: {
    width: 120,
    height: 120,
    borderRadius: 30,
    backgroundColor: "#FFF2E0",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#FDE68A",
  },
  foodCategoryEmoji: { fontSize: 65 },
  foodCategoryText: { fontSize: 15, fontWeight: "700", color: "#84593C", textAlign: "center" },

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
  foodItemsList: {
    paddingHorizontal: 15,
    gap: 12,
  },
  placeImage: { width: 70, height: 70, borderRadius: 14 },
  placeInfo: { flex: 1, marginLeft: 12, justifyContent: "center" },
  placeName: { fontSize: 16, fontWeight: "700", color: "#2D241E" },
  placeHook: { fontSize: 12, color: "#84593C", marginTop: 4 },

  // Details Modal Name/Description Box
  detailsNameBox: {
    backgroundColor: "#FFF9F1",
    borderWidth: 1.5,
    borderColor: "#F0E4D3",
    borderRadius: 14,
    padding: 16,
    marginBottom: 8,
  },
  detailsPlaceName: { fontSize: 26, fontWeight: "800", color: "#2D241E", letterSpacing: -0.5, lineHeight: 34 },
  detailsPlaceHook: { fontSize: 14, color: "#84593C", marginTop: 8, fontWeight: "500", lineHeight: 20 },

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
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 24,
    marginTop: 30,
    marginRight: 20,
  },
  backBtnText: {
    fontSize: 14,
    fontWeight: "700",
    color: "#FF8C00",
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
    paddingTop: 8,
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