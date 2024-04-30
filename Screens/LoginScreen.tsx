import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import axios from "axios";

import defaultStyles from "../config/styles";

import Logo from "../assets/logo.svg";

import * as Yup from "yup";
import Screen from "../components/Screen";

import { AppForm, AppFormField, SubmitButton } from "../components/forms";
import AppText from "../components/AppText";

import AsyncStorage from '@react-native-async-storage/async-storage';

import { HOST } from "@env";

const validationSchema = Yup.object().shape({
    email: Yup.string().required().email().label("Email"),
    password: Yup.string().required().min(4).label("Password"),
});


const getData = async () => {
    try {
        const jsonValue = await AsyncStorage.getItem('app_data');
        if (jsonValue != null) {
            console.log("=============");
            console.log(JSON.parse(jsonValue));
            console.log("=============");
            return JSON.parse(jsonValue);
        } else {
            console.log("=============");
            console.log(null);
            console.log("=============");
            return null;
        }

    } catch (e) {
        // error reading value
    }
};

const storeData = async (value) => {
    try {
        const jsonValue = JSON.stringify(value);
        await AsyncStorage.setItem('app_data', jsonValue);
    } catch (e) {
        // saving error
        console.log(e)
    }
};

function LoginScreen(props) {
    const handleSubmit = async (values) => {
        try {
            const response = await axios.post(
                `${HOST}/auth/local/signin`,
                values
            );

            console.log(response.data);
            storeData(response.data);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <Screen style={styles.container}>
            <Logo width={100} height={100} style={styles.logo} />
            <AppText style={styles.title}>From Root To Bloom </AppText>
            <AppText style={styles.subTitle}>Login to your account</AppText>
            <AppForm
                initialValues={{ email: "", password: "" }}
                onSubmit={handleSubmit}
                validationSchema={validationSchema}
            >
                <AppFormField
                    autoCapitalize="none"
                    placeholder="Email"
                    textContentType="emailAddress"
                    icon="email"
                    autoCorrect={false}
                    keyboardType="email-address"
                    name="email"
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
                <Text style={styles.forgotPassword}>Forgot Password?</Text>

                <View
                    style={{ alignItems: "center", justifyContent: "center" }}
                >
                    <SubmitButton title="Login" />
                </View>

                <AppText style={styles.signup}>
                    Don't have an account?{" "}
                    <Text style={styles.signupLink}>Sign up</Text>
                </AppText>
            </AppForm>
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
});

export default LoginScreen;
