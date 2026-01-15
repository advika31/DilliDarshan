// ExploreScreen.js
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { usePoints } from '../context/PointsContext';
import { PLACES } from '../constants/places';

const ExploreScreen = () => {
  const navigation = useNavigation();
  const { addPoints } = usePoints();

  const handlePlacePress = (placeId) => {
    addPoints(5, 'Viewed place details');
    navigation.navigate('PlaceDetails', { placeId });
  };

  const renderPlace = ({ item }) => {
    const crowdColor =
      item.crowdLevel === 'low'
        ? '#10b981'
        : item.crowdLevel === 'medium'
        ? '#f59e0b'
        : '#ef4444';

    return (
      <TouchableOpacity
        style={styles.placeCard}
        onPress={() => handlePlacePress(item.id)}
        activeOpacity={0.7}
      >
        <View style={styles.placeHeader}>
          <View style={styles.placeInfo}>
            <Text style={styles.placeName}>{item.name}</Text>
            <Text style={styles.placeHook}>{item.culturalHook}</Text>
          </View>

          <View
            style={[
              styles.crowdBadge,
              { backgroundColor: `${crowdColor}20` },
            ]}
          >
            <View
              style={[
                styles.crowdDot,
                { backgroundColor: crowdColor },
              ]}
            />
            <Text style={[styles.crowdText, { color: crowdColor }]}>
              {item.crowdLevel}
            </Text>
          </View>
        </View>

        <View style={styles.placeFooter}>
          <View style={styles.metroInfo}>
            <Ionicons name="train-outline" size={16} color="#64748b" />
            <Text style={styles.metroText}>{item.nearestMetro}</Text>
          </View>

          <View style={styles.distanceInfo}>
            <Ionicons name="walk-outline" size={16} color="#64748b" />
            <Text style={styles.distanceText}>{item.walkingDistance}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Explore Delhi</Text>
        <Text style={styles.subtitle}>
          Discover monuments, markets, and cultural sites
        </Text>
      </View>

      <FlatList
        data={PLACES}
        renderItem={renderPlace}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  header: {
    padding: 20,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#e2e8f0',
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#1e293b',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: '#64748b',
  },
  listContent: {
    padding: 16,
  },
  placeCard: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
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
    fontSize: 20,
    fontWeight: '600',
    color: '#1e293b',
    marginBottom: 4,
  },
  placeHook: {
    fontSize: 14,
    color: '#64748b',
    lineHeight: 20,
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
  placeFooter: {
    flexDirection: 'row',
    gap: 16,
  },
  metroInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  metroText: {
    fontSize: 13,
    color: '#64748b',
    marginLeft: 6,
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
});

export default ExploreScreen;
