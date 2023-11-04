<script lang='ts'>
	import { DatePicker } from 'date-picker-svelte';
	import type { ActionData } from './$types';
	import ForecastForm from './ForecastForm.svelte';

	let date = new Date();
	export let form: ActionData;

	let visitorForecast: number;
	let weatherForecast: Record<'temperatureType'|'weatherType', string>;
	let refreshmentStandsForecast: number;

	$: {
		if (form?.status === 'success') {
			if (form.visitor) {
				visitorForecast = form.visitor.data.predictedVisitors;
			}
			if (form.weather) {
				weatherForecast = form.weather.data;
			}
			if (form.refreshmentStands) {
				refreshmentStandsForecast = form.refreshmentStands.data.amount;
			}
		}
	}
</script>

<h1 class='text-center mt-12 mb-6 text-4xl'>Forecasts</h1>

<div class='flex justify-center'>
	<DatePicker --date-picker-highlight-border='hsl(142.1 76.2% 36.3%)'
						 --date-picker-highlight-shadow='hsl(240 4.8% 95.9%)'
						 --date-picker-selected-background='hsl(240 4.8% 95.9%)'
						 min={new Date()}
						 bind:value={date} />
</div>

<div class='mt-6 grid-cols-2 grid text-center'>
	<section class='flex flex-col gap-4 m-4'>
		<ForecastForm type='visitor' {form} {date} buttonText='Visitor Count' action='?/visitor-count'/>
		<h3 class='text-2xl'>Forecasted Visitor Count: {visitorForecast ?? 'No Data'}</h3>
	</section>
	<section class='flex flex-col gap-4 m-4'>
		<ForecastForm type='weather' {form} {date} buttonText='Weather' action='?/weather'/>
		<h3 class='text-2xl'>Forecasted Weather: {weatherForecast ? `${weatherForecast.weatherType} ${weatherForecast.temperatureType}` : 'No Data'}</h3>
	</section>
</div>

<section class='flex flex-col items-center gap-4'>
	<h2 class='text-3xl text-center mt-12 mb-6'>Refreshment Stands</h2>
	<ForecastForm type='refreshmentStands' {form} {date} buttonText='Refreshment Stands' action='?/refreshment-stands' />
	<h3 class='text-2xl'>Forecasted refreshment stands: {refreshmentStandsForecast ?? "No Data"}</h3>
</section>
