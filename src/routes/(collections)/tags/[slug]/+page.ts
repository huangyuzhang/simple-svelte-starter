import type { Post } from '$lib/types/content';
import { getTagSlug } from '$lib/utils';
import { error, type LoadEvent } from '@sveltejs/kit';

// 定义 Markdown 元数据的预期结构，避免过多使用 any
interface PostMetadata {
	title: string;
	date: string;
	tags?: string[] | string;
	[key: string]: unknown;
}

type TagReturn = {
	name: string;
	slug: string;
	posts: Post[];
};

export async function load({ params }: LoadEvent): Promise<TagReturn> {
	const requestedSlug = params.slug;

	if (!requestedSlug) {
		throw error(404, 'Tag slug is missing.');
	}

	// 使用泛型指定 glob 的返回类型
	const modules = import.meta.glob<PostMetadata>('/src/collections/posts/*.md', {
		eager: true
	});

	const filteredPosts: Post[] = [];
	let originalTagName: string | undefined;

	// 使用 for...in 或 Object.entries 进行单次遍历
	for (const [path, module] of Object.entries(modules)) {
		const metadata = module.metadata;

		if (!metadata) {
			console.warn(`Skipping post ${path}: Missing metadata.`);
			continue;
		}

		// 标准化标签：统一转为 string[]
		const rawTags = metadata.tags;
		const tags: string[] = Array.isArray(rawTags)
			? rawTags.filter((t): t is string => typeof t === 'string' && t.length > 0)
			: typeof rawTags === 'string' && rawTags.length > 0
				? [rawTags]
				: [];

		// 检查当前文章是否包含目标 Tag Slug
		// 同时在这里捕获原始标签名（例如：匹配到了 "sveltekit" slug，记录原始名为 "SvelteKit"）
		const matchedTag = tags.find((tag) => getTagSlug(tag) === requestedSlug);

		if (matchedTag) {
			// 如果还没找到用于显示的原始标签名，则记录下来
			if (!originalTagName) {
				originalTagName = matchedTag;
			}

			const slug = path.split('/').at(-1)?.replace('.md', '') ?? '';

			// 构建 Post 对象并推入结果数组
			filteredPosts.push({
				slug,
				tags,
				...metadata
			} as Post);
		}
	}

	if (filteredPosts.length === 0) {
		throw error(404, `Could not find any posts for tag: ${requestedSlug}`);
	}

	// 按日期降序排序
	filteredPosts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

	return {
		// 如果这里依然是 undefined，说明虽然找到了文章但逻辑有漏网之鱼，兜底使用 params.slug
		name: originalTagName ?? requestedSlug,
		slug: requestedSlug,
		posts: filteredPosts
	};
}
