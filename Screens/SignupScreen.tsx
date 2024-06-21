import React from "react";
import { StyleSheet, Text,ScrollView, View, Alert } from "react-native";
import axios from "axios";

import defaultStyles from "../config/styles";

import * as Yup from "yup";
import Screen from "../components/Screen";

import { AppForm, AppFormField, SubmitButton } from "../components/forms";
import AppText from "../components/AppText";

import Logo from "../assets/logo.svg";

const HOST = process.env.HOST;

const validationSchema = Yup.object().shape({
    username: Yup.string().required().label("Username"),
    email: Yup.string().required().email().label("Email"),
    password: Yup.string().required().min(4).label("Password"),
});


function RegisterScreen(props) {
    const handleSubmit = async (values) => {
        try {
            const response = await axios.post(
                `${HOST}/auth/local/signup`,
                values
            );
            Alert.alert(
                "",
                "Account successfully registered!\nYou can now sign in."
            );
        } catch (error) {
            Alert.alert("Error", "An error occurred. Please try again.");
        }
    };

    return (
        <Screen style={styles.container}>
            <ScrollView>
            <Logo width={100} height={100} style={styles.logo} />
            <AppText style={styles.title}>From Root To Bloom </AppText>
            <AppText style={styles.subTitle}>Create a new account</AppText>
            <AppForm
                initialValues={{
                    username: "",
                    email: "",
                    password: "",
                }}
                onSubmit={handleSubmit}
                validationSchema={validationSchema}
            >
                <AppFormField
                    autoCapitalize="none"
                    placeholder="Username"
                    icon="account-circle"
                    autoCorrect={false}
                    name="username"
                />
                <AppFormField
                    autoCapitalize="none"
                    placeholder="Email"
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

                <View
                    style={{ alignItems: "center", justifyContent: "center" }}
                >
                    <SubmitButton title="Register" />
                </View>

                <AppText style={styles.login}>
                    Already have an account?{" "}
                    <Text style={styles.loginLink}>Login</Text>
                </AppText>
            </AppForm>
            </ScrollView>
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
    login: {
        fontSize: 18,
        textAlign: "center",
        marginTop: 15,
        fontWeight: "bold",
    },
    loginLink: {
        textDecorationLine: "underline",
        color: defaultStyles.colors.primary,
    },
});

export default RegisterScreen;
