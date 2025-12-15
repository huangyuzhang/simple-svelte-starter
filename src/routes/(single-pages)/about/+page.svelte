<script>
	import { site } from '$lib/config/index';
	import { Button } from '$lib/components/ui/button';
	import { m } from '$lib/paraglide/messages';
	import { getLocale } from '$lib/paraglide/runtime';

	const locale = getLocale();

	const content = {
		en: {
			title: 'About Us',
			description: 'Read our stories.'
		},
		zh: {
			title: '关于我们',
			description: '阅读我们的故事。'
		}
	};
</script>

<svelte:head>
	<title>{content[locale].title} - {site.title}</title>
</svelte:head>

<!-- Page Header -->
<section class="relative overflow-hidden px-4 my-8 sm:px-6 lg:px-8">
	<div class="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
		<!-- Title & Description -->
		<div>
			<h1 class="text-3xl font-bold tracking-tight">{content[locale].title}</h1>
			<p class="text-muted-foreground">{content[locale].description}</p>
		</div>
		<!-- Action Button -->
		<Button>{m.btn_contact_us()}</Button>
	</div>
</section>

<!-- Page Content -->
<section class="relative overflow-hidden px-4 my-8 sm:px-6 lg:px-8">
	Hello there, this is the about page.
</section>
