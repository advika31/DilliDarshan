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

  // 🌐 Fetch nearby services from backend
  const fetchNearbyServices = async (lat, lng) => {
    try {
      console.log("Calling backend with:", lat, lng);

      const hospitalRes = await fetch(
        `${BASE_URL}/emergency/nearby?lat=${lat}&lng=${lng}&type=hospital&radius=5000`
      );
      const policeRes = await fetch(
        `${BASE_URL}/emergency/nearby?lat=${lat}&lng=${lng}&type=police&radius=5000`
      );

      const hospitals = await hospitalRes.json();
      const police = await policeRes.json();

      console.log("Hospitals:", hospitals);
      console.log("Police:", police);

      setServices([...hospitals, ...police]);
    } catch (err) {
      console.log("API error:", err);
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
          <Text style={styles.title}>Safety & Utilities</Text>
          <Text style={styles.subtitle}>24/7 Support for a secure journey</Text>
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

          {!loading &&
            services.map((item, index) => (
              <ServiceItem
                key={item._id || index}
                icon={item.type === "hospital" ? "medkit" : "business"}
                title={item.name}
                lat={item.location.coordinates[1]}
                lng={item.location.coordinates[0]}
              />
            ))}
        </Card>
      </ScrollView>
    </SafeAreaView>
  );
};

const ServiceItem = ({ icon, title, lat, lng }) => {
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
        <Text style={styles.serviceDist}>Tap to navigate</Text>
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

  header: { marginBottom: 25 },
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
