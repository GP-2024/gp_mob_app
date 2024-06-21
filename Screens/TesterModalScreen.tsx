import React, { useState } from "react";
import {
    View,
    Text,
    TextInput,
    StyleSheet,
    Dimensions,
    Modal,
    Image,
    TouchableOpacity,
    Button,
    Alert,
    ImageBackground,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import axios from "axios";
import CompleteProfileScreen from "./CompleteProfileScreen";

const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;

const pfpSideLength = screenWidth / 4.3;

const TesterModalScreen = () => {
    return (
        <Modal visible={true}>
            <View
                style={{
                    flex: 1,
                }}
            >
                <CompleteProfileScreen></CompleteProfileScreen>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    background: {
        flex: 1,
        resizeMode: "cover",
    },
    container: {
        flex: 1,
        justifyContent: "center",
    },
    topView: {
        flex: 1 / 3,
    },
    bottomView: {
        flex: 2 / 3,
        padding: 20,
        backgroundColor: "white",
        // borderTopLeftRadius: 30,
        // borderTopRightRadius: 30,

        borderWidth: 1,
        borderColor: "red",
    },
    normalText: {
        fontSize: 16,
        textAlign: "left",
    },
    heading: {
        fontSize: 24,
        fontWeight: "bold",
        textAlign: "left",
        marginBottom: 20,
    },
    imageContainer: {
        alignItems: "center",
        marginBottom: 20,
    },
    profileImage: {
        width: pfpSideLength,
        height: pfpSideLength,
        borderRadius: 50,
        // borderColor: 'white',
        // borderWidth: 2,
    },
    editButton: {
        position: "absolute",
        bottom: 5,
        right: screenWidth / 2 - pfpSideLength * 0.75,
        backgroundColor: "green",
        borderRadius: 15,
        padding: 5,

        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,

        elevation: 4,
    },
    input: {
        borderBottomWidth: 1,
        borderBottomColor: "lightgreen",
        marginBottom: 15,
    },
    confirmButton: {
        backgroundColor: "green",
        padding: 10,
        borderRadius: 5,
        alignItems: "center",
    },
    confirmButtonText: {
        color: "white",
        fontSize: 16,
    },
    errorText: {
        color: "red",
        textAlign: "center",
        marginBottom: 10,
    },
});

export default TesterModalScreen;

async function getAccessToken() {
    // Replace this with your method to get the access token
    return "your-access-token";
}
