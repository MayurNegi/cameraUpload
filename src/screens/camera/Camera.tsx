import React from 'react';
import { View, StyleSheet, ActivityIndicator } from 'react-native';
import { Camera, useCameraDevices } from 'react-native-vision-camera';
import { useIsFocused } from '@react-navigation/native';

import { CaptureButton } from '../../components/CaptureButton';

export const CameraScreen = () => {
	const cameraRef = React.useRef<Camera>(null);
	const [isCameraInitialized, setIsCameraInitialized] = React.useState(false);

	const devices = useCameraDevices('wide-angle-camera');
	const isFocused = useIsFocused();

	const device = devices.back;

	const onInitialized = () => {
		setIsCameraInitialized(true);
	}

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
					ref={cameraRef}
					style={StyleSheet.absoluteFill}
					device={device}
					isActive={isFocused}
					photo={true}
					onInitialized={onInitialized}
				/>
			)}
			<CaptureButton cameraRef={cameraRef} enabled={isCameraInitialized} />
		</View>
  	)
}