<script lang="ts">
	import { AlertTitle, AlertDescription, Alert } from "$lib/components/ui/alert";
	import { Bell } from 'lucide-svelte';
	import { fly, slide } from 'svelte/transition';

	import { dismissToast, toasts } from "$lib/toastStore";
</script>

{#if $toasts}
	<section class='fixed bottom-0 right-0 max-w-md w-[20rem] flex m-4 justify-center flex-col z-50'>
		{#each $toasts as toast (toast.id)}

			<div in:fly={{x: 200}} out:slide>
				<Alert
					class='mt-2'
					dismissible={toast.dismissible}
					on:dismiss={() => dismissToast(toast.id)}>
					<Bell size={30} />
					<AlertTitle>{toast.title}</AlertTitle>
					<AlertDescription>{toast.message}</AlertDescription>
				</Alert>
			</div>
		{/each}
	</section>
{/if}
