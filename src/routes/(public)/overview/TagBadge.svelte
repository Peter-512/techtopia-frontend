<script lang="ts">
	import { Badge } from "$lib/components/ui/badge";
	import { page } from '$app/stores';

	export let tags: string[];

	function calculateColor(tagText: string): number {
		const hash = tagText.split("").reduce((acc, char) => {
			acc = (acc << 5) - acc + char.charCodeAt(0);
			return acc & acc;
		}, 0);
		return hash % 360;
	}
</script>

<div class='flex flex-wrap gap-1'>
	{#each tags as tag}
		{@const color = calculateColor(tag)}
		{#if $page.route.id.startsWith('/(public)/overview')}
		<Badge href={`?filter=${tag}`} --badgeColor={color}>{tag}</Badge>
		{:else}
		<Badge --badgeColor={color}>{tag}</Badge>
		{/if}
	{/each}
</div>
