import React, { useState } from "react";
import { Image, TouchableOpacity, ScrollView, StyleSheet, View, ActivityIndicator, Alert, Modal } from "react-native";
import axios from "axios";

import defaultStyles from "../config/styles";
import { Text } from "react-native-paper";
import Logo from "../assets/logo.svg";

import * as Yup from "yup";
import Screen from "../components/Screen";

import { AppForm, AppFormField, SubmitButton } from "../components/forms";
import AppText from "../components/AppText";

// import AsyncStorage from '@react-native-async-storage/async-storage';
import useAuth from '../components/useAuth';

import CompleteProfileScreen from "./CompleteProfileScreen";

// const HOST = process.env.HOST;
const HOST = process.env.HOST;


const validationSchema = Yup.object().shape({
    emailOrUsername: Yup.string().required().label("Email or Username"),
    password: Yup.string().required().min(4).label("Password"),
});

console.log(`LoginURL: ${HOST}/auth/local/signin`);

function logCurrentTime() {
    const currentDate = new Date();
    const hours = currentDate.getHours();
    const minutes = currentDate.getMinutes();
    const seconds = Math.round(currentDate.getSeconds()); // Round seconds

    console.log(`Current time: ${hours}:${minutes}:${seconds}`);
}

async function getUserProfile(accessToken) {
    const url = `${HOST}/auth/local/myProfile`;

    try {
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        if (data && data.metadata) {
            console.log(data.metadata);
            return data.metadata;
        } else {
            throw new Error('Invalid response format');
        }
    } catch (error) {
        console.error('Error fetching profile:', error);
        Alert.alert('Error', 'Failed to fetch profile information');
        return null;
    }
}


let retrievedLoginResponse;

function LoginScreen({ navigation }) {
    const { login, logout } = useAuth();
    const [modalShown, setModalShown] = useState(false);

    const [loading, setLoading] = useState(false);
    const handleSubmit = async ({ emailOrUsername, password }) => {
        setLoading(true);
        const isEmail = emailOrUsername.includes("@");
        const body = isEmail
            ? { email: emailOrUsername, password }
            : { username: emailOrUsername, password };

        try {
            const response = await axios.post(
                `${HOST}/auth/local/signin`,
                body
            );

            console.log(response.data);
            retrievedLoginResponse = response;

            getUserProfile(response.data.tokens.access_token).then(metadata => {
                if (metadata) {
                    console.log("profile data was found. cool!");
                    // Handle the metadata
                    if ("profileIMG" in metadata &&
                        "lastName" in metadata &&
                        'firstName' in metadata
                    ) {
                        console.log("profile is complete. Cool!");
                        login(response.data.tokens.access_token,
                            response.data.tokens.refresh_token);
                    } else {
                        console.log("profile is incomplete. showing profile completion modal!");
                        setModalShown(true);
                    }
                }
            });

            // login(response.data.tokens.access_token, response.data.tokens.refresh_token);
        } catch (error) {
            console.log(body);
            console.log(error.response.data);
            Alert.alert("Oops!", error.response.data.message + ".");
        }finally {
            setLoading(false);
        }
    };
    return (
        <Screen style={styles.container}>
            <ScrollView>
                <Logo width={100} height={100} style={styles.logo} />
                <AppText style={styles.title}>From Root To Bloom </AppText>
                <AppText style={styles.subTitle}>Login to your account</AppText>
                <AppForm
                    initialValues={{ emailOrUsername: "", password: "" }}
                    onSubmit={handleSubmit}
                    validationSchema={validationSchema}
                >
                    <AppFormField
                        autoCapitalize="none"
                        placeholder="Email or Username"
                        textContentType="username"
                        icon="account"
                        autoCorrect={false}
                        name="emailOrUsername"
                    />
                    <AppFormField
                        autoCapitalize="none"
                        placeholder="Password"
                        textContentType="password"
                        icon="lock"
                        autoCorrect={false}
                        secureTextEntry={true}
                        name="password"
                    />

                    <View
                        style={{ alignItems: "center", justifyContent: "center" }}
                    >
                        <SubmitButton title="Login" />
                    </View>

                    <View style={{ flexDirection: 'row', alignItems: "center", justifyContent: "center", }}>
                        <AppText style={styles.signup}>
                            Don't have an account?{" "}
                        </AppText>
                        <TouchableOpacity
                            onPress={(e) => {
                                {
                                    navigation.navigate("Sign Up");
                                }
                            }}
                        >
                            <Text style={[styles.signup, styles.signupLink]}>Sign Up</Text>
                        </TouchableOpacity>
                    </View>
                </AppForm>
            </ScrollView>
            <Modal
                visible={modalShown}
            >
                <View style={{ flex: 1 }} >
                    <CompleteProfileScreen
                        loginFunction={login}
                        loginResponse={retrievedLoginResponse}
                        modalSetter={setModalShown}
                    >
                    </CompleteProfileScreen>
                </View>
            </Modal>
            {loading && (
                <Modal transparent={true} animationType="none">
                    <View style={styles.overlay}>
                        <View style={styles.loaderContainer}>
                            <ActivityIndicator size="large" color="green" />
                        </View>
                    </View>
                </Modal>
            )}
        </Screen>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        backgroundColor: "white",
    },
    logo: {
        width: 80,
        height: 80,
        alignSelf: "center",
        marginTop: 50,
        marginBottom: 20,
    },
    title: {
        fontSize: 30,
        fontWeight: "bold",
        textAlign: "center",
        marginBottom: 20,
    },
    subTitle: {
        fontSize: 20,
        fontWeight: "bold",
        textAlign: "center",
        marginBottom: 20,
        color: defaultStyles.colors.lightPrimary,
    },
    forgotPassword: {
        textAlign: "right",
        textDecorationLine: "underline",
        marginBottom: 15,
        marginRight: 11,
        color: defaultStyles.colors.primary,
        fontWeight: "bold",
        marginLeft: 3, // adjust this value as needed
    },
    signup: {
        fontSize: 18,
        textAlign: "center",
        marginTop: 15,
        fontWeight: "bold",
    },
    signupLink: {
        textDecorationLine: "underline",
        color: defaultStyles.colors.primary,
    },
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    loaderContainer: {
        width: 100,
        height: 100,
        backgroundColor: 'white',
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
});

export default LoginScreen;
