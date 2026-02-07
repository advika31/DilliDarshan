// screens/StorytellingScreen.js
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRoute, useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { Audio } from "expo-av";

import { Card } from "../components/Card";
import { getPlaceById } from "../constants/places";
import { usePoints } from "../context/PointsContext";
import { BASE_URL } from "../constants/api";

const API_BASE = BASE_URL;
const STORY_COST = 20;

export default function StorytellingScreen() {
  const route = useRoute();
  const navigation = useNavigation();

  const { placeId } = route.params || {};
  const place = getPlaceById(placeId);

  const { points, unlockStory, isStoryUnlocked } = usePoints();
  const [isUnlocked, setIsUnlocked] = useState(false);

  const [storyMode, setStoryMode] = useState("factual");
  const [language, setLanguage] = useState("English");

  const [storyContent, setStoryContent] = useState("");
  const [hasGenerated, setHasGenerated] = useState(false);
  const [loading, setLoading] = useState(false);

  const [sound, setSound] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [position, setPosition] = useState(0);
  const [duration, setDuration] = useState(1);
  const [audioAvailable, setAudioAvailable] = useState(true);

  const progressPercent = (position / duration) * 100;

  useEffect(() => {
    if (placeId) {
      setIsUnlocked(isStoryUnlocked(placeId));
    }
  }, [placeId, isStoryUnlocked]);

  useEffect(() => {
    setStoryContent("");
    setHasGenerated(false);
    setIsPlaying(false);

    if (sound) {
      sound.unloadAsync();
      setSound(null);
    }
  }, [placeId]);

  useEffect(() => {
    return () => {
      if (sound) sound.unloadAsync();
    };
  }, [sound]);

  if (!place) {
    return (
      <View style={styles.container}>
        <Text>Place not found</Text>
      </View>
    );
  }

  const handleUnlock = async () => {
    if (points < STORY_COST) {
      Alert.alert(
        "Not Enough Points",
        `You need ${STORY_COST} points to unlock this story. You currently have ${points} points.\n\nTip: Contribute to the community to earn more!`,
        [
          {
            text: "Contribute", onPress: () => {
              navigation.navigate("Contribution");
            }
          },
          { text: "Cancel", style: "cancel" }
        ]

      );
      return;
    }

    const success = await unlockStory(placeId, STORY_COST);
    if (success) {
      setIsUnlocked(true);
      Alert.alert("Unlocked!", `20 Points deducted. Remaining balance: ${points - STORY_COST}`);
    } else {
      Alert.alert("Error", "Something went wrong while unlocking.");
    }
  };

  const onPlaybackStatusUpdate = (status) => {
    if (!status.isLoaded) return;
    setPosition(status.positionMillis);
    setDuration(status.durationMillis || 1);
    setIsPlaying(status.isPlaying);
  };

  const loadAudio = async (audioUrl) => {
    try {
      setAudioAvailable(true);
      if (sound) {
        await sound.unloadAsync();
        setSound(null);
      }

      const { sound: newSound } = await Audio.Sound.createAsync(
        { uri: `${API_BASE}/${audioUrl}` },
        { shouldPlay: false },
        onPlaybackStatusUpdate,
      );

      setSound(newSound);
    } catch (error) {
      console.error("Audio loading error:", error);
      setAudioAvailable(false);
      // Don't crash the app if audio fails to load
      // Alert.alert("Audio Error", "Could not load audio. The story text is still available.");
    }
  };

  const togglePlay = async () => {
    if (!sound || !audioAvailable) {
      Alert.alert("Audio Not Available", "Audio is currently unavailable. The story text is still available for reading.");
      return;
    }

    try {
      const status = await sound.getStatusAsync();

      if (status.didJustFinish) {
        await sound.setPositionAsync(0);
        await sound.playAsync();
      } else if (isPlaying) {
        await sound.pauseAsync();
      } else {
        await sound.playAsync();
      }
    } catch (error) {
      console.error("Audio playback error:", error);
      setAudioAvailable(false);
      Alert.alert("Playback Error", "Audio playback failed. Please try generating the story again.");
    }
  };

  const handleGenerateStory = async () => {
    setLoading(true);
    setHasGenerated(false);
    setStoryContent("");

    try {
      console.log("Generating story with API:", `${API_BASE}/story/generate`);
      console.log("Request data:", {
        placeId: String(place.id),
        placeName: place.name,
        mode: storyMode,
        language,
      });

      const storyRes = await fetch(`${API_BASE}/story/generate`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          placeId: String(place.id),
          placeName: place.name,
          mode: storyMode,
          language,
        }),
      });

      console.log("Story response status:", storyRes.status);

      if (!storyRes.ok) {
        const errorText = await storyRes.text();
        console.error("Story generation failed:", errorText);
        throw new Error(`Story generation failed: ${storyRes.status} - ${errorText}`);
      }

      const storyData = await storyRes.json();
      console.log("Story data received:", storyData);

      if (!storyData.story) {
        throw new Error("No story content received from server");
      }

      setStoryContent(storyData.story);
      setHasGenerated(true);

      const cacheKey = `${place.id}_${storyMode}_${language}`;

      console.log("Generating voice with cache key:", cacheKey);

      const voiceRes = await fetch(`${API_BASE}/story/voice`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          story: storyData.story,
          language,
          cache_key: cacheKey,
        }),
      });

      console.log("Voice response status:", voiceRes.status);

      if (!voiceRes.ok) {
        const errorText = await voiceRes.text();
        console.error("Voice generation failed:", errorText);
        // Don't throw error here - story text is still available
        setAudioAvailable(false);
        return;
      }

      const voiceData = await voiceRes.json();
      if (voiceData.audio_url) {
        await loadAudio(voiceData.audio_url);
      } else {
        console.warn("No audio URL returned from voice generation");
        setAudioAvailable(false);
      }
    } catch (err) {
      console.error("Full error details:", err);

      // Fallback to a simple template when backend is unavailable
      const fallbackStory = generateFallbackStory(place.name, storyMode);
      setStoryContent(fallbackStory);
      setHasGenerated(true);
      setAudioAvailable(false);

      // Show a subtle message that this is a fallback
      setTimeout(() => {
        Alert.alert(
          "Backend Unavailable",
          "Using offline story mode. For full AI-generated stories, please ensure the backend server is running.",
          [{ text: "OK", style: "default" }]
        );
      }, 1000);
    } finally {
      setLoading(false);
    }
  };

  // Fallback story generator when backend is unavailable
  const generateFallbackStory = (placeName, mode) => {
    if (mode === "factual") {
      return `${placeName} is one of Delhi's most historic landmarks. This magnificent structure showcases the incredible architectural heritage of the city, with intricate designs and craftsmanship that have stood the test of time. Visitors can explore the rich history and cultural significance that makes this place a must-visit destination in Delhi. The monument serves as a testament to the city's glorious past and continues to inspire awe in all who visit.`;
    } else {
      return `As you stand before ${placeName}, imagine the echoes of centuries past whispering through its corridors. Picture the artisans who carefully carved each detail, their hands guided by generations of tradition. You can almost feel the presence of the people who walked these grounds before you - emperors, poets, and ordinary citizens whose stories are etched into every stone. Take a moment to let the atmosphere transport you to another time, where history comes alive around you.`;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* IMAGE & TITLE */}
        <View style={styles.playerSection}>
          <View style={styles.imageCircleWrapper}>
            <Image
              source={{ uri: place.image }}
              style={styles.monumentCircle}
            />
          </View>
          <Text style={styles.monumentName}>{place.name}</Text>
        </View>

        {/* LOCKED STATE */}
        {!isUnlocked ? (
          <View style={styles.lockedContainer}>
            <Ionicons name="lock-closed" size={64} color="#F59E0B" />
            <Text style={styles.lockedTitle}>Premium Audio Story</Text>
            <Text style={styles.lockedDesc}>
              Unlock immersive AI-narrated stories and hidden history facts about {place.name}.
            </Text>

            <View style={styles.costBadge}>
              <Text style={styles.costText}>Cost: {STORY_COST} Points</Text>
            </View>

            <View style={styles.balanceContainer}>
              <Text style={styles.balanceText}>Your Balance: {points} Points</Text>
            </View>

            <TouchableOpacity style={styles.unlockBtn} onPress={handleUnlock}>
              <Text style={styles.unlockBtnText}>Unlock Now</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View>
            {/* MODE TOGGLE */}
            <View style={{ alignItems: 'center' }}>
              <View style={styles.toggleContainer}>
                {["factual", "immersive"].map((mode) => (
                  <TouchableOpacity
                    key={mode}
                    style={[
                      styles.toggleBtn,
                      storyMode === mode && styles.toggleBtnActive,
                    ]}
                    onPress={() => setStoryMode(mode)}
                  >
                    <Text
                      style={[
                        styles.toggleText,
                        storyMode === mode && styles.toggleTextActive,
                      ]}
                    >
                      {mode === "factual" ? "Factual" : "Immersive"}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            {/* AUDIO */}
            <View style={styles.audioSection}>
              {!audioAvailable && (
                <View style={styles.audioWarning}>
                  <Ionicons name="warning" size={16} color="#F59E0B" />
                  <Text style={styles.audioWarningText}>Audio unavailable - story text only</Text>
                </View>
              )}
              <View style={styles.progressBar}>
                <View
                  style={[styles.progressFill, { width: `${progressPercent}%` }]}
                />
              </View>

              <TouchableOpacity
                style={[styles.playBtn, (!hasGenerated || !audioAvailable) && { opacity: 0.5 }]}
                onPress={togglePlay}
                disabled={!hasGenerated || !audioAvailable}
              >
                <Ionicons
                  name={isPlaying ? "pause" : "play"}
                  size={36}
                  color="#FFF"
                />
              </TouchableOpacity>
            </View>

            {/* STORY */}
            <Card style={styles.storyCard}>
              <Text style={styles.storyText}>
                {loading ? "Generating story..." : storyContent || "Select a mode and language to generate your story."}
              </Text>
            </Card>

            {/* LANGUAGE */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Story Language</Text>
              {["English", "Hindi", "Tamil", "Marathi"].map((lang) => (
                <TouchableOpacity
                  key={lang}
                  style={[
                    styles.langItem,
                    language === lang && styles.langItemActive,
                  ]}
                  onPress={() => setLanguage(lang)}
                >
                  <Text style={styles.langText}>{lang}</Text>
                  {language === lang && (
                    <Ionicons name="checkmark-circle" size={20} color="#FF8C00" />
                  )}
                </TouchableOpacity>
              ))}
            </View>

            {/* GENERATE */}
            <TouchableOpacity
              style={styles.generateBtn}
              onPress={handleGenerateStory}
              disabled={loading}
            >
              <Text style={styles.generateText}>
                {loading ? "Generating..." : "Generate Story"}
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#FEFBF6" },
  scrollContent: { padding: 24 },

  playerSection: { alignItems: "center" },
  imageCircleWrapper: {
    width: 180,
    height: 180,
    borderRadius: 90,
    borderWidth: 6,
    borderColor: "#FFF",
  },
  monumentCircle: { width: "100%", height: "100%", borderRadius: 90 },
  monumentName: {
    fontSize: 22,
    fontWeight: "800",
    marginTop: 16,
    color: "#2D241E",
    textAlign: "center",
  },

  lockedContainer: {
    alignItems: "center",
    marginTop: 40,
    padding: 20,
    backgroundColor: "#FFF",
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#F0E4D3",
  },
  lockedTitle: {
    fontSize: 20,
    fontWeight: "800",
    color: "#2D241E",
    marginTop: 16,
  },
  lockedDesc: {
    textAlign: "center",
    color: "#84593C",
    marginTop: 8,
    marginBottom: 20,
    lineHeight: 20,
  },
  costBadge: {
    backgroundColor: "#FEF3C7",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginBottom: 8,
  },
  costText: { color: "#92400E", fontWeight: "700" },
  balanceContainer: { marginBottom: 20 },
  balanceText: { color: "#64748b", fontSize: 13 },
  unlockBtn: {
    backgroundColor: "#FF8C00",
    paddingHorizontal: 32,
    paddingVertical: 14,
    borderRadius: 16,
    width: "100%",
    alignItems: "center",
  },
  unlockBtnText: { color: "#FFF", fontWeight: "700", fontSize: 16 },

  toggleContainer: {
    flexDirection: "row",
    backgroundColor: "#F0E4D3",
    borderRadius: 12,
    padding: 4,
    marginTop: 16,
  },
  toggleBtn: {
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  toggleBtnActive: { backgroundColor: "#FFF" },
  toggleText: { fontWeight: "700", color: "#84593C" },
  toggleTextActive: { color: "#FF8C00" },

  audioSection: { marginTop: 30, alignItems: "center" },
  audioWarning: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FEF3C7",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    marginBottom: 10,
  },
  audioWarningText: {
    color: "#92400E",
    fontSize: 12,
    fontWeight: "600",
    marginLeft: 6,
  },
  progressBar: {
    height: 4,
    backgroundColor: "#F0E4D3",
    width: "100%",
    borderRadius: 2,
  },
  progressFill: {
    height: "100%",
    backgroundColor: "#FF8C00",
  },
  playBtn: {
    marginTop: 20,
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: "#FF8C00",
    justifyContent: "center",
    alignItems: "center",
  },

  storyCard: { marginTop: 30, padding: 20 },
  storyText: { fontSize: 15, lineHeight: 24, color: "#2D241E" },

  section: { marginTop: 30 },
  sectionTitle: { fontSize: 17, fontWeight: "700", marginBottom: 12 },
  langItem: {
    padding: 14,
    backgroundColor: "#FFF",
    borderRadius: 14,
    marginBottom: 8,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  langItemActive: { borderColor: "#FF8C00", borderWidth: 1 },
  langText: { fontWeight: "600", color: "#84593C" },

  generateBtn: {
    marginTop: 24,
    backgroundColor: "#FF8C00",
    paddingVertical: 14,
    borderRadius: 16,
    alignItems: "center",
  },
  generateText: { color: "#FFF", fontWeight: "700", fontSize: 16 },
});