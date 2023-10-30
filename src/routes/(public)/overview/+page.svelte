<script lang="ts">
	import DataTable from './DataTable.svelte'
	export let data;
</script>
<svelte:head>
	<title>Overview</title>
</svelte:head>

<DataTable attractions={data.attractions}></DataTable>

