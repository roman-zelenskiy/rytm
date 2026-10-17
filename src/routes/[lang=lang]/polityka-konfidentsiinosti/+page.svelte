<script lang="ts">
	import Seo from '#lib/seo/Seo.svelte';
	import { studio, t } from '#lib/content.ts';
	import { href } from '#lib/i18n.ts';
</script>

<Seo title={t.policy.title} description={t.policy.description} path="/polityka-konfidentsiinosti" />

<article class="wrap max-w-3xl pt-32 pb-24">
	<p class="tag text-lime">{t.policy.edition}</p>
	<h1 class="mega mt-4 text-[clamp(2.6rem,9vw,6.5rem)] break-words hyphens-auto" lang={t.langCode}>
		{t.privacy}
	</h1>
	<p class="mt-6 text-lg text-chalk/85">{t.policy.intro(studio.legalName)}</p>
	{#each t.policy.sections as s (s.h)}
		<section class="mt-10">
			<h2 class="mega text-3xl">{s.h}</h2>
			<p class="mt-3 text-chalk/85">{s.p}</p>
		</section>
	{/each}
	<p class="mt-12 border-t border-steel pt-8 text-ash">
		{t.policy.questions}
		<a
			href="mailto:{studio.email}"
			rel="external"
			class="font-bold text-lime underline underline-offset-4">{studio.email}</a
		>
	</p>
	<a href={href('/')} class="btn btn-ghost mt-8">{t.policy.home}</a>
</article>
