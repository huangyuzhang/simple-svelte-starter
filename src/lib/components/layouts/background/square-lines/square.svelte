<script lang="ts">
	let { class: className }: { class: string | undefined } = $props();
</script>

<div class="w-full h-auto bg-white dark:bg-neutral-950 aspect-square {className}"></div>
