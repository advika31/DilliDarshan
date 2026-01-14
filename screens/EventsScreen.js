import React, { useState } from 'react';
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
import { Chip } from '../components/Chip';

const EVENTS = [
  {
    id: '1',
    title: 'Heritage Walk: Old Delhi',
    date: 'Today, 6:00 PM',
    type: 'heritage walk',
    price: 'Free',
    location: 'Chandni Chowk',
    familyFriendly: true,
    nearMe: true,
  },
  {
    id: '2',
    title: 'Qutub Minar Light Show',
    date: 'Today, 7:30 PM',
    type: 'exhibition',
    price: '₹100',
    location: 'Qutub Minar',
    familyFriendly: true,
    nearMe: false,
  },
  {
    id: '3',
    title: 'Delhi Food Festival',
    date: 'This Week, All Day',
    type: 'festival',
    price: 'Free',
    location: 'India Gate',
    familyFriendly: true,
    nearMe: true,
  },
  {
    id: '4',
    title: 'Mughal Architecture Exhibition',
    date: 'This Week, 10:00 AM - 6:00 PM',
    type: 'exhibition',
    price: '₹50',
    location: 'Red Fort',
    familyFriendly: true,
    nearMe: false,
  },
  {
    id: '5',
    title: 'Evening Cultural Performance',
    date: 'This Week, 5:00 PM',
    type: 'performance',
    price: '₹200',
    location: 'Lotus Temple',
    familyFriendly: true,
    nearMe: false,
  },
];

const EventsScreen = () => {
  const [filterNearMe, setFilterNearMe] = useState(false);
  const [filterFree, setFilterFree] = useState(false);
  const [filterFamilyFriendly, setFilterFamilyFriendly] = useState(true);

  const filteredEvents = EVENTS.filter((event) => {
    if (filterNearMe && !event.nearMe) return false;
    if (filterFree && event.price !== 'Free') return false;
    if (filterFamilyFriendly && !event.familyFriendly) return false;
    return true;
  });

  const getEventIcon = (type ) => {
    switch (type) {
      case 'heritage walk':
        return 'walk';
      case 'exhibition':
        return 'images';
      case 'festival':
        return 'musical-notes';
      case 'performance':
        return 'mic';
      default:
        return 'calendar';
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.header}>
          <Text style={styles.title}>Events & Cultural Discovery</Text>
          <Text style={styles.subtitle}>Discover heritage walks, exhibitions, festivals, and cultural events</Text>
        </View>

        <Card style={styles.card}>
          <Text style={styles.sectionTitle}>Filters</Text>
          <View style={styles.chipContainer}>
            <Chip
              label="Near Me"
              selected={filterNearMe}
              onPress={() => setFilterNearMe(!filterNearMe)}
            />
            <Chip
              label="Free"
              selected={filterFree}
              onPress={() => setFilterFree(!filterFree)}
            />
            <Chip
              label="Family Friendly"
              selected={filterFamilyFriendly}
              onPress={() => setFilterFamilyFriendly(!filterFamilyFriendly)}
            />
          </View>
        </Card>

        <View style={styles.eventsSection}>
          <Text style={styles.sectionTitle}>Today</Text>
          {filteredEvents
            .filter((e) => e.date.includes('Today'))
            .map((event) => (
              <Card key={event.id} style={styles.eventCard}>
                <View style={styles.eventHeader}>
                  <View style={styles.eventIcon}>
                    <Ionicons name={getEventIcon(event.type)} size={20} color="#2563eb" />
                  </View>
                  <View style={styles.eventInfo}>
                    <Text style={styles.eventTitle}>{event.title}</Text>
                    <View style={styles.eventMeta}>
                      <Ionicons name="time-outline" size={14} color="#64748b" />
                      <Text style={styles.eventMetaText}>{event.date}</Text>
                    </View>
                    <View style={styles.eventMeta}>
                      <Ionicons name="location-outline" size={14} color="#64748b" />
                      <Text style={styles.eventMetaText}>{event.location}</Text>
                    </View>
                  </View>
                  <View style={styles.priceBadge}>
                    <Text style={styles.priceText}>{event.price}</Text>
                  </View>
                </View>
                {event.familyFriendly && (
                  <View style={styles.familyBadge}>
                    <Ionicons name="people-outline" size={14} color="#10b981" />
                    <Text style={styles.familyText}>Family-friendly</Text>
                  </View>
                )}
              </Card>
            ))}

          <Text style={styles.sectionTitle}>This Week</Text>
          {filteredEvents
            .filter((e) => e.date.includes('This Week'))
            .map((event) => (
              <Card key={event.id} style={styles.eventCard}>
                <View style={styles.eventHeader}>
                  <View style={styles.eventIcon}>
                    <Ionicons name={getEventIcon(event.type)} size={20} color="#2563eb" />
                  </View>
                  <View style={styles.eventInfo}>
                    <Text style={styles.eventTitle}>{event.title}</Text>
                    <View style={styles.eventMeta}>
                      <Ionicons name="time-outline" size={14} color="#64748b" />
                      <Text style={styles.eventMetaText}>{event.date}</Text>
                    </View>
                    <View style={styles.eventMeta}>
                      <Ionicons name="location-outline" size={14} color="#64748b" />
                      <Text style={styles.eventMetaText}>{event.location}</Text>
                    </View>
                  </View>
                  <View style={styles.priceBadge}>
                    <Text style={styles.priceText}>{event.price}</Text>
                  </View>
                </View>
                {event.familyFriendly && (
                  <View style={styles.familyBadge}>
                    <Ionicons name="people-outline" size={14} color="#10b981" />
                    <Text style={styles.familyText}>Family-friendly</Text>
                  </View>
                )}
              </Card>
            ))}
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
  card: {
    margin: 16,
    marginTop: 16,
  },
  chipContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1e293b',
    marginBottom: 12,
  },
  eventsSection: {
    padding: 16,
    paddingTop: 0,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1e293b',
    marginTop: 16,
    marginBottom: 12,
  },
  eventCard: {
    marginBottom: 12,
  },
  eventHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  eventIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#dbeafe',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  eventInfo: {
    flex: 1,
  },
  eventTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1e293b',
    marginBottom: 8,
  },
  eventMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  eventMetaText: {
    fontSize: 13,
    color: '#64748b',
    marginLeft: 6,
  },
  priceBadge: {
    backgroundColor: '#dbeafe',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8,
  },
  priceText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#2563eb',
  },
  familyBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 12,
    alignSelf: 'flex-start',
  },
  familyText: {
    fontSize: 12,
    color: '#10b981',
    marginLeft: 6,
    fontWeight: '500',
  },
});

export default EventsScreen;



