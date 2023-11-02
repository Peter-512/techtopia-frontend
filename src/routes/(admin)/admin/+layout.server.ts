import type { AdminAttraction, Attraction, FullAttraction } from '$lib/types';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ fetch, parent }) => {
	const { attractions } = await parent();

	const res = await fetch('http://localhost:8090/api/admin/attractions');

	if (res.status === 401) {
		return { fullAttractions: [] };
	}

	const adminAttractions: AdminAttraction[] = await res.json();

	const fullAttractions = adminAttractions.reduce<FullAttraction[]>((acc, adminAttraction) => {
		const attraction = attractions.find(
			(attraction: Attraction) => adminAttraction.attractionUUID.uuid === attraction.attractionUUID
		);
		if (!attraction) {
			return acc;
		}
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		const { attractionUUID, ...rest } = adminAttraction;
		return [{ ...attraction, ...rest }, ...acc];
	}, []);

	return { fullAttractions };
};
