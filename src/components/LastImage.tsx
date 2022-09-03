import React from 'react';
import { Image, StyleSheet, TouchableOpacity } from 'react-native';
import { ImageListContext } from '../init';

interface ILastImage {
	navigateToGallery: () => void;
}

export const LastImage = ({navigateToGallery}: ILastImage) => {
	const {imageList} = React.useContext(ImageListContext);

	return (
		<>
			{imageList.length > 0 && (
				<TouchableOpacity onPress={navigateToGallery} style={styles.container}>
					<Image style={styles.image} source={{uri: `file://${imageList[0]}`}} />
				</TouchableOpacity>
			)}
		</>
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