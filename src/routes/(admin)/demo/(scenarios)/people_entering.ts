import { securityStore } from '$lib/securityStore';
import { get } from 'svelte/store';

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

export const people_entering = async () => {
	const date = new Date().toISOString().split('T')[0];
	const token = get(securityStore).token;
	const uuids: string[] = [];

	for (let i = 0; i < 200; i++) {
		const uuid = crypto.randomUUID();
		uuids.push(uuid);
		await fetch(`http://localhost:8090/api/ticket/${uuid}/valid-on/${date}`, {
			method: 'POST',
			headers: {
				Authorization: `Bearer ${token}`
			}
		});
	}

	while (uuids.length > 0) {
		const uuid = uuids.pop();
		const gateUUID = gateUUIDs[Math.floor(Math.random() * gateUUIDs.length)];
		await fetch(`http://localhost:8090/api/visitor/enter/${uuid}/gate/${gateUUID}`, {
			method: 'POST',
			headers: {
				Authorization: `Bearer ${token}`
			}
		});
	}
};
