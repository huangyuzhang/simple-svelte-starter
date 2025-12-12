import { m } from '$lib/paraglide/messages';
import { IconBrandGithub, IconBrandInstagram, IconBrandX } from '@tabler/icons-svelte';

export const nav = {
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
			name: m.nav_tags(),
			url: '/tags'
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
