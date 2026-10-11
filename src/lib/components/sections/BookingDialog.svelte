<script lang="ts">
	import { booking } from '#lib/booking.svelte.ts';
	import BookingForm from '#lib/components/ui/BookingForm.svelte';
	import Icon from '#lib/components/ui/Icon.svelte';

	let dialog: HTMLDialogElement;

	// Нативний <dialog>: пастка фокусу, Esc і top-layer — силами браузера
	$effect(() => {
		if (booking.open && !dialog.open) dialog.showModal();
		else if (!booking.open && dialog.open) dialog.close();
	});
</script>

<dialog
	bind:this={dialog}
	aria-labelledby="booking-title"
	onclose={() => booking.close()}
	onclick={(e) => e.target === dialog && dialog.close()}
>
	{#if booking.open}
		<div class="panel">
			<button
				type="button"
				class="absolute top-4 right-4 grid h-11 w-11 place-items-center bg-steel hover:bg-lime hover:text-void"
				aria-label="Закрити"
				onclick={() => dialog.close()}
			>
				<Icon name="close" />
			</button>
			<p class="tag text-lime">Пробне — 0 грн</p>
			<h2 id="booking-title" class="mega mt-3 pr-12 text-6xl">Запис на пробне</h2>
			<p class="mt-2 text-ash">55–60 хвилин у міні-групі. Заміримо рівень і підберемо програму.</p>
			<div class="mt-7"><BookingForm preset={booking.preset} idPrefix="dlg" /></div>
		</div>
	{/if}
</dialog>

<style>
	dialog {
		margin: auto auto 0;
		width: 100%;
		max-width: 100%;
		max-height: 94dvh;
		padding: 0;
		border: 0;
		background: var(--color-void);
		color: inherit;
		overflow-y: auto;
		overscroll-behavior: contain;
		border-top: 4px solid var(--color-lime);
		transform: translateY(100%);
		transition:
			transform 0.4s var(--ease-punch),
			overlay 0.4s allow-discrete,
			display 0.4s allow-discrete;
	}
	dialog[open] {
		transform: none;
	}
	@starting-style {
		dialog[open] {
			transform: translateY(100%);
		}
	}
	dialog::backdrop {
		background: rgb(0 0 0 / 0.75);
		opacity: 0;
		transition:
			opacity 0.3s,
			overlay 0.4s allow-discrete,
			display 0.4s allow-discrete;
	}
	dialog[open]::backdrop {
		opacity: 1;
	}
	@starting-style {
		dialog[open]::backdrop {
			opacity: 0;
		}
	}
	.panel {
		position: relative;
		padding: 1.75rem 1.25rem 2.25rem;
	}
	@media (min-width: 640px) {
		dialog {
			margin: auto;
			max-width: 34rem;
			border-top: 0;
			border-left: 6px solid var(--color-lime);
			transform: translateX(-30px) skewX(-3deg);
			opacity: 0;
			transition:
				transform 0.4s var(--ease-punch),
				opacity 0.25s,
				overlay 0.4s allow-discrete,
				display 0.4s allow-discrete;
		}
		dialog[open] {
			transform: none;
			opacity: 1;
		}
		@starting-style {
			dialog[open] {
				transform: translateX(-30px) skewX(-3deg);
				opacity: 0;
			}
		}
		.panel {
			padding: 2.5rem;
		}
	}
</style>
