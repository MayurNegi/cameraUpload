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

export const downloadImage = async (url: string, saveToPath?: string) => {
	const date = new Date();
	let filename = date.getTime();

	await RNFS.mkdir(getDefaultFolderPath());

	let destinationPath = '';
	if (saveToPath) {
		// if saveToPath exists delete that image and save new one
		await deleteImage(saveToPath);
		destinationPath = saveToPath;
	} else {
		destinationPath = getDefaultFolderPath() + '/' + filename + '.jpg';
	}

	const result = await RNFS.moveFile(url, destinationPath)
		.then(() => RNFS.scanFile(destinationPath))

	return result;
}

export const deleteImage = async (path: string) => {
	const isExists = await RNFS.exists(path);
	if(isExists) {
		await RNFS.unlink(path);
	}
}

export const getImagesList = async () => {
	const directoryItems = await RNFS.readDir(getDefaultFolderPath());
	const orderedItems = directoryItems.reverse();
	return orderedItems;
}