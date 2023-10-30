<script lang="ts">
	import { Badge } from "$lib/components/ui/badge";
	export let tags: string[];
</script>

<div class='flex flex-wrap gap-1'>
	{#each tags as tag}
		<Badge>{tag}</Badge>
	{/each}
</div>
