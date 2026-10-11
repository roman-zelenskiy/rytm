<script lang="ts">
	import type { Snippet } from 'svelte';
	import { Spring } from 'svelte/motion';
	import type { HTMLAnchorAttributes, HTMLButtonAttributes } from 'svelte/elements';

	type Common = { variant?: 'lime' | 'ghost'; class?: string; children: Snippet };
	type Props = Common &
		((HTMLButtonAttributes & { href?: undefined }) | (HTMLAnchorAttributes & { href: string }));

	let { variant = 'lime', class: cls = '', children, ...rest }: Props = $props();

	// «Пружинна» реакція на натискання: стискаємось і відскакуємо з перельотом
	const press = new Spring(1, { stiffness: 0.25, damping: 0.28 });
	const down = () => press.set(0.92);
	const up = () => press.set(1);
</script>

{#if rest.href !== undefined}
	<a
		{...rest as HTMLAnchorAttributes}
		class="btn btn-{variant} {cls}"
		style:transform="scale({press.current})"
		onpointerdown={down}
		onpointerup={up}
		onpointerleave={up}>{@render children()}</a
	>
{:else}
	<button
		type="button"
		{...rest as HTMLButtonAttributes}
		class="btn btn-{variant} {cls}"
		style:transform="scale({press.current})"
		onpointerdown={down}
		onpointerup={up}
		onpointerleave={up}>{@render children()}</button
	>
{/if}
