import { authors } from '$lib/config/index';
import { error } from '@sveltejs/kit';

export async function load({ params }) {
	const posts = import.meta.glob('/src/collections/posts/*.md', { eager: true });
	const authorSlug = params.slug;
	const author = authors[authorSlug];

	if (!author) {
		throw error(404, `Author ${authorSlug} not found`);
	}

	const authorPosts = Object.entries(posts)
		.map(([path, file]) => {
			const slug = path.split('/').at(-1)?.replace('.md', '');
			const metadata = file.metadata;
			return { slug, ...metadata };
		})
		.filter((post) => post.author === authorSlug)
		.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

	return {
		author,
		posts: authorPosts
	};
}
