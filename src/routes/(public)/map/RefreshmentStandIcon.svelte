<script lang='ts'>
	import type { RefreshmentStand } from '$lib/types';
	import { Popcorn, CupSoda, UtensilsCrossed } from 'lucide-svelte';
	export let refreshmentStand: RefreshmentStand;
</script>

<div style:top='{refreshmentStand.y}px' style:left='{refreshmentStand.x}px' class='absolute bg-background rounded-full'>
{#if refreshmentStand.category === 'SNACKS'}
	<Popcorn size='50' class='text-green-600 m-2' />
{:else if refreshmentStand.category === 'DRINKS'}
	<CupSoda size='50' class='text-green-600 m-2' />
{:else if refreshmentStand.category === 'FOOD'}
	<UtensilsCrossed size='50' class='text-green-600 m-2'/>
{/if}
</div>