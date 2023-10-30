<script lang='ts'>
	import type { Gate } from '$lib/types';
	import {DoorClosed} from 'lucide-svelte';
	export let gate: Gate;
</script>

<div style:top='{gate.coordinates.y}px' style:left='{gate.coordinates.x}px' class='absolute bg-background rounded-full'>
	<DoorClosed size='50' class='text-yellow-600 m-2' />
</div>
