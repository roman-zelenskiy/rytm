import { enhancedImages } from '@sveltejs/enhanced-img';
import tailwindcss from '@tailwindcss/vite';
import adapterNode from '@sveltejs/adapter-node';
import adapterStatic from '@sveltejs/adapter-static';
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

/**
 * Дві збірки з одного коду:
 *  - за замовчуванням — Node-сервер (SSR на запит + пререндер статичних сторінок);
 *  - STATIC=1 — повністю статичний експорт для GitHub Pages (BASE_PATH=/<repo>).
 * В обох випадках HTML містить увесь контент, мета-теги й JSON-LD.
 */
const isStatic = process.env.STATIC === '1';
const base = (isStatic ? (process.env.BASE_PATH ?? '') : '') as '' | `/${string}`;

export default defineConfig({
	plugins: [
		enhancedImages(),
		tailwindcss(),
		sveltekit({
			compilerOptions: {
				// Force runes mode for the project, except for libraries. Can be removed in svelte 6.
				runes: ({ filename }) =>
					filename.split(/[/\\]/).includes('node_modules') ? undefined : true
			},
			adapter: isStatic ? adapterStatic({ fallback: '404.html' }) : adapterNode(),
			paths: { base, relative: true },
			prerender: { handleHttpError: 'fail', handleMissingId: 'fail' }
		})
	]
});
