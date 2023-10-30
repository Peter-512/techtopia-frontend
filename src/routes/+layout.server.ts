import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ fetch }) => {
	const [attractionRes, gatesRes] = await Promise.all([
		fetch('http://localhost:8090/api/attractions'),
		fetch('http://localhost:8090/api/gates')
	]);

	const [attractions, gates] = await Promise.all([attractionRes.json(), gatesRes.json()]);

	return { attractions, gates };
};
