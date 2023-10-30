import type { Handle } from '@sveltejs/kit';

export const handle: Handle = async ({ event, resolve }) => {
	const token = event.cookies.get('token');
	const isAuthenticated = !!event.cookies.get('isAuthenticated');
	const name = event.cookies.get('name');

	event.locals.user = {
		token: token ?? '',
		isAuthenticated,
		name: name ?? ''
	};
	return resolve(event);
};
