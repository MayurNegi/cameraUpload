import RNFS from 'react-native-fs';

const DEFAULT_FOLDER = '/cameraUpload';

export const getDefaultFolderPath = () => {
	const path = RNFS.ExternalDirectoryPath;
	return path + DEFAULT_FOLDER;
};

// check dir, if not present, create one
export const createDefaultDir = async() => {
	try {
		await RNFS.mkdir(getDefaultFolderPath());
	} catch (e) {
		console.log('error', e);
	}
}

export const downloadImage = async (url: string) => {
	const date = new Date();
	let filename = date.getTime();

	await RNFS.mkdir(getDefaultFolderPath());

	const destinationPath = getDefaultFolderPath() + '/' + filename + '.jpg';

	const result = await RNFS.moveFile(url, destinationPath)
		.then(() => RNFS.scanFile(destinationPath))

	return result;
}

export const getImagesList = async () => {
	const directoryItems = await RNFS.readDir(getDefaultFolderPath());
	return directoryItems;
}