export const authors = {
	simon: {
		name: 'Simon Huang',
		bio: 'Frontend Developer & UI/UX Enthusiast',
		avatar: 'https://github.com/huangyuzhang.png',
		github: 'https://github.com/huangyuzhang'
	}
};

export type Author = keyof typeof authors;
