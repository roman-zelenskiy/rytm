<script lang="ts">
	import Seo from '#lib/seo/Seo.svelte';
	import { t } from '#lib/content.ts';
	import { homeSchema } from '#lib/seo/schema.ts';
	import Hero from '#lib/components/sections/Hero.svelte';
	import Directions from '#lib/components/sections/Directions.svelte';
	import Quiz from '#lib/components/sections/Quiz.svelte';
	import Schedule from '#lib/components/sections/Schedule.svelte';
	import Coaches from '#lib/components/sections/Coaches.svelte';
	import Transformations from '#lib/components/sections/Transformations.svelte';
	import Pricing from '#lib/components/sections/Pricing.svelte';
	import Guarantee from '#lib/components/sections/Guarantee.svelte';
	import Stories from '#lib/components/sections/Stories.svelte';
	import Faq from '#lib/components/sections/Faq.svelte';
	import BookingSection from '#lib/components/sections/BookingSection.svelte';

	const title = t.seo.homeTitle;
	const description = t.seo.homeDescription;
</script>

<Seo {title} {description} path="/" schema={homeSchema(description)} />

<Hero />
<Directions />
<Quiz />
<Schedule />
<Coaches />
<Transformations />
<Pricing />
<Guarantee />
<Stories />
<Faq />
<BookingSection />
