import React from 'react';
import { View, Text, Image, ScrollView, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import Icon from 'react-native-vector-icons/FontAwesome6';

import CollapsibleContent from '../components/CollapsibleContent';



const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;



interface TomatoDiagnosisResultsScreenProps {
    DiagnosedImage?: string;
    diagnosisResults?: {
        class:
        'bacterial-spot' |
        'early-blight' |
        'late-blight' |
        'leaf-mold' |
        'septoria-leaf-spot' |
        'spider-mites' |
        'target-spot' |
        'yellow-leaf-curl-virus' |
        'mosaic-virus' |
        'healthy' |
        'Loading';
        confidence: number;
    };
    modalSetter?: React.Dispatch<React.SetStateAction<boolean>>
}

const TomatoDiagnosisResultsScreen: React.FC<TomatoDiagnosisResultsScreenProps> = ({
    DiagnosedImage = "https://i.postimg.cc/DZTtX4MN/Diagnosed-Leaf-Default-Image.png",
    diagnosisResults = {
        class: 'Loading',
        confidence: 0.96,
    },
    modalSetter

}) => {
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
        "bacterial-spot": "Bacterial spot is a bacterial disease caused by Xanthomonas species. It affects tomato plants, resulting in small, water-soaked spots on leaves, fruit, and stems, which can lead to defoliation and reduced yield.",
        "early-blight": "Early blight is a fungal disease affecting tomato plants, caused by Alternaria species. It results in dark, concentric spots on leaves, stems, and fruit, leading to leaf drop and reduced yield.",
        "late-blight": "Late blight is a serious plant disease caused by the pathogen Phytophthora infestans. It primarily affects tomatoes and potatoes, causing significant crop damage. The disease thrives in cool, moist conditions, leading to rapid plant decay and yield loss.",
        "leaf-mold": "Leaf mold is a fungal disease caused by Passalora fulva. It affects tomato plants, resulting in yellow spots on the upper leaf surface and a velvety, olive-green mold on the underside, which can cause significant leaf loss.",
        "septoria-leaf-spot": "Septoria leaf spot is a fungal disease caused by Septoria lycopersici. It primarily affects tomato plants, leading to small, circular spots with dark borders and grey centers on leaves, causing premature defoliation.",
        "spider-mites": "Spider mites are tiny arachnids that feed on tomato plant sap, causing stippling, yellowing, and webbing on leaves. Heavy infestations can lead to significant plant stress and reduced yields.",
        "target-spot": "Target spot is a fungal disease caused by Corynespora cassiicola. It affects tomato plants, leading to dark, concentric spots on leaves, stems, and fruit, which can cause defoliation and fruit rot.",
        "yellow-leaf-curl-virus": "Tomato yellow leaf curl virus (TYLCV) is a viral disease transmitted by whiteflies. It causes yellowing and curling of leaves, stunted growth, and reduced fruit production in tomato plants.",
        "mosaic-virus": "Tomato mosaic virus (ToMV) is a viral disease that causes mottling, mosaic patterns, and distortion of leaves. Infected tomato plants exhibit reduced vigor and fruit quality.",
        "healthy": "A healthy tomato plant leaf is vibrant in color, typically green, free from spots or discoloration, firm, and exhibits no signs of wilting, pests, or disease.",
    };

    const Title: { [key: string]: string } = {
        "bacterial-spot": "Bacterial Spot",
        "early-blight": "Early Blight",
        "late-blight": "Late Blight",
        "leaf-mold": "Leaf Mold",
        "septoria-leaf-spot": "Septoria Leaf Spot",
        "spider-mites": "Spider Mites",
        "target-spot": "Target Spot",
        "yellow-leaf-curl-virus": "Yellow Leaf Curl Virus",
        "mosaic-virus": "Mosaic Virus",
        "healthy": "Healthy",
    };

    const recommendations: { [key: string]: string } = {
        "bacterial-spot": "Your plant has Bacterial Spot. Remove and destroy affected areas. Avoid overhead watering and ensure proper spacing for air circulation. Consider using copper-based bactericides.",
        "early-blight": "Your plant shows signs of Early Blight. Prune affected leaves, apply a fungicide, and improve air circulation to prevent further spread. Monitor closely for any changes.",
        "late-blight": "Your plant has Late Blight. Remove and destroy affected areas immediately. Apply a suitable fungicide and avoid overhead watering. Consider isolating the plant to prevent infection of others.",
        "leaf-mold": "Your plant has Leaf Mold. Remove and destroy affected leaves. Ensure proper ventilation and reduce humidity. Apply a fungicide if necessary.",
        "septoria-leaf-spot": "Your plant has Septoria Leaf Spot. Remove affected leaves and improve air circulation. Apply a fungicide and avoid overhead watering.",
        "spider-mites": "Your plant has Spider Mites. Increase humidity around the plant and wash off mites with water. Consider using insecticidal soap or miticides.",
        "target-spot": "Your plant shows signs of Target Spot. Remove and destroy affected leaves. Apply a fungicide and ensure proper spacing and air circulation.",
        "yellow-leaf-curl-virus": "Your plant has Yellow Leaf Curl Virus. Remove infected plants to prevent spread. Control whiteflies and consider using resistant varieties.",
        "mosaic-virus": "Your plant has Tomato Mosaic Virus. Remove infected plants and sanitize tools and hands after handling. Control aphids and other pests that may spread the virus.",
        "healthy": "Your plant is healthy! Keep up the good work. Continue regular watering, ensure proper sunlight, and monitor for any signs of stress to maintain its health.",
    };

    const facts: { [key: string]: string } = {
        "bacterial-spot": "Did you know that Bacterial Spot is caused by Xanthomonas species and can survive in seeds and plant debris? It spreads rapidly in warm, wet conditions.",
        "early-blight": "Did you know that Early Blight is caused by the fungus Alternaria solani? It thrives in warm, humid conditions and primarily affects older leaves, leading to dark spots and yellowing.",
        "late-blight": "Did you know that Late Blight was responsible for the Irish Potato Famine in the 1840s? Caused by the pathogen Phytophthora infestans, it spreads rapidly in wet, cool conditions.",
        "leaf-mold": "Did you know that Leaf Mold is caused by the fungus Passalora fulva? It spreads in humid conditions and can significantly affect yield if not controlled.",
        "septoria-leaf-spot": "Did you know that Septoria Leaf Spot is caused by the fungus Septoria lycopersici? It spreads in wet conditions and can cause significant defoliation.",
        "spider-mites": "Did you know that Spider Mites are tiny arachnids that can reproduce rapidly under hot, dry conditions? They can cause extensive damage to plants if not controlled.",
        "target-spot": "Did you know that Target Spot is caused by the fungus Corynespora cassiicola? It can affect a wide range of plants, causing dark, target-like spots on leaves and fruit.",
        "yellow-leaf-curl-virus": "Did you know that Tomato Yellow Leaf Curl Virus is transmitted by whiteflies and can cause significant yield loss in tomato plants? It is a major concern in many tomato-growing regions.",
        "mosaic-virus": "Did you know that Tomato Mosaic Virus can survive in soil and plant debris for long periods? It can spread through contaminated tools and hands, as well as by pests like aphids.",
        "healthy": "Did you know that healthy plants can improve air quality by absorbing pollutants? They also release oxygen, making your environment fresher and healthier.",
    };

    const leafColor = {
        "healthy": "green",
        "bacterial-spot": "#FFD700",
        "early-blight": "#FFA500",
        "late-blight": "#8B4513",
        "leaf-mold": "#808080",
        "septoria-leaf-spot": "#A52A2A",
        "spider-mites": "#FF4500",
        "target-spot": "#8B0000",
        "yellow-leaf-curl-virus": "#FFFF00",
        "mosaic-virus": "#00FF00",
    };


    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.heading}>Diagnosis Results</Text>
            <Image source={{ uri: DiagnosedImage }} style={styles.image} />
            <Text style={styles.confidenceText}>
                We are {confidenceText.toLowerCase()} that it is:
            </Text>
            <View style={styles.classContainer}>
                <FontAwesome name="leaf" size={24} color={leafColor[diagnosisResults.class]} />
                <Text style={[styles.classText, diagnosisResults.class === 'healthy' && styles.healthyText]}>
                    {Title[diagnosisResults.class]}
                </Text>
            </View>
            <Text style={styles.descriptionText}>{classDescriptions[diagnosisResults.class]}</Text>

            <CollapsibleContent title="Recommendations" leftIconColor='green'>
                <Text style={[styles.descriptionText, { paddingTop: 5 }]} >{recommendations[diagnosisResults.class]}</Text>
            </CollapsibleContent>

            <CollapsibleContent title="Facts" leftIconName='lightbulb' leftIconColor='green'>
                <Text style={[styles.descriptionText, { paddingTop: 5 }]} >{facts[diagnosisResults.class]}</Text>
            </CollapsibleContent>

            <CollapsibleContent title="Important Notes" leftIconName='circle-exclamation' leftIconColor='green'>
                <Image source={{ uri: 'https://i.postimg.cc/3wF2cJM0/botanist.jpg' }} style={[styles.noteImage, { marginTop: 15 }]} />
                <Text style={[styles.descriptionText]} >
                    While our app offers plant diagnostics, it is not a substitute for professional consultation with a botanist. Users should take the app's diagnoses with a grain of salt, as it may occasionally make errors. The app is designed to assist with non-critical tasks and provide general guidance, but for critical decision-making and precise plant care, expert advice is essential.
                </Text>
            </CollapsibleContent>
            <TouchableOpacity style={styles.floatingButton}
                onPress={() => { closeModal() }}>
                <Icon name="xmark" size={20} color="#fff" />
            </TouchableOpacity>
        </ScrollView>
    );
};

const { height } = Dimensions.get('window');
const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        padding: 16,
    },
    heading: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 16,
        textAlign: 'left',
    },
    image: {
        width: '100%',
        height: height * 0.3,
        marginBottom: 16,
        borderRadius: 10,
    },
    confidenceText: {
        fontSize: 16,
        marginBottom: 8,
    },
    classContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 16,
    },
    classText: {
        fontSize: 24,
        fontWeight: 'bold',
        marginLeft: 8,
    },
    healthyText: {
        color: 'green',
    },
    descriptionText: {
        fontSize: 16,
        marginBottom: 16,
        textAlign: 'left',
    },
    noteImage: {
        width: '100%',
        height: 200,
        marginBottom: 16,
        borderRadius: 10,
    },
    floatingButton: {
        position: 'absolute',
        top: (screenHeight * 0.015),
        left: screenWidth - (screenWidth * 0.135),
        width: 40,
        height: 40,
        backgroundColor: 'black',
        borderRadius: 25,
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 5, // for shadow on Android
        shadowColor: '#000', // for shadow on iOS
        shadowOffset: { width: 0, height: 2 }, // for shadow on iOS
        shadowOpacity: 0.8, // for shadow on iOS
        shadowRadius: 2, // for shadow on iOS
        opacity: 0.7,
    },
});

export default TomatoDiagnosisResultsScreen;
