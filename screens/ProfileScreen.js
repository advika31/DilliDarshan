import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { usePoints } from '../context/PointsContext';
import { usePreferences } from '../context/PreferencesContext';
import { Card } from '../components/Card';
import { Button } from '../components/Button';

const ProfileScreen = () => {
  const navigation = useNavigation();
  const { points } = usePoints();
  const { preferences, setHasCompletedOnboarding } = usePreferences();

  const nextUnlockThreshold = 50;
  const progress = Math.min((points / nextUnlockThreshold) * 100, 100);

  const handleViewTutorial = async () => {
    await setHasCompletedOnboarding(false);
    navigation.navigate('Tutorial');
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>

        {/* Header */}
        <View style={styles.header}>
          <View style={styles.avatar}>
            <Ionicons name="person" size={40} color="#2563eb" />
          </View>

          <Text style={styles.name}>Guest User</Text>

          <View style={styles.pointsContainer}>
            <Ionicons name="star" size={20} color="#92400e" />
            <Text style={styles.pointsText}>{points} points</Text>
          </View>
        </View>

        {/* Progress */}
        <View style={styles.progressSection}>
          <Text style={styles.progressLabel}>
            Progress to next unlock ({nextUnlockThreshold} points)
          </Text>

          <View style={styles.progressBar}>
            <View style={[styles.progressFill, { width: `${progress}%` }]} />
          </View>

          <Text style={styles.progressText}>
            {points} / {nextUnlockThreshold} points
          </Text>
        </View>

        {/* Preferences */}
        <Card style={styles.card}>
          {preferences ? (
            <View style={styles.preferencesList}>
              <View style={styles.preferenceItem}>
                <Text style={styles.preferenceLabel}>User Type</Text>
                <Text style={styles.preferenceValue}>
                  {preferences.userType}
                </Text>
              </View>

              <View style={styles.preferenceItem}>
                <Text style={styles.preferenceLabel}>Time Available</Text>
                <Text style={styles.preferenceValue}>
                  {preferences.timeAvailable}
                </Text>
              </View>

              <View style={styles.preferenceItem}>
                <Text style={styles.preferenceLabel}>Interests</Text>
                <Text style={styles.preferenceValue}>
                  {preferences.interests.join(', ')}
                </Text>
              </View>

              <View style={styles.preferenceItem}>
                <Text style={styles.preferenceLabel}>Crowd Preference</Text>
                <Text style={styles.preferenceValue}>
                  {preferences.crowdPreference}
                </Text>
              </View>

              <View style={styles.preferenceItem}>
                <Text style={styles.preferenceLabel}>Language</Text>
                <Text style={styles.preferenceValue}>
                  {preferences.language}
                </Text>
              </View>

              <View style={styles.preferenceItem}>
                <Text style={styles.preferenceLabel}>Accessibility Mode</Text>
                <Text style={styles.preferenceValue}>
                  {preferences.accessibilityMode ? 'Enabled' : 'Disabled'}
                </Text>
              </View>
            </View>
          ) : (
            <Text style={styles.noPreferences}>No preferences saved</Text>
          )}
        </Card>

        {/* Actions */}
        <View style={styles.actionsSection}>
          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => navigation.navigate('Contribution')}
          >
            <Ionicons name="time-outline" size={22} color="#2563eb" />
            <Text style={styles.actionText}>Contribution History</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => navigation.navigate('FoodRecommendation')}
          >
            <Ionicons name="restaurant-outline" size={22} color="#2563eb" />
            <Text style={styles.actionText}>Food Recommendations</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => navigation.navigate('Events')}
          >
            <Ionicons name="calendar-outline" size={22} color="#2563eb" />
            <Text style={styles.actionText}>Events & Culture</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => navigation.navigate('AdminDashboard')}
          >
            <Ionicons name="analytics-outline" size={22} color="#2563eb" />
            <Text style={styles.actionText}>Admin Dashboard</Text>
          </TouchableOpacity>
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <Button title="View Tutorial" onPress={handleViewTutorial} />
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
    padding: 24,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#e2e8f0',
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#dbeafe',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  name: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1e293b',
    marginBottom: 12,
  },
  pointsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fef3c7',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  pointsText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#92400e',
    marginLeft: 8,
  },
  progressSection: {
    backgroundColor: '#ffffff',
    padding: 20,
    marginTop: 16,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#e2e8f0',
  },
  progressLabel: {
    fontSize: 14,
    color: '#64748b',
    marginBottom: 8,
  },
  progressBar: {
    height: 8,
    backgroundColor: '#e2e8f0',
    borderRadius: 4,
    overflow: 'hidden',
    marginBottom: 8,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#2563eb',
  },
  progressText: {
    fontSize: 12,
    color: '#64748b',
    textAlign: 'center',
  },
  card: {
    margin: 16,
  },
  preferencesList: {
    gap: 12,
  },
  preferenceItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#f1f5f9',
  },
  preferenceLabel: {
    fontSize: 14,
    color: '#64748b',
  },
  preferenceValue: {
    fontSize: 14,
    color: '#1e293b',
    fontWeight: '600',
  },
  noPreferences: {
    fontSize: 14,
    color: '#64748b',
    fontStyle: 'italic',
  },
  actionsSection: {
    backgroundColor: '#ffffff',
    marginTop: 16,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#e2e8f0',
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f1f5f9',
  },
  actionText: {
    flex: 1,
    fontSize: 16,
    color: '#1e293b',
    marginLeft: 12,
  },
  footer: {
    padding: 16,
    paddingBottom: 32,
  },
});

export default ProfileScreen;
