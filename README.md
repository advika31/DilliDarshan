# DilliDarshan

An AI-powered tourism companion for Delhi built with Expo and React Native.

## Features

- **AI Chatbot**: WhatsApp-style conversational interface for travel queries
- **Personalized Recommendations**: Based on user preferences (time, interests, crowd preference)
- **Place Details**: Comprehensive information about monuments, transport, utilities
- **AI Storytelling**: Unlock cultural stories using points
- **Points System**: Earn points by using the app and contributing knowledge
- **Explore**: Browse places manually
- **Food Recommendations**: Filter by mood, budget, and time
- **Events & Culture**: Discover heritage walks, exhibitions, festivals
- **Community Contributions**: Share local tips and earn points
- **Admin Dashboard**: Mock analytics dashboard

## Tech Stack

- Expo ~51.0.0
- React Native 0.74.5
- TypeScript
- React Navigation (Stack + Bottom Tabs)
- AsyncStorage for local data persistence
- @expo/vector-icons for icons

## Installation

1. Install dependencies:
```bash
npm install
```

2. Start the Expo development server:
```bash
npx expo start
```

3. Run on your preferred platform:
   - Press `i` for iOS simulator
   - Press `a` for Android emulator
   - Scan QR code with Expo Go app on your device

## Project Structure

```
├── App.tsx                 # Root component
├── navigation/             # Navigation configuration
│   └── AppNavigator.tsx
├── screens/                # All app screens
│   ├── TutorialScreen.tsx
│   ├── PreferenceSetupScreen.tsx
│   ├── HomeScreen.tsx
│   ├── ChatScreen.tsx
│   ├── ExploreScreen.tsx
│   ├── ProfileScreen.tsx
│   ├── PlaceDetailsScreen.tsx
│   ├── PersonalizedPlanScreen.tsx
│   ├── StorytellingScreen.tsx
│   ├── TransportInfoScreen.tsx
│   ├── FoodRecommendationScreen.tsx
│   ├── EventsScreen.tsx
│   ├── ContributionScreen.tsx
│   └── AdminDashboardScreen.tsx
├── components/             # Reusable components
│   ├── Button.tsx
│   ├── Card.tsx
│   └── Chip.tsx
├── context/                # Context providers
│   ├── PreferencesContext.tsx
│   └── PointsContext.tsx
├── types/                  # TypeScript types
│   └── index.ts
└── constants/              # Mock data
    ├── places.ts
    └── stories.ts
```

## Key Features Explained

### Onboarding Flow
- Tutorial screens on first launch
- Preference setup (user type, time, interests, language, accessibility)

### Chat Screen (Core Feature)
- WhatsApp-style UI with bot avatar
- Quick action chips
- Place suggestions with crowd indicators
- Rule-based responses (no API calls)

### Points System
- Earn 5 points: Ask chatbot question, View place details
- Earn 10 points: Add contribution
- Unlock storytelling at 20 points (quick) and 50 points (immersive)

### Place Details
- Visit info (timing, fees, booking)
- Transport (metro, walking, auto-rickshaw)
- Comfort & utilities (toilets, seating, shade, accessibility)
- AI storytelling (locked/unlocked based on points)
- Smart nudges for crowded places

## Notes

- All data is mocked/hardcoded (no backend)
- No authentication required
- Points stored locally using AsyncStorage
- Preferences stored locally
- No API calls - all responses are rule-based

## Development

The app uses:
- TypeScript for type safety
- StyleSheet from react-native (no Tailwind)
- Clean, modular code structure
- Safe, stable libraries only

## License

Private project
