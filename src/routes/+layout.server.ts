import type { Attraction, Gate, RefreshmentStand } from '$lib/types';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ fetch }) => {
	const [attractionRes, gatesRes, refreshmentStandsRes] = await Promise.all([
		fetch('http://localhost:8090/api/attractions'),
		fetch('http://localhost:8090/api/gates'),
		fetch('http://localhost:8090/api/refreshment-stands')
	]);

	const [attractions, gates, refreshmentStands]: [
		attractions: Attraction[],
		gates: Gate[],
		refreshmentStands: RefreshmentStand[]
	] = await Promise.all([attractionRes.json(), gatesRes.json(), refreshmentStandsRes.json()]);

	return {
		attractions,
		gates,
		refreshmentStands
	};
};
