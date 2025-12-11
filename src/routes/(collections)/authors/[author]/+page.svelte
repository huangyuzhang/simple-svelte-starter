<script lang="ts">
    import Github from "@lucide/svelte/icons/github";
    import Twitter from "@lucide/svelte/icons/twitter";
    import { Button } from "$lib/components/ui/button";
	import PostCard from "../../posts/post-card.svelte";
	import { site } from "$lib/config";
	import PostListItem from "./post-list-item.svelte";

    let { data } = $props();
</script>

<svelte:head>
    <title>{data.author.name} - {site.title}</title>
</svelte:head>

<div class="container mx-auto py-10 max-w-2xl px-4 md:px-0">
    <div class="flex flex-col items-center text-center mb-10">
        <img
            src={data.author.avatar}
            alt={data.author.name}
            class="h-24 w-24 rounded-full bg-muted mb-4"
        />
        <h1 class="text-3xl font-bold">{data.author.name}</h1>
        <p class="text-muted-foreground mt-2">{data.author.bio}</p>
        <div class="flex gap-2 mt-4">
            {#if data.author.twitter}
                <Button
                    variant="ghost"
                    size="icon"
                    href={data.author.twitter}
                    target="_blank"
                >
                    <Twitter class="h-4 w-4" />
                </Button>
            {/if}
            {#if data.author.github}
                <Button
                    variant="ghost"
                    size="icon"
                    href={data.author.github}
                    target="_blank"
                >
                    <Github class="h-4 w-4" />
                </Button>
            {/if}
        </div>
    </div>

    <h2 class="text-2xl font-bold mb-6">Posts by {data.author.name}</h2>
    {#if data.posts.length > 0}
        <div class="flex flex-col">
            {#each data.posts as post}
                <PostListItem {post} />
            {/each}
        </div>
    {:else}
        <p class="text-muted-foreground">No posts found by this author.</p>
    {/if}
</div>