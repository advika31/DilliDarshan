// context/PointsContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const PreferencesContext = createContext(undefined);

export const PreferencesProvider = ({ children }) => {
  const [preferences, setPreferencesState] = useState(null);
  const [hasCompletedOnboarding, setHasCompletedOnboardingState] = useState(false);

  useEffect(() => {
    loadPreferences();
  }, []);

  const loadPreferences = async () => {
    try {
      const storedPrefs = await AsyncStorage.getItem('userPreferences');
      const storedOnboarding = await AsyncStorage.getItem('hasCompletedOnboarding');
      
      if (storedPrefs) {
        setPreferencesState(JSON.parse(storedPrefs));
      }
      if (storedOnboarding === 'true') {
        setHasCompletedOnboardingState(true);
      }
    } catch (error) {
      console.error('Error loading preferences:', error);
    }
  };

  const setPreferences = async (prefs) => {
    try {
      await AsyncStorage.setItem('userPreferences', JSON.stringify(prefs));
      setPreferencesState(prefs);
    } catch (error) {
      console.error('Error saving preferences:', error);
    }
  };

  const setHasCompletedOnboarding = async (value) => {
    try {
      await AsyncStorage.setItem('hasCompletedOnboarding', String(value));
      setHasCompletedOnboardingState(value);
    } catch (error) {
      console.error('Error saving onboarding status:', error);
    }
  };

  return (
    <PreferencesContext.Provider
      value={{
        preferences,
        setPreferences,
        hasCompletedOnboarding,
        setHasCompletedOnboarding,
      }}
    >
      {children}
    </PreferencesContext.Provider>
  );
};

export const usePreferences = () => {
  const context = useContext(PreferencesContext);
  if (!context) {
    throw new Error('usePreferences must be used within PreferencesProvider');
  }
  return context;
};
