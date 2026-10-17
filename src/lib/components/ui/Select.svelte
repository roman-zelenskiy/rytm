<script lang="ts" generics="V extends string">
	import { fly } from 'svelte/transition';
	import Icon from './Icon.svelte';

	/**
	 * Власний select: кнопка + список (role=listbox). Клавіатура: ↑↓ Home End, Enter/Space — вибір,
	 * Escape — закрити, перші літери — пошук. Замість нативного <select>, який не стилізується.
	 */
	let {
		value = $bindable(),
		options,
		id,
		label,
		class: cls = '',
		size = 'md'
	}: {
		value: V;
		options: { value: V; label: string }[];
		id: string;
		label: string;
		class?: string;
		size?: 'md' | 'lg';
	} = $props();

	let open = $state(false);
	let active = $state(0);
	let root: HTMLDivElement;
	let trigger: HTMLButtonElement;
	let list = $state<HTMLUListElement>();
	let typed = '';
	let typedTimer: ReturnType<typeof setTimeout>;

	const current = $derived(options.find((o) => o.value === value) ?? options[0]);

	function show() {
		active = Math.max(
			0,
			options.findIndex((o) => o.value === value)
		);
		open = true;
		queueMicrotask(() =>
			list?.querySelector<HTMLElement>(`#${id}-o${active}`)?.scrollIntoView({ block: 'nearest' })
		);
	}
	function close(focus = true) {
		open = false;
		if (focus) trigger.focus();
	}
	function pick(i: number) {
		value = options[i].value;
		close();
	}
	function move(i: number) {
		active = (i + options.length) % options.length;
		list?.querySelector<HTMLElement>(`#${id}-o${active}`)?.scrollIntoView({ block: 'nearest' });
	}
	function onKey(e: KeyboardEvent) {
		if (!open) {
			if (['ArrowDown', 'ArrowUp', 'Enter', ' '].includes(e.key)) {
				e.preventDefault();
				show();
			}
			return;
		}
		if (e.key === 'ArrowDown') move(active + 1);
		else if (e.key === 'ArrowUp') move(active - 1);
		else if (e.key === 'Home') move(0);
		else if (e.key === 'End') move(options.length - 1);
		else if (e.key === 'Enter' || e.key === ' ') pick(active);
		else if (e.key === 'Escape') close();
		else if (e.key === 'Tab') return close(false);
		else if (e.key.length === 1) {
			clearTimeout(typedTimer);
			typed += e.key.toLowerCase();
			typedTimer = setTimeout(() => (typed = ''), 600);
			const i = options.findIndex((o) => o.label.toLowerCase().startsWith(typed));
			if (i >= 0) move(i);
			return;
		} else return;
		e.preventDefault();
	}
</script>

<svelte:window onpointerdown={(e) => open && !root.contains(e.target as Node) && close(false)} />

<div class="sel-root relative {cls}" bind:this={root}>
	<button
		bind:this={trigger}
		{id}
		type="button"
		class="sel-btn"
		class:lg={size === 'lg'}
		class:open
		role="combobox"
		aria-haspopup="listbox"
		aria-expanded={open}
		aria-controls="{id}-list"
		aria-activedescendant={open ? `${id}-o${active}` : undefined}
		aria-label="{label}: {current?.label}"
		onclick={() => (open ? close() : show())}
		onkeydown={onKey}
	>
		<span class="truncate">{current?.label}</span>
		<Icon name="right" size={16} class="chev shrink-0 text-lime" />
	</button>
	{#if open}
		<ul
			bind:this={list}
			id="{id}-list"
			role="listbox"
			aria-label={label}
			class="sel-list"
			transition:fly={{ y: -6, duration: 140 }}
		>
			{#each options as o, i (o.value)}
				<!-- клавіатура обробляється на кнопці (aria-activedescendant) -->
				<!-- svelte-ignore a11y_click_events_have_key_events -->
				<li
					id="{id}-o{i}"
					role="option"
					aria-selected={o.value === value}
					class="sel-opt"
					class:active={i === active}
					onpointerenter={() => (active = i)}
					onclick={() => pick(i)}
				>
					{o.label}
				</li>
			{/each}
		</ul>
	{/if}
</div>

<style>
	.sel-btn {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 0.75rem;
		width: 100%;
		min-height: 2.9rem;
		padding: 0 0.9rem 0 1rem;
		background: var(--color-steel);
		color: var(--color-chalk);
		font-family: var(--font-display);
		font-weight: 900;
		font-size: 1.05rem;
		text-transform: uppercase;
		text-align: left;
		cursor: pointer;
		transition: background-color 0.15s;
	}
	.sel-btn.lg {
		min-height: 3.4rem;
		padding-left: 1rem;
		background: var(--color-coal);
		border: 2px solid var(--color-iron);
		font-family: var(--font-sans);
		font-weight: 400;
		font-size: inherit;
		text-transform: none;
		transition: border-color 0.2s;
	}
	.sel-btn:not(.lg):hover,
	.sel-btn:not(.lg).open {
		background: var(--color-iron);
	}
	.sel-btn.lg:hover {
		border-color: #55575e;
	}
	.sel-btn.lg.open,
	.sel-btn.lg:focus-visible {
		outline: none;
		border-color: var(--color-lime);
	}
	.sel-btn :global(.chev) {
		transform: rotate(90deg);
		transition: transform 0.2s var(--ease-punch);
	}
	.sel-btn.open :global(.chev) {
		transform: rotate(-90deg);
	}
	.sel-list {
		position: absolute;
		z-index: 40;
		top: calc(100% + 4px);
		left: 0;
		min-width: 100%;
		max-height: 18rem;
		overflow-y: auto;
		padding: 0.35rem;
		background: var(--color-coal);
		border: 2px solid var(--color-iron);
		box-shadow: 0 18px 40px rgb(0 0 0 / 0.55);
	}
	.sel-opt {
		padding: 0.7rem 0.85rem;
		font-weight: 600;
		white-space: nowrap;
		cursor: pointer;
	}
	.sel-opt.active {
		background: var(--color-steel);
		color: var(--color-lime);
	}
	.sel-opt[aria-selected='true'] {
		color: var(--color-lime);
		box-shadow: inset 4px 0 0 var(--color-lime);
	}
</style>
