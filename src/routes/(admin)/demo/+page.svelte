<script lang="ts">
	import { Button } from "$lib/components/ui/button";
	import {people_entering} from './(scenarios)/people_entering';
	import { people_queueing } from './(scenarios)/people_queueing';

</script>
<section class='flex flex-col gap-4 items-start'>
	<Button on:click={people_entering}>Enter 200 people in the park</Button>
	<Button on:click={people_queueing}>Enqueue 1000 visitors on random attraction</Button>
</section>
