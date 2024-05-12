// useAuth.js

import { useState, useEffect } from 'react';
import { getAccessToken, getRefreshToken, saveTokens, clearTokens } from './auth';
import { reloadAsync } from 'expo-updates';
import axios from "axios";
import { HOST } from "@env";

function logCurrentTime() {
  const currentDate = new Date();
  const hours = currentDate.getHours();
  const minutes = currentDate.getMinutes();
  const seconds = Math.round(currentDate.getSeconds()); // Round seconds

  console.log(`Current time: ${hours}:${minutes}:${seconds}`);
}


const TOKEN_REFRESH_ENDPOINT = `${HOST}/auth/local/refresh`
const useAuth = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const checkLoginStatus = async () => {
      const accessToken = await getAccessToken();
      setIsLoggedIn(!!accessToken);
    };

    checkLoginStatus();
  }, []);

  const login = async (accessToken, refreshToken) => {
    saveTokens(accessToken, refreshToken);
    setIsLoggedIn(true);
    console.log("Reloading app..");
    reloadAsync();
  };

  const logout = async () => {
    clearTokens();
    setIsLoggedIn(false);
    console.log("Reloading app..");
    reloadAsync();
  };

  // Function to refresh token
  const refreshToken = async () => {
    const refresh_token = await getRefreshToken();
    if (!refresh_token) {
      // Handle scenario when refresh token is not available
      console.log("No refresh token available. Logging out.");
      logout();
      return;
    }
  
    try {
      const response = await axios.post(
        TOKEN_REFRESH_ENDPOINT,
        { refresh_token: refresh_token },
        {
          headers: {
            'Authorization': `Bearer ${refresh_token}`,
            'Content-Type': 'application/json',
          },
        }
      );
  
      if (response.status !== 200) {
        // Handle error response from server
        console.error('Failed to refresh token:', response.statusText);
        logout();
        return;
      }

      console.log("\n\n\n\n");
      logCurrentTime();
      console.log(" TOKENS REFRESHED SUCCESSFULLY YAAAY!\n\n\n\n");
      const newAccessToken = response.data.access_token;
      const newRefreshToken = response.data.refresh_token;
      saveTokens(newAccessToken, newRefreshToken);
    } catch (error) {
      console.error('Error refreshing token:', error);
      logout();
    }
  };

  // Function to periodically refresh token
  useEffect(() => {
    const interval = setInterval(refreshToken, 14 * 60 * 1000); // Refresh token every 14 minutes
    return () => clearInterval(interval);
  }, []);

  return { isLoggedIn, login, logout };
};

export default useAuth;
