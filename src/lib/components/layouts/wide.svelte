<script lang="ts">
	import { SquareLines } from './background/square-lines';
	import Header from './header.svelte';
	import Footer from './footer.svelte';
	import { cn } from '$lib/utils';
	import { layout } from '$lib/config';
	let { children } = $props();
</script>

<SquareLines class="" />
<Header />
<div class={cn(layout.wideWidth, 'min-h-screen mx-auto')}>
	{@render children?.()}
</div>
<Footer />
