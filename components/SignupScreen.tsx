// Import necessary React Native components
import { View, Alert, Button, Pressable, Text, TextInput, TouchableOpacity, StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import React, { useState } from 'react';
import type { PropsWithChildren } from 'react';
// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// import { Button, Text, Input, CheckBox, LinearGradient } from '@rneui/themed';
import Icon from 'react-native-vector-icons/FontAwesome6';
import BouncyCheckbox from "react-native-bouncy-checkbox";
// import LoginScreen from './LoginScreen';
import {
  Colors,
} from 'react-native/Libraries/NewAppScreen';

// Define the SignupScreen component
const SignupScreen = ({ navigation }) => {
  // State variables for handling user input
  const [fullName, setfullName] = useState('');
  const [email, setemail] = useState('');
  const [username, setusername] = useState('');
  const [password, setpassword] = useState('');
  const [termsAgreement, settermsAgreement] = useState(true);



  function logCurrentTime() {
    const currentDate = new Date();
    const hours = currentDate.getHours();
    const minutes = currentDate.getMinutes();
    const seconds = Math.round(currentDate.getSeconds()); // Round seconds

    console.log(`Current time: ${hours}:${minutes}:${seconds}`);
  }

  function handleSignup() {

    var nameArray = fullName.split(' ');

    // Initialize firstName and familyName variables
    var firstName = "", familyName = "";

    // Check the length of the nameArray
    if (nameArray.length === 1) {
      firstName = nameArray[0];
      familyName = ""; // Set familyName as an empty string
    } else {
      firstName = nameArray[0];
      familyName = nameArray.slice(1).join(' '); // Join remaining words to form familyName
    }

    if (termsAgreement === true) {
      console.log("clicked 'create and account'")
      fetch('https://gp-backend-w5ro.onrender.com/auth/local/signup', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          username: username,
          firstName: firstName,
          lastName: familyName,
          password: password,
        }),
      })
        .then(response => response.json())
        .then(data => {
          console.log("====================");
          logCurrentTime();
          console.log("Response!!");
          console.log("firstName:", firstName);
          console.log("familyName:", familyName);
          console.log("full name: ", fullName);
          console.log("email: ", email);
          console.log("password: ", password);
          console.log("username: ", username);
          console.log("terms agreed? ", termsAgreement);
          console.log(JSON.stringify(data.message));
          console.log("====================");

          if (data.message === "This user already exists") {
            Alert.alert("", data.message + ".");
          } else if (data.message === "User Registered Successful") {
            Alert.alert("", "Account has been created successfully!\nYou can now login using the newly created account.");
          } else {
            Alert.alert("", "Please ensure all fields are filled validly before proceeding.");
          }

          // Handle response data
        })
        .catch(error => {
          Alert.alert("", error.message); // Show error message in alert
          console.error('Error:', error);
          // Handle errors
        })
    } else {
      Alert.alert("", "You have to agree to the Terms of Service in order to create an account.");
    }


  }

  return (
    <SafeAreaView style={styles.outerContainer} >
      <ScrollView>

        <View style={styles.topBanner}>
          <Icon
            name='plant-wilt'
            size={65}
            color='#2089DC'
          />
        </View>

        <View style={styles.topTitleContainer}>

          <Text style={styles.h3} h3>From Root To Bloom</Text>

        </View>

        <View style={styles.secondaryTitleContainer}>

          <Text style={styles.h4} h4>Create an account</Text>

        </View>

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            onChangeText={value => { setfullName(value) }}
            value={fullName}
            placeholder="Full Name"
          // keyboardType="numeric"
          />
          {/* <Input
            // placeholder='Full Name'
            // value={fullName}
            // onChangeText={value => { setfullName(value) }}
            // leftIcon={
            //   <Icon
            //     name='angle-right'
            //     size={15}
            //     color='black'
            //   />
            // }
          /> */}
        </View>

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            onChangeText={value => { setemail(value) }}
            value={email}
            placeholder="E-mail"
          // keyboardType="numeric"
          />
          {/* <Input
            placeholder='E-mail'
            value={email}
            onChangeText={value => { setemail(value) }}
            leftIcon={
              <Icon
                name='angle-right'
                size={15}
                color='black'
              />
            }
          /> */}
        </View>

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            onChangeText={value => { setusername(value) }}
            value={username}
            placeholder="Username"
          // keyboardType="numeric"
          />
          {/* <Input
            // placeholder='Username'
            // value={username}
            // onChangeText={value => { setusername(value) }}
            // leftIcon={
            //   <Icon
            //     name='angle-right'
            //     size={15}
            //     color='black'
            //   />
            // }
          /> */}
        </View>


        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            onChangeText={value => { setpassword(value) }}
            value={password}
            placeholder="Password"
          // keyboardType="numeric"
          />
          {/* <Input
            // placeholder='Password'
            // secureTextEntry={true}
            // value={password}
            // onChangeText={value => { setpassword(value) }}
            // leftIcon={
            //   <Icon
            //     name='angle-right'
            //     size={15}
            //     color='black'
            //   />
            // }
          /> */}

        </View>

        <View style={styles.agreementContainer}>
          <BouncyCheckbox
            text="I agree to the "
            fillColor="#2089DC"
            textStyle={{
              fontSize: 14,
              textDecorationLine: "none",
              color: "black",
            }}
            bounceVelocityIn={0}
            bounceVelocityOut={0}
            bouncinessIn={0}
            bouncinessOut={0}

            onPress={(isChecked: boolean) => {
              console.log(termsAgreement);
              settermsAgreement(isChecked)
            }}
          />

          <Pressable style={styles.TOSButton}
            onPress={() => {
              console.log("App expected to be sending user to TOS page.")
            }}
          >
            <Text style={styles.TOSButtonText} >Terms Of Service</Text>
          </Pressable>

          {/* <Button size="sm" title="Terms of Service" type="clear" /> */}

        </View>

        <View style={styles.buttonContainer}>
          <Button
            title='Create An Account'
            onPress={() => {
              handleSignup();
            }}
          >
          </Button>
        </View>


        <View style={styles.horizContainer}>
          <View style={styles.centerContainer}>

            <Text>Already have an account?</Text>
            <Pressable style={styles.TOSButton}
              onPress={() => navigation.navigate('Login')}
            >
              <Text style={styles.TOSButtonText} >Sign In</Text>
            </Pressable>

          </View>

        </View>


      </ScrollView>
    </SafeAreaView >
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
  outerContainer: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'stretch',
    paddingTop: 40,
    paddingBottom: 70,
    paddingLeft: 30,
    paddingRight: 30,

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
    marginTop:10,

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
export default SignupScreen;
