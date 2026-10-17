<script lang="ts">
	import { fade } from 'svelte/transition';
	import {
		quiz,
		schedule,
		coaches,
		plans,
		days,
		directionLabel,
		bookingDirections,
		t,
		type DirectionId
	} from '#lib/content.ts';
	import { booking } from '#lib/booking.svelte.ts';
	import { slash } from '#lib/motion/transitions.ts';
	import SectionTitle from '#lib/components/ui/SectionTitle.svelte';
	import Button from '#lib/components/ui/Button.svelte';
	import Icon from '#lib/components/ui/Icon.svelte';

	type Key = (typeof quiz.steps)[number]['key'];
	let step = $state(0);
	let answers = $state<Record<Key, string>>({ goal: '', level: '', freq: '' });
	let dir = $state<1 | -1>(1);
	let stepHeading = $state<HTMLElement>();

	const current = $derived(quiz.steps[step]);
	const done = $derived(step >= quiz.steps.length);

	const goalToDir: Record<string, DirectionId> = {
		lose: 'functional',
		strong: 'functional',
		stress: 'boxing',
		flex: 'stretching'
	};
	const forecast: Record<string, string> = t.quiz.forecast;
	const bookingIndex: Record<DirectionId, number> = {
		functional: 0,
		boxing: 1,
		stretching: 2,
		personal: 3
	};

	const result = $derived.by(() => {
		if (!done) return null;
		const d = goalToDir[answers.goal] ?? 'functional';
		const planId = answers.freq === '2' ? 'pack8' : 'unlimited';
		const plan = plans.find((p) => p.id === planId)!;
		const groupDir = d === 'personal' ? 'functional' : d;
		const slots = schedule.filter((s) => s.dir === groupDir).slice(0, 3);
		const coach = coaches.find((c) => c.id === slots[0]?.coach) ?? coaches[0];
		const extra =
			answers.level === 'zero' ? t.quiz.extraZero : answers.freq === '4' ? t.quiz.extraMax : '';
		return { d, plan, slots, coach, extra, forecast: forecast[answers.goal] };
	});

	function go(to: number) {
		dir = to > step ? 1 : -1;
		step = to;
		// фокус на заголовок кроку — для клавіатури й скрінрідерів
		queueMicrotask(() => stepHeading?.focus());
	}

	function restart() {
		answers = { goal: '', level: '', freq: '' };
		go(0);
	}
</script>

<section id="kviz" aria-labelledby="kviz-title" class="relative overflow-hidden py-24 md:py-32">
	<div class="wrap grid gap-12 lg:grid-cols-12">
		<div class="lg:col-span-5">
			<SectionTitle
				eyebrow={t.quiz.eyebrow}
				title={t.quiz.title}
				accent={t.quiz.accent}
				id="kviz-title"
				size="clamp(3.4rem, 7.4vw, 7.6rem)"
			/>
			<p class="mt-6 max-w-md text-lg text-ash">
				{t.quiz.lead}
			</p>
		</div>

		<div class="lg:col-span-7">
			<div class="card relative bg-coal p-6 md:p-10">
				<!-- прогрес: сегменти кроків -->
				<ol class="grid grid-cols-4 gap-2" aria-label={t.quiz.progress}>
					{#each [...quiz.steps.map((s) => s.title), t.quiz.result] as title, i (title)}
						<li
							class="h-2 -skew-x-[20deg] transition-colors duration-300 {i <= step
								? 'bg-lime'
								: 'bg-iron'}"
							aria-current={i === step ? 'step' : undefined}
						>
							<span class="sr-only">{i + 1}. {title}</span>
						</li>
					{/each}
				</ol>

				<div class="stage relative mt-8 grid">
					{#key step}
						<div
							class="[grid-area:1/1]"
							in:slash={{ dir, delay: 120 }}
							out:fade={{ duration: 120 }}
						>
							{#if !done}
								<fieldset>
									<legend class="w-full">
										<span class="tag text-ash">{t.quiz.stepOf(step + 1, quiz.steps.length)}</span>
										<span
											bind:this={stepHeading}
											tabindex="-1"
											class="mega mt-2 block text-5xl outline-none md:text-6xl"
											>{current.title}</span
										>
									</legend>
									<div class="mt-6 grid gap-3 sm:grid-cols-2">
										{#each current.options as o (o.value)}
											<label class="opt" class:on={answers[current.key] === o.value}>
												<input
													type="radio"
													class="sr-only"
													name="quiz-{current.key}"
													value={o.value}
													bind:group={answers[current.key]}
												/>
												<span class="mega text-3xl">{o.label}</span>
												<span class="text-sm text-ash">{o.hint}</span>
											</label>
										{/each}
									</div>
								</fieldset>
								<div class="mt-8 flex items-center justify-between gap-4">
									<button
										type="button"
										class="tag min-h-11 text-ash hover:text-chalk disabled:opacity-0"
										disabled={step === 0}
										onclick={() => go(step - 1)}
									>
										<Icon name="left" size={18} />
										{t.quiz.back}
									</button>
									<Button disabled={!answers[current.key]} onclick={() => go(step + 1)}>
										{step === quiz.steps.length - 1 ? t.quiz.myResult : t.quiz.next}
										<Icon name="arrow" />
									</Button>
								</div>
							{:else if result}
								<div aria-live="polite">
									<span class="tag text-lime">{t.quiz.yourProgram}</span>
									<h3
										bind:this={stepHeading}
										tabindex="-1"
										class="mega mt-2 text-6xl outline-none md:text-7xl"
									>
										{directionLabel(result.d)}
									</h3>
									<p class="mt-3 text-lg">
										<strong class="text-lime">{t.quiz.forecastLabel}</strong>
										{result.forecast}
									</p>
									<dl class="mt-6 grid gap-4 sm:grid-cols-3">
										<div class="border-l-4 border-lime pl-3">
											<dt class="tag text-ash">{t.quiz.plan}</dt>
											<dd class="mega mt-1 text-3xl">{result.plan.name}</dd>
											<dd class="text-sm text-ash">
												{t.quiz.perMonth(result.plan.price.year)}
											</dd>
										</div>
										<div class="border-l-4 border-lime pl-3">
											<dt class="tag text-ash">{t.quiz.coach}</dt>
											<dd class="mega mt-1 text-3xl">{result.coach.name}</dd>
											<dd class="text-sm text-ash">{result.coach.role}</dd>
										</div>
										<div class="border-l-4 border-lime pl-3">
											<dt class="tag text-ash">{t.quiz.nearest}</dt>
											{#each result.slots as s (s.day + s.time)}<dd
													class="font-display text-lg font-black uppercase"
												>
													{days[s.day]}
													{s.time}
												</dd>{/each}
										</div>
									</dl>
									{#if result.extra}<p class="mt-5 border-l-4 border-blaze pl-3 text-ash">
											{result.extra}
										</p>{/if}
									<div class="mt-8 flex flex-wrap items-center gap-4">
										<Button onclick={() => booking.show(bookingDirections[bookingIndex[result!.d]])}
											>{t.bookTrial} <Icon name="arrow" /></Button
										>
										<button type="button" class="tag text-ash hover:text-chalk" onclick={restart}
											>{t.quiz.again}</button
										>
									</div>
								</div>
							{/if}
						</div>
					{/key}
				</div>
			</div>
		</div>
	</div>
</section>

<style>
	.card {
		clip-path: polygon(0 0, calc(100% - 2.5rem) 0, 100% 2.5rem, 100% 100%, 0 100%);
	}
	fieldset {
		border: 0;
		margin: 0;
		padding: 0;
		min-width: 0;
	}
	.opt {
		display: grid;
		gap: 0.25rem;
		padding: 1.1rem 1.25rem;
		background: var(--color-steel);
		border-left: 4px solid transparent;
		cursor: pointer;
		transition:
			background-color 0.15s,
			border-color 0.15s,
			transform 0.2s var(--ease-snap);
	}
	.opt:hover {
		border-color: var(--color-lime);
	}
	.opt:active {
		transform: scale(0.97);
	}
	.opt.on {
		background: var(--color-lime);
		color: var(--color-void);
		border-color: var(--color-chalk);
	}
	.opt.on :global(.text-ash) {
		color: var(--color-void);
	}
	.opt:has(input:focus-visible) {
		outline: 3px solid var(--color-lime);
		outline-offset: 3px;
	}
</style>
