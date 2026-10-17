/**
 * Мова сайту: /uk/… та /en/…. Корінь вибирає мову за часовим поясом (Україна → uk, інакше en),
 * ручний вибір зберігається в localStorage і має пріоритет.
 */
import { resolve } from '$app/paths';

export type Lang = 'uk' | 'en';
export const LANGS: Lang[] = ['uk', 'en'];
export const isLang = (v: unknown): v is Lang => v === 'uk' || v === 'en';

export let lang: Lang = 'uk';
export function setLangState(l: Lang): void {
	lang = l;
}

type Page = '/' | '/polityka-konfidentsiinosti';

/** Внутрішнє посилання з урахуванням base і мови: href('/polityka-konfidentsiinosti') */
export const href = (path: Page = '/', l: Lang = lang): string =>
	path === '/' ? resolve('/[lang=lang]', { lang: l }) : resolve(`/[lang=lang]${path}`, { lang: l });

/** Та сама сторінка іншою мовою (для перемикача): замінюємо мовний сегмент в адресі */
export const switchHref = (pathname: string, to: Lang): string =>
	pathname.replace(/\/(uk|en)(?=\/|$)/, `/${to}`);

/** Запам’ятати ручний вибір мови */
export function rememberLang(l: Lang): void {
	try {
		localStorage.setItem('lang', l);
	} catch {
		/* приватний режим — вибір діятиме до закриття вкладки */
	}
}

/** Скрипт кореневої сторінки: вибір мови до першої відмальовки */
export const detectScript = `(function(){var l='uk';try{var s=localStorage.getItem('lang');if(s==='uk'||s==='en'){l=s}else{var tz=(Intl.DateTimeFormat().resolvedOptions().timeZone||'');l=/^Europe\\/(Kyiv|Kiev|Uzhgorod|Zaporozhye|Simferopol)$/.test(tz)?'uk':'en'}}catch(e){}location.replace(l+'/'+location.search+location.hash)})()`;
