<script lang="ts">
	import { cn, formatDate, getTagSlug } from '$lib/utils';
	import { Badge } from '$lib/components/ui/badge';
	import { authors,layout, site } from '$lib/config/index';
	import { m } from '$lib/paraglide/messages';

	let { data } = $props();
</script>

<svelte:head>
	<title>{data.title} - {m.nav_posts()} - {site.title}</title>
	<meta property="description" content={data.excerpt} />
</svelte:head>

<article class={cn(layout.post.paperWidth, 'container mx-auto py-6 lg:py-10 px-4 md:px-0')}>
	<div
		class="relative flex flex-col px-5 pt-6 border-t border-b-0 md:border-r md:border-l md:pt-20 lg:px-0 justify-stretch md:rounded-t-2xl border-neutral-200 dark:border-neutral-800"
	>
		<div
			class="absolute top-0 left-0 hidden w-px h-full mt-1 -translate-x-px md:block bg-gradient-to-b from-transparent to-white dark:to-neutral-950"
		></div>
		<div
			class="absolute top-0 right-0 hidden w-px h-full mt-1 translate-x-px md:block bg-gradient-to-b from-transparent to-white dark:to-neutral-950"
		></div>
		<time
			datetime={data.date}
			class="max-w-2xl mx-auto w-full text-left block text-sm text-muted-foreground"
		>
			{formatDate(data.date)}
		</time>
		<h1
			class="max-w-2xl mx-auto w-full text-left mt-2 text-4xl font-extrabold leading-tight lg:text-5xl"
		>
			{data.title}
		</h1>
	</div>
	<div class="max-w-2xl mx-auto w-full text-left mt-4">
		{#if data.tags}
			<div class="mt-4 flex gap-2">
				{#each data.tags as tag}
					<Badge variant="outline" href={`/tags/${getTagSlug(tag)}`}>{tag}</Badge>
				{/each}
			</div>
		{/if}
		{#if data.author && authors[data.author]}
			{@const author = authors[data.author]}
			<a href="/authors/{data.author}" class="mt-8 flex items-center gap-4 hover:underline">
				<img src={author.avatar} alt={author.name} class="h-10 w-10 rounded-full bg-muted" />
				<div>
					<p class="font-medium">{author.name}</p>
					<p class="text-xs text-muted-foreground">@{data.author}</p>
				</div>
			</a>
		{/if}
	</div>

	<div class="prose dark:prose-invert max-w-2xl mx-auto mt-8">
		<data.content />
	</div>
</article>
