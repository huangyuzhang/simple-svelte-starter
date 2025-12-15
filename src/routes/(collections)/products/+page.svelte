<script lang="ts">
	import { site } from '$lib/config/index';
	import { m } from '$lib/paraglide/messages';
	import * as Tabs from '$lib/components/ui/tabs';
	import { getLocale } from '$lib/paraglide/runtime';
	import { IconLayoutGrid, IconLayoutList } from '@tabler/icons-svelte';
	import ProductListItem from '$lib/components/collections/product-list-item.svelte';
	import ProductCard from '$lib/components/collections/product-card.svelte';

	let { data } = $props();
	const locale = getLocale();
	const content = {
		en: {
			title: 'Our Products',
			description: 'Our products are designed to help you achieve your goals.'
		},
		zh: {
			title: '我们的产品',
			description: '我们的产品旨在帮助你实现目标。'
		}
	};
	let layout: 'grid' | 'list' = $state('grid');

	function toggleLayout() {
		layout = layout === 'grid' ? 'list' : 'grid';
	}
</script>

<svelte:head>
	<title>{m.nav_products()} - {site.title}</title>
</svelte:head>

<!-- Page Header -->
<section class="relative overflow-hidden px-4 my-8 sm:px-6 lg:px-8">
	<div class="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
		<!-- Title & Description -->
		<div>
			<h1 class="text-3xl font-bold tracking-tight">{content[locale].title}</h1>
			<p class="text-muted-foreground">{content[locale].description}</p>
		</div>
		<!-- Action Button -->
		<Tabs.Root bind:value={layout}>
			<Tabs.List>
				<Tabs.Trigger value="grid"><IconLayoutGrid /></Tabs.Trigger>
				<Tabs.Trigger value="list"><IconLayoutList /></Tabs.Trigger>
			</Tabs.List>
		</Tabs.Root>
	</div>
</section>

<!-- Page Content -->
<section class="relative overflow-hidden px-4 my-8 sm:px-6 lg:px-8">
	{#if layout === 'grid'}
		<div class="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
			{#each data.products as product}
				<ProductCard {product} />
			{/each}
		</div>
	{:else if layout === 'list'}
		{#each data.products as product}
			<ProductListItem {product} />
		{/each}
	{/if}
</section>
