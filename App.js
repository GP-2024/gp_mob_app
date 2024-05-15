import { StatusBar } from "expo-status-bar";
import { StyleSheet, View, TouchableOpacity } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import SignupScreen from "./Screens/SignupScreen";
import LoginScreen from "./Screens/LoginScreen";
import ProfileScreen from "./Screens/ProfileScreen";
import ScanningScreen from "./Screens/ScanningScreen";
import MyPlants from "./Screens/MyPlantsScreen";
import SearchScreen from "./Screens/SearchScreen";

import AsyncStorage from '@react-native-async-storage/async-storage';

import { MaterialIcons } from "@expo/vector-icons";
import defaultStyles from "./config/styles";

import useAuth from './components/useAuth';
import { getAccessToken, getRefreshToken, saveTokens, clearTokens } from './components/auth';

function logCurrentTime() {
    const currentDate = new Date();
    const hours = currentDate.getHours();
    const minutes = currentDate.getMinutes();
    const seconds = Math.round(currentDate.getSeconds()); // Round seconds

    console.log(`Current time: ${hours}:${minutes}:${seconds}`);
}

// const getData = async () => {
//     try {
//         const jsonValue = await AsyncStorage.getItem('app_data');
//         if (jsonValue != null) {
//             logCurrentTime();
//             console.log("=============");
//             console.log(JSON.parse(jsonValue));
//             console.log("=============");
//             return JSON.parse(jsonValue);
//         } else {
//             console.log("=============");
//             console.log(null);
//             console.log("=============");
//             return null;
//         }
//         logCurrentTime();
//     } catch (e) {
//         console.log("Error fetching asyn storage");
//         // error reading value
//     }
// };

// const storeData = async (value) => {
//     try {
//         const jsonValue = JSON.stringify(value);
//         await AsyncStorage.setItem('app_data', jsonValue);
//     } catch (e) {
//         // saving error
//         console.log(e)
//     }
// };



const Tab = createBottomTabNavigator();


// let isLoggedIn = false;

export default function App() {
    console.log("Code raan!");
    const { isLoggedIn, login, logout } = useAuth();
    // if (getData() !== null && 'access_token' in Object.keys(getData()) && 'refresh_token' in Object.keys(getData())) {
    //     isLoggedIn = true;
    // } else {
    //     isLoggedIn = false;
    // }

    console.log("***debug***");
    logCurrentTime();
    // console.log(getData());
    // console.log(isLoggedIn);
    console.log("*******");
    console.log("getRefreshToken():");
    getAccessToken()
        .then(token => {
            console.log('Access Token:', token);
        })
        .catch(error => {
            console.error('Error:', error);
        });

    // isLoggedIn = true;
    return (
        <NavigationContainer>
            <Tab.Navigator
                screenOptions={({ route }) => ({
                    tabBarIcon: ({ focused, color, size }) => {
                        let iconName;

                        if (route.name === "Login") {
                            iconName = "arrow-forward";
                        } else if (route.name === "Sign Up") {
                            iconName = "person-add";
                        } else if (route.name === "Profile") {
                            iconName = "person";
                        } else if (route.name === "Scan") {
                            iconName = "camera";
                        } else if (route.name === "My Plants") {
                            iconName = "nature";
                        }

                        // Don't show icon for Scan tab.
                        if (route.name === "Scan") return null;

                        return (
                            <MaterialIcons
                                name={iconName}
                                size={25}
                                color={defaultStyles.colors.primary}
                            />
                        );
                    },
                    tabBarActiveTintColor: "black",
                    tabBarInactiveTintColor: "gray",
                })}
                tabBar={(props) => (
                    <View
                        style={{
                            flexDirection: "row",
                            justifyContent: "space-around",
                            alignItems: "center",
                        }}
                    >
                        {isLoggedIn ?
                            <>
                                <TouchableOpacity
                                    onPress={() => props.navigation.navigate("Scan")}
                                >
                                    <MaterialIcons
                                        name="camera"
                                        size={50}
                                        color={defaultStyles.colors.primary}
                                    />
                                </TouchableOpacity>
                                <TouchableOpacity
                                    onPress={() => props.navigation.navigate("Profile")}
                                >
                                    <MaterialIcons
                                        name="person"
                                        size={25}
                                        color={defaultStyles.colors.primary}
                                    />
                                </TouchableOpacity>
                                <TouchableOpacity
                                    onPress={() =>
                                        props.navigation.navigate("My Plants")
                                    }
                                >
                                    <MaterialIcons
                                        name="nature"
                                        size={25}
                                        color={defaultStyles.colors.primary}
                                    />
                                </TouchableOpacity>
                                <TouchableOpacity
                                    onPress={() =>
                                        props.navigation.navigate("Search")
                                    }
                                >
                                    <MaterialIcons
                                        name="search"
                                        size={25}
                                        color={defaultStyles.colors.primary}
                                    />
                                </TouchableOpacity>

                            </>
                            :
                            <>
                                <TouchableOpacity
                                    onPress={() => props.navigation.navigate("Login")}
                                >
                                    <MaterialIcons
                                        name="arrow-forward"
                                        size={25}
                                        color={defaultStyles.colors.primary}
                                    />
                                </TouchableOpacity>
                                <TouchableOpacity
                                    onPress={() => props.navigation.navigate("Sign Up")}
                                >
                                    <MaterialIcons
                                        name="person-add"
                                        size={25}
                                        color={defaultStyles.colors.primary}
                                    />
                                </TouchableOpacity>
                            </>
                        }

                    </View>
                )}
            >

                {isLoggedIn ?
                    <>
                        <Tab.Screen name="Profile" component={ProfileScreen} />
                        <Tab.Screen name="Scan" component={ScanningScreen} />
                        <Tab.Screen name="My Plants" component={MyPlants} />
                        <Tab.Screen name="Search" component={SearchScreen} />
                    </>
                    :
                    <>
                        <Tab.Screen name="Login" component={LoginScreen} />
                        <Tab.Screen name="Sign Up" component={SignupScreen} />
                    </>
                }



            </Tab.Navigator>
        </NavigationContainer>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
    },
});
