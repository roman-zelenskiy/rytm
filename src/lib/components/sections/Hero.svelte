<script lang="ts">
	import { onMount } from 'svelte';
	import { heroStats } from '#lib/content.ts';
	import { img } from '#lib/images.ts';
	import { booking } from '#lib/booking.svelte.ts';
	import { beat } from '#lib/motion/beat.svelte.ts';
	import { onVelocity } from '#lib/motion/velocity.ts';
	import { kinetic } from '#lib/motion/actions.ts';
	import { reducedMotion } from '#lib/motion/env.ts';
	import type { ImpactApi } from '#lib/webgl/impact.ts';
	import Button from '#lib/components/ui/Button.svelte';
	import Icon from '#lib/components/ui/Icon.svelte';

	let canvas: HTMLCanvasElement;
	let section: HTMLElement;
	let ready = $state(false);
	let fx: ImpactApi | null = null;

	// Точка «удару» на фото (координати UV, y — знизу вгору): рукавичка
	const glove: [number, number] = [0.32, 0.66];

	onMount(() => {
		if (reducedMotion()) return;
		let stop = () => {};
		let cancelled = false;
		// WebGL — після load та в простої, щоб не заважати LCP
		const start = async () => {
			const { mountImpact } = await import('#lib/webgl/impact.ts');
			if (cancelled) return;
			// текстура — той самий кадр, що вже завантажив <picture> (без зайвого запиту)
			const src = section.querySelector('img')?.currentSrc;
			if (!src) return;
			fx = await mountImpact(canvas, src, {
				focus: [0.42, 0.55],
				hitPos: glove,
				onReady: () => (ready = true)
			});
			if (!fx || cancelled) return;
			const unVel = onVelocity((v) => fx?.setVelocity(v / 30));
			let lastX = 0;
			let lastT = 0;
			const onMove = (e: PointerEvent) => {
				const t = performance.now();
				const speed = (e.clientX - lastX) / Math.max(16, t - lastT);
				lastX = e.clientX;
				lastT = t;
				fx?.setVelocity(speed * 0.8);
			};
			section.addEventListener('pointermove', onMove, { passive: true });
			stop = () => {
				unVel();
				section.removeEventListener('pointermove', onMove);
				fx?.dispose();
			};
		};
		const idle = () =>
			(window.requestIdleCallback ?? ((cb: () => void) => setTimeout(cb, 600)))(
				() => void start(),
				{ timeout: 2500 }
			);
		if (document.readyState === 'complete') idle();
		else addEventListener('load', idle, { once: true });
		return () => {
			cancelled = true;
			stop();
		};
	});

	// Ударна хвиля кожні 4 біти
	$effect(() => {
		if (beat.count > 0 && beat.count % 4 === 0) fx?.hit(...glove);
	});

	function punch(e: MouseEvent) {
		if (!fx) return;
		const r = section.getBoundingClientRect();
		fx.hit((e.clientX - r.left) / r.width, 1 - (e.clientY - r.top) / r.height);
	}
</script>

<section
	bind:this={section}
	id="top"
	aria-labelledby="hero-title"
	class="hero relative isolate flex min-h-[100svh] flex-col justify-end overflow-hidden pt-24 pb-10 md:pb-14"
>
	<div class="absolute inset-0 -z-10">
		<enhanced:img
			src={img.hero}
			alt="Боксер наносить удар у рукавичці — чорно-біле фото в русі"
			sizes="100vw"
			fetchpriority="high"
			loading="eager"
			class="h-full w-full object-cover object-[42%_45%]"
		/>
		<canvas
			bind:this={canvas}
			class="absolute inset-0 h-full w-full transition-opacity duration-500"
			class:opacity-0={!ready}
			aria-hidden="true"
			onclick={punch}
		></canvas>
		<div
			class="pointer-events-none absolute inset-0 bg-gradient-to-t from-void via-void/55 to-void/10"
		></div>
		<div class="grain pointer-events-none absolute inset-0 overflow-hidden"></div>
		<div
			class="slashline pointer-events-none absolute top-[18%] -right-[10%] h-3 w-[60%] bg-lime"
			aria-hidden="true"
		></div>
	</div>

	<div class="wrap">
		<h1 id="hero-title">
			<span class="tag text-lime"
				><span class="inline-block h-[3px] w-8 bg-lime" aria-hidden="true"></span>Фітнес-студія
				«Ритм» · Київ, Поділ</span
			>
			<span class="mega mt-4 block text-[clamp(4.6rem,21vw,21rem)]" use:kinetic>
				<span class="line block">Тренуйся</span>
				<span class="line line-2 block text-lime">в ритмі</span>
			</span>
		</h1>

		<div class="mt-6 grid gap-8 lg:mt-8 lg:grid-cols-12 lg:items-end">
			<div class="lg:col-span-6">
				<p class="mega text-[clamp(1.8rem,3.4vw,3.2rem)] leading-[0.95]">
					Перше тренування — <span class="text-lime">безкоштовно</span>.<br />Результат за 8 тижнів
					або повернемо гроші.
				</p>
				<p class="mt-4 max-w-xl text-ash">
					Функціональні тренування, бокс для початківців, стретчинг і персональний тренер у Києві.
					Міні-групи до 10 осіб — тренер бачить кожного.
				</p>
				<div class="mt-7 flex flex-wrap gap-3">
					<Button class="beat-btn" onclick={() => booking.show()}
						>Записатися на пробне <Icon name="arrow" /></Button
					>
					<Button variant="ghost" href="#kviz">Підібрати програму</Button>
				</div>
			</div>
			<dl class="grid grid-cols-2 gap-x-6 gap-y-5 sm:grid-cols-4 lg:col-span-6">
				{#each heroStats as s, i (s.label)}
					<div class="stat border-l-4 border-lime pl-3" style:--i={i}>
						<dt class="sr-only">{s.label}</dt>
						<dd class="mega text-5xl leading-none md:text-6xl">
							{s.value}<span class="ml-1 text-xl text-lime">{s.unit}</span>
						</dd>
						<dd aria-hidden="true" class="mt-1 text-sm text-ash">{s.label}</dd>
					</div>
				{/each}
			</dl>
		</div>
	</div>
</section>

<style>
	/* Поява hero — чистий CSS: заголовок видно навіть до гідратації (SSR) */
	:global(.motion) .line {
		animation: slash-in 0.6s var(--ease-punch) both;
	}
	:global(.motion) .line-2 {
		animation-delay: 0.12s;
	}
	:global(.motion) .slashline {
		animation: bar-in 0.7s var(--ease-punch) 0.3s both;
	}
	:global(.motion) .stat {
		animation: rise 0.5s var(--ease-punch) both;
		animation-delay: calc(0.35s + var(--i) * 70ms);
	}
	.slashline {
		transform: rotate(-12deg);
		transform-origin: right;
	}
	@keyframes slash-in {
		from {
			clip-path: polygon(0 0, 0 0, -12% 100%, -12% 100%);
		}
		to {
			clip-path: polygon(0 0, 112% 0, 100% 100%, -12% 100%);
		}
	}
	@keyframes bar-in {
		from {
			transform: rotate(-12deg) scaleX(0);
		}
	}
	@keyframes rise {
		from {
			opacity: 0;
			transform: translateY(14px);
		}
	}
</style>
