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

  

  const login = async (accessToken, refreshToken) => {
    storeTokens(accessToken, refreshToken);
    setIsLoggedIn(true);
  };

  const logout = async () => {
    console.log("logging out...");
    console.log(this);
    clearTokens();
    setIsLoggedIn(false);

  };


  return { login, logout };
};

const AUTH_TOKEN_EXPIRATION_MINUTES = 500;

export const checkTokensAndActUponIt = async () => {
  console.log("==========");
  logCurrentTime();
  console.log("A");
  const {  logout } = useAuth();

  const REFRESH_TOKEN_EXPIRATION_DAYS = 7;
  const { authToken, refreshToken, authTokenTimestamp, refreshTokenTimestamp } = await getStoredTokens();

  if (!authToken || !refreshToken || !authTokenTimestamp || !refreshTokenTimestamp) {
    console.log("B");
    return;
  }

  const authTokenGeneratedTime = new Date(authTokenTimestamp);
  const refreshTokenGeneratedTime = new Date(refreshTokenTimestamp);

  const authTokenAge = getMinutesSince(authTokenGeneratedTime); // in minutes
  const refreshTokenAge = getDaysSince(refreshTokenGeneratedTime); // in days

  if (refreshTokenAge >= REFRESH_TOKEN_EXPIRATION_DAYS) {
    console.log("C");
    await logout();
    return;
  }

  if (authTokenAge >= AUTH_TOKEN_EXPIRATION_MINUTES) {
    console.log("D");
    await requestNewTokens(refreshToken);
  }
  logCurrentTime();
  console.log("Periodic Token Check");
  console.log("==========");
};



export const getAccessToken = async () => {
  const { authToken, authTokenTimestamp } = await getStoredTokens();

  const authTokenGeneratedTime = new Date(authTokenTimestamp);
  const authTokenAge = getMinutesSince(authTokenGeneratedTime); // in minutes

  if (authTokenAge < AUTH_TOKEN_EXPIRATION_MINUTES) {
    console.log("oh yeah!");
    return authToken;
  }else{
    return -1;
  }
};

export default useAuth;
