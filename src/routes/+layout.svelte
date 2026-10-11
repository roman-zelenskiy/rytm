<script lang="ts">
	import './layout.css';
	import { onMount } from 'svelte';
	import type { LayoutProps } from './$types';
	import { beat } from '#lib/motion/beat.svelte.ts';
	import { reducedMotion } from '#lib/motion/env.ts';
	import Header from '#lib/components/sections/Header.svelte';
	import BookingDialog from '#lib/components/sections/BookingDialog.svelte';
	import Footer from '#lib/components/sections/Footer.svelte';
	import MobileCta from '#lib/components/sections/MobileCta.svelte';

	let { children }: LayoutProps = $props();

	onMount(() => {
		beat.start();
		if (reducedMotion()) return;
		// Плавний скрол потрібен тому, хто скролить: Lenis вантажимо при першій взаємодії
		let lenis: { destroy: () => void } | undefined;
		const events = ['wheel', 'touchstart', 'keydown', 'pointerdown'] as const;
		const kick = async () => {
			events.forEach((t) => removeEventListener(t, kick));
			const { default: Lenis } = await import('lenis');
			lenis = new Lenis({ autoRaf: true, lerp: 0.12, anchors: true });
		};
		events.forEach((t) => addEventListener(t, kick, { passive: true, once: true }));
		return () => {
			events.forEach((t) => removeEventListener(t, kick));
			lenis?.destroy();
		};
	});
</script>

<a
	href="#main"
	class="sr-only z-[100] bg-lime px-5 py-3 font-bold text-void focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
	>Перейти до вмісту</a
>
<Header />
<main id="main" tabindex="-1" class="outline-none">
	{@render children()}
</main>
<Footer />
<MobileCta />
<BookingDialog />
