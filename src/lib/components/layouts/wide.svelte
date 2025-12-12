<script lang="ts">
	import { SquareLines } from './background/square-lines';
	import Header from './header.svelte';
	import Footer from './footer.svelte';
	import { cn } from '$lib/utils';
	import { layout } from '$lib/config/index';
	let { children } = $props();
</script>

<SquareLines class="" />
<Header headerWidth={layout.wideWidth} />
<div class={cn(layout.wideWidth, 'min-h-screen mx-auto')}>
	{@render children?.()}
</div>
<Footer />
