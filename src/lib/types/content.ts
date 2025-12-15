export interface Post {
	icon?: string;
	slug: string | null;
	locale: string;
	date: string;
	title: string;
	seoTitle?: string;
	category: string;
	tags: string[];
	published: boolean;
	excerpt?: string;
	content: any;
	image?: string;
}
export interface Product {
	icon?: string;
	slug: string | null;
	locale: string;
	date: string;
	title: string;
	seoTitle?: string;
	category: string;
	tags: string[];
	published: boolean;
	excerpt?: string;
	content: any;
	image?: string;
}

export interface Tag {
	slug: string; // lower-cased, hyphenated version (e.g., 'java-script')
	name: string; // Original tag name (e.g., 'JavaScript')
	count: number;
	posts?: Post[];
	products?: Product[];
}
