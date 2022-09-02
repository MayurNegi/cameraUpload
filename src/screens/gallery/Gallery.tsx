import React from 'react';
import { Text, View } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';

import { RootList } from '../../navigators/RootNavigator';

export type GalleryProps = NativeStackScreenProps<RootList, 'Gallery'>;

export const GalleryScreen = ({navigation}: GalleryProps) => {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>GalleryScreen!</Text>
    </View>
  );
}