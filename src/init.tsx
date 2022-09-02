import React from 'react';

import { RootNavigator } from './navigators';
import { createDefaultDir } from './lib/fs';

export const Init = () => {
	React.useEffect(() => {
		createDefaultDir();
	}, []);

	return (
		<>
			<RootNavigator />
		</>
	);
}