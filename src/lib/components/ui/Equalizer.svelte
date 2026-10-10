<script lang="ts">
	import { beat } from '#lib/motion/beat.svelte.ts';

	/** Еквалайзер, що б’ється в такт метроному. Кожен біт — новий «удар» по смугах. */
	let { bars = 5, class: cls = '' }: { bars?: number; class?: string } = $props();

	// детермінований «рандом» на біт, щоб не смикати DOM зайвими обчисленнями
	const level = (i: number, n: number) => {
		const x = Math.sin((n + 1) * 12.9898 + i * 78.233) * 43758.5453;
		return 0.25 + (x - Math.floor(x)) * 0.75;
	};
</script>

<span class="eq {cls}" aria-hidden="true">
	{#each Array.from({ length: bars }, (_, i) => i) as i (i)}
		<span style:transform="scaleY({level(i, beat.count)})"></span>
	{/each}
</span>

<style>
	.eq {
		display: inline-flex;
		align-items: flex-end;
		gap: 3px;
		height: 18px;
	}
	.eq span {
		width: 4px;
		height: 100%;
		background: var(--color-lime);
		transform-origin: bottom;
		transition: transform 0.18s var(--ease-punch);
	}
	.eq span:nth-child(even) {
		background: var(--color-chalk);
	}
</style>
