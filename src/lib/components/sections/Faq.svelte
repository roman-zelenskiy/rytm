<script lang="ts">
	import { faq } from '#lib/content.ts';
	import { inview } from '#lib/motion/actions.ts';
	import SectionTitle from '#lib/components/ui/SectionTitle.svelte';
	import Icon from '#lib/components/ui/Icon.svelte';

	let open = $state<number | null>(0);
</script>

<section id="faq" aria-labelledby="faq-title" class="relative bg-coal py-24 md:py-32">
	<div class="wrap grid gap-12 lg:grid-cols-12">
		<div class="lg:col-span-4">
			<div class="lg:sticky lg:top-28">
				<SectionTitle eyebrow="FAQ" title="Чесно" accent="про все" id="faq-title" size="clamp(3.6rem, 9vw, 8rem)" />
			</div>
		</div>
		<ol class="lg:col-span-8">
			{#each faq as item, i (item.q)}
				<li class="item border-b-2 border-steel" class:open={open === i} use:inview={i * 40} data-rise>
					<h3>
						<button
							type="button"
							id="faq-q-{i}"
							class="flex w-full items-start gap-5 py-6 text-left"
							aria-expanded={open === i}
							aria-controls="faq-a-{i}"
							onclick={() => (open = open === i ? null : i)}
						>
							<span class="mega w-12 shrink-0 text-4xl leading-none text-lime" aria-hidden="true">{String(i + 1).padStart(2, '0')}</span>
							<span class="mega flex-1 text-[1.65rem] leading-[1.05] md:text-[2.1rem]">{item.q}</span>
							<span class="icon grid h-10 w-10 shrink-0 place-items-center bg-steel" aria-hidden="true"><Icon name="plus" /></span>
						</button>
					</h3>
					<div class="answer" id="faq-a-{i}" role="region" aria-labelledby="faq-q-{i}">
						<div><p class="pb-7 pl-[4.25rem] text-lg text-chalk/85">{item.a}</p></div>
					</div>
				</li>
			{/each}
		</ol>
	</div>
</section>

<style>
	.icon {
		transition:
			transform 0.3s var(--ease-snap),
			background-color 0.2s,
			color 0.2s;
	}
	.open .icon {
		transform: rotate(135deg);
		background: var(--color-lime);
		color: var(--color-void);
	}
	button:hover .icon {
		background: var(--color-lime);
		color: var(--color-void);
	}
	.answer {
		display: grid;
		grid-template-rows: 0fr;
		transition: grid-template-rows 0.35s var(--ease-punch);
	}
	.answer > div {
		overflow: hidden;
		min-height: 0;
	}
	/* текст відповіді «врізається» по діагоналі */
	.answer p {
		clip-path: polygon(0 0, 0 0, -10% 100%, -10% 100%);
		transition: clip-path 0.45s var(--ease-punch) 0.05s;
	}
	.open .answer {
		grid-template-rows: 1fr;
	}
	.open .answer p {
		clip-path: polygon(0 0, 110% 0, 100% 100%, -10% 100%);
	}
	@media (max-width: 639px) {
		.answer p {
			padding-left: 0;
		}
	}
</style>
