// PersonalizedPlanScreen.js
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRoute, useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { Card } from '../components/Card';
import { Button } from '../components/Button';
import { getPlaceById } from '../constants/places';


const PersonalizedPlanScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { places: placeIds } = route.params;

  const places = placeIds.map((id) => getPlaceById(id)).filter((p) => p !== undefined);

  const timelineLabels = ['Now', 'Next', 'Later'];

  if (places.length === 0) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Your Personalized Plan</Text>
          <Text style={styles.subtitle}>No places found</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.header}>
          <Text style={styles.title}>Your Personalized Plan</Text>
          <Text style={styles.subtitle}>Optimized based on your preferences and current location</Text>
        </View>

        {places.map((place, index) => {
          const timelineLabel = timelineLabels[Math.min(index, timelineLabels.length - 1)];
          const crowdColor =
            place.crowdLevel === 'low'
              ? '#10b981'
              : place.crowdLevel === 'medium'
              ? '#f59e0b'
              : '#ef4444';

          return (
            <Card key={place.id} style={styles.stopCard}>
              <View style={styles.timelineHeader}>
                <View style={styles.timelineLabel}>
                  <View style={[styles.timelineDot, { backgroundColor: '#2563eb' }]} />
                  <Text style={styles.timelineText}>{timelineLabel}</Text>
                </View>
                {index < places.length - 1 && (
                  <View style={styles.travelTime}>
                    <Ionicons name="time-outline" size={14} color="#64748b" />
                    <Text style={styles.travelTimeText}>
                      {index === 0 ? '15 min' : '20 min'} travel
                    </Text>
                  </View>
                )}
              </View>

              <Text style={styles.placeName}>{place.name}</Text>
              <Text style={styles.whyRecommended}>
                Why recommended: Perfect timing, matches your interests, and fits your schedule
              </Text>

              <View style={styles.stopFooter}>
                <View style={styles.crowdBadge}>
                  <View style={[styles.crowdDot, { backgroundColor: crowdColor }]} />
                  <Text style={[styles.crowdText, { color: crowdColor }]}>
                    {place.crowdLevel}
                  </Text>
                </View>

                <View style={styles.stopActions}>
                  <TouchableOpacity
                    style={styles.actionButton}
                    onPress={() => navigation.navigate('PlaceDetails', { placeId: place.id })}
                  >
                    <Ionicons name="information-circle-outline" size={16} color="#2563eb" />
                    <Text style={styles.actionText}>Details</Text>
                  </TouchableOpacity>

                  <TouchableOpacity style={styles.actionButton}>
                    <Ionicons name="swap-horizontal-outline" size={16} color="#2563eb" />
                    <Text style={styles.actionText}>Swap</Text>
                  </TouchableOpacity>

                  <TouchableOpacity style={styles.actionButton}>
                    <Ionicons name="navigate-outline" size={16} color="#2563eb" />
                    <Text style={styles.actionText}>Navigate</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </Card>
          );
        })}

        <View style={styles.footer}>
          <Button
            title="Start My Journey"
            onPress={() => navigation.navigate('Explore')}
            style={styles.footerButton}
          />
        </View>
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
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1e293b',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: '#64748b',
    lineHeight: 20,
  },
  stopCard: {
    margin: 16,
    marginTop: 16,
  },
  timelineHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  timelineLabel: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  timelineDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 8,
  },
  timelineText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#2563eb',
  },
  travelTime: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  travelTimeText: {
    fontSize: 12,
    color: '#64748b',
    marginLeft: 4,
  },
  placeName: {
    fontSize: 20,
    fontWeight: '600',
    color: '#1e293b',
    marginBottom: 8,
  },
  whyRecommended: {
    fontSize: 14,
    color: '#64748b',
    lineHeight: 20,
    marginBottom: 16,
  },
  stopFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  crowdBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 12,
  },
  crowdDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 6,
  },
  crowdText: {
    fontSize: 12,
    fontWeight: '600',
    textTransform: 'capitalize',
  },
  stopActions: {
    flexDirection: 'row',
    gap: 12,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  actionText: {
    fontSize: 12,
    color: '#2563eb',
    marginLeft: 4,
    fontWeight: '600',
  },
  footer: {
    padding: 16,
    paddingBottom: 32,
  },
  footerButton: {
    width: '100%',
  },
});

export default PersonalizedPlanScreen;



