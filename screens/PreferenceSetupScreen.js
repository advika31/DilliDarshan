import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { usePreferences } from "../context/PreferencesContext";
import { Button } from "../components/Button";
import { Ionicons } from "@expo/vector-icons";

const PreferenceSetupScreen = () => {
  const navigation = useNavigation();
  const { setPreferences, setHasCompletedOnboarding } = usePreferences();

  const [userType, setUserType] = useState(null);
  const [timeAvailable, setTimeAvailable] = useState(null);
  const [interests, setInterests] = useState([]);
  const [crowdPreference, setCrowdPreference] = useState(null);
  const [language, setLanguage] = useState(null);
  const [accessibilityMode, setAccessibilityMode] = useState(false);

  const INTEREST_OPTIONS = [
    { id: 'history', label: 'History', icon: 'time-outline' },
    { id: 'food', label: 'Food', icon: 'restaurant-outline' },
    { id: 'culture', label: 'Culture', icon: 'color-palette-outline' },
    { id: 'shopping', label: 'Shopping', icon: 'cart-outline' },
  ];

  const toggleInterest = (interestId) => {
    setInterests((prev) =>
      prev.includes(interestId)
        ? prev.filter((i) => i !== interestId)
        : [...prev, interestId]
    );
  };

  const handleSubmit = async () => {
    if (!userType || !timeAvailable || interests.length === 0) return;

    await setPreferences({
      userType,
      timeAvailable,
      interests,
      crowdPreference,
      language,
      accessibilityMode,
    });
    await setHasCompletedOnboarding(true);
    navigation.navigate("Main");
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 40 }}
      >
        <View style={styles.header}>
          <Text style={styles.title}>Personalize Your Guide</Text>
          <Text style={styles.subtitle}>
            Help DilliDarshan AI tailor the city to your taste.
          </Text>
        </View>

        {/* 1. USER TYPE */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>I am a...</Text>
          <View style={styles.typeRow}>
            <TouchableOpacity 
              style={[styles.typeBtn, userType === 'tourist' && styles.typeBtnActive]}
              onPress={() => setUserType('tourist')}
            >
              <View style={[styles.iconCircle, userType === 'tourist' && styles.iconActive]}>
                <Ionicons name="airplane" size={24} color={userType === 'tourist' ? '#FFF' : '#FF8C00'} />
              </View>
              <Text style={[styles.typeText, userType === 'tourist' && styles.typeTextActive]}>Tourist</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={[styles.typeBtn, userType === 'local' && styles.typeBtnActive]}
              onPress={() => setUserType('local')}
            >
              <View style={[styles.iconCircle, userType === 'local' && styles.iconActive]}>
                <Ionicons name="home" size={24} color={userType === 'local' ? '#FFF' : '#FF8C00'} />
              </View>
              <Text style={[styles.typeText, userType === 'local' && styles.typeTextActive]}>Local</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* 2. INTERESTS */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>I'm interested in...</Text>
          <View style={styles.chipContainer}>
            {INTEREST_OPTIONS.map((opt) => (
              <TouchableOpacity
                key={opt.id}
                style={[styles.chip, interests.includes(opt.id) && styles.chipActive]}
                onPress={() => toggleInterest(opt.id)}
              >
                <Ionicons 
                  name={opt.icon} 
                  size={18} 
                  color={interests.includes(opt.id) ? '#FFF' : '#84593C'} 
                  style={{ marginRight: 8 }}
                />
                <Text style={[styles.chipText, interests.includes(opt.id) && styles.chipTextActive]}>
                  {opt.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* 3. TIME AVAILABLE */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Time Available</Text>
          <View style={styles.row}>
            {['1-2h', 'Half Day', 'Full Day'].map((time) => (
              <TouchableOpacity
                key={time}
                style={[styles.choiceBtn, timeAvailable === time && styles.activeChoice]}
                onPress={() => setTimeAvailable(time)}
              >
                <Text style={[styles.choiceText, timeAvailable === time && styles.activeChoiceText]}>
                  {time}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* 4. CROWD PREFERENCE */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Crowd Preference</Text>
          <View style={styles.row}>
            {["Quiet", "Lively"].map((vibe) => (
              <TouchableOpacity
                key={vibe}
                style={[styles.choiceBtn, crowdPreference === vibe && styles.activeChoice]}
                onPress={() => setCrowdPreference(vibe)}
              >
                <Text style={[styles.choiceText, crowdPreference === vibe && styles.activeChoiceText]}>
                  {vibe}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* 5. LANGUAGE */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Primary Language</Text>
          <View style={styles.row}>
            {["English", "Hindi", "Hinglish"].map((lang) => (
              <TouchableOpacity
                key={lang}
                style={[styles.choiceBtn, language === lang && styles.activeChoice]}
                onPress={() => setLanguage(lang)}
              >
                <Text style={[styles.choiceText, language === lang && styles.activeChoiceText]}>
                  {lang}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* 6. ACCESSIBILITY */}
        <TouchableOpacity
          style={styles.accessRow}
          onPress={() => setAccessibilityMode(!accessibilityMode)}
        >
          <View style={styles.accessTextCol}>
            <Text style={styles.accessTitle}>Accessibility Mode</Text>
            <Text style={styles.accessSub}>
              Prioritize wheelchair-friendly routes.
            </Text>
          </View>
          <Ionicons
            name={accessibilityMode ? "checkbox" : "square-outline"}
            size={24}
            color="#FF8C00"
          />
        </TouchableOpacity>

        <View style={styles.footer}>
          <Button 
            title="Create My Guide" 
            disabled={!userType || !timeAvailable || interests.length === 0}
            onPress={handleSubmit} 
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#FEFBF6" },
  header: { padding: 30, paddingTop: 40 },
  title: { fontSize: 28, fontWeight: "800", color: "#2D241E" },
  subtitle: { fontSize: 16, color: "#84593C", marginTop: 8, fontWeight: "500" },
  section: { paddingHorizontal: 25, marginTop: 25 },
  sectionTitle: {
    fontSize: 17,
    fontWeight: "700",
    color: "#2D241E",
    marginBottom: 15,
  },
  typeRow: { flexDirection: 'row', gap: 15 },
  typeBtn: { 
    flex: 1, backgroundColor: '#FFF', borderRadius: 24, padding: 20, 
    alignItems: 'center', borderWidth: 1, borderColor: '#F0E4D3' 
  },
  typeBtnActive: { backgroundColor: '#FFF9F1', borderColor: '#FF8C00', borderWidth: 2 },
  iconCircle: { width: 50, height: 50, borderRadius: 25, backgroundColor: '#FFF2E0', justifyContent: 'center', alignItems: 'center', marginBottom: 10 },
  iconActive: { backgroundColor: '#FF8C00' },
  typeText: { fontWeight: '700', color: '#84593C' },
  typeTextActive: { color: '#FF8C00' },

  chipContainer: { flexDirection: 'row', flexWrap: 'wrap', gap: 10 },
  chip: { 
    flexDirection: 'row', alignItems: 'center', backgroundColor: '#FFF', 
    paddingHorizontal: 16, paddingVertical: 12, borderRadius: 16, 
    borderWidth: 1, borderColor: '#F0E4D3' 
  },
  chipActive: { backgroundColor: '#FF8C00', borderColor: '#FF8C00' },
  chipText: { fontSize: 14, fontWeight: '600', color: '#84593C' },
  chipTextActive: { color: '#FFF' },

  row: { flexDirection: "row", gap: 10 },
  choiceBtn: {
    flex: 1,
    paddingVertical: 14,
    alignItems: "center",
    backgroundColor: "#FFF",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#F0E4D3",
  },
  activeChoice: { borderColor: "#FF8C00", backgroundColor: "#FFF2E0" },
  choiceText: { color: "#84593C", fontWeight: "700", fontSize: 13 },
  activeChoiceText: { color: "#FF8C00" },
  
  accessRow: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 25,
    marginTop: 30,
    padding: 20,
    backgroundColor: "#FFF",
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#F0E4D3",
  },
  accessTextCol: { flex: 1 },
  accessTitle: { fontSize: 16, fontWeight: "700", color: "#2D241E" },
  accessSub: { fontSize: 13, color: "#84593C", marginTop: 4 },
  footer: { padding: 25, marginTop: 10 },
});

export default PreferenceSetupScreen;