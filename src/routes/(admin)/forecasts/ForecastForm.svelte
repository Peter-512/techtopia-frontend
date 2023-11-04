<script lang="ts">
	import { Button } from '$lib/components/ui/button/index.js';
import { enhance } from '$app/forms';
import type { ActionData } from './$types';
import { cn } from '$lib/utils';
	import { addToast } from '$lib/toastStore';


type $$Props = HTMLFormElement['$$props'];
let className: $$Props["class"] = undefined;
export {className as class};

let variant: 'loading' | 'default' = 'default';
let loading = false;
export let date: Date;
export let buttonText: string;
export let action: string;
export let type: 'visitor' | 'weather' | 'refreshmentStands';
export let form: ActionData;


$: {
	if (form?.status === 'success' && form[type]) {
		loading = false;
		variant = 'default';
		addToast({
			title: 'Success',
			message: form.successMessage ?? 'Success',
		});
	} else if (form?.status === 'error') {
		addToast({
			title: 'Error',
			message: form.errorMessage ?? 'Error',
			type: 'destructive',
		});
	}
}
</script>

<form class={cn(className)} method='POST' { action } on:submit={()=>{
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
		{variant === 'loading' ? "Loading..." : buttonText}
	</Button>
</form>