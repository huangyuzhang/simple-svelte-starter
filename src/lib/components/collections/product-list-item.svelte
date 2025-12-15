<script lang="ts">
	import { Badge } from '$lib/components/ui/badge';
	import type { Product } from '$lib/types/content';
	import { formatDate, getTagSlug } from '$lib/utils';

	let { product }: { product: Partial<Product> } = $props();
</script>

<article class="flex flex-col gap-2 border-b py-6 last:border-b-0">
	<div class="flex items-center gap-2 text-sm text-muted-foreground">
		{#if product.date}
			<time datetime={product.date} class="whitespace-nowrap">{formatDate(product.date)}</time>
		{/if}
		{#if product.tags}
			<div class="flex gap-1">
				{#each product.tags as tag, index}
					{#if index <= 2}
						<Badge variant="outline" class="font-normal" href={`/tags/${getTagSlug(tag)}`}
							>{tag}</Badge
						>
					{/if}
				{/each}
			</div>
		{/if}
	</div>
	<a href="/products/{product.slug}" class="group">
		<h2 class="text-2xl font-bold tracking-tight group-hover:underline">
			{product.title}
		</h2>
		<p class="text-muted-foreground line-clamp-2 mt-2">
			{product.excerpt}
		</p>
	</a>
</article>
