// Import necessary React Native components
import {
    View,
    TextInput,
    FlatList,
    Pressable,
    StyleSheet,
    Dimensions,
    SafeAreaView,
    ScrollView,
} from "react-native";
import React, {
    useState,
    useEffect,
    useRef,
    useCallback,
    useContext,
    createContext,
} from "react";
import axios from "axios";
import { getAccessToken } from "../components/useAuth";
import BlogItemCard from "../components/BlogItemCard";
import NewBlogItemCard from "../components/NewBlogItemCard";
const HOST = process.env.HOST;
import Icon from "react-native-vector-icons/FontAwesome6";
import defaultStyles from "../config/styles";

import { appContext } from "../App";

import { useToast } from "react-native-toast-notifications";

import { useFocusEffect } from "@react-navigation/native";

const screenWidth = Dimensions.get("window").width;

function DictionarySmallSummaryForDebugging(dictionary) {
    if (dictionary === null) {
        return;
    }

    const keys = Object.keys(dictionary);
    const keyCount = keys.length;

    if (keyCount === 0) {
        console.log("The dictionary is empty.");
    } else if (keyCount <= 3) {
        console.log("The dictionary has the following keys:", keys.join(", "));
    } else {
        const firstThreeKeys = keys.slice(0, 3);
        console.log(
            `The dictionary has the following keys: ${firstThreeKeys.join(
                ", "
            )} and ${keyCount - 3} remaining keys.`
        );
    }
}

function writingModeFocus(scrViewRef, toast) {
    scrViewRef.current?.scrollTo({
        y: 0,
        animated: true,
    });
    toast.show("Writing mode", {
        style: { bottom: 62 },
        animationType: "slide-in",
        swipeEnabled: false,
        duration: 9e20,
    });
}

export const createNewBlogPost = async (title, content, refreshBlogs) => {
    try {
        const token = await getAccessToken();
        if (!token) {
            throw new Error("Access token not found");
        }

        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        };

        const data = {
            title: title,
            content: content,
        };

        const response = await axios.post(
            `${HOST}/blogs/new-post`,
            data,
            config
        );
        refreshBlogs(); // Trigger refresh after adding a new blog post
        return response.data;
    } catch (error) {
        console.error("Error creating new blog post:", error);
        throw error;
    }
};

const getAllBlogPosts = async (page) => {
    try {
        console.log("attempting to fetch blogs");
        const token = await getAccessToken();
        if (!token) {
            throw new Error("Access token not found");
        }

        const response = await axios.get(`${HOST}/blogs/all-posts`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
            params: {
                page: page,
            },
        });
        console.log("blogs fetched!");
        DictionarySmallSummaryForDebugging(response.data);
        return response.data.posts;
    } catch (error) {
        console.error("Error fetching blog posts:", error);
        throw error;
    }
};

const BlogsScreen = ({ navigation }) => {
    const [searchQuery, setSearchQuery] = useState("");
    const [blogsData, setBlogsData] = useState([]);
    const [timer, setTimer] = useState(null);

    const appCxt = useContext(appContext);
    const { inWritingMode, setInWritingMode, setShowWritingModeIndicator } =
        appCxt;

    const flatListRef = useRef();
    const scrViewRef = useRef();
    const toast = useToast();

    useEffect(() => {
        const interval = setInterval(() => {
            getAllBlogPosts(1)
                .then((blogs) => {
                    setBlogsData(blogs);
                })
                .catch((error) => {
                    console.error("Error fetching blogs:", error);
                });
        }, 60000);

        return () => clearInterval(interval);
    }, []);

    useFocusEffect(
        useCallback(() => {
            getAllBlogPosts(1)
                .then((blogs) => {
                    setBlogsData(blogs);
                })
                .catch((error) => {
                    console.error("Error fetching blogs:", error);
                });

            if (inWritingMode) {
                setShowWritingModeIndicator(true);
                writingModeFocus(scrViewRef, toast);
            } else {
                setShowWritingModeIndicator(false);
                toast.hideAll();
            }

            return () => {
                setShowWritingModeIndicator(false);
                toast.hideAll();
            };
        }, [inWritingMode])
    );

    const refreshBlogs = () => {
        getAllBlogPosts(1)
            .then((blogs) => {
                setBlogsData(blogs);
            })
            .catch((error) => {
                console.error("Error fetching blogs:", error);
            });
    };

    const gridRenderItem = ({ item }) => (
        <BlogItemCard
            itemID={item.id}
            itemName={item.title}
            itemAuthor={item.createdBy}
            itemNOfLikes={item.numOfLikes}
            itemNOfComments={item.numOfComments}
            itemDescription={item.content}
            itemDate={item.createdAt}
        />
    );

    const NewPostButton = ({
        inWritingMode,
        setInWritingMode,
        setShowWritingModeIndicator,
        scrViewRef,
    }) => {
        const handlePress = () => {
            if (!inWritingMode) {
                setInWritingMode(true);
                setShowWritingModeIndicator(true);
            } else {
                setInWritingMode(false);
                setShowWritingModeIndicator(false);
            }
        };

        return (
            <Pressable onPress={handlePress} style={styles.newPostButtonStyle}>
                <Icon
                    name={inWritingMode ? "xmark" : "plus"}
                    size={20}
                    color="white"
                />
            </Pressable>
        );
    };
    return (
        <SafeAreaView style={styles.outerContainer}>
            <View style={styles.container}>
                <View style={styles.searchSection}>
                    <TextInput
                        style={styles.input}
                        placeholder="Search blogs"
                        onChangeText={setSearchQuery}
                        underlineColorAndroid="transparent"
                    />
                    <Icon
                        style={styles.searchIcon}
                        name="magnifying-glass"
                        size={20}
                        color="#666666"
                    />
                </View>

                {inWritingMode ? (
                    <ScrollView ref={scrViewRef}>
                        <NewBlogItemCard refreshBlogs={refreshBlogs} />
                        <FlatList
                            data={blogsData}
                            renderItem={gridRenderItem}
                            keyExtractor={(item) => item.id}
                            numColumns={1}
                            ref={flatListRef}
                            scrollEnabled={!inWritingMode}
                        />
                    </ScrollView>
                ) : (
                    <FlatList
                        data={blogsData}
                        renderItem={gridRenderItem}
                        keyExtractor={(item) => item.id}
                        numColumns={1}
                        ref={flatListRef}
                        scrollEnabled={!inWritingMode}
                    />
                )}

                <NewPostButton
                    inWritingMode={inWritingMode}
                    setInWritingMode={setInWritingMode}
                    setShowWritingModeIndicator={setShowWritingModeIndicator}
                    scrViewRef={scrViewRef}
                />
            </View>
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
        borderRadius: 5,
        overflow: "hidden",
        marginBottom: 19,
    },
    searchIcon: {
        padding: 10,
    },
    input: {
        paddingLeft: 10,
        fontSize: 16,
        backgroundColor: "white",
        height: 40,
        borderRadius: 5,
        width: "88%",
    },
    outerContainer: {
        flex: 1,
        flexDirection: "column",
        alignItems: "stretch",
        paddingHorizontal: 18,
        paddingTop: 19,
        margin: 0,
    },
    container: {
        flex: 1,
    },
    newPostButtonStyle: {
        position: "absolute",
        bottom: 20,
        right: 20,
        width: 50,
        height: 50,
        backgroundColor: defaultStyles.colors.primary,
        borderRadius: 25,
        justifyContent: "center",
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.27,
        shadowRadius: 4.65,
        elevation: 6,
    },
});

export default BlogsScreen;
