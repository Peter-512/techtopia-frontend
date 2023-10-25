import type { Attraction } from '$lib/types';
import type { PageServerLoad } from '../../../../.svelte-kit/types/src/routes';

export const load: PageServerLoad = async ({ fetch }) => {
	const res = await fetch('http://localhost:8090/api/attractions');
	const attractions: Attraction[] = await res.json();

	return { attractions };
};
