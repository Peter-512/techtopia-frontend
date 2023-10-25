import { securityStore } from '$lib/securityStore';
import { get } from 'svelte/store';

// sleep function
async function sleep(ms: number) {
	await new Promise((resolve) => setTimeout(resolve, ms));
}
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
		const gateUUID = crypto.randomUUID();
		await fetch(`http://localhost:8090/api/visitor/enter/${uuid}/gate/${gateUUID}`, {
			method: 'POST',
			headers: {
				Authorization: `Bearer ${token}`
			}
		});
	}
};
