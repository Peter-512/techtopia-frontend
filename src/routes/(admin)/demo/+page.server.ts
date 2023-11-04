import type { Actions } from './$types';

const gateUUIDs = [
	'a1f84b64-60c2-4f8e-81b3-51fb25b86e9d',
	'e26fe6c7-3d8b-4e0b-99e5-6e459d21801e',
	'823537eb-c999-4a59-b9d5-3562ed0e5c4b',
	'a63a80e3-8a1e-47f8-9a5f-b42e61421c83',
	'1e2c2aa5-ece1-472f-baad-6830c2356a7f',
	'51b8d85a-1906-49a3-aa57-914f1ed6fffe',
	'c518dbfb-62dd-44f2-88b7-e9c3e1ffca72',
	'c89c7c9b-89da-4c1c-b2b0-8f17f47034bc',
	'190f292a-7e25-4e71-a4b9-8c1a7d0ec5f1',
	'9c8f69d3-e0e6-4df1-9f90-dcb45f3ce927'
];

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

const toLeave: string[] = [];
export const actions: Actions = {
	'people-entering': async ({ fetch }) => {
		const date = new Date().toISOString().split('T')[0];
		const uuids: string[] = [];

		for (let i = 0; i < 200; i++) {
			const uuid = crypto.randomUUID();
			uuids.push(uuid);
			await fetch(`http://localhost:8090/api/ticket/${uuid}/valid-on/${date}`, {
				method: 'POST'
			});
		}

		while (uuids.length > 0) {
			const uuid = uuids.pop();
			if (Math.random() < 0.75) {
				toLeave.push(uuid!);
			}
			const gateUUID = gateUUIDs[Math.floor(Math.random() * gateUUIDs.length)];
			await fetch(`http://localhost:8090/api/visitor/enter/${uuid}/gate/${gateUUID}`, {
				method: 'POST'
			});
		}
	},

	'people-leaving': async ({ fetch }) => {
		console.log(toLeave);
		while (toLeave.length > 0) {
			const uuid = toLeave.pop();
			const gateUUID = gateUUIDs[Math.floor(Math.random() * gateUUIDs.length)];
			await fetch(`http://localhost:8090/api/visitor/leave/${uuid}/gate/${gateUUID}`, {
				method: 'POST'
			});
		}
	},

	'people-queueing': async ({ fetch, locals }) => {
		for (let i = 0; i < 1000; i++) {
			const uuid = attractionUUIDs[Math.floor(Math.random() * attractionUUIDs.length)];
			await fetch(`http://localhost:8090/api/attractions/${uuid}/enqueue`, {
				method: 'POST',
				headers: {
					Authorization: `Bearer ${locals.user.token}`
				}
			});
		}
	}
};
