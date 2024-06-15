import React, { useState } from 'react';
import { StyleSheet, View, Text, Pressable, Alert, Modal, Button, ActivityIndicator, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome6";
import defaultStyles from "../config/styles";
import Separator from "../components/lists/Separator";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import axios from 'axios';
import * as ImagePicker from 'expo-image-picker';
import PotatoDiagnosisResultsScreen from "./PotatoDiagnosisResultsScreen"
import TomatoDiagnosisResultsScreen from './TomatoDiagnosisResultsScreen';

// const screenWidth = Dimensions.get("window").width;
// const screenHeight = Dimensions.get("window").height;

const ScanningScreen = () => {
    const [modalVisible, setModalVisible] = useState(false);
    const [diagnosedImageURI, setDiagnosedImageURI] = useState("");
    const [diagnosisResult, setDiagnosisResult] = useState();
    const [loading, setLoading] = useState(false);
    const [potatoMode, setPotatoMode] = useState(false); // if true, user is diagnosing potato, if false, it is tomato
    const [cropAskerVisible, setCropAskerVisible] = useState(false);

    let timer;
    const handlePress = async (crop) => {



        try {
            // Request camera permissions
            const { status } = await ImagePicker.requestCameraPermissionsAsync();
            if (status !== 'granted') {
                console.log('Camera permission not granted');
                Alert.alert("", "Diagnosis failed, please enable camera permission and try again.");
                clearTimeout(timer);
                setLoading(false);
                setModalVisible(false);
                return;
            }

            // Launch the camera to take a picture
            const result = await ImagePicker.launchCameraAsync({
                allowsEditing: true,
                aspect: [4, 3],
                quality: 1,
            });

            if (!result.canceled) {
                console.log('Image taken successfully');

                setLoading(true);

                let cancelTokenSource = axios.CancelToken.source();

                timer = setTimeout(() => {
                    cancelTokenSource.cancel("Request timed out");
                }, 100000); // 1 hundred seconds

                // Convert image to JPEG if necessary
                const imageUri = result.assets[0].uri;
                console.log("Image URI: ", imageUri);

                const imageType = 'image/jpeg';

                // Create form data
                const formData = new FormData();
                formData.append('file', {
                    uri: imageUri,
                    name: 'leaf.jpg',
                    type: imageType,
                });

                let requestURL = 'https://final-detect-1.onrender.com/predict/' + crop;
                // Send the image to the endpoint
                const response = await axios.post(requestURL, formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                    cancelToken: cancelTokenSource.token
                });
                console.log(requestURL);
                if (response.status === 200) {
                    console.log('Request successful', response.data);
                    setDiagnosedImageURI(imageUri);
                    setDiagnosisResult(response.data);
                    setModalVisible(true);
                    clearTimeout(timer);
                } else {
                    console.log('Request failed with status', response.status);
                    clearTimeout(timer);
                    setLoading(false);
                    setModalVisible(false);
                    Alert.alert("", "Diagnosis failed because the request failed with status: " + response.status);
                }
            } else {
                console.log('Image capture cancelled');
                clearTimeout(timer);
                setLoading(false);
                setModalVisible(false);
                Alert.alert("", "Diagnosis failed, You have cancelled camera capture.");
            }
        } catch (error) {
            console.error('Error during diagnosis:', error);
            setModalVisible(false);
            if (axios.isCancel(error)) {
                clearTimeout(timer);
                setLoading(false);
                setModalVisible(false);
                Alert.alert("", "Diagnosis failed, request timed out.");

            } else {
                clearTimeout(timer);
                setLoading(false);
                setModalVisible(false);
                Alert.alert("", "Diagnosis failed, try again later.");
            }
        } finally {
            clearTimeout(timer);
            setLoading(false);
            // setModalVisible(false);
        }
    };

    return (
        <View style={styles.container}>
            {loading && (
                <View style={styles.loadingOverlay}>
                    <View style={styles.loadingContainer}>
                        <ActivityIndicator size="large" color="green" />
                    </View>
                </View>
            )}
            {cropAskerVisible && (<View style={styles.loadingOverlay}>
                <View style={{
                    width: 220,
                    height: 160,
                    backgroundColor: "white",
                    paddingTop: 30,
                    borderRadius: 10,
                    justifyContent: "center",
                    alignItems: "center",
                }}>
                    <TouchableOpacity
                        onPress={() => { { setCropAskerVisible(false) } }}
                        style={styles.closeButton}>
                        <Icon
                            name="xmark"
                            size={10}
                            color="white"
                        />
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={() => {
                            setPotatoMode(true);
                            setCropAskerVisible(false);
                            handlePress("potato");

                        }}
                        style={styles.buttonSmall}>
                        <Text style={styles.buttonTextSmall}>Diagnose Potato</Text>
                    </TouchableOpacity>


                    <TouchableOpacity
                        onPress={() => {
                            setPotatoMode(false);
                            setCropAskerVisible(false);
                            handlePress("tomato");
                        }}
                        style={styles.buttonSmall}>
                        <Text style={styles.buttonTextSmall}>Diagnose Tomato</Text>
                    </TouchableOpacity>

                </View>
            </View>)}
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
                    onPress={() => {
                        setCropAskerVisible(true);
                    }
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
            <Modal
                visible={modalVisible}
            >
                <View style={{ flex: 1 }} >
                    {potatoMode ? (
                        <PotatoDiagnosisResultsScreen
                            DiagnosedImage={diagnosedImageURI}
                            diagnosisResults={diagnosisResult}
                            modalSetter={setModalVisible}>
                        </PotatoDiagnosisResultsScreen>
                    ) : (
                        <TomatoDiagnosisResultsScreen
                            DiagnosedImage={diagnosedImageURI}
                            diagnosisResults={diagnosisResult}
                            modalSetter={setModalVisible}>
                        </TomatoDiagnosisResultsScreen>
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
    ///////////////////////
    containerxyz: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    centeredViewxyz: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
    },
    modalViewxyz: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
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

    },
    diagnosedCropButtons: {

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
    buttonSmall: {
        backgroundColor: 'green',
        borderRadius: 5,
        paddingVertical: 10,
        paddingHorizontal: 20,
        marginVertical: 5,
        minWidth: 190,
    },
    buttonTextSmall: {
        color: 'white',
        fontSize: 16,
        textAlign: 'center',

    },
    closeButton: {
        position: 'absolute',
        top: 10,
        right: 15,
        width: 25,
        height: 25,
        borderRadius: 15,
        backgroundColor: 'grey',
        justifyContent: 'center',
        alignItems: 'center',
    },
    /////////////////////
});

export default ScanningScreen;
