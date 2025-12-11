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
