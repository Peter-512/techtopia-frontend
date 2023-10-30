import type { RequestHandler } from './$types';

export const POST: RequestHandler = async ({ cookies }) => {
	cookies.set('token', '');
	cookies.set('isAuthenticated', '');
	cookies.set('name', '');

	return new Response();
};
