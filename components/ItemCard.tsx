import { View, Image, Dimensions, Text, StyleSheet, Pressable } from "react-native";
import React from "react";
import defaultStyles from "../config/styles";
import ShortDescriptionViewer from "./ShortDescriptionViewer"

const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;
const widthFactor = 0.9;
const heightFactor = 0.4;

const ItemCard = ({ itemID,itemImageUrl, itemName, itemDescriptionDict,requestedItemSetter,modalSetter }) => {
    return (

        <View style={{
            alignItems: "center",
            justifyContent: 'center',
        }}>

            <Pressable
            onPress={() => {
                console.log(
                    "Item:",
                    itemID,
                    "is asked to be viewed in details..."
                );
                requestedItemSetter(itemID);
                modalSetter(true);
            }}
            style={styles.card}>
                <Image
                    style={styles.cardImageStyle}
                    source={{
                        uri: itemImageUrl,
                    }}
                />
                <View style={styles.cardContent}>
                    <Text style={styles.h5}>{itemName}</Text>
                    <ShortDescriptionViewer characteristics={itemDescriptionDict}></ShortDescriptionViewer>
                </View>
            </Pressable>
        </View>
    );
};

const styles = StyleSheet.create({
    card: {
        alignItems: 'center',
        justifyContent: 'flex-start',
        borderRadius: 15,
        width: screenWidth * widthFactor,
        
        // backgroundColor: 'pink',
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
        // height: "60%",
        height: screenHeight * heightFactor*0.6,
    },
    cardContent: {
        padding: 16,
        paddingVertical: 10,
        backgroundColor: defaultStyles.colors.white,
        borderBottomLeftRadius: 15,
        borderBottomRightRadius: 15,
        alignItems: "flex-start",
        
    },
    h5: {
        fontSize: 18,
        fontWeight: "bold",
        color: defaultStyles.colors.primary,
        marginBottom: 1,
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
