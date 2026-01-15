// HomeScreen.js
import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { Card } from "../components/Card";
import { Button } from "../components/Button";
import { usePoints } from "../context/PointsContext";
import SOSButton from "../components/SOSButton";
import { Image } from "react-native";

const FEATURES = [
  {
    icon: "sparkles",
    title: "Smart Planning",
    description: "AI-powered itinerary based on your time and interests",
  },
  {
    icon: "people",
    title: "Crowd-Aware Suggestions",
    description: "Avoid crowds and discover quieter alternatives",
  },
  {
    icon: "book",
    title: "Cultural Storytelling",
    description: "Unlock immersive stories about Delhi's monuments",
  },
  {
    icon: "bulb",
    title: "Local Insights",
    description: "Get tips from locals and contribute your own",
  },
];

const HomeScreen = () => {
  const navigation = useNavigation();
  const { points } = usePoints();

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.header}>
          <Image source={require("../assets/icon.png")} style={styles.logo} />

          <Text style={styles.appName}>DilliDarshan</Text>
          <Text style={styles.tagline}>
            Explore Delhi like a local - intelligently, culturally, comfortably
          </Text>
          <View style={styles.pointsContainer}>
            <Ionicons name="star" size={16} color="#92400e" />
            <Text style={styles.pointsText}>{points} points</Text>
          </View>
        </View>

        <View style={styles.buttonContainer}>
          <Button
            title="Start Exploring"
            onPress={() => navigation.navigate("Explore")}
            style={styles.button}
          />
          <Button
            title="Ask AI Assistant"
            onPress={() => navigation.navigate("Chat")}
            variant="secondary"
            style={styles.button}
          />
        </View>

        <View style={styles.featuresSection}>
          <Text style={styles.sectionTitle}>Features</Text>
          {FEATURES.map((feature, index) => (
            <Card key={index} style={styles.featureCard}>
              <View style={styles.featureIcon}>
                <Ionicons name={feature.icon} size={24} color="#2563eb" />
              </View>
              <Text style={styles.featureTitle}>{feature.title}</Text>
              <Text style={styles.featureDescription}>
                {feature.description}
              </Text>
            </Card>
          ))}
        </View>
      </ScrollView>
      <SOSButton />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  scrollView: {
    flex: 1,
  },
  header: {
    padding: 20,
    paddingTop: 40,
    alignItems: "center",
  },
  logo: {
    width: 80,
    height: 80,
    marginBottom: 12,
    resizeMode: "contain",
  },

  appName: {
    fontSize: 36,
    fontWeight: "700",
    color: "#1e293b",
    marginBottom: 10,
  },
  tagline: {
    fontSize: 16,
    color: "#64748b",
    textAlign: "center",
    lineHeight: 24,
    marginBottom: 20,
  },
  pointsContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fef3c7",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  pointsText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#92400e",
    marginLeft: 8,
  },
  buttonContainer: {
    padding: 20,
    gap: 12,
  },
  button: {
    width: "100%",
  },
  featuresSection: {
    padding: 20,
    paddingTop: 0,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: "700",
    color: "#1e293b",
    marginBottom: 16,
  },
  featureCard: {
    position: "relative",
    paddingLeft: 60,
  },
  featureIcon: {
    position: "absolute",
    left: 16,
    top: 16,
  },
  featureTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1e293b",
    marginBottom: 4,
    marginLeft: 44,
  },
  featureDescription: {
    fontSize: 14,
    color: "#64748b",
    lineHeight: 20,
    marginLeft: 44,
  },
});

export default HomeScreen;
