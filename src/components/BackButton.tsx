import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

interface ILastImage {
	navigateToGallery: () => void;
}

export const BackButton = ({navigateToGallery}: ILastImage) => {

	return (
		<TouchableOpacity onPress={navigateToGallery} style={styles.container}>
			<Text style={styles.back}>&lt;</Text>
		</TouchableOpacity>
	)
}

const styles = StyleSheet.create({
	container: {
		position: 'absolute',
		left: 20,
		top: 40
	},
	back: {
		fontSize: 50,
		lineHeight: 40,
		fontWeight: '700',
		color: 'white'
	}
})