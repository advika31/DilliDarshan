// screens/StorytellingScreen.js
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRoute, useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { MOCK_STORIES } from '../constants/stories';
import { Card } from '../components/Card';
import { getPlaceById } from '../constants/places';

const StorytellingScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { placeId } = route.params || {};

  const place = getPlaceById(placeId);
  const [isPlaying, setIsPlaying] = useState(false);
  
  const [storyMode, setStoryMode] = useState('immersive'); 
  const [language, setLanguage] = useState('English');

  if (!place) return <View style={styles.container}><Text>Place not found</Text></View>;

  const storyContent = MOCK_STORIES[placeId]?.[storyMode] || MOCK_STORIES[placeId]?.quick;

  return (
    <SafeAreaView style={styles.container}>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        
        {/* PLAYER VISUAL */}
        <View style={styles.playerSection}>
          <View style={styles.imageCircleWrapper}>
            <Image source={{ uri: place.image }} style={styles.monumentCircle} />
          </View>
          <Text style={styles.monumentName}>{place.name}</Text>
          
          {/* MODE TOGGLE (Factual vs Immersive) */}
          <View style={styles.toggleContainer}>
            <TouchableOpacity 
              style={[styles.toggleBtn, storyMode === 'factual' && styles.toggleBtnActive]}
              onPress={() => setStoryMode('factual')}
            >
              <Text style={[styles.toggleText, storyMode === 'factual' && styles.toggleTextActive]}>Factual</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={[styles.toggleBtn, storyMode === 'immersive' && styles.toggleBtnActive]}
              onPress={() => setStoryMode('immersive')}
            >
              <Text style={[styles.toggleText, storyMode === 'immersive' && styles.toggleTextActive]}>Immersive</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* AUDIO CONTROLS */}
        <View style={styles.audioSection}>
          <View style={styles.progressBar}>
            <View style={styles.progressFill} />
          </View>
          <View style={styles.buttonRow}>
            <TouchableOpacity><Ionicons name="play-back" size={30} color="#84593C" /></TouchableOpacity>
            <TouchableOpacity 
              style={styles.playBtn} 
              onPress={() => setIsPlaying(!isPlaying)}
            >
              <Ionicons name={isPlaying ? "pause" : "play"} size={36} color="#FFF" />
            </TouchableOpacity>
            <TouchableOpacity><Ionicons name="play-forward" size={30} color="#84593C" /></TouchableOpacity>
          </View>
        </View>

        {/* TRANSCRIPT AREA */}
        <Card style={styles.storyCard}>
          <Text style={styles.storyText}>{storyContent}</Text>
        </Card>

        {/* LANGUAGE SELECTION */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Story Language</Text>
          <View style={styles.languageList}>
            {['English', 'Hindi', 'Hinglish'].map((lang) => (
              <TouchableOpacity 
                key={lang} 
                style={[styles.langItem, language === lang && styles.langItemActive]}
                onPress={() => setLanguage(lang)}
              >
                <Text style={[styles.langText, language === lang && styles.langTextActive]}>{lang}</Text>
                {language === lang ? (
                  <Ionicons name="checkmark-circle" size={20} color="#FF8C00" />
                ) : (
                  <Ionicons name="chevron-forward" size={18} color="#F0E4D3" />
                )}
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={{ height: 40 }} />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FEFBF6' },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: 20, backgroundColor: '#FFF', borderBottomWidth: 1, borderBottomColor: '#F0E4D3' },
  headerTitle: { fontSize: 18, fontWeight: '800', color: '#2D241E' },
  scrollContent: { padding: 25 },

  playerSection: { alignItems: 'center' },
  imageCircleWrapper: { width: 180, height: 180, borderRadius: 90, borderWidth: 6, borderColor: '#FFF', elevation: 8, shadowColor: '#84593C', shadowOpacity: 0.2, shadowRadius: 10 },
  monumentCircle: { width: '100%', height: '100%', borderRadius: 90 },
  monumentName: { fontSize: 22, fontWeight: '800', color: '#2D241E', marginTop: 20 },

  // Toggle Styles
  toggleContainer: { flexDirection: 'row', backgroundColor: '#F0E4D3', borderRadius: 12, padding: 4, marginTop: 15, width: 200 },
  toggleBtn: { flex: 1, paddingVertical: 8, alignItems: 'center', borderRadius: 10 },
  toggleBtnActive: { backgroundColor: '#FFF' },
  toggleText: { fontSize: 13, fontWeight: '700', color: '#84593C' },
  toggleTextActive: { color: '#FF8C00' },

  audioSection: { marginTop: 30 },
  progressBar: { height: 4, backgroundColor: '#F0E4D3', borderRadius: 2 },
  progressFill: { width: '30%', height: '100%', backgroundColor: '#FF8C00', borderRadius: 2 },
  buttonRow: { flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: 30, marginTop: 20 },
  playBtn: { width: 64, height: 64, borderRadius: 32, backgroundColor: '#FF8C00', justifyContent: 'center', alignItems: 'center' },

  storyCard: { marginTop: 30, padding: 20, backgroundColor: '#FFF9F1' },
  storyText: { fontSize: 15, color: '#2D241E', lineHeight: 24, fontWeight: '500' },

  section: { marginTop: 30 },
  sectionTitle: { fontSize: 17, fontWeight: '700', color: '#2D241E', marginBottom: 15 },
  languageList: { gap: 10 },
  langItem: { 
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', 
    backgroundColor: '#FFF', padding: 15, borderRadius: 16, 
    borderWidth: 1, borderColor: '#F0E4D3' 
  },
  langItemActive: { borderColor: '#FF8C00', backgroundColor: '#FFF2E0' },
  langText: { fontSize: 15, fontWeight: '600', color: '#84593C' },
  langTextActive: { color: '#2D241E', fontWeight: '700' }
});

export default StorytellingScreen;