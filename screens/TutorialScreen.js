// TutorialScreen.js
import React, { useState } from 'react';
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
    title: 'Welcome to DilliDarshan',
    description:
      'Your AI-powered tourism companion for Delhi. Discover hidden gems, plan perfect visits, and experience Delhi like a local.',
  },
  {
    icon: 'chatbubbles',
    title: 'How the AI Chat Works',
    description:
      'Ask questions just like you would on ixigo. “What should I do next?” or “Less crowded places nearby?” Get instant, personalized recommendations.',
  },
  {
    icon: 'trophy',
    title: 'Earn Points & Unlock Stories',
    description:
      "Every interaction earns you points. Use them to unlock immersive cultural stories that bring Delhi's monuments to life.",
  },
  {
    icon: 'compass',
    title: 'Explore Delhi Like a Local',
    description:
      'Get crowd-aware suggestions, local transport tips, and cultural insights. Contribute your knowledge and help others discover Delhi.',
  },
];

const TutorialScreen = () => {
  const navigation = useNavigation();
  const [currentStep, setCurrentStep] = useState(0);

  const handleNext = () => {
    if (currentStep < TUTORIAL_STEPS.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      navigation.navigate('PreferenceSetup');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.skipButton}
          onPress={() => navigation.navigate('PreferenceSetup')}
        >
          <Text style={styles.skipText}>Skip</Text>
        </TouchableOpacity>
      </View>

      {/* Slides */}
      <ScrollView
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
            <View style={styles.iconContainer}>
              <Ionicons name={step.icon} size={64} color="#2563eb" />
            </View>

            <Text style={styles.title}>{step.title}</Text>
            <Text style={styles.description}>{step.description}</Text>
          </View>
        ))}
      </ScrollView>

      {/* Footer */}
      <View style={styles.footer}>
        <View style={styles.dots}>
          {TUTORIAL_STEPS.map((_, index) => (
            <View
              key={index}
              style={[
                styles.dot,
                index === currentStep && styles.activeDot,
              ]}
            />
          ))}
        </View>

        <Button
          title={
            currentStep === TUTORIAL_STEPS.length - 1
              ? 'Get Started'
              : 'Next'
          }
          onPress={handleNext}
          style={styles.button}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 10,
    alignItems: 'flex-end',
  },
  skipButton: {
    padding: 10,
  },
  skipText: {
    color: '#64748b',
    fontSize: 16,
  },
  scrollView: {
    flex: 1,
  },
  stepContainer: {
    width,
    padding: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconContainer: {
    marginBottom: 40,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#1e293b',
    textAlign: 'center',
    marginBottom: 20,
  },
  description: {
    fontSize: 16,
    color: '#64748b',
    textAlign: 'center',
    lineHeight: 24,
  },
  footer: {
    padding: 20,
  },
  dots: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 30,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#cbd5e1',
    marginHorizontal: 4,
  },
  activeDot: {
    backgroundColor: '#2563eb',
    width: 24,
  },
  button: {
    width: '100%',
  },
});

export default TutorialScreen;
