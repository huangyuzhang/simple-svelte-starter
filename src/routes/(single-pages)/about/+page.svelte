<script>
	import { site } from "$lib/config";
	import { Button } from "$lib/components/ui/button";
</script>

<svelte:head>
	<title>About Us - {site.title}</title>
</svelte:head>

<!-- Page Header -->
<section class="relative overflow-hidden px-4 my-8 sm:px-6 lg:px-8">
    <div class="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <!-- Title & Description -->
        <div>
            <h1 class="text-3xl font-bold tracking-tight">About Us</h1>
            <p class="text-muted-foreground">Read our stories.</p>
        </div>
        <!-- Action Button -->
        <Button>Contact Us</Button>
    </div>
</section>

<!-- Page Content -->
<section class="relative overflow-hidden px-4 my-8 sm:px-6 lg:px-8">
    Hello there, this is the about page.
</section>
