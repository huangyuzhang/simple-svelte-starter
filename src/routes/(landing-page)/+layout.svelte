<script>
	import Wide from '$lib/components/layouts/wide.svelte';
	let { children } = $props();
</script>

<Wide>
	{@render children?.()}
</Wide>
