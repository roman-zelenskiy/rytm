<script lang="ts">
	import { onMount, tick } from 'svelte';
	import { scale } from 'svelte/transition';
	import { bookingDirections, days, daysFull, t } from '#lib/content.ts';
	import { href } from '#lib/i18n.ts';
	import Select from './Select.svelte';
	import { booking } from '#lib/booking.svelte.ts';
	import { formatPhone, isValidPhone } from '#lib/phone.ts';
	import { reducedMotion } from '#lib/motion/env.ts';
	import Button from './Button.svelte';
	import Icon from './Icon.svelte';

	let { preset = null, idPrefix = 'bf' }: { preset?: string | null; idPrefix?: string } = $props();

	type Field = 'name' | 'phone' | 'day';
	let name = $state('');
	let phone = $state('');
	let direction = $state(bookingDirections[0]);
	let day = $state('');
	let touched = $state<Record<Field, boolean>>({ name: false, phone: false, day: false });
	let attempted = $state(false);
	let status = $state<'idle' | 'loading' | 'success' | 'offline'>('idle');
	let shaking = $state<Record<Field, boolean>>({ name: false, phone: false, day: false });

	onMount(() => {
		if (preset && bookingDirections.includes(preset)) direction = preset;
	});

	const errors = $derived({
		name:
			name.trim().length < 2
				? t.form.errName
				: !/^[\p{L}\s'’ʼ-]+$/u.test(name.trim())
					? t.form.errLetters
					: '',
		phone: !phone ? t.form.errPhone : !isValidPhone(phone) ? t.form.errPhoneShort : '',
		day: day ? '' : t.form.errDay
	});
	const show = (f: Field) => (touched[f] || attempted) && !!errors[f];

	function onPhone(e: Event) {
		const el = e.currentTarget as HTMLInputElement;
		phone = formatPhone(el.value);
		el.value = phone;
	}

	async function shake(fields: Field[]) {
		if (reducedMotion()) return;
		for (const f of fields) shaking[f] = false;
		await tick();
		for (const f of fields) shaking[f] = true;
	}

	async function onsubmit(e: SubmitEvent) {
		e.preventDefault();
		attempted = true;
		status = 'idle';
		const bad = (['name', 'phone', 'day'] as Field[]).filter((f) => errors[f]);
		if (bad.length) {
			void shake(bad);
			const first = bad[0];
			document
				.getElementById(first === 'day' ? `${idPrefix}-day-0` : `${idPrefix}-${first}`)
				?.focus();
			return;
		}
		if (!navigator.onLine) {
			status = 'offline';
			return;
		}
		status = 'loading';
		await booking.submit({ name: name.trim(), phone: phone.replace(/\D/g, ''), direction, day });
		status = 'success';
	}

	function reset() {
		name = '';
		phone = '';
		day = '';
		attempted = false;
		touched = { name: false, phone: false, day: false };
		status = 'idle';
	}
</script>

{#if status === 'success'}
	<div
		class="py-6 text-center"
		role="status"
		aria-live="polite"
		in:scale={{ start: 0.85, duration: 350 }}
	>
		<div class="stamp mx-auto grid h-24 w-24 place-items-center bg-lime text-void">
			<Icon name="check" size={44} />
		</div>
		<p class="mega mt-6 text-5xl">{t.form.done(name.trim().split(/\s+/)[0])}</p>
		<p class="mx-auto mt-3 max-w-sm text-ash">
			{t.form.doneText(daysFull[days.indexOf(day as (typeof days)[number])] ?? '')}
		</p>
		<button type="button" class="tag mt-6 text-lime underline underline-offset-4" onclick={reset}
			>{t.form.another}</button
		>
	</div>
{:else}
	<form novalidate {onsubmit} class="grid gap-5" aria-busy={status === 'loading'}>
		<div class="field" class:shake={shaking.name} onanimationend={() => (shaking.name = false)}>
			<label for="{idPrefix}-name">{t.form.name}</label>
			<input
				id="{idPrefix}-name"
				bind:value={name}
				autocomplete="given-name"
				placeholder={t.form.namePh}
				onblur={() => (touched.name = true)}
				aria-invalid={show('name')}
				aria-describedby={show('name') ? `${idPrefix}-name-err` : undefined}
			/>
			{#if show('name')}<p class="err" id="{idPrefix}-name-err">{errors.name}</p>{/if}
		</div>

		<div class="field" class:shake={shaking.phone} onanimationend={() => (shaking.phone = false)}>
			<label for="{idPrefix}-phone">{t.form.phone}</label>
			<input
				id="{idPrefix}-phone"
				type="tel"
				inputmode="tel"
				autocomplete="tel"
				placeholder="+380 (__) ___-__-__"
				value={phone}
				oninput={onPhone}
				onfocus={() => !phone && (phone = '+380 (')}
				onblur={() => {
					if (phone === '+380 (') phone = '';
					touched.phone = true;
				}}
				aria-invalid={show('phone')}
				aria-describedby={show('phone') ? `${idPrefix}-phone-err` : undefined}
			/>
			{#if show('phone')}<p class="err" id="{idPrefix}-phone-err">{errors.phone}</p>{/if}
		</div>

		<div class="field">
			<label for="{idPrefix}-dir">{t.form.dir}</label>
			<Select
				id="{idPrefix}-dir"
				size="lg"
				label={t.form.dir}
				options={bookingDirections.map((d) => ({ value: d, label: d }))}
				bind:value={direction}
			/>
		</div>

		<fieldset
			class="field"
			class:shake={shaking.day}
			onanimationend={() => (shaking.day = false)}
			aria-describedby={show('day') ? `${idPrefix}-day-err` : undefined}
		>
			<legend>{t.form.day}</legend>
			<div class="grid grid-cols-7 gap-1.5">
				{#each days as d, i (d)}
					<label class="day" class:on={day === d}>
						<input
							type="radio"
							class="sr-only"
							id="{idPrefix}-day-{i}"
							name="{idPrefix}-day"
							value={d}
							checked={day === d}
							onchange={() => {
								day = d;
								touched.day = true;
							}}
							aria-label={daysFull[i]}
						/>{d}
					</label>
				{/each}
			</div>
			{#if show('day')}<p class="err" id="{idPrefix}-day-err">{errors.day}</p>{/if}
		</fieldset>

		{#if status === 'offline'}
			<p class="err border-l-4 border-blaze bg-blaze/10 px-4 py-3" role="alert">
				{t.form.offline}
			</p>
		{/if}

		<Button type="submit" class="mt-1 w-full" disabled={status === 'loading'}>
			{#if status === 'loading'}
				<span
					class="h-4 w-4 animate-spin rounded-full border-2 border-void border-r-transparent"
					aria-hidden="true"
				></span>
				{t.form.sending}
			{:else}
				{t.bookTrial} <Icon name="arrow" />
			{/if}
		</Button>
		<p class="text-center text-xs text-ash">
			{t.form.consent}
			<a href={href('/polityka-konfidentsiinosti')} class="underline underline-offset-2"
				>{t.form.consentLink}</a
			>
		</p>
	</form>
{/if}

<style>
	.field {
		display: grid;
		gap: 0.45rem;
		min-width: 0;
		border: 0;
		padding: 0;
		margin: 0;
	}
	label:not(.day),
	legend {
		font-family: var(--font-display);
		font-weight: 900;
		text-transform: uppercase;
		letter-spacing: 0.06em;
		font-size: 0.95rem;
		margin-bottom: 0.4rem;
	}
	input:not([type='radio']) {
		width: 100%;
		min-height: 3.4rem;
		padding: 0 1rem;
		appearance: none;
		background: var(--color-coal);
		border: 2px solid var(--color-iron);
		color: var(--color-chalk);
		font: inherit;
		transition: border-color 0.2s;
	}
	input:focus {
		outline: none;
		border-color: var(--color-lime);
	}
	input[aria-invalid='true'] {
		border-color: var(--color-blaze);
	}
	input::placeholder {
		color: #85857f;
	}
	.err {
		color: #ff8a5c;
		font-size: 0.9rem;
	}
	.day {
		display: grid;
		place-items: center;
		min-height: 2.9rem;
		background: var(--color-coal);
		border: 2px solid var(--color-iron);
		font-family: var(--font-display);
		font-weight: 900;
		font-size: 1.1rem;
		text-transform: uppercase;
		cursor: pointer;
		transition:
			background-color 0.15s,
			color 0.15s,
			border-color 0.15s;
	}
	.day:hover {
		border-color: var(--color-lime);
	}
	.day.on {
		background: var(--color-lime);
		border-color: var(--color-lime);
		color: var(--color-void);
	}
	.day:has(input:focus-visible) {
		outline: 3px solid var(--color-lime);
		outline-offset: 2px;
	}
	.stamp {
		clip-path: polygon(12% 0, 100% 0, 88% 100%, 0 100%);
	}
</style>
