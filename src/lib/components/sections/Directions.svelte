<script lang="ts">
	import { onMount } from 'svelte';
	import { directions } from '#lib/content.ts';
	import { img } from '#lib/images.ts';
	import { booking } from '#lib/booking.svelte.ts';
	import { inview, kinetic } from '#lib/motion/actions.ts';
	import { reducedMotion } from '#lib/motion/env.ts';
	import SectionTitle from '#lib/components/ui/SectionTitle.svelte';
	import Button from '#lib/components/ui/Button.svelte';
	import Icon from '#lib/components/ui/Icon.svelte';

	const bookingName: Record<(typeof directions)[number]['id'], string> = {
		functional: 'Функціональний тренінг',
		boxing: 'Бокс',
		stretching: 'Стретчинг',
		personal: 'Персональне тренування'
	};

	let root: HTMLElement;

	onMount(() => {
		if (reducedMotion()) return;
		let ctx: { revert: () => void } | undefined;
		let cancelled = false;
		// GSAP + ScrollTrigger вантажимо лише тоді, коли секція поруч
		const io = new IntersectionObserver(async ([e]) => {
			if (!e.isIntersecting) return;
			io.disconnect();
			const [{ gsap }, { ScrollTrigger }] = await Promise.all([import('gsap'), import('gsap/ScrollTrigger')]);
			if (cancelled) return;
			gsap.registerPlugin(ScrollTrigger);
			ctx = gsap.context(() => {
				root.querySelectorAll<HTMLElement>('.photo').forEach((el) => {
					gsap.fromTo(el, { yPercent: -6, scale: 1.12 }, { yPercent: 6, scale: 1.12, ease: 'none', scrollTrigger: { trigger: el.parentElement, start: 'top bottom', end: 'bottom top', scrub: true } });
				});
			}, root);
		}, { rootMargin: '400px' });
		io.observe(root);
		return () => {
			cancelled = true;
			io.disconnect();
			ctx?.revert();
		};
	});
</script>

<section bind:this={root} id="napriamy" aria-labelledby="napriamy-title" class="relative py-24 md:py-32">
	<div class="wrap">
		<SectionTitle eyebrow="Напрями" title="Обери" accent="свій ритм" id="napriamy-title" />
	</div>

	<div class="mt-12 md:mt-20">
		{#each directions as d, i (d.id)}
			{@const flip = i % 2 === 1}
			<article class="block-dir relative isolate overflow-hidden lg:min-h-[92svh]" class:flip aria-labelledby="dir-{d.id}">
				<div class={['media relative h-[62svh] overflow-hidden lg:absolute lg:inset-y-0 lg:h-auto lg:w-[64%]', flip ? 'lg:left-0' : 'lg:right-0']} use:inview data-slash>
					<div class="photo absolute inset-0">
						<enhanced:img src={img.directions[d.id]} alt={d.alt} sizes="(min-width: 1024px) 64vw, 100vw" class="h-full w-full object-cover" />
					</div>
					<div class="grain absolute inset-0 overflow-hidden"></div>
					<div class="absolute inset-0 bg-gradient-to-t from-void/80 via-transparent to-transparent lg:hidden"></div>
				</div>

				<p class="giant mega pointer-events-none absolute right-0 left-0 z-10 select-none" class:text-right={!flip} aria-hidden="true">
					<span class="inline-block" use:kinetic={1.4}>{d.title}</span>
				</p>

				<div class={['wrap relative z-20 -mt-24 lg:mt-0 lg:flex lg:min-h-[92svh] lg:items-center', flip && 'lg:justify-end']}>
					<div class="panel relative bg-coal p-6 md:p-10 lg:w-[44%]" use:inview={120} data-rise>
						<div class="flex items-center justify-between gap-4">
							<span class="tag text-ash">0{i + 1} / 0{directions.length}</span>
							<span class="tag text-lime">від {d.priceFrom} грн</span>
						</div>
						<h3 id="dir-{d.id}" class="mega mt-5 text-[clamp(2.3rem,10.5vw,3.75rem)] hyphens-auto" lang="uk">{d.short}</h3>
						<p class="mt-4 text-[1.05rem] text-chalk/90">{d.lead}</p>
						<p class="mt-4 border-l-4 border-blaze pl-3 text-ash"><strong class="text-chalk">Кому:</strong> {d.forWhom}</p>
						<ul class="mt-5 grid gap-2">
							{#each d.points as p (p)}<li class="flex gap-2"><Icon name="bolt" size={18} class="mt-1 shrink-0 text-lime" />{p}</li>{/each}
						</ul>
						<div class="mt-6 flex flex-wrap items-center gap-x-8 gap-y-4 border-t border-steel pt-5">
							<p class="tag text-ash">⏱ {d.duration}</p>
							<div class="flex items-center gap-3">
								<span class="tag text-ash">Інтенсивність</span>
								<span class="flex gap-1" role="img" aria-label="Інтенсивність {d.intensity} з 5">
									{#each [1, 2, 3, 4, 5] as n (n)}<span class="h-4 w-2 -skew-x-[20deg] {n <= d.intensity ? 'bg-lime' : 'bg-iron'}"></span>{/each}
								</span>
							</div>
						</div>
						<Button class="mt-7" onclick={() => booking.show(bookingName[d.id])}>Спробувати безкоштовно</Button>
					</div>
				</div>
			</article>
		{/each}
	</div>
</section>

<style>
	.block-dir + .block-dir {
		margin-top: 2rem;
	}
	@media (min-width: 1024px) {
		.block-dir + .block-dir {
			margin-top: 0;
		}
		/* діагональний зріз фото */
		.media {
			clip-path: polygon(14% 0, 100% 0, 100% 100%, 0 100%);
		}
		.flip .media {
			clip-path: polygon(0 0, 100% 0, 86% 100%, 0 100%);
		}
		:global(.motion) .media[data-slash] {
			clip-path: polygon(14% 0, 14% 0, 0 100%, 0 100%);
		}
		:global(.motion) .media[data-slash]:global(.is-in) {
			clip-path: polygon(14% 0, 100% 0, 100% 100%, 0 100%);
		}
		:global(.motion) .flip .media[data-slash] {
			clip-path: polygon(0 0, 0 0, 0 100%, 0 100%);
		}
		:global(.motion) .flip .media[data-slash]:global(.is-in) {
			clip-path: polygon(0 0, 100% 0, 86% 100%, 0 100%);
		}
	}
	.giant {
		bottom: 2%;
		font-size: clamp(5rem, 24vw, 24rem);
		line-height: 0.8;
		color: transparent;
		-webkit-text-stroke: 2px rgb(244 244 240 / 0.55);
	}
	.panel {
		clip-path: polygon(0 0, 100% 0, 100% calc(100% - 2rem), calc(100% - 2rem) 100%, 0 100%);
	}
</style>
