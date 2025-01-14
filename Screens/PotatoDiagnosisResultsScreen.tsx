import React from "react";
import {
    View,
    Text,
    Image,
    ScrollView,
    StyleSheet,
    Dimensions,
    TouchableOpacity,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import Icon from "react-native-vector-icons/FontAwesome6";

import CollapsibleContent from "../components/CollapsibleContent";

// Potato___healthy
// Potato___Early_blight
// Potato___Late_blight

const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;

function makeLowerCase(str) {
    return str.toLowerCase();
}

interface PotatoDiagnosisResultsScreenProps {
    DiagnosedImage?: string;
    diagnosisResults?: {
        class:
            | "potato___early_blight"
            | "potato___late_blight"
            | "potato___healthy";
        confidence: number;
    };
    modalSetter?: React.Dispatch<React.SetStateAction<boolean>>;
}

const PotatoDiagnosisResultsScreen: React.FC<
    PotatoDiagnosisResultsScreenProps
> = ({
    DiagnosedImage = "https://i.postimg.cc/DZTtX4MN/Diagnosed-Leaf-Default-Image.png",
    diagnosisResults,
    modalSetter,
}) => {
    diagnosisResults.class = makeLowerCase(diagnosisResults.class);
    console.log(diagnosisResults.class);
    const closeModal = () => {
        modalSetter(false);
    };
    const confidenceLevels = [
        "Highly Uncertain",
        "Somewhat Uncertain",
        "Slightly Uncertain",
        "Slightly Confident",
        "Somewhat Confident",
        "Highly Confident",
    ];
    const confidenceIndex = Math.floor(diagnosisResults.confidence * 6);
    const confidenceText = confidenceLevels[confidenceIndex];

    const classDescriptions: { [key: string]: string } = {
        potato___late_blight:
            "Late blight is a serious plant disease caused by the pathogen Phytophthora infestans. It primarily affects potatoes and tomatoes, causing significant crop damage. The disease thrives in cool, moist conditions, leading to rapid plant decay and yield loss.",
        potato___early_blight:
            "Early blight is a fungal disease affecting plants, particularly tomatoes and potatoes, caused by Alternaria species. It results in dark, concentric spots on leaves, stems, and fruit, leading to leaf drop and reduced yield.",
        potato___healthy:
            "A healthy plant leaf is vibrant in color, typically green, free from spots or discoloration, firm, and exhibits no signs of wilting, pests, or disease.",
    };

    const Title: { [key: string]: string } = {
        potato___late_blight: "Late Blight",
        potato___early_blight: "Early Blight",
        potato___healthy: "Healthy",
    };

    const recommendations: { [key: string]: string } = {
        potato___late_blight:
            "Your plant has Late Blight. Remove and destroy affected areas immediately. Apply a suitable fungicide and avoid overhead watering. Consider isolating the plant to prevent infection of others.",
        potato___early_blight:
            "Your plant shows signs of Early Blight. Prune affected leaves, apply a fungicide, and improve air circulation to prevent further spread. Monitor closely for any changes.",
        potato___healthy:
            "Your plant is healthy! Keep up the good work. Continue regular watering, ensure proper sunlight, and monitor for any signs of stress to maintain its health.",
    };

    const facts: { [key: string]: string } = {
        potato___late_blight:
            "Did you know that Late Blight was responsible for the Irish Potato Famine in the 1840s? Caused by the pathogen Phytophthora infestans, it spreads rapidly in wet, cool conditions.",
        potato___early_blight:
            "Did you know that Early Blight is caused by the fungus Alternaria solani? It thrives in warm, humid conditions and primarily affects older leaves, leading to dark spots and yellowing.",
        potato___healthy:
            "Did you know that healthy plants can improve air quality by absorbing pollutants? They also release oxygen, making your environment fresher and healthier.",
    };

    const leafColor = {
        potato___healthy: "green",
        potato___early_blight: "#FFA500",
        potato___late_blight: "#8B4513",
    };

    console.log("=====DIAGNOSIS RESULT=====");
    console.log("CLASS: ",diagnosisResults.class);
    console.log("CONF.: ",diagnosisResults.confidence);
    console.log("==========================");

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.heading}>Diagnosis Results</Text>
            <Image source={{ uri: DiagnosedImage }} style={styles.image} />
            <Text style={styles.confidenceText}>
                We are {confidenceText.toLowerCase()} that it is:
            </Text>
            <View style={styles.classContainer}>
                <FontAwesome
                    name="leaf"
                    size={24}
                    color={leafColor[diagnosisResults.class]}
                />
                <Text
                    style={[
                        styles.classText,
                        diagnosisResults.class === "potato___healthy" &&
                            styles.healthyText,
                    ]}
                >
                    {Title[diagnosisResults.class]}
                </Text>
            </View>
            <Text style={styles.descriptionText}>
                {classDescriptions[diagnosisResults.class]}
            </Text>

            <CollapsibleContent title="Recommendations" leftIconColor="green">
                <Text style={[styles.descriptionText, { paddingTop: 5 }]}>
                    {recommendations[diagnosisResults.class]}
                </Text>
            </CollapsibleContent>

            <CollapsibleContent
                title="Facts"
                leftIconName="lightbulb"
                leftIconColor="green"
            >
                <Text style={[styles.descriptionText, { paddingTop: 5 }]}>
                    {facts[diagnosisResults.class]}
                </Text>
            </CollapsibleContent>

            <CollapsibleContent
                title="Important Notes"
                leftIconName="circle-exclamation"
                leftIconColor="green"
            >
                <Image
                    source={{
                        uri: "https://i.postimg.cc/3wF2cJM0/botanist.jpg",
                    }}
                    style={[styles.noteImage, { marginTop: 15 }]}
                />
                <Text style={[styles.descriptionText]}>
                    While our app offers plant diagnostics, it is not a
                    substitute for professional consultation with a botanist.
                    Users should take the app's diagnoses with a grain of salt,
                    as it may occasionally make errors. The app is designed to
                    assist with non-critical tasks and provide general guidance,
                    but for critical decision-making and precise plant care,
                    expert advice is essential.
                </Text>
            </CollapsibleContent>
            <TouchableOpacity
                style={styles.floatingButton}
                onPress={() => {
                    closeModal();
                }}
            >
                <Icon name="xmark" size={20} color="#fff" />
            </TouchableOpacity>
        </ScrollView>
    );
};

const { height } = Dimensions.get("window");
const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        padding: 16,
    },
    heading: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 16,
        textAlign: "left",
    },
    image: {
        width: "100%",
        height: height * 0.3,
        marginBottom: 16,
        borderRadius: 10,
    },
    confidenceText: {
        fontSize: 16,
        marginBottom: 8,
    },
    classContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 16,
    },
    classText: {
        fontSize: 24,
        fontWeight: "bold",
        marginLeft: 8,
    },
    healthyText: {
        color: "green",
    },
    descriptionText: {
        fontSize: 16,
        marginBottom: 16,
        textAlign: "left",
    },
    noteImage: {
        width: "100%",
        height: 200,
        marginBottom: 16,
        borderRadius: 10,
    },
    floatingButton: {
        position: "absolute",
        top: screenHeight * 0.015,
        left: screenWidth - screenWidth * 0.135,
        width: 40,
        height: 40,
        backgroundColor: "black",
        borderRadius: 25,
        alignItems: "center",
        justifyContent: "center",
        elevation: 5, // for shadow on Android
        shadowColor: "#000", // for shadow on iOS
        shadowOffset: { width: 0, height: 2 }, // for shadow on iOS
        shadowOpacity: 0.8, // for shadow on iOS
        shadowRadius: 2, // for shadow on iOS
        opacity: 0.7,
    },
});

export default PotatoDiagnosisResultsScreen;
