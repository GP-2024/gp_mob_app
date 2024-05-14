// auth.js

import AsyncStorage from '@react-native-async-storage/async-storage';

export const saveTokens = async (accessToken, refreshToken) => {
  try {
    await AsyncStorage.setItem('accessToken', accessToken);
    await AsyncStorage.setItem('refreshToken', refreshToken);
  } catch (error) {
    console.error('Error saving tokens:', error);
  }
};

export const clearTokens = async () => {
  try {
    await AsyncStorage.removeItem('accessToken');
    await AsyncStorage.removeItem('refreshToken');
    console.log("Tokens cleared successfully!");
  } catch (error) {
    console.error('Error clearing tokens:', error);
  }
};

export const getAccessToken = async () => {
  try {
    return await AsyncStorage.getItem('accessToken');
  } catch (error) {
    console.error('Error getting access token:', error);
    return null;
  }
};

export const getRefreshToken = async () => {
  try {
    return await AsyncStorage.getItem('refreshToken');
  } catch (error) {
    console.error('Error getting refresh token:', error);
    return null;
  }
};

/////////////////

import axios from 'axios';
import { HOST } from "@env";

export const addPlantToCollection = async (plantID, authToken) => {
  const url = `${HOST}/my-plants`;
  const config = {
    headers: {
      Authorization: `Bearer ${authToken}`
    }
  };

  const requestBody = {
    plantId: plantID // plantId as the value of the key "plantID"
  };

  try {
    const response = await axios.post(url, requestBody, config);
    console.log("Added plant:",plantID,'\n');
    return response.data; // If you want to return something from the response
  } catch (error) {
    console.error('Error adding plant to collection:', error);
    throw error; // Handle error appropriately in the calling function
  }
};

