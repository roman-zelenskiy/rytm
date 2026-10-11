<script lang="ts">
	import { Tween } from 'svelte/motion';
	import { cubicOut } from 'svelte/easing';
	import { plans, periods, type Period } from '#lib/content.ts';
	import { booking } from '#lib/booking.svelte.ts';
	import { reducedMotion } from '#lib/motion/env.ts';
	import { inview } from '#lib/motion/actions.ts';
	import SectionTitle from '#lib/components/ui/SectionTitle.svelte';
	import Button from '#lib/components/ui/Button.svelte';
	import Icon from '#lib/components/ui/Icon.svelte';

	let period = $state<Period>('month');
	const months: Record<Period, number> = { month: 1, quarter: 3, year: 12 };

	// Анімований перерахунок цін (svelte/motion Tween)
	const tweens = plans.map((p) => new Tween(p.price.month, { duration: 520, easing: cubicOut }));
	$effect(() => {
		const instant = reducedMotion();
		plans.forEach((p, i) => tweens[i].set(p.price[period], { duration: instant ? 0 : 520 }));
	});

	const fmt = (n: number) => Math.round(n).toLocaleString('uk-UA').replace(/\s/g, ' ');
	const idx = $derived(periods.findIndex((p) => p.id === period));
</script>

<section id="taryfy" aria-labelledby="taryfy-title" class="relative py-24 md:py-32">
	<div class="wrap">
		<div class="grid gap-8 lg:grid-cols-12 lg:items-end">
			<div class="lg:col-span-7">
				<SectionTitle eyebrow="Ціни без зірочок" title="Тарифи" id="taryfy-title" />
			</div>
			<div class="lg:col-span-5 lg:justify-self-end">
				<div
					role="radiogroup"
					aria-label="Період оплати"
					class="switch relative grid grid-cols-3 bg-coal p-1.5"
					style:--idx={idx}
				>
					<span class="puck" aria-hidden="true"></span>
					{#each periods as p (p.id)}
						<label class="opt" class:on={period === p.id}>
							<input type="radio" class="sr-only" name="period" value={p.id} bind:group={period} />
							{p.label}
							{#if p.note}<span class="note">{p.note}</span>{/if}
						</label>
					{/each}
				</div>
			</div>
		</div>

		<p class="sr-only" aria-live="polite">Ціни показано для періоду: {periods[idx].label}</p>
		<ul class="mt-14 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
			{#each plans as p, i (p.id)}
				<li
					class="plan flex flex-col p-7"
					class:featured={p.featured}
					use:inview={i * 80}
					data-rise
				>
					{#if p.featured}<span
							class="tag absolute top-0 right-6 -translate-y-1/2 bg-blaze px-3 py-2 text-void"
							>Хіт</span
						>{/if}
					<h3 class="mega text-5xl">{p.name}</h3>
					<p class="mt-1 text-sm opacity-80">{p.sub}</p>
					<p class="mt-6 flex items-baseline gap-2">
						<span class="mega text-7xl tabular-nums">{fmt(tweens[i].current)}</span>
						<span class="tag">грн{p.perMonth ? '/міс' : ''}</span>
					</p>
					<p class="mt-1 min-h-6 text-sm opacity-80">
						{#if p.perMonth && period !== 'month'}
							{fmt(p.price[period] * months[period])} грн за {period === 'year'
								? 'рік'
								: '3 місяці'} · економія {fmt((p.price.month - p.price[period]) * months[period])} грн
						{:else if !p.perMonth}
							ціна не залежить від періоду
						{/if}
					</p>
					<ul class="mt-6 grid flex-1 content-start gap-2.5">
						{#each p.features as f (f)}<li class="flex gap-2">
								<Icon name="check" size={18} class="mt-1 shrink-0" />{f}
							</li>{/each}
					</ul>
					<Button
						variant={p.featured ? 'ghost' : 'lime'}
						class="mt-8 w-full"
						onclick={() => booking.show()}>Почати з пробного</Button
					>
				</li>
			{/each}
		</ul>
		<p class="mt-6 text-sm text-ash">
			Перше тренування — безкоштовно для всіх тарифів. Оплата карткою, на рахунок ФОП або частинами
			до 6 місяців.
		</p>
	</div>
</section>

<style>
	.switch {
		clip-path: polygon(0.8rem 0, 100% 0, calc(100% - 0.8rem) 100%, 0 100%);
	}
	.puck {
		position: absolute;
		top: 0.375rem;
		bottom: 0.375rem;
		left: 0.375rem;
		width: calc((100% - 0.75rem) / 3);
		background: var(--color-lime);
		transform: translateX(calc(var(--idx) * 100%)) skewX(-14deg);
		transition: transform 0.4s var(--ease-snap);
	}
	.opt {
		position: relative;
		z-index: 1;
		display: grid;
		place-items: center;
		padding: 0.75rem 1rem;
		font-family: var(--font-display);
		font-weight: 900;
		font-size: 1.15rem;
		text-transform: uppercase;
		letter-spacing: 0.04em;
		cursor: pointer;
		transition: color 0.2s;
	}
	.opt.on {
		color: var(--color-void);
	}
	.opt:has(input:focus-visible) {
		outline: 3px solid var(--color-chalk);
		outline-offset: -4px;
	}
	.note {
		font-size: 0.75rem;
		line-height: 1;
		color: var(--color-lime);
	}
	.opt.on .note {
		color: var(--color-void);
	}
	.plan {
		position: relative;
		background: var(--color-coal);
		border-top: 4px solid var(--color-iron);
	}
	.plan :global(svg) {
		color: var(--color-lime);
	}
	.plan.featured {
		background: var(--color-lime);
		color: var(--color-void);
		border-top-color: var(--color-blaze);
	}
	.plan.featured :global(svg) {
		color: var(--color-void);
	}
	@media (min-width: 1280px) {
		.plan.featured {
			transform: translateY(-1.5rem) rotate(-1.2deg);
		}
		:global(.motion) .plan.featured[data-rise]:global(.is-in) {
			transform: translateY(-1.5rem) rotate(-1.2deg);
		}
	}
</style>
