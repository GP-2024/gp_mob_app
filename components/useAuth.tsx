// useAuth.js

import { useState, createContext, useEffect, useContext } from 'react';
import {
  getMinutesSince,
  getDaysSince,
  getStoredTokens,
  storeTokens,
  clearTokens,
  requestNewTokens,
} from './auth';
import { reloadAsync } from 'expo-updates';

import axios from "axios";
import { appContext } from '../App'
import { LogBox } from 'react-native';
const HOST = process.env.HOST;



function logCurrentTime() {
  const currentDate = new Date();
  const hours = currentDate.getHours();
  const minutes = currentDate.getMinutes();
  const seconds = Math.round(currentDate.getSeconds()); // Round seconds

  console.log(`Current time: ${hours}:${minutes}:${seconds}`);
}
LogBox.ignoreLogs(['Require cycle: App.tsx',
  'Possible unhandled promise rejection']);

const TOKEN_REFRESH_ENDPOINT = `${HOST}/auth/local/refresh`
const useAuth = () => {

  const lgnstt = useContext(appContext);
  const isLoggedIn = lgnstt.isLoggedIn;
  const setIsLoggedIn = lgnstt.setIsLoggedIn;



  useEffect(() => {
    const checkLoginStatus = async () => {
      
    };

    checkLoginStatus();
  }, []);

  const AUTH_TOKEN_EXPIRATION_MINUTES = 14;
  const REFRESH_TOKEN_EXPIRATION_DAYS = 7;
  
  useEffect(() => {
    const interval = setInterval(checkTokensAndActUponIt, 3000); // Refresh token every 14 minutes
    return () => clearInterval(interval);
  }, []);

  // useEffect(() => {
  //   // Define the function inside useEffect to have access to updated state and props
  //   const checkTokensAndActUponIt = async () => {
  //     const { logout } = useAuth();
  //     const AUTH_TOKEN_EXPIRATION_MINUTES = 14;
  //     const REFRESH_TOKEN_EXPIRATION_DAYS = 7;
  //     const { authToken, refreshToken, authTokenTimestamp, refreshTokenTimestamp } = await getStoredTokens();
  
  //     if (!authToken || !refreshToken || !authTokenTimestamp || !refreshTokenTimestamp) {
  //       return;
  //     }
  
  //     const authTokenGeneratedTime = new Date(authTokenTimestamp);
  //     const refreshTokenGeneratedTime = new Date(refreshTokenTimestamp);
  
  //     const authTokenAge = getMinutesSince(authTokenGeneratedTime); // in minutes
  //     const refreshTokenAge = getDaysSince(refreshTokenGeneratedTime); // in days
  
  //     if (refreshTokenAge >= REFRESH_TOKEN_EXPIRATION_DAYS) {
  //       await logout();
  //       return;
  //     }
  
  //     if (authTokenAge >= AUTH_TOKEN_EXPIRATION_MINUTES) {
  //       await requestNewTokens(refreshToken);
  //     }
  //     logCurrentTime();
  //     console.log("Periodic Token Check ✅")
  //   };
  
  //   // Set the interval to call the function every 30 seconds
  //   const intervalId = setInterval(checkTokensAndActUponIt, 30000);
  
  //   // Clear the interval on component unmount
  //   return () => clearInterval(intervalId);
  // }, []); // Empty dependency array ensures this effect runs only once on mount
  

  useEffect(() => {
    const checkLoginStatus = async () => {
      const { authToken, authTokenTimestamp, refreshToken, refreshTokenTimestamp } = await getStoredTokens();

      if (!authToken || !authTokenTimestamp || !refreshToken || !refreshTokenTimestamp) {
        setIsLoggedIn(false);
        return;
      }

      const authTokenGeneratedTime = new Date(authTokenTimestamp);
      const refreshTokenGeneratedTime = new Date(refreshTokenTimestamp);

      const authTokenAge = getMinutesSince(authTokenGeneratedTime); // in minutes
      const refreshTokenAge = getDaysSince(refreshTokenGeneratedTime); // in days

      if (refreshTokenAge >= REFRESH_TOKEN_EXPIRATION_DAYS || authTokenAge >= AUTH_TOKEN_EXPIRATION_MINUTES) {
        await checkTokensAndActUponIt();
      }

      // Re-check tokens after attempting to refresh them
      const { authToken: newAuthToken } = await getStoredTokens();
      setIsLoggedIn(!!newAuthToken);
    };

    checkLoginStatus();
  }, []);

  const login = async (accessToken, refreshToken) => {
    storeTokens(accessToken, refreshToken);
    setIsLoggedIn(true);
  };

  const logout = async () => {
    clearTokens();
    setIsLoggedIn(false);

  };



  // // Function to refresh token
  // const refreshToken = async () => {
  //   const refresh_token = await getRefreshToken();
  //   if (!refresh_token) {
  //     // Handle scenario when refresh token is not available
  //     console.log("No refresh token available. Logging out.");
  //     logout();
  //     return;
  //   }

  //   try {
  //     const response = await axios.post(
  //       TOKEN_REFRESH_ENDPOINT,
  //       { refresh_token: refresh_token },
  //       {
  //         headers: {
  //           'Authorization': `Bearer ${refresh_token}`,
  //           'Content-Type': 'application/json',
  //         },
  //       }
  //     );

  //     if (response.status !== 200) {
  //       // Handle error response from server
  //       console.error('Failed to refresh token:', response.statusText);
  //       logout();
  //       return;
  //     }

  //     console.log("\n\n\n\n");
  //     logCurrentTime();
  //     console.log(" TOKENS REFRESHED SUCCESSFULLY YAAAY!\n\n\n\n");
  //     const newAccessToken = response.data.access_token;
  //     const newRefreshToken = response.data.refresh_token;
  //     storeTokens(newAccessToken, newRefreshToken);
  //   } catch (error) {
  //     console.error('Error refreshing token:', error);
  //     logout();
  //   }
  // };

  // // Function to periodically refresh token
  // useEffect(() => {
  //   const interval = setInterval(refreshToken, 14 * 60 * 1000); // Refresh token every 14 minutes
  //   return () => clearInterval(interval);
  // }, []);

  return { login, logout };
};



export const checkTokensAndActUponIt = async () => {
  const {  logout } = useAuth();
  const AUTH_TOKEN_EXPIRATION_MINUTES = 14;
  const REFRESH_TOKEN_EXPIRATION_DAYS = 7;
  const { authToken, refreshToken, authTokenTimestamp, refreshTokenTimestamp } = await getStoredTokens();

  if (!authToken || !refreshToken || !authTokenTimestamp || !refreshTokenTimestamp) {
    return;
  }

  const authTokenGeneratedTime = new Date(authTokenTimestamp);
  const refreshTokenGeneratedTime = new Date(refreshTokenTimestamp);

  const authTokenAge = getMinutesSince(authTokenGeneratedTime); // in minutes
  const refreshTokenAge = getDaysSince(refreshTokenGeneratedTime); // in days

  if (refreshTokenAge >= REFRESH_TOKEN_EXPIRATION_DAYS) {
    await logout();
    return;
  }

  if (authTokenAge >= AUTH_TOKEN_EXPIRATION_MINUTES) {
    await requestNewTokens(refreshToken);
  }
  logCurrentTime();
  console.log("Periodic Token Check ✅")
};



export const getAccessToken = async () => {
  checkTokensAndActUponIt();
  const { authToken } = await getStoredTokens();
  return authToken;
};

export default useAuth;
