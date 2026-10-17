import type { Handle } from '@sveltejs/kit/hooks';

/** <html lang> за мовою маршруту */
export const handle: Handle = ({ event, resolve }) =>
	resolve(event, {
		transformPageChunk: ({ html }) =>
			html.replace('%lang%', event.params.lang === 'en' ? 'en' : 'uk')
	});
