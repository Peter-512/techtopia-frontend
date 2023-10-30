import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ locals }) => {
	return {
		token: locals.user.token,
		name: locals.user.name,
		isAuthenticated: locals.user.isAuthenticated
	};
};
