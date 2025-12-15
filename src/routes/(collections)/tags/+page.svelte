<script lang="ts">
	import { site } from '$lib/config/index';
	import { m } from '$lib/paraglide/messages';
	import { Button } from '$lib/components/ui/button';
	import { getLocale } from '$lib/paraglide/runtime';
	import { Badge } from '$lib/components/ui/badge';
	let { data } = $props();

	const locale = getLocale();

	const content = {
		en: {
			title: 'Tags',
			description: 'Explore all tags'
		},
		zh: {
			title: '标签',
			description: '探索所有标签'
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
	</div>
</section>

<!-- Page Content -->
<section class="relative overflow-hidden px-4 my-8 sm:px-6 lg:px-8">
	<div class="flex gap-3 md:grid-cols-2 lg:grid-cols-3 flex-wrap">
		{#each data.tags as tag}
			<Button variant="outline" href={`/tags/${tag.slug}`} class="group">
				<span>{tag.name}</span>
				<Badge variant="secondary" class="border-sm group-hover:bg-background">{tag.count}</Badge>
			</Button>
		{/each}
	</div>
</section>
