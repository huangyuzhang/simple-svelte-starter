// /tags/+page.ts
import { getTagSlug } from '$lib/utils';

interface CollectionItem {
	slug: string;
	tags: string[];
}
interface Tag {
	slug: string;
	name: string;
	count: number;
}

/**
 * Handle import.meta.glob。
 * @param paths import.meta.glob object
 * @returns CollectionItem: slug, metadata
 */
function processGlobPaths(paths: Record<string, any>): CollectionItem[] {
	const items: CollectionItem[] = Object.entries(paths).map(([path, module]) => {
		const file = module as { metadata: Record<string, any> };

		// get slug from path
		const slugMatch = path.split('/').at(-1);
		const slug = slugMatch?.replace('.md', '') ?? 'no-slug';

		const metadata = file.metadata;
		const tags: string[] = Array.isArray(metadata.tags)
			? metadata.tags.filter((tag: any): tag is string => typeof tag === 'string' && tag.length > 0)
			: [];

		return {
			slug,
			...metadata,
			tags
		} as CollectionItem;
	});

	return items;
}
/**
 * Get all unique tags from collections: posts, products, along with their count.
 */
async function getTags(): Promise<Tag[]> {
	const postPaths = import.meta.glob('/src/collections/posts/*.md', { eager: true });
	const postItems = processGlobPaths(postPaths);

	const productPaths = import.meta.glob('/src/collections/products/*.md', { eager: true });
	const productItems = processGlobPaths(productPaths);

	const allItems: CollectionItem[] = [...postItems, ...productItems];

	const tagCountMap = new Map<string, number>();

	allItems.forEach((item) => {
		item.tags.forEach((tag) => {
			if (typeof tag === 'string' && tag.length > 0) {
				tagCountMap.set(tag, (tagCountMap.get(tag) ?? 0) + 1);
			}
		});
	});

	const resultTags: Tag[] = Array.from(tagCountMap.entries()).map(([name, count]) => ({
		slug: getTagSlug(name),
		name: name,
		count: count
	}));

	resultTags.sort((a, b) => b.count - a.count);

	return resultTags;
}

export async function load() {
	const tags = await getTags();
	return {
		tags
	};
}
