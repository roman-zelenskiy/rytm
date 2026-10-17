import type { EntryGenerator } from './$types';

export const prerender = true;

/** Обидві мовні версії пререндеряться */
export const entries: EntryGenerator = () => [{ lang: 'uk' }, { lang: 'en' }];
