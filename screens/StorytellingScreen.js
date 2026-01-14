import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRoute } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { MOCK_STORIES } from '../constants/stories';
import { Card } from '../components/Card';
import { getPlaceById } from '../constants/places';

const StorytellingScreen = () => {
  const route = useRoute();
  const { placeId, mode } = route.params || {};

  const place = getPlaceById(placeId);
  const [isPlaying, setIsPlaying] = useState(false);
  const [storyMode, setStoryMode] = useState('factual');

  if (!place) {
    return (
      <View style={styles.container}>
        <Text>Place not found</Text>
      </View>
    );
  }

  const storyContent =
    MOCK_STORIES[placeId]?.[storyMode] ||
    MOCK_STORIES[placeId]?.quick ||
    'Story content will be available soon.';

  const modeLabel =
    mode === 'quick'
      ? '30-sec Quick Story'
      : mode === 'immersive'
      ? '2-min Immersive Story'
      : mode === 'kid-friendly'
      ? 'Kid-friendly Story'
      : 'Elder-friendly Story';

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>

        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.placeName}>{place.name}</Text>
          <Text style={styles.modeTitle}>{modeLabel}</Text>
        </View>

        {/* Controls */}
        <Card style={styles.card}>
          <View style={styles.controls}>
            <TouchableOpacity
              style={styles.playButton}
              onPress={() => setIsPlaying(!isPlaying)}
            >
              <Ionicons
                name={isPlaying ? 'pause' : 'play'}
                size={28}
                color="#ffffff"
              />
            </TouchableOpacity>

            <View style={styles.controlInfo}>
              <Text style={styles.controlLabel}>
                {isPlaying ? 'Playing…' : 'Tap to play'}
              </Text>
              <Text style={styles.controlSubtext}>
                {mode === 'quick' ? '30 seconds' : '2 minutes'}
              </Text>
            </View>
          </View>

          <View style={styles.toggleContainer}>
            <TouchableOpacity
              style={[
                styles.toggleButton,
                storyMode === 'factual' && styles.toggleButtonActive,
              ]}
              onPress={() => setStoryMode('factual')}
            >
              <Text
                style={[
                  styles.toggleText,
                  storyMode === 'factual' && styles.toggleTextActive,
                ]}
              >
                Factual
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.toggleButton,
                storyMode === 'immersive' && styles.toggleButtonActive,
              ]}
              onPress={() => setStoryMode('immersive')}
            >
              <Text
                style={[
                  styles.toggleText,
                  storyMode === 'immersive' && styles.toggleTextActive,
                ]}
              >
                Immersive
              </Text>
            </TouchableOpacity>
          </View>
        </Card>

        {/* Story */}
        <Card style={styles.card}>
          <Text style={styles.storyText}>{storyContent}</Text>
        </Card>

        {/* Language */}
        <Card style={styles.card}>
          <View style={styles.languageContainer}>
            <TouchableOpacity style={styles.languageButton}>
              <Text style={styles.languageText}>English</Text>
              <Ionicons name="chevron-forward" size={18} color="#64748b" />
            </TouchableOpacity>

            <TouchableOpacity style={styles.languageButton}>
              <Text style={styles.languageText}>Hindi</Text>
              <Ionicons name="chevron-forward" size={18} color="#64748b" />
            </TouchableOpacity>

            <TouchableOpacity style={styles.languageButton}>
              <Text style={styles.languageText}>Hinglish</Text>
              <Ionicons name="chevron-forward" size={18} color="#64748b" />
            </TouchableOpacity>
          </View>
        </Card>

        {/* Sources */}
        <Card style={styles.card}>
          <Text style={styles.sourcesText}>
            • Archaeological Survey of India{'\n'}
            • Delhi Tourism{'\n'}
            • Local historians and cultural experts{'\n'}
            • Community contributions
          </Text>
        </Card>

      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  scrollView: {
    flex: 1,
  },
  header: {
    backgroundColor: '#ffffff',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#e2e8f0',
  },
  placeName: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1e293b',
    marginBottom: 4,
  },
  modeTitle: {
    fontSize: 16,
    color: '#64748b',
  },
  card: {
    margin: 16,
  },
  controls: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  playButton: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#2563eb',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  controlInfo: {
    flex: 1,
  },
  controlLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1e293b',
    marginBottom: 4,
  },
  controlSubtext: {
    fontSize: 14,
    color: '#64748b',
  },
  toggleContainer: {
    flexDirection: 'row',
    backgroundColor: '#f1f5f9',
    borderRadius: 8,
    padding: 4,
  },
  toggleButton: {
    flex: 1,
    paddingVertical: 8,
    alignItems: 'center',
    borderRadius: 6,
  },
  toggleButtonActive: {
    backgroundColor: '#ffffff',
  },
  toggleText: {
    fontSize: 14,
    color: '#64748b',
    fontWeight: '500',
  },
  toggleTextActive: {
    color: '#2563eb',
    fontWeight: '600',
  },
  storyText: {
    fontSize: 16,
    color: '#1e293b',
    lineHeight: 26,
  },
  languageContainer: {
    gap: 12,
  },
  languageButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: '#f1f5f9',
    borderRadius: 8,
  },
  languageText: {
    fontSize: 15,
    color: '#1e293b',
    fontWeight: '500',
  },
  sourcesText: {
    fontSize: 14,
    color: '#64748b',
    lineHeight: 24,
  },
});

export default StorytellingScreen;
