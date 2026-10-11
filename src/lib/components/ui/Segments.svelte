<script lang="ts">
	import { beat } from '#lib/motion/beat.svelte.ts';
	import { reducedMotion } from '#lib/motion/env.ts';
	import { inview } from '#lib/motion/actions.ts';

	/**
	 * Сегментний «таймер раунду»: поділки загоряються ступенями — по одній на біт метронома,
	 * як табло боксерського годинника. Без плавного «накручування».
	 */
	let {
		total = 8,
		value = total,
		label,
		class: cls = ''
	}: { total?: number; value?: number; label: string; class?: string } = $props();

	let startBeat = $state<number | null>(null);
	let lit = $derived(
		startBeat === null
			? 0
			: startBeat === -Infinity
				? value
				: Math.min(value, beat.count - startBeat)
	);

	function arm(node: HTMLElement) {
		if (reducedMotion()) {
			startBeat = -Infinity;
			return;
		}
		const io = new IntersectionObserver(
			([e]) => {
				if (!e.isIntersecting) return;
				startBeat = beat.count;
				io.disconnect();
			},
			{ threshold: 0.6 }
		);
		io.observe(node);
		return { destroy: () => io.disconnect() };
	}
</script>

<div
	class="segments {cls}"
	role="meter"
	aria-label={label}
	aria-valuemin="0"
	aria-valuemax={total}
	aria-valuenow={value}
	use:arm
	use:inview
>
	{#each Array.from({ length: total }, (_, i) => i) as i (i)}
		<span class:on={i < lit}></span>
	{/each}
</div>

<style>
	.segments {
		display: grid;
		grid-auto-flow: column;
		grid-auto-columns: 1fr;
		gap: 4px;
		height: 14px;
	}
	.segments span {
		background: var(--color-iron);
		transform: skewX(-20deg);
		transition:
			background-color 0.12s linear,
			transform 0.25s var(--ease-snap);
	}
	.segments span.on {
		background: var(--color-lime);
		transform: skewX(-20deg) scaleY(1.25);
	}
</style>
