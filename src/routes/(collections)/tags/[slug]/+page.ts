import type { Post } from '$lib/types/content';
import { error, type ServerLoadEvent } from '@sveltejs/kit';

type Tag = {
	slug: string;
	name: string;
	posts: Post[];
};
async function getPosts(): Promise<Post[]> {
	const paths = import.meta.glob<Record<string, any>, string>('/src/collections/posts/*.md', {
		eager: true
	});

	const posts: Post[] = Object.entries(paths).map(([path, file]) => {
		const slug = path.split('/').at(-1)?.replace('.md', '');
		const metadata = file.metadata as Record<string, any>;

		let tags: string[] = [];
		if (Array.isArray(metadata.tags)) {
			tags = metadata.tags.filter(
				(tag): tag is string => typeof tag === 'string' && tag.length > 0
			);
		} else if (typeof metadata.tags === 'string') {
			tags = [metadata.tags];
		}

		return { slug, tags, ...metadata } as Post;
	});

	return posts.sort((a, b) => {
		return new Date(b.date).getTime() - new Date(a.date).getTime();
	});
}

async function getTags(): Promise<Tag[]> {
	const posts = await getPosts();

	const uniqueTagsMap = new Map<string, string>();

	posts.forEach((post) => {
		post.tags.forEach((originalTag) => {
			const slug = originalTag.toLowerCase().replace(/ /g, '-');
			if (!uniqueTagsMap.has(slug)) {
				uniqueTagsMap.set(slug, originalTag);
			}
		});
	});

	const tags: Tag[] = Array.from(uniqueTagsMap.entries()).map(([slug, name]) => {
		const filteredPosts = posts.filter((post) => {
			return post.tags.some((postTag) => postTag.toLowerCase().replace(/ /g, '-') === slug);
		});

		return {
			slug: slug,
			name: name,
			posts: filteredPosts
		};
	});

	return tags;
}
export async function load({ params }: ServerLoadEvent): Promise<{ tag: Tag }> {
	const slug = params.slug;
	try {
		const tags = await getTags();
		const foundTag = tags.find((tag) => tag.slug === slug);
		if (!foundTag) {
			throw error(404, `Could not find tag with slug: ${slug}`);
		}
		return { tag: foundTag };
	} catch (e) {
		console.error('Error loading tags:', e);
		throw error(404, `Could not find ${slug}`);
	}
}
