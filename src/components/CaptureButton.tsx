import React from 'react';
import { TouchableOpacity, StyleSheet, View } from 'react-native';
import { Camera, TakePhotoOptions, TakeSnapshotOptions } from 'react-native-vision-camera';
import { downloadImage } from '../lib/fs';

interface ICaptureButton {
	cameraRef: React.RefObject<Camera>;
	enabled: boolean;
	imageList: string[];
	setImageList: any;
}

const photoOptions: TakePhotoOptions & TakeSnapshotOptions = {
	enableAutoStabilization: true,
}

export const CaptureButton = ({cameraRef, enabled, imageList, setImageList}: ICaptureButton) => {
	const onPhotoCapture = async () => {
		if(cameraRef.current !== null) {
			try {
				const photo = await cameraRef.current.takePhoto(photoOptions);
				const result = await downloadImage(photo.path);
				setImageList((images: string[]) => [...images, result]);
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