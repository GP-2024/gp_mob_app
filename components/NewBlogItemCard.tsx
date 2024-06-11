import React, { useState } from "react";
import {
    View,
    Text,
    TextInput,
    Pressable,
    StyleSheet,
    ActivityIndicator,
} from "react-native";
import axios from "axios";

import { getAccessToken } from "./useAuth";
const HOST = process.env.HOST;

const NewBlogItemCard = ({ refreshBlogs }) => {
    const [blogTitle, setBlogTitle] = useState("");
    const [blogBody, setBlogBody] = useState("");
    const [loading, setLoading] = useState(false); // State to manage loading indicator

    const handlePost = async () => {
        if (!blogTitle.trim()) {
            alert("Blog title cannot be empty");
            return;
        }

        if (!blogBody.trim()) {
            alert("Blog body cannot be empty");
            return;
        }

        try {
            setLoading(true); // Show loading indicator
            const token = await getAccessToken();
            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            };

            const data = { title: blogTitle, content: blogBody };
            const response = await axios.post(
                `${HOST}/blogs/new-post`,
                data,
                config
            );

            console.log("Blog post created successfully:", response.data);
            alert("Blog post created successfully");
            setBlogTitle("");
            setBlogBody("");
            refreshBlogs(); // Call the refreshBlogs function after creating a new blog post
        } catch (error) {
            console.error("Error creating blog post:", error);
            alert("Error creating blog post");
        } finally {
            setLoading(false); // Hide loading indicator regardless of success or failure
        }
    };

    return (
        <View style={styles.card}>
            <TextInput
                style={styles.input}
                placeholder="Enter blog title"
                value={blogTitle}
                onChangeText={setBlogTitle}
            />
            <TextInput
                style={[styles.input, styles.multiline]}
                placeholder="Write your post!"
                value={blogBody}
                onChangeText={setBlogBody}
                multiline
            />
            <Pressable
                style={styles.button}
                onPress={handlePost}
                disabled={loading}
            >
                {loading ? (
                    <ActivityIndicator color="#fff" /> // Show loading spinner if loading is true
                ) : (
                    <Text style={styles.buttonText}>Post</Text>
                )}
            </Pressable>
        </View>
    );
};

const styles = StyleSheet.create({
    card: {
        backgroundColor: "#fff",
        borderRadius: 8,
        marginVertical: 8,
        padding: 16,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 5,
    },
    input: {
        fontSize: 16,
        borderBottomWidth: 1,
        borderBottomColor: "#ddd",
        marginBottom: 16,
        padding: 8,
    },
    multiline: {
        minHeight: 100,
    },
    button: {
        backgroundColor: "#4CAF50",
        borderRadius: 8,
        paddingVertical: 12,
        alignItems: "center",
    },
    buttonText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "bold",
    },
});

export default NewBlogItemCard;
