<script lang="ts">
	import { transformations } from '#lib/content.ts';
	import { img } from '#lib/images.ts';
	import { inview, kinetic } from '#lib/motion/actions.ts';
	import SectionTitle from '#lib/components/ui/SectionTitle.svelte';
	import Segments from '#lib/components/ui/Segments.svelte';
</script>

<section id="transformatsii" aria-labelledby="tr-title" class="relative overflow-hidden bg-coal py-24 md:py-32">
	<div class="wrap">
		<SectionTitle eyebrow="Результати клієнтів" title="Трансфор-" accent="мації" id="tr-title" />
		<p class="mt-6 max-w-xl text-lg text-ash">Реальні цифри за 8 тижнів — з замірами на старті й у фіналі. Імена та фото — з дозволу клієнтів.</p>

		<div class="mt-16 grid gap-20">
			{#each transformations as t, i (t.id)}
				{@const flip = i % 2 === 1}
				<article class="grid items-center gap-8 lg:grid-cols-12 lg:gap-12" aria-labelledby="tr-{t.id}">
					<div class={['relative aspect-[4/5] overflow-hidden lg:col-span-5', flip && 'lg:order-2 lg:col-start-8']} use:inview data-slash>
						<enhanced:img src={img.transformations[t.id]} alt={t.alt} sizes="(min-width: 1024px) 40vw, 100vw" class="h-full w-full object-cover" />
						<div class="grain pointer-events-none absolute inset-0 overflow-hidden"></div>
						<span class="tag absolute top-4 left-4 bg-lime px-3 py-2 text-void">{t.weeks} тижнів</span>
					</div>

					<div class={['lg:col-span-7', flip && 'lg:order-1 lg:col-span-7 lg:col-start-1']}>
						<p class="tag text-ash">{t.plan}</p>
						<h3 id="tr-{t.id}" class="mt-2">
							<span class="mega block text-[clamp(5rem,14vw,12rem)] text-lime" use:kinetic>{t.headline}</span>
							<span class="mega mt-2 block text-4xl">{t.name}</span>
						</h3>

						<dl class="mt-8 grid gap-6">
							{#each t.metrics as m (m.label)}
								<div>
									<div class="flex flex-wrap items-baseline justify-between gap-2">
										<dt class="tag text-ash">{m.label}</dt>
										<dd class="mega text-3xl">
											<span class="text-ash line-through decoration-blaze decoration-4">{m.from}</span>
											<span class="mx-1 text-lime" aria-hidden="true">→</span><span class="sr-only">, стало </span>{m.to}
										</dd>
									</div>
									<Segments total={12} value={Math.round(m.progress * 12)} label="{m.label}: прогрес {Math.round(m.progress * 100)}%" class="mt-3" />
								</div>
							{/each}
						</dl>

						<blockquote class="mt-8 border-l-4 border-blaze pl-4 text-lg text-chalk/90">«{t.quote}»</blockquote>
					</div>
				</article>
			{/each}
		</div>
	</div>
</section>
