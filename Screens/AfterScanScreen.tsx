// // Import necessary React Native components
// import {
//     View,
//     Alert,
//     TextInput,
//     TouchableOpacity,
//     StyleSheet,
//     SafeAreaView,
//     ScrollView,
// } from "react-native";
// import React, { useState } from "react";
// import type { PropsWithChildren } from "react";
// import { NavigationContainer } from "@react-navigation/native";
// import { createNativeStackNavigator } from "@react-navigation/native-stack";
// import { Button, Text, Input, LinearGradient } from "@rneui/themed";
// import Icon from "react-native-vector-icons/FontAwesome6";
// import { NavigationScreenProps } from "react-navigation";
// import SignupScreen from "./SignupScreen";

// import { Colors } from "react-native/Libraries/NewAppScreen";

// // Define the AfterScanScreen component
// const AfterScanScreen = () => {
//     // State variables for handling user input
//     const [username, setUsername] = useState("");
//     const [password, setPassword] = useState("");

//     // Function to handle the login button press
//     const handleLogin = () => {
//         // Add your login logic here
//         console.log("Login button pressed");
//     };

//     return (
//         <SafeAreaView style={styles.outerContainer}>
//             <ScrollView contentContainerStyle={styles.outerContainer}>
//                 <View style={styles.upperHalfStyle}>
//                     <Button
//                         buttonStyle={styles.indentificationButtonStyle}
//                         onPress={() =>
//                             Alert.alert(
//                                 "app should move you to identification camera!"
//                             )
//                         }
//                         color="#2089DC"
//                     >
//                         <View style={styles.scanButtonContentStyle}>
//                             <Icon name="expand" size={70} color="white" />
//                             <Text h2Style={styles.scanButtonTextStyle} h2>
//                                 Identify a Plant
//                             </Text>
//                         </View>
//                     </Button>
//                 </View>

//                 <View style={styles.separatorContainerStyle}></View>

//                 <View style={styles.bottomHalfStyle}>
//                     <Button
//                         buttonStyle={styles.indentificationButtonStyle}
//                         onPress={() =>
//                             Alert.alert(
//                                 "app should move you to diagnosis camera!"
//                             )
//                         }
//                         color="#2089DC"
//                     >
//                         <View style={styles.scanButtonContentStyle}>
//                             <Icon name="expand" size={70} color="white" />
//                             <Text h2Style={styles.scanButtonTextStyle} h2>
//                                 Diagnose a Plant
//                             </Text>
//                         </View>
//                     </Button>
//                 </View>
//             </ScrollView>
//         </SafeAreaView>
//     );
// };

// // Define styles using StyleSheet
// const styles = StyleSheet.create({
//     outerContainer: {
//         flex: 1,
//         flexDirection: "column",
//         alignItems: "stretch",
//         paddingHorizontal: 18,
//         paddingVertical: 19,

//         // borderWidth: 1,
//         // borderColor: 'red',
//         // margin: 3,
//     },
//     topBanner: {
//         flex: 3.5,
//         alignItems: "center",
//         justifyContent: "center",
//         paddingBottom: 40,

//         // borderWidth: 1,
//         // borderColor: 'red',
//         // margin: 3,
//     },
//     topTitleContainer: {
//         flex: 1,
//         alignItems: "flex-start",
//         justifyContent: "center",
//         paddingBottom: 10,

//         // borderWidth: 1,
//         // borderColor: 'red',
//         // margin: 3,
//     },
//     secondaryTitleContainer: {
//         flex: 1,
//         alignItems: "flex-start",
//         justifyContent: "center",
//         paddingBottom: 5,

//         // borderWidth: 1,
//         // borderColor: 'red',
//         // margin: 3,
//     },
//     inputContainer: {
//         flex: 1,
//         alignItems: "stretch",
//         // borderWidth: 1,
//         // borderColor: 'red',
//         // margin: 3,
//     },
//     sideButtonContainer: {
//         flex: 0.5,
//         alignItems: "flex-end",
//         justifyContent: "flex-start",

//         // borderWidth: 1,
//         // borderColor: 'red',
//         // margin: 3,
//     },
//     buttonContainer: {
//         flex: 1,
//         alignItems: "stretch",
//         justifyContent: "center",

//         // borderWidth: 1,
//         // borderColor: 'red',
//         // margin: 3,
//     },
//     horizContainer: {
//         flex: 0.6,
//         flexDirection: "row",
//         alignItems: "stretch",

//         // borderWidth: 1,
//         // borderColor: 'red',
//         // margin: 3,
//     },
//     centerContainer: {
//         flex: 1,
//         flexDirection: "row",
//         alignItems: "center",
//         justifyContent: "center",

//         // borderWidth: 1,
//         // borderColor: 'red',
//         // margin: 3,
//     },
//     upperHalfStyle: {
//         flex: 200,
//         // borderWidth: 1,
//         // borderColor: 'red',
//         alignItems: "center",
//         justifyContent: "center",
//     },
//     separatorContainerStyle: {
//         flex: 1,
//         // borderWidth: 1,
//         // borderColor: 'red',
//         backgroundColor: "black",
//     },
//     bottomHalfStyle: {
//         flex: 200,
//         // borderWidth: 1,
//         // borderColor: 'red',
//         alignItems: "center",
//         justifyContent: "center",
//     },
//     indentificationButtonStyle: {
//         width: 200,
//         height: 200,
//         borderRadius: 200 / 20,
//     },
//     scanButtonContentStyle: {
//         flexDirection: "column",
//         paddingHorizontal: 5,
//     },
//     scanButtonTextStyle: {
//         color: "white",
//     },
// });

// // Export the component
// export default AfterScanScreen;
