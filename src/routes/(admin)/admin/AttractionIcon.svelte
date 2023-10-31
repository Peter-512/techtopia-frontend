<script lang='ts'>
	import type { AdminAttraction, FullAttraction } from '$lib/types';
	import { FerrisWheel } from 'lucide-svelte';
	import {ShieldAlert} from 'lucide-svelte';
	import {
		Popover,
		PopoverTrigger,
		PopoverContent,
	} from "$lib/components/ui/popover";

	export let attraction: FullAttraction;
	export let adminAttraction: AdminAttraction;

</script>


<div style:--waitingTime={adminAttraction?.currentWaitingTime} style:--throughputColor={adminAttraction?.throughput === 'HIGH' ? 'red' : 'orange'} style:top='{attraction.coordinates.y}px' style:left='{attraction.coordinates.x}px' class='absolute rounded-full border-green-500'>
	<Popover positioning={{placement: 'top'}}>
		<PopoverTrigger asChild let:builder>
			<button use:builder.action {...builder}>
				<FerrisWheel class='text-red-600' size={50} />
			</button>
		</PopoverTrigger>
		<PopoverContent class='p-0 flex min-w-fit overflow-hidden'>
			<img src={attraction.iconUrl} alt={attraction.name} class='h-32'>
			<section class='p-4'>
				<strong>{attraction.name}</strong>
				<p>Waiting time: {adminAttraction.currentWaitingTime} minute{adminAttraction.currentWaitingTime === 1 ? '' : 's'}</p>
				{#if !attraction.open}
					<ShieldAlert color='red'/> Closed <ShieldAlert/>
				{:else}
					<p>Open</p>
				{/if}
				<a href='admin/attraction/{attraction.attractionUUID}' class='font-medium text-blue-600 dark:text-blue-500 hover:underline'>Details</a>
			</section>
		</PopoverContent>
	</Popover>
</div>

<style>
	div {
			box-shadow: 0 0 calc(var(--waitingTime) * 2px) calc(var(--waitingTime) * 2px) var(--throughputColor);
	}
</style>


