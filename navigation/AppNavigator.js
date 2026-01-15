//  navigation/AppNavigator.js
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import { usePreferences } from "../context/PreferencesContext";

import TutorialScreen from "../screens/TutorialScreen";
import PreferenceSetupScreen from "../screens/PreferenceSetupScreen";
import HomeScreen from "../screens/HomeScreen";
import ChatScreen from "../screens/ChatScreen";
import ExploreScreen from "../screens/ExploreScreen";
import ProfileScreen from "../screens/ProfileScreen";
import PlaceDetailsScreen from "../screens/PlaceDetailsScreen";
import PersonalizedPlanScreen from "../screens/PersonalizedPlanScreen";
import StorytellingScreen from "../screens/StorytellingScreen";
import TransportInfoScreen from "../screens/TransportInfoScreen";
import FoodRecommendationScreen from "../screens/FoodRecommendationScreen";
import EventsScreen from "../screens/EventsScreen";
import ContributionScreen from "../screens/ContributionScreen";
import AdminDashboardScreen from "../screens/AdminDashboardScreen";
import SafetyUtilityScreen from "../screens/SafetyUtilityScreen";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const MainTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "#2563eb",
        tabBarInactiveTintColor: "#64748b",
        tabBarStyle: {
          paddingBottom: 5,
          paddingTop: 5,
          height: 60,
        },
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Chat"
        component={ChatScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="chatbubbles" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Explore"
        component={ExploreScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="compass" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person" size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const AppNavigator = () => {
  const { hasCompletedOnboarding } = usePreferences();

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{ headerShown: false }}
        initialRouteName={hasCompletedOnboarding ? "Main" : "Tutorial"}
      >
        <Stack.Screen name="Tutorial" component={TutorialScreen} />
        <Stack.Screen
          name="PreferenceSetup"
          component={PreferenceSetupScreen}
        />
        <Stack.Screen name="Main" component={MainTabs} />
        <Stack.Screen
          name="PlaceDetails"
          component={PlaceDetailsScreen}
          options={{ headerShown: true, title: "Place Details" }}
        />
        <Stack.Screen
          name="PersonalizedPlan"
          component={PersonalizedPlanScreen}
          options={{ headerShown: true, title: "Your Plan" }}
        />
        <Stack.Screen
          name="Storytelling"
          component={StorytellingScreen}
          options={{ headerShown: true, title: "AI Storytelling" }}
        />
        <Stack.Screen
          name="TransportInfo"
          component={TransportInfoScreen}
          options={{ headerShown: true, title: "Transport Info" }}
        />
        <Stack.Screen
          name="FoodRecommendation"
          component={FoodRecommendationScreen}
          options={{ headerShown: true, title: "Food Recommendations" }}
        />
        <Stack.Screen
          name="Events"
          component={EventsScreen}
          options={{ headerShown: true, title: "Events & Culture" }}
        />
        <Stack.Screen
          name="Contribution"
          component={ContributionScreen}
          options={{ headerShown: true, title: "Contribute" }}
        />
        <Stack.Screen
          name="AdminDashboard"
          component={AdminDashboardScreen}
          options={{ headerShown: true, title: "Admin Dashboard" }}
        />
        <Stack.Screen
          name="SafetyUtility"
          component={SafetyUtilityScreen}
          options={{ headerShown: true, title: "Safety & Utilities" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
