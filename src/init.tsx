import React from 'react';
import { Camera } from 'react-native-vision-camera';

import { RootNavigator } from './navigators';
import { createDefaultDir } from './lib/fs';
import { getImagesList } from './lib/fs';

export const ImageListContext = React.createContext<{
	imageList: string[],
	setImageList: (imageList: string[]) => void,
	replacedPath: string | null,
	setReplacedPath: (path: string | null) => void
}>({
	imageList: [],
	setImageList: () => {},
	replacedPath: null,
	setReplacedPath: () => {}
});

export const Init = () => {
	const [imageList, setImageList] = React.useState<string[]>([]);
	const [replacedPath, setReplacedPath] = React.useState<string | null>(null);

	React.useEffect(() => {
		createDefaultDir();
	}, []);

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

	return (
		<ImageListContext.Provider value={{ imageList, setImageList, replacedPath, setReplacedPath }}>
			<RootNavigator />
		</ImageListContext.Provider>
	);
}