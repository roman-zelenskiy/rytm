<script lang="ts">
	import { img } from '#lib/images.ts';
	import { studio } from '#lib/content.ts';
	import { kinetic, inview } from '#lib/motion/actions.ts';
	import BookingForm from '#lib/components/ui/BookingForm.svelte';
	import Icon from '#lib/components/ui/Icon.svelte';
</script>

<section id="zapys" aria-labelledby="zapys-title" class="relative isolate overflow-hidden py-24 md:py-32">
	<div class="absolute inset-0 -z-10">
		<enhanced:img src={img.gloves} alt="" sizes="100vw" class="h-full w-full object-cover opacity-35" />
		<div class="absolute inset-0 bg-gradient-to-t from-void via-void/80 to-void/60"></div>
		<div class="grain absolute inset-0 overflow-hidden"></div>
	</div>

	<div class="wrap grid gap-12 lg:grid-cols-12 lg:items-center">
		<div class="lg:col-span-7">
			<p class="tag text-lime" use:inview data-rise><span class="inline-block h-[3px] w-8 bg-lime" aria-hidden="true"></span>Пробне тренування</p>
			<h2 id="zapys-title" class="mega mt-4 text-[clamp(4rem,12vw,11rem)]">
				<span class="block origin-left" use:kinetic>
					<span class="block" use:inview data-slash>Перше —</span>
					<span class="block text-lime" use:inview={90} data-slash>0 гривень</span>
				</span>
			</h2>
			<ul class="mt-8 grid max-w-lg gap-3 text-lg">
				<li class="flex gap-3"><Icon name="bolt" class="mt-1 shrink-0 text-lime" />Знайомство з тренером і замір рівня</li>
				<li class="flex gap-3"><Icon name="bolt" class="mt-1 shrink-0 text-lime" />Повноцінне тренування в міні-групі</li>
				<li class="flex gap-3"><Icon name="bolt" class="mt-1 shrink-0 text-lime" />План на 8 тижнів — навіть якщо не залишитесь</li>
			</ul>
			<p class="mt-8 text-ash">Зручніше зателефонувати? <a href={studio.phoneHref} class="font-display text-xl font-black whitespace-nowrap text-chalk underline decoration-lime decoration-4 underline-offset-4">{studio.phone}</a></p>
		</div>
		<div class="lg:col-span-5">
			<div class="form-card bg-void/90 p-6 backdrop-blur-sm md:p-9">
				<p class="mega text-4xl">Запис на пробне</p>
				<p class="mt-1 text-sm text-ash">Відповімо протягом 15 хвилин у робочий час.</p>
				<div class="mt-7"><BookingForm idPrefix="sec" /></div>
			</div>
		</div>
	</div>
</section>

<style>
	.form-card {
		border-top: 6px solid var(--color-lime);
		clip-path: polygon(0 0, 100% 0, 100% calc(100% - 2rem), calc(100% - 2rem) 100%, 0 100%);
	}
</style>
