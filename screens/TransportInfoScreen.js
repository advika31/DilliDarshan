import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRoute } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { Card } from '../components/Card';
import { getPlaceById } from '../constants/places';

const TransportInfoScreen = () => {
  const route = useRoute();
  const { placeId } = route.params || {};

  const place = getPlaceById(placeId);

  if (!place) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Place not found</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>

        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Transport & Fare Info</Text>
          <Text style={styles.subtitle}>Getting to {place.name}</Text>
        </View>

        {/* Nearest Metro */}
        <Card style={styles.card}>
          <View style={styles.infoRow}>
            <Ionicons name="train-outline" size={24} color="#2563eb" />
            <View style={styles.infoContent}>
              <Text style={styles.infoTitle}>{place.nearestMetro}</Text>
              <Text style={styles.infoDescription}>
                {place.walkingDistance} walking distance from metro station
              </Text>
            </View>
          </View>
        </Card>

        {/* Fare Info */}
        <Card style={styles.card}>
          <View style={styles.fareContainer}>
            <View style={styles.fareItem}>
              <Text style={styles.fareLabel}>Auto-rickshaw</Text>
              <Text style={styles.fareValue}>₹30 - ₹60</Text>
              <Text style={styles.fareNote}>From metro station</Text>
            </View>

            <View style={styles.fareItem}>
              <Text style={styles.fareLabel}>E-rickshaw</Text>
              <Text style={styles.fareValue}>₹20 - ₹40</Text>
              <Text style={styles.fareNote}>Shared routes available</Text>
            </View>
          </View>
        </Card>

        {/* Suggested Routes */}
        <Card style={styles.card}>
          <Text style={styles.routeText}>
            • Route 1: {place.nearestMetro} → {place.name} (₹15 per person){'\n'}
            • Route 2: Connaught Place → {place.name} (₹25 per person){'\n'}
            • Route 3: India Gate → {place.name} (₹20 per person)
          </Text>
        </Card>

        {/* Tips */}
        <Card style={styles.card}>
          <Text style={styles.shortcutText}>{place.transportTips}</Text>
          <Text style={styles.shortcutNote}>
            Tip: Use Google Maps for real-time navigation
          </Text>
        </Card>

        {/* Guidance */}
        <Card style={styles.card}>
          <View style={styles.guidanceItem}>
            <Ionicons name="exit-outline" size={22} color="#2563eb" />
            <View style={styles.guidanceContent}>
              <Text style={styles.guidanceTitle}>Exit Gate</Text>
              <Text style={styles.guidanceText}>
                Use Gate 2 for shortest route
              </Text>
            </View>
          </View>

          <View style={styles.guidanceItem}>
            <Ionicons name="walk-outline" size={22} color="#2563eb" />
            <View style={styles.guidanceContent}>
              <Text style={styles.guidanceTitle}>Walking Path</Text>
              <Text style={styles.guidanceText}>
                Follow the blue signboards, then turn right at the main road
              </Text>
            </View>
          </View>

          <View style={styles.guidanceItem}>
            <Ionicons name="car-outline" size={22} color="#2563eb" />
            <View style={styles.guidanceContent}>
              <Text style={styles.guidanceTitle}>Auto Stand</Text>
              <Text style={styles.guidanceText}>
                Located 50m from metro exit, look for yellow autos
              </Text>
            </View>
          </View>
        </Card>

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>
            Based on community inputs • Last updated: Recently
          </Text>
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
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: '#64748b',
  },
  card: {
    margin: 16,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  infoContent: {
    flex: 1,
    marginLeft: 12,
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1e293b',
    marginBottom: 4,
  },
  infoDescription: {
    fontSize: 14,
    color: '#64748b',
    lineHeight: 20,
  },
  fareContainer: {
    flexDirection: 'row',
    gap: 16,
  },
  fareItem: {
    flex: 1,
    backgroundColor: '#f1f5f9',
    padding: 16,
    borderRadius: 8,
  },
  fareLabel: {
    fontSize: 14,
    color: '#64748b',
    marginBottom: 8,
  },
  fareValue: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1e293b',
    marginBottom: 4,
  },
  fareNote: {
    fontSize: 12,
    color: '#64748b',
  },
  routeText: {
    fontSize: 14,
    color: '#1e293b',
    lineHeight: 24,
  },
  shortcutText: {
    fontSize: 14,
    color: '#1e293b',
    lineHeight: 24,
    marginBottom: 12,
  },
  shortcutNote: {
    fontSize: 12,
    color: '#64748b',
    fontStyle: 'italic',
  },
  guidanceItem: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  guidanceContent: {
    flex: 1,
    marginLeft: 12,
  },
  guidanceTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: '#1e293b',
    marginBottom: 4,
  },
  guidanceText: {
    fontSize: 14,
    color: '#64748b',
    lineHeight: 20,
  },
  footer: {
    padding: 20,
    paddingBottom: 32,
    alignItems: 'center',
  },
  footerText: {
    fontSize: 12,
    color: '#94a3b8',
    fontStyle: 'italic',
  },
});

export default TransportInfoScreen;
