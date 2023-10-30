import type { AdminAttraction, Attraction, FullAttraction } from '$lib/types';
import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ fetch, parent, locals }) => {
	const { attractions } = await parent();

	const token = locals.user.token;

	const res = await fetch('http://localhost:8090/api/admin/attractions', {
		headers: {
			Authorization: `Bearer ${token}`
		}
	});

	if (res.status === 401) {
		throw error(401, 'Unauthorized');
	}

	const adminAttractions: AdminAttraction[] = await res.json();
	const fullAttractions: FullAttraction[] = adminAttractions.map((adminAttraction) => {
		const attraction = attractions.find(
			(attraction: Attraction) => adminAttraction.attractionUUID.uuid === attraction.attractionUUID
		);
		if (attraction) {
			// eslint-disable-next-line @typescript-eslint/no-unused-vars
			const { attractionUUID, currentWaitingTime, ...rest } = adminAttraction;
			return { ...attraction, ...rest };
		}
	});

	return { fullAttractions };
};
