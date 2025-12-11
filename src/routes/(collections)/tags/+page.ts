import { getTagSlug } from '$lib/utils';

async function getTags() {
	const paths = import.meta.glob('/src/collections/posts/*.md', { eager: true });

	const posts = Object.entries(paths).map(([path, file]) => {
		const slug = path.split('/').at(-1)?.replace('.md', '');
		const metadata = file.metadata;
		const tags = metadata.tags || [];
		return { slug, ...metadata, tags };
	});

	const uniqueTags = [
		...new Set(
			posts
				.map((post) => post.tags)
				.flat()
				.filter((tag): tag is string => typeof tag === 'string' && tag.length > 0)
		)
	];

	return uniqueTags.map((tag) => {
		// const filteredPosts = posts.filter((post: any) => post.tags.includes(tag));
		return {
			slug: getTagSlug(tag),
			name: tag
			// posts: filteredPosts
		};
	});
}

export async function load() {
	const tags = await getTags();
	return { tags };
}
