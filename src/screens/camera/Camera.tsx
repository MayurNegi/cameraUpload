import React from 'react';
import { View, StyleSheet, ActivityIndicator } from 'react-native';
import { Camera, useCameraDevices } from 'react-native-vision-camera';
import { useIsFocused } from '@react-navigation/native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';

import { CaptureButton } from '../../components/CaptureButton';
import { LastImage } from '../../components/LastImage';
import { RootList } from '../../navigators/RootNavigator';

export type CameraProps = NativeStackScreenProps<RootList, 'Camera'>;

export const CameraScreen: React.FC<CameraProps> = ({navigation}: CameraProps) => {
	const cameraRef = React.useRef<Camera>(null);
	const [isCameraInitialized, setIsCameraInitialized] = React.useState(false);

	const devices = useCameraDevices();
	const isFocused = useIsFocused();

	const device = devices.back;

	const onInitialized = () => {
		setIsCameraInitialized(true);
	}

	const navigateToGallery = () => navigation.navigate('Gallery');

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
			/>

			<LastImage navigateToGallery={navigateToGallery} />
		</View>
  	)
}