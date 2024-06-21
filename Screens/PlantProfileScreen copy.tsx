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
    Dimensions,
    Modal,
} from "react-native";
const { height, width } = Dimensions.get("window");
import React, { useState, useEffect, useCallback } from "react";
import { useFocusEffect } from "@react-navigation/native";

// import { Button, Text, Input, CheckBox, LinearGradient } from '@rneui/themed';
import Icon from "react-native-vector-icons/FontAwesome6";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import { Colors } from "react-native/Libraries/NewAppScreen";
import defaultStyles from "../config/styles";
import useAuth, { getAccessToken } from "../components/useAuth";
import PlantCharacteristicsViewer from "../components/PlantCharacteristicsViewer";
import axios from "axios";
const HOST = process.env.HOST;

function DictionarySmallSummaryForDebugging(dictionary) {
    console.log("===DEBUGGING DICTIONARY===");
    if (dictionary === null) {
        console.log("The dictionary is null.");
        return;
    }

    const keys = Object.keys(dictionary);
    const keyCount = keys.length;

    if (keyCount === 0) {
        console.log("The dictionary is empty.");
    } else if (keyCount <= 3) {
        console.log("The dictionary has the following keys:", keys.join(", "));
    } else {
        const firstThreeKeys = keys.slice(0, 3);
        console.log(
            `The dictionary has the following keys: ${firstThreeKeys.join(
                ", "
            )} and ${keyCount - 3} remaining keys.`
        );
    }
    console.log("==========================");
}

import AsyncStorage from "@react-native-async-storage/async-storage";

const SINGLE_PLANT_ENDPOINT = `${HOST}/perenual/plants-details`;

// Function to get plant details
const getPlantDetails = async (plantID, endpoint) => {
    try {
        // Retrieve the access token
        const token = await getAccessToken();

        // Construct the URL with the plant ID as a path variable
        const url = `${endpoint}/${plantID}`;
        console.log("URL used to try to fetch single plant:\n", url);

        // Perform the GET request with Axios
        const response = await axios.get(url, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        // Return the response data
        return response.data;
    } catch (error) {
        // Handle and throw the error for further handling
        console.error("Error fetching single plant details:", error);
        throw error;
    }
};

function extractAvailableCharacteristics(plant) {
    const extracted = {};

    // Extract scientific_name
    if (plant.scientific_name && plant.scientific_name.length > 0) {
        extracted.scientific_name = plant.scientific_name;
    }

    // Extract family
    if (plant.family) {
        extracted.family = plant.family;
    }

    // Extract type
    if (plant.type) {
        extracted.type = plant.type;
    }

    // Extract origin (first two countries or one if only one exists)
    if (plant.origin && plant.origin.length > 0) {
        extracted.origin = plant.origin.slice(0, 2);
    }

    // Extract cycle
    if (plant.cycle) {
        extracted.cycle = plant.cycle;
    }

    // Extract hardiness (average of min and max)
    if (plant.hardiness && plant.hardiness.min && plant.hardiness.max) {
        const minHardiness = parseInt(plant.hardiness.min, 10);
        const maxHardiness = parseInt(plant.hardiness.max, 10);
        if (!isNaN(minHardiness) && !isNaN(maxHardiness)) {
            extracted.hardiness = (minHardiness + maxHardiness) / 2;
        }
    }

    // Extract leaf_color (first two values or one if only one exists)
    if (plant.leaf_color && plant.leaf_color.length > 0) {
        extracted.leaf_color = plant.leaf_color.slice(0, 2);
    }

    // Extract growth_rate
    if (plant.growth_rate) {
        extracted.growth_rate = plant.growth_rate;
    }

    return extracted;
}

function extractName(plantDict) {
    function capitalizeWords(name) {
        return name.replace(/\b\w/g, (char) => char.toUpperCase());
    }

    if (plantDict.common_name) {
        return capitalizeWords(plantDict.common_name);
    } else if (
        plantDict.scientific_name &&
        plantDict.scientific_name.length > 0
    ) {
        return capitalizeWords(plantDict.scientific_name[0]);
    } else {
        return null;
    }
}

// Define the PlantProfileScreen component
const PlantProfileScreen = ({ plantID, modalSetter }) => {
    const { login, logout } = useAuth();
    const [plantDetails, setPlantDetails] = useState({});

    const closeModal = () => {
        modalSetter(false);
    };

    useFocusEffect(
        useCallback(() => {
            const fetchPlantDetails = async () => {
                try {
                    const plantDetails = await getPlantDetails(
                        plantID,
                        SINGLE_PLANT_ENDPOINT
                    );
                    DictionarySmallSummaryForDebugging(plantDetails);
                    setPlantDetails(plantDetails);
                } catch (error) {
                    console.error(
                        "Failed to fetch single plant details:",
                        error
                    );
                }
            };

            fetchPlantDetails();
        }, [])
    );

    return (
        <SafeAreaView style={styles.outerContainer}>
            <ScrollView contentContainerStyle={styles.outerContainer}>
                <View style={styles.upperBlock}>
                    <Image
                        style={styles.imageStyle}
                        source={{
                            uri: plantDetails.default_image
                                ? plantDetails.default_image.regular_url
                                : "https://i.postimg.cc/L5jFhgjy/Static-Plant-Image-Portable.jpg",
                        }}
                    />
                </View>

                <View style={styles.bottomBlock}></View>
            </ScrollView>
            <View style={styles.floatingRectangle}>
                <View>
                    <View
                        style={{
                            alignItems: "center",
                            justifyContent: "center",
                            // borderWidth: 1,
                            // borderColor: 'red',
                            paddingHorizontal: 30,
                            paddingVertical: 11,
                        }}
                    >
                        <View style={styles.plantTitleContainer}>
                            <Text style={styles.h3}>
                                {extractName(plantDetails)}
                            </Text>
                        </View>
                    </View>

                    <View
                        style={{
                            alignItems: "flex-start",
                            justifyContent: "center",
                            // borderWidth: 1,
                            // borderColor: 'red',
                            paddingHorizontal: 30,
                            paddingVertical: 7,
                        }}
                    >
                        <View style={styles.plantTitleContainer}>
                            <Icon name={"ruler"} size={20} color="black" />
                            <Text style={styles.h4}>Characteristics</Text>
                        </View>
                        <PlantCharacteristicsViewer
                            characteristics={extractAvailableCharacteristics(
                                plantDetails
                            )}
                        />
                    </View>
                </View>
            </View>
            <TouchableOpacity
                style={styles.floatingButton}
                onPress={() => {
                    closeModal();
                }}
            >
                <Icon name="chevron-left" size={20} color="#fff" />
            </TouchableOpacity>
        </SafeAreaView>
    );
};

// Define styles using StyleSheet
const styles = StyleSheet.create({
    outerContainer: {
        flex: 1,
        flexDirection: "column",
        alignItems: "stretch",
        justifyContent: "center",

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
    plantTitleContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        // borderWidth: 1,
        // borderColor: 'red',
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
    floatingRectangle: {
        position: "absolute",
        bottom: 0,
        width: width,
        height: height * 0.68,
        backgroundColor: "white",
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
    },
    secondaryTitleContainer: {
        flex: 1,
        alignItems: "flex-start",
        justifyContent: "center",
        paddingBottom: 5,

        // borderWidth: 1,
        // borderColor: 'red',
        // margin: 3,
    },
    inputContainer: {
        flex: 1,
        alignItems: "stretch",

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
    agreementContainer: {
        flexDirection: "row",
        paddingBottom: 10,
    },
    upperBlock: {
        flex: 1.05,
        backgroundColor: defaultStyles.colors.primary,
        // borderWidth: 1,
        // borderColor: 'red',
        // margin: 3,
    },
    bottomBlock: {
        flex: 2,
        // borderTopLeftRadius: 15,
        // borderWidth: 1,
        // borderColor: 'red',
        // margin: 3,
    },
    floatingContainerStyle: {
        width: "85%",
        height: "95%",
        position: "absolute",
        // borderWidth: 3,
        // borderColor: 'green',
        // margin: 10,
        alignSelf: "center",
        flexDirection: "column",
        alignItems: "stretch",
    },
    upperStrip: {
        flexDirection: "row",
        justifyContent: "flex-end",
        paddingBottom: 40,
    },
    logoutButtonStyle: {
        borderWidth: 1,
        borderColor: "white",
        borderRadius: 5,
        paddingVertical: 3,
        paddingHorizontal: 7,
        backgroundColor: "transparent",
    },
    pfpContainerStyle: {
        // borderWidth: 3,
        // borderColor: 'green',
        alignItems: "center",
        paddingBottom: 15,
    },
    imageStyle: {
        width: "100%",
        height: "100%",
        // borderWidth: 7,
        // borderColor: 'white',
    },
    nameContainerStyle: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        paddingBottom: 10,
    },
    nameEditButtonStyle: {
        paddingHorizontal: 5,
        paddingVertical: 5,
        borderRadius: 5,
    },
    bioContainerStyle: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        paddingBottom: 35,
    },
    bioEditButtonStyle: {
        paddingHorizontal: 5,
        paddingVertical: 5,
        borderRadius: 5,
    },
    labelStyle: {
        fontSize: 17,
    },
    valueStyle: {
        fontSize: 17,
        fontWeight: "normal",
    },
    labelValueStyle: {
        paddingBottom: 30,
    },
    valueContainerStyle: {
        flexDirection: "row",
    },
    h3: {
        fontSize: 33.18 * 0.8,
        fontWeight: "bold",
        textAlign: "center",
    },
    h4: {
        paddingLeft: 10,
        fontSize: 30 * 0.8,
        fontWeight: "bold",
    },
    p: {
        fontSize: 20 * 0.8,
    },
    logoutButtonTextStyle: {
        color: "white",
    },
    floatingButton: {
        position: "absolute",
        top: 20,
        left: 20,
        width: 40,
        height: 40,
        backgroundColor: "black",
        borderRadius: 25,
        alignItems: "center",
        justifyContent: "center",
        elevation: 5, // for shadow on Android
        shadowColor: "#000", // for shadow on iOS
        shadowOffset: { width: 0, height: 2 }, // for shadow on iOS
        shadowOpacity: 0.8, // for shadow on iOS
        shadowRadius: 2, // for shadow on iOS
        opacity: 0.7,
    },
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
export default PlantProfileScreen;
