import { json } from '@sveltejs/kit';

export async function GET() {
	const posts = import.meta.glob('/src/collections/posts/*.md', { eager: true });

	const searchData = Object.entries(posts).map(([path, file]: [string, any]) => {
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

	return json(searchData);
}
