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
	import { refreshmentSchema } from '$lib/schemas.js';
import { addToast } from '$lib/toastStore';

export let data;

$: {
	if (data.status === 201) {
		addToast({ title:'Success!', message: 'The refreshment stand has been created'});
	}

}
</script>

<h1 class='text-center text-4xl mt-12 mb-6'>Create Refreshment Stand</h1>

<Form novalidate class='max-w-xl m-auto container' method="POST" form={data.form} schema={refreshmentSchema} let:config options={{resetForm: true}}>

	<FormField {config} name="name">
		<FormItem>
			<FormLabel>Name</FormLabel>
			<FormInput />
			<FormDescription>Name of the refreshment stand</FormDescription>
			<FormValidation />
		</FormItem>
	</FormField>

	<FormField {config} name="category">
		<FormItem class='space-y-3'>
			<FormLabel>Category</FormLabel>
			<FormRadioGroup class='flex flex-col space-y-1'>
				{#each ['SNACK', 'DRINK', 'FOOD'] as throughput}
					<FormItem class='flex items-center space-x-3 space-y-0'>
						<FormRadioItem value={throughput} id={throughput}>{throughput}</FormRadioItem>
						<Label for={throughput} class='capitalize'>{throughput.toLowerCase()}</Label>
					</FormItem>
				{/each}
			</FormRadioGroup>
			<FormDescription>Type of refreshment stand</FormDescription>
			<FormValidation />
		</FormItem>
	</FormField>

	<FormField {config} name="x">
		<FormItem>
			<FormLabel>X coordinate</FormLabel>
			<FormInput type='number' min='0' max='1000'/>
			<FormDescription>Placement of the refreshment stand</FormDescription>
			<FormValidation />
		</FormItem>
	</FormField>

	<FormField {config} name="y">
		<FormItem>
			<FormLabel>Y coordinate</FormLabel>
			<FormInput type='number' min='0' max='1000'/>
			<FormDescription>Placement of the refreshment stand</FormDescription>
			<FormValidation />
		</FormItem>
	</FormField>

	<FormButton>Create</FormButton>
</Form>