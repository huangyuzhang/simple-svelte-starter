<script lang="ts">
	import { nav } from '$lib/config/index';
	import * as Sheet from '$lib/components/ui/sheet';
	import { IconMenu2, IconX } from '@tabler/icons-svelte';
	import { m } from '$lib/paraglide/messages';
	let open = $state(false);
</script>

<Sheet.Root bind:open>
	<Sheet.Trigger>
		<IconMenu2 class={open ? 'hidden' : 'size-4'} />
		<IconX class={open ? 'size-4' : 'hidden'} />
	</Sheet.Trigger>
	<Sheet.Content>
		<Sheet.Header>
			<Sheet.Title>{m.navigation()}</Sheet.Title>
			<Sheet.Description></Sheet.Description>
		</Sheet.Header>
		{#each nav.main as menu}
			<a
				href={menu.url}
				class="relative flex items-center justify-center px-3 py-2 font-medium tracking-wide text-center duration-200 ease-out sm:py-0 hover:text-neutral-900 dark:hover:text-white"
			>
				{menu.name}
			</a>
		{/each}
	</Sheet.Content>
</Sheet.Root>
