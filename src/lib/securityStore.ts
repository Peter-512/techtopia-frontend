import { get, writable } from 'svelte/store';

function createSecurityStore() {
	const { update, set, subscribe } = writable({
		token: '',
		user: '',
		isAuthenticated: false,
		logoutFn: () => {}
	});

	return {
		subscribe,
		setToken: (token: string) => update((s) => ({ ...s, token })),
		setUser: (user: string) => update((s) => ({ ...s, user })),
		setIsAuthenticated: (isAuthenticated: boolean) => update((s) => ({ ...s, isAuthenticated })),
		setLogout: (logoutFn: () => void) => update((s) => ({ ...s, logoutFn })),
		logout: () => {
			const { logoutFn } = get(securityStore);
			logoutFn();
			set({
				token: '',
				user: '',
				isAuthenticated: false,
				logoutFn: () => {}
			});
		}
	};
}

export const securityStore = createSecurityStore();
