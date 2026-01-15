// SafetyUtilityScreen.js
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { Card } from '../components/Card';

const SafetyUtilityScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>

        {/* HEADER */}
        <View style={styles.header}>
          <Text style={styles.title}>Safety & Utilities</Text>
          <Text style={styles.subtitle}>
            Your invisible travel safety companion
          </Text>
        </View>

        {/* NEARBY HOSPITALS */}
        <Card style={styles.card}>
          <View style={styles.cardHeader}>
            <Ionicons name="medkit-outline" size={22} color="#dc2626" />
            <Text style={styles.cardTitle}>Nearby Hospitals</Text>
          </View>

          <Text style={styles.item}>• AIIMS – 1.4 km</Text>
          <Text style={styles.item}>• Safdarjung Hospital – 2.2 km</Text>

          <TouchableOpacity style={styles.actionButton}>
            <Text style={styles.actionText}>Navigate</Text>
          </TouchableOpacity>
        </Card>

        {/* NEARBY POLICE */}
        <Card style={styles.card}>
          <View style={styles.cardHeader}>
            <Ionicons name="shield-checkmark-outline" size={22} color="#2563eb" />
            <Text style={styles.cardTitle}>Nearby Police Stations</Text>
          </View>

          <Text style={styles.item}>• Connaught Place PS – 0.8 km</Text>
          <Text style={styles.item}>• Parliament Street PS – 1.6 km</Text>

          <TouchableOpacity style={styles.actionButton}>
            <Text style={styles.actionText}>Call Police</Text>
          </TouchableOpacity>
        </Card>

        {/* WOMEN SAFE ROUTES */}
        <Card style={styles.card}>
          <View style={styles.cardHeader}>
            <Ionicons name="female-outline" size={22} color="#db2777" />
            <Text style={styles.cardTitle}>Women-Safe Routes</Text>
          </View>

          <Text style={styles.item}>
            • Prefer metro-connected roads
          </Text>
          <Text style={styles.item}>
            • Avoid inner lanes after 9 PM
          </Text>
          <Text style={styles.item}>
            • Well-lit route via Inner Circle recommended
          </Text>
        </Card>

        {/* NIGHT TRAVEL GUIDANCE */}
        <Card style={styles.card}>
          <View style={styles.cardHeader}>
            <Ionicons name="moon-outline" size={22} color="#0f172a" />
            <Text style={styles.cardTitle}>Night Travel Guidance</Text>
          </View>

          <Text style={styles.item}>
            • Metro runs till ~11 PM
          </Text>
          <Text style={styles.item}>
            • Prefer app-based rides after dark
          </Text>
          <Text style={styles.item}>
            • Avoid isolated heritage zones late night
          </Text>
        </Card>

      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f8fafc' },

  header: {
    padding: 20,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderColor: '#e2e8f0',
  },
  title: {
    fontSize: 26,
    fontWeight: '700',
    color: '#1e293b',
  },
  subtitle: {
    fontSize: 14,
    color: '#64748b',
    marginTop: 4,
  },

  card: { margin: 16 },

  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
    color: '#1e293b',
  },

  item: {
    fontSize: 14,
    color: '#475569',
    marginBottom: 6,
  },

  actionButton: {
    marginTop: 10,
    backgroundColor: '#2563eb',
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  actionText: {
    color: '#ffffff',
    fontWeight: '600',
  },
});

export default SafetyUtilityScreen;
