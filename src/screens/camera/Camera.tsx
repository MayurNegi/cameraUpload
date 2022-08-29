import React from 'react';
import { View, StyleSheet, ActivityIndicator } from 'react-native';
import { Camera, useCameraDevices } from 'react-native-vision-camera';
import { useIsFocused } from '@react-navigation/native';

import { CaptureButton } from '../../components/CaptureButton';

export const CameraScreen = () => {
	const devices = useCameraDevices('wide-angle-camera');
	const isFocused = useIsFocused();

	const device = devices.back;

	React.useEffect(() => {
		async function checkPermission() {
			const cameraPermission = await Camera.getCameraPermissionStatus();
			if(cameraPermission !== 'authorized') {
				await Camera.requestCameraPermission();
			}
		}

		checkPermission();
	}, []);

	return (
		<View style={{flex: 1}}>
			{device == null ? (
				<ActivityIndicator />
			) : (
				<Camera
					style={StyleSheet.absoluteFill}
					device={device}
					isActive={isFocused}
					photo={true}
				/>
			)}
			<CaptureButton />
		</View>
  	)
}