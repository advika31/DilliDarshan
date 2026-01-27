// screens/TutorialScreen.js
import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { Button } from '../components/Button';

const { width } = Dimensions.get('window');

const TUTORIAL_STEPS = [
  {
    icon: 'sparkles',
    title: 'Your AI Concierge',
    description:
      'DilliDarshan AI plans your day based on your interests, the weather, and current crowd levels.',
    color: '#FF8C00'
  },
  {
    icon: 'people',
    title: 'Avoid the Rush',
    description:
      'Our live crowd-tracking helps you discover heritage spots when they are most peaceful.',
    color: '#0284c7'
  },
  {
    icon: 'book',
    title: 'Unlock History',
    description:
      "Earn points as you explore to unlock immersive, audio-guided stories of Delhi's monuments.",
    color: '#84593C'
  },
];

const TutorialScreen = () => {
  const navigation = useNavigation();
  const [currentStep, setCurrentStep] = useState(0);
  const scrollViewRef = useRef(null);

  const handleNext = () => {
    if (currentStep < TUTORIAL_STEPS.length - 1) {
      const nextStep = currentStep + 1;
      setCurrentStep(nextStep);
      if (scrollViewRef.current) {
        scrollViewRef.current.scrollTo({ x: nextStep * width, animated: true });
      }
    } else {
      navigation.navigate('PreferenceSetup');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* SKIP BUTTON */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.navigate('PreferenceSetup')}
        >
          <Text style={styles.skipText}>Skip</Text>
        </TouchableOpacity>
      </View>

      {/* CONTENT SLIDER */}
      <ScrollView
        ref={scrollViewRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={(e) => {
          const index = Math.round(e.nativeEvent.contentOffset.x / width);
          setCurrentStep(index);
        }}
        style={styles.scrollView}
      >
        {TUTORIAL_STEPS.map((step, index) => (
          <View key={index} style={styles.stepContainer}>
            <View style={[styles.iconPorthole, { backgroundColor: `${step.color}15` }]}>
              <Ionicons name={step.icon} size={80} color={step.color} />
            </View>

            <Text style={styles.title}>{step.title}</Text>
            <Text style={styles.description}>{step.description}</Text>
          </View>
        ))}
      </ScrollView>

      {/* FOOTER ACTIONS */}
      <View style={styles.footer}>
        <View style={styles.dotsRow}>
          {TUTORIAL_STEPS.map((_, index) => (
            <View
              key={index}
              style={[
                styles.dot,
                index === currentStep ? styles.activeDot : styles.inactiveDot,
              ]}
            />
          ))}
        </View>

        <Button
          title={currentStep === TUTORIAL_STEPS.length - 1 ? "Let's Begin" : "Next"}
          onPress={handleNext}
          style={styles.mainBtn}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FEFBF6' },
  header: { padding: 20, alignItems: 'flex-end' },
  skipText: { color: '#84593C', fontSize: 16, fontWeight: '700' },
  
  scrollView: { flex: 1 },
  stepContainer: { width, padding: 40, alignItems: 'center', justifyContent: 'center' },
  
  iconPorthole: { 
    width: 180, 
    height: 180, 
    borderRadius: 90, 
    alignItems: 'center', 
    justifyContent: 'center', 
    marginBottom: 50,
    borderWidth: 2,
    borderColor: '#F0E4D3',
    borderStyle: 'dashed'
  },
  
  title: { 
    fontSize: 28, 
    fontWeight: '800', 
    color: '#2D241E', 
    textAlign: 'center', 
    marginBottom: 20,
    letterSpacing: -0.5
  },
  description: { 
    fontSize: 16, 
    color: '#84593C', 
    textAlign: 'center', 
    lineHeight: 26,
    fontWeight: '500'
  },

  footer: { padding: 30, paddingBottom: 50 },
  dotsRow: { flexDirection: 'row', justifyContent: 'center', marginBottom: 40, gap: 8 },
  dot: { height: 8, borderRadius: 4 },
  inactiveDot: { width: 8, backgroundColor: '#F0E4D3' },
  activeDot: { width: 24, backgroundColor: '#FF8C00' },
  mainBtn: { height: 56, borderRadius: 18 }
});

export default TutorialScreen;