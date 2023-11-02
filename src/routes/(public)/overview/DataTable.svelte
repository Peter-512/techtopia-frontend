<script lang="ts">
	import { createTable, Render, Subscribe, createRender } from "svelte-headless-table";
	import { addPagination, addSortBy, addTableFilter, addHiddenColumns, addColumnFilters } from "svelte-headless-table/plugins";
	import { ArrowUpDown, ChevronDown } from "lucide-svelte";
	import * as Table from "$lib/components/ui/table";
	import * as DropdownMenu from "$lib/components/ui/dropdown-menu";
	import { Input } from "$lib/components/ui/input";
	import { Button } from "$lib/components/ui/button";
	import DataTableActions from "./DataTableActions.svelte";
	import TagBadge from "./TagBadge.svelte";
	import { readable } from "svelte/store";
	import type { Attraction } from '$lib/types';

	export let attractions: Attraction[] = [];
	let minAge = Math.min(...attractions.map((attraction) => attraction.minAge));
	let minHeight = Math.min(...attractions.map((attraction) => attraction.minHeight));
	let maxAge = Math.max(...attractions.map((attraction) => attraction.minAge));
	let maxHeight = Math.max(...attractions.map((attraction) => attraction.minHeight));

	const table = createTable(readable(attractions), {
		page: addPagination(),
		sort: addSortBy(),
		filter: addTableFilter({
			fn: ({ filterValue, value }) =>
				value.toLowerCase().includes(filterValue.toLowerCase())
		}),
		hide: addHiddenColumns(),
		colFilter: addColumnFilters()
	});

	const columns = table.createColumns([
		table.column({
			accessor: 'attractionUUID',
			header: "",
			plugins: {
				sort: {
					disable: true
				},
				filter: {
					exclude: true
				}
			},
			cell: ({ value }) => {
				return createRender(DataTableActions, { uuid: value });
			}
		}),
		table.column({
			accessor: "name",
			header: "Name",
		}),
		table.column({
			accessor: "minAge",
			header: "Age requirement",
			cell: ({ value }) => {
				return `${value} years`
			},
			plugins: {
				filter: {
					exclude: true
				},
				colFilter: {
					fn: ({ filterValue, value }) => {
						return value >= filterValue;
					},
					initialFilterValue: minAge,
				}
			}
		}),
		table.column({
			accessor: "minHeight",
			header: "Height requirement",
			cell: ({ value }) => {
				return `${value} cm`
			},
			plugins: {
				filter: {
					exclude: true
				},
				colFilter: {
					fn: ({ filterValue, value }) => {
						return value >= filterValue;
					},
					initialFilterValue: minHeight,
				}
			}
		}),
		table.column({
			accessor: "tags",
			header: "Tags",
			cell: ({ value }) => {
				return createRender(TagBadge, { tags: value });
			},
		}),
		table.column({
			accessor: "waitingTime",
			header: "Waiting Time",
			cell: ({ value }) => {
				return `${value} minute${value === 1 ? '' : 's'}`
			},
			plugins: {
				filter: {
					exclude: true
				}
			}
		}),
	]);

	const { headerRows, pageRows, tableAttrs, tableBodyAttrs, pluginStates, flatColumns } =
		table.createViewModel(columns);

	const { hasNextPage, hasPreviousPage, pageIndex } = pluginStates.page;
	const { filterValue } = pluginStates.filter;
	const { hiddenColumnIds } = pluginStates.hide;
	const { filterValues } = pluginStates.colFilter;

	const ids = flatColumns.map((col) => col.id);
	let hideForId = Object.fromEntries(ids.map((id) => [id, true]));
	$: $hiddenColumnIds = Object.entries(hideForId)
		.filter(([, hide]) => !hide)
		.map(([id]) => id);

	type AttractionKeys = keyof Attraction;
	const hidableCols: AttractionKeys[]= ['minAge', 'minHeight', 'waitingTime', 'tags'];

	$filterValues = {
		...$filterValues,
		minAge,
		minHeight,
	};
</script>

<div class='m-4'>
	<div class='flex justify-between flex-col sm:flex-row'>
		<div class='flex items-center py-4'>
			<Input
				class='max-w-sm'
				placeholder='Filter attractions or tags...'
				type='text'
				bind:value={$filterValue}
			/>
		</div>

		<div class='flex flex-col py-4 max-w-sm'>
			<label class='text-muted-foreground' for='min-height'>Height {$filterValues.minHeight ?? minHeight} cm</label>
			<input id='min-height' class='bg-green-300 accent-green-500 text-green-800'  bind:value={$filterValues.minHeight}
						 min={minHeight} max={maxHeight} step={10} type='range'>
		</div>

		<div class='flex flex-col py-4 max-w-sm'>
			<label class="text-muted-foreground" for='min-height'>Age {$filterValues.minAge ?? minAge} years</label>
			<input id='min-height' class='bg-green-300 accent-green-500 text-green-800' bind:value={$filterValues.minAge}
						 min={minAge} max={maxAge} step={1} type='range'>
		</div>

		<div class='py-4'>
			<DropdownMenu.Root>
				<DropdownMenu.Trigger asChild let:builder>
					<Button variant='outline' class='ml-auto text-muted-foreground' builders={[builder]}>
						Columns
						<ChevronDown class='ml-2 h-4 w-4' />
					</Button>
				</DropdownMenu.Trigger>
				<DropdownMenu.Content>
					{#each flatColumns as col}
						{#if hidableCols.includes(col.id)}
							<DropdownMenu.CheckboxItem bind:checked={hideForId[col.id]}>
								{col.header}
							</DropdownMenu.CheckboxItem>
						{/if}
					{/each}
				</DropdownMenu.Content>
			</DropdownMenu.Root>
		</div>
	</div>

	<div class='rounded-md border'>
		<Table.Root {...$tableAttrs}>
			<Table.Header>
				{#each $headerRows as headerRow}
					<Subscribe rowAttrs={headerRow.attrs()}>
						<Table.Row>
							{#each headerRow.cells as cell (cell.id)}
								<Subscribe attrs={cell.attrs()} let:attrs props={cell.props()} let:props>
									<Table.Head {...attrs}>
										{#if cell.id === 'waitingTime' || cell.id === 'minHeight' || cell.id === 'minAge'}
											<div class='flex justify-center'>
												<Button variant="ghost" on:click={props.sort.toggle}>
													<Render of={cell.render()} />
													<ArrowUpDown class={"ml-2 h-4 w-4"} />
												</Button>
											</div>
										{:else if cell.id === 'name'}
											<Button variant="ghost" on:click={props.sort.toggle}>
												<Render of={cell.render()} />
												<ArrowUpDown class={"ml-2 h-4 w-4"} />
											</Button>
										{:else if cell.id === 'tags'}
											<div class='text-center'>
												<Render of={cell.render()}></Render>
											</div>
										{:else}
											<Render of={cell.render()} />
										{/if}
									</Table.Head>
								</Subscribe>
							{/each}
						</Table.Row>
					</Subscribe>
				{/each}
			</Table.Header>
			<Table.Body {...$tableBodyAttrs}>
				{#each $pageRows as row (row.id)}
						<Subscribe rowAttrs={row.attrs()} let:rowAttrs>
								<Table.Row {...rowAttrs}>
									{#each row.cells as cell (cell.id)}
										<Subscribe attrs={cell.attrs()} let:attrs>
											<Table.Cell {...attrs}>
												{#if cell.id === 'name'}
										<span class='capitalize'>
											<Render of={cell.render()} />
										</span>
												{:else if cell.id === 'minHeight' || cell.id === 'minAge' || cell.id === 'waitingTime'}
													<div class='text-center'>
														<Render of={cell.render()} />
													</div>
												{:else}
													<Render of={cell.render()} />
												{/if}
											</Table.Cell>
										</Subscribe>
									{/each}
								</Table.Row>
						</Subscribe>
				{/each}
			</Table.Body>
		</Table.Root>
	</div>

	<div class="flex items-center justify-end space-x-2 py-4">
		<Button
			variant="outline"
			size="sm"
			on:click={() => ($pageIndex = $pageIndex - 1)}
			disabled={!$hasPreviousPage}>Previous</Button
		>
		<Button
			variant="outline"
			size="sm"
			disabled={!$hasNextPage}
			on:click={() => ($pageIndex = $pageIndex + 1)}>Next</Button
		>
	</div>
</div>
