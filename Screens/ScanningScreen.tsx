import React from "react";
import { StyleSheet, View, Text, Pressable, Alert } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome6";
import defaultStyles from "../config/styles";
import Separator from "../components/lists/Separator";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const ScanningScreen = () => {
    return (
        <View style={styles.container}>
            <View style={styles.buttonContainer}>
                <Pressable
                    style={({ pressed }) => [
                        {
                            backgroundColor: pressed
                                ? "rgba(0,0,0,0.1)"
                                : defaultStyles.colors.primary,
                        },
                        styles.button,
                    ]}
                    onPress={() =>
                        Alert.alert(
                            "",
                            "App should move you to identification camera!"
                        )
                    }
                >
                    <View style={styles.buttonContent}>
                        <MaterialCommunityIcons
                            name="magnify"
                            size={80}
                            color="white"
                        />
                        <Text style={styles.buttonText}>Identify a Plant</Text>
                    </View>
                </Pressable>
            </View>

            <Separator />

            <View style={styles.buttonContainer}>
                <Pressable
                    style={styles.button}
                    onPress={() =>
                        Alert.alert(
                            "",
                            "App should move you to diagnosis camera!"
                        )
                    }
                >
                    <View style={styles.buttonContent}>
                        <MaterialCommunityIcons
                            name="stethoscope"
                            size={75}
                            color="white"
                        />
                        <Text style={styles.buttonText}>Diagnose a Plant</Text>
                    </View>
                </Pressable>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "white",
        paddingHorizontal: 20,
    },
    buttonContainer: {
        marginVertical: 20,
    },
    button: {
        width: 200,
        height: 200,
        borderRadius: 20,
        backgroundColor: defaultStyles.colors.primary,
        alignItems: "center",
        justifyContent: "center",
    },
    buttonContent: {
        alignItems: "center",
    },
    buttonText: {
        color: "white",
        fontSize: 18,
        fontWeight: "bold",
        marginTop: 10,
    },
    separator: {
        height: 20,
        color: "black",
    },
});

export default ScanningScreen;
