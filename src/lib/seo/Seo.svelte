<script lang="ts">
	import { siteUrl, studio, t } from '#lib/content.ts';
	import { lang } from '#lib/i18n.ts';

	let {
		title,
		description,
		path,
		noindex = false,
		schema
	}: {
		title: string;
		description: string;
		path: string;
		noindex?: boolean;
		schema?: object;
	} = $props();

	// канонічна адреса — з мовою; альтернативи для пошуковиків — обидві мови
	const url = $derived(`${siteUrl}/${lang}${path}`);
	const alt = (l: string) => `${siteUrl}/${l}${path}`;
	const image = `${siteUrl}/og-image.jpg`;
	// JSON-LD усередині <script>: екрануємо «<», щоб текст не міг закрити тег
	const json = $derived(schema ? JSON.stringify(schema).replace(/</g, '\\u003c') : '');
	const ldTag = $derived(json ? `<script type="application/ld+json">${json}</` + 'script>' : '');
</script>

<svelte:head>
	<title>{title}</title>
	<meta name="description" content={description} />
	<meta
		name="robots"
		content={noindex ? 'noindex, follow' : 'index, follow, max-image-preview:large'}
	/>
	<link rel="canonical" href={url} />
	<meta property="og:type" content="website" />
	<link rel="alternate" hreflang="uk" href={alt('uk')} />
	<link rel="alternate" hreflang="en" href={alt('en')} />
	<link rel="alternate" hreflang="x-default" href={alt('en')} />
	<meta property="og:locale" content={t.ogLocale} />
	<meta property="og:site_name" content={studio.legalName} />
	<meta property="og:title" content={title} />
	<meta property="og:description" content={description} />
	<meta property="og:url" content={url} />
	<meta property="og:image" content={image} />
	<meta property="og:image:width" content="1200" />
	<meta property="og:image:height" content="630" />
	<meta property="og:image:alt" content={t.seo.ogAlt} />
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content={title} />
	<meta name="twitter:description" content={description} />
	<meta name="twitter:image" content={image} />
	<meta name="geo.region" content="UA-30" />
	<meta name="geo.placename" content={studio.city} />
	<meta name="geo.position" content="{studio.geo.lat};{studio.geo.lng}" />
	<!-- eslint-disable-next-line svelte/no-at-html-tags -- лише наш серіалізований JSON-LD -->
	{@html ldTag}
</svelte:head>
