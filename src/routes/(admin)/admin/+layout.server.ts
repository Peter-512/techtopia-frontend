import type { AdminAttraction, Attraction, FullAttraction } from '$lib/types';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ fetch, parent, locals }) => {
	const { attractions } = await parent();

	const token = locals.user.token;

	const res = await fetch('http://localhost:8090/api/admin/attractions', {
		headers: {
			Authorization: `Bearer ${token}`
		}
	});

	if (res.status === 401) {
		console.log('Unauthorized');
	}

	const adminAttractions: AdminAttraction[] = await res.json();

	const fullAttractions = adminAttractions.reduce<FullAttraction[]>((acc, adminAttraction) => {
		const attraction: Attraction = attractions.find(
			(attraction: Attraction) => adminAttraction.attractionUUID.uuid === attraction.attractionUUID
		);
		if (attraction) {
			// eslint-disable-next-line @typescript-eslint/no-unused-vars
			const { attractionUUID, ...rest } = adminAttraction;
			acc = [{ ...attraction, ...rest }, ...acc];
		}
		return acc;
	}, []);

	return { fullAttractions };
};
