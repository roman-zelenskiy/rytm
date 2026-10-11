<script lang="ts">
	import { onMount, untrack } from 'svelte';
	import { stories, studio } from '#lib/content.ts';
	import { img } from '#lib/images.ts';
	import { beat } from '#lib/motion/beat.svelte.ts';
	import { reducedMotion } from '#lib/motion/env.ts';
	import SectionTitle from '#lib/components/ui/SectionTitle.svelte';
	import Icon from '#lib/components/ui/Icon.svelte';

	/**
	 * Відгуки у форматі «сторіз»: смужки прогресу заповнюються в ритмі метронома —
	 * 8 бітів на історію, ступенями, як відлік раунду.
	 */
	const BEATS = 8;
	let idx = $state(0);
	let ticks = $state(0);
	let paused = $state(false);
	let hover = $state(false);
	let focused = $state(false); // фокус усередині плеєра — теж пауза (WCAG 2.2.2)
	let visible = $state(false);
	let lastBeat = -1;
	let frame: HTMLElement;

	onMount(() => {
		if (reducedMotion()) paused = true;
		const io = new IntersectionObserver(([e]) => (visible = e.isIntersecting), { threshold: 0.4 });
		io.observe(frame);
		return () => io.disconnect();
	});

	// реагуємо лише на біт; решту стану читаємо без підписки
	$effect(() => {
		const b = beat.count;
		untrack(() => {
			if (b === lastBeat) return;
			lastBeat = b;
			if (paused || hover || focused || !visible) return;
			ticks += 1;
			if (ticks >= BEATS) go(1);
		});
	});

	function go(d: number) {
		idx = (idx + d + stories.length) % stories.length;
		ticks = 0;
	}

	function pick(i: number) {
		idx = i;
		ticks = 0;
	}

	function onkey(e: KeyboardEvent) {
		if (e.key === 'ArrowRight') go(1);
		else if (e.key === 'ArrowLeft') go(-1);
		else if (e.key === ' ' && e.target === frame) paused = !paused;
		else return;
		e.preventDefault();
	}
</script>

<section id="vidguky" aria-labelledby="vidguky-title" class="relative py-24 md:py-32">
	<div class="wrap grid gap-12 lg:grid-cols-12 lg:items-center">
		<div class="lg:col-span-6">
			<SectionTitle
				eyebrow="Відгуки"
				title="Сторіз"
				accent="наших"
				id="vidguky-title"
				size="clamp(3.6rem, 11vw, 10rem)"
			/>
			<div class="mt-8 flex items-center gap-5">
				<p class="mega text-7xl">{studio.rating.toString().replace('.', ',')}</p>
				<div>
					<p class="flex text-lime" role="img" aria-label="Рейтинг {studio.rating} з 5">
						{#each [1, 2, 3, 4, 5] as s (s)}<Icon name="star" size={18} />{/each}
					</p>
					<p class="mt-1 text-sm text-ash">{studio.reviewsCount} відгуків у Google</p>
				</div>
			</div>

			<ul class="mt-10 flex flex-wrap gap-4" aria-label="Обрати історію">
				{#each stories as s, i (s.id)}
					<li>
						<button
							type="button"
							class="ring"
							class:on={i === idx}
							aria-current={i === idx}
							aria-label="Історія: {s.name}"
							onclick={() => pick(i)}
						>
							<enhanced:img
								loading="lazy"
								src={img.stories[s.id]}
								alt=""
								sizes="64px"
								class="h-full w-full object-cover"
							/>
						</button>
					</li>
				{/each}
			</ul>
		</div>

		<div class="lg:col-span-5 lg:col-start-8">
			<!-- Регіон каруселі приймає стрілки з клавіатури, наведення лише ставить паузу -->
			<!-- svelte-ignore a11y_no_noninteractive_tabindex, a11y_no_noninteractive_element_interactions -->
			<div
				bind:this={frame}
				class="frame relative mx-auto aspect-[9/16] max-h-[78svh] w-full max-w-[420px] overflow-hidden bg-steel"
				role="region"
				aria-roledescription="сторіз"
				aria-label="Відгуки клієнтів"
				tabindex="0"
				onkeydown={onkey}
				onmouseenter={() => (hover = true)}
				onmouseleave={() => (hover = false)}
				onfocusin={() => (focused = true)}
				onfocusout={(e) => (focused = frame.contains(e.relatedTarget as Node | null))}
			>
				{#each stories as s, i (s.id)}
					<figure class="story absolute inset-0" class:active={i === idx} aria-hidden={i !== idx}>
						<enhanced:img
							loading="lazy"
							src={img.stories[s.id]}
							alt={s.alt}
							sizes="420px"
							class="h-full w-full object-cover"
						/>
						<div
							class="absolute inset-0 bg-gradient-to-b from-void/70 via-void/10 to-void/95"
						></div>
						<blockquote
							class="mega absolute inset-x-0 bottom-0 p-5 text-[clamp(1.35rem,6.4vw,2rem)] leading-[1.04] sm:p-6"
						>
							«{s.text}»
						</blockquote>
						<figcaption class="absolute inset-x-0 top-0 flex items-center gap-3 px-4 pt-8">
							<span class="tag bg-lime px-2 py-1 text-void">{s.dir}</span>
							<span class="font-semibold">{s.name}</span>
							<span class="text-sm text-chalk/80">{s.handle}</span>
						</figcaption>
					</figure>
				{/each}

				<!-- смужки прогресу: заповнюються ступенями в такт -->
				<div
					class="absolute inset-x-3 top-3 z-10 grid gap-1"
					style:grid-template-columns="repeat({stories.length}, 1fr)"
					aria-hidden="true"
				>
					{#each stories as s, i (s.id)}
						<span class="h-1 overflow-hidden bg-chalk/30">
							<span
								class="block h-full origin-left bg-lime transition-transform duration-150"
								style:transform="scaleX({i < idx ? 1 : i > idx ? 0 : ticks / BEATS})"
							></span>
						</span>
					{/each}
				</div>

				<button
					type="button"
					class="tap left-0"
					aria-label="Попередня історія"
					onclick={() => go(-1)}
				></button>
				<button
					type="button"
					class="tap right-0"
					aria-label="Наступна історія"
					onclick={() => go(1)}
				></button>
				<button
					type="button"
					class="absolute right-3 bottom-3 z-20 grid h-10 w-10 place-items-center bg-void/70 text-lime"
					aria-pressed={paused}
					aria-label={paused ? 'Відтворити' : 'Пауза'}
					onclick={() => (paused = !paused)}
				>
					<Icon name={paused ? 'play' : 'pause'} size={18} />
				</button>
			</div>
			<p class="mt-3 text-center text-sm text-ash">
				{idx + 1} / {stories.length} · стрілки ← → або тап по краях
			</p>
		</div>
	</div>
</section>

<style>
	.frame {
		clip-path: polygon(0 0, 100% 0, 100% calc(100% - 1.5rem), calc(100% - 1.5rem) 100%, 0 100%);
	}
	.story {
		opacity: 0;
		transform: scale(1.06);
		transition:
			opacity 0.25s,
			transform 0.5s var(--ease-punch);
	}
	.story.active {
		opacity: 1;
		transform: none;
	}
	.tap {
		position: absolute;
		top: 15%;
		bottom: 20%;
		z-index: 15;
		width: 35%;
	}
	.tap:focus-visible {
		outline-offset: -4px;
	}
	.ring {
		display: block;
		width: 4rem;
		height: 4rem;
		padding: 3px;
		border-radius: 999px;
		background: var(--color-iron);
		overflow: hidden;
		transition: transform 0.2s var(--ease-snap);
	}
	.ring :global(img) {
		border-radius: 999px;
	}
	.ring.on {
		background: conic-gradient(var(--color-lime), var(--color-blaze), var(--color-lime));
		transform: scale(1.1);
	}
	.ring:active {
		transform: scale(0.92);
	}
</style>
