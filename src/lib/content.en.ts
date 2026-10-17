/** English version of the site content. Same shape as content.uk.ts. */
import type { DirectionId, Period, PlanId, Slot } from './content.uk.ts';

export const studio = {
	name: 'Rytm',
	legalName: 'Rytm Fitness Studio',
	phone: '+380 67 555 41 20',
	phoneHref: 'tel:+380675554120',
	email: 'hello@rytm.fit',
	street: '41 Kyrylivska St',
	district: 'Podil',
	city: 'Kyiv',
	postalCode: '04080',
	metro: 'Kontraktova Ploshcha metro, 7 min walk',
	geo: { lat: 50.4731, lng: 30.5094 },
	hours: [
		{ days: 'Mon–Fri', time: '7:00–22:00' },
		{ days: 'Sat–Sun', time: '9:00–20:00' }
	],
	telegram: 'https://t.me/rytm_kyiv',
	viber: 'viber://chat?number=%2B380675554120',
	instagram: 'https://instagram.com/rytm.kyiv',
	mapsUrl: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent('Kyiv, Kyrylivska St, 41')}`,
	rating: 4.9,
	reviewsCount: 286
};

export const nav = [
	{ id: 'napriamy', label: 'Classes' },
	{ id: 'rozklad', label: 'Schedule' },
	{ id: 'treneri', label: 'Coaches' },
	{ id: 'taryfy', label: 'Pricing' },
	{ id: 'harantiia', label: 'Guarantee' },
	{ id: 'faq', label: 'FAQ' }
];

export const heroStats = [
	{ value: '6', unit: 'years', label: 'in Podil' },
	{ value: '2,000+', unit: '', label: 'members' },
	{ value: '10', unit: 'people', label: 'max per group' },
	{ value: '8', unit: 'weeks', label: 'to results' }
];

export const directions: {
	id: DirectionId;
	title: string;
	short: string;
	lead: string;
	forWhom: string;
	duration: string;
	intensity: number;
	priceFrom: number;
	points: string[];
	alt: string;
}[] = [
	{
		id: 'functional',
		title: 'Functional',
		short: 'Functional training',
		lead: 'Functional training in Kyiv for people who are bored on a treadmill. Ropes, kettlebells, box jumps and intervals to music — 55 minutes that make your body work better in real life, not just in the gym.',
		forWhom: 'You want to lose weight and get stronger and fitter without monotonous machines.',
		duration: '55 min',
		intensity: 4,
		priceFrom: 450,
		points: [
			'HIIT intervals and circuit training',
			'Kettlebell and barbell technique',
			'Monthly progress check-ins'
		],
		alt: 'Athlete working with battle ropes in the gym'
	},
	{
		id: 'boxing',
		title: 'Boxing',
		short: 'Boxing',
		lead: 'Boxing for beginners in Kyiv: we build your stance, punches and defence from scratch, then move on to pad work and optional controlled sparring. The best way to drop stress after work.',
		forWhom: 'You want to let off steam, learn to stand up for yourself and stay in shape.',
		duration: '60 min',
		intensity: 5,
		priceFrom: 450,
		points: [
			'Groups for beginners and experienced boxers',
			'Gloves and wraps provided for your trial',
			'Sparring only if you want it'
		],
		alt: 'Female boxer in gloves under the gym’s neon light'
	},
	{
		id: 'stretching',
		title: 'Stretching',
		short: 'Stretching',
		lead: 'Stretching and mobility for a healthy back and flexibility. Slow but not easy: we work on splits, posture and recovery after strength and boxing sessions.',
		forWhom: 'You sit at a laptop all day, your back hurts or you want to do the splits.',
		duration: '60 min',
		intensity: 2,
		priceFrom: 400,
		points: [
			'Spine and hip mobility',
			'A structured path to the splits',
			'The perfect complement to strength work'
		],
		alt: 'Black and white photo: athlete doing a stretching exercise'
	},
	{
		id: 'personal',
		title: 'Personal',
		short: 'Personal training',
		lead: 'A personal trainer in Kyiv who builds a programme around your goal, schedule and health. Technique, nutrition, accountability — and no guesswork.',
		forWhom: 'You need maximum results, rehabilitation or preparation for a competition.',
		duration: '60 min',
		intensity: 3,
		priceFrom: 900,
		points: [
			'Individual programme and nutrition plan',
			'Your coach on Telegram',
			'Train together with a friend'
		],
		alt: 'Female coach spotting a client during push-ups'
	}
];

export const quiz = {
	steps: [
		{
			key: 'goal',
			title: 'What’s your goal?',
			options: [
				{ value: 'lose', label: 'Lose weight', hint: 'fewer kilos and centimetres' },
				{ value: 'strong', label: 'Strength & tone', hint: 'a body you can see' },
				{ value: 'stress', label: 'Drop stress', hint: 'and learn to punch' },
				{ value: 'flex', label: 'Flexibility & back', hint: 'no pain, no stiffness' }
			]
		},
		{
			key: 'level',
			title: 'Your current level?',
			options: [
				{ value: 'zero', label: 'From scratch', hint: 'haven’t trained in a while' },
				{ value: 'some', label: 'Now and then', hint: '1–2 times a month' },
				{ value: 'pro', label: 'Regularly', hint: 'the gym feels like home' }
			]
		},
		{
			key: 'freq',
			title: 'How many times a week?',
			options: [
				{ value: '2', label: '1–2 times', hint: 'busy schedule' },
				{ value: '3', label: '3 times', hint: 'optimal for results' },
				{ value: '4', label: '4+ times', hint: 'I want the max' }
			]
		}
	]
} as const;

export const coaches = [
	{
		id: 'maksym',
		name: 'Maksym Koval',
		role: 'Boxing',
		achievements: [
			'Candidate Master of Sport in boxing, 12 years in the ring',
			'Kyiv youth team coach (2019–2022)',
			'Teaches beginners a proper punch in 4 weeks'
		],
		alt: 'Coach Maksym Koval in a fighting stance in the gym'
	},
	{
		id: 'olha',
		name: 'Olha Savchuk',
		role: 'Functional training',
		achievements: [
			'Master of Sport in track and field',
			'ACE Personal Trainer certified',
			'300+ clients with results'
		],
		alt: 'Coach Olha Savchuk in a sports top'
	},
	{
		id: 'artem',
		name: 'Artem Lytvyn',
		role: 'Personal training',
		achievements: [
			'NSCA-CPT, strength and conditioning',
			'Post-injury rehabilitation',
			'8 years of one-to-one coaching'
		],
		alt: 'Coach Artem Lytvyn wearing headphones next to dumbbells'
	},
	{
		id: 'iryna',
		name: 'Iryna Bondar',
		role: 'Stretching & mobility',
		achievements: [
			'Former ballet dancer',
			'Stretching Global certified',
			'Specialises in back and posture'
		],
		alt: 'Black and white portrait of coach Iryna Bondar'
	}
] as const;

const dirShort: Record<DirectionId, string> = {
	functional: 'Functional',
	boxing: 'Boxing',
	stretching: 'Stretching',
	personal: 'Personal'
};
export const directionLabel = (id: DirectionId) => dirShort[id];

export const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'] as const;
export const daysFull = [
	'Monday',
	'Tuesday',
	'Wednesday',
	'Thursday',
	'Friday',
	'Saturday',
	'Sunday'
] as const;

const LEVEL: Record<string, string> = {
	'Усі рівні': 'All levels',
	Новачки: 'Beginners',
	Середній: 'Intermediate',
	Досвідчені: 'Advanced'
};
import { schedule as scheduleUk } from './content.uk.ts';
/** Same weekly timetable, levels translated */
export const schedule: Slot[] = scheduleUk.map((s) => ({ ...s, level: LEVEL[s.level] ?? s.level }));

export const transformations = [
	{
		id: 'andrii',
		name: 'Andrii, 34',
		headline: '−11 kg',
		weeks: 8,
		plan: 'Functional, 3 times a week',
		quote:
			'I never thought I’d look forward to training like a weekend. The first two weeks are the hardest — after that the group’s rhythm carries you.',
		metrics: [
			{ label: 'Weight', from: '96 kg', to: '85 kg', progress: 0.82 },
			{ label: 'Waist', from: '102 cm', to: '91 cm', progress: 0.74 },
			{ label: 'Pull-ups', from: '0', to: '6 reps', progress: 0.6 }
		],
		alt: 'Andrii doing a kettlebell exercise in the gym'
	},
	{
		id: 'sofia',
		name: 'Sofia, 27',
		headline: '+40% strength',
		weeks: 8,
		plan: 'Functional + personal, 4 times',
		quote:
			'I came to ‘tone up’ and stayed for the people. Now I squat weights I never even imagined lifting.',
		metrics: [
			{ label: 'Squat', from: '40 kg', to: '65 kg', progress: 0.9 },
			{ label: 'Plank', from: '0:45', to: '2:30', progress: 0.85 },
			{ label: 'Body fat', from: '29%', to: '23%', progress: 0.66 }
		],
		alt: 'Sofia doing a barbell squat'
	},
	{
		id: 'kateryna',
		name: 'Kateryna, 31',
		headline: '6 rounds',
		weeks: 8,
		plan: 'Boxing + stretching, 3 times',
		quote:
			'I started from zero and was scared of getting hit in the face. Two months later — my first sparring and seven kilos down.',
		metrics: [
			{ label: 'Weight', from: '68 kg', to: '61 kg', progress: 0.7 },
			{ label: 'Resting heart rate', from: '82', to: '64', progress: 0.78 },
			{ label: 'Rounds non-stop', from: '1', to: '6', progress: 0.95 }
		],
		alt: 'Women doing box jumps during a group class'
	}
] as const;

export const periods: { id: Period; label: string; note: string }[] = [
	{ id: 'month', label: 'Month', note: '' },
	{ id: 'quarter', label: '3 months', note: '−10%' },
	{ id: 'year', label: 'Year', note: '−20%' }
];

export const plans: {
	id: PlanId;
	name: string;
	sub: string;
	price: Record<Period, number>;
	perMonth: boolean;
	featured?: boolean;
	features: string[];
}[] = [
	{
		id: 'single',
		name: 'Drop-in',
		sub: 'one group class',
		price: { month: 450, quarter: 450, year: 450 },
		perMonth: false,
		features: ['Any group class', 'No membership, no commitment', 'Towel and water included']
	},
	{
		id: 'pack8',
		name: '8-class pass',
		sub: '8 group classes a month',
		price: { month: 2600, quarter: 2340, year: 2080 },
		perMonth: true,
		features: [
			'2 classes a week',
			'All group classes',
			'Freeze for up to 14 days',
			'Monthly progress check-ins'
		]
	},
	{
		id: 'unlimited',
		name: 'Unlimited',
		sub: 'unlimited group classes',
		price: { month: 3400, quarter: 3060, year: 2720 },
		perMonth: true,
		featured: true,
		features: [
			'Unlimited group classes',
			'8-week results guarantee',
			'Nutrition plan from your coach',
			'Freeze for up to 30 days'
		]
	},
	{
		id: 'personal',
		name: 'Personal',
		sub: '8 sessions with a coach',
		price: { month: 7200, quarter: 6840, year: 6480 },
		perMonth: true,
		features: [
			'Individual programme',
			'Nutrition and check-ins on Telegram',
			'Train in pairs (+40%)',
			'8-week results guarantee'
		]
	}
];

export const guarantee = {
	conditions: [
		'Attend at least 24 sessions in 8 weeks (3 a week)',
		'Follow your coach’s nutrition plan — no diets, no starving',
		'We measure you at the start and at the end: weight, measurements, fitness tests',
		'Didn’t reach the agreed goal? We refund 100% of your membership'
	]
};

export const stories = [
	{
		id: 'pads',
		name: 'Vlad Moroz',
		handle: '@vlad.moroz',
		dir: 'Boxing',
		text: 'I came to the trial just ‘to have a look’ and within an hour I knew I was staying. From the very first class the coach worked on my punch instead of making me run laps.',
		alt: 'Coach holding pads while a client throws a combination'
	},
	{
		id: 'group',
		name: 'Anya Tkachuk',
		handle: '@anya.tk',
		dir: 'Functional',
		text: 'A group of up to 10 means the coach actually sees your technique. Two months: −6 kg and, for the first time in my life, 10 push-ups.',
		alt: 'Group class: women exercising on mats'
	},
	{
		id: 'ropes',
		name: 'Olena Hrytsenko',
		handle: '@olena.grytsenko',
		dir: 'Functional',
		text: 'I was always bored at the gym. Here every class feels like a concert: music, ropes, circuits. Time flies.',
		alt: 'Athlete working with battle ropes'
	},
	{
		id: 'bench',
		name: 'Serhii Pavlenko',
		handle: '@s.pavlenko',
		dir: 'Personal',
		text: 'After a knee injury I was afraid of any load. Artem built a programme, and in 3 months I’m running and squatting again without pain.',
		alt: 'Athlete getting ready for an exercise in the strength zone'
	},
	{
		id: 'kettle',
		name: 'Marta Lysenko',
		handle: '@marta.lys',
		dir: 'Stretching',
		text: 'I sit at my laptop 9 hours a day. Two stretching classes a week — and my back stopped complaining. And I’m almost doing the splits!',
		alt: 'Athlete holding a barbell overhead'
	}
] as const;

export const faq = [
	{
		q: 'Is the trial class really free?',
		a: 'Yes, completely. Your first group class in any discipline costs nothing and you don’t have to buy a membership. You meet the coach, the gym and the group, and we do a quick fitness assessment.'
	},
	{
		q: 'I’ve never trained before — will it be too hard?',
		a: 'Groups are split by level and the coach scales every exercise: a beginner does the same work with less weight or range. After 3–4 weeks you keep up with the group — that’s how it goes for most of our members.'
	},
	{
		q: 'How does the “results in 8 weeks or your money back” guarantee work?',
		a: 'At the start we set a realistic goal and take measurements with your coach. If you attended at least 24 sessions, followed the nutrition plan and didn’t reach the goal, we refund 100% of your Unlimited or Personal membership. The terms are in the contract.'
	},
	{
		q: 'What should I bring to my first class?',
		a: 'Comfortable clothes, indoor shoes and a bottle of water. For boxing we lend you gloves and wraps free of charge for the trial. Towels, showers and lockers are at the studio.'
	},
	{
		q: 'Can I freeze my membership?',
		a: 'Yes. The 8-class pass can be frozen for up to 14 days, Unlimited for up to 30 days a year. Just message the front desk on Telegram.'
	},
	{
		q: 'Is boxing dangerous? Will I get hit?',
		a: 'Not unless you want to. Most sessions are technique, pad work and bag work. Sparring is optional, with protective gear, and only once your coach thinks you’re ready.'
	},
	{
		q: 'Are there any contraindications?',
		a: 'Before you start you fill in a short health questionnaire. With chronic conditions, injuries or pregnancy we recommend starting with personal training or stretching — your coach will adapt the load.'
	},
	{
		q: 'Can I pay in instalments?',
		a: 'Yes, an annual membership can be paid in up to 6 interest-free instalments through partner banks. We also accept card payments and bank transfers.'
	}
];

export const bookingDirections = [
	'Functional training',
	'Boxing',
	'Stretching',
	'Personal training',
	'Not sure yet'
];
