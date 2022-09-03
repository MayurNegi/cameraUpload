import React from 'react';
import { TouchableOpacity, StyleSheet, View } from 'react-native';
import { Camera, TakePhotoOptions, TakeSnapshotOptions } from 'react-native-vision-camera';
import { ImageListContext } from '../init';
import { downloadImage } from '../lib/fs';

interface ICaptureButton {
	cameraRef: React.RefObject<Camera>;
	enabled: boolean;
}

const photoOptions: TakePhotoOptions & TakeSnapshotOptions = {
	enableAutoStabilization: true,
}

export const CaptureButton = ({cameraRef, enabled}: ICaptureButton) => {
	const {imageList, setImageList, replacedPath, setReplacedPath} = React.useContext(ImageListContext);

	const onPhotoCapture = async () => {
		if(cameraRef.current !== null) {
			try {
				let result;
				const photo = await cameraRef.current.takePhoto(photoOptions);
				if(replacedPath) {
					// if replacedPath exists, replace the current photo location with new photo
					result = await downloadImage(photo.path, replacedPath);
					// to update imageList to show change in image component
					const newList = imageList.map((elem) => {
						if(elem === replacedPath) {
							elem = elem + '?' + new Date();
						}
						return elem;
					})
					setImageList(newList);
					setReplacedPath(null);
				} else {
					result = await downloadImage(photo.path);
					let newImageList = [result, ...imageList];
					setImageList(newImageList);
				}
			} catch (e) {}
		}
	}

	return (
		<TouchableOpacity
			onPress={onPhotoCapture}
			disabled={!enabled}
			style={styles.buttonContainer}
		>
			<View style={styles.button} />
		</TouchableOpacity>
	)
}

const styles = StyleSheet.create({
	buttonContainer: {
		flex: 1,
		position: 'absolute',
		alignSelf: 'center',
		width: 70,
		height: 70,
		bottom: 20,
		borderRadius: 32,
	},
	button: {
		width: 70,
		height: 70,
		borderRadius: 35,
		borderWidth: 7,
		borderColor: 'white',
	}
})