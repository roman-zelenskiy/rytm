<script lang="ts">
	import { detectScript } from '#lib/i18n.ts';

	// Корінь: обираємо мову до першої відмальовки (Україна → українська, інакше англійська)
	const tag = `<script>${detectScript}</` + 'script>';
</script>

<svelte:head>
	<title>Rytm — fitness studio in Kyiv · Фітнес-студія «Ритм»</title>
	<meta name="robots" content="noindex, follow" />
	<link rel="alternate" hreflang="uk" href="uk/" />
	<link rel="alternate" hreflang="en" href="en/" />
	<!-- eslint-disable-next-line svelte/no-at-html-tags -- статичний скрипт вибору мови -->
	{@html tag}
	<noscript><meta http-equiv="refresh" content="0; url=uk/" /></noscript>
</svelte:head>

<p class="wrap py-32 text-ash">
	<a class="text-lime underline" href="uk/">Українською</a> ·
	<a class="text-lime underline" href="en/">English</a>
</p>
