<script lang='ts'>
	import type { Attraction } from '$lib/types';
	import { FerrisWheel } from 'lucide-svelte';
	import {ShieldAlert} from 'lucide-svelte';
	import {
		Popover,
		PopoverTrigger,
		PopoverContent,
	} from "$lib/components/ui/popover";
	import { onMount } from 'svelte';
	import { setupViewTransition } from 'sveltekit-view-transition';

	export let attraction: Attraction;
	export let isFocused: boolean;

	let trigger: HTMLButtonElement;

	onMount(() => {
		if (isFocused) {
			trigger.click();
		}
	});

	const {transition} = setupViewTransition();
</script>


<div style:top='{attraction.coordinates.y}px' style:left='{attraction.coordinates.x}px' class:isFocused class='absolute rounded-full border-green-500'>
	<Popover positioning={{placement: 'top'}}>
		<PopoverTrigger asChild let:builder>
			<button use:builder.action {...builder} bind:this={trigger}>
				<FerrisWheel class='text-red-600' size={50} />
			</button>
		</PopoverTrigger>
		<PopoverContent class='p-0 flex min-w-fit overflow-hidden'>
			<img use:transition={`attraction-icon-${attraction.attractionUUID}`} src={attraction.iconUrl} alt={attraction.name} class='h-32'>
			<section class='p-4'>
				<strong>{attraction.name}</strong>
				<p>Waiting time: {attraction.waitingTime} minute{attraction.waitingTime === 1 ? '' : 's'}</p>
				{#if !attraction.open}
					<ShieldAlert color='red'/> Closed <ShieldAlert/>
				{/if}
				<a href='/attraction/{attraction.attractionUUID}' class='font-medium text-blue-600 dark:text-blue-500 hover:underline'>See more</a>
			</section>
		</PopoverContent>
	</Popover>
</div>

<style>
	.isFocused {
		@apply border-2;
	}
</style>



