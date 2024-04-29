import { Platform } from "react-native";
import colors from "./colors";

const defaultStyles = {
    colors,
    text: {
        fontSize: 18,
        fontFamily: Platform.OS === "android" ? "Roboto" : "Avenir",
        color: colors.dark,
    },
};

export default defaultStyles;
