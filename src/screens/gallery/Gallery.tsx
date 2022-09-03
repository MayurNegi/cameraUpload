import React from 'react';
import { Image, StyleSheet, Text, View, FlatList, TouchableOpacity } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';

import { ImageListContext } from '../../init';
import { RootList } from '../../navigators/RootNavigator';
import { deleteImage } from '../../lib/fs';

export type GalleryProps = NativeStackScreenProps<RootList, 'Gallery'>;

interface IRenderProps {
	item: string;
	selectedImage: string;
	setSelectedImage: (item: string) => void
}

const RenderItem = ({item, selectedImage, setSelectedImage}: IRenderProps) => {
	const handleImageClick = () => {
		setSelectedImage(item);
	}

	return (
		<TouchableOpacity style={styles.imageListContainer} onPress={handleImageClick}>
			<Image key={item} style={[styles.imageScroll, selectedImage === item && styles.selected]} source={{uri: `file://${item}`}} />
		</TouchableOpacity>
	)
}

export const GalleryScreen = ({navigation}: GalleryProps) => {
	const [selectedImage, setSelectedImage] = React.useState('');

	const { imageList, setImageList, replacedPath, setReplacedPath } = React.useContext(ImageListContext);

	React.useEffect(() => {
		if(imageList.length > 0) {
			setSelectedImage(imageList[0]);
		}
	}, [imageList]);

	const navigateToCamera = () => {
		navigation.navigate('Camera');
	}

	const replacePhoto = () => {
		setReplacedPath(selectedImage);
		navigateToCamera();
	}

	const deletePhoto = () => {
		deleteImage(selectedImage);
		const newList = imageList.filter((element) => element !== selectedImage);
		setImageList(newList);
		setSelectedImage(imageList[0]);
	}

	const uploadAll = () => {

	}

	return (
	<View style={{flex: 1, paddingHorizontal: 16}}>
		<View>
			<Image key={selectedImage} style={styles.image} source={{uri: `file://${selectedImage}`}} />
		</View>

		<View style={{height: 90}}>
			<FlatList
				data={imageList}
				horizontal={true}
				keyExtractor={item => item}
				renderItem={({item}) => (
					<RenderItem item={item} selectedImage={selectedImage} setSelectedImage={setSelectedImage} />
				)}
			/>
		</View>

		<View style={styles.actionsContainer}>
			<TouchableOpacity onPress={navigateToCamera} style={styles.actions}>
				<Text style={styles.actionsText}>C</Text>
			</TouchableOpacity>
			<TouchableOpacity onPress={replacePhoto} style={styles.actions}>
				<Text style={styles.actionsText}>R</Text>
			</TouchableOpacity>
			<TouchableOpacity onPress={deletePhoto} style={styles.actions}>
				<Text style={styles.actionsText}>D</Text>
			</TouchableOpacity>
			<TouchableOpacity onPress={uploadAll} style={styles.actions}>
				<Text style={styles.actionsText}>U</Text>
			</TouchableOpacity>
		</View>
	</View>
	);
}

const styles = StyleSheet.create({
	image: {
		width: '100%',
		minHeight: '70%',
		borderRadius: 10,
		marginVertical: 10,
	},
	actionsContainer: {
		height: 70,
		flex: 1,
		flexDirection: 'row',
		flexGrow: 1,
		justifyContent: 'space-between',
		marginTop: 20
	},
	actions: {
		backgroundColor: 'blue',
		height: 60,
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		marginHorizontal: 5,
		borderRadius: 10
	},
	actionsText: {
		fontSize: 24,
		fontWeight: '700'
	},
	imageListContainer: {
		width: 70,
		alignSelf: 'center',
		height: 70,
		marginHorizontal: 5
	},
	imageScroll: {
		width: 70,
		height: 70,
		borderRadius: 10
	},
	selected: {
		borderWidth: 5,
		borderColor: 'blue'
	}
})