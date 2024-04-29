// Import necessary React Native components
import { View, Alert, FlatList, Dimensions, Button, Text, TextInput, TouchableOpacity, StyleSheet, SafeAreaView, ScrollView, Pressable } from 'react-native';
import React, { useState } from 'react';

import type { PropsWithChildren } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import {  LinearGradient } from '@rneui/themed';
import Icon from 'react-native-vector-icons/FontAwesome6';
import { NavigationScreenProps } from "react-navigation";
import { CustomHeader } from '../components/Header';
import SignupScreen from './SignupScreen';
import SearchItemCard from '../components/SearchItemCard'

import {
  Colors,
} from 'react-native/Libraries/NewAppScreen';

const plantsData = [
  {
    id: 1,
    itemImageUrl: 'https://i.postimg.cc/432dzftH/proxy-image.jpg',
    itemName: 'Swiss Cheese Plant',
    itemDescription: 'Botanical Name: Monstera deliciosa'
  },

  {
    id: 2,
    itemImageUrl: 'https://i.postimg.cc/BQYNjyQY/proxy-image2.jpg',
    itemName: 'Rose',
    itemDescription: 'Botanical Name: Rosa spp'
  },
  {
    id: 3,
    itemImageUrl: 'https://i.postimg.cc/L54VqfNf/proxy-image.jpg',
    itemName: 'Lavender',
    itemDescription: 'Botanical Name: Lavandula spp'
  },
  {
    id: 4,
    itemImageUrl: 'https://i.postimg.cc/HxMLQPP1/proxy-image.jpg',
    itemName: 'Tomato',
    itemDescription: 'Botanical Name: Solanum lycopersicum'
  },
  {
    id: 5,
    itemImageUrl: 'https://i.postimg.cc/mkZ0bP9p/proxy-image.jpg',
    itemName: 'Basil',
    itemDescription: 'Botanical Name: Ocimum basilicum'
  },
]

const gridRenderItem = ({ item }) => (
  <SearchItemCard itemName={item.itemName}
    itemImageUrl={item.itemImageUrl}
    itemDescription={item.itemDescription} />
);

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;
const widthFactor = 0.88;
const heightFactor = 0.09;

// Define the SearchScreen component
const SearchScreen = () => {
  const [searchQuery, setsearchQuery] = useState('');

  return (
    <SafeAreaView style={styles.outerContainer}>

      <View style={styles.searchSection}>
        <TextInput
          style={styles.input}
          placeholder="Search for a plant"
          onChangeText={(inputString) => { setsearchQuery(inputString) }}
          underlineColorAndroid="transparent"
        />
        <Icon style={styles.searchIcon} name="magnifying-glass" size={20} color="#666666" />
      </View>

      <FlatList
        data={plantsData}
        renderItem={gridRenderItem}
        keyExtractor={(item) => item.id}
        numColumns={1}
      />

    </SafeAreaView>
  );
};

// h1            47.78px     
// h2            39.81px     
// h3            33.18px     
// h4            27.65px     
// h5            23.04px     
// h6            19.2px     
// p            16px     
// small        13.33px     
// smaller        11.11px

// Define styles using StyleSheet
const styles = StyleSheet.create({
  searchSection: {
    width:screenWidth*0.88,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#fff',
    // borderWidth: 1,
    // borderColor: 'cyan',
    borderRadius: 5,
    overflow: 'hidden',
    marginBottom: 19,
  },
  searchIcon: {
    padding: 10,
    // borderWidth: 1,
    // borderColor: 'red',
    // width:'10%'
  },
  input: {
    paddingLeft: 10,
    fontSize: 20 * 0.8,
    backgroundColor: 'white',
    height: 40,
    borderRadius: 5,
    // borderWidth: 1,
    // borderColor: 'green',
    width:'88%'
  },
  outerContainer: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'stretch',
    paddingHorizontal: 18,
    paddingVertical: 19,

    // borderWidth: 1,
    // borderColor: 'black',
    margin: 3,
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
    // flex: 200, heree
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
    backgroundColor: "#2089DC",
    padding: 20
  },
  scanButtonContentStyle: {
    flexDirection: 'column',
    paddingHorizontal: 5,
  },
  scanButtonTextStyle: {
    color: 'white',
    fontSize: 39.81 * 0.8,
    fontWeight: 'bold',
  }

});

// Export the component
export default SearchScreen;
