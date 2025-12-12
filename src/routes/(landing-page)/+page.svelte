<script lang="ts">
	import { site } from '$lib/config/index';
	import Hero from './hero.svelte';
</script>

<svelte:head>
	<title>{site.title} - {site.description}</title>
</svelte:head>

<Hero />
