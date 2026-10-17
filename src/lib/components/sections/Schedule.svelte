<script lang="ts">
	import { flip } from 'svelte/animate';
	import { fade, scale } from 'svelte/transition';
	import {
		schedule,
		coaches,
		days,
		daysFull,
		directionLabel,
		bookingDirections,
		t,
		type Slot
	} from '#lib/content.ts';
	import Select from '#lib/components/ui/Select.svelte';
	import { booking } from '#lib/booking.svelte.ts';
	import { reducedMotion } from '#lib/motion/env.ts';
	import SectionTitle from '#lib/components/ui/SectionTitle.svelte';
	import Icon from '#lib/components/ui/Icon.svelte';

	const filters = [
		{ id: 'all', label: t.sched.all },
		{ id: 'functional', label: directionLabel('functional') },
		{ id: 'boxing', label: directionLabel('boxing') },
		{ id: 'stretching', label: directionLabel('stretching') }
	] as const;
	const coachOptions = [
		{ value: 'all' as const, label: t.sched.allCoaches },
		...coaches.filter((c) => c.id !== 'artem').map((c) => ({ value: c.id, label: c.name }))
	];

	let dir = $state<(typeof filters)[number]['id']>('all');
	let coach = $state<'all' | Slot['coach']>('all');
	let day = $state(0); // для мобільних вкладок

	const visible = $derived(
		schedule.filter(
			(s) => (dir === 'all' || s.dir === dir) && (coach === 'all' || s.coach === coach)
		)
	);
	const byDay = $derived(days.map((_, i) => visible.filter((s) => s.day === i)));
	const coachName = (id: Slot['coach']) => coaches.find((c) => c.id === id)?.name ?? '';
	const bookingIndex = { functional: 0, boxing: 1, stretching: 2 } as const;
	const anim = () => (reducedMotion() ? 0 : 1);

	const plural = (n: number) => t.sched.classes(n);
</script>

<section id="rozklad" aria-labelledby="rozklad-title" class="relative bg-coal py-24 md:py-32">
	<div class="wrap">
		<div class="grid gap-8 lg:grid-cols-12 lg:items-end">
			<div class="lg:col-span-7">
				<SectionTitle eyebrow={t.sched.eyebrow} title={t.sched.title} id="rozklad-title" />
			</div>
			<p class="text-lg text-ash lg:col-span-5">
				{t.sched.lead}
			</p>
		</div>

		<div class="mt-10 flex flex-wrap items-end gap-4">
			<div role="radiogroup" aria-label={t.sched.dirLabel} class="flex flex-wrap gap-2">
				{#each filters as f (f.id)}
					<label class="chip" class:on={dir === f.id}>
						<input
							type="radio"
							class="sr-only"
							name="sched-dir"
							value={f.id}
							bind:group={dir}
						/>{f.label}
					</label>
				{/each}
			</div>
			<Select
				id="sched-coach"
				class="w-56"
				label={t.sched.coachLabel}
				options={coachOptions}
				bind:value={coach}
			/>
			<p class="tag ml-auto text-ash" aria-live="polite">
				{visible.length}
				{plural(visible.length)}
				{t.sched.perWeek}
			</p>
		</div>

		<!-- мобільні вкладки днів -->
		<div role="group" aria-label={t.sched.dayLabel} class="mt-8 grid grid-cols-7 gap-1 lg:hidden">
			{#each days as d, i (d)}
				<button
					type="button"
					aria-pressed={day === i}
					aria-controls="day-{i}"
					aria-label="{daysFull[i]}: {byDay[i].length} {plural(byDay[i].length)}"
					class="daytab"
					class:on={day === i}
					onclick={() => (day = i)}
				>
					{d}<span class="block text-xs opacity-80" aria-hidden="true">{byDay[i].length}</span>
				</button>
			{/each}
		</div>

		<div class="mt-6 grid gap-3 lg:mt-10 lg:grid-cols-7">
			{#each days as d, i (d)}
				<section id="day-{i}" class="day" class:hidden={day !== i} aria-labelledby="day-h-{i}">
					<h3 id="day-h-{i}" class="mega border-b-4 border-steel pb-2 text-3xl">
						<span class="lg:hidden">{daysFull[i]}</span><span class="hidden lg:inline">{d}</span>
					</h3>
					<ul class="mt-3 grid gap-2">
						{#each byDay[i] as s (s.day + s.time)}
							<li
								class="slot"
								data-dir={s.dir}
								animate:flip={{ duration: 280 * anim() }}
								in:scale={{ start: 0.9, duration: 220 * anim() }}
								out:fade={{ duration: 120 * anim() }}
							>
								<p class="mega text-3xl leading-none">{s.time}</p>
								<p class="mt-1 font-display text-lg font-black uppercase">
									{directionLabel(s.dir)}
								</p>
								<p class="text-sm text-ash">{coachName(s.coach)} · {s.level}</p>
								<div class="mt-2 flex items-center justify-between gap-2">
									<span class="text-sm font-bold {s.spots <= 2 ? 'text-blaze' : 'text-lime'}"
										>{t.sched.spots(s.spots)}</span
									>
									<button
										type="button"
										class="book"
										onclick={() => booking.show(bookingDirections[bookingIndex[s.dir]])}
										aria-label={t.sched.bookAria(directionLabel(s.dir), daysFull[s.day], s.time)}
									>
										<Icon name="arrow" size={18} />
									</button>
								</div>
							</li>
						{:else}
							<li class="py-4 text-sm text-ash">{t.sched.none}</li>
						{/each}
					</ul>
				</section>
			{/each}
		</div>
	</div>
</section>

<style>
	@media (min-width: 1024px) {
		.day.hidden {
			display: block;
		}
	}
	.chip {
		cursor: pointer;
		padding: 0.6rem 1.1rem;
		background: var(--color-steel);
		font-family: var(--font-display);
		font-weight: 900;
		font-size: 1.1rem;
		text-transform: uppercase;
		letter-spacing: 0.04em;
		clip-path: polygon(0.5rem 0, 100% 0, calc(100% - 0.5rem) 100%, 0 100%);
		transition:
			background-color 0.15s,
			color 0.15s;
	}
	.chip:hover {
		color: var(--color-lime);
	}
	.chip.on {
		background: var(--color-lime);
		color: var(--color-void);
	}
	.chip:has(input:focus-visible) {
		outline: 3px solid var(--color-lime);
		outline-offset: 3px;
	}
	.daytab {
		padding: 0.6rem 0;
		background: var(--color-steel);
		font-family: var(--font-display);
		font-weight: 900;
		font-size: 1.15rem;
		text-transform: uppercase;
	}
	.daytab.on {
		background: var(--color-lime);
		color: var(--color-void);
	}
	.slot {
		position: relative;
		padding: 0.9rem 1rem;
		background: var(--color-steel);
		border-left: 4px solid var(--color-lime);
	}
	.slot[data-dir='boxing'] {
		border-left-color: var(--color-blaze);
	}
	.slot[data-dir='stretching'] {
		border-left-color: var(--color-chalk);
	}
	.book {
		display: grid;
		place-items: center;
		width: 2.4rem;
		height: 2.4rem;
		background: var(--color-iron);
		transition:
			background-color 0.15s,
			color 0.15s,
			transform 0.2s var(--ease-snap);
	}
	.book:hover,
	.book:focus-visible {
		background: var(--color-lime);
		color: var(--color-void);
	}
	.book:active {
		transform: scale(0.88);
	}
</style>
