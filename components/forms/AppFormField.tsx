import React from "react";
import ErrorMessage from "./ErrorMessage";

import { useFormikContext } from "formik";
import AppTextInput from "../AppTextInput";

function AppFormField({ name, ...otherProps }) {
    const { handleChange, errors, touched, setFieldTouched } =
        useFormikContext();
    return (
        <>
            <AppTextInput
                onBlur={() => setFieldTouched(name)}
                onChangeText={handleChange(name)}
                icon={otherProps.icon}
                {...otherProps}
            ></AppTextInput>
            <ErrorMessage error={errors[name]} visible={touched[name]} />
        </>
    );
}

export default AppFormField;
