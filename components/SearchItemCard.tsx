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
} from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import defaultStyles from "../config/styles";
import { addPlantToCollection } from "./auth";
import { getAccessToken } from "./useAuth";

const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;
const widthFactor = 0.9;
const heightFactor = 0.12;

const SearchItemCard = ({
    itemImageUrl,
    itemName,
    itemDescription,
    itemID,
    isAdded,
}) => {
    const [added, setAdded] = useState(isAdded);
    const [loading, setLoading] = useState(false);
    const scaleValue = new Animated.Value(1);

    useEffect(() => {
        setAdded(isAdded);
    }, [isAdded]);

    const addPlantToUserCollection = async (plantId) => {
        try {
            setLoading(true);
            const authToken = await getAccessToken();

            if (!authToken) {
                throw new Error("Access token not found to add plant.");
            }

            const result = await addPlantToCollection(plantId, authToken);
            console.log("Plant added successfully:", result, "\n");
            setAdded(true); // Update added state upon successful addition
            Alert.alert("Success", "Plant added to your collection!");
        } catch (error) {
            console.error("Error adding plant to collection:", error);
            let errorMessage = "Failed to add plant to collection.";

            if (error.response) {
                const { message, statusCode } = error.response.data;
                if (
                    statusCode === 400 &&
                    message === "Plant already added to your plants"
                ) {
                    errorMessage = "This plant is already in your collection.";
                } else {
                    errorMessage = message;
                }
            }

            Alert.alert("Error", errorMessage);
        } finally {
            setLoading(false);
        }
    };

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

    return (
        <View style={{
            alignItems: "center",
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
                    </View>
                    <TouchableWithoutFeedback
                        onPress={() => {
                            console.log(
                                "Item:",
                                itemID,
                                "is asked to be added to my plant collection..."
                            );
                            addPlantToUserCollection(itemID);
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
                            {!added ? (
                                <FontAwesome5 name="plus" size={20} color="white" />
                            ) : (
                                <FontAwesome5
                                    name="check"
                                    size={20}
                                    color="white"
                                />
                            )}
                        </Animated.View>
                    </TouchableWithoutFeedback>
                </View>
            </View>
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
});

export default SearchItemCard;
