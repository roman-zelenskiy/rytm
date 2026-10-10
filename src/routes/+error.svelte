<script lang="ts">
	import { resolve } from '$app/paths';
	import { page } from '$app/state';
</script>

<svelte:head>
	<title>{page.status === 404 ? 'Сторінку не знайдено' : 'Помилка'} — «Ритм»</title>
	<meta name="robots" content="noindex, follow" />
</svelte:head>

<section class="wrap grid min-h-[85svh] content-center py-32">
	<p class="tag text-lime">Помилка {page.status}</p>
	<h1 class="mega mt-4 text-[clamp(4rem,16vw,14rem)]">{page.status === 404 ? 'Аут' : 'Нокдаун'}</h1>
	<p class="mt-4 max-w-md text-lg text-ash">
		{page.status === 404 ? 'Такої сторінки немає — схоже, посилання застаріло.' : 'Щось пішло не так. Спробуйте оновити сторінку.'} Повертайтеся на головну — там розклад і запис на пробне.
	</p>
	<a href={resolve('/')} class="btn btn-lime mt-8 justify-self-start">На головну</a>
</section>
