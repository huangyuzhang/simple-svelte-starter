import { error } from '@sveltejs/kit';

export async function load({ params }) {
	try {
		const product = await import(`../../../../collections/products/${params.slug}.md`);

		return {
			...product.metadata,
			content: product.default
		};
	} catch (e) {
		throw error(404, `Could not find ${params.slug}`);
	}
}
