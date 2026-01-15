// screens/TransportInfoScreen.js
import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Linking,
  Image,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRoute, useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { Card } from "../components/Card";
import { getPlaceById } from "../constants/places";

const TransportInfoScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { placeId } = route.params || {};
  const place = getPlaceById(placeId);

  if (!place) return <View style={styles.container}><Text>Place not found</Text></View>;

  return (
    <SafeAreaView style={styles.container}>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        
        {/* PRIMARY METRO CARD */}
        <Card style={styles.metroCard}>
          <View style={styles.row}>
            <View style={styles.metroIcon}>
              <Ionicons name="train" size={28} color="#FFF" />
            </View>
            <View style={styles.col}>
              <Text style={styles.metroName}>{place.nearestMetro}</Text>
              <Text style={styles.metroLine}>Yellow Line • Exit Gate 2</Text>
            </View>
          </View>
          <View style={styles.divider} />
          <View style={styles.row}>
            <Ionicons name="walk-outline" size={18} color="#84593C" />
            <Text style={styles.walkText}>{place.walkingDistance} walk to {place.name}</Text>
          </View>
        </Card>

        {/* FAIR FARE GUIDE (ANTI-SCAM) */}
        <Text style={styles.sectionTitle}>Fair Fare Guide</Text>
        <Card style={styles.fareCard}>
          <Text style={styles.fareSub}>Estimated rates from {place.nearestMetro.split(' ')[0]}</Text>
          <View style={styles.fareGrid}>
            <View style={styles.fareItem}>
              <Ionicons name="car-outline" size={22} color="#FF8C00" />
              <Text style={styles.fareType}>Auto</Text>
              <Text style={styles.farePrice}>₹40-60</Text>
            </View>
            <View style={styles.fareItem}>
              <Ionicons name="bicycle-outline" size={22} color="#FF8C00" />
              <Text style={styles.fareType}>E-Rickshaw</Text>
              <Text style={styles.farePrice}>₹20</Text>
            </View>
            <View style={styles.fareItem}>
              <Ionicons name="phone-portrait-outline" size={22} color="#FF8C00" />
              <Text style={styles.fareType}>Uber/Ola</Text>
              <Text style={styles.farePrice}>₹80+</Text>
            </View>
          </View>
          <View style={styles.tipBox}>
            <Ionicons name="bulb" size={16} color="#92400e" />
            <Text style={styles.tipText}>Ask the driver to use the 'Meter' or agree on fare before boarding.</Text>
          </View>
        </Card>

        {/* LAST-MILE OPTIONS */}
        <Text style={styles.sectionTitle}>Last-Mile Options</Text>
        <TouchableOpacity 
           style={styles.yuluCard}
           onPress={() => Linking.openURL("https://www.yulu.bike/")}
        >
          <View style={styles.row}>
             <View style={styles.yuluIcon}><Ionicons name="bicycle" size={24} color="#FFF" /></View>
             <View style={styles.col}>
                <Text style={styles.yuluTitle}>Ride a Yulu Bike</Text>
                <Text style={styles.yuluSub}>Available at {place.nearestMetro.split(' ')[0]} Metro Stn</Text>
             </View>
             <Ionicons name="open-outline" size={20} color="#16a34a" />
          </View>
        </TouchableOpacity>

        {/* SAFETY ADVISORY */}
        <View style={styles.safetySection}>
           <Card style={styles.safetyCard}>
              <View style={styles.row}>
                 <Ionicons name="shield-checkmark" size={22} color="#10b981" />
                 <Text style={styles.safetyTitle}>Safety Note</Text>
              </View>
              <Text style={styles.safetyDesc}>
                 Stick to main roads. The route from the metro to {place.name} is well-lit and busy until 9:00 PM.
              </Text>
           </Card>
        </View>

      </ScrollView>

      {/* FOOTER ACTION */}
      <View style={styles.footer}>
         <TouchableOpacity 
            style={styles.mapBtn}
            onPress={() => Linking.openURL(`http://googleusercontent.com/maps.google.com/?q=${place.name}`)}
         >
            <Ionicons name="map" size={20} color="#FFF" />
            <Text style={styles.mapBtnText}>Open Live Navigation</Text>
         </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#FEFBF6" },
  header: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    justifyContent: 'space-between', 
    padding: 20, 
    backgroundColor: '#FFF', 
    borderBottomWidth: 1, 
    borderBottomColor: '#F0E4D3' 
  },
  headerTitle: { fontSize: 18, fontWeight: '800', color: '#2D241E' },
  scrollContent: { padding: 20 },
  
  sectionTitle: { fontSize: 18, fontWeight: '700', color: '#2D241E', marginTop: 25, marginBottom: 15 },

  metroCard: { backgroundColor: '#FFF9F1', padding: 20 },
  metroIcon: { width: 50, height: 50, borderRadius: 15, backgroundColor: '#2563eb', alignItems: 'center', justifyContent: 'center' },
  metroName: { fontSize: 18, fontWeight: '800', color: '#2D241E' },
  metroLine: { fontSize: 12, color: '#84593C', fontWeight: '600', marginTop: 2 },
  divider: { height: 1, backgroundColor: '#F0E4D3', marginVertical: 15 },
  walkText: { marginLeft: 10, fontSize: 14, color: '#84593C', fontWeight: '600' },

  fareCard: { padding: 20 },
  fareSub: { fontSize: 12, color: '#84593C', fontWeight: '700', marginBottom: 15, textTransform: 'uppercase' },
  fareGrid: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20 },
  fareItem: { alignItems: 'center', width: '30%' },
  fareType: { fontSize: 11, color: '#84593C', marginTop: 8, fontWeight: '600' },
  farePrice: { fontSize: 14, color: '#2D241E', fontWeight: '800', marginTop: 2 },
  tipBox: { flexDirection: 'row', backgroundColor: '#FEF3C7', padding: 12, borderRadius: 12, gap: 10, alignItems: 'center' },
  tipText: { flex: 1, fontSize: 12, color: '#92400E', fontWeight: '600', lineHeight: 18 },

  yuluCard: { backgroundColor: '#F0FDF4', borderRadius: 20, padding: 16, borderWidth: 1, borderColor: '#DCFCE7', marginVertical: 10 },
  yuluIcon: { width: 44, height: 44, borderRadius: 12, backgroundColor: '#16a34a', alignItems: 'center', justifyContent: 'center', marginRight: 12 },
  yuluTitle: { fontSize: 16, fontWeight: '800', color: '#14532D' },
  yuluSub: { fontSize: 12, color: '#16a34a', fontWeight: '600' },

  safetyCard: { backgroundColor: '#F0FDFA', borderColor: '#CCFBF1' },
  safetyTitle: { fontSize: 16, fontWeight: '800', color: '#134E4A', marginLeft: 10 },
  safetyDesc: { fontSize: 13, color: '#134E4A', lineHeight: 20, marginTop: 10, fontWeight: '500' },

  footer: { padding: 20, backgroundColor: '#FFF', borderTopWidth: 1, borderTopColor: '#F0E4D3' },
  mapBtn: { backgroundColor: '#FF8C00', height: 56, borderRadius: 18, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 10 },
  mapBtnText: { color: '#FFF', fontSize: 16, fontWeight: '800' },
  
  row: { flexDirection: 'row', alignItems: 'center' },
  col: { flex: 1, marginLeft: 15 },
});

export default TransportInfoScreen;