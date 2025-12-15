// /tags/[slug]/+page.ts

import { getTagSlug } from '$lib/utils';
import { error, type LoadEvent } from '@sveltejs/kit';

// 导入内容类型
import type { Post, Product } from '$lib/types/content';

// 定义 Markdown 元数据的预期结构
interface ContentMetadata {
	title: string;
	date: string;
	tags?: string[] | string;
	[key: string]: unknown;
}

// 定义最终返回的数据结构
export type TagLoadData = {
	name: string; // 标签的原始名称
	slug: string; // 标签的 slug
	posts: Post[]; // 过滤后的 Post 数组
	products: Product[]; // 过滤后的 Product 数组
};

// --- 辅助函数 ---

/**
 * 提取并标准化 Markdown 模块中的标签。
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
 * 通用函数：加载并过滤单个 Collection 的内容。
 * @param globPath import.meta.glob 的路径字面量（必须是字面量）
 * @param requestedSlug URL 请求的标签 slug
 * @param originalTagNameRef 用于捕获第一个匹配到的原始标签名的引用
 * @returns 匹配到的内容项数组 (Post 或 Product)
 */
function filterCollection<T extends Post | Product>(
	globPath: string,
	requestedSlug: string,
	originalTagNameRef: { value: string | undefined }
): T[] {
	let modules: Record<string, { metadata: ContentMetadata }> = {};

	// 关键：Vite 要求路径是字面量
	if (globPath === '/src/collections/posts/*.md') {
		// 使用类型断言来处理泛型和 glob 返回值的不确定性
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
			// 捕获原始标签名
			if (!originalTagNameRef.value) {
				originalTagNameRef.value = matchedTag;
			}

			const slug = path.split('/').at(-1)?.replace('.md', '') ?? '';

			// 构建 Item 对象并推入结果数组
			filteredItems.push({
				slug,
				tags,
				...metadata
			} as T);
		}
	}
	return filteredItems;
}

// --- SvelteKit load 函数 ---

export async function load({ params }: LoadEvent): Promise<TagLoadData> {
	const requestedSlug = params.slug;

	if (!requestedSlug) {
		throw error(404, 'Tag slug is missing.');
	}

	const originalTagNameRef: { value: string | undefined } = { value: undefined };

	// 1. 获取 Posts 集合中匹配的项
	const posts = filterCollection<Post>(
		'/src/collections/posts/*.md',
		requestedSlug,
		originalTagNameRef
	);

	// 2. 获取 Products 集合中匹配的项
	const products = filterCollection<Product>(
		'/src/collections/products/*.md',
		requestedSlug,
		originalTagNameRef
	);

	// 3. 检查是否有任何内容被找到
	if (posts.length === 0 && products.length === 0) {
		throw error(404, `Could not find any content for tag: ${requestedSlug}`);
	}

	// 4. 按日期降序排序 (在 load 中处理排序，减轻前端负担)
	posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
	products.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

	// 5. 导出已分类的数据
	return {
		name: originalTagNameRef.value ?? requestedSlug,
		slug: requestedSlug,
		posts, // 直接导出分类好的数组
		products // 直接导出分类好的数组
	};
}
