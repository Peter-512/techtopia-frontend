<script lang='ts'>
	import AttractionIcon from './AttractionIcon.svelte';
	import GateIcon from './GateIcon.svelte';
	import { page } from '$app/stores';
	import type { Attraction } from '$lib/types';
	import { onMount } from 'svelte';

	export let data;
	let focusedID = $page.url.searchParams.get('focus');
	let focusedAttraction = data.attractions.find((a: Attraction) => a.attractionUUID === focusedID);
	let wrapper: HTMLElement;

	const scrollIntoView = () => {
		if (!focusedAttraction) return;
		const { x, y } = focusedAttraction.coordinates;
		const { innerWidth, innerHeight } = window;
		wrapper.scrollTo({
			left: x - innerWidth / 2,
			top: y - innerHeight / 2,
			behavior: 'smooth',
		});
	}
	onMount(scrollIntoView);
</script>
	<svelte:head>
		<title>Map</title>
	</svelte:head>

<section bind:this={wrapper} class='max-w-full max-h-full overflow-auto relative sm:mx-4 my-4'>
	<div class='w-[1000px] h-[1000px] relative m-auto'>
		{#each data.gates as gate}
			<GateIcon {gate} />
		{/each}
		{#each data.attractions as attraction}
			<AttractionIcon isFocused={attraction.attractionUUID === focusedID} {attraction} />
		{/each}
	</div>
</section>

<style>
	div {
		background: url('src/lib/walls.svg') no-repeat center center;
		background-size: cover;
	}
</style>