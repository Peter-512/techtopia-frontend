<script lang='ts'>
	import {page} from '$app/stores'
	import { setupViewTransition } from 'sveltekit-view-transition';

	$: isOverview = $page.route.id === '/(public)/overview'
	$: isMap = $page.route.id === '/(public)/map'


	const {transition} = setupViewTransition();
</script>

<nav use:transition={'navbar'} class='fixed w-full z-20 backdrop-blur'>
	<ul class="flex justify-evenly text-xl bg-green-200 p-3.5 bg-opacity-50">
		<li>
			<a aria-current={isOverview ? 'page' : undefined} class:bg-green-400={isOverview} class:text-green-900={isOverview} class="text-green-800 hover:text-green-800 p-4 hover:bg-green-300 rounded bg-opacity-50 backdrop-blur" href="/overview">Overview</a>
		</li>
		<li>
			<a aria-current={isMap ? 'page' : undefined} class:bg-green-400={isMap} class:text-green-900={isMap}  class="text-green-800 hover:text-green-800 p-4 hover:bg-green-300 rounded bg-opacity-50 backdrop-blur" href="/map">Map</a>
		</li>
	</ul>
</nav>
<main class='py-14'>
	<slot />
</main>
