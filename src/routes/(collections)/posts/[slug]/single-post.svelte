<script lang="ts">
	import { Badge } from '$lib/components/ui/badge';
	import { IconCalendar, IconInfoSquareRounded } from '@tabler/icons-svelte';
	import type { Post } from '$lib/types/content';
	import { AspectRatio } from '$lib/components/ui/aspect-ratio';
	import { ossContent } from '$lib/oss';
	import { site } from '$lib/config';
	import MarkdownRender from '$lib/components/markdown-render.svelte';

	let { post }: { post: Post } = $props();
</script>

<svelte:head>
	<title>{post.title} - {site.title}</title>
	<meta name="description" content={post.excerpt || post.title} />
	{#if post.tags}
		<meta name="keywords" content={post.tags.join(',')} />
	{/if}
</svelte:head>

<section class="container mx-auto max-w-4xl p-4">
	<article class="flex flex-col gap-6 md:gap-8">
		<header class="flex flex-col gap-3">
			<!-- meta: date, tags -->
			<div class="flex items-center gap-3">
				{#if post.date}
					<time class="flex items-center gap-1">
						<IconCalendar class="text-muted-foreground size-4" />
						<p class="text-muted-foreground text-sm tabular-nums">
							{new Date(post.date).toLocaleDateString()}
						</p>
					</time>
				{/if}
				{#if post.category}
					<div class="flex items-center gap-1">
						<div class="flex flex-wrap gap-1">
							<Badge variant="secondary" class="capitalize">
								{post.category}
							</Badge>
						</div>
					</div>
				{/if}
			</div>
			<!-- title -->
			<h1 id="title" class="text-2xl font-bold md:text-4xl">
				{post.title}
			</h1>
			<!-- tags -->
			{#if post.tags && post.tags.length > 0}
				<div class="flex items-center gap-1">
					<div class="flex flex-wrap gap-1">
						{#each post.tags as tag}
							<Badge variant="outline" class="capitalize">
								{tag}
							</Badge>
						{/each}
					</div>
				</div>
			{/if}
			<!-- excerpt -->
			{#if post.excerpt}
				<div class="text-muted-foreground flex items-baseline gap-0.5 text-base">
					<IconInfoSquareRounded class="mr-1 size-3 shrink-0" />
					<p class="text-base sm:text-lg">
						{post.excerpt}
					</p>
				</div>
			{/if}
			<!-- image -->
			{#if post.image}
				<AspectRatio ratio={16 / 9} class="bg-muted overflow-hidden rounded-lg">
					<img
						src={post.image || ossContent('svg', 'placeholder.svg')}
						alt={post.title}
						class="pointer-events-none size-full object-cover"
						loading="lazy"
						decoding="async"
					/>
				</AspectRatio>
			{/if}
		</header>
		<MarkdownRender class="max-w-none">
			<post.content />
		</MarkdownRender>
	</article>
</section>
