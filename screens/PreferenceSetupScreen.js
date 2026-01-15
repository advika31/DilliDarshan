// PreferenceSetupScreen.js
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { usePreferences } from '../context/PreferencesContext';
import { Button } from '../components/Button';
import { Chip } from '../components/Chip';

const PreferenceSetupScreen = () => {
  const navigation = useNavigation();
  const { setPreferences, setHasCompletedOnboarding } = usePreferences();

  const [userType, setUserType] = useState(null);
  const [timeAvailable, setTimeAvailable] = useState(null);
  const [interests, setInterests] = useState([]);
  const [crowdPreference, setCrowdPreference] = useState(null);
  const [language, setLanguage] = useState(null);
  const [accessibilityMode, setAccessibilityMode] = useState(false);

  const toggleInterest = (interest) => {
    setInterests((prev) =>
      prev.includes(interest)
        ? prev.filter((i) => i !== interest)
        : [...prev, interest]
    );
  };

  const handleSubmit = async () => {
    if (
      !userType ||
      !timeAvailable ||
      interests.length === 0 ||
      !crowdPreference ||
      !language
    ) {
      return;
    }

    await setPreferences({
      userType,
      timeAvailable,
      interests,
      crowdPreference,
      language,
      accessibilityMode,
    });

    await setHasCompletedOnboarding(true);
    navigation.navigate('Main');
  };

  const canSubmit =
    userType &&
    timeAvailable &&
    interests.length > 0 &&
    crowdPreference &&
    language;

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>

        <View style={styles.header}>
          <Text style={styles.title}>Let’s personalize your experience</Text>
          <Text style={styles.subtitle}>
            Help us understand your preferences to provide better recommendations
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>I am a</Text>
          <View style={styles.chipContainer}>
            <Chip label="Tourist" selected={userType === 'tourist'} onPress={() => setUserType('tourist')} />
            <Chip label="Local" selected={userType === 'local'} onPress={() => setUserType('local')} />
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Time available</Text>
          <View style={styles.chipContainer}>
            <Chip label="1–2 hours" selected={timeAvailable === '1-2 hours'} onPress={() => setTimeAvailable('1-2 hours')} />
            <Chip label="Half day" selected={timeAvailable === 'half day'} onPress={() => setTimeAvailable('half day')} />
            <Chip label="Full day" selected={timeAvailable === 'full day'} onPress={() => setTimeAvailable('full day')} />
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Interests</Text>
          <View style={styles.chipContainer}>
            <Chip label="History" selected={interests.includes('history')} onPress={() => toggleInterest('history')} />
            <Chip label="Food" selected={interests.includes('food')} onPress={() => toggleInterest('food')} />
            <Chip label="Culture" selected={interests.includes('culture')} onPress={() => toggleInterest('culture')} />
            <Chip label="Mix" selected={interests.includes('mix')} onPress={() => toggleInterest('mix')} />
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Crowd preference</Text>
          <View style={styles.chipContainer}>
            <Chip label="Quiet" selected={crowdPreference === 'quiet'} onPress={() => setCrowdPreference('quiet')} />
            <Chip label="Lively" selected={crowdPreference === 'lively'} onPress={() => setCrowdPreference('lively')} />
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Language</Text>
          <View style={styles.chipContainer}>
            <Chip label="English" selected={language === 'english'} onPress={() => setLanguage('english')} />
            <Chip label="Hindi" selected={language === 'hindi'} onPress={() => setLanguage('hindi')} />
            <Chip label="Hinglish" selected={language === 'hinglish'} onPress={() => setLanguage('hinglish')} />
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Accessibility</Text>
          <Chip
            label="Accessibility mode"
            selected={accessibilityMode}
            onPress={() => setAccessibilityMode(!accessibilityMode)}
          />
        </View>

        <View style={styles.footer}>
          <Button title="Continue" disabled={!canSubmit} onPress={handleSubmit} />
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
    padding: 20,
    paddingTop: 40,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#1e293b',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#64748b',
    lineHeight: 24,
  },
  section: {
    padding: 20,
    paddingTop: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1e293b',
    marginBottom: 12,
  },
  chipContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  footer: {
    padding: 20,
    paddingBottom: 40,
  },
});

export default PreferenceSetupScreen;
