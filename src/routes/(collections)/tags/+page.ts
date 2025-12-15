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

		// 从路径中提取 slug
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
	// 1. 获取所有内容项
	const postPaths = import.meta.glob('/src/collections/posts/*.md', { eager: true });
	const postItems = processGlobPaths(postPaths);

	const productPaths = import.meta.glob('/src/collections/products/*.md', { eager: true });
	const productItems = processGlobPaths(productPaths);

	const allItems: CollectionItem[] = [...postItems, ...productItems];

	// 2. 统计每个标签的出现次数
	const tagCountMap = new Map<string, number>();

	allItems.forEach((item) => {
		item.tags.forEach((tag) => {
			// 确保标签是有效的字符串
			if (typeof tag === 'string' && tag.length > 0) {
				// 使用 Map 统计，如果标签不存在则初始化为 1，否则加 1
				tagCountMap.set(tag, (tagCountMap.get(tag) ?? 0) + 1);
			}
		});
	});

	// 3. 将 Map 转换为 Tag[] 数组结构
	const resultTags: Tag[] = Array.from(tagCountMap.entries()).map(([name, count]) => ({
		slug: getTagSlug(name), // 使用原有的工具函数生成 slug
		name: name,
		count: count // 包含计数
	}));

	// 可选：按内容数量降序排列
	resultTags.sort((a, b) => b.count - a.count);

	return resultTags;
}

export async function load() {
	const tags = await getTags();
	return {
		tags
	};
}
