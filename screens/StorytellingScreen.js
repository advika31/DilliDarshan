// screens/StorytellingScreen.js
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRoute } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { Audio } from "expo-av";

import { Card } from "../components/Card";
import { getPlaceById } from "../constants/places";

const API_BASE = "http://192.168.1.28:8000";

export default function StorytellingScreen() {
  const route = useRoute();
  const { placeId } = route.params || {};

  const place = getPlaceById(placeId);

  const [storyMode, setStoryMode] = useState("factual");
  const [language, setLanguage] = useState("English");

  const [storyContent, setStoryContent] = useState("");
  const [hasGenerated, setHasGenerated] = useState(false);
  const [loading, setLoading] = useState(false);

  const [sound, setSound] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [position, setPosition] = useState(0);
  const [duration, setDuration] = useState(1);

  const progressPercent = (position / duration) * 100;

  if (!place) {
    return (
      <View style={styles.container}>
        <Text>Place not found</Text>
      </View>
    );
  }

  const onPlaybackStatusUpdate = (status) => {
    if (!status.isLoaded) return;
    setPosition(status.positionMillis);
    setDuration(status.durationMillis || 1);
    setIsPlaying(status.isPlaying);
  };

  const loadAudio = async (audioUrl) => {
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
  };

  const togglePlay = async () => {
    if (!sound) return;

    const status = await sound.getStatusAsync();

    if (status.didJustFinish) {
      await sound.setPositionAsync(0);
      await sound.playAsync();
    } else if (isPlaying) {
      await sound.pauseAsync();
    } else {
      await sound.playAsync();
    }
  };

  const handleGenerateStory = async () => {
    setLoading(true);
    setHasGenerated(false);
    setStoryContent("");

    try {
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

      if (!storyRes.ok) {
        throw new Error("Failed to generate story");
      }

      const storyData = await storyRes.json();
      setStoryContent(storyData.story);
      setHasGenerated(true);

      const cacheKey = `${place.id}_${storyMode}_${language}`;

      const voiceRes = await fetch(`${API_BASE}/story/voice`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          story: storyData.story,
          language,
          cache_key: cacheKey,
        }),
      });

      const voiceData = await voiceRes.json();
      await loadAudio(voiceData.audio_url);
    } catch (err) {
      console.error(err);
      setStoryContent("Failed to generate story.");
    } finally {
      setLoading(false);
    }
  };

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

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* IMAGE */}
        <View style={styles.playerSection}>
          <View style={styles.imageCircleWrapper}>
            <Image
              source={{ uri: place.image }}
              style={styles.monumentCircle}
            />
          </View>
          <Text style={styles.monumentName}>{place.name}</Text>

          {/* MODE TOGGLE */}
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
          <View style={styles.progressBar}>
            <View
              style={[styles.progressFill, { width: `${progressPercent}%` }]}
            />
          </View>

          <TouchableOpacity
            style={[styles.playBtn, !hasGenerated && { opacity: 0.5 }]}
            onPress={togglePlay}
            disabled={!hasGenerated}
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
            {loading ? "Generating story…" : storyContent}
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
            {loading ? "Generating…" : "Generate Story"}
          </Text>
        </TouchableOpacity>
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
  },

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
