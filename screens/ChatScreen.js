import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  FlatList,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { usePoints } from '../context/PointsContext';
import { usePreferences } from '../context/PreferencesContext';
import { PLACES } from '../constants/places';

const QUICK_ACTIONS = [
  'What should I do next?',
  'Less crowded places nearby',
  'Food near me',
  'Tell me a story',
];

const ChatScreen = () => {
  const navigation = useNavigation();
  const { addPoints } = usePoints();
  const { preferences } = usePreferences();

  const [messages, setMessages] = useState([
    {
      id: '1',
      text:
        "Namaste! I'm DilliDarshan AI. Ask me anything about Delhi — places to visit, food recommendations, transport tips, or cultural stories!",
      isBot: true,
    },
  ]);
  const [inputText, setInputText] = useState('');
  const flatListRef = useRef(null);

  useEffect(() => {
    setTimeout(() => {
      flatListRef.current?.scrollToEnd({ animated: true });
    }, 100);
  }, [messages]);

  const generateBotResponse = (queryText) => {
    const query = queryText.toLowerCase();
    let text = '';
    let suggestions = [];
    let quickActions = [];

    if (query.includes('next')) {
      text = 'Based on your preferences, here’s what I suggest next:';
      suggestions = PLACES.slice(0, 3);
      quickActions = ['Tell me more', 'Less crowded places nearby'];
    } else if (query.includes('crowd') || query.includes('quiet')) {
      text = 'Here are some quieter places you might enjoy:';
      suggestions = PLACES.filter(p => p.crowdLevel === 'low').slice(0, 3);
      quickActions = ['Food near me'];
    } else if (query.includes('food')) {
      text = 'Delhi is a food lover’s paradise! Try these areas:';
      suggestions = PLACES.slice(0, 2);
      quickActions = ['Street food', 'Budget options'];
    } else if (query.includes('story')) {
      text = 'Visit a monument to unlock immersive cultural stories!';
      suggestions = PLACES.slice(0, 3);
    } else {
      text =
        'I can help you explore Delhi. Ask about places, food, transport, or stories — or tap a quick action below.';
      suggestions = PLACES.slice(0, 3);
      quickActions = QUICK_ACTIONS;
    }

    return {
      id: Date.now().toString(),
      text,
      isBot: true,
      suggestions,
      quickActions,
    };
  };

  const sendMessage = (text) => {
    const userMessage = {
      id: Date.now().toString(),
      text,
      isBot: false,
    };

    setMessages(prev => [...prev, userMessage]);
    addPoints(5, 'Chat interaction');

    setTimeout(() => {
      const botResponse = generateBotResponse(text);
      setMessages(prev => [...prev, botResponse]);
    }, 400);
  };

  const handleSend = () => {
    if (!inputText.trim()) return;
    sendMessage(inputText);
    setInputText('');
  };

  const renderMessage = ({ item }) => {
    if (item.isBot) {
      return (
        <View style={styles.botMessageContainer}>
          <View style={styles.botAvatar}>
            <Ionicons name="sparkles" size={20} color="#2563eb" />
          </View>

          <View style={styles.botMessage}>
            <Text style={styles.botText}>{item.text}</Text>

            {item.suggestions?.length > 0 && (
              <View style={styles.suggestionsContainer}>
                {item.suggestions.map(place => (
                  <TouchableOpacity
                    key={place.id}
                    style={styles.suggestionCard}
                    onPress={() =>
                      navigation.navigate('PlaceDetails', { placeId: place.id })
                    }
                  >
                    <Text style={styles.suggestionTitle}>{place.name}</Text>
                    <Text style={styles.suggestionSubtitle}>
                      {place.culturalHook}
                    </Text>
                    <Text style={styles.crowdBadge}>
                      Crowd: {place.crowdLevel}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            )}

            {item.quickActions?.length > 0 && (
              <View style={styles.quickActionsContainer}>
                {item.quickActions.map(action => (
                  <TouchableOpacity
                    key={action}
                    style={styles.quickActionChip}
                    onPress={() => sendMessage(action)}
                  >
                    <Text style={styles.quickActionText}>{action}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            )}
          </View>
        </View>
      );
    }

    return (
      <View style={styles.userMessageContainer}>
        <View style={styles.userMessage}>
          <Text style={styles.userText}>{item.text}</Text>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        style={styles.keyboardView}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerContent}>
            <View style={styles.botAvatar}>
              <Ionicons name="chatbubbles" size={20} color="#2563eb" />
            </View>
            <View>
              <Text style={styles.headerTitle}>DilliDarshan AI</Text>
              <Text style={styles.headerSubtitle}>Online</Text>
            </View>
          </View>
        </View>

        {/* Messages */}
        <FlatList
          ref={flatListRef}
          data={messages}
          keyExtractor={item => item.id}
          renderItem={renderMessage}
          contentContainerStyle={styles.messagesContent}
        />

        {/* Initial quick actions */}
        {messages.length === 1 && (
          <View style={styles.quickActionsInitial}>
            {QUICK_ACTIONS.map(action => (
              <TouchableOpacity
                key={action}
                style={styles.quickActionChip}
                onPress={() => sendMessage(action)}
              >
                <Text style={styles.quickActionText}>{action}</Text>
              </TouchableOpacity>
            ))}
          </View>
        )}

        {/* Input */}
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Ask me about Delhi..."
            value={inputText}
            onChangeText={setInputText}
            multiline
          />
          <TouchableOpacity
            style={[
              styles.sendButton,
              !inputText.trim() && styles.sendButtonDisabled,
            ]}
            onPress={handleSend}
            disabled={!inputText.trim()}
          >
            <Ionicons name="send" size={18} color="#ffffff" />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f1f5f9' },
  keyboardView: { flex: 1 },
  header: {
    backgroundColor: '#ffffff',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e2e8f0',
  },
  headerContent: { flexDirection: 'row', alignItems: 'center' },
  botAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#dbeafe',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  headerTitle: { fontSize: 18, fontWeight: '600', color: '#1e293b' },
  headerSubtitle: { fontSize: 12, color: '#64748b' },
  messagesContent: { padding: 16 },
  botMessageContainer: { flexDirection: 'row', marginBottom: 16 },
  botMessage: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 12,
    flex: 1,
  },
  botText: { fontSize: 15, color: '#1e293b' },
  suggestionsContainer: { marginTop: 12 },
  suggestionCard: {
    backgroundColor: '#f8fafc',
    borderRadius: 8,
    padding: 12,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  suggestionTitle: { fontSize: 16, fontWeight: '600' },
  suggestionSubtitle: { fontSize: 13, color: '#64748b' },
  crowdBadge: { fontSize: 12, color: '#64748b' },
  quickActionsContainer: { flexDirection: 'row', flexWrap: 'wrap', marginTop: 8 },
  quickActionsInitial: { padding: 16, flexDirection: 'row', flexWrap: 'wrap' },
  quickActionChip: {
    backgroundColor: '#2563eb',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 8,
    marginBottom: 8,
  },
  quickActionText: { color: '#ffffff', fontSize: 13 },
  userMessageContainer: {
    alignItems: 'flex-end',
    marginBottom: 16,
  },
  userMessage: {
    backgroundColor: '#2563eb',
    borderRadius: 12,
    padding: 12,
    maxWidth: '85%',
  },
  userText: { color: '#ffffff', fontSize: 15 },
  inputContainer: {
    flexDirection: 'row',
    padding: 12,
    backgroundColor: '#ffffff',
    borderTopWidth: 1,
    borderTopColor: '#e2e8f0',
  },
  input: {
    flex: 1,
    backgroundColor: '#f1f5f9',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 10,
    marginRight: 8,
  },
  sendButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#2563eb',
    alignItems: 'center',
    justifyContent: 'center',
  },
  sendButtonDisabled: {
    backgroundColor: '#cbd5e1',
  },
});

export default ChatScreen;
