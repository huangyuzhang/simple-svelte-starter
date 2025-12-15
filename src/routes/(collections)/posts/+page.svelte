<script lang="ts">
	import { site } from '$lib/config/index';
	import { m } from '$lib/paraglide/messages';
	import * as Tabs from '$lib/components/ui/tabs';
	import { getLocale } from '$lib/paraglide/runtime';
	import PostCard from '$lib/components/collections/post-card.svelte';
	import PostListItem from '$lib/components/collections/post-list-item.svelte';
	import { IconLayoutGrid, IconLayoutList } from '@tabler/icons-svelte';

	let { data } = $props();
	const locale = getLocale();
	const content = {
		en: {
			title: 'Posts',
			description:
				'Explore our collection of marketing insights, guides, and best practices to help you grow your business.'
		},
		zh: {
			title: '文章',
			description: '探索我们的营销知识库，帮助您实现您的目标。'
		}
	};
	let layout: 'grid' | 'list' = $state('list');

	function toggleLayout() {
		layout = layout === 'grid' ? 'list' : 'grid';
	}
</script>

<svelte:head>
	<title>{content[locale].title} - {site.title}</title>
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
			{#each data.posts as post}
				<PostCard {post} />
			{/each}
		</div>
	{:else if layout === 'list'}
		{#each data.posts as post}
			<PostListItem {post} />
		{/each}
	{/if}
</section>
