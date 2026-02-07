// screens/SafetyUtilityScreen.js

import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Linking,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { Ionicons } from "@expo/vector-icons";
import * as Location from "expo-location";

import { Card } from "../components/Card";
import { BASE_URL } from "../constants/api";

const SafetyUtilityScreen = () => {

  console.log("✅ SafetyUtilityScreen rendered");

  const [location, setLocation] = useState(null);
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  // 📍 Fetch user location
  const getUserLocation = async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      alert("Location permission is required");
      return;
    }

    const loc = await Location.getCurrentPositionAsync({});
    setLocation({
      lat: loc.coords.latitude,
      lng: loc.coords.longitude,
    });
  };

  //🌐 Fetch nearby services from backend

  const fetchNearbyServices = async (lat, lng) => {
    try {
      console.log("Calling backend with:", lat, lng);
      console.log("Full URL:", `${BASE_URL}/emergency/nearby`);

      const res = await fetch(
        `${BASE_URL}/emergency/nearby`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ lat, lng }),
        }
      );

      console.log("Response status:", res.status);

      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }

      const data = await res.json();

      console.log("Combined services:", data);

      // ✅ backend already merged
      setServices(data.results || []);

    } catch (err) {
      console.log("API error:", err.message);
      console.log("Full error:", err);
      setServices([]);
    } finally {
      setLoading(false);
    }
  };

  // 🔄 On screen load
  useEffect(() => {
    getUserLocation();
  }, []);

  // 🔄 When location is available
  useEffect(() => {
    if (location) {
      fetchNearbyServices(location.lat, location.lng);
    }
  }, [location]);

  return (
    <SafeAreaView style={styles.container}>


      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <View>
            <Text style={styles.title}>Safety & Utilities</Text>
            <Text style={styles.subtitle}>24/7 Support for a secure journey</Text>
          </View>
          <TouchableOpacity
            style={styles.refreshBtn}
            onPress={() => location && fetchNearbyServices(location.lat, location.lng)}
            disabled={!location || loading}
          >
            <Ionicons name="refresh" size={20} color="#FF8C00" />
            <Text style={styles.refreshBtnText}>Refresh</Text>
          </TouchableOpacity>
        </View>

        {/* EMERGENCY QUICK DIAL */}
        <View style={styles.sosRow}>
          <TouchableOpacity
            style={[styles.sosBtn, { backgroundColor: "#ef4444" }]}
            onPress={() => Linking.openURL("tel:112")}
          >
            <Ionicons name="shield" size={28} color="#FFF" />
            <Text style={styles.sosText}>Police (112)</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.sosBtn, { backgroundColor: "#2563eb" }]}
            onPress={() => Linking.openURL("tel:102")}
          >
            <Ionicons name="medical" size={28} color="#FFF" />
            <Text style={styles.sosText}>Ambulance</Text>
          </TouchableOpacity>
        </View>

        {/* NEARBY SERVICES */}
        <Text style={styles.sectionTitle}>Nearby Assistance</Text>

        <Card style={styles.serviceCard}>
          {loading && (
            <Text style={{ padding: 10, color: "#84593C" }}>
              Fetching nearby services...
            </Text>
          )}

          {!loading && services.length === 0 && (
            <Text style={{ padding: 10, color: "#84593C" }}>
              No nearby services found
            </Text>
          )}

          {!loading && services.length > 0 && (
            <>
              {/* HOSPITALS SECTION */}
              <View style={styles.categorySection}>
                <View style={styles.categoryHeader}>
                  <View style={styles.categoryHeaderLeft}>
                    <Ionicons name="medkit-outline" size={20} color="#2563eb" />
                    <Text style={styles.categoryTitle}>Hospitals</Text>
                  </View>
                  <View style={styles.countBadge}>
                    <Text style={styles.countText}>
                      {services.filter(item => item.type === "hospital").length}
                    </Text>
                  </View>
                </View>
                {services
                  .filter(item => item.type === "hospital")
                  .map((item, index) => (
                    <ServiceItem
                      key={`hospital-${index}`}
                      icon="medkit-outline"
                      title={item.name}
                      lat={item.lat}
                      lng={item.lng}
                    />
                  ))}
              </View>

              {/* POLICE STATIONS SECTION */}
              <View style={styles.categorySection}>
                <View style={styles.categoryHeader}>
                  <View style={styles.categoryHeaderLeft}>
                    <Ionicons name="shield-outline" size={20} color="#dc2626" />
                    <Text style={styles.categoryTitle}>Police Stations</Text>
                  </View>
                  <View style={styles.countBadge}>
                    <Text style={styles.countText}>
                      {services.filter(item => item.type === "police").length}
                    </Text>
                  </View>
                </View>
                {services
                  .filter(item => item.type === "police")
                  .map((item, index) => (
                    <ServiceItem
                      key={`police-${index}`}
                      icon="shield-outline"
                      title={item.name}
                      lat={item.lat}
                      lng={item.lng}
                    />
                  ))}
              </View>
            </>
          )}
        </Card>
      </ScrollView>
    </SafeAreaView>
  );
};

const ServiceItem = ({ icon, title, lat, lng, distance_km }) => {
  const handleNavigate = () => {
    const url = `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`;
    Linking.openURL(url);
  };

  return (
    <View style={styles.row}>
      <View style={styles.iconCircle}>
        <Ionicons name={icon} size={20} color="#FF8C00" />
      </View>

      <View style={styles.col}>
        <Text style={styles.serviceName}>{title}</Text>
        <Text style={styles.serviceDist}>
          {distance_km ? `${distance_km} km away` : 'Tap to navigate'}
        </Text>
      </View>

      <TouchableOpacity style={styles.navCircle} onPress={handleNavigate}>
        <Ionicons name="navigate" size={18} color="#FF8C00" />
      </TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#FEFBF6" },
  scrollContent: { padding: 20 },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },

  refreshBtn: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFF2E0",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
  },

  refreshBtnText: {
    marginLeft: 6,
    fontSize: 14,
    fontWeight: "600",
    color: "#FF8C00",
  },

  categorySection: {
    marginBottom: 20,
  },

  categoryHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
    paddingBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#E5E7EB",
  },

  categoryHeaderLeft: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },

  countBadge: {
    backgroundColor: "#F3F4F6",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },

  countText: {
    fontSize: 12,
    fontWeight: "600",
    color: "#6B7280",
  },

  categoryTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#2D241E",
    marginLeft: 8,
  },
  title: { fontSize: 28, fontWeight: "800", color: "#2D241E" },
  subtitle: { fontSize: 15, color: "#84593C", marginTop: 4, fontWeight: "500" },

  sosRow: { flexDirection: "row", gap: 15, marginBottom: 30 },
  sosBtn: {
    flex: 1,
    height: 100,
    borderRadius: 24,
    alignItems: "center",
    justifyContent: "center",
    elevation: 4,
  },
  sosText: { color: "#FFF", fontWeight: "800", marginTop: 8, fontSize: 14 },

  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#2D241E",
    marginBottom: 15,
  },

  serviceCard: { padding: 10 },
  row: { flexDirection: "row", alignItems: "center" },

  iconCircle: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: "#FFF2E0",
    alignItems: "center",
    justifyContent: "center",
  },

  col: { flex: 1, marginLeft: 15 },

  serviceName: { fontSize: 15, fontWeight: "700", color: "#2D241E" },
  serviceDist: { fontSize: 12, color: "#84593C", marginTop: 2 },

  navCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "#FFF2E0",
    alignItems: "center",
    justifyContent: "center",
  },
});


export default SafetyUtilityScreen;
