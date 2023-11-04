import type { Actions } from './$types';

export const actions: Actions = {
	default: async ({ fetch, request }) => {
		const form = await request.formData();
		const dateEntry = form.get('date');

		if (!dateEntry) {
			return {
				status: 400,
				message: 'Missing gate UUID'
			};
		}

		const date = new Date(Date.parse(dateEntry.toString()));

		const start = new Date();
		start.setUTCFullYear(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate());
		start.setHours(0, 0, 0, 0);
		const end = new Date();
		end.setUTCFullYear(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate() + 1);
		end.setHours(0, 0, 0, 0);

		console.log(start, end);

		const res = await fetch(
			`http://localhost:8090/api/analytics/average-visit-duration/start/${start.toISOString()}/end/${end.toISOString()}`,
			{
				headers: {
					Accept: 'application/json'
				}
			}
		);

		const data: number = await res.json();
		console.log(data);

		return {
			status: 200,
			duration: data
		};
	}
};
