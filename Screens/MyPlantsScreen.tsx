import {
    View,
    Alert,
    FlatList,
    Button,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    SafeAreaView,
    ScrollView,
    Pressable,
    Modal
} from "react-native";
import React, { useState, useEffect } from "react";
import type { PropsWithChildren } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
// import {  LinearGradient } from '@rneui/themed';
import Icon from "react-native-vector-icons/FontAwesome6";
import { NavigationScreenProps } from "react-navigation";
import SignupScreen from "./SignupScreen";
import ItemCard from "../components/ItemCard";
import { getAccessToken } from "../components/useAuth";
import axios from "axios";
const HOST = process.env.HOST;
import PlantProfileScreen from "./PlantProfileScreen";

import { Colors } from "react-native/Libraries/NewAppScreen";

const plantsData = [
    {
        id: 1,
        itemImageUrl: "https://i.postimg.cc/432dzftH/proxy-image.jpg",
        itemName: "Swiss Cheese Plant",
        itemDescription:
            "Botanical Name: Monstera deliciosa\nHabibat: Central and South America\nCommon Uses: Houseplant",
    },

    {
        id: 2,
        itemImageUrl: "https://i.postimg.cc/BQYNjyQY/proxy-image2.jpg",
        itemName: "Rose",
        itemDescription:
            "Botanical Name:\nRosa spp\nHabibat: Temperate regions\nCommon Uses: Ornamental, cut flowers",
    },
    {
        id: 3,
        itemImageUrl: "https://i.postimg.cc/L54VqfNf/proxy-image.jpg",
        itemName: "Lavender",
        itemDescription:
            "Botanical Name:\nLavandula spp\nHabibat: The Mediterranean region\nCommon Uses: Fragrant purple flowers.",
    },
    {
        id: 4,
        itemImageUrl: "https://i.postimg.cc/HxMLQPP1/proxy-image.jpg",
        itemName: "Tomato",
        itemDescription:
            "Botanical Name:\nSolanum lycopersicum\nHabibat: Full sun, fertile soil\nCommon Uses: Edible fruit",
    },
    {
        id: 5,
        itemImageUrl: "https://i.postimg.cc/mkZ0bP9p/proxy-image.jpg",
        itemName: "Basil",
        itemDescription:
            "Botanical Name:\nOcimum basilicum\nHabibat: Full sun to partial shade, moist soil\nCommon Uses: Fragrant leaves, culinary herb",
    },
];

function getDescription(item) {
    item = item.Plant;
    const scientificName =
        item.scientific_name.length > 0 ? item.scientific_name[0] : "N/A";
    let description = `• Scientific Name:\n${scientificName}\n`;

    if (item.family !== null) {
        description += `• Family: ${item.family}\n`;
    }

    if (item.type !== null) {
        description += `• Type: ${item.type}\n`;
    }

    return description.trim(); // Remove trailing whitespace
}

function getDescriptionDict(item) {
    item = item.Plant;
    const scientificName =
        item.scientific_name.length > 0 ? item.scientific_name[0] : "N/A";
    const description = {
        "Scientific Name": scientificName
    };

    if (item.family !== null) {
        description["Family"] = item.family;
    }

    if (item.type !== null) {
        description["Type"] = item.type;
    }

    return description;
}



const fetchMyPlants = async () => {
    try {
        const accessToken = await getAccessToken();
        const response = await axios.get(`${HOST}/my-plants`, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });
        console.log("Plants in my collection:", response.data.total, "plant/s");
        return response.data.plants;
    } catch (error) {
        throw error;
    }
};

// Define the MyPlants component
const MyPlants = ({ navigation }) => {
    const [myPlants, setMyPlants] = useState([]);
    const [modalShown, setModalShown] = useState(false);
    const [requestedItemID, setRequestedItemID]=useState('');

    useEffect(() => {
        const fetchPlants = async () => {
            try {
                const plants = await fetchMyPlants();
                setMyPlants(plants);
            } catch (error) {
                console.error("Error fetching my plants:", error);
            }
        };

        fetchPlants();

        const unsubscribe = navigation.addListener("focus", () => {
            // The screen is focused
            // Call any action and update data
            fetchPlants();
        });

        // Return the function to unsubscribe from the event so it gets removed on unmount
        return unsubscribe;
    }, [navigation]);

    const gridRenderItem = ({ item }) => (
        <ItemCard
            itemID={item.Plant.id}
            itemName={item.Plant.common_name}
            itemImageUrl={
                item.Plant.default_image
                    ? item.Plant.default_image.small_url
                    : "https://i.postimg.cc/P58dnS0W/default-Plant-Image.jpg"
            }
            itemDescriptionDict={getDescriptionDict(item)}
            requestedItemSetter={setRequestedItemID}
            modalSetter={setModalShown}
        />
    );

    return (
        <SafeAreaView style={styles.outerContainer}>
            <FlatList
                data={myPlants}
                renderItem={gridRenderItem}
                keyExtractor={(item) => item.id}
            // numColumns={2}
            />
            <Modal
                visible={modalShown}
            >
                <View style={{ flex: 1 }} >
                    <PlantProfileScreen plantID={requestedItemID} modalSetter={setModalShown} ></PlantProfileScreen>
                </View>
            </Modal>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    outerContainer: {
        flex: 1,
        flexDirection: "row",
        alignItems: "stretch",
        paddingHorizontal: 18,
        paddingTop: 19,

        margin: 3,
    },
    topBanner: {
        flex: 3.5,
        alignItems: "center",
        justifyContent: "center",
        paddingBottom: 40,
    },
    topTitleContainer: {
        flex: 1,
        alignItems: "flex-start",
        justifyContent: "center",
        paddingBottom: 10,
    },
    secondaryTitleContainer: {
        flex: 1,
        alignItems: "flex-start",
        justifyContent: "center",
        paddingBottom: 5,
    },
    inputContainer: {
        flex: 1,
        alignItems: "stretch",
    },
    sideButtonContainer: {
        flex: 0.5,
        alignItems: "flex-end",
        justifyContent: "flex-start",
    },
    buttonContainer: {
        flex: 1,
        alignItems: "stretch",
        justifyContent: "center",
    },
    horizContainer: {
        flex: 0.6,
        flexDirection: "row",
        alignItems: "stretch",
    },
    centerContainer: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
    },
    buttonContainerStyle: {
        alignItems: "center",
        justifyContent: "center",
    },
    separatorContainerStyle: {
        flex: 1,
        backgroundColor: "black",
    },
    indentificationButtonStyle: {
        width: 200,
        height: 200,
        borderRadius: 200 / 20,
        backgroundColor: "#2089DC",
        padding: 20,
    },
    scanButtonContentStyle: {
        flexDirection: "column",
        paddingHorizontal: 5,
    },
    scanButtonTextStyle: {
        color: "white",
        fontSize: 39.81 * 0.8,
        fontWeight: "bold",
    },
});

// Export the component
export default MyPlants;
