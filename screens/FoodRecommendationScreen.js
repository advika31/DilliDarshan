import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { Card } from '../components/Card';
import { Chip } from '../components/Chip';

const FOOD_PLACES = [
  {
    id: '1',
    name: 'Paranthe Wali Gali',
    description: 'Famous for stuffed parathas, a Delhi street food legend',
    distance: '0.5 km',
    budget: '₹',
    mood: ['chill', 'street food'],
    whyNow: 'Perfect for a relaxed evening snack',
  },
  {
    id: '2',
    name: "Karim's Restaurant",
    description: 'Historic Mughlai cuisine, over 100 years old',
    distance: '1.2 km',
    budget: '₹₹',
    mood: ['energetic', 'culture'],
    whyNow: 'Great for lunch, authentic Delhi experience',
  },
  {
    id: '3',
    name: 'Indian Accent',
    description: 'Modern Indian fine dining, award-winning',
    distance: '2.5 km',
    budget: '₹₹₹',
    mood: ['chill'],
    whyNow: 'Perfect for a special dinner',
  },
  {
    id: '4',
    name: 'Chandni Chowk Street Food',
    description: 'Chaats, jalebis, and local favorites',
    distance: '1.8 km',
    budget: '₹',
    mood: ['energetic', 'street food'],
    whyNow: 'Best in the evening, vibrant atmosphere',
  },
  {
    id: '5',
    name: 'Bukhara',
    description: 'Legendary North Indian restaurant',
    distance: '3.0 km',
    budget: '₹₹₹',
    mood: ['chill'],
    whyNow: 'Ideal for a luxurious dining experience',
  },
];

const FoodRecommendationScreen = () => {
  const [selectedMood, setSelectedMood] = useState(null);
  const [selectedBudget, setSelectedBudget] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);

  const filteredPlaces = FOOD_PLACES.filter(place => {
    if (selectedMood && !place.mood.includes(selectedMood)) return false;
    if (selectedBudget && place.budget !== selectedBudget) return false;
    return true;
  });

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>

        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Food & Mood Recommendations</Text>
          <Text style={styles.subtitle}>
            Discover the best places to eat based on your mood and budget
          </Text>
        </View>

        {/* Time */}
        <Card style={styles.card}>
          <View style={styles.chipContainer}>
            <Chip
              label="Breakfast"
              selected={selectedTime === 'breakfast'}
              onPress={() =>
                setSelectedTime(selectedTime === 'breakfast' ? null : 'breakfast')
              }
            />
            <Chip
              label="Lunch"
              selected={selectedTime === 'lunch'}
              onPress={() =>
                setSelectedTime(selectedTime === 'lunch' ? null : 'lunch')
              }
            />
            <Chip
              label="Dinner"
              selected={selectedTime === 'dinner'}
              onPress={() =>
                setSelectedTime(selectedTime === 'dinner' ? null : 'dinner')
              }
            />
            <Chip
              label="Snacks"
              selected={selectedTime === 'snacks'}
              onPress={() =>
                setSelectedTime(selectedTime === 'snacks' ? null : 'snacks')
              }
            />
          </View>
        </Card>

        {/* Mood */}
        <Card style={styles.card}>
          <View style={styles.chipContainer}>
            <Chip
              label="Chill"
              selected={selectedMood === 'chill'}
              onPress={() =>
                setSelectedMood(selectedMood === 'chill' ? null : 'chill')
              }
            />
            <Chip
              label="Energetic"
              selected={selectedMood === 'energetic'}
              onPress={() =>
                setSelectedMood(
                  selectedMood === 'energetic' ? null : 'energetic'
                )
              }
            />
            <Chip
              label="Street Food"
              selected={selectedMood === 'street food'}
              onPress={() =>
                setSelectedMood(
                  selectedMood === 'street food' ? null : 'street food'
                )
              }
            />
          </View>
        </Card>

        {/* Budget */}
        <Card style={styles.card}>
          <View style={styles.chipContainer}>
            <Chip
              label="₹"
              selected={selectedBudget === '₹'}
              onPress={() =>
                setSelectedBudget(selectedBudget === '₹' ? null : '₹')
              }
            />
            <Chip
              label="₹₹"
              selected={selectedBudget === '₹₹'}
              onPress={() =>
                setSelectedBudget(selectedBudget === '₹₹' ? null : '₹₹')
              }
            />
            <Chip
              label="₹₹₹"
              selected={selectedBudget === '₹₹₹'}
              onPress={() =>
                setSelectedBudget(selectedBudget === '₹₹₹' ? null : '₹₹₹')
              }
            />
          </View>
        </Card>

        {/* Results */}
        <View style={styles.resultsSection}>
          <Text style={styles.resultsTitle}>
            Recommendations ({filteredPlaces.length})
          </Text>

          {filteredPlaces.map(place => (
            <Card key={place.id} style={styles.placeCard}>
              <View style={styles.placeHeader}>
                <View style={styles.placeInfo}>
                  <Text style={styles.placeName}>{place.name}</Text>
                  <Text style={styles.placeDescription}>
                    {place.description}
                  </Text>
                </View>

                <View style={styles.budgetBadge}>
                  <Text style={styles.budgetText}>{place.budget}</Text>
                </View>
              </View>

              <View style={styles.placeFooter}>
                <View style={styles.distanceInfo}>
                  <Ionicons
                    name="location-outline"
                    size={16}
                    color="#64748b"
                  />
                  <Text style={styles.distanceText}>{place.distance}</Text>
                </View>

                <Text style={styles.whyNow}>{place.whyNow}</Text>
              </View>
            </Card>
          ))}
        </View>

      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f8fafc' },
  scrollView: { flex: 1 },
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
  card: {
    margin: 16,
    marginTop: 16,
  },
  chipContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  resultsSection: {
    padding: 16,
    paddingTop: 0,
  },
  resultsTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1e293b',
    marginBottom: 16,
  },
  placeCard: {
    marginBottom: 12,
  },
  placeHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  placeInfo: {
    flex: 1,
    marginRight: 12,
  },
  placeName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1e293b',
    marginBottom: 4,
  },
  placeDescription: {
    fontSize: 14,
    color: '#64748b',
    lineHeight: 20,
  },
  budgetBadge: {
    backgroundColor: '#dbeafe',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  budgetText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2563eb',
  },
  placeFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  distanceInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  distanceText: {
    fontSize: 13,
    color: '#64748b',
    marginLeft: 6,
  },
  whyNow: {
    fontSize: 13,
    color: '#2563eb',
    fontWeight: '500',
    fontStyle: 'italic',
  },
});

export default FoodRecommendationScreen;
