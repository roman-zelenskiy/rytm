import { defineParams } from '@sveltejs/kit/params';

/** Мовний префікс: лише /uk/… і /en/… */
export const params = defineParams({
	lang: (p: string) => (p === 'uk' || p === 'en' ? p : undefined)
});
