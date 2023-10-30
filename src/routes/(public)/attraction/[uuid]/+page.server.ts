import type { Attraction } from '$lib/types';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params, fetch }) => {
	const { uuid } = params;
	const [resAttraction, resSimilarAttractions] = await Promise.all([
		fetch(`http://localhost:8090/api/attractions/${uuid}`),
		fetch(`http://localhost:8090/api/attractions/${uuid}/similar`)
	]);
	const [attraction, similarAttractions]: [
		attraction: Attraction,
		similarAttractions: Attraction[]
	] = await Promise.all([resAttraction.json(), resSimilarAttractions.json()]);

	return { attraction, similarAttractions };
};
