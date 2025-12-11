<script lang="ts">
	import { toggleMode } from 'mode-watcher';
	import { Button } from '$lib/components/ui/button/index.js';
	import { IconMoon, IconSun } from '@tabler/icons-svelte';
</script>

<Button onclick={toggleMode} variant="ghost" size="icon" class="cursor-pointer rounded-full">
	<IconSun class="transition-all! rotate-0 scale-100 dark:-rotate-90 dark:scale-0 duration-300" />
	<IconMoon
		class="transition-all! absolute rotate-90 scale-0 dark:rotate-0 dark:scale-100 duration-300"
	/>
	<span class="sr-only">Toggle theme</span>
</Button>
