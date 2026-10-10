<script lang="ts">
	import { onMount } from 'svelte';
	import { studio } from '#lib/content.ts';
	import { booking } from '#lib/booking.svelte.ts';
	import Icon from '#lib/components/ui/Icon.svelte';

	let shown = $state(false);

	onMount(() => {
		let nearForm = false;
		const update = () => (shown = scrollY > innerHeight * 0.8 && !nearForm);
		const form = document.getElementById('zapys');
		const io = form ? new IntersectionObserver(([e]) => ((nearForm = e.isIntersecting), update())) : null;
		if (form) io?.observe(form);
		addEventListener('scroll', update, { passive: true });
		return () => {
			removeEventListener('scroll', update);
			io?.disconnect();
		};
	});
</script>

<aside aria-label="Швидкий запис" class="cta fixed inset-x-0 bottom-0 z-40 flex gap-2 bg-void/95 p-2 backdrop-blur-sm lg:hidden" class:shown inert={!shown}>
	<button type="button" class="btn btn-lime flex-1" onclick={() => booking.show()}>Пробне безкоштовно</button>
	<a href={studio.phoneHref} class="grid w-14 place-items-center bg-steel" aria-label="Зателефонувати {studio.phone}"><Icon name="phone" /></a>
</aside>

<style>
	.cta {
		border-top: 3px solid var(--color-lime);
		transform: translateY(110%);
		transition: transform 0.35s var(--ease-punch);
	}
	.cta.shown {
		transform: none;
	}
</style>
