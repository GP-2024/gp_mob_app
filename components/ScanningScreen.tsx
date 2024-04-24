// Import necessary React Native components
import { View, Alert, Button, Text, TextInput, TouchableOpacity, StyleSheet, SafeAreaView, ScrollView, Pressable } from 'react-native';
import React, { useState } from 'react';
import type { PropsWithChildren } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import {  LinearGradient } from '@rneui/themed';
import Icon from 'react-native-vector-icons/FontAwesome6';
import { NavigationScreenProps } from "react-navigation";
import { CustomHeader } from '../components/Header';
import SignupScreen from './SignupScreen';

import {
  Colors,
} from 'react-native/Libraries/NewAppScreen';

// Define the ScanningScreen component
const ScanningScreen = () => {


  return (
    <SafeAreaView style={styles.outerContainer} >
      <ScrollView contentContainerStyle={styles.outerContainer}>

        <View
          style={styles.buttonContainerStyle}
        >
          <Pressable
            style={styles.indentificationButtonStyle}
            onPress={() => Alert.alert("", "app should move you to identification camera!")}
          >
            <View
              style={styles.scanButtonContentStyle}
            >
              <Icon
                name='expand'
                size={70}
                color='white'
              />
              <Text style={styles.scanButtonTextStyle} h2>Identify a Plant</Text>
            </View>
          </Pressable>
        </View>

        <View
          style={styles.separatorContainerStyle}
        >

        </View>

        <View
          style={styles.buttonContainerStyle}
        >
          <Pressable
            style={styles.indentificationButtonStyle}
            onPress={() => Alert.alert("", "app should move you to diagnosis camera!")}
          >
            <View
              style={styles.scanButtonContentStyle}
            >
              <Icon
                name='expand'
                size={70}
                color='white'
              />
              <Text style={styles.scanButtonTextStyle} h2>Diagnose a Plant</Text>
            </View>
          </Pressable>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
};

// Define styles using StyleSheet
const styles = StyleSheet.create({
  outerContainer: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'stretch',
    paddingHorizontal: 18,
    paddingVertical: 19

    // borderWidth: 1,
    // borderColor: 'red',
    // margin: 3,
  },
  topBanner: {
    flex: 3.5,
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 40,

    // borderWidth: 1,
    // borderColor: 'red',
    // margin: 3,
  },
  topTitleContainer: {
    flex: 1,
    alignItems: 'flex-start',
    justifyContent: 'center',
    paddingBottom: 10

    // borderWidth: 1,
    // borderColor: 'red',
    // margin: 3,
  },
  secondaryTitleContainer: {
    flex: 1,
    alignItems: 'flex-start',
    justifyContent: 'center',
    paddingBottom: 5

    // borderWidth: 1,
    // borderColor: 'red',
    // margin: 3,
  },
  inputContainer: {
    flex: 1,
    alignItems: 'stretch',
    // borderWidth: 1,
    // borderColor: 'red',
    // margin: 3,
  },
  sideButtonContainer: {
    flex: 0.5,
    alignItems: 'flex-end',
    justifyContent: 'flex-start',

    // borderWidth: 1,
    // borderColor: 'red',
    // margin: 3,
  },
  buttonContainer: {
    flex: 1,
    alignItems: 'stretch',
    justifyContent: 'center',

    // borderWidth: 1,
    // borderColor: 'red',
    // margin: 3,
  },
  horizContainer: {
    flex: 0.6,
    flexDirection: 'row',
    alignItems: 'stretch',

    // borderWidth: 1,
    // borderColor: 'red',
    // margin: 3,
  },
  centerContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',

    // borderWidth: 1,
    // borderColor: 'red',
    // margin: 3,
  },
  buttonContainerStyle: {
    flex: 200,
    // borderWidth: 1,
    // borderColor: 'red',
    alignItems: 'center',
    justifyContent: 'center',
  },
  separatorContainerStyle: {
    flex: 1,
    // borderWidth: 1,
    // borderColor: 'red',
    backgroundColor: 'black'
  },
  indentificationButtonStyle: {
    width: 200,
    height: 200,
    borderRadius: 200 / 20,
    backgroundColor:"#2089DC",
    padding:20
  },
  scanButtonContentStyle: {
    flexDirection: 'column',
    paddingHorizontal: 5,
  },
  scanButtonTextStyle: {
    color: 'white',
    fontSize:39.81*0.8,
    fontWeight:'bold',
  }

});

// Export the component
export default ScanningScreen;
