<script lang="ts">
	import { PUBLIC_CLIENT_ID, PUBLIC_KC_URL, PUBLIC_REALM } from '$env/static/public';
	import Keycloak from 'keycloak-js';
	import { securityStore } from '$lib/securityStore.js';
	import { onMount } from 'svelte';
	import { Button } from '$lib/components/ui/button';
	import Toasts from '$lib/components/Toasts.svelte';
	import { PlusCircled } from 'radix-icons-svelte';
	import {page} from '$app/stores';

	export let data;

	async function customLogout() {
		await fetch('/logout', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
		})
	}

	async function customLogin({ token, name, isAuthenticated}: { token: string, name: string, isAuthenticated: boolean}) {
		await fetch('/login', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ token, name, isAuthenticated })
		})
	}
	const keycloakConfig = {
		url: PUBLIC_KC_URL,
		realm: PUBLIC_REALM,
		clientId: PUBLIC_CLIENT_ID
	};
	let keycloak: Keycloak;

	onMount(() => {
		keycloak = new Keycloak(keycloakConfig);
		keycloak.init({
			onLoad: 'login-required'
		})

		keycloak.onAuthSuccess = async () => {
			securityStore.setToken(keycloak.token ?? '');
			securityStore.setUser(keycloak.idTokenParsed?.name);
			securityStore.setIsAuthenticated(keycloak.authenticated ?? false)
			securityStore.setLogout(keycloak.logout)
			await customLogin({
				token: keycloak.token ?? '',
				name: keycloak.idTokenParsed?.name ?? '',
				isAuthenticated: keycloak.authenticated ?? false
			})
		};

		keycloak.onAuthLogout = async () => {
			securityStore.logout();
			await customLogout();
		};

		keycloak.onAuthError = async () => {
			securityStore.logout();
			await customLogout();
		};

		keycloak.onTokenExpired = async () => {
			await keycloak.updateToken(-1)
			securityStore.setToken(keycloak.token ?? '');
			securityStore.setUser(keycloak.idTokenParsed?.name);
			securityStore.setIsAuthenticated(keycloak.authenticated ?? false)
			securityStore.setLogout(keycloak.logout)

			await customLogin({
				token: keycloak.token ?? '',
				name: keycloak.idTokenParsed?.name ?? '',
				isAuthenticated: keycloak.authenticated ?? false
			})
		};
	})
</script>


{#if data.isAuthenticated}
<div class='grid m-4 grid-cols-5 place-items-center'>
	<p class='self-center'>Welcome {data.name}</p>
	<Button href='/admin'>Map</Button>
	<Button href='/forecasts'>Forecasts</Button>
	<Button href='/analytics'>Analytics</Button>
	<Button on:click={securityStore.logout} variant='destructive'>Logout</Button>
</div>
{#if $page.route.id !== '/(admin)/refreshment-stands'}
	<a class='fixed bottom-2 left-2 text-green-500 rounded-full hover:shadow-xl transition-shadow z-50 p-1' href='/refreshment-stands'>
		<PlusCircled size={64} />
	</a>
{/if}
<main class="container">
	<slot/>
	<Toasts />
</main>
{:else}
	<main class='m-4 align-middle place-content-center h-screen grid'>
		<p class='text-xl text-muted-foreground'>Waiting for authentication...</p>
	</main>
{/if}
