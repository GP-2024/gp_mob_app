// Import necessary React Native components
import {
  Image,
  Alert,
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Button,
  Text,
  Pressable,
} from 'react-native';
import React, { useState } from 'react';
import type { PropsWithChildren } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import { Button, Text, Input, CheckBox, LinearGradient } from '@rneui/themed';
import Icon from 'react-native-vector-icons/FontAwesome6';
import BouncyCheckbox from "react-native-bouncy-checkbox";
import {
  Colors,
} from 'react-native/Libraries/NewAppScreen';

// Define the ProfileScreen component
const ProfileScreen = () => {
  // State variables for handling user input
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  // Function to handle the login button press
  const handleLogin = () => {
    // Add your login logic here
    console.log('Login button pressed');
  };

  return (
    <SafeAreaView style={styles.outerContainer} >

      <ScrollView contentContainerStyle={styles.outerContainer}>

        <View style={styles.upperBlock}>

        </View>

        <View style={styles.bottomBlock}>

        </View>

        <View style={styles.floatingContainerStyle}>
          <View style={styles.upperStrip}>

            <Pressable
              style={styles.logoutButtonStyle}
              onPress={() => Alert.alert("", "Logout button has been pressed!")}
              
            >
              <Text style={styles.logoutButtonTextStyle} >Logout</Text>
            </Pressable>

          </View>

          <View style={styles.pfpContainerStyle}>
            <Image style={styles.imageStyle}
              source={{
                uri: 'https://images.pexels.com/photos/1520760/pexels-photo-1520760.jpeg?auto=compress&cs=tinysrgb&w=500&h=500&dpr=1'
              }}
            />
          </View>

          <View style={styles.nameContainerStyle}>
            <Text style={styles.h4}>Justine Freeman </Text>
            {/* <Button buttonStyle={styles.nameEditButtonStyle}
              color="transparent">
              <Icon
                name='pen-to-square'
                size={25}
                color='black'
              />
            </Button> */}
          </View>

          <View style={styles.bioContainerStyle}>
            <Text style={styles.valueStyle}>Student and plant care nerd! </Text>
            {/* <Button buttonStyle={styles.nameEditButtonStyle}
              color="transparent">
              <Icon
                name='pen-to-square'
                size={15}
                color='black'
              />
            </Button> */}
          </View>

          <View style={styles.labelValueStyle}>
            <Text style={styles.labelStyle}>Email </Text>
            <View style={styles.valueContainerStyle}>
              <Text style={styles.valueStyle}>example@mail.com </Text>
              {/* <Button buttonStyle={styles.nameEditButtonStyle}
              color="transparent">
              <Icon
                name='pen-to-square'
                size={15}
                color='black'
              />
            </Button> */}
            </View>
          </View>

          <View style={styles.labelValueStyle}>
            <Text style={styles.labelStyle}>Username </Text>
            <View style={styles.valueContainerStyle}>
              <Text style={styles.valueStyle}>plant_owner112 </Text>
              {/* <Button buttonStyle={styles.nameEditButtonStyle}
                color="transparent">
                <Icon
                  name='pen-to-square'
                  size={15}
                  color='black'
                />
              </Button> */}
            </View>
          </View>

          <View style={styles.labelValueStyle}>
            <Text style={styles.labelStyle}>Country </Text>
            <View style={styles.valueContainerStyle}>
              <Text style={styles.valueStyle}>Egypt </Text>
              {/* <Button buttonStyle={styles.nameEditButtonStyle}
                color="transparent">
                <Icon
                  name='pen-to-square'
                  size={15}
                  color='black'
                />
              </Button> */}
            </View>
          </View>

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
    justifyContent: 'center',

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
  agreementContainer: {
    flexDirection: 'row',
    paddingBottom: 10
  },
  upperBlock: {
    flex: 1,
    backgroundColor: '#2089DC',
    // borderWidth: 1,
    // borderColor: 'red',
    // margin: 3,
  },
  bottomBlock: {
    flex: 2,
    // borderWidth: 1,
    // borderColor: 'red',
    // margin: 3,
  },
  floatingContainerStyle: {
    width: '85%',
    height: '95%',
    position: 'absolute',
    // borderWidth: 3,
    // borderColor: 'green',
    // margin: 10,
    alignSelf: 'center',
    flexDirection: 'column',
    alignItems: 'stretch',
  },
  upperStrip: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingBottom: 40,
  },
  logoutButtonStyle: {
    borderWidth: 1,
    borderColor: 'white',
    borderRadius: 5,
    paddingVertical: 3,
    paddingHorizontal: 7,
    backgroundColor:'transparent',
  },
  pfpContainerStyle: {
    // borderWidth: 3,
    // borderColor: 'green',
    alignItems: 'center',
    paddingBottom: 15,
  },
  imageStyle: {
    width: 200, height: 200, borderRadius: 200 / 2,
    borderWidth: 7,
    borderColor: 'white',
  },
  nameContainerStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 10,
  },
  nameEditButtonStyle: {
    paddingHorizontal: 5,
    paddingVertical: 5,
    borderRadius: 5,
  },
  bioContainerStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 35
  },
  bioEditButtonStyle: {
    paddingHorizontal: 5,
    paddingVertical: 5,
    borderRadius: 5,
  },
  labelStyle: {
    fontSize: 17
  },
  valueStyle: {
    fontSize: 17,
    fontWeight: 'normal'
  },
  labelValueStyle: {
    paddingBottom: 30
  },
  valueContainerStyle: {
    flexDirection: 'row',
  },
  h3: {
    fontSize: 33.18 * 0.8,
    fontWeight: 'bold',
  },
  h4: {
    fontSize: 27.65 * 0.8,
    fontWeight: 'bold',
  },
  p: {
    fontSize: 20 * 0.8,
  },
  logoutButtonTextStyle: {
    color:'white'
  }

});

// h1            47.78px     
// h2            39.81px     
// h3            33.18px     
// h4            27.65px     
// h5            23.04px     
// h6            19.2px     
// p            16px     
// small        13.33px     
// smaller        11.11px

// Export the component
export default ProfileScreen;
