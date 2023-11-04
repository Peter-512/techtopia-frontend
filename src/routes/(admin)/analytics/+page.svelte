<script lang='ts'>
import { DatePicker } from 'date-picker-svelte';
import { Button } from '$lib/components/ui/button';
import type { ActionData } from './$types';
import { enhance } from '$app/forms';

let date = new Date();
export let form: ActionData;
</script>

<svelte:head>
		<title>Analytics</title>
</svelte:head>

<section class='container flex flex-col items-center gap-6'>
	<h1 class='text-4xl mt-6'>Analytics</h1>
	<DatePicker --date-picker-highlight-border='hsl(142.1 76.2% 36.3%)'
						--date-picker-highlight-shadow='hsl(240 4.8% 95.9%)'
						--date-picker-selected-background='hsl(240 4.8% 95.9%)'
						max={new Date()}
						bind:value={date} />

	<form method='POST' use:enhance>
		<input type='hidden' name='date' bind:value={date} />
		<Button>Get average visitor duration</Button>
	</form>
	{#if form}
		<p>
			{form.duration?.toFixed(2)} minutes
		</p>
	{/if}
</section>
