import React from 'react';
import { Image, StyleSheet, TouchableOpacity } from 'react-native';

interface ILastImage {
	imageList: string[];
	navigateToGallery: () => void;
}

export const LastImage = ({imageList, navigateToGallery}: ILastImage) => {
	const image = imageList[imageList.length - 1];

	return (
		<TouchableOpacity onPress={navigateToGallery} style={styles.container}>
			<Image style={styles.image} source={{uri: `file://${image}`}} />
		</TouchableOpacity>
	)
}

const styles = StyleSheet.create({
	container: {
		width: 70,
		height: 70,
		position: 'absolute',
		left: 20,
		bottom: 22,
	},
	image: {
		width: 70,
		height: 70,
		borderRadius: 10
	}
})