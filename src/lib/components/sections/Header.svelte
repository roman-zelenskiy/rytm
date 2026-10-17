<script lang="ts">
	import { onMount } from 'svelte';
	import { fly } from 'svelte/transition';
	import { page } from '$app/state';
	import { nav, studio, t } from '#lib/content.ts';
	import { href, lang, rememberLang, switchHref } from '#lib/i18n.ts';
	import { booking } from '#lib/booking.svelte.ts';
	import { beat } from '#lib/motion/beat.svelte.ts';
	import Logo from '#lib/components/ui/Logo.svelte';
	import Icon from '#lib/components/ui/Icon.svelte';
	import Button from '#lib/components/ui/Button.svelte';
	import Equalizer from '#lib/components/ui/Equalizer.svelte';

	let hidden = $state(false);
	let solid = $state(false);
	let menu = $state(false);

	const home = $derived(page.route.id === '/[lang=lang]');
	const other = lang === 'uk' ? 'en' : 'uk';

	onMount(() => {
		let last = scrollY;
		const onScroll = () => {
			const y = scrollY;
			solid = y > 20;
			if (Math.abs(y - last) > 6) hidden = y > 500 && y > last && !menu;
			last = y;
		};
		onScroll();
		addEventListener('scroll', onScroll, { passive: true });
		return () => removeEventListener('scroll', onScroll);
	});

	$effect(() => {
		document.documentElement.style.overflow = menu ? 'hidden' : '';
	});
</script>

<svelte:window onkeydown={(e) => e.key === 'Escape' && (menu = false)} />

<header class="bar fixed inset-x-0 top-0 z-50" class:hide={hidden} class:solid={solid || menu}>
	<div class="wrap flex h-16 items-center justify-between gap-4 md:h-[72px]">
		<a href={href('/')} aria-label={t.header.home}><Logo /></a>

		<nav aria-label={t.header.nav} class="hidden lg:block">
			<ul class="flex items-center">
				{#each nav as item (item.id)}
					<li>
						<a href={home ? `#${item.id}` : `${href('/')}#${item.id}`} class="navlink"
							>{item.label}</a
						>
					</li>
				{/each}
			</ul>
		</nav>

		<div class="flex items-center gap-3">
			<span
				class="hidden items-center gap-2 font-display text-sm font-black tracking-wider text-ash uppercase xl:inline-flex"
				aria-hidden="true"
			>
				<Equalizer />{beat.bpm} bpm
			</span>
			<a
				href={studio.phoneHref}
				rel="external"
				class="hidden items-center gap-2 font-display text-lg font-black tracking-wide xl:inline-flex"
			>
				<Icon name="phone" size={18} class="text-lime" />{studio.phone}
			</a>
			<a
				href={switchHref(page.url.pathname, other)}
				hreflang={other}
				lang={other}
				data-sveltekit-reload
				class="langsw"
				aria-label={t.header.switchLabel}
				onclick={() => rememberLang(other)}>{other === 'en' ? 'EN' : 'UA'}</a
			>
			<Button
				class="hidden !min-h-11 !px-5 !text-base sm:inline-flex"
				onclick={() => booking.show()}>{t.header.trial}</Button
			>
			<button
				type="button"
				class="grid h-11 w-11 place-items-center bg-steel lg:hidden"
				aria-expanded={menu}
				aria-controls="mobile-nav"
				aria-label={menu ? t.header.closeMenu : t.header.openMenu}
				onclick={() => (menu = !menu)}
			>
				<Icon name={menu ? 'close' : 'menu'} size={22} />
			</button>
		</div>
	</div>

	{#if menu}
		<div
			id="mobile-nav"
			class="fixed inset-x-0 top-16 bottom-0 h-[calc(100dvh-64px)] overflow-y-auto bg-void lg:hidden"
			transition:fly={{ y: -16, duration: 220 }}
		>
			<nav aria-label={t.header.mobileNav} class="wrap py-6">
				<ul>
					{#each nav as item, i (item.id)}
						<li in:fly={{ x: -40, delay: 40 * i, duration: 260 }}>
							<a
								href={home ? `#${item.id}` : `${href('/')}#${item.id}`}
								onclick={() => (menu = false)}
								class="mega block border-b border-steel py-2 text-[17vw] leading-[0.95] hover:text-lime sm:text-7xl"
							>
								{item.label}
							</a>
						</li>
					{/each}
				</ul>
				<div class="mt-8 grid gap-3">
					<Button
						class="w-full"
						onclick={() => {
							menu = false;
							booking.show();
						}}>{t.bookTrial}</Button
					>
					<Button variant="ghost" href={studio.phoneHref} class="w-full"
						><Icon name="phone" />{studio.phone}</Button
					>
				</div>
			</nav>
		</div>
	{/if}
</header>

<style>
	.bar {
		transition:
			transform 0.35s var(--ease-punch),
			background-color 0.3s;
	}
	.bar.hide {
		transform: translateY(-100%);
	}
	.bar.solid {
		background: rgb(10 10 11 / 0.88);
		backdrop-filter: blur(10px);
		box-shadow: 0 1px 0 var(--color-steel);
	}
	.langsw {
		display: grid;
		place-items: center;
		height: 2.75rem;
		min-width: 2.75rem;
		padding: 0 0.6rem;
		border: 2px solid var(--color-iron);
		font-family: var(--font-display);
		font-weight: 900;
		font-size: 1.05rem;
		letter-spacing: 0.06em;
		transition:
			border-color 0.2s,
			color 0.2s;
	}
	.langsw:hover {
		border-color: var(--color-lime);
		color: var(--color-lime);
	}
	.navlink {
		position: relative;
		display: block;
		padding: 0.5rem 0.9rem;
		font-family: var(--font-display);
		font-weight: 900;
		font-size: 1.15rem;
		letter-spacing: 0.04em;
		text-transform: uppercase;
	}
	.navlink::after {
		content: '';
		position: absolute;
		left: 0.9rem;
		right: 0.9rem;
		bottom: 0.25rem;
		height: 3px;
		background: var(--color-lime);
		transform: scaleX(0) skewX(-30deg);
		transform-origin: left;
		transition: transform 0.25s var(--ease-punch);
	}
	.navlink:hover::after,
	.navlink:focus-visible::after {
		transform: scaleX(1) skewX(-30deg);
	}
</style>
