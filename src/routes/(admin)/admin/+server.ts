import type { RequestHandler } from './$types';

export const GET: RequestHandler = async ({ fetch, locals }) => {
	const req = await fetch('http://localhost:8090/api/admin/attractions', {
		headers: {
			Authorization: `Bearer ${locals.user.token}`
		}
	});

	const res = await req.json();

	return new Response(JSON.stringify(res));
};
