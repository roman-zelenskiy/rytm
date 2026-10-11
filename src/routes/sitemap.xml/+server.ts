import { siteUrl } from '#lib/content.ts';

export const prerender = true;

const pages = [
	{ path: '/', changefreq: 'weekly', priority: '1.0', lastmod: '2026-10-10' },
	{
		path: '/polityka-konfidentsiinosti',
		changefreq: 'yearly',
		priority: '0.2',
		lastmod: '2026-09-01'
	}
];

export function GET() {
	const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages.map((p) => `  <url><loc>${siteUrl}${p.path}</loc><lastmod>${p.lastmod}</lastmod><changefreq>${p.changefreq}</changefreq><priority>${p.priority}</priority></url>`).join('\n')}
</urlset>`;
	return new Response(body, { headers: { 'Content-Type': 'application/xml; charset=utf-8' } });
}
