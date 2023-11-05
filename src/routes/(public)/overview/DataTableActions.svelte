<script lang="ts">
	import * as DropdownMenu from "$lib/components/ui/dropdown-menu";
	import { Button } from "$lib/components/ui/button";
	import { FerrisWheel, Map } from 'lucide-svelte';
	import { MoreHorizontal } from 'lucide-svelte';
	import type { PointOfInterest } from '$lib/types';
	export let uuid: string;
	export let category: PointOfInterest['category'];
</script>
<DropdownMenu.Root>
	<DropdownMenu.Trigger asChild let:builder>
		<Button
			variant="ghost"
			builders={[builder]}
			size="icon"
			class="relative w-8 h-8 p-0"
		>
			<span class="sr-only">Open menu</span>
			<MoreHorizontal class="w-4 h-4" />
		</Button>
	</DropdownMenu.Trigger>
	<DropdownMenu.Content>
		<DropdownMenu.Group>
			<DropdownMenu.Label>Actions</DropdownMenu.Label>
		</DropdownMenu.Group>
		<DropdownMenu.Separator />
		{#if category === 'ATTRACTION'}
		<DropdownMenu.Item>
			<Button variant='link' href='/attraction/{uuid}'>
				<FerrisWheel class='me-2'/>
				View Attraction
			</Button>
		</DropdownMenu.Item>
		{/if}
		<DropdownMenu.Item>
			<Button class='w-full' href='/map?focus={uuid}'>
				<Map class='me-2'/>
				View on map
			</Button>
		</DropdownMenu.Item>
	</DropdownMenu.Content>
</DropdownMenu.Root>