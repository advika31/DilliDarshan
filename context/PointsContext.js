import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const PointsContext = createContext(undefined);

export const PointsProvider = ({ children }) => {
  const [points, setPoints] = useState(0);

  useEffect(() => {
    loadPoints();
  }, []);

  const loadPoints = async () => {
    try {
      const storedPoints = await AsyncStorage.getItem('userPoints');
      if (storedPoints) {
        setPoints(parseInt(storedPoints, 10));
      }
    } catch (error) {
      console.error('Error loading points:', error);
    }
  };

  const addPoints = async (amount, reason) => {
    try {
      const newPoints = points + amount;
      await AsyncStorage.setItem('userPoints', String(newPoints));
      setPoints(newPoints);
      console.log(`Earned ${amount} points: ${reason}`);
    } catch (error) {
      console.error('Error saving points:', error);
    }
  };

  const resetPoints = async () => {
    try {
      await AsyncStorage.setItem('userPoints', '0');
      setPoints(0);
    } catch (error) {
      console.error('Error resetting points:', error);
    }
  };

  return (
    <PointsContext.Provider value={{ points, addPoints, resetPoints }}>
      {children}
    </PointsContext.Provider>
  );
};

export const usePoints = () => {
  const context = useContext(PointsContext);
  if (!context) {
    throw new Error('usePoints must be used within PointsProvider');
  }
  return context;
};
