<script lang="ts">
	import { resolve } from '$app/paths';
	import { page } from '$app/state';
	import { tEn, tUk } from '#lib/ui.ts';

	// помилка може статися поза маршрутом [lang] — мову беремо з адреси
	const en = $derived(page.params.lang === 'en' || /\/en(\/|$)/.test(page.url.pathname));
	const t = $derived(en ? tEn : tUk);
	const nf = $derived(page.status === 404);
</script>

<svelte:head>
	<title>{nf ? t.error.notFound : t.error.error} — {en ? 'Rytm' : '«Ритм»'}</title>
	<meta name="robots" content="noindex, follow" />
</svelte:head>

<section class="wrap grid min-h-[85svh] content-center py-32" lang={t.langCode}>
	<p class="tag text-lime">{t.error.error} {page.status}</p>
	<h1 class="mega mt-4 text-[clamp(4rem,16vw,14rem)]">{nf ? t.error.out : t.error.knockdown}</h1>
	<p class="mt-4 max-w-md text-lg text-ash">
		{nf ? t.error.notFoundText : t.error.errorText}
		{t.error.back}
	</p>
	<a
		href={resolve('/[lang=lang]', { lang: en ? 'en' : 'uk' })}
		class="btn btn-lime mt-8 justify-self-start">{t.error.home}</a
	>
</section>
