async function getProducts() {
	const paths = import.meta.glob('/src/collections/products/*.md', { eager: true });

	const posts = Object.entries(paths).map(([path, file]) => {
		const slug = path.split('/').at(-1)?.replace('.md', '');
		const metadata = file.metadata;
		return { slug, ...metadata };
	});

	return posts.sort((a, b) => {
		return new Date(b.date).getTime() - new Date(a.date).getTime();
	});
}

export async function load() {
	const products = await getProducts();
	return { products };
}
