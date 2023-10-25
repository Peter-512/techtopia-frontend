import type { Attraction } from '$lib/types';
import type { PageServerLoad } from '../../../../../.svelte-kit/types/src/routes';

export const load: PageServerLoad = async ({ params, fetch }) => {
	const { uuid } = params;
	const res = await fetch(`http://localhost:8090/api/attractions/${uuid}`);
	const attraction: Attraction = await res.json();

	return { attraction };
};
