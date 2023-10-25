<script lang="ts">
	import { PUBLIC_CLIENT_ID, PUBLIC_KC_URL, PUBLIC_REALM } from '$env/static/public';
	import Keycloak from 'keycloak-js';
	import { securityStore } from '$lib/securityStore.js';
	import { onMount } from 'svelte';
	import { Button } from '$lib/components/ui/button';
	import {redirect} from '@sveltejs/kit';

	onMount(() => {
		const keycloakConfig = {
			url: PUBLIC_KC_URL,
			realm: PUBLIC_REALM,
			clientId: PUBLIC_CLIENT_ID
		};
		const keycloak: Keycloak = new Keycloak(keycloakConfig);

		keycloak.init({
			onLoad: 'login-required'
		})

		keycloak.onAuthSuccess = () => {
			securityStore.setToken(keycloak.token ?? '');
			securityStore.setUser(keycloak.idTokenParsed?.name);
			securityStore.setIsAuthenticated(keycloak.authenticated ?? false)
			securityStore.setLogout(keycloak.logout)
		};

		keycloak.onAuthLogout = () => {
			securityStore.logout();
			throw redirect(307, '/login');
		};

		keycloak.onAuthError = () => {
			securityStore.logout();
		};

		keycloak.onTokenExpired = () => {
			keycloak.updateToken(-1).then(function () {
				securityStore.setToken(keycloak.token ?? '');
				securityStore.setUser(keycloak.idTokenParsed?.name);
				securityStore.setIsAuthenticated(keycloak.authenticated ?? false)
				securityStore.setLogout(keycloak.logout)
			});
		};
	})
</script>

<div class='flex justify-between'>
	<p class='m-4'>Welcome {$securityStore.user}</p>
	<Button on:click={securityStore.logout} class='m-4' variant='destructive'>Logout</Button>
</div>

<main class="container">
	<slot/>
</main>
