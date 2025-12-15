<script lang="ts">
	import * as Card from '$lib/components/ui/card';
	import { AspectRatio } from '$lib/components/ui/aspect-ratio';
	import { Badge } from '$lib/components/ui/badge';
	import type { Product } from '$lib/types/content';
	import { IconCalendar } from '@tabler/icons-svelte';
	import { ossContent } from '$lib/oss';
	import { getTagSlug } from '$lib/utils';

	let { product }: { product: Partial<Product> } = $props();
</script>

<Card.Root class="group mx-4 overflow-hidden pt-0 sm:mx-0">
	<AspectRatio ratio={16 / 9} class="bg-muted relative">
		<img
			src={product.image || ossContent('svg', 'placeholder.svg')}
			alt={product.title}
			class="pointer-events-none h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
			loading="lazy"
			decoding="async"
		/>
		{#if product.category}
			<div class="absolute left-2 top-2">
				<div class="flex flex-wrap gap-1">
					<Badge variant="secondary" class="capitalize">
						{product.category}
					</Badge>
				</div>
			</div>
		{/if}
	</AspectRatio>
	<Card.Content>
		{#if product.tags && product.tags.length > 0}
			<div class="mb-2 flex items-center gap-1">
				<div class="flex flex-wrap gap-1">
					{#each product.tags.slice(0, 3) as tag}
						<Badge variant="outline" class="capitalize" href={`/tags/${getTagSlug(tag)}`}>
							{tag}
						</Badge>
					{/each}
				</div>
			</div>
		{/if}
		<a href={`/products/${product.slug}`}>
			<h3 class="mb-2 line-clamp-2 text-xl font-semibold" title={product.title}>
				{product.title}
			</h3>
		</a>
		<p class="text-muted-foreground line-clamp-3 text-sm">
			{product.excerpt}
		</p>
	</Card.Content>
	<Card.Footer>
		{#if product.date}
			<time class="text-muted-foreground flex items-center gap-1">
				<IconCalendar class="size-3" />
				<span class=" text-sm tabular-nums">
					{new Date(product.date).toLocaleDateString()}
				</span>
			</time>
		{/if}
	</Card.Footer>
</Card.Root>
