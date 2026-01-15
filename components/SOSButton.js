// components/SOSButton.js
import React from 'react';
import {
  View,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Vibration,
  Text,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const SOSButton = () => {
  const triggerSOS = () => {
    Vibration.vibrate(400);

    Alert.alert(
      '🚨 Emergency SOS',
      'Choose an action. ',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Call Police',
          onPress: () =>
            Alert.alert('Police', 'Dialing 112'),
        },
        {
          text: 'Call Hospital',
          onPress: () =>
            Alert.alert('Hospital', 'Calling nearest hospital'),
        },
        {
          text: 'Send SOS',
          style: 'destructive',
          onPress: () =>
            Alert.alert(
              'SOS Sent',
              'Your location has been shared.'
            ),
        },
      ]
    );
  };

  return (
    <View style={styles.wrapper} pointerEvents="box-none">
      <TouchableOpacity
        style={styles.sosButton}
        onPress={triggerSOS}          
        onLongPress={triggerSOS}      
        activeOpacity={0.8}
      >
        <Ionicons name="warning" size={26} color="#ffffff" />
        
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    position: 'absolute',
    bottom: 28,
    right: 20,
    zIndex: 9999,          
    elevation: 20,
  },
  sosButton: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#dc2626',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#dc2626',
    shadowOpacity: 0.5,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
  },
  sosText: {
    position: 'absolute',
    bottom: 6,
    fontSize: 10,
    fontWeight: '700',
    color: '#ffffff',
    letterSpacing: 1,
  },
});

export default SOSButton;
