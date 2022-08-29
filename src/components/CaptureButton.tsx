import React from 'react';
import { TouchableOpacity, StyleSheet, View } from 'react-native';

export const CaptureButton = () => {
	return (
		<TouchableOpacity style={{flex: 1}}>
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