<script>
	import { Button } from '$lib/components/ui/button';
	import { getLocale } from '$lib/paraglide/runtime';
	import IllustrationCelebration from '$lib/assets/illustrations/celebration.svg';
	import { fade, fly } from 'svelte/transition';
	const locale = getLocale();
	const data = {
		en: {
			title: 'Innovate. <br />Transform. <br /> Succeed.',
			subtitle:
				"We help businesses grow through strategic consulting, innovative solutions, and proven methodologies. Let's build your success story together.",
			btn_query: 'Schedule Consultation',
			btn_services: 'Our Products',
			link_contact: '/contact',
			link_services: '/products'
		},
		zh: {
			title: '勇于创新💡 <br /> 精研创造🔧 <br /> 获得成功🏖',
			subtitle:
				'我们通过战略咨询、 创新的解决方案和已被验证可行的方法论帮助企业持续增长。 让我们一起创造属于您的成功故事。',
			btn_query: '预约咨询',
			btn_services: '服务项目',
			link_contact: '/contact',
			link_services: '/products'
		}
	};
</script>

<!-- Hero Section -->
<section class="relative overflow-hidden px-4 py-16 sm:px-6 lg:px-8">
	<div class="container mx-auto">
		<div class="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
			<!-- Text Content -->
			<div
				class="order-1 flex flex-col items-center text-center lg:order-1 lg:items-start lg:text-left"
				in:fade={{ duration: 1000 }}
			>
				<h1 class="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
					{@html data[locale].title}
				</h1>
				<p class="mt-6 text-lg leading-relaxed text-muted-foreground">
					{@html data[locale].subtitle}
				</p>
				<div class="mt-8 flex flex-col space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0">
					<Button size="lg" href={data[locale].link_contact}>
						{data[locale].btn_query}
					</Button>
					<Button variant="outline" size="lg" href={data[locale].link_services}>
						{data[locale].btn_services}
					</Button>
				</div>
			</div>

			<!-- Image -->
			<div class="order-2 lg:order-2 hidden sm:block" in:fly={{ y: 50, duration: 1000 }}>
				<div class="relative mx-auto max-w-[500px]">
					<div class="aspect-square overflow-hidden rounded-2xl">
						<enhanced:img loading="lazy" src={IllustrationCelebration} alt="Placeholder" class="size-full object-cover" />
					</div>
					<div
						class="absolute -bottom-4 -right-4 size-full rounded-2xl border-0 border-dashed border-muted"
					></div>
				</div>
			</div>
		</div>
	</div>
</section>
