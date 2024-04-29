// Import necessary React Native components
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
} from "react-native";
import React, { useState } from "react";
import type { PropsWithChildren } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
// import {  LinearGradient } from '@rneui/themed';
import Icon from "react-native-vector-icons/FontAwesome6";
import { NavigationScreenProps } from "react-navigation";
import SignupScreen from "./SignupScreen";
import ItemCard from "../components/ItemCard";

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

const gridRenderItem = ({ item }) => (
    <ItemCard
        itemName={item.itemName}
        itemImageUrl={item.itemImageUrl}
        itemDescription={item.itemDescription}
    />
);

// Define the MyPlants component
const MyPlants = () => {
    //   <ItemCard
    //   itemImageUrl={'https://i.postimg.cc/432dzftH/proxy-image.jpg'}
    //   itemName={'Swiss Cheese Plant'}
    //   itemDescription={'Botanical Name: Monstera deliciosa\nHabibat: Central and South America\nCommon Uses: Houseplant'}
    // />

    // <ItemCard
    //   itemImageUrl={'https://i.postimg.cc/BQYNjyQY/proxy-image2.jpg'}
    //   itemName={'Rose'}
    //   itemDescription={'Botanical Name:\nRosa spp\nHabibat: Temperate regions\nCommon Uses: Ornamental, cut flowers'}
    // />

    return (
        <SafeAreaView style={styles.outerContainer}>
            <FlatList
                data={plantsData}
                renderItem={gridRenderItem}
                keyExtractor={(item) => item.id}
                numColumns={2}
            />
        </SafeAreaView>
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
        flexDirection: "row",
        alignItems: "stretch",
        paddingHorizontal: 18,
        paddingVertical: 19,

        // borderWidth: 1,
        // borderColor: 'black',
        margin: 3,
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
    buttonContainerStyle: {
        // flex: 200, heree
        // borderWidth: 1,
        // borderColor: 'red',
        alignItems: "center",
        justifyContent: "center",
    },
    separatorContainerStyle: {
        flex: 1,
        // borderWidth: 1,
        // borderColor: 'red',
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
