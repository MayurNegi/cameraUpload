import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator, NativeStackScreenProps } from '@react-navigation/native-stack';

import {CameraScreen} from '../screens/camera';
import {GalleryScreen} from '../screens/gallery';

const Stack = createNativeStackNavigator<RootList>();

export type RootList = {
	Camera: undefined;
	Gallery: undefined;
}

export const RootNavigator = () => {
  return (
    <NavigationContainer>
		<Stack.Navigator screenOptions={{headerShown: false}}>
			<Stack.Screen name="Gallery" component={GalleryScreen} />
			<Stack.Screen name="Camera" component={CameraScreen} />
		</Stack.Navigator>
    </NavigationContainer>
  );
}