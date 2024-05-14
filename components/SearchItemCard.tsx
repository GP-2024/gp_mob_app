// Import necessary React Native components
import { View, Image, Dimensions, Alert, Button, Pressable, Text, TextInput, TouchableOpacity, StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import React, { useState } from 'react';
import type { PropsWithChildren } from 'react';
// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// import { Button, Text, Input, CheckBox, LinearGradient } from '@rneui/themed';
import Icon from 'react-native-vector-icons/FontAwesome6';
import BouncyCheckbox from "react-native-bouncy-checkbox";
import defaultStyles from "../config/styles";
// import LoginScreen from './LoginScreen';
import {
  Colors,
} from 'react-native/Libraries/NewAppScreen';

import { addPlantToCollection,getAccessToken } from './auth';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;
const widthFactor = 0.88;
const heightFactor = 0.09;

// Define the SearchItemCard component
const SearchItemCard = ({ itemImageUrl, itemName, itemDescription, itemID }) => {

  function logCurrentTime() {
    const currentDate = new Date();
    const hours = currentDate.getHours();
    const minutes = currentDate.getMinutes();
    const seconds = Math.round(currentDate.getSeconds()); // Round seconds

    console.log(`Current time: ${hours}:${minutes}:${seconds}`);
  }

  const addPlantToUserCollection = async (plantId) => {
    try {
      // Get the authentication token
      const authToken = await getAccessToken();
  
      if (!authToken) {
        console.error('Access token not found to add plant.');
        return;
      }
  
      // Call the function to add the plant to the collection
      const result = await addPlantToCollection(plantId, authToken);
      console.log('Plant added successfully:', result,'\n');
      // Handle the result as needed in your application
    } catch (error) {
      console.error('Error adding plant to collection:', error);
      // Handle error appropriately in your application
    }
  };


  return (
    <View style={styles.card}>

      <Image style={styles.cardImageStyle}
        source={{
          uri: itemImageUrl
        }}
      />
      <View style={styles.cardContent}>

        <View style={styles.cardContentContainer}>
          <Text style={styles.h6}>{itemName}</Text>
          <Text style={styles.p}>{itemDescription}</Text>
        </View>

        <View style={styles.addButtonOuterContainer}>

          <Pressable
            onPress={() => {
              console.log("Item:", itemID,"is asked to be added to my plant collection...");
              addPlantToUserCollection(itemID);
              
            }}
          >
            <View style={styles.addButtonContainer}>
              <Icon name="plus" size={20} color="white" />
            </View>
          </Pressable>


        </View>




      </View>

    </View>
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
  card: {
    flexDirection: 'row',
    borderRadius: 200 / 10,
    width: screenWidth * widthFactor,
    height: screenHeight * heightFactor,
    alignItems: 'flex-start',
    // borderWidth: 3,
    // borderColor: 'cyan',
    overflow: 'hidden',
    backgroundColor: defaultStyles.colors.primaryBackground,
    marginBottom: 19,
    marginRight: 19,

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.37,
    shadowRadius: 7.49,

    elevation: 12,
  },
  cardContentContainer: {

    width: '65%',
    // borderWidth: 1,
    // borderColor: 'cyan',
  },
  addButtonContainer: {
    backgroundColor: '#4E785A',
    alignSelf: 'center',
    // borderWidth: 1,
    // borderColor: 'black',
    borderRadius: 20,
    padding: 5,

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,

    elevation: 4,

  },
  addButtonOuterContainer: {
    width: '20%',
    // height:'100%',
    alignSelf: 'center',
    // borderWidth: 1,
    // borderColor: 'pink',
    // alignContent:'center',
    // alignItems:'center',
    // verticalAlign:'middle',
    paddingBottom: 5,
    paddingTop: 5,
  },
  cardImageStyle: {
    // flex: 0.5,
    width: '20%', height: '100%',
    borderTopLeftRadius: 200 / 10,
    borderBottomLeftRadius: 200 / 10,
  },
  cardContent: {
    // flex: 0.5,
    flexDirection: 'row',
    width: '95%', height: '100%',
    paddingHorizontal: 10,
    paddingBottom: 5,
    paddingTop: 5,

    // borderWidth: 1,
    // borderColor: 'red',

    borderBottomRightRadius: 200 / 10,
    borderBottomLeftRadius: 200 / 10,
    // alignSelf:'flex-start'
  },
  // outerContainer: {
  //   flex: 1,
  //   flexDirection: 'column',
  //   alignItems: 'stretch',
  //   paddingTop: 40,
  //   paddingBottom: 70,
  //   paddingLeft: 30,
  //   paddingRight: 30,

  //   // borderWidth: 1,
  //   // borderColor: 'red',
  //   // margin: 3,
  // },
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
    paddingBottom: 10

    // borderWidth: 1,
    // borderColor: 'red',
    // margin: 3,
  },
  inputContainer: {
    flex: 1,
    alignItems: 'stretch',
    paddingBottom: 10,



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
    marginBottom: 5,
    marginTop: 10,

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
  agreementContainer: {
    flexDirection: 'row',
    paddingBottom: 0,
    // borderWidth: 1,
    // borderColor: 'red',
    margin: 3,
    alignItems: 'center',
    // justifyContent: 'center',
  },
  h3: {
    fontSize: 33.18 * 0.8,
    fontWeight: 'bold',
  },
  h4: {
    fontSize: 27.65 * 0.8,
    fontWeight: 'bold',
  },
  h5: {
    fontSize: 23.04 * 0.8,
    fontWeight: 'bold',
  },
  h6: {
    fontSize: 19.2 * 0.8,
    fontWeight: 'bold',
    paddingBottom: 3.5,
  },
  p: {
    fontSize: 17.5 * 0.8,
  },
  input: {
    paddingLeft: 10,
    fontSize: 20 * 0.8,
    backgroundColor: 'white',
    height: 40,
    borderRadius: 5,
    // borderWidth: 1,
    // borderColor: 'red',
  },
  TOSButtonText: {
    textDecorationLine: 'underline',
    color: '#2089DC',
    fontWeight: 'bold',
    // borderWidth: 1,
    // borderColor: 'red',
    // margin: 3,
  },
  TOSButton: {
    marginLeft: 4,
    // borderWidth: 1,
    // borderColor: 'red',
    // margin: 3,
  }

});

// Export the component
export default SearchItemCard;
