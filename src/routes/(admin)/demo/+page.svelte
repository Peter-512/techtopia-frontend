<script lang="ts">
	import { Button } from "$lib/components/ui/button";
	import { enhance } from '$app/forms';

	const forms = [
		{
			action: '?/people-entering',
			text: "Enter 200 people in the park"
		},
		{
			action: '?/people-leaving',
			text: "Have some people leave the park"
		},
		{
			action: '?/people-queueing',
			text: "Enqueue 1000 visitors on random attraction"
		},
	]
</script>
<section class='flex flex-col gap-4 items-start'>
	{#each forms as { action, text } }
		<form method='POST' {action} use:enhance>
			<Button type='submit'>{text}</Button>
		</form>
	{/each}
</section>
