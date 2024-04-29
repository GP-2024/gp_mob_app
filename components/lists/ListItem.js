import React from 'react';
import { Image, StyleSheet, TouchableHighlight, View } from 'react-native';
import AppText from '../AppText';
import colors from '../../config/colors';
import Swipeable from 'react-native-gesture-handler/Swipeable';

function ListItem({ renderRightActions, onPress, IconComponent, image, title, subTitle }) {
	return (
		<Swipeable renderRightActions={renderRightActions}>
			<TouchableHighlight onPress={onPress} underlayColor={colors.light}>
				<View style={styles.container}>
					{IconComponent}
					{image && <Image style={styles.image} source={image} />}
					<View style={styles.textContainer}>
						<AppText style={styles.title}>{title}</AppText>
						{subTitle && <AppText style={styles.subTitle}>{subTitle}</AppText>}
					</View>
				</View>
			</TouchableHighlight>
		</Swipeable>
	);
}

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		padding: 15,
		backgroundColor: colors.white,
	},
	textContainer: {
		marginLeft: 10,
		justifyContent: 'center',
	},
	image: {
		width: 70,
		height: 70,
		borderRadius: 35,
	},
	title: {
		fontWeight: '500',
	},
	subTitle: {
		color: colors.medium,
	},
});

export default ListItem;
