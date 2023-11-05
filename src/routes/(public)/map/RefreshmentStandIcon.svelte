<script lang='ts'>
	import type { RefreshmentStand } from '$lib/types';
	import { Popcorn, CupSoda, UtensilsCrossed } from 'lucide-svelte';
	import { Popover, PopoverContent, PopoverTrigger } from '$lib/components/ui/popover';
	import { onMount } from 'svelte';
	export let refreshmentStand: RefreshmentStand;
	export let isFocused: boolean;

	let trigger: HTMLButtonElement;

	onMount(() => {
		if (isFocused) {
			trigger.click();
		}
	});
</script>

<div style:top='{refreshmentStand.y}px' style:left='{refreshmentStand.x}px' class:isFocused class='absolute bg-background rounded-full border-red-500'>

	<Popover positioning={{placement: 'top'}}>
		<PopoverTrigger asChild let:builder>
			<button use:builder.action {...builder} bind:this={trigger}>
				{#if refreshmentStand.category === 'SNACKS'}
					<Popcorn size='50' class='text-green-600 m-2' />
				{:else if refreshmentStand.category === 'DRINKS'}
					<CupSoda size='50' class='text-green-600 m-2' />
				{:else if refreshmentStand.category === 'FOOD'}
					<UtensilsCrossed size='50' class='text-green-600 m-2'/>
				{/if}
			</button>
		</PopoverTrigger>
		<PopoverContent class='p-0 flex min-w-fit overflow-hidden'>
			<section class='p-4'>
				<strong>{refreshmentStand.name}</strong>
			</section>
		</PopoverContent>
	</Popover>

</div>

<style>
    .isFocused {
        @apply border-2;
    }
</style>