<script lang="ts">
	import { resolve } from '$app/paths';
	import { page } from '$app/state';
	import { nav, studio } from '#lib/content.ts';
	import { kinetic } from '#lib/motion/actions.ts';
	import Logo from '#lib/components/ui/Logo.svelte';
	import Icon from '#lib/components/ui/Icon.svelte';

	const home = $derived(page.url.pathname === resolve('/'));
</script>

<footer class="relative overflow-hidden border-t-4 border-lime bg-void pt-20 pb-28 lg:pb-12">
	<div class="wrap">
		<p class="mega text-[clamp(3.4rem,11vw,10rem)] leading-[0.85]" aria-hidden="true">
			<span class="block origin-left" use:kinetic>Побачимось</span>
			<span class="block origin-left text-lime" use:kinetic>на тренуванні</span>
		</p>

		<div class="mt-16 grid gap-12 md:grid-cols-2 lg:grid-cols-12">
			<div class="lg:col-span-3">
				<Logo />
				<p class="mt-4 max-w-xs text-ash">
					Фітнес-студія в Києві: функціональні тренування, бокс, стретчинг і персональний тренер на
					Подолі.
				</p>
				<div class="mt-6 flex gap-2">
					<a href={studio.telegram} rel="external" class="soc" aria-label="Написати в Telegram"
						><Icon name="telegram" /></a
					>
					<a href={studio.viber} rel="external" class="soc" aria-label="Написати у Viber"
						><Icon name="viber" /></a
					>
					<a href={studio.instagram} rel="external" class="soc" aria-label="Instagram студії"
						><Icon name="instagram" /></a
					>
				</div>
			</div>

			<address class="not-italic lg:col-span-3">
				<h2 class="tag text-lime">Контакти</h2>
				<ul class="mt-4 grid gap-2 text-chalk/90">
					<li>
						<a
							href={studio.phoneHref}
							rel="external"
							class="font-display text-2xl font-black whitespace-nowrap hover:text-lime"
							>{studio.phone}</a
						>
					</li>
					<li>
						<a href="mailto:{studio.email}" rel="external" class="inline-block py-1 hover:text-lime"
							>{studio.email}</a
						>
					</li>
					<li>{studio.street}, {studio.district}<br />{studio.city}, {studio.postalCode}</li>
					<li class="text-sm text-ash">{studio.metro}</li>
				</ul>
			</address>

			<div class="lg:col-span-2">
				<h2 class="tag text-lime">Графік</h2>
				<dl class="mt-4 grid gap-2">
					{#each studio.hours as h (h.days)}<div class="flex gap-3">
							<dt class="w-16 font-bold">{h.days}</dt>
							<dd class="text-chalk/90">{h.time}</dd>
						</div>{/each}
				</dl>
				<nav aria-label="Навігація в підвалі" class="mt-6">
					<ul class="grid grid-cols-2 gap-1 text-sm text-ash">
						{#each nav as n (n.id)}<li>
								<a
									href={home ? `#${n.id}` : resolve(`/#${n.id}`)}
									class="inline-block py-1 hover:text-lime">{n.label}</a
								>
							</li>{/each}
					</ul>
				</nav>
			</div>

			<a
				href={studio.mapsUrl}
				target="_blank"
				rel="external noopener noreferrer"
				class="map group relative block overflow-hidden bg-coal md:col-span-2 lg:col-span-4"
			>
				<svg
					viewBox="0 0 400 240"
					class="block h-auto w-full"
					role="img"
					aria-label="Схема проїзду: студія «Ритм» на вулиці Кирилівській, 41, сім хвилин від метро «Контрактова площа»"
				>
					<rect width="400" height="240" fill="#16171a" />
					<g stroke="#2c2e33" stroke-width="10" fill="none">
						<path d="M-20 60 L420 150" />
						<path d="M-20 190 L420 230" />
						<path d="M90 -20 L170 260" />
						<path d="M300 -20 L250 260" />
					</g>
					<g stroke="#222428" stroke-width="3" fill="none">
						<path d="M-20 110 L420 200 M30 -20 L110 260 M360 -20 L320 260 M-20 20 L420 100" />
					</g>
					<path
						class="route"
						d="M300 196 L262 140 L214 104"
						stroke="#c8ff00"
						stroke-width="4"
						stroke-dasharray="10 8"
						fill="none"
					/>
					<g
						class="font-display"
						font-size="12"
						font-weight="900"
						fill="#a6a6a0"
						letter-spacing=".06em"
					>
						<text x="12" y="84" transform="rotate(11.5 12 84)">ВУЛ. КИРИЛІВСЬКА</text>
						<text x="196" y="226" transform="rotate(5 196 226)">ВУЛ. ВЕРХНІЙ ВАЛ</text>
					</g>
					<g transform="translate(300 200)">
						<rect x="-12" y="-12" width="24" height="24" fill="#f4f4f0" transform="rotate(45)" />
						<text
							y="5"
							text-anchor="middle"
							font-size="13"
							font-weight="900"
							fill="#0a0a0b"
							class="font-display">М</text
						>
					</g>
					<g transform="translate(214 100)">
						<path d="M0 0 L-14 -26 L14 -26 Z" fill="#c8ff00" />
						<rect x="-46" y="-58" width="92" height="26" fill="#c8ff00" />
						<text
							y="-40"
							text-anchor="middle"
							font-size="15"
							font-weight="900"
							fill="#0a0a0b"
							class="font-display">РИТМ · 41</text
						>
					</g>
				</svg>
				<span
					class="tag absolute right-3 bottom-3 inline-flex items-center gap-2 bg-lime px-3 py-2 text-void"
					>Маршрут <Icon name="arrow" size={16} /></span
				>
			</a>
		</div>

		<div
			class="mt-14 flex flex-col gap-3 border-t border-steel pt-6 text-sm text-ash md:flex-row md:items-center md:justify-between"
		>
			<p>© 2020–2026 Фітнес-студія «Ритм», Київ</p>
			<a href={resolve('/polityka-konfidentsiinosti')} class="inline-block py-1 hover:text-lime"
				>Політика конфіденційності</a
			>
		</div>
	</div>
</footer>

<style>
	.soc {
		display: grid;
		place-items: center;
		width: 3rem;
		height: 3rem;
		background: var(--color-steel);
		transition:
			background-color 0.15s,
			color 0.15s,
			transform 0.2s var(--ease-snap);
	}
	.soc:hover,
	.soc:focus-visible {
		background: var(--color-lime);
		color: var(--color-void);
	}
	.soc:active {
		transform: scale(0.9);
	}
	:global(.motion) .route {
		animation: march 0.5s linear infinite;
	}
	@keyframes march {
		to {
			stroke-dashoffset: -18;
		}
	}
</style>
