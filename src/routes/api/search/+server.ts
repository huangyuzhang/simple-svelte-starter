import { json } from '@sveltejs/kit';

export async function GET() {
	const posts = import.meta.glob('/src/collections/posts/*.md', { eager: true });
	const products = import.meta.glob('/src/collections/products/*.md', { eager: true });

	const postsResult = Object.entries(posts).map(([path, file]: [string, any]) => {
		const slug = path.split('/').at(-1)?.replace('.md', '');
		const metadata = file.metadata;
		return {
			slug,
			title: metadata.title,
			excerpt: metadata.excerpt,
			tags: metadata.tags,
			date: metadata.date
		};
	});
	const productsResult = Object.entries(products).map(([path, file]: [string, any]) => {
		const slug = path.split('/').at(-1)?.replace('.md', '');
		const metadata = file.metadata;
		return {
			slug,
			title: metadata.title,
			excerpt: metadata.excerpt,
			tags: metadata.tags,
			date: metadata.date
		};
	});

	return json({ posts: postsResult, products: productsResult });
}
