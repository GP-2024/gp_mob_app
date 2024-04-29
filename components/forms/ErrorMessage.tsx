import React from "react";
import AppText from "../AppText";
import { StyleSheet } from "react-native";
import colors from "../../config/colors";

function ErrorMessage({ error, visible }) {
    if (!error || !visible) return null;
    return <AppText style={styles.error}>{error}</AppText>;
}

const styles = StyleSheet.create({
    error: {
        color: colors.danger,
        fontSize: 12,
        fontWeight: "bold",
        paddingLeft: 14,
    },
});

export default ErrorMessage;
