import RNFS from 'react-native-fs';

const DEFAULT_FOLDER = '/cameraUpload';

export const getDefaultFolderPath = () => {
	const path = RNFS.DocumentDirectoryPath;
	return path + DEFAULT_FOLDER;
};