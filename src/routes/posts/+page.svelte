<script lang="ts">
	import { site } from '$lib/config';
	import { m } from '$lib/paraglide/messages';
	import { Button } from '$lib/components/ui/button';
	import { getLocale } from '$lib/paraglide/runtime.js';
	import PostCard from './post-card.svelte';
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
</script>

<svelte:head>
	<title>{m.nav_posts()} - {site.title}</title>
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
		<Button>{m.btn_contact_us()}</Button>
	</div>
</section>

<!-- Page Content -->
<section class="relative overflow-hidden px-4 my-8 sm:px-6 lg:px-8">
	<div class="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
		{#each data.posts as post}
			<PostCard {post} />
		{/each}
	</div>
</section>
