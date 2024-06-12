// Import necessary React Native components
import {
    View,
    TextInput,
    FlatList,
    StyleSheet,
    Dimensions,
    SafeAreaView,
} from "react-native";
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

let demoIdentificationResults = [
    {
        id: 3,
        common_name: 'Daisy',
        scientific_name: 'Orchidaceae',
        isAdded: true,
        percentage: '45%',
        default_image: { small_url: 'https://perenual.com/storage/species_image/234_clerodendrum_trichotomum/small/10059423085_a1683382f4_b.jpg' }
    },
    {
        id: 5,
        common_name: 'Daisy',
        scientific_name: 'Rosa',
        isAdded: false,
        percentage: '41%',
        default_image: { small_url: 'https://perenual.com/storage/species_image/165_acer_tataricum_garann/small/Acer_tataricum_28fruits29.jpg' }
    },
    {
        id: 4,
        common_name: 'Sunflower',
        scientific_name: 'Bellis',
        isAdded: false,
        percentage: '17%',
        default_image: { small_url: 'https://perenual.com/storage/species_image/433_acalypha_hispida/small/20298859928_ac5f7bc791_b.jpg' }
    },
    {
        id: 1,
        common_name: 'Daisy',
        scientific_name: 'Orchidaceae',
        isAdded: false,
        percentage: '15%',
        default_image: { small_url: 'https://perenual.com/storage/species_image/1831_chelone_lyonii_hot_lips/small/52391427376_248afde832_b.jpg' }
    },
    {
        id: 2,
        common_name: 'Daisy',
        scientific_name: 'Orchidaceae',
        isAdded: false,
        percentage: '8%',
        default_image: { small_url: 'https://perenual.com/storage/species_image/165_acer_tataricum_garann/small/Acer_tataricum_28fruits29.jpg' }
    }
]


function extractNameAndDescription(item) {
    let mainName = "";
    let description = "";

    // Determine main name
    if (item.common_name) {
        mainName = item.common_name;
    } else if (item.scientific_name) {
        mainName = item.scientific_name;
    } else {
        mainName = "Unnamed";
    }

    // Capitalize every word in main name
    mainName = mainName.replace(/\b\w/g, (char) => char.toUpperCase());

    // Determine description
    if (!item.common_name && item.scientific_name) {
        description = item.slug ? `Slug: ${item.slug}` : "Not available";
    } else if (item.synonyms && item.synonyms.length > 0) {
        description = `${item.synonyms[0]}`;
    } else if (item.slug) {
        description = `Slug: ${item.slug}`;
    } else {
        description = "Not available";
    }

    // Uppercase first letter in description
    description = description.charAt(0).toUpperCase() + description.slice(1);

    return [mainName, description];
}

const IdentificationResultsScreen = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const [plantsData, setPlantsData] = useState([]);
    const [timer, setTimer] = useState(null);

    useEffect(() => {
        if (timer) {
            clearTimeout(timer);
        }
        const searchTimer = setTimeout(() => {
            performSearch();
        }, 3000);
        setTimer(searchTimer);
    }, [searchQuery]);

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
                item.default_image
                    ? item.default_image.small_url
                    : "https://i.postimg.cc/0jyTBx2y/default-Plant-Image.jpg"
            }
            itemDescription={item.scientific_name}
            isAdded={item.isAdded}
            percentage={item.percentage}
        />
    );

    return (
        <SafeAreaView style={styles.outerContainer}>
            {/* <View style={styles.searchSection}>
                <TextInput
                    style={styles.input}
                    placeholder="Search for a plant"
                    onChangeText={(inputString) => setSearchQuery(inputString)}
                    underlineColorAndroid="transparent"
                />
                <Icon
                    style={styles.searchIcon}
                    name="magnifying-glass"
                    size={20}
                    color="#666666"
                />
            </View> */}
            <FlatList
                data={demoIdentificationResults}
                renderItem={gridRenderItem}
                keyExtractor={(item) => item.id}
                numColumns={1}
            />
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
        margin: 3,
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
});

export default IdentificationResultsScreen;
