<script lang='ts'>
	import {
		FormButton,
		FormDescription,
		FormInput,
		FormItem,
		Form,
		FormField,
		FormLabel,
		FormValidation,
		FormRadioGroup,
		FormRadioItem
	} from '$lib/components/ui/form';
	import { Label } from "$lib/components/ui/label";
	import { attractionSchema } from '$lib/schemas.js';
	import { addToast } from '$lib/toastStore';

	export let data;
</script>

<h1 class='text-4xl text-center mb-6 mt-12'>{data.attraction.name}</h1>

<Form class='max-w-xl m-auto container' method="POST" form={data.form} schema={attractionSchema} let:config options={{onSubmit() {
	addToast({title: 'Attraction updated', message: 'The attraction has been saved'})
}}}>

	<FormField {config} name="throughput">
		<FormItem class='space-y-3'>
			<FormLabel>Throughput</FormLabel>
			<FormRadioGroup class='flex flex-col space-y-1'>
				{#each ['LOW', 'HIGH'] as throughput}
					<FormItem class='flex items-center space-x-3 space-y-0'>
						<FormRadioItem value={throughput} id={throughput}>{throughput}</FormRadioItem>
						<Label for={throughput} class='capitalize'>{throughput.toLowerCase()}</Label>
					</FormItem>
				{/each}
			</FormRadioGroup>
			<FormDescription>Current throughput mode</FormDescription>
			<FormValidation />
		</FormItem>
	</FormField>

	<FormField {config} name="threshold">
		<FormItem>
			<FormLabel>Threshold</FormLabel>
			<FormInput type='number' />
			<FormDescription>At how many visitors the attraction should be set to a high throughput mode</FormDescription>
			<FormValidation />
		</FormItem>
	</FormField>

	<FormButton>Save</FormButton>
</Form>