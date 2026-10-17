import { siteUrl } from '#lib/content.ts';

export const prerender = true;

const pages = [
	{ path: '/', changefreq: 'weekly', priority: '1.0', lastmod: '2026-10-17' },
	{
		path: '/polityka-konfidentsiinosti',
		changefreq: 'yearly',
		priority: '0.2',
		lastmod: '2026-10-17'
	}
];
const langs = ['uk', 'en'];

/** Обидві мовні версії з взаємними hreflang */
export function GET() {
	const urls = pages.flatMap((p) =>
		langs.map(
			(l) =>
				`  <url><loc>${siteUrl}/${l}${p.path}</loc>${langs.map((a) => `<xhtml:link rel="alternate" hreflang="${a}" href="${siteUrl}/${a}${p.path}"/>`).join('')}<lastmod>${p.lastmod}</lastmod><changefreq>${p.changefreq}</changefreq><priority>${p.priority}</priority></url>`
		)
	);
	const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urls.join('\n')}
</urlset>`;
	return new Response(body, { headers: { 'Content-Type': 'application/xml; charset=utf-8' } });
}
