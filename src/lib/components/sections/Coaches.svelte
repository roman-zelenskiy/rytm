<script lang="ts">
	import { coaches, t } from '#lib/content.ts';
	import { img } from '#lib/images.ts';
	import { inview } from '#lib/motion/actions.ts';
	import SectionTitle from '#lib/components/ui/SectionTitle.svelte';
	import Icon from '#lib/components/ui/Icon.svelte';

	let open = $state<string | null>(null);
</script>

<section id="treneri" aria-labelledby="treneri-title" class="relative py-24 md:py-32">
	<div class="wrap">
		<div class="grid gap-8 lg:grid-cols-12 lg:items-end">
			<div class="lg:col-span-8">
				<SectionTitle
					eyebrow={t.coaches.eyebrow}
					title={t.coaches.title}
					accent={t.coaches.accent}
					id="treneri-title"
				/>
			</div>
			<p class="text-lg text-ash lg:col-span-4">
				{t.coaches.lead}
			</p>
		</div>

		<ul class="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
			{#each coaches as c, i (c.id)}
				<li class="coach" style:--i={i} use:inview={i * 90} data-rise>
					<!-- Наведення лише підсилює ефект; з клавіатури та на дотик працює кнопка -->
					<article
						class="group relative aspect-[3/4] overflow-hidden bg-steel"
						class:open={open === c.id}
						onmouseenter={() => (open = c.id)}
						onmouseleave={() => (open = null)}
					>
						<enhanced:img
							loading="lazy"
							src={img.coaches[c.id]}
							alt={c.alt}
							sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
							class="photo h-full w-full object-cover"
						/>
						<div class="grain pointer-events-none absolute inset-0 overflow-hidden"></div>
						<div
							class="pointer-events-none absolute inset-0 bg-gradient-to-t from-void via-void/20 to-transparent"
						></div>

						<!-- діагональна заливка з регаліями -->
						<div
							class="wipe absolute inset-0 bg-lime p-6 text-void"
							id="coach-{c.id}"
							aria-hidden={open !== c.id}
						>
							<p class="tag">{t.coaches.achievements}</p>
							<ul class="mt-4 grid gap-3">
								{#each c.achievements as a (a)}<li class="flex gap-2 font-semibold">
										<Icon name="bolt" size={18} class="mt-1 shrink-0" />{a}
									</li>{/each}
							</ul>
						</div>

						<div class="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 p-5">
							<div class="caption">
								<h3 class="mega text-4xl">{c.name}</h3>
								<p class="tag mt-1 text-lime">{c.role}</p>
							</div>
							<button
								type="button"
								class="toggle grid h-11 w-11 shrink-0 place-items-center bg-lime text-void"
								aria-expanded={open === c.id}
								aria-controls="coach-{c.id}"
								aria-label={t.coaches.achAria(c.name)}
								onclick={() => (open = open === c.id ? null : c.id)}
							>
								<Icon name={open === c.id ? 'close' : 'plus'} />
							</button>
						</div>
					</article>
				</li>
			{/each}
		</ul>
	</div>
</section>

<style>
	@media (min-width: 1024px) {
		.coach:nth-child(even) {
			transform: translateY(3rem);
		}
		:global(.motion) .coach:nth-child(even)[data-rise]:global(.is-in) {
			transform: translateY(3rem);
		}
	}
	.photo {
		filter: grayscale(1) contrast(1.15);
		transition: transform 0.6s var(--ease-punch);
	}
	.group:hover .photo,
	.open .photo {
		transform: scale(1.06) rotate(-1deg);
	}
	/* закрита заливка ще й невидима: не перекриває підпис для скрінрідерів і перевірки контрасту */
	.wipe {
		visibility: hidden;
		clip-path: polygon(0 0, 0 0, -30% 100%, -30% 100%);
		transition:
			clip-path 0.45s var(--ease-punch),
			visibility 0s 0.45s;
	}
	.open .wipe {
		visibility: visible;
		clip-path: polygon(0 0, 130% 0, 100% 100%, -30% 100%);
		transition: clip-path 0.45s var(--ease-punch);
	}
	.open .caption {
		color: var(--color-void);
	}
	.open .caption :global(.text-lime) {
		color: var(--color-void);
	}
	.open .toggle {
		background: var(--color-void);
		color: var(--color-lime);
	}
</style>
