// screens/ContributionScreen.js
import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Alert,
<<<<<<< HEAD
=======
  KeyboardAvoidingView,
  Platform,
  FlatList,
>>>>>>> advika/advika
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { Card } from "../components/Card";
<<<<<<< HEAD
import { Button } from "../components/Button";
import { usePoints } from "../context/PointsContext";
import { PLACES } from "../constants/places";

const CONTRIBUTION_TYPES = [
  { id: "tip", label: "Local Tip", icon: "bulb-outline", color: "#FF8C00" },
  {
    id: "transport",
    label: "Transport",
    icon: "bus-outline",
    color: "#0284c7",
  },
  { id: "review", label: "Review", icon: "star-outline", color: "#10b981" },
  { id: "insight", label: "Culture", icon: "book-outline", color: "#84593C" },
];

const ContributionScreen = () => {
  const { addPoints } = usePoints();
=======
import { usePoints } from "../context/PointsContext";
import { PLACES } from "../constants/places";

// Mock Data 
const COMMUNITY_CONTRIBUTIONS = [
  {
    id: "c1",
    user: "Rahul K.",
    place: "Red Fort",
    type: "tip",
    text: "Best time to visit is strictly 9 AM. The queue gets crazy by 11.",
    likes: 24,
    time: "2h ago",
  },
  {
    id: "c2",
    user: "Sanya M.",
    place: "Hauz Khas",
    type: "food",
    text: "Try the Naan at the canteen inside, it's surprisingly good and cheap!",
    likes: 12,
    time: "5h ago",
  },
  {
    id: "c3",
    user: "Amit V.",
    place: "Qutub Minar",
    type: "transport",
    text: "Don't take the auto from the main road, walk 200m inside for cheaper e-rickshaws.",
    likes: 45,
    time: "1d ago",
  },
];

const CONTRIBUTION_TYPES = [
  { id: "tip", label: "Tip", icon: "bulb-outline", color: "#FF8C00" },
  { id: "transport", label: "Transit", icon: "bus-outline", color: "#0284c7" },
  { id: "review", label: "Review", icon: "star-outline", color: "#10b981" },
  { id: "food", label: "Food", icon: "restaurant-outline", color: "#e11d48" },
];

export default function ContributionScreen() {
  const { addContribution, userContributions } = usePoints();
  const [activeTab, setActiveTab] = useState("share"); 

>>>>>>> advika/advika
  const [type, setType] = useState("tip");
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [content, setContent] = useState("");

<<<<<<< HEAD
  const handleSubmit = () => {
    if (!content.trim()) {
      Alert.alert("Wait!", "Please share some details before submitting.");
      return;
    }
    addPoints(10, "Local Contribution");
    Alert.alert(
      "Shukriya! 🎉",
      "Your insight earned you 10 points and helps fellow travelers."
    );
    setContent("");
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Share Local Wisdom</Text>
          <Text style={styles.headerSubtitle}>
            Help others discover Delhi's soul and earn rewards.
          </Text>
        </View>

        {/* Reward Banner */}
        <View style={styles.rewardBanner}>
          <Ionicons name="gift" size={24} color="#92400e" />
          <Text style={styles.rewardText}>
            Earn +10 Points per contribution
          </Text>
        </View>

        {/* Contribution Type Grid */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>What are you sharing?</Text>
          <View style={styles.typeGrid}>
            {CONTRIBUTION_TYPES.map((item) => (
              <TouchableOpacity
                key={item.id}
                style={[
                  styles.typeBtn,
                  type === item.id && styles.typeBtnActive,
                ]}
                onPress={() => setType(item.id)}
              >
                <View
                  style={[
                    styles.iconCircle,
                    {
                      backgroundColor:
                        type === item.id ? item.color : "#F8F1E7",
                    },
                  ]}
                >
                  <Ionicons
                    name={item.icon}
                    size={22}
                    color={type === item.id ? "#FFF" : "#84593C"}
                  />
                </View>
                <Text
                  style={[
                    styles.typeLabel,
                    type === item.id && styles.typeLabelActive,
                  ]}
                >
                  {item.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Place Selection */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Select Monument/Area</Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.placeScroll}
          >
            {PLACES.map((place) => (
              <TouchableOpacity
                key={place.id}
                style={[
                  styles.placeChip,
                  selectedPlace === place.id && styles.placeChipActive,
                ]}
                onPress={() => setSelectedPlace(place.id)}
              >
                <Text
                  style={[
                    styles.placeChipText,
                    selectedPlace === place.id && styles.placeChipTextActive,
                  ]}
                >
                  {place.name}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Input Area */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Your Insights</Text>
          <Card style={styles.inputCard}>
            <TextInput
              style={styles.textInput}
              placeholder="e.g., 'The e-rickshaws at gate 2 are cheaper...' or 'Great photo spot behind the minar!'"
              placeholderTextColor="#A1A1A1"
              multiline
              value={content}
              onChangeText={setContent}
            />
            <View style={styles.inputFooter}>
              <Text style={styles.charCount}>{content.length}/500</Text>
            </View>
          </Card>
        </View>

        <View style={styles.footer}>
          <Button title="Post Contribution" onPress={handleSubmit} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
=======
  const handleSubmit = async () => {
    if (!content.trim()) {
      Alert.alert("Empty Contribution", "Please write something to share!");
      return;
    }
    if (!selectedPlace) {
      Alert.alert("Select Place", "Please select which place this is about.");
      return;
    }

    const placeName = PLACES.find(p => p.id === selectedPlace)?.name || "Delhi";

    const newContribution = {
      id: Date.now().toString(),
      text: content,
      type,
      placeName,
      date: new Date().toLocaleDateString(),
      likes: 0,
    };

    const success = await addContribution(newContribution);
    
    if (success) {
      Alert.alert("Posted!", "You earned +10 Points for your contribution.");
      setContent("");
      setSelectedPlace(null);
      setActiveTab("mine"); 
    }
  };

  const renderTabBtn = (id, label) => (
    <TouchableOpacity
      style={[styles.tabBtn, activeTab === id && styles.tabBtnActive]}
      onPress={() => setActiveTab(id)}
    >
      <Text style={[styles.tabText, activeTab === id && styles.tabTextActive]}>
        {label}
      </Text>
    </TouchableOpacity>
  );

  const renderCommunityItem = ({ item }) => (
    <Card style={styles.feedCard}>
      <View style={styles.feedHeader}>
        <View style={styles.userInfo}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>{item.user[0]}</Text>
          </View>
          <View>
            <Text style={styles.userName}>{item.user}</Text>
            <Text style={styles.timeText}>{item.time} • {item.place}</Text>
          </View>
        </View>
        <Ionicons name="ellipsis-horizontal" size={20} color="#84593C" />
      </View>
      <Text style={styles.feedText}>{item.text}</Text>
      <View style={styles.feedFooter}>
        <View style={styles.tagBadge}>
          <Text style={styles.tagText}>{item.type.toUpperCase()}</Text>
        </View>
        <View style={styles.likesContainer}>
          <Ionicons name="heart-outline" size={16} color="#84593C" />
          <Text style={styles.likesText}>{item.likes}</Text>
        </View>
      </View>
    </Card>
  );

  const renderMyItem = ({ item }) => (
    <Card style={styles.feedCard}>
      <View style={styles.feedHeader}>
        <View style={styles.userInfo}>
          <View style={[styles.avatar, { backgroundColor: '#FF8C00' }]}>
            <Text style={styles.avatarText}>Me</Text>
          </View>
          <View>
            <Text style={styles.userName}>You</Text>
            <Text style={styles.timeText}>{item.date} • {item.placeName}</Text>
          </View>
        </View>
        <View style={styles.pointsBadge}>
          <Text style={styles.pointsBadgeText}>+10 pts</Text>
        </View>
      </View>
      <Text style={styles.feedText}>{item.text}</Text>
      <View style={styles.feedFooter}>
        <View style={[styles.tagBadge, { backgroundColor: '#FEF3C7' }]}>
          <Text style={[styles.tagText, { color: '#92400E' }]}>{item.type.toUpperCase()}</Text>
        </View>
      </View>
    </Card>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* HEADER */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Contributions</Text>
        <View style={styles.tabContainer}>
          {renderTabBtn("share", "Share Wisdom")}
          {renderTabBtn("community", "Local Wisdom")}
          {renderTabBtn("mine", "My Posts")}
        </View>
      </View>

      {/* CONTENT AREA */}
      <KeyboardAvoidingView 
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        {activeTab === "share" && (
          <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
            
            <View style={styles.rewardBanner}>
              <Ionicons name="gift" size={20} color="#92400e" />
              <Text style={styles.rewardText}>Earn 10 points per helpful tip!</Text>
            </View>

            <Text style={styles.sectionLabel}>What kind of tip?</Text>
            <View style={styles.typeRow}>
              {CONTRIBUTION_TYPES.map((t) => (
                <TouchableOpacity
                  key={t.id}
                  style={[styles.typeChip, type === t.id && { backgroundColor: t.color, borderColor: t.color }]}
                  onPress={() => setType(t.id)}
                >
                  <Ionicons name={t.icon} size={16} color={type === t.id ? "#FFF" : t.color} />
                  <Text style={[styles.typeChipText, type === t.id && { color: "#FFF" }]}>
                    {t.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            <Text style={styles.sectionLabel}>Which Place?</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.placeScroll}>
              {PLACES.map((p) => (
                <TouchableOpacity
                  key={p.id}
                  style={[styles.placeChip, selectedPlace === p.id && styles.placeChipActive]}
                  onPress={() => setSelectedPlace(p.id)}
                >
                  <Text style={[styles.placeChipText, selectedPlace === p.id && styles.placeChipTextActive]}>
                    {p.name}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>

            <Text style={styles.sectionLabel}>Your Insight</Text>
            <Card style={styles.inputCard}>
              <TextInput
                style={styles.textInput}
                placeholder="Share hidden gems, shortcuts, or food recommendations..."
                placeholderTextColor="#A1A1A1"
                multiline
                value={content}
                onChangeText={setContent}
              />
            </Card>

            <TouchableOpacity style={styles.submitBtn} onPress={handleSubmit}>
              <Text style={styles.submitBtnText}>Post Contribution</Text>
            </TouchableOpacity>
          
            <View style={{ height: 60 }} />
          </ScrollView>
        )}

        {activeTab === "community" && (
          <FlatList
            data={COMMUNITY_CONTRIBUTIONS}
            renderItem={renderCommunityItem}
            keyExtractor={item => item.id}
            contentContainerStyle={styles.listContent}
          />
        )}

        {activeTab === "mine" && (
          <FlatList
            data={userContributions}
            renderItem={renderMyItem}
            keyExtractor={item => item.id}
            contentContainerStyle={styles.listContent}
            ListEmptyComponent={
              <View style={styles.emptyState}>
                <Ionicons name="create-outline" size={48} color="#D1D5DB" />
                <Text style={styles.emptyText}>You haven't posted anything yet.</Text>
                <TouchableOpacity onPress={() => setActiveTab("share")}>
                  <Text style={styles.emptyLink}>Share your first tip!</Text>
                </TouchableOpacity>
              </View>
            }
          />
        )}
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
>>>>>>> advika/advika

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#FEFBF6" },
  header: {
<<<<<<< HEAD
    padding: 20,
    backgroundColor: "#FFF",
    borderBottomWidth: 1,
    borderBottomColor: "#F0E4D3",
  },
  headerTitle: { fontSize: 22, fontWeight: "800", color: "#2D241E" },
  headerSubtitle: { fontSize: 13, color: "#84593C", marginTop: 4 },

  rewardBanner: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FEF3C7",
    margin: 20,
    padding: 15,
    borderRadius: 16,
    gap: 12,
    borderWidth: 1,
    borderColor: "#FDE68A",
  },
  rewardText: { color: "#92400E", fontWeight: "700", fontSize: 14 },

  section: { marginTop: 10, paddingHorizontal: 20 },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#2D241E",
    marginBottom: 15,
  },

  typeGrid: { flexDirection: "row", justifyContent: "space-between" },
  typeBtn: { width: "23%", alignItems: "center" },
  iconCircle: {
    width: 50,
    height: 50,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 8,
  },
  typeLabel: { fontSize: 11, fontWeight: "700", color: "#84593C" },
  typeLabelActive: { color: "#2D241E" },

  placeScroll: { flexDirection: "row" },
=======
    backgroundColor: "#FFF",
    paddingTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#F0E4D3",
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "800",
    color: "#2D241E",
    textAlign: "center",
    marginBottom: 15,
  },
  tabContainer: {
    flexDirection: "row",
    paddingHorizontal: 20,
    paddingBottom: 0,
  },
  tabBtn: {
    marginRight: 25,
    paddingBottom: 12,
  },
  tabBtnActive: {
    borderBottomWidth: 3,
    borderBottomColor: "#FF8C00",
  },
  tabText: {
    fontSize: 15,
    fontWeight: "600",
    color: "#84593C",
  },
  tabTextActive: {
    color: "#FF8C00",
    fontWeight: "800",
  },
  
  scrollContent: { padding: 20 },
  rewardBanner: {
    flexDirection: "row",
    backgroundColor: "#FEF3C7",
    padding: 12,
    borderRadius: 12,
    alignItems: "center",
    marginBottom: 20,
    gap: 10,
  },
  rewardText: { color: "#92400E", fontWeight: "700", fontSize: 13 },
  sectionLabel: { fontSize: 14, fontWeight: "700", color: "#2D241E", marginBottom: 10, marginTop: 5 },
  
  typeRow: { flexDirection: "row", flexWrap: "wrap", gap: 10, marginBottom: 20 },
  typeChip: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    backgroundColor: "#FFF",
    gap: 6,
  },
  typeChipText: { fontSize: 12, fontWeight: "700", color: "#6B7280" },

  placeScroll: { flexDirection: "row", marginBottom: 20 },
>>>>>>> advika/advika
  placeChip: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 12,
    backgroundColor: "#FFF",
    borderWidth: 1,
    borderColor: "#F0E4D3",
    marginRight: 10,
  },
  placeChipActive: { backgroundColor: "#FF8C00", borderColor: "#FF8C00" },
  placeChipText: { fontSize: 13, fontWeight: "600", color: "#84593C" },
  placeChipTextActive: { color: "#FFF" },

<<<<<<< HEAD
  inputCard: { padding: 15, marginTop: 5 },
  textInput: {
    minHeight: 120,
    textAlignVertical: "top",
    fontSize: 15,
    color: "#2D241E",
    lineHeight: 22,
  },
  inputFooter: {
    borderTopWidth: 1,
    borderTopColor: "#F0E4D3",
    marginTop: 10,
    paddingTop: 10,
    alignItems: "flex-end",
  },
  charCount: { fontSize: 12, color: "#84593C", fontWeight: "600" },

  footer: { padding: 20, marginBottom: 20 },
});

export default ContributionScreen;
=======
  inputCard: { padding: 15, minHeight: 150 },
  textInput: { fontSize: 16, color: "#2D241E", height: 120, textAlignVertical: "top" },

  submitBtn: {
    backgroundColor: "#FF8C00",
    paddingVertical: 16,
    borderRadius: 16,
    alignItems: "center",
    marginTop: 24,
    shadowColor: "#FF8C00",
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 4 },
  },
  submitBtnText: { color: "#FFF", fontWeight: "800", fontSize: 16 },

  // Feed Styles
  listContent: { padding: 20 },
  feedCard: { padding: 16, marginBottom: 16 },
  feedHeader: { flexDirection: "row", justifyContent: "space-between", marginBottom: 10 },
  userInfo: { flexDirection: "row", alignItems: "center", gap: 10 },
  avatar: { width: 36, height: 36, borderRadius: 18, backgroundColor: "#E0E7FF", alignItems: "center", justifyContent: "center" },
  avatarText: { fontSize: 14, fontWeight: "700", color: "#4338CA" },
  userName: { fontSize: 14, fontWeight: "700", color: "#2D241E" },
  timeText: { fontSize: 11, color: "#6B7280" },
  feedText: { fontSize: 14, color: "#4B5563", lineHeight: 20, marginBottom: 12 },
  feedFooter: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  tagBadge: { backgroundColor: "#F3F4F6", paddingHorizontal: 8, paddingVertical: 4, borderRadius: 6 },
  tagText: { fontSize: 10, fontWeight: "700", color: "#4B5563" },
  likesContainer: { flexDirection: "row", alignItems: "center", gap: 4 },
  likesText: { fontSize: 12, fontWeight: "600", color: "#4B5563" },

  pointsBadge: { backgroundColor: "#DCFCE7", paddingHorizontal: 8, paddingVertical: 4, borderRadius: 12 },
  pointsBadgeText: { fontSize: 11, fontWeight: "700", color: "#166534" },

  emptyState: { alignItems: "center", marginTop: 50 },
  emptyText: { color: "#9CA3AF", fontSize: 16, marginVertical: 10 },
  emptyLink: { color: "#FF8C00", fontWeight: "700", fontSize: 16 },
});
>>>>>>> advika/advika
