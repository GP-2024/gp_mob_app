import { View, Image, Dimensions, Text, StyleSheet } from "react-native";
import React from "react";
import defaultStyles from "../config/styles";

const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;
const widthFactor = 0.9;
const heightFactor = 0.4;

const ItemCard = ({ itemImageUrl, itemName, itemDescription }) => {
    return (
        <View style={styles.card}>
            <Image
                style={styles.cardImageStyle}
                source={{
                    uri: itemImageUrl,
                }}
            />
            <View style={styles.cardContent}>
                <Text style={styles.h5}>{itemName}</Text>
                <Text style={styles.p}>{itemDescription}</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    card: {
        borderRadius: 15,
        width: screenWidth * widthFactor,
        height: screenHeight * heightFactor,
        backgroundColor: defaultStyles.colors.primaryBackground,
        marginBottom: 20,
        overflow: "hidden",
        shadowColor: defaultStyles.colors.black,
        shadowOffset: {
            width: 0,
            height: 10,
        },
        shadowOpacity: 0.3,
        shadowRadius: 20,
        elevation: 10,
    },
    cardImageStyle: {
        width: "100%",
        height: "60%",
    },
    cardContent: {
        padding: 16,
        backgroundColor: defaultStyles.colors.white,
        borderBottomLeftRadius: 15,
        borderBottomRightRadius: 15,
        alignItems: "flex-start",
    },
    h5: {
        fontSize: 18,
        fontWeight: "bold",
        color: defaultStyles.colors.primary,
        marginBottom: 8,
        textTransform: "capitalize",
    },
    p: {
        fontSize: 14,
        color: defaultStyles.colors.medium,
        lineHeight: 20,
        fontWeight: "normal", // remove bold from item description
    },
});

export default ItemCard;
