// auth.js

import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import useAuth from './useAuth';

const HOST = process.env.HOST;

export const storeTokens = async (authToken, refreshToken) => {
  try {
    const timestamp = new Date().toISOString();
    await AsyncStorage.setItem('authToken', authToken);
    await AsyncStorage.setItem('refreshToken', refreshToken);
    await AsyncStorage.setItem('authTokenTimestamp', timestamp);
    await AsyncStorage.setItem('refreshTokenTimestamp', timestamp);
  } catch (error) {
    console.error('Error storing tokens', error);
  }
};

export const getStoredTokens = async () => {
  const authToken = await AsyncStorage.getItem('authToken');
  const refreshToken = await AsyncStorage.getItem('refreshToken');
  const authTokenTimestamp = await AsyncStorage.getItem('authTokenTimestamp');
  const refreshTokenTimestamp = await AsyncStorage.getItem('refreshTokenTimestamp');

  return { authToken, refreshToken, authTokenTimestamp, refreshTokenTimestamp };
};

function logCurrentTime() {
  const currentDate = new Date();
  const hours = currentDate.getHours();
  const minutes = currentDate.getMinutes();
  const seconds = Math.round(currentDate.getSeconds()); // Round seconds

  console.log(`Current time: ${hours}:${minutes}:${seconds}`);
}

export const requestNewTokens = async (refreshToken) => {
  console.log(refreshToken);
  const TOKEN_REFRESH_ENDPOINT = `${HOST}/auth/local/refresh`
  try {
    const response = await axios.post(
      TOKEN_REFRESH_ENDPOINT,
      {
        headers: {
          'Authorization': `Bearer ${refreshToken}`,
          'Content-Type': 'application/json',
        },
      }
    );
    const { access_token, refresh_token } = response.data;
    await storeTokens(access_token, refresh_token);
    logCurrentTime();
    console.log("Fresh Tokens Has Been Stored ✅")
  } catch (error) {
    console.error('Error requesting new tokens', error);
    // Handle error (e.g., logout user if refresh token is invalid)
  }
};

export const getMinutesSince = (date) => {
  const now = new Date().getTime();
  return (now - date.getTime()) / (1000 * 60);
};

export const getDaysSince = (date) => {
  const now = new Date().getTime();
  return (now - date.getTime()) / (1000 * 60 * 60 * 24);
};





export const clearTokens = async () => {
  try {
    await AsyncStorage.removeItem('refreshTokenTimestamp');
    await AsyncStorage.removeItem('authToken');
    await AsyncStorage.removeItem('refreshToken');
    await AsyncStorage.removeItem('authTokenTimestamp');
    console.log("Tokens cleared successfully!");
  } catch (error) {
    console.error('Error clearing tokens:', error);
  }
};



// export const getAccessToken = async () => {
//   try {
//     return await AsyncStorage.getItem('accessToken');
//   } catch (error) {
//     console.error('Error getting access token:', error);
//     return null;
//   }
// };

// export const getRefreshToken = async () => {
//   try {
//     return await AsyncStorage.getItem('refreshToken');
//   } catch (error) {
//     console.error('Error getting refresh token:', error);
//     return null;
//   }
// };

/////////////////



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
    console.log("Added plant:", plantID, '\n');
    return response.data; // If you want to return something from the response
  } catch (error) {
    console.error('Error adding plant to collection:', error);
    throw error; // Handle error appropriately in the calling function
  }
};

