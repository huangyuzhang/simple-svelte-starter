import { m } from '$lib/paraglide/messages';
import { IconBrandGithub, IconBrandInstagram, IconBrandX } from '@tabler/icons-svelte';

const site = {
	title: 'Simple Svelte Starter',
	description: 'A starter template built with SvelteKit, Tailwind CSS and more',
	url: 'https://github.com/huangyuzhang/svelte-starter',
	author: 'Simon Huang'
};

const layout = {
	headerWidth: 'max-w-6xl',
	footerWidth: 'max-w-6xl',
	baseWidth: 'max-w-5xl',
	wideWidth: 'max-w-6xl'
};

const nav = {
	main: [
		{
			name: m.nav_home(),
			url: '/'
		},
		{
			name: m.nav_posts(),
			url: '/posts'
		},
		{
			name: m.nav_products(),
			url: '#'
		},
		{
			name: m.nav_about(),
			url: '/about'
		}
	],
	footer: [
		{
			icon: IconBrandGithub,
			url: 'https://github.com/huangyuzhang/svelte-starter'
		},
		{
			icon: IconBrandX,
			url: '#'
		},
		{
			icon: IconBrandInstagram,
			url: '#'
		}
	]
};

export { site, layout, nav };
