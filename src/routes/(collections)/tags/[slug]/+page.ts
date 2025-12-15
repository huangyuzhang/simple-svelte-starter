// /tags/[slug]/+page.ts
import { getTagSlug } from '$lib/utils';
import { error, type LoadEvent } from '@sveltejs/kit';
import type { Post, Product } from '$lib/types/content';

interface ContentMetadata {
	title: string;
	date: string;
	tags?: string[] | string;
	[key: string]: unknown;
}

export type TagLoadData = {
	name: string;
	slug: string;
	posts: Post[];
	products: Product[];
};

/**
 * Get and standardize tags
 */
function standardizeTags(rawTags: ContentMetadata['tags']): string[] {
	if (Array.isArray(rawTags)) {
		return rawTags.filter((t): t is string => typeof t === 'string' && t.length > 0);
	}
	if (typeof rawTags === 'string' && rawTags.length > 0) {
		return [rawTags];
	}
	return [];
}

/**
 * load collection content
 * @param globPath import.meta.glob
 * @param requestedSlug URL slug
 * @param originalTagNameRef reference
 * @returns Post or Product
 */
function filterCollection<T extends Post | Product>(
	globPath: string,
	requestedSlug: string,
	originalTagNameRef: { value: string | undefined }
): T[] {
	let modules: Record<string, { metadata: ContentMetadata }> = {};

	if (globPath === '/src/collections/posts/*.md') {
		modules = import.meta.glob<ContentMetadata>('/src/collections/posts/*.md', {
			eager: true
		}) as unknown as Record<string, { metadata: ContentMetadata }>;
	} else if (globPath === '/src/collections/products/*.md') {
		modules = import.meta.glob<ContentMetadata>('/src/collections/products/*.md', {
			eager: true
		}) as unknown as Record<string, { metadata: ContentMetadata }>;
	} else {
		return [];
	}

	const filteredItems: T[] = [];

	for (const [path, module] of Object.entries(modules)) {
		const metadata = module.metadata;

		if (!metadata) continue;

		const tags = standardizeTags(metadata.tags);
		const matchedTag = tags.find((tag) => getTagSlug(tag) === requestedSlug);

		if (matchedTag) {
			if (!originalTagNameRef.value) {
				originalTagNameRef.value = matchedTag;
			}

			const slug = path.split('/').at(-1)?.replace('.md', '') ?? '';

			filteredItems.push({
				slug,
				tags,
				...metadata
			} as T);
		}
	}
	return filteredItems;
}

export async function load({ params }: LoadEvent): Promise<TagLoadData> {
	const requestedSlug = params.slug;

	if (!requestedSlug) {
		throw error(404, 'Tag slug is missing.');
	}

	const originalTagNameRef: { value: string | undefined } = { value: undefined };

	const posts = filterCollection<Post>(
		'/src/collections/posts/*.md',
		requestedSlug,
		originalTagNameRef
	);

	const products = filterCollection<Product>(
		'/src/collections/products/*.md',
		requestedSlug,
		originalTagNameRef
	);

	if (posts.length === 0 && products.length === 0) {
		throw error(404, `Could not find any content for tag: ${requestedSlug}`);
	}

	posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
	products.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

	return {
		name: originalTagNameRef.value ?? requestedSlug,
		slug: requestedSlug,
		posts,
		products
	};
}
