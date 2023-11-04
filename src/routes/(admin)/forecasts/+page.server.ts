import type { RefreshmentStandsForecast, VisitorForecast, WeatherForecast } from '$lib/types';
import { format } from 'date-fns';
import type { Actions } from './$types';

export const actions: Actions = {
	'visitor-count': async ({ fetch, request }) => {
		const form = await request.formData();
		const entry = form.get('date');
		if (!entry) {
			return {
				status: 'error',
				errorMessage: 'Failed to forecast',
				visitor: {
					data: {
						error: true,
						date: '',
						predictedVisitors: 0,
						errorMessage: ''
					} satisfies VisitorForecast
				}
			};
		}

		const date = new Date(Date.parse(entry.toString()));

		const req = await fetch(
			`http://localhost:8090/api/forecast/${date.toISOString().slice(0, 10)}`,
			{
				headers: {
					'Content-Type': 'application/json'
				}
			}
		);

		const data: VisitorForecast = await req.json();

		if (data.error) {
			return {
				status: 'error',
				errorMessage: data.errorMessage,
				visitor: {
					data
				}
			};
		}

		return {
			status: 'success',
			successMessage: `Forecasted ${data.predictedVisitors} visitors for ${format(
				date,
				'dd.MM.yyyy'
			)}`,
			visitor: {
				data
			}
		};
	},

	weather: async ({ fetch, request }) => {
		const form = await request.formData();
		const entry = form.get('date');
		if (!entry) {
			return {
				status: 'error',
				errorMessage: 'Failed to forecast',
				weather: {
					data: {
						date: '',
						weatherType: '',
						temperatureType: ''
					} satisfies WeatherForecast
				}
			};
		}

		const date = new Date(Date.parse(entry.toString()));

		const req = await fetch(
			`http://localhost:8090/api/weather/${date.toISOString().slice(0, 10)}`,
			{
				headers: {
					'Content-Type': 'application/json'
				}
			}
		);

		const data: WeatherForecast = await req.json();

		return {
			status: 'success',
			successMessage: `Forecasted ${data.weatherType} weather with ${
				data.temperatureType
			} temperature for ${format(date, 'dd.MM.yyyy')}`,
			weather: {
				data
			}
		};
	},

	'refreshment-stands': async ({ fetch, request }) => {
		const form = await request.formData();
		const entry = form.get('date');
		if (!entry) {
			return {
				status: 'error',
				errorMessage: 'Failed to forecast',
				refreshmentStands: {
					data: {
						amount: 0
					} satisfies RefreshmentStandsForecast
				}
			};
		}

		const date = new Date(Date.parse(entry.toString()));

		const req = await fetch(
			`http://localhost:8090/api/refreshment-stands/${date.toISOString().slice(0, 10)}`,
			{
				headers: {
					'Content-Type': 'application/json'
				}
			}
		);

		const data: number = await req.json();

		return {
			status: 'success',
			successMessage: `Forecasted to need ${data} refreshment stands on ${format(
				date,
				'dd.MM.yyyy'
			)}`,
			refreshmentStands: {
				data: {
					amount: data
				} satisfies RefreshmentStandsForecast
			}
		};
	}
};
