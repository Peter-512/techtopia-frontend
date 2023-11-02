<script lang='ts'>
	import { Button } from '$lib/components/ui/button';
	import { DateInput } from 'date-picker-svelte';
	import type { ActionData } from './$types';
	import { enhance } from '$app/forms';
	import { addToast } from '$lib/toastStore';

	let date = new Date();
	export let form: ActionData;

	let visitorForecast: number;
	let weatherForecast: Record<'temperatureType'|'weatherType', string>;
	let loading = false;
	let variant: 'loading' | 'default' = 'default'

	$: {
		if (form?.status === 'success') {
			addToast({
				title: 'Success',
				message: form.successMessage ?? 'Success',
			});
			if (form.visitor) {
				visitorForecast = form.visitor.data.predictedVisitors;
			}
			if (form.weather) {
				weatherForecast = form.weather.data;
				loading = false;
				variant = 'default';
			}
		} else if (form?.status === 'error') {
			addToast({
				title: 'Error',
				message: form.errorMessage ?? 'Error',
				type: 'destructive',
			});
		}
	}
</script>

<h1 class='text-center mt-12 mb-6 text-4xl'>Forecasts</h1>

<div class='flex justify-center'>
	<DateInput --date-picker-highlight-border='hsl(142.1 76.2% 36.3%)'
						 --date-picker-highlight-shadow='hsl(240 4.8% 95.9%)'
						 --date-picker-selected-background='hsl(240 4.8% 95.9%)'
						 closeOnSelection
						 min={new Date()}
						 bind:value={date}
						 format='yyyy-MM-dd' />
</div>
<section class='flex justify-around'>
	<form method='POST' action='?/visitor-count' use:enhance>
		<input type='hidden' name='date' bind:value={date} />
		<Button type='submit'>Visitor Count</Button>
	</form>

	<form method='POST' action='?/weather' on:submit={()=>{
		loading = true;
		setTimeout(() => {
			variant = loading ? 'loading' : 'default';
		}, 100);
	}} use:enhance>
		<input type='hidden' name='date' bind:value={date} />
		<Button on:click={(e)=> {
				if (loading) {
					e.preventDefault();
				}
			}} {variant} type='submit'>
			{variant === 'loading' ? "Loading..." : "Weather"}
		</Button>
	</form>
</section>

<div class='mt-6 grid-cols-2 grid text-center'>
	{#if visitorForecast}
		<h2 class='text-2xl'>Forecasted Visitor Count: {visitorForecast}</h2>
	{:else}
		<h2 class='text-2xl'>Forecasted Visitor Count: No Data</h2>
	{/if}
	{#if weatherForecast}
		<h2 class='text-2xl'>Forecasted Weather: {weatherForecast.weatherType} {weatherForecast.temperatureType}</h2>
	{:else}
		<h2 class='text-2xl'>Forecasted Weather: No Data</h2>
	{/if}
</div>
