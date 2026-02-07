// context/PointsContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const PointsContext = createContext(undefined);

export const PointsProvider = ({ children }) => {
  const [points, setPoints] = useState(0);
  const [unlockedStories, setUnlockedStories] = useState([]);
  const [userContributions, setUserContributions] = useState([]);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const storedPoints = await AsyncStorage.getItem('userPoints');
      const storedStories = await AsyncStorage.getItem('unlockedStories');
      const storedContributions = await AsyncStorage.getItem('userContributions');
      
      if (storedPoints) {
        setPoints(parseInt(storedPoints, 10));
      }
      if (storedStories) {
        setUnlockedStories(JSON.parse(storedStories));
      }
      if (storedContributions) {
        setUserContributions(JSON.parse(storedContributions));
      }
    } catch (error) {
      console.error('Error loading data:', error);
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

  const addContribution = async (contribution) => {
    try {
      const newContributions = [contribution, ...userContributions];
      setUserContributions(newContributions);
      await AsyncStorage.setItem('userContributions', JSON.stringify(newContributions));

      await addPoints(10, "Contribution Reward");
      
      return true;
    } catch (error) {
      console.error("Error adding contribution:", error);
      return false;
    }
  };

  const unlockStory = async (placeId, cost) => {
    if (points >= cost) {
      const newPoints = points - cost;
      const newStories = [...unlockedStories, String(placeId)];
      
      try {
        await AsyncStorage.setItem('userPoints', String(newPoints));
        await AsyncStorage.setItem('unlockedStories', JSON.stringify(newStories));
        
        setPoints(newPoints);
        setUnlockedStories(newStories);
        return true; 
      } catch (error) {
        console.error("Error unlocking story:", error);
        return false;
      }
    }
    return false; 
  };

  const isStoryUnlocked = (placeId) => {
    return unlockedStories.includes(String(placeId));
  };

  const resetPoints = async () => {
    try {
      await AsyncStorage.setItem('userPoints', '0');
      await AsyncStorage.setItem('unlockedStories', JSON.stringify([]));
      await AsyncStorage.setItem('userContributions', JSON.stringify([]));
      setPoints(0);
      setUnlockedStories([]);
      setUserContributions([]);
    } catch (error) {
      console.error('Error resetting points:', error);
    }
  };

  return (
    <PointsContext.Provider value={{ 
      points, 
      userContributions,
      addPoints, 
      addContribution,
      resetPoints, 
      unlockStory, 
      isStoryUnlocked 
    }}>
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