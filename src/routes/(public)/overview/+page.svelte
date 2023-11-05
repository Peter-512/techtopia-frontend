<script lang="ts">
	import DataTable from './DataTable.svelte'
	export let data;

	let pointsOfInterest = [...data.attractions.map(attraction => {
		const { attractionUUID, coordinates, ...rest } = attraction;
		return {
			...rest,
			category: "ATTRACTION" as const,
			x: coordinates.x,
			y: coordinates.y,
			uuid: attractionUUID
		}
	}), ...data.refreshmentStands.map((stand) => {

		const { category, ...rest } = stand;
		return {
			...rest,
			category: "REFRESHMENT_STAND" as const,
			tags: [category],
			minAge: 0,
			minHeight: 0,
			waitingTime: null,
		}
	})]
</script>
<svelte:head>
	<title>Overview</title>
</svelte:head>

<DataTable {pointsOfInterest}></DataTable>

