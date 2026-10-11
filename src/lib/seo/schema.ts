import { faq, plans, siteUrl, stories, studio } from '#lib/content.ts';

/** JSON-LD для головної: студія (ExerciseGym + SportsActivityLocation), тарифи як Offer, відгуки, FAQ */
export function homeSchema(description: string) {
	const id = `${siteUrl}/#studio`;
	return {
		'@context': 'https://schema.org',
		'@graph': [
			{
				'@type': 'WebSite',
				'@id': `${siteUrl}/#website`,
				url: `${siteUrl}/`,
				name: studio.legalName,
				inLanguage: 'uk-UA',
				publisher: { '@id': id }
			},
			{
				'@type': ['ExerciseGym', 'SportsActivityLocation'],
				'@id': id,
				name: studio.legalName,
				description,
				url: `${siteUrl}/`,
				image: `${siteUrl}/og-image.jpg`,
				logo: `${siteUrl}/favicon.svg`,
				telephone: studio.phone,
				email: studio.email,
				priceRange: '450–7200 грн',
				currenciesAccepted: 'UAH',
				address: {
					'@type': 'PostalAddress',
					streetAddress: studio.street,
					addressLocality: studio.city,
					addressRegion: 'Київ',
					postalCode: studio.postalCode,
					addressCountry: 'UA'
				},
				geo: { '@type': 'GeoCoordinates', latitude: studio.geo.lat, longitude: studio.geo.lng },
				hasMap: studio.mapsUrl,
				openingHoursSpecification: [
					{
						'@type': 'OpeningHoursSpecification',
						dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
						opens: '07:00',
						closes: '22:00'
					},
					{
						'@type': 'OpeningHoursSpecification',
						dayOfWeek: ['Saturday', 'Sunday'],
						opens: '09:00',
						closes: '20:00'
					}
				],
				sameAs: [studio.instagram, studio.telegram],
				aggregateRating: {
					'@type': 'AggregateRating',
					ratingValue: studio.rating,
					reviewCount: studio.reviewsCount,
					bestRating: 5
				},
				review: stories.map((s) => ({
					'@type': 'Review',
					author: { '@type': 'Person', name: s.name },
					reviewBody: s.text,
					reviewRating: { '@type': 'Rating', ratingValue: 5, bestRating: 5 }
				})),
				makesOffer: [
					{
						'@type': 'Offer',
						name: 'Пробне тренування',
						price: 0,
						priceCurrency: 'UAH',
						description: 'Перше групове тренування — безкоштовно'
					},
					...plans.map((p) => ({
						'@type': 'Offer',
						name: p.name,
						description: `${p.sub}. ${p.features.join(', ')}.`,
						priceCurrency: 'UAH',
						price: p.price.month,
						priceSpecification: {
							'@type': 'UnitPriceSpecification',
							price: p.price.month,
							priceCurrency: 'UAH',
							...(p.perMonth && { unitText: 'місяць', billingDuration: 'P1M' })
						},
						availability: 'https://schema.org/InStock'
					}))
				]
			},
			{
				'@type': 'FAQPage',
				'@id': `${siteUrl}/#faq`,
				mainEntity: faq.map((f) => ({
					'@type': 'Question',
					name: f.q,
					acceptedAnswer: { '@type': 'Answer', text: f.a }
				}))
			}
		]
	};
}
