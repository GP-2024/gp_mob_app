// Import necessary React Native components
import {
    View,
    Alert,
    Text,
    Button,
    Pressable,
    TextInput,
    StyleSheet,
    SafeAreaView,
    ScrollView,
} from "react-native";
import React, { useState } from "react";
// import { Button, Text, Input, LinearGradient } from '@rneui/themed';
import Icon from "react-native-vector-icons/FontAwesome6";

import { Colors } from "react-native/Libraries/NewAppScreen";

// Define the LoginScreen component
const LoginScreen = ({ navigation }) => {
    // State variables for handling user input
    const [email, setemail] = useState("");
    const [password, setpassword] = useState("");

    // Function to handle the login button press
    const handleLogin = () => {
        console.log("Login button pressed");
        fetch("https://gp-backend-w5ro.onrender.com/auth/local/signin", {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email: email,
                password: password,
            }),
        })
            .then((response) => response.json())
            .then((data) => {
                console.log("====================");
                logCurrentTime();
                console.log("Response!!");
                console.log("email: ", email);
                console.log("password: ", password);
                console.log(JSON.stringify(data));
                console.log(Object.keys(data));
                if (
                    Object.keys(data).length === 2 &&
                    Object.keys(data)[0] === "access_token" &&
                    Object.keys(data)[1] === "refresh_token"
                ) {
                    Alert.alert("", "Login successful. Welcome!");
                } else {
                    Alert.alert("Incorrect E-mail or password");
                }

                console.log("====================");

                // if (data.message === "This user already exists") {
                //   Alert.alert(data.message + ".");
                // } else if (data.message === "User Registered Successful") {
                //   Alert.alert("", "Account has been created successfully!\nYou can now login using the newly created account.");
                // } else {
                //   Alert.alert("", "Please ensure all fields are filled validly before proceeding.");
                // }

                // Handle response data
            })
            .catch((error) => {
                Alert.alert(
                    "Couldn't connect to the server!",
                    "Make sure there is internet access."
                ); // Show error message in alert
                console.error("Error:", error);
                // Handle errors
            });
    };

    function logCurrentTime() {
        const currentDate = new Date();
        const hours = currentDate.getHours();
        const minutes = currentDate.getMinutes();
        const seconds = Math.round(currentDate.getSeconds()); // Round seconds

        console.log(`Current time: ${hours}:${minutes}:${seconds}`);
    }

    return (
        <SafeAreaView style={styles.outerContainer}>
            <ScrollView>
                <View style={styles.topBanner}>
                    <Icon name="plant-wilt" size={65} color="#2089DC" />
                </View>

                <View style={styles.topTitleContainer}>
                    <Text style={styles.h3}>From Root To Bloom</Text>
                </View>

                <View style={styles.secondaryTitleContainer}>
                    <Text style={styles.h4}>Login To Your Account</Text>
                </View>

                <View style={styles.inputContainer}>
                    <TextInput
                        style={styles.input}
                        placeholder="E-mail"
                        value={email}
                        onChangeText={(value) => {
                            setemail(value);
                        }}
                    />
                </View>

                <View style={styles.inputContainer}>
                    <TextInput
                        style={styles.input}
                        placeholder="Password"
                        secureTextEntry={true}
                        value={password}
                        onChangeText={(value) => {
                            setpassword(value);
                        }}
                    />
                </View>

                <View style={styles.sideButtonContainer}>
                    <Pressable
                        style={styles.minorButtonPressable}
                        onPress={() =>
                            console.log(
                                "Should redirect to password reset page"
                            )
                        }
                    >
                        <Text style={styles.minorButtonText}>
                            Forgot The Password?
                        </Text>
                    </Pressable>
                </View>

                <View style={styles.buttonContainer}>
                    <Button
                        title="Login"
                        onPress={() => {
                            handleLogin();
                        }}
                    ></Button>

                    {/* <Button

            ////////
            onPress={() => {
              fetch('https://gp-backend-65w7.onrender.com/auth/local/signin', {
                method: 'POST',
                headers: {
                  Accept: 'application/json',
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                  "email": email,
                  "password": password
                }),
              })
                .then(response => response.json())
                .then(data => {
                  console.log("====================");
                  logCurrentTime();
                  console.log("Response!!");
                  console.log("email: ", email);
                  console.log("password: ", password);
                  console.log(JSON.stringify(data));
                  console.log(Object.keys(data));
                  if (Object.keys(data).length === 2 &&
                    Object.keys(data)[0] === "access_token" &&
                    Object.keys(data)[1] === "refresh_token") {
                    Alert.alert("", "Login successful. Welcome!");
                  }

                  console.log("====================");

                  // if (data.message === "This user already exists") {
                  //   Alert.alert(data.message + ".");
                  // } else if (data.message === "User Registered Successful") {
                  //   Alert.alert("", "Account has been created successfully!\nYou can now login using the newly created account.");
                  // } else {
                  //   Alert.alert("", "Please ensure all fields are filled validly before proceeding.");
                  // }

                  // Handle response data
                })
                .catch(error => {
                  Alert.alert("", error.message); // Show error message in alert
                  console.error('Error:', error);
                  // Handle errors
                })
            }
            }



            ////////

            size="lg">Login</Button> */}
                </View>

                <View style={styles.horizContainer}>
                    <View style={styles.centerContainer}>
                        <Text>Don't have an account?</Text>

                        <Pressable
                            style={styles.minorButtonPressable}
                            onPress={() => navigation.navigate("Sign Up")}
                        >
                            <Text style={styles.minorButtonText}>Sign Up</Text>
                        </Pressable>
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
        flexDirection: "column",
        alignItems: "stretch",
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
        alignItems: "center",
        justifyContent: "center",
        paddingBottom: 40,

        // borderWidth: 1,
        // borderColor: 'red',
        // margin: 3,
    },
    topTitleContainer: {
        flex: 1,
        alignItems: "flex-start",
        justifyContent: "center",
        paddingBottom: 10,

        // borderWidth: 1,
        // borderColor: 'red',
        // margin: 3,
    },
    secondaryTitleContainer: {
        flex: 1,
        alignItems: "flex-start",
        justifyContent: "center",
        paddingBottom: 10,

        // borderWidth: 1,
        // borderColor: 'red',
        // margin: 3,
    },
    inputContainer: {
        flex: 1,
        alignItems: "stretch",
        paddingBottom: 10,

        // borderWidth: 1,
        // borderColor: 'red',
        // margin: 3,
    },
    sideButtonContainer: {
        flex: 0.5,
        alignItems: "flex-end",
        justifyContent: "flex-start",

        // borderWidth: 1,
        // borderColor: 'red',
        // margin: 3,
    },
    buttonContainer: {
        flex: 1,
        alignItems: "stretch",
        justifyContent: "center",
        marginTop: 10,
        marginBottom: 5,

        // borderWidth: 1,
        // borderColor: 'red',
        // margin: 3,
    },
    horizContainer: {
        flex: 0.6,
        flexDirection: "row",
        alignItems: "stretch",

        // borderWidth: 1,
        // borderColor: 'red',
        // margin: 3,
    },
    centerContainer: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",

        // borderWidth: 1,
        // borderColor: 'red',
        // margin: 3,
    },
    h3: {
        fontSize: 33.18 * 0.8,
        fontWeight: "bold",
    },
    h4: {
        fontSize: 27.65 * 0.8,
        fontWeight: "bold",
    },
    input: {
        paddingLeft: 10,
        fontSize: 20 * 0.8,
        backgroundColor: "white",
        height: 40,
        borderRadius: 5,
        // borderWidth: 1,
        // borderColor: 'red',
    },
    minorButtonText: {
        textDecorationLine: "underline",
        color: "#2089DC",
        fontWeight: "bold",
    },
    minorButtonPressable: {
        marginLeft: 5,
    },
});

// Export the component
export default LoginScreen;
