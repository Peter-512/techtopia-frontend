<script lang="ts">
	import DataTable from './data-table.svelte'
	export let data;

	const { attractions } = data
</script>

<DataTable {attractions}></DataTable>

