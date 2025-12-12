import { error } from '@sveltejs/kit';

export async function load({ params }) {
	try {
		const post = await import(`../../../../collections/posts/${params.slug}.md`);

		return {
			...post.metadata,
			content: post.default
		};
	} catch (e) {
		throw error(404, `Could not find ${params.slug}`);
	}
}
