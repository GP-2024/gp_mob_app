import React from "react";
import { StyleSheet, View } from "react-native";
import colors from "../../config/colors";

function Separator() {
    return <View style={styles.separator}></View>;
}

const styles = StyleSheet.create({
    separator: {
        width: "90%",
        height: 2,
        backgroundColor: colors.primary,
        margin: 30,
    },
});

export default Separator;
