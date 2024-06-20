import React, { useState } from "react";
import {
    StyleSheet,
    View,
    Text,
    Pressable,
    Alert,
    Modal,
    ActivityIndicator,
    TouchableOpacity,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome6";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import axios from "axios";
import * as ImagePicker from "expo-image-picker";
import * as ImageManipulator from "expo-image-manipulator";
import { ProgressBar } from "react-native-paper";

import defaultStyles from "../config/styles";
import Separator from "../components/lists/Separator";
import PotatoDiagnosisResultsScreen from "./PotatoDiagnosisResultsScreen";
import TomatoDiagnosisResultsScreen from "./TomatoDiagnosisResultsScreen";

const ScanningScreen = () => {
    const [modalVisible, setModalVisible] = useState(false);
    const [diagnosedImageURI, setDiagnosedImageURI] = useState("");
    const [diagnosisResult, setDiagnosisResult] = useState();
    const [loading, setLoading] = useState(false);
    const [progress, setProgress] = useState(0);
    const [potatoMode, setPotatoMode] = useState(false); // true if diagnosing potato, false for tomato
    const [cropAskerVisible, setCropAskerVisible] = useState(false);

    const handlePress = async (crop) => {
        let timer;

        try {
            const { status } =
                await ImagePicker.requestCameraPermissionsAsync();
            if (status !== "granted") {
                Alert.alert(
                    "",
                    "Diagnosis failed, please enable camera permission and try again."
                );
                return;
            }

            const result = await ImagePicker.launchCameraAsync({
                allowsEditing: true,
                aspect: [1, 1],
                quality: 1,
            });

            if (result.canceled) {
                Alert.alert(
                    "",
                    "Diagnosis canceled, camera capture was not completed."
                );
                return;
            }

            setLoading(true);
            setProgress(0);
            const cancelTokenSource = axios.CancelToken.source();
            timer = setTimeout(
                () => cancelTokenSource.cancel("Request took too long!"),
                100000
            );

            const imageUri = result.assets[0].uri;
            const manipulatedImage = await ImageManipulator.manipulateAsync(
                imageUri,
                [{ resize: { width: 800 } }],
                { compress: 0.7, format: ImageManipulator.SaveFormat.JPEG }
            );

            const formData = new FormData();
            formData.append("file", {
                uri: manipulatedImage.uri,
                name: "leaf.jpg",
                type: "image/jpeg",
            });

            const requestURL = `https://detection-graduation.onrender.com/predict/${crop}`;
            console.log(requestURL);
            const response = await axios.post(requestURL, formData, {
                headers: { "Content-Type": "multipart/form-data" },
                cancelToken: cancelTokenSource.token,
                onUploadProgress: (progressEvent) => {
                    const progressPercent = Math.round(
                        (progressEvent.loaded * 100) / progressEvent.total
                    );
                    setProgress(progressPercent);
                },
            });

            if (response.status === 200 && response.data) {
                // Check if the response contains the specific message
                if (response.data.message === "Uploaded image is not a leaf.") {
                    Alert.alert(
                        "",
                        "Uploaded image is not a leaf. Please try again with a different image."
                    );
                } else {
                    // Proceed with setting the diagnosis result and showing the modal
                    setDiagnosedImageURI(manipulatedImage.uri);
                    setDiagnosisResult(response.data);
                    console.log("=====DIAGNOSIS RESULT=====");
                    console.log(response.data);
                    console.log("==========================");
                    setModalVisible(true);
                }
            } else {
                Alert.alert(
                    "",
                    `Diagnosis failed with status: ${response.status}`
                );
            }
        } catch (error) {
            if (axios.isCancel(error)) {
                Alert.alert("", "Diagnosis failed, request took too long!");
            } else {
                Alert.alert("", "Diagnosis failed, try again later.");
            }
        } finally {
            clearTimeout(timer);
            setLoading(false);
        }
    };

    return (
        <View style={styles.container}>
            {loading && (
                <View style={styles.loadingOverlay}>
                    <View style={styles.loadingContainer}>
                        <ActivityIndicator size="large" color="green" />
                        <ProgressBar
                            progress={progress / 100}
                            color="green"
                            style={styles.progressBar}
                        />
                        <Text>{`Uploading... ${progress}%`}</Text>
                    </View>
                </View>
            )}
            {cropAskerVisible && (
                <View style={styles.loadingOverlay}>
                    <View style={styles.cropAskerContainer}>
                        <TouchableOpacity
                            onPress={() => setCropAskerVisible(false)}
                            style={styles.closeButton}
                        >
                            <Icon name="xmark" size={10} color="white" />
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => {
                                setPotatoMode(true);
                                setCropAskerVisible(false);
                                handlePress("potato");
                            }}
                            style={styles.buttonSmall}
                        >
                            <Text style={styles.buttonTextSmall}>
                                Diagnose Potato
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => {
                                setPotatoMode(false);
                                setCropAskerVisible(false);
                                handlePress("tomato");
                            }}
                            style={styles.buttonSmall}
                        >
                            <Text style={styles.buttonTextSmall}>
                                Diagnose Tomato
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            )}
            <View style={styles.buttonContainer}>
                <Pressable
                    style={({ pressed }) => [
                        styles.button,
                        {
                            backgroundColor: pressed
                                ? "rgba(0,0,0,0.1)"
                                : defaultStyles.colors.primary,
                        },
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
                    onPress={() => setCropAskerVisible(true)}
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
            <Modal visible={modalVisible}>
                <View style={{ flex: 1 }}>
                    {potatoMode ? (
                        <PotatoDiagnosisResultsScreen
                            DiagnosedImage={diagnosedImageURI}
                            diagnosisResults={diagnosisResult}
                            modalSetter={setModalVisible}
                        />
                    ) : (
                        <TomatoDiagnosisResultsScreen
                            DiagnosedImage={diagnosedImageURI}
                            diagnosisResults={diagnosisResult}
                            modalSetter={setModalVisible}
                        />
                    )}
                </View>
            </Modal>
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
    loadingOverlay: {
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 1,
    },
    loadingContainer: {
        width: 150,
        height: 150,
        backgroundColor: "white",
        borderRadius: 10,
        justifyContent: "center",
        alignItems: "center",
        padding: 10,
    },
    progressBar: {
        width: "100%",
        marginVertical: 10,
    },
    cropAskerContainer: {
        width: 220,
        height: 160,
        backgroundColor: "white",
        paddingTop: 30,
        borderRadius: 10,
        justifyContent: "center",
        alignItems: "center",
    },
    buttonSmall: {
        backgroundColor: "green",
        borderRadius: 5,
        paddingVertical: 10,
        paddingHorizontal: 20,
        marginVertical: 5,
        minWidth: 190,
    },
    buttonTextSmall: {
        color: "white",
        fontSize: 16,
        textAlign: "center",
    },
    closeButton: {
        position: "absolute",
        top: 10,
        right: 15,
        width: 25,
        height: 25,
        borderRadius: 15,
        backgroundColor: "grey",
        justifyContent: "center",
        alignItems: "center",
    },
});

export default ScanningScreen;
