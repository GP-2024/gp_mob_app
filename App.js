import { StatusBar } from "expo-status-bar";
import { StyleSheet, View, TouchableOpacity } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import SignupScreen from "./Screens/SignupScreen";
import LoginScreen from "./Screens/LoginScreen";
import ProfileScreen from "./Screens/ProfileScreen";
import ScanningScreen from "./Screens/ScanningScreen";
import MyPlants from "./Screens/MyPlantsScreen";

import { MaterialIcons } from "@expo/vector-icons";
import defaultStyles from "./config/styles";

const Tab = createBottomTabNavigator();

export default function App() {
    console.log("Code ran!");
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
                                size={20}
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
                    </View>
                )}
            >
                <Tab.Screen name="Login" component={LoginScreen} />
                <Tab.Screen name="Sign Up" component={SignupScreen} />
                <Tab.Screen name="Profile" component={ProfileScreen} />
                <Tab.Screen name="Scan" component={ScanningScreen} />
                <Tab.Screen name="My Plants" component={MyPlants} />
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
