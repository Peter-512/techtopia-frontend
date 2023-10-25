<script lang="ts">
	export let data;

	const { attraction } = data;
</script>

<h1>{attraction.name}</h1>
<img src={attraction.iconUrl} alt='icon'>
<p>{attraction.description}</p>

<img src={attraction.imageUrl} alt='attraction'>

<strong>{attraction.waitingTime}</strong>