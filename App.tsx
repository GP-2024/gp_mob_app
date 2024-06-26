import { StatusBar } from "expo-status-bar";
import { StyleSheet, View, TouchableOpacity } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useState, useEffect, useContext, createContext } from "react";

import { ToastProvider } from "react-native-toast-notifications";

import SignupScreen from "./Screens/SignupScreen";
import LoginScreen from "./Screens/LoginScreen";
import ProfileScreen from "./Screens/ProfileScreen";
import ScanningScreen from "./Screens/ScanningScreen";
import MyPlants from "./Screens/MyPlantsScreen";
import SearchScreen from "./Screens/SearchScreen";
import BlogsScreen from "./Screens/BlogsScreen";
import PlantProfileScreen from "./Screens/PlantProfileScreen";
import IdentificationResultsScreen from "./Screens/IdentificationResultsScreen";
import PotatoDiagnosisResultsScreen from "./Screens/PotatoDiagnosisResultsScreen";
import TesterModalScreen from "./Screens/TesterModalScreen";


import AsyncStorage from "@react-native-async-storage/async-storage";

import { MaterialIcons } from "@expo/vector-icons";
import defaultStyles from "./config/styles";

import Spinner from "react-native-loading-spinner-overlay";


import useAuth from "./components/useAuth";
import { storeTokens, clearTokens } from "./components/auth";
import { checkTokensAndActUponIt, getAccessToken } from "./components/useAuth";

function logCurrentTime() {
    const currentDate = new Date();
    const hours = currentDate.getHours();
    const minutes = currentDate.getMinutes();
    const seconds = Math.round(currentDate.getSeconds()); // Round seconds
    console.log(`Current time: ${hours}:${minutes}:${seconds}`);
}

const Tab = createBottomTabNavigator();


export const appContext = createContext({
    isLoggedIn: null,
    setIsLoggedIn: null,
    inWritingMode: null,
    setInWritingMode: null,
    showWritingModeIndicator: null,
    setShowWritingModeIndicator: null,
});

export default function App() {
    // console.log("Code ran!");
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [inWritingMode, setInWritingMode] = useState(false);
    const [showWritingModeIndicator, setShowWritingModeIndicator] =
        useState(false);

    const MINUTE_MS = 30000;


    console.log("logged?:", isLoggedIn);
    useEffect(() => {
        const interval = setInterval(() => {
            checkTokensAndActUponIt();
        }, MINUTE_MS);

        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        const checkAccessToken = async () => {
            const token = await getAccessToken();
            if (token === -1) {
                setIsLoggedIn(false);
            } else {
                setIsLoggedIn(true);
            }
        };

        checkAccessToken();
    }, []);




    return (
        <ToastProvider>
            <appContext.Provider
                value={{
                    isLoggedIn: isLoggedIn,
                    setIsLoggedIn: setIsLoggedIn,
                    inWritingMode: inWritingMode,
                    setInWritingMode: setInWritingMode,
                    showWritingModeIndicator: showWritingModeIndicator,
                    setShowWritingModeIndicator: setShowWritingModeIndicator,
                }}
            >
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

                                if (route.name === "Scan") return null;

                                return (
                                    <MaterialIcons
                                        name={iconName}
                                        size={50}
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
                                    marginBottom: 10,
                                }}
                            >
                                {isLoggedIn ?
                                    true ?
                                        (

                                            <>
                                                <TouchableOpacity
                                                    onPress={() =>
                                                        props.navigation.navigate(
                                                            "Blogs"
                                                        )
                                                    }
                                                >
                                                    <MaterialIcons
                                                        name="notes"
                                                        size={30}
                                                        color={
                                                            defaultStyles.colors.primary
                                                        }
                                                    />
                                                </TouchableOpacity>
                                                <TouchableOpacity
                                                    onPress={() =>
                                                        props.navigation.navigate(
                                                            "Profile"
                                                        )
                                                    }
                                                >
                                                    <MaterialIcons
                                                        name="person"
                                                        size={30}
                                                        color={
                                                            defaultStyles.colors.primary
                                                        }
                                                    />
                                                </TouchableOpacity>
                                                <TouchableOpacity
                                                    onPress={() =>
                                                        props.navigation.navigate(
                                                            "Scan"
                                                        )
                                                    }
                                                >
                                                    <MaterialIcons
                                                        name="camera"
                                                        size={50}
                                                        color={
                                                            defaultStyles.colors.primary
                                                        }
                                                    />
                                                </TouchableOpacity>
                                                <TouchableOpacity
                                                    onPress={() =>
                                                        props.navigation.navigate(
                                                            "My Plants"
                                                        )
                                                    }
                                                >
                                                    <MaterialIcons
                                                        name="nature"
                                                        size={30}
                                                        color={
                                                            defaultStyles.colors.primary
                                                        }
                                                    />
                                                </TouchableOpacity>
                                                <TouchableOpacity
                                                    onPress={() =>
                                                        props.navigation.navigate(
                                                            "Search"
                                                        )
                                                    }
                                                >
                                                    <MaterialIcons
                                                        name="search"
                                                        size={30}
                                                        color={
                                                            defaultStyles.colors.primary
                                                        }
                                                    />
                                                </TouchableOpacity>
                                                {/* <TouchableOpacity
                                                    onPress={() =>
                                                        props.navigation.navigate(
                                                            "Identification Results"
                                                        )
                                                    }

                                                >
                                                    <MaterialIcons
                                                        name="search"
                                                        size={30}
                                                        color={
                                                            defaultStyles.colors.primary
                                                        }
                                                    />
                                                </TouchableOpacity> */}

                                            </>
                                        )
                                        :
                                        <></>
                                    : (
                                        <>
                                            {/* <TouchableOpacity
                                                onPress={() =>
                                                    props.navigation.navigate(
                                                        "Login"
                                                    )
                                                }
                                            >
                                                <MaterialIcons
                                                    name="arrow-forward"
                                                    size={30}
                                                    color={
                                                        defaultStyles.colors.primary
                                                    }
                                                />
                                            </TouchableOpacity>
                                            <TouchableOpacity
                                                onPress={() =>
                                                    props.navigation.navigate(
                                                        "Sign Up"
                                                    )
                                                }
                                            >
                                                <MaterialIcons
                                                    name="person-add"
                                                    size={30}
                                                    color={
                                                        defaultStyles.colors.primary
                                                    }
                                                />
                                            </TouchableOpacity> */}
                                        </>
                                    )}
                            </View>
                        )}
                    >
                        {isLoggedIn ? (
                            <>
                                <Tab.Screen
                                    name="Blogs"
                                    component={BlogsScreen}
                                />
                                <Tab.Screen
                                    name="Profile"
                                    component={ProfileScreen}
                                />
                                <Tab.Screen
                                    name="Scan"
                                    component={ScanningScreen}
                                />
                                <Tab.Screen
                                    name="My Plants"
                                    component={MyPlants}
                                />
                                <Tab.Screen
                                    name="Search"
                                    component={SearchScreen}
                                />
                                <Tab.Screen
                                    name="Identification Results"
                                    component={IdentificationResultsScreen}
                                />

                            </>
                        ) : (
                            <>
                                <Tab.Screen
                                    name="Login"
                                    component={LoginScreen}
                                />
                                <Tab.Screen
                                    name="Sign Up"
                                    component={SignupScreen}
                                />
                            </>
                        )}
                    </Tab.Navigator>
                </NavigationContainer>
            </appContext.Provider>
        </ToastProvider>
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
