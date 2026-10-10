<script lang="ts">
	import { siteUrl, studio } from '#lib/content.ts';

	let {
		title,
		description,
		path,
		noindex = false,
		schema
	}: { title: string; description: string; path: string; noindex?: boolean; schema?: object } = $props();

	const url = $derived(siteUrl + path);
	const image = `${siteUrl}/og-image.jpg`;
	// JSON-LD усередині <script>: екрануємо «<», щоб текст не міг закрити тег
	const json = $derived(schema ? JSON.stringify(schema).replace(/</g, '\\u003c') : '');
</script>

<svelte:head>
	<title>{title}</title>
	<meta name="description" content={description} />
	<meta name="robots" content={noindex ? 'noindex, follow' : 'index, follow, max-image-preview:large'} />
	<link rel="canonical" href={url} />
	<meta property="og:type" content="website" />
	<meta property="og:locale" content="uk_UA" />
	<meta property="og:site_name" content={studio.legalName} />
	<meta property="og:title" content={title} />
	<meta property="og:description" content={description} />
	<meta property="og:url" content={url} />
	<meta property="og:image" content={image} />
	<meta property="og:image:width" content="1200" />
	<meta property="og:image:height" content="630" />
	<meta property="og:image:alt" content="Фітнес-студія «Ритм» у Києві — перше тренування безкоштовно" />
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content={title} />
	<meta name="twitter:description" content={description} />
	<meta name="twitter:image" content={image} />
	<meta name="geo.region" content="UA-30" />
	<meta name="geo.placename" content={studio.city} />
	<meta name="geo.position" content="{studio.geo.lat};{studio.geo.lng}" />
	{#if json}
		<!-- eslint-disable-next-line svelte/no-at-html-tags -- лише наш серіалізований JSON-LD -->
		{@html `<script type="application/ld+json">${json}</script>`}
	{/if}
</svelte:head>
