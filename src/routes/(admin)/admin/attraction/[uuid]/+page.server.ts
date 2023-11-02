import { attractionSchema } from '$lib/schemas.js';
import type { Actions } from '@sveltejs/kit';
import { error, fail } from '@sveltejs/kit';
import { superValidate } from 'sveltekit-superforms/server';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ parent, params }) => {
	const { uuid } = params;
	const { fullAttractions } = await parent();

	const attraction = fullAttractions.find((attraction) => attraction.attractionUUID === uuid);

	if (!attraction) {
		throw error(404, {
			message: 'attraction not found'
		});
	}
	return {
		attraction,
		form: superValidate(attraction, attractionSchema)
	};
};

export const actions: Actions = {
	default: async ({ request, fetch, params }) => {
		const form = await superValidate(request, attractionSchema);
		if (!form.valid) {
			return fail(400, {
				form
			});
		}

		const { uuid } = params;
		await fetch(`http://localhost:8090/api/attractions/${uuid}`, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(form.data)
		});

		return {
			form
		};
	}
};
