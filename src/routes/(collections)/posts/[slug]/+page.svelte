<script lang="ts">
	import { formatDate, getTagSlug } from '$lib/utils';
	import { Badge } from '$lib/components/ui/badge';
	import { authors } from '$lib/config/authors';
	import { m } from '$lib/paraglide/messages';
	import { site } from '$lib/config';

	let { data } = $props();
</script>

<svelte:head>
	<title>{data.meta.title} - {m.nav_posts()} - {site.title}</title>
	<meta property="description" content={data.meta.description} />
</svelte:head>

<article class="container mx-auto max-w-3xl py-6 lg:py-10 px-4 md:px-0">
	<div>
		<time datetime={data.meta.date} class="block text-sm text-muted-foreground">
			{formatDate(data.meta.date)}
		</time>
		<h1 class="mt-2 text-4xl font-extrabold leading-tight lg:text-5xl">
			{data.meta.title}
		</h1>
		{#if data.meta.tags}
			<div class="mt-4 flex gap-2">
				{#each data.meta.tags as tag}
					<Badge variant="secondary" href={`/tags/${getTagSlug(tag)}`}>{tag}</Badge>
				{/each}
			</div>
		{/if}
	</div>

	{#if data.meta.author && authors[data.meta.author]}
		{@const author = authors[data.meta.author]}
		<a href="/authors/{data.meta.author}" class="mt-8 flex items-center gap-4 hover:underline">
			<img src={author.avatar} alt={author.name} class="h-10 w-10 rounded-full bg-muted" />
			<div>
				<p class="font-medium">{author.name}</p>
				<p class="text-xs text-muted-foreground">@{data.meta.author}</p>
			</div>
		</a>
	{/if}

	<div class="prose dark:prose-invert max-w-none mt-8">
		<data.content />
	</div>
</article>
