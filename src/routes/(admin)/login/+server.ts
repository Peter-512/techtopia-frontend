import type { RequestHandler } from './$types';

export const POST: RequestHandler = async ({ request, cookies }) => {
	const { token, isAuthenticated, name } = await request.json();

	cookies.set('token', token);
	cookies.set('isAuthenticated', isAuthenticated);
	cookies.set('name', name);

	return new Response(JSON.stringify({ token, isAuthenticated, name }));
};
