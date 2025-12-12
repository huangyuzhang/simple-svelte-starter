<script lang="ts">
	import { cn } from '$lib/utils';
	import ModeToggle from '$lib/components/mode-toggle.svelte';
	import Logo from '$lib/components/layouts/logo.svelte';
	import I18nToggle from '../i18n-toggle.svelte';
	import { layout } from '$lib/config/index';
	import Navigation from './navigation.svelte';
	import MobileNav from './mobile-nav.svelte';
	import { isMobile } from '$lib/hooks/isMobile';
	import SearchDialog from './search-dialog.svelte';

	let { headerWidth = layout.headerWidth } = $props();

	const mobile = isMobile();

	let isScrolled = $state(false);

	const unScrolledContainerClasses = ['border-transparent'];
	const scrolledContainerClasses = [
		'border-neutral-300/50',
		'bg-white/80',
		'dark:border-neutral-600/40',
		'dark:bg-neutral-900/60',
		'backdrop-blur-2xl',
		'shadow'
	];

	const evaluateHeaderPosition = () => {
		// browser only
		if (typeof window !== 'undefined') {
			isScrolled = window.scrollY > 16;
		}
	};

	$effect(() => {
		// browser only
		if (typeof window !== 'undefined') {
			// evaluate header position immediately after the component is mounted
			evaluateHeaderPosition();
			window.addEventListener('scroll', evaluateHeaderPosition, { passive: true });
		}

		return () => {
			if (typeof window !== 'undefined') {
				window.removeEventListener('scroll', evaluateHeaderPosition);
			}
		};
	});
</script>

<!-- a placeholder for reserving space for the header -->
<div class="w-full h-20 opacity-0 pointer-events-none"></div>

<header
	id="header"
	class="fixed top-0 z-50 w-full duration-300 ease-out"
	class:h-20={!isScrolled}
	class:h-14={isScrolled}
>
	<div
		class={cn(
			headerWidth,
			'flex items-center justify-between h-full pl-6 pr-4 mx-auto border-b border-l-0 border-r-0 select-none lg:border-r lg:border-l lg:rounded-b-xl duration-300 ease-out',
			isScrolled ? scrolledContainerClasses.join(' ') : unScrolledContainerClasses.join(' ')
		)}
	>
		<Logo />
		<div class="flex items-center gap-1">
			{#if !$mobile}
				<Navigation />
			{/if}
			<SearchDialog />
			<I18nToggle />
			<ModeToggle />
			{#if $mobile}
				<MobileNav />
			{/if}
		</div>
	</div>
</header>
