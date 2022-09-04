import React from 'react';
import { Image, StyleSheet, Text, View, FlatList, TouchableOpacity, Alert } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';

import { ImageListContext } from '../../init';
import { RootList } from '../../navigators/RootNavigator';
import { deleteImage } from '../../lib/fs';
import axios from 'axios';

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
	const [uploading, setUploading] = React.useState(false);
	const [uploadTime, setUploadTime] = React.useState(0);

	const { imageList, setImageList, setReplacedPath } = React.useContext(ImageListContext);

	React.useEffect(() => {
		if(imageList.length > 0) {
			setSelectedImage(imageList[0]);
		}
	}, [imageList]);

	React.useEffect(() => {
		let timer: any;
		if(uploading) {
			timer = setInterval(() => {
				setUploadTime((prevValue) => prevValue + 1);
			}, 1000)
		} else {
			clearInterval(timer);
		}

		return () => clearInterval(timer);
	}, [uploading])

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
		if(newList.length > 0) {
			setSelectedImage(imageList[0]);
		}
	}

	const uploadAll = async () => {
		setUploading(true);

		const imageUploads = imageList.map((imagePath, index) => {
			return new Promise((resolve, reject) => {
				const data = new FormData();
				const filename = imagePath.substring(imagePath.lastIndexOf('/') + 1);
				data.append('file', {
					name: filename,
					type: 'image/jpeg',
					uri: `file://${imagePath}`,
				});
				return resolve(axios.post(`https://eob9z66mnozqf9r.m.pipedream.net/${index}`, data, {
					headers: {
					  'Content-Type': 'multipart/form-data',
					},
				}));
			})
		})

		Promise.all(imageUploads).then(() => {
			Alert.alert('All images uploaded');
			imageList.forEach((imagePath) => deleteImage(imagePath));
			setUploadTime(0);
			setUploading(false);
			setImageList([]);
		}).catch((e) => {
			setUploadTime(0);
			setUploading(false);
			Alert.alert('Some images didnt upload');
		})
	}

	const enabled = imageList.length > 0 && !uploading;

	return (
	<View style={{flex: 1, paddingHorizontal: 16}}>
		<View>
			{(imageList.length > 0 && !uploading) ? (
				<Image key={selectedImage} style={styles.image} source={{uri: `file://${selectedImage}`}} />
			) : (
				<View style={styles.image} />
			)}
		</View>

		<View style={{height: 90}}>
			{!uploading && (
				<FlatList
					data={imageList}
					horizontal={true}
					keyExtractor={item => item}
					renderItem={({item}) => (
						<RenderItem item={item} selectedImage={selectedImage} setSelectedImage={setSelectedImage} />
					)}
				/>
			)}
		</View>

		<View style={styles.actionsContainer}>
			<TouchableOpacity onPress={navigateToCamera} disabled={uploading} style={[styles.actions, uploading && styles.disabled]}>
				<Text style={styles.actionsText}>C</Text>
			</TouchableOpacity>
			<TouchableOpacity onPress={replacePhoto} disabled={!enabled} style={[styles.actions, !enabled && styles.disabled]}>
				<Text style={styles.actionsText}>R</Text>
			</TouchableOpacity>
			<TouchableOpacity onPress={deletePhoto} disabled={!enabled} style={[styles.actions, !enabled && styles.disabled]}>
				<Text style={styles.actionsText}>D</Text>
			</TouchableOpacity>
			<TouchableOpacity onPress={uploadAll} disabled={!enabled} style={[styles.actions, !enabled && styles.disabled]}>
				<Text style={styles.actionsText}>U</Text>
			</TouchableOpacity>
		</View>

		{uploading && (
			<View style={styles.timer}>
				<Text style={{color: 'grey', fontSize: 24, fontWeight: '700'}}>Uploading for {uploadTime} seconds</Text>
			</View>
		)}
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
	},
	disabled: {
		backgroundColor: 'grey'
	},
	timer: {
		position: 'absolute',
		flex: 1,
		top: '45%',
		alignSelf: 'center',
	}
})