import React from 'react';
import { TouchableOpacity, StyleSheet, View } from 'react-native';
import { Camera, TakePhotoOptions, TakeSnapshotOptions } from 'react-native-vision-camera';

interface ICaptureButton {
	cameraRef: React.RefObject<Camera>;
	enabled: boolean
}

const photoOptions: TakePhotoOptions & TakeSnapshotOptions = {
	enableAutoStabilization: true,
}

export const CaptureButton = ({cameraRef, enabled}: ICaptureButton) => {
	const onPhotoCapture = async () => {
		if(cameraRef.current !== null) {
			const photo = await cameraRef.current.takePhoto(photoOptions)
			console.log('photo', photo)
		}
	}

	return (
		<TouchableOpacity
			onPress={onPhotoCapture}
			disabled={!enabled}
			style={{flex: 1}}
		>
			<View style={styles.button} />
		</TouchableOpacity>
	)
}

const styles = StyleSheet.create({
	button: {
		width: 70,
		height: 70,
		borderRadius: 35,
		borderWidth: 7,
		borderColor: 'white',
		position: 'absolute',
		alignSelf: 'center',
		bottom: 20
	}
})