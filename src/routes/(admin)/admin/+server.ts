import type { RequestHandler } from './$types';

export const GET: RequestHandler = async ({ fetch }) => {
	const req = await fetch('http://localhost:8090/api/admin/attractions');

	const res = await req.json();

	return new Response(JSON.stringify(res));
};
