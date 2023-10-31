<script lang="ts">
	import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "$lib/components/ui/card";
	import TagBadge from '../../overview/TagBadge.svelte';
	import { Map } from 'lucide-svelte';
	import { Button } from '$lib/components/ui/button';
	import { setupViewTransition } from 'sveltekit-view-transition';

	export let data;

	const {transition} = setupViewTransition();
</script>

<svelte:head>
	<title>{data.attraction.name}</title>
</svelte:head>

<img class='mb-8 shadow-2xl shadow-green-100 w-full h-96 object-cover' src={data.attraction.imageUrl} alt={data.attraction.name}>

<h1 class='text-center text-4xl mb-4'>{data.attraction.name}</h1>
<section class='mx-4 mb-10'>
	<img use:transition={`attraction-icon-${data.attraction.attractionUUID}`} class='h-20 m-auto mb-10' src={data.attraction.iconUrl} alt='icon {data.attraction.name}'>
	<p class='max-w-6xl text-center'>{data.attraction.description}</p>
</section>

<section class='m-4'>
	<Card class='max-w-lg m-auto'>
		<CardHeader>
			<CardTitle class='underline underline-offset-2 text-xl'>Attraction Details</CardTitle>
			<CardDescription>Status: <span class:text-red-600={!data.attraction.open}>{data.attraction.open ? 'Open' : 'Closed'}</span></CardDescription>
		</CardHeader>
		<CardContent class='grid gap-4'>
			<div class='flex flex-col sm:flex-row gap-2'>
				<strong>Tags</strong>
				<TagBadge tags={data.attraction.tags}></TagBadge>
			</div>
			<div class='flex flex-col sm:flex-row gap-2'>
				<strong>Waiting time</strong>
				<p>{data.attraction.waitingTime} minute{data.attraction.waitingTime === 1 ? '' : 's'}</p>
			</div>
		</CardContent>
		<CardFooter class='justify-end'>
				<Button variant='secondary' href='/map?focus={data.attraction.attractionUUID}'>
					<Map class='me-2' /> View on map
				</Button>
		</CardFooter>
	</Card>
</section>

<section>
	<h2 class='text-2xl text-center mt-12 mb-6'>Similar Attractions</h2>

	<div class='grid sm:grid-cols-2 md:grid-cols-3 gap-8 m-4'>
		{#each data.similarAttractions as attraction}
			<article
					class='h-64 w-64 place-self-center overflow-hidden relative shadow-2xl rounded-xl transition-all hover:scale-105 m-auto'>
				<a href='/attraction/{attraction.attractionUUID}'>
					<img use:transition={`attraction-icon-${attraction.attractionUUID}`} class='object-cover w-full h-full' src={attraction.iconUrl} alt={attraction.name}>
					<div
						class='absolute bottom-0 backdrop-blur bg-opacity-50 bg-black text-white p-4 w-full'>{attraction.name}</div>
				</a>
			</article>
		{/each}
	</div>

</section>

<style>
	p {
		text-wrap: balance;
	}
</style>