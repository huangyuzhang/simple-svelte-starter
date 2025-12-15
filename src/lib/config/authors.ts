export const authors: Record<string, Author> = {
	simon: {
		name: 'Simon Huang',
		bio: 'Data Analyst, Indie Maker, Open Source Enthusiast',
		avatar: 'https://github.com/huangyuzhang.png',
		github: 'https://github.com/huangyuzhang'
	}
};

export type Author = {
	name: string;
	bio?: string;
	avatar?: string;
	github?: string;
	twitter?: string;
};
