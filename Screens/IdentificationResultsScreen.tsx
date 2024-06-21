// Import necessary React Native components
import {
    View,
    TextInput,
    FlatList,
    StyleSheet,
    Dimensions,
    SafeAreaView,
    TouchableOpacity,
} from "react-native";
import { Text } from 'react-native-paper'
import React, { useState, useEffect } from "react";
import axios from "axios";
import { getAccessToken } from "../components/useAuth";
import PlantResultItemCard from "../components/PlantResultItemCard";
// const HOST = process.env.HOST;
const HOST = process.env.HOST;
import Icon from "react-native-vector-icons/FontAwesome6";

const SEARCH_API_URL = `${HOST}/perenual/plants-details`;

const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;
const widthFactor = 0.88;
const heightFactor = 0.09;

let demoIdentificationResultsNew = [
    {
        id: 1,
        scientific_name: "Fragaria x ananassa",
        common_name: "Garden Strawberry",
        probability: "35.03%",
        description: "The garden strawberry is a widely grown hybrid species of the genus Fragaria, collectively known as the strawberries, which are cultivated worldwide for their fruit. The fruit is widely appreciated for its characteristic aroma, bright red color, juicy texture, and sweetness. It is consumed in large quantities, either fresh or in such prepared foods as jam, juice, pies, ice cream, milkshakes, and chocolates. Artificial strawberry flavorings and aromas are also widely used in products such as candy, soap, lip gloss, perfume, and many others.",
        description_link: "https://en.wikipedia.org/wiki/Strawberry",
        images: [
            "https://fthmb.tqn.com/smOx93Jvi7JguN4uFf9Yv6ck-fY=/2066x1452/filters:fill(auto,1)/Strawberryplant-GettyImages-123533002-5b198b33eb97de0036be58ae.jpg"
        ]
    },
    {
        id: 2,
        scientific_name: "Sideritis dasygnaphala",
        common_name: "N/A",
        probability: "11.01%",
        description: "N/A is a common abbreviation in tables and lists for the phrase not applicable, not available, not assessed, or no answer. It is used to indicate when information in a certain table cell is not provided, either because it does not apply to a particular case in question or because the answer is not available. Such a notation can be used on many different types of forms.",
        description_link: "https://en.wikipedia.org/wiki/N%2FA",
        images: [
            "https://australianteachersmarketplace.com.au/wp-content/uploads/2023/03/Slide3.jpeg"
        ]
    },
    {
        id: 3,
        scientific_name: "Allium oschaninii",
        common_name: "French grey shallot",
        probability: "9.2%",
        description: "Description not found",
        description_link: null,
        images: [
            "https://www.adaptiveseeds.com/wp-content/uploads/2014/12/french-grey-shallot-2.jpg"
        ]
    }
];



const IdentificationResultsScreen = ({ identificationResult = [], modalSetter, identifiedImage }) => {
    const [searchQuery, setSearchQuery] = useState("");
    const [plantsData, setPlantsData] = useState([]);
    const [timer, setTimer] = useState(null);

    const closeModal = () => {
        modalSetter(false);
    };

    // adding an id to the results for the flatlist
    identificationResult = identificationResult.map((item, index) => {
        return {
            id: index + 1,
            scientific_name: item.scientific_name,
            common_name: item.common_name,
            probability: item.probability,
            description: item.description,
            description_link: item.description_link,
            images: item.images
        };
    });

    const performSearch = async () => {
        if (searchQuery.length > 1) {
            console.log("\n\n=======SEARCH======\n");
            console.log("Performing search for:", searchQuery, " ...\n");
            console.log("url:\n", SEARCH_API_URL, "\n");
            try {
                const token = await getAccessToken();
                const response = await axios.get(SEARCH_API_URL, {
                    params: { q: searchQuery },
                    headers: { Authorization: `Bearer ${token}` },
                });
                setPlantsData(response.data.data);
                console.log(response.data.data);
                console.log("Found ", response.data.data.length, " results!\n");
            } catch (error) {
                console.error("Error fetching plants:", error);
            }
            console.log("=============\n\n");
        } else {
            console.log(
                "not performing search because query length not greater than 1.."
            );
            setPlantsData([]);
        }
    };

    const gridRenderItem = ({ item }) => (
        <PlantResultItemCard
            itemID={item.id}
            itemName={item.common_name}
            itemImageUrl={
                item.images
                    ? item.images[0]
                    : "https://i.postimg.cc/0jyTBx2y/default-Plant-Image.jpg"
            }
            itemDescription={item.scientific_name}
            percentage={item.probability}
            itemLongDescription={item.description}
            wikipediaToPlant={item.description_link}
        />
    );

    return (
        <SafeAreaView style={styles.outerContainer}>
            <Text style={styles.heading}>Identification Results</Text>
            <FlatList
                data={identificationResult}
                renderItem={gridRenderItem}
                keyExtractor={(item) => item.id}
                numColumns={1}
            />
            <TouchableOpacity style={styles.floatingButton}
                onPress={() => { closeModal() }}>
                <Icon name="xmark" size={20} color="#fff" />
            </TouchableOpacity>
        </SafeAreaView>
    );
};

// Define styles using StyleSheet
const styles = StyleSheet.create({
    searchSection: {
        width: screenWidth * 0.88,
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "center",
        backgroundColor: "#fff",
        // borderWidth: 1,
        // borderColor: 'cyan',
        borderRadius: 5,
        overflow: "hidden",
        marginBottom: 19,
    },
    searchIcon: {
        padding: 10,
        // borderWidth: 1,
        // borderColor: 'red',
        // width:'10%'
    },
    input: {
        paddingLeft: 10,
        fontSize: 20 * 0.8,
        backgroundColor: "white",
        height: 40,
        borderRadius: 5,
        // borderWidth: 1,
        // borderColor: 'green',
        width: "88%",
    },
    outerContainer: {
        flex: 1,
        flexDirection: "column",
        alignItems: "stretch",
        paddingHorizontal: 18,
        paddingTop: 19,

        // borderWidth: 1,
        // borderColor: 'black',
        margin: 0,
    },
    topBanner: {
        flex: 3.5,
        alignItems: "center",
        justifyContent: "center",
        paddingBottom: 40,

        // borderWidth: 1,
        // borderColor: 'red',
        // margin: 3,
    },
    topTitleContainer: {
        flex: 1,
        alignItems: "flex-start",
        justifyContent: "center",
        paddingBottom: 10,

        // borderWidth: 1,
        // borderColor: 'red',
        // margin: 3,
    },
    secondaryTitleContainer: {
        flex: 1,
        alignItems: "flex-start",
        justifyContent: "center",
        paddingBottom: 5,

        // borderWidth: 1,
        // borderColor: 'red',
        // margin: 3,
    },
    inputContainer: {
        flex: 1,
        alignItems: "stretch",
        // borderWidth: 1,
        // borderColor: 'red',
        // margin: 3,
    },
    sideButtonContainer: {
        flex: 0.5,
        alignItems: "flex-end",
        justifyContent: "flex-start",

        // borderWidth: 1,
        // borderColor: 'red',
        // margin: 3,
    },
    buttonContainer: {
        flex: 1,
        alignItems: "stretch",
        justifyContent: "center",

        // borderWidth: 1,
        // borderColor: 'red',
        // margin: 3,
    },
    horizContainer: {
        flex: 0.6,
        flexDirection: "row",
        alignItems: "stretch",

        // borderWidth: 1,
        // borderColor: 'red',
        // margin: 3,
    },
    centerContainer: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",

        // borderWidth: 1,
        // borderColor: 'red',
        // margin: 3,
    },
    buttonContainerStyle: {
        // flex: 200, heree
        // borderWidth: 1,
        // borderColor: 'red',
        alignItems: "center",
        justifyContent: "center",
    },
    separatorContainerStyle: {
        flex: 1,
        // borderWidth: 1,
        // borderColor: 'red',
        backgroundColor: "black",
    },
    indentificationButtonStyle: {
        width: 200,
        height: 200,
        borderRadius: 200 / 20,
        backgroundColor: "#2089DC",
        padding: 20,
    },
    scanButtonContentStyle: {
        flexDirection: "column",
        paddingHorizontal: 5,
    },
    scanButtonTextStyle: {
        color: "white",
        fontSize: 39.81 * 0.8,
        fontWeight: "bold",
    },
    heading: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 16,
        textAlign: 'left',
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

export default IdentificationResultsScreen;
