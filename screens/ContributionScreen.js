// ContributionScreen.js
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

const ContributionScreen = () => {
  const { addPoints } = usePoints();
  const [contributionType, setContributionType] = useState(null);
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [content, setContent] = useState("");

  const handleSubmit = () => {
    if (!contributionType || !content.trim()) {
      Alert.alert("Error", "Please fill in all fields");
      return;
    }

    const pointsAwarded = 10;
    addPoints(pointsAwarded, "Added contribution");

    Alert.alert(
      "Thank you! 🎉",
      `You earned ${pointsAwarded} points! You unlocked a premium story.`,
      [
        {
          text: "OK",
          onPress: () => {
            setContributionType(null);
            setSelectedPlace(null);
            setContent("");
          },
        },
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.header}>
          <Text style={styles.title}>Contribute Local Knowledge</Text>
          <Text style={styles.subtitle}>
            Share your insights and help others discover Delhi better
          </Text>
        </View>

        <Card style={styles.card}>
          <Text style={styles.sectionTitle}>
            What would you like to contribute?
          </Text>
          <View style={styles.typeContainer}>
            <TouchableOpacity
              style={[
                styles.typeButton,
                contributionType === "tip" && styles.typeButtonActive,
              ]}
              onPress={() => setContributionType("tip")}
            >
              <Ionicons
                name="bulb-outline"
                size={24}
                color={contributionType === "tip" ? "#2563eb" : "#64748b"}
              />
              <Text
                style={[
                  styles.typeText,
                  contributionType === "tip" && styles.typeTextActive,
                ]}
              >
                Local Tip
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.typeButton,
                contributionType === "transport" && styles.typeButtonActive,
              ]}
              onPress={() => setContributionType("transport")}
            >
              <Ionicons
                name="bus-outline"
                size={24}
                color={contributionType === "transport" ? "#2563eb" : "#64748b"}
              />
              <Text
                style={[
                  styles.typeText,
                  contributionType === "transport" && styles.typeTextActive,
                ]}
              >
                Transport Info
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.typeButton,
                contributionType === "review" && styles.typeButtonActive,
              ]}
              onPress={() => setContributionType("review")}
            >
              <Ionicons
                name="star-outline"
                size={24}
                color={contributionType === "review" ? "#2563eb" : "#64748b"}
              />
              <Text
                style={[
                  styles.typeText,
                  contributionType === "review" && styles.typeTextActive,
                ]}
              >
                Review Place
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.typeButton,
                contributionType === "insight" && styles.typeButtonActive,
              ]}
              onPress={() => setContributionType("insight")}
            >
              <Ionicons
                name="book-outline"
                size={24}
                color={contributionType === "insight" ? "#2563eb" : "#64748b"}
              />
              <Text
                style={[
                  styles.typeText,
                  contributionType === "insight" && styles.typeTextActive,
                ]}
              >
                Cultural Insight
              </Text>
            </TouchableOpacity>
          </View>
        </Card>

        {(contributionType === "review" || contributionType === "insight") && (
          <Card style={styles.card}>
            <Text style={styles.sectionTitle}>Select a place</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
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
          </Card>
        )}

        {contributionType && (
          <Card style={styles.card}>
            <Text style={styles.sectionTitle}>
              {contributionType === "tip" && "Share your local tip"}
              {contributionType === "transport" &&
                "Share transport information"}
              {contributionType === "review" && "Write your review"}
              {contributionType === "insight" && "Share your cultural insight"}
            </Text>
            <TextInput
              style={styles.textInput}
              placeholder="Type your contribution here..."
              value={content}
              onChangeText={setContent}
              multiline
              maxLength={500}
            />
            <Text style={styles.charCount}>{content.length} / 500</Text>
          </Card>
        )}

        {contributionType && (
          <Card style={styles.card}>
            <View style={styles.rewardInfo}>
              <Ionicons name="gift-outline" size={24} color="#2563eb" />
              <View style={styles.rewardContent}>
                <Text style={styles.rewardTitle}>Earn 10 Points</Text>
                <Text style={styles.rewardDescription}>
                  Your contribution helps others discover Delhi better
                </Text>
              </View>
            </View>
          </Card>
        )}

        <View style={styles.footer}>
          <Button
            title="Submit Contribution"
            onPress={handleSubmit}
            disabled={!contributionType || !content.trim()}
          />
        </View>
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
  title: {
    fontSize: 24,
    fontWeight: "700",
    color: "#1e293b",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: "#64748b",
    lineHeight: 20,
  },
  card: {
    margin: 16,
    marginTop: 16,
  },
  typeContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
  },
  typeButton: {
    width: "47%",
    backgroundColor: "#f1f5f9",
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
    borderWidth: 2,
    borderColor: "transparent",
  },
  typeButtonActive: {
    backgroundColor: "#dbeafe",
    borderColor: "#2563eb",
  },
  typeText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#64748b",
    marginTop: 8,
  },
  typeTextActive: {
    color: "#2563eb",
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1e293b",
    marginBottom: 16,
  },
  placeChip: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    backgroundColor: "#f1f5f9",
    marginRight: 8,
    borderWidth: 2,
    borderColor: "transparent",
  },
  placeChipActive: {
    backgroundColor: "#dbeafe",
    borderColor: "#2563eb",
  },
  placeChipText: {
    fontSize: 14,
    color: "#64748b",
    fontWeight: "500",
  },
  placeChipTextActive: {
    color: "#2563eb",
    fontWeight: "600",
  },
  textInput: {
    backgroundColor: "#f8fafc",
    borderRadius: 8,
    padding: 12,
    fontSize: 15,
    color: "#1e293b",
    minHeight: 120,
    textAlignVertical: "top",
    borderWidth: 1,
    borderColor: "#e2e8f0",
  },
  charCount: {
    fontSize: 12,
    color: "#94a3b8",
    textAlign: "right",
    marginTop: 8,
  },
  rewardInfo: {
    flexDirection: "row",
    alignItems: "flex-start",
  },
  rewardContent: {
    flex: 1,
    marginLeft: 12,
  },
  rewardTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1e293b",
    marginBottom: 4,
  },
  rewardDescription: {
    fontSize: 14,
    color: "#64748b",
    lineHeight: 20,
  },
  footer: {
    padding: 16,
    paddingBottom: 32,
  },
});

export default ContributionScreen;
