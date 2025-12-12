<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import { site } from '$lib/config';
	import PostListItem from '$lib/components/collections/post-list-item.svelte';
	import { m } from '$lib/paraglide/messages';
	import { getLocale } from '$lib/paraglide/runtime';

	let { data } = $props();
	const locale = getLocale();
	const content = {
		en: {
			title: 'Tag'
		},
		zh: {
			title: '标签'
		}
	};
</script>

<svelte:head>
	<title>{data.name} - {site.title}</title>
</svelte:head>

<!-- Page Header -->
<section class="relative overflow-hidden px-4 my-8 sm:px-6 lg:px-8">
	<div class="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
		<!-- Title & Description -->
		<div>
			<h1 class="text-3xl font-bold tracking-tight">
				{content[locale].title}: <span class="underline">{data.name}</span>
			</h1>
			<p class="text-muted-foreground"></p>
		</div>
		<!-- Action Button -->
		<Button>{m.btn_contact_us()}</Button>
	</div>
</section>

<!-- Page Content -->
<section class="relative overflow-hidden px-4 my-8 sm:px-6 lg:px-8">
	{#if data.posts.length > 0}
		<div class="flex flex-col">
			{#each data.posts as post}
				<PostListItem {post} />
			{/each}
		</div>
	{:else}
		<p class="text-muted-foreground">No posts found.</p>
	{/if}
</section>
