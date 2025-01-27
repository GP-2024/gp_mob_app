import React, { useState, useEffect } from "react";
import {
    View,
    Image,
    Dimensions,
    Pressable,
    Text,
    StyleSheet,
    TouchableWithoutFeedback,
    Animated,
    Alert,
    Modal
} from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import defaultStyles from "../config/styles";
import { addPlantToCollection } from "./auth";
import { getAccessToken } from "./useAuth";
import IdentifiedPlantProfileScreen from "../Screens/IdentifiedPlantProfileScreen"

const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;
const widthFactor = 0.9;
const heightFactor = 0.12;

const PlantResultItemCard = ({
    itemImageUrl,
    itemName,
    itemDescription,
    itemLongDescription,
    itemID,
    percentage,
    wikipediaToPlant
}) => {

    const [loading, setLoading] = useState(false);
    const [modalShown, setModalShown] = useState(false);
    const scaleValue = new Animated.Value(1);
    
    const handlePressIn = () => {
        Animated.spring(scaleValue, {
            toValue: 0.95,
            useNativeDriver: true,
        }).start();
    };

    const handlePressOut = () => {
        Animated.spring(scaleValue, {
            toValue: 1,
            friction: 3,
            tension: 40,
            useNativeDriver: true,
        }).start();
    };

    // below line provides no necessary functionality, it is only for debugging
    console.log(itemImageUrl);

    return (

        <View style={{
            alignItems: 'center',
            justifyContent: 'center',
        }}>

            <View style={styles.card}>
                <Image
                    style={styles.cardImageStyle}
                    source={{ uri: itemImageUrl }}
                />
                <View style={styles.cardContent}>
                    <View style={styles.cardContentContainer}>
                        <Text style={styles.h6}>{itemName}</Text>
                        <Text style={styles.p}>{itemDescription}</Text>
                        <View style={styles.percentageOuterContainer}>
                            <View style={styles.percentageContainer}>
                                <FontAwesome5 name="check" size={15} color={defaultStyles.colors.primary} />
                                <Text style={{ paddingLeft: 8 }}>{percentage}</Text>
                            </View>
                        </View>

                    </View>
                    <TouchableWithoutFeedback
                        onPress={() => {
                            console.log(
                                "User has requested to learn more about item:",
                                itemID
                            );
                            setModalShown(true);
                        }}
                        onPressIn={handlePressIn}
                        onPressOut={handlePressOut}
                    >
                        <Animated.View
                            style={[
                                styles.iconButton,
                                {
                                    backgroundColor: defaultStyles.colors.primary,
                                    transform: [{ scale: scaleValue }],
                                },
                            ]}
                        >
                            <Text style={{ color: 'white' }}>Learn More</Text>
                        </Animated.View>
                    </TouchableWithoutFeedback>
                </View>
            </View>

            <Modal
                visible={modalShown}
            >
                <View style={{flex:1}} >
                    <IdentifiedPlantProfileScreen
                    plantID={itemID}
                    longDescription={itemLongDescription}
                    SciName={itemDescription}
                    wikiToPlant={wikipediaToPlant}
                    imageURL={itemImageUrl}
                    commonName={itemName}
                    modalSetter={setModalShown} ></IdentifiedPlantProfileScreen>
                </View>
            </Modal>

        </View>
    );
};

const styles = StyleSheet.create({
    card: {
        flexDirection: "row",
        borderRadius: 15,
        // width: screenWidth * widthFactor,
        minHeight: screenHeight * heightFactor,
        alignItems: "center",
        justifyContent: 'center',
        backgroundColor: "#f9f9f9",
        marginBottom: 15,
        overflow: "hidden",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.1,
        shadowRadius: 6,
        elevation: 3,
    },
    cardImageStyle: {
        width: "25%",
        height: "100%",
        borderTopLeftRadius: 15,
        borderBottomLeftRadius: 15,
    },
    cardContent: {
        flexDirection: "row",
        alignItems: "center",
        padding: 8,
        width: "75%",
        height: "100%",
    },
    cardContentContainer: {
        flex: 1,
        paddingHorizontal: 10,
    },
    h6: {
        fontSize: 16,
        fontWeight: "bold",
        color: defaultStyles.colors.dark,
    },
    p: {
        fontSize: 13,
        color: defaultStyles.colors.medium,
    },
    iconButton: {
        borderRadius: 15,
        padding: 8,
        marginLeft: "auto",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.2,
        shadowRadius: 3,
        elevation: 5,
        justifyContent: "center",
        alignItems: "center",
    },
    percentageOuterContainer: {
        alignItems: 'flex-start',
        justifyContent: 'center',
    },
    percentageContainer: {
        marginTop: 4,
        paddingVertical: 2,
        paddingHorizontal: 5,
        flexDirection: "row",
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 2,
        borderColor: defaultStyles.colors.primary,
        width: 'auto',
        borderRadius: 7
    }
});

export default PlantResultItemCard;
