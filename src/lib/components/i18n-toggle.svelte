<script lang="ts">
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu';
	import { buttonVariants } from '$lib/components/ui/button';
	import { getLocale, setLocale } from '$lib/paraglide/runtime';
	import { m } from '$lib/paraglide/messages';
	import { IconLanguage } from '@tabler/icons-svelte';
	import { cn } from '$lib/utils';

	const locale = getLocale();

	const languages: Array<{ name: string; code: 'en' | 'zh' }> = [
		{
			name: 'English',
			code: 'en'
		},
		{
			name: '中文',
			code: 'zh'
		}
	];
</script>

<DropdownMenu.Root>
	<DropdownMenu.Trigger
		class={buttonVariants({
			variant: 'ghost',
			size: 'icon',
			class: 'cursor-pointer rounded-full'
		})}
	>
		<IconLanguage class="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 !transition-all" />
		<span class="sr-only">{m.change_languages()}</span>
	</DropdownMenu.Trigger>
	<DropdownMenu.Content align="end">
		{#each languages as lang}
			<DropdownMenu.CheckboxItem
				bind:checked={
					() => {
						return lang.code === locale;
					},
					() => {}
				}
				disabled={lang.code === locale}
				onclick={async () => {
					await setLocale(lang.code);
					// if (user) handleClientReport('info', 'switch language', 'en');
				}}
				class={cn(lang.code != locale ? 'cursor-pointer' : '')}
			>
				{lang.name}
				<DropdownMenu.Shortcut>{lang.code}</DropdownMenu.Shortcut>
			</DropdownMenu.CheckboxItem>
		{/each}
	</DropdownMenu.Content>
</DropdownMenu.Root>
