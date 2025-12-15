<script lang="ts">
	import { onMount } from 'svelte';
	import * as Command from '$lib/components/ui/command';
	import * as Dialog from '$lib/components/ui/dialog';
	import { Button } from '$lib/components/ui/button';
	import { Badge } from '$lib/components/ui/badge';
	import { IconSearch } from '@tabler/icons-svelte';
	import FileText from '@lucide/svelte/icons/file-text';
	import { m } from '$lib/paraglide/messages';
	import type { Post, Product } from '$lib/types/content';
	import { goto } from '$app/navigation';

	let open = $state(false);
	let posts: Post[] = $state([]);
	let products: Product[] = $state([]);

	onMount(() => {
		(async () => {
			try {
				const response = await fetch('/api/search');
				if (response.ok) {
					const data = await response.json();
					posts = data.posts;
					products = data.products;
				}
			} catch (error) {
				console.error('Failed to load search results', error);
			}
		})();

		function handleKeydown(e: KeyboardEvent) {
			if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
				e.preventDefault();
				open = !open;
			}
		}

		document.addEventListener('keydown', handleKeydown);
		return () => document.removeEventListener('keydown', handleKeydown);
	});
</script>

<Button
	variant="ghost"
	size="icon"
	class="cursor-pointer rounded-full"
	onclick={() => (open = true)}
>
	<IconSearch />
</Button>

<Dialog.Root bind:open>
	<Dialog.Content class="p-0 overflow-hidden shadow-lg">
		<Dialog.Title class="sr-only">{m.search()}</Dialog.Title>
		<Command.Root class="rounded-lg">
			<Command.Input placeholder={m.search()} />
			<Command.List>
				<Command.Empty>{m.no_results_found()}</Command.Empty>
				<Command.Group heading={m.nav_products()}>
					{#each products as product}
						<Command.Item
							class="cursor-pointer"
							value={`${product.title} ${product.tags.join(' ')} ${product.excerpt} ${product.date} ${product.content}`}
							onSelect={() => {
								open = false;
								goto(`/products/${product.slug}`);
							}}
						>
							<FileText />
							<span>{product.title}</span>
							<Badge variant="outline" class="text-muted-foreground text-xs">
								{new Date(product.date).toLocaleDateString()}
							</Badge>
						</Command.Item>
					{/each}
				</Command.Group>
				<Command.Group heading={m.nav_posts()}>
					{#each posts as post}
						<Command.Item
							class="cursor-pointer"
							value={`${post.title} ${post.tags.join(' ')} ${post.excerpt} ${post.date} ${post.content}`}
							onSelect={() => {
								open = false;
								goto(`/posts/${post.slug}`);
							}}
						>
							<FileText />
							<span>{post.title}</span>
							<Badge variant="outline" class="text-muted-foreground text-xs">
								{new Date(post.date).toLocaleDateString()}
							</Badge>
						</Command.Item>
					{/each}
				</Command.Group>
			</Command.List>
		</Command.Root>
	</Dialog.Content>
</Dialog.Root>
