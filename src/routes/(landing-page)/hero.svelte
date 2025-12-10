<script>
	import { Button } from "$lib/components/ui/button";
	import { fade, fly } from "svelte/transition";
</script>

<!-- Hero Section -->
	<section class="relative overflow-hidden px-4 py-16 sm:px-6 lg:px-8">
		<div class="container mx-auto">
			<div class="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
				<!-- Text Content -->
				<div
					class="order-2 flex flex-col items-center text-center lg:order-1 lg:items-start lg:text-left"
					in:fade={{ duration: 1000 }}
				>
					<h1 class="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
						Innovate.<br />
						Transform.<br />
						Succeed.
					</h1>
					<p class="mt-6 text-lg leading-relaxed text-muted-foreground">
						We help businesses grow through strategic consulting, innovative solutions, and proven
						methodologies. Let's build your success story together.
					</p>
					<div class="mt-8 flex flex-col space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0">
						<Button size="lg">Schedule Consultation</Button>
						<Button variant="outline" size="lg">Our Services</Button>
					</div>
				</div>

				<!-- Image -->
				<div class="order-1 lg:order-2" in:fly={{ y: 50, duration: 1000 }}>
					<div class="relative mx-auto max-w-[500px]">
						<div class="aspect-square overflow-hidden rounded-2xl bg-muted">
							<img
								src="https://placehold.co/600x600/ccc/777?font=noto-sans&text=Svelte"
								alt="Placeholder"
								class="h-full w-full object-cover"
							/>
						</div>
						<div
							class="absolute -bottom-4 -right-4 h-full w-full rounded-2xl border-6 border-dashed border-muted"
						></div>
					</div>
				</div>
			</div>
		</div>
	</section>