import { refreshmentSchema } from '$lib/schemas';
import { fail } from '@sveltejs/kit';
import { superValidate } from 'sveltekit-superforms/server';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	return {
		form: superValidate(refreshmentSchema)
	};
};

export const actions: Actions = {
	default: async ({ request, fetch }) => {
		const form = await superValidate(request, refreshmentSchema);
		if (!form.valid) {
			return fail(400, {
				form
			});
		}

		const res = await fetch(`http://localhost:8090/api/refreshment-stands/open`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(form.data)
		});

		console.log(res.status);

		return {
			status: res.status,
			form
		};
	}
};
