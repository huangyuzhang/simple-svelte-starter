<script lang="ts">
	import './layout.css';
	import favicon from '$lib/assets/favicon.svg';
  	import { ModeWatcher } from "mode-watcher";
	import 'nprogress/nprogress.css';
	import NProgress from 'nprogress';
	import { afterNavigate, beforeNavigate } from '$app/navigation';

	let { children } = $props();

	NProgress.configure({
		minimum: 0.16,
		easing: 'ease',
		showSpinner: false,
		speed: 500,
		trickleSpeed: 200
	});
	
	beforeNavigate(() => {
		// set NProgress color to primary
		const style = document.createElement('style');
		style.textContent = `
		#nprogress .bar {background: var(--primary) !important;}`;
		document.body.appendChild(style);
		// start NProgress
		NProgress.start();
	});

	afterNavigate(() => {
		NProgress.done();
	});
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<ModeWatcher />
{@render children()}
