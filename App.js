import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { PreferencesProvider } from './context/PreferencesContext';
import { PointsProvider } from './context/PointsContext';
import AppNavigator from './navigation/AppNavigator';

export default function App() {
  return (
    <PreferencesProvider>
      <PointsProvider>
        <StatusBar style="auto" />
        <AppNavigator />
      </PointsProvider>
    </PreferencesProvider>
  );
}
