<script>
	import Base from '$lib/components/layouts/base.svelte';
	let { children } = $props();
</script>

<Base>
	{@render children?.()}
</Base>
