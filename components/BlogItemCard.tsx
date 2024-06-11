// Import necessary React Native components
import {
    View,
    Image,
    Dimensions,
    Alert,
    Button,
    Pressable,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    SafeAreaView,
    ScrollView,
} from "react-native";
import React, { useState } from "react";
import type { PropsWithChildren } from "react";
// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// import { Button, Text, Input, CheckBox, LinearGradient } from '@rneui/themed';
import Icon from "react-native-vector-icons/FontAwesome6";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import defaultStyles from "../config/styles";
// import LoginScreen from './LoginScreen';
import { Colors } from "react-native/Libraries/NewAppScreen";

// Define the BlogItemCard component

const screenWidth = Dimensions.get("window").width;
const widthFactor = 0.9;

const BlogItemCard = ({
    itemName,
    itemDescription,
    itemID,
    itemDate,
    itemAuthor,
    itemNOfComments,
    itemNOfLikes,
    itemIsLiked = true,
}) => {
    const [expanded, setExpanded] = useState(false);

    function truncateString(str) {
        return str.length > 150 ? str.substring(0, 150) + "..." : str;
    }

    return (
        <Pressable
            onPress={() => {
                setExpanded(!expanded);
            }}
        >
            <View style={styles.card}>
                <View style={styles.cardHeader}>
                    <Text style={styles.author}>{itemAuthor}</Text>
                    <Text style={styles.date}>
                        {formatTimeString(itemDate)}
                    </Text>
                </View>
                <Text style={styles.title}>{itemName}</Text>
                <Text style={styles.description}>
                    {expanded
                        ? itemDescription
                        : truncateString(itemDescription)}
                </Text>
                <View style={styles.metaDataContainer}>
                    <View style={styles.metaDataItem}>
                        <Icon name={"thumbs-up"} size={15} color="#666" />
                        <Text style={styles.metaDataText}> {itemNOfLikes}</Text>
                    </View>
                    <View style={styles.metaDataItem}>
                        <Icon name={"comment"} size={15} color="#666" />
                        <Text style={styles.metaDataText}>
                            {" "}
                            {itemNOfComments}
                        </Text>
                    </View>
                </View>
            </View>
        </Pressable>
    );
};

const styles = StyleSheet.create({
    card: {
        alignSelf: "center",
        width: screenWidth * widthFactor,
        backgroundColor: "#fff",
        borderRadius: 10,
        padding: 16,
        marginBottom: 20,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.1,
        shadowRadius: 4.65,
        elevation: 6,
    },
    cardHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 10,
    },
    author: {
        fontSize: 14,
        fontWeight: "bold",
        color: "#333",
    },
    date: {
        fontSize: 12,
        color: "#888",
    },
    title: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#333",
        marginBottom: 10,
    },
    description: {
        fontSize: 14,
        color: "#555",
        marginBottom: 15,
    },
    metaDataContainer: {
        flexDirection: "row",
        justifyContent: "flex-start",
    },
    metaDataItem: {
        flexDirection: "row",
        alignItems: "center",
        marginRight: 15,
    },
    metaDataText: {
        fontSize: 14,
        color: "#666",
    },
});

function formatTimeString(timeString) {
    const date = new Date(timeString);
    const options = {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
    };
    return date.toLocaleString("en-US", options as Intl.DateTimeFormatOptions);
}

export default BlogItemCard;
