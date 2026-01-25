// screens/ChatScreen.js
import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Alert,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { usePoints } from "../context/PointsContext";
import * as Location from 'expo-location';
import { getNextAction } from "../api/nextAction";

const QUICK_ACTIONS = [
  "What should I do next?",
  "Show my itinerary",
  "Less crowded places",
  "Food near me",
];

const ChatScreen = () => {
  const navigation = useNavigation();
  const { addPoints } = usePoints();
  const [inputText, setInputText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const flatListRef = useRef(null);

  const [messages, setMessages] = useState([
    {
      id: "1",
      text: "Namaste! I'm DilliDarshan AI. Ask me anything about Delhi — I can even build a personalized plan for you!",
      isBot: true,
    },
  ]);

  const getHeritageRecommendations = async () => {
    try {
      setIsLoading(true);

      // Add loading message
      const loadingMessage = {
        id: Date.now().toString(),
        text: "🔍 Finding the best heritage places near you...",
        isBot: true,
        isLoading: true,
      };
      setMessages((prev) => [...prev, loadingMessage]);

      // Request location permission
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert("Permission Required", "Location access is required to suggest nearby places");
        return;
      }

      // Get current location
      let location = await Location.getCurrentPositionAsync({});
      const lat = location.coords.latitude;
      const lon = location.coords.longitude;

      // Get heritage recommendations
      const data = await getNextAction(lat, lon);

      // Remove loading message
      setMessages((prev) => prev.filter(msg => msg.id !== loadingMessage.id));

      // Format recommendations for chat
      if (data.recommendations && data.recommendations.length > 0) {
        const recommendationsText = data.recommendations.map((place, index) => {
          return `${index + 1}. **${place.name}** (${place.distance_km} km away)\n   📍 ${place.reason}\n   ⭐ Score: ${place.score}/100`;
        }).join('\n\n');

        const botResponse = {
          id: Date.now().toString(),
          text: `🏛️ **Here are the best heritage places near you:**\n\n💡 Tap on any card for more details!`,
          isBot: true,
          showRecommendations: true,
          recommendations: data.recommendations,
        };
        setMessages((prev) => [...prev, botResponse]);
      } else {
        const botResponse = {
          id: Date.now().toString(),
          text: "😔 I couldn't find any heritage places near you right now. Try moving to a different location or ask me about specific monuments!",
          isBot: true,
        };
        setMessages((prev) => [...prev, botResponse]);
      }
    } catch (err) {
      console.error('Error getting recommendations:', err);

      // Remove loading message
      setMessages((prev) => prev.filter(msg => msg.isLoading));

      const errorMessage = {
        id: Date.now().toString(),
        text: "❌ Sorry, I'm having trouble getting recommendations right now. Please try again in a moment!",
        isBot: true,
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const generateBotResponse = (queryText) => {
    const query = queryText.toLowerCase();
    let text = "";
    let showPlanButton = false;

    if (
      query.includes("plan") ||
      query.includes("next") ||
      query.includes("itinerary") ||
      query.includes("do")
    ) {
      // Trigger heritage recommendations instead of generic response
      getHeritageRecommendations();
      return null; // Don't add a message yet, let the async function handle it
    } else if (query.includes("food")) {
      text =
        "Delhi is a food paradise! I recommend checking out Paranthe Wali Gali for a local experience.";
    } else {
      text =
        "I can help with transport tips, monument stories, or planning your route. What's on your mind?";
    }

    return {
      id: Date.now().toString(),
      text,
      isBot: true,
      showPlanButton,
    };
  };

  const sendMessage = (text) => {
    if (!text.trim() || isLoading) return;
    const userMessage = { id: Date.now().toString(), text, isBot: false };
    setMessages((prev) => [...prev, userMessage]);
    addPoints(5, "Chat interaction");

    setTimeout(() => {
      const botResponse = generateBotResponse(text);
      if (botResponse) {
        setMessages((prev) => [...prev, botResponse]);
      }
    }, 600);
  };

  const renderMessage = ({ item }) => (
    <View
      style={[
        styles.msgWrapper,
        item.isBot ? styles.botAlign : styles.userAlign,
      ]}
    >
      <View
        style={[
          styles.bubble,
          item.isBot ? styles.botBubble : styles.userBubble,
        ]}
      >
        <Text
          style={[
            styles.msgText,
            item.isBot ? styles.botText : styles.userText,
          ]}
        >
          {item.text}
        </Text>

        {/* LOADING INDICATOR */}
        {item.isLoading && (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="small" color="#FF8C00" />
            <Text style={styles.loadingText}>Searching heritage places...</Text>
          </View>
        )}

        {/* RECOMMENDATION CARDS */}
        {item.isBot && item.showRecommendations && item.recommendations && (
          <View style={styles.recommendationsContainer}>
            {item.recommendations.map((place, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  styles.recommendationCard,
                  index === 0 && styles.topRecommendation
                ]}
                onPress={() => {
                  console.log('DEBUG recommendation place object =>', place);
                  navigation.navigate("PlaceDetails", { placeName: place.name });
                }}
              >
                <View style={styles.recommendationHeader}>
                  <View style={styles.recommendationInfo}>
                    <Text style={styles.recommendationName}>{place.name}</Text>
                    <Text style={styles.recommendationDistance}>{place.distance_km} km away</Text>
                  </View>
                  <View style={styles.recommendationScore}>
                    <Text style={styles.recommendationScoreText}>{place.score}</Text>
                  </View>
                </View>
                <Text style={styles.recommendationReason}>{place.reason}</Text>
                {index === 0 && (
                  <View style={styles.bestChoiceBadge}>
                    <Text style={styles.bestChoiceText}>🏆 Best Choice</Text>
                  </View>
                )}
              </TouchableOpacity>
            ))}
          </View>
        )}

        {/* ACTION BUTTON */}
        {item.isBot && item.showPlanButton && (
          <TouchableOpacity
            style={styles.planButton}
            onPress={() =>
              navigation.navigate("PersonalizedPlan", {
                places: ["1", "2", "4"],
              })
            }
          >
            <Ionicons name="map" size={18} color="#FFF" />
            <Text style={styles.planButtonText}>Open Smart Plan</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
        keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 20}
      >
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Ask Your Delhi Guide</Text>
        </View>

        <FlatList
          ref={flatListRef}
          data={messages}
          renderItem={renderMessage}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContent}
          onContentSizeChange={() =>
            flatListRef.current?.scrollToEnd({ animated: true })
          }
        />

        {/* SUGGESTED QUESTIONS*/}
        <View style={styles.suggestionsWrapper}>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.suggestionsScroll}
          >
            {QUICK_ACTIONS.map((action, index) => (
              <TouchableOpacity
                key={index}
                style={styles.suggestionChip}
                onPress={() => sendMessage(action)}
              >
                <Text style={styles.suggestionText}>{action}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        <View style={styles.inputArea}>
          <TextInput
            style={styles.input}
            placeholder="Ask me anything..."
            placeholderTextColor="#84593C"
            value={inputText}
            onChangeText={setInputText}
          />
          <TouchableOpacity
            style={styles.sendBtn}
            onPress={() => {
              sendMessage(inputText);
              setInputText("");
            }}
          >
            <Ionicons name="send" size={20} color="#FFF" />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#FEFBF6" },
  header: {
    padding: 15,
    backgroundColor: "#FFF",
    borderBottomWidth: 1,
    borderBottomColor: "#F0E4D3",
    alignItems: "center",
  },
  headerTitle: { fontSize: 18, fontWeight: "800", color: "#2D241E" },
  listContent: { padding: 20, paddingBottom: 10 },
  msgWrapper: { marginBottom: 15, maxWidth: "85%" },
  botAlign: { alignSelf: "flex-start" },
  userAlign: { alignSelf: "flex-end" },
  bubble: { padding: 14, borderRadius: 22 },
  botBubble: {
    backgroundColor: "#FFF9F1",
    borderWidth: 1,
    borderColor: "#F0E4D3",
    borderBottomLeftRadius: 4,
  },
  userBubble: { backgroundColor: "#FF8C00", borderBottomRightRadius: 4 },
  msgText: { fontSize: 15, lineHeight: 22 },
  botText: { color: "#2D241E", fontWeight: "500" },
  userText: { color: "#FFF", fontWeight: "600" },

  // New Plan Button inside Bubble
  planButton: {
    marginTop: 12,
    backgroundColor: "#FF8C00",
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },
  planButtonText: { color: "#FFF", fontWeight: "700", fontSize: 14 },

  // Loading indicator
  loadingContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 8,
    paddingVertical: 8,
  },
  loadingText: {
    marginLeft: 8,
    fontSize: 14,
    color: "#84593C",
    fontStyle: "italic",
  },

  // Recommendation cards
  recommendationsContainer: {
    marginTop: 12,
  },
  recommendationCard: {
    backgroundColor: "#FFF",
    borderWidth: 1,
    borderColor: "#F0E4D3",
    borderRadius: 12,
    padding: 12,
    marginBottom: 8,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  topRecommendation: {
    backgroundColor: "#FFF9F1",
    borderColor: "#FDE68A",
    borderWidth: 2,
  },
  recommendationHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 6,
  },
  recommendationInfo: {
    flex: 1,
  },
  recommendationName: {
    fontSize: 16,
    fontWeight: "700",
    color: "#2D241E",
    marginBottom: 2,
  },
  recommendationDistance: {
    fontSize: 12,
    color: "#84593C",
  },
  recommendationScore: {
    backgroundColor: "#FF8C00",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  recommendationScoreText: {
    color: "#FFF",
    fontSize: 12,
    fontWeight: "700",
  },
  recommendationReason: {
    fontSize: 13,
    color: "#84593C",
    lineHeight: 18,
  },
  bestChoiceBadge: {
    backgroundColor: "#FFD700",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    alignSelf: "flex-start",
    marginTop: 6,
  },
  bestChoiceText: {
    fontSize: 11,
    fontWeight: "700",
    color: "#2D241E",
  },

  // Suggested Questions Styling
  suggestionsWrapper: { paddingVertical: 10, backgroundColor: "#FEFBF6" },
  suggestionsScroll: { paddingHorizontal: 15 },
  suggestionChip: {
    backgroundColor: "#FFF",
    borderWidth: 1,
    borderColor: "#F0E4D3",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 8,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  suggestionText: { color: "#84593C", fontSize: 13, fontWeight: "600" },

  inputArea: {
    flexDirection: "row",
    padding: 15,
    backgroundColor: "#FFF",
    borderTopWidth: 1,
    borderTopColor: "#F0E4D3",
    alignItems: "center",
  },
  input: {
    flex: 1,
    height: 45,
    backgroundColor: "#F8F1E7",
    borderRadius: 25,
    paddingHorizontal: 20,
    marginRight: 10,
    color: "#2D241E",
  },
  sendBtn: {
    width: 45,
    height: 45,
    borderRadius: 23,
    backgroundColor: "#FF8C00",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default ChatScreen;
