<script lang="ts">
	import { Badge } from "$lib/components/ui/badge";
	export let tags: string[];

	function calculateColor(tagText: string): string {
		const hash = tagText.split("").reduce((acc, char) => {
			acc = (acc << 5) - acc + char.charCodeAt(0);
			return acc & acc;
		}, 0);
		const hue = hash % 360;
		return `hsl(${hue}, 100%, 30%)`;
	}
</script>

<div class='flex flex-wrap gap-1'>
	{#each tags as tag}
		{@const color = calculateColor(tag)}
		<Badge --badgeColor={color}>{tag}</Badge>
	{/each}
</div>
