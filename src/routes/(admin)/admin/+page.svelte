<script lang='ts'>
	import AttractionIcon from './AttractionIcon.svelte';
	import GateIcon from './GateIcon.svelte';
	import { onMount } from 'svelte';
	import type { AdminAttraction, FullAttraction } from '$lib/types';
	import { addToast } from '$lib/toastStore';
	import RefreshmentStandIcon from '../../(public)/map/RefreshmentStandIcon.svelte';

	export let data;

	const attractions = data.fullAttractions.reduce<Record<string, FullAttraction>>((acc, attraction) => {
		if (!attraction) return acc;
		acc[attraction.attractionUUID] = attraction;
		return acc;
	}, {})

	let polledAttractions: AdminAttraction[] = [];

	const poll = async () => {
		const req = await fetch('/admin')
		if (!req.ok){
			console.log('error polling');
			return;
		}

		const newAttractions = await req.json();

		newAttractions?.forEach((newAttraction: AdminAttraction) => {
			const oldAttraction = polledAttractions.find(a => a.attractionUUID.uuid === newAttraction.attractionUUID.uuid);
			if (oldAttraction) {
				if (oldAttraction.throughput !== newAttraction.throughput) {
					addToast({
						title: 'Attraction Throughput Change',
						message: `Throughput of ${attractions[oldAttraction.attractionUUID.uuid].name} has changed from ${oldAttraction.throughput} to ${newAttraction.throughput}`
					})
				}
			}
		})
		polledAttractions = newAttractions;
	}

	onMount(() => {
		const interval = setInterval(poll, 1000)

		return () => clearInterval(interval)
	})
</script>
<svelte:head>
	<title>Admin</title>
</svelte:head>

<section class='max-w-full max-h-full overflow-auto relative sm:mx-4 mt-12 my-4'>
	<div class='w-[1000px] h-[1000px] relative m-auto'>
		{#each data.gates as gate}
			<GateIcon {gate} />
		{/each}
		{#each data.fullAttractions as attraction (attraction.attractionUUID)}
			<AttractionIcon adminAttraction={ polledAttractions.find(a => a.attractionUUID.uuid === attraction.attractionUUID) } {attraction} />
		{/each}
		{#each data.refreshmentStands as refreshmentStand}
			<RefreshmentStandIcon isFocused={false} {refreshmentStand} />
		{/each}
	</div>
</section>

<style>
    div {
        background: url('src/lib/walls.svg') no-repeat center center;
        background-size: cover;
    }
</style>