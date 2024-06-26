import React, { useState } from "react";
import { StyleSheet,  ScrollView, View, Alert, Modal, ActivityIndicator, Pressable, TouchableOpacity } from "react-native";
import axios from "axios";

import defaultStyles from "../config/styles";

import * as Yup from "yup";
import Screen from "../components/Screen";

import { AppForm, AppFormField, SubmitButton } from "../components/forms";
import AppText from "../components/AppText";

import Logo from "../assets/logo.svg";

import { ProgressBar ,Text} from "react-native-paper";

const HOST = process.env.HOST;

const validationSchema = Yup.object().shape({
    username: Yup.string().required().label("Username"),
    email: Yup.string().required().email().label("Email"),
    password: Yup.string().required().min(4).label("Password"),
});


function RegisterScreen({navigation}) {
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (values) => {
        setLoading(true);
        try {
            const response = await axios.post(
                `${HOST}/auth/local/signup`,
                values
            );
            console.log("signed up success...");
            console.log(response);
            Alert.alert(
                "",
                "Account successfully registered!\nYou can now sign in."
            );
        } catch (error) {
            console.log("====CATCH====")
            console.log(`${HOST}/auth/local/signup`);
            console.log(error.response.data.message);
            console.log("error catched...");
            console.log("============")

            const messages = error.response.data.message;

            // Capitalize the first letter of each string
            const capitalizedMessages = messages.map(message => {
                return message.charAt(0).toUpperCase() + message.slice(1) + ".";
            });

            // Join the messages with line breaks
            const resultString = capitalizedMessages.join('\n');
            Alert.alert("Oops!", resultString);
        } finally {
            setLoading(false);
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

                    <View style={{ flexDirection: 'row', alignItems: "center", justifyContent: "center", }}>
                        <AppText style={styles.login}>
                            Already have an account?{" "}
                        </AppText>
                        <TouchableOpacity
                        onPress={(e)=>{{
                            navigation.navigate("Login");
                        }}}
                        >
                            <Text style={[styles.login, styles.loginLink]}>Login</Text>
                        </TouchableOpacity>
                    </View>
                </AppForm>
            </ScrollView>
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

export default RegisterScreen;
