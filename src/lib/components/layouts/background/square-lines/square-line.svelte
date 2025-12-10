<script lang="ts">
	import Square from "./square.svelte";
    let { class: className }:{ class: string | undefined } = $props();
</script>

<div
    class="relative flex w-full divide-x h-[30px] sm:h-[45px] md:h-[60px] xl:h-[88px] divide-neutral-300 dark:divide-neutral-700 divide-dashed"
>
    <Square class={className} />
    <Square class={className} />
    <Square class={className} />
    <Square class={className} />
    <Square class={className} />
    <Square class={className} />
    <Square class={className} />
    <Square class={className} />
    <Square class={className} />
</div>