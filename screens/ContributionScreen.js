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
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { Card } from "../components/Card";
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
  const [type, setType] = useState("tip");
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [content, setContent] = useState("");

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

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#FEFBF6" },
  header: {
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
