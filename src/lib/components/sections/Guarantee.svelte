<script lang="ts">
	import { guarantee } from '#lib/content.ts';
	import { img } from '#lib/images.ts';
	import { inview, kinetic } from '#lib/motion/actions.ts';
	import Segments from '#lib/components/ui/Segments.svelte';
	import Button from '#lib/components/ui/Button.svelte';
	import { booking } from '#lib/booking.svelte.ts';
</script>

<section id="harantiia" aria-labelledby="harantiia-title" class="relative isolate overflow-hidden py-24 md:py-36">
	<div class="absolute inset-0 -z-10">
		<enhanced:img src={img.guarantee} alt="" sizes="100vw" class="h-full w-full object-cover opacity-45" />
		<div class="absolute inset-0 bg-gradient-to-r from-void via-void/85 to-void/40"></div>
		<div class="grain absolute inset-0 overflow-hidden"></div>
	</div>
	<div class="stripe absolute top-0 -left-[10%] -z-10 h-full w-[18%] bg-blaze/90" aria-hidden="true"></div>

	<div class="wrap">
		<p class="tag text-lime" use:inview data-rise><span class="inline-block h-[3px] w-8 bg-lime" aria-hidden="true"></span>Гарантія результату</p>
		<h2 id="harantiia-title" class="mega mt-4 text-[clamp(4.2rem,15vw,15rem)]">
			<span class="block origin-left" use:kinetic>
				<span class="block" use:inview data-slash>8 тижнів</span>
				<span class="mega-outline block" use:inview={90} data-slash>або гроші</span>
				<span class="block text-lime" use:inview={180} data-slash>назад</span>
			</span>
		</h2>

		<div class="mt-10 max-w-xl">
			<Segments total={8} value={8} label="Програма триває 8 тижнів" />
			<div class="mt-2 grid grid-cols-8 text-center font-display text-sm font-black text-ash" aria-hidden="true">
				{#each [1, 2, 3, 4, 5, 6, 7, 8] as w (w)}<span>{w}</span>{/each}
			</div>
		</div>

		<div class="mt-12 grid gap-10 lg:grid-cols-12">
			<ol class="grid gap-4 lg:col-span-7">
				{#each guarantee.conditions as c, i (c)}
					<li class="flex gap-5 bg-void/70 p-5 backdrop-blur-sm" use:inview={i * 80} data-rise>
						<span class="mega text-5xl leading-none text-lime">0{i + 1}</span>
						<span class="self-center text-lg">{c}</span>
					</li>
				{/each}
			</ol>
			<div class="self-end lg:col-span-5">
				<p class="text-ash">Гарантія діє для тарифів «Безлім» і «Персонально». Ціль і заміри фіксуємо письмово в перший тиждень — разом із тренером, реалістично й без «мінус 20 кг за місяць».</p>
				<Button class="mt-6" onclick={() => booking.show()}>Прийняти виклик</Button>
			</div>
		</div>
	</div>
</section>

<style>
	.stripe {
		transform: skewX(-14deg);
	}
</style>
