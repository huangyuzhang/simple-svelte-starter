<script lang="ts">
	import { Badge } from '$lib/components/ui/badge';
	import { formatDate, getTagSlug } from '$lib/utils';

	let { post } = $props();
</script>

<article class="flex flex-col gap-2 border-b py-6 last:border-b-0">
	<div class="flex items-center gap-2 text-sm text-muted-foreground">
		<time datetime={post.date} class="whitespace-nowrap">{formatDate(post.date)}</time>
		{#if post.tags}
			<div class="flex gap-1">
				{#each post.tags as tag, index}
					{#if index <= 2}
						<Badge variant="secondary" class="font-normal" href={`/tags/${getTagSlug(tag)}`}
							>{tag}</Badge
						>
					{/if}
				{/each}
			</div>
		{/if}
	</div>
	<a href="/posts/{post.slug}" class="group">
		<h2 class="text-2xl font-bold tracking-tight group-hover:underline">
			{post.title}
		</h2>
		<p class="text-muted-foreground line-clamp-2 mt-2">
			{post.excerpt}
		</p>
	</a>
</article>
