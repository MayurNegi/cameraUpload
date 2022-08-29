import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import {CameraScreen} from '../screens/camera';
import {GalleryScreen} from '../screens/gallery';

const Tab = createBottomTabNavigator();

export const RootNavigator = () => {
  return (
    <NavigationContainer>
    	<Tab.Navigator
			screenOptions={() => ({
				headerShown: false,
				tabBarActiveTintColor: 'tomato',
				tabBarInactiveTintColor: 'gray',
			  })}>
			<Tab.Screen name="Camera" component={CameraScreen} />
			<Tab.Screen name="Gallery" component={GalleryScreen} />
		</Tab.Navigator>
    </NavigationContainer>
  );
}