import React from 'react';

import { View, Image, StyleSheet } from 'react-native';

interface ILastImage {
	imageList: string[];
}

export const LastImage = ({imageList}: ILastImage) => {
	const image = imageList[imageList.length - 1];

	return (
		<View style={styles.container}>
			<Image style={styles.image} source={{uri: `file://${image}`}} />
		</View>
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