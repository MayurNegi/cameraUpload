import React from 'react';
import { View, StyleSheet, ActivityIndicator } from 'react-native';
import { Camera, useCameraDevices } from 'react-native-vision-camera';
import { useIsFocused } from '@react-navigation/native';

import { getImagesList } from '../../lib/fs';
import { CaptureButton } from '../../components/CaptureButton';
import { LastImage } from '../../components/LastImage';

export const CameraScreen = () => {
	const cameraRef = React.useRef<Camera>(null);
	const [isCameraInitialized, setIsCameraInitialized] = React.useState(false);
	const [imageList, setImageList] = React.useState<string[]>([]);

	React.useEffect(() => {
		async function checkPermission() {
			const cameraPermission = await Camera.getCameraPermissionStatus();
			if(cameraPermission !== 'authorized') {
				await Camera.requestCameraPermission();
			}
		}

		checkPermission();
	}, []);

	React.useEffect(() => {
		async function getImages() {
			try {
				const directoryItems = await getImagesList();
				let imagePaths = directoryItems.map((element) => {
					return element.path;
				});
				setImageList(imagePaths);
			} catch(e) {}
		}

		getImages();
	}, []);

	const devices = useCameraDevices();
	const isFocused = useIsFocused();

	const device = devices.back;

	const onInitialized = () => {
		setIsCameraInitialized(true);
	}

	return (
		<View style={{flex: 1, position: 'relative'}}>
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
			<CaptureButton
				cameraRef={cameraRef}
				enabled={isCameraInitialized}
				imageList={imageList}
				setImageList={setImageList}
			/>

			<LastImage imageList={imageList} />
		</View>
  	)
}