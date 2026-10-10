<script lang="ts">
	import { kinetic, inview } from '#lib/motion/actions.ts';

	/**
	 * Гігантський заголовок секції: розміри на всю ширину, кінетика від швидкості скролу
	 * та поява діагональним «розрізом». `accent` — слово, підсвічене лаймом.
	 */
	let {
		eyebrow,
		title,
		accent = '',
		id,
		size = 'clamp(3.6rem, 13vw, 13.5rem)',
		level = 'h2'
	}: { eyebrow: string; title: string; accent?: string; id?: string; size?: string; level?: 'h2' | 'h3' } = $props();
</script>

<p class="tag text-lime" use:inview data-rise>
	<span class="inline-block h-[3px] w-8 bg-lime" aria-hidden="true"></span>{eyebrow}
</p>
<svelte:element this={level} {id} class="mega mt-4" style:font-size={size}>
	<span class="block origin-left will-change-transform" use:kinetic>
		<span class="block" use:inview data-slash>{title}</span>
		{#if accent}<span class="block text-lime" use:inview={90} data-slash>{accent}</span>{/if}
	</span>
</svelte:element>
