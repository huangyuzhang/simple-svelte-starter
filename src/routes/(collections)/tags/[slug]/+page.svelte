<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import { site } from '$lib/config/index';
	import PostListItem from '$lib/components/collections/post-list-item.svelte';
	import ProductListItem from '$lib/components/collections/product-list-item.svelte'; // 确保导入
	import { m } from '$lib/paraglide/messages';
	import { getLocale } from '$lib/paraglide/runtime';

	// 使用 +page.ts 中导出的类型
	let { data } = $props();

	const locale = getLocale();

	// 简化后的内容配置
	const content = {
		en: {
			title: 'Tag',
			btn_text: 'View all tags',
			post_section: 'Posts',
			product_section: 'Products',
			no_posts: 'No posts found.',
			no_products: 'No products found.'
		},
		zh: {
			title: '标签',
			btn_text: '查看所有标签',
			post_section: '文章',
			product_section: '产品',
			no_posts: '没有找到文章。',
			no_products: '没有找到产品。'
		}
	};

	// Rune：计算所有内容的数量
	const totalItems = $derived(data.posts.length + data.products.length);
</script>

<svelte:head>
	<title>{data.name} - {site.title}</title>
</svelte:head>

<section class="relative overflow-hidden px-4 my-8 sm:px-6 lg:px-8">
	<div class="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
		<div>
			<h1 class="text-3xl font-bold tracking-tight">
				{content[locale].title}: <span class="underline">{data.name}</span>
			</h1>
			<p class="text-muted-foreground">
				{m.number_items_found({ number: totalItems })}
			</p>
		</div>
		<Button variant="outline" href="/tags">{content[locale].btn_text}</Button>
	</div>
</section>

<section class="relative overflow-hidden px-4 my-8 sm:px-6 lg:px-8 space-y-12">
	{#if data.posts.length > 0}
		<div>
			<h2 class="text-2xl font-semibold mb-6 border-b pb-2">
				{content[locale].post_section} ({data.posts.length})
			</h2>
			<div class="flex flex-col divide-y divide-border">
				{#each data.posts as post}
					<PostListItem {post} />
				{/each}
			</div>
		</div>
	{/if}

	{#if data.products.length > 0}
		<div>
			<h2 class="text-2xl font-semibold mb-6 border-b pb-2">
				{content[locale].product_section} ({data.products.length})
			</h2>
			<div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
				{#each data.products as product}
					<ProductListItem {product} />
				{/each}
			</div>
		</div>
	{/if}
</section>
