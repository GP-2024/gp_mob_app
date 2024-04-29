import React from 'react';
import AppPicker from '../AppPicker';
import { useFormikContext } from 'formik';
import { ErrorMessage } from '.';

// We make use of the useFormikContext hook to get access to the values, errors, and touched properties of the formik object.

function AppFormPicker({ items, name, placeholder }) {
	const { setFieldValue, touched, errors, values } = useFormikContext();
	return (
		<AppPicker
			items={items}
			onSelectItem={(item) => setFieldValue(name, item)}
			selectedItem={values[name]}
			placeholder={placeholder}
		>
			<ErrorMessage error={errors[name]} visible={touched[name]} />
		</AppPicker>
	);
}
export default AppFormPicker;
