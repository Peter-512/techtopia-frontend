import { securityStore } from '$lib/securityStore';
import { get } from 'svelte/store';

const attractionUUIDs = [
	'abfa469e-9642-4ea6-ba99-cc2aafeb977c',
	'018b3dcc-21e4-71b1-94da-8bfca7b85b51',
	'018b3dcc-3933-70c1-8427-fcff8c74d27b',
	'018b3dcc-47c3-723a-81a1-05c89dd9ee59',
	'018b3dcc-5472-70ab-a1f2-b7253ec183d8',
	'018b3dcc-63df-7b9a-9612-d631708329b0',
	'018b3dcc-7178-7be1-b871-917ef24f4285',
	'018b3dcc-7ebd-7a67-b44f-8bbe426372a6',
	'018b3dcc-8e9a-7eec-9228-f5598513f3d8',
	'018b3dcc-9b3e-7fdc-9aec-94f45de15646'
];

export const people_queueing = async () => {
	const token = get(securityStore).token;
	for (let i = 0; i < 1000; i++) {
		const uuid = attractionUUIDs[Math.floor(Math.random() * attractionUUIDs.length)];
		await fetch(`http://localhost:8090/api/attractions/${uuid}/enqueue`, {
			method: 'POST',
			headers: {
				Authorization: `Bearer ${token}`
			}
		});
	}
};
