/** Рядки інтерфейсу «Ритму»: українська й англійська. Функції — для відмінювання й підстановок. */

const ukPlural = (n: number, one: string, few: string, many: string) => {
	const m10 = n % 10;
	const m100 = n % 100;
	if (m10 === 1 && m100 !== 11) return one;
	if (m10 >= 2 && m10 <= 4 && (m100 < 12 || m100 > 14)) return few;
	return many;
};

export const tUk = {
	langCode: 'uk',
	locale: 'uk-UA',
	ogLocale: 'uk_UA',
	cur: 'грн',
	decimal: (n: number) => n.toString().replace('.', ','),
	q: (s: string) => `«${s}»`,
	skip: 'Перейти до вмісту',
	close: 'Закрити',
	bookTrial: 'Записатися на пробне',
	bookTitle: 'Запис на пробне',
	privacy: 'Політика конфіденційності',
	header: {
		home: 'Фітнес-студія «Ритм» — на головну',
		nav: 'Основна навігація',
		mobileNav: 'Мобільна навігація',
		switchLabel: 'English version',
		trial: 'Пробне безкоштовно',
		openMenu: 'Відкрити меню',
		closeMenu: 'Закрити меню'
	},
	hero: {
		alt: 'Боксер наносить удар у рукавичці — чорно-біле фото в русі',
		eyebrow: 'Фітнес-студія «Ритм» · Київ, Поділ',
		line1: 'Тренуйся',
		line2: 'в ритмі',
		offerA: 'Перше тренування —',
		offerFree: 'безкоштовно',
		offerB: 'Результат за 8 тижнів або повернемо гроші.',
		lead: 'Функціональні тренування, бокс для початківців, стретчинг і персональний тренер у Києві. Міні-групи до 10 осіб — тренер бачить кожного.',
		quiz: 'Підібрати програму'
	},
	dir: {
		eyebrow: 'Напрями',
		title: 'Обери',
		accent: 'свій ритм',
		from: (n: number) => `від ${n} грн`,
		forWhom: 'Кому:',
		intensity: 'Інтенсивність',
		intensityOf: (n: number) => `Інтенсивність ${n} з 5`,
		try: 'Спробувати безкоштовно'
	},
	quiz: {
		eyebrow: '30 секунд',
		title: 'Підбери',
		accent: 'програму',
		lead: 'Три питання — і ви знаєте, з якого напряму почати, скільки разів тренуватись і який тариф вигідніший саме вам.',
		progress: 'Прогрес',
		result: 'Результат',
		stepOf: (a: number, b: number) => `Крок ${a} з ${b}`,
		back: 'Назад',
		next: 'Далі',
		myResult: 'Мій результат',
		yourProgram: 'Ваша програма',
		forecastLabel: 'Прогноз:',
		plan: 'Тариф',
		perMonth: (n: number) => `від ${n.toLocaleString('uk-UA')} грн/міс`,
		coach: 'Тренер',
		nearest: 'Найближчі',
		again: 'Пройти ще раз',
		extraZero: 'Почніть із 1–2 персональних, щоб поставити техніку, — перше теж безкоштовне.',
		extraMax: 'Додайте 1 персональне на тиждень — це найшвидший шлях до цілі.',
		forecast: {
			lose: '−4…−7 кг і мінус розмір одягу за 8 тижнів',
			strong: '+25–40% у силових вправах за 8 тижнів',
			stress: 'перша серія на лапах через 4 тижні, спаринг — за бажанням',
			flex: 'спина без затисків і шпагат ближче на 15–20 см за 8 тижнів'
		} as Record<string, string>
	},
	sched: {
		eyebrow: 'Тиждень у залі',
		title: 'Розклад',
		lead: 'Групи до 10 осіб, тому місця розбирають швидко. Оберіть напрям або тренера — і записуйтесь на вільний слот.',
		all: 'Усі',
		allCoaches: 'Усі тренери',
		dirLabel: 'Напрям',
		coachLabel: 'Тренер',
		dayLabel: 'День тижня',
		perWeek: 'на тиждень',
		classes: (n: number) => ukPlural(n, 'заняття', 'заняття', 'занять'),
		spots: (n: number) => `${n} ${n === 1 ? 'місце' : n < 5 ? 'місця' : 'місць'}`,
		bookAria: (dir: string, day: string, time: string) => `Записатися: ${dir}, ${day} ${time}`,
		none: 'Немає занять'
	},
	coaches: {
		eyebrow: 'Команда',
		title: 'Тренери,',
		accent: 'які тиснуть',
		lead: 'Кожен тренер — практик зі спортивним минулим. Персональний тренер у Києві, з яким не хочеться пропускати.',
		achievements: 'Регалії',
		achAria: (name: string) => `Регалії тренера: ${name}`
	},
	tr: {
		eyebrow: 'Результати клієнтів',
		title: 'Трансфор-',
		accent: 'мації',
		lead: 'Реальні цифри за 8 тижнів — з замірами на старті й у фіналі. Імена та фото — з дозволу клієнтів.',
		weeks: (n: number) => `${n} тижнів`,
		became: ', стало',
		progress: (label: string, pct: number) => `${label}: прогрес ${pct}%`
	},
	price: {
		eyebrow: 'Ціни без зірочок',
		title: 'Тарифи',
		period: 'Період оплати',
		shownFor: (p: string) => `Ціни показано для періоду: ${p}`,
		hit: 'Хіт',
		perMo: '/міс',
		total: (sum: string, year: boolean, save: string) =>
			`${sum} грн за ${year ? 'рік' : '3 місяці'} · економія ${save} грн`,
		flat: 'ціна не залежить від періоду',
		start: 'Почати з пробного',
		note: 'Перше тренування — безкоштовно для всіх тарифів. Оплата карткою, на рахунок ФОП або частинами до 6 місяців.'
	},
	guar: {
		eyebrow: 'Гарантія результату',
		l1: '8 тижнів',
		l2: 'або гроші',
		l3: 'назад',
		segments: 'Програма триває 8 тижнів',
		note: 'Гарантія діє для тарифів «Безлім» і «Персонально». Ціль і заміри фіксуємо письмово в перший тиждень — разом із тренером, реалістично й без «мінус 20 кг за місяць».',
		cta: 'Прийняти виклик'
	},
	stories: {
		eyebrow: 'Відгуки',
		title: 'Сторіз',
		accent: 'наших',
		rating: (r: number) => `Рейтинг ${r} з 5`,
		reviews: (n: number) => `${n} відгуків у Google`,
		pick: 'Обрати історію',
		story: (name: string) => `Історія: ${name}`,
		role: 'сторіз',
		region: 'Відгуки клієнтів',
		prev: 'Попередня історія',
		next: 'Наступна історія',
		play: 'Відтворити',
		pause: 'Пауза',
		hint: 'стрілки ← → або тап по краях'
	},
	faq: { title: 'Чесно', accent: 'про все' },
	bsec: {
		eyebrow: 'Пробне тренування',
		l1: 'Перше —',
		l2: '0 гривень',
		p1: 'Знайомство з тренером і замір рівня',
		p2: 'Повноцінне тренування в міні-групі',
		p3: 'План на 8 тижнів — навіть якщо не залишитесь',
		call: 'Зручніше зателефонувати?',
		reply: 'Відповімо протягом 15 хвилин у робочий час.'
	},
	dlg: {
		tag: 'Пробне — 0 грн',
		lead: '55–60 хвилин у міні-групі. Заміримо рівень і підберемо програму.'
	},
	form: {
		name: 'Ім’я',
		namePh: 'Як до вас звертатися',
		phone: 'Телефон',
		dir: 'Напрям',
		day: 'Зручний день',
		errName: 'Як до вас звертатися?',
		errLetters: 'Лише літери, будь ласка',
		errPhone: 'Вкажіть номер — передзвонимо й підтвердимо',
		errPhoneShort: 'Номер неповний: +380 (XX) XXX-XX-XX',
		errDay: 'Оберіть зручний день',
		offline: 'Немає з’єднання з інтернетом. Перевірте мережу або зателефонуйте нам.',
		sending: 'Надсилаємо…',
		consent: 'Натискаючи кнопку, ви погоджуєтеся з',
		consentLink: 'політикою конфіденційності',
		done: (name: string) => `Ви в ритмі, ${name}!`,
		doneText: (day: string) =>
			`Адміністратор напише в Telegram або передзвонить протягом 15 хвилин і закріпить місце на ${day.toLowerCase()}.`,
		another: 'Записати ще когось'
	},
	foot: {
		l1: 'Побачимось',
		l2: 'на тренуванні',
		about:
			'Фітнес-студія в Києві: функціональні тренування, бокс, стретчинг і персональний тренер на Подолі.',
		tg: 'Написати в Telegram',
		viber: 'Написати у Viber',
		ig: 'Instagram студії',
		contacts: 'Контакти',
		hours: 'Графік',
		nav: 'Навігація в підвалі',
		mapAria:
			'Схема проїзду: студія «Ритм» на вулиці Кирилівській, 41, сім хвилин від метро «Контрактова площа»',
		st1: 'ВУЛ. КИРИЛІВСЬКА',
		st2: 'ВУЛ. ВЕРХНІЙ ВАЛ',
		metro: 'М',
		pin: 'РИТМ · 41',
		route: 'Маршрут',
		copy: '© 2020–2026 Фітнес-студія «Ритм», Київ'
	},
	mcta: { label: 'Швидкий запис', call: (p: string) => `Зателефонувати ${p}` },
	seo: {
		homeTitle: 'Фітнес-студія Київ «Ритм» — бокс, функціонал, стретчинг',
		homeDescription:
			'Фітнес-студія «Ритм» на Подолі: функціональні тренування, бокс для початківців, стретчинг і персональний тренер у Києві. Перше тренування безкоштовно, результат за 8 тижнів.',
		ogAlt: 'Фітнес-студія «Ритм» у Києві — перше тренування безкоштовно',
		priceRange: '450–7200 грн',
		region: 'Київ',
		trialName: 'Пробне тренування',
		trialDesc: 'Перше групове тренування — безкоштовно',
		month: 'місяць',
		inLanguage: 'uk-UA'
	},
	policy: {
		title: 'Політика конфіденційності — фітнес-студія «Ритм»',
		description: 'Як фітнес-студія «Ритм» збирає, зберігає та захищає персональні дані клієнтів.',
		edition: 'Редакція від 1 вересня 2026',
		intro: (name: string) =>
			`${name} поважає вашу приватність. Залишаючи заявку на сайті, ви погоджуєтеся з умовами цієї політики.`,
		questions: 'Питання щодо даних:',
		home: '← На головну',
		sections: [
			{
				h: '1. Які дані ми збираємо',
				p: 'Ім’я, номер телефону, обраний напрям і зручний день, які ви залишаєте у формі запису. Під час тренувань — дані замірів (вага, обʼєми, функціональні тести), лише за вашою згодою та для контролю прогресу.'
			},
			{
				h: '2. Навіщо вони потрібні',
				p: 'Щоб підтвердити запис, нагадати про тренування, скласти програму й фіксувати результат за гарантією «8 тижнів». Ми не передаємо дані третім особам, крім випадків, передбачених законом, і не робимо масових розсилок.'
			},
			{
				h: '3. Як ми їх зберігаємо',
				p: 'Дані зберігаються в захищеній CRM-системі з обмеженим доступом адміністраторів і вашого тренера. Заявки без подальших візитів видаляємо через 12 місяців.'
			},
			{
				h: '4. Ваші права',
				p: 'Ви можете будь-коли запросити доступ до своїх даних, їх виправлення або видалення, написавши нам на пошту. Відповідаємо протягом 10 робочих днів відповідно до Закону України «Про захист персональних даних».'
			},
			{
				h: '5. Cookies',
				p: 'Сайт використовує лише технічні cookies, необхідні для роботи, та знеособлену аналітику. Вимкнути cookies можна в налаштуваннях браузера.'
			}
		]
	},
	error: {
		notFound: 'Сторінку не знайдено',
		error: 'Помилка',
		out: 'Аут',
		knockdown: 'Нокдаун',
		notFoundText: 'Такої сторінки немає — схоже, посилання застаріло.',
		errorText: 'Щось пішло не так. Спробуйте оновити сторінку.',
		back: 'Повертайтеся на головну — там розклад і запис на пробне.',
		home: 'На головну'
	}
};

export type Ui = typeof tUk;

export const tEn: Ui = {
	langCode: 'en',
	locale: 'en-US',
	ogLocale: 'en_US',
	cur: 'UAH',
	decimal: (n: number) => n.toString(),
	q: (s: string) => `“${s}”`,
	skip: 'Skip to content',
	close: 'Close',
	bookTrial: 'Book a free trial',
	bookTitle: 'Book a trial class',
	privacy: 'Privacy policy',
	header: {
		home: 'Rytm fitness studio — home',
		nav: 'Main navigation',
		mobileNav: 'Mobile navigation',
		switchLabel: 'Українська версія',
		trial: 'Free trial',
		openMenu: 'Open menu',
		closeMenu: 'Close menu'
	},
	hero: {
		alt: 'Boxer throwing a punch — black and white motion shot',
		eyebrow: 'Rytm fitness studio · Kyiv, Podil',
		line1: 'Train',
		line2: 'to the beat',
		offerA: 'Your first class is',
		offerFree: 'free',
		offerB: 'Results in 8 weeks or your money back.',
		lead: 'Functional training, boxing for beginners, stretching and personal training in Kyiv. Small groups of up to 10 — the coach sees everyone.',
		quiz: 'Find my programme'
	},
	dir: {
		eyebrow: 'Classes',
		title: 'Find',
		accent: 'your rhythm',
		from: (n: number) => `from ${n} UAH`,
		forWhom: 'For you if:',
		intensity: 'Intensity',
		intensityOf: (n: number) => `Intensity ${n} of 5`,
		try: 'Try it free'
	},
	quiz: {
		eyebrow: '30 seconds',
		title: 'Find',
		accent: 'your plan',
		lead: 'Three questions — and you know which class to start with, how often to train and which plan suits you best.',
		progress: 'Progress',
		result: 'Result',
		stepOf: (a: number, b: number) => `Step ${a} of ${b}`,
		back: 'Back',
		next: 'Next',
		myResult: 'My result',
		yourProgram: 'Your programme',
		forecastLabel: 'Forecast:',
		plan: 'Plan',
		perMonth: (n: number) => `from ${n.toLocaleString('en-US')} UAH/mo`,
		coach: 'Coach',
		nearest: 'Next classes',
		again: 'Start over',
		extraZero:
			'Start with 1–2 personal sessions to nail your technique — the first one is free too.',
		extraMax: 'Add 1 personal session a week — the fastest way to your goal.',
		forecast: {
			lose: '−4…−7 kg and one clothing size down in 8 weeks',
			strong: '+25–40% on strength lifts in 8 weeks',
			stress: 'your first pad combo in 4 weeks, sparring if you want it',
			flex: 'a looser back and 15–20 cm closer to the splits in 8 weeks'
		}
	},
	sched: {
		eyebrow: 'A week at the gym',
		title: 'Schedule',
		lead: 'Groups are capped at 10, so spots go fast. Pick a class or a coach and grab a free slot.',
		all: 'All',
		allCoaches: 'All coaches',
		dirLabel: 'Class',
		coachLabel: 'Coach',
		dayLabel: 'Day of the week',
		perWeek: 'a week',
		classes: (n: number) => (n === 1 ? 'class' : 'classes'),
		spots: (n: number) => `${n} ${n === 1 ? 'spot' : 'spots'} left`,
		bookAria: (dir: string, day: string, time: string) => `Book: ${dir}, ${day} ${time}`,
		none: 'No classes'
	},
	coaches: {
		eyebrow: 'The team',
		title: 'Coaches',
		accent: 'who push you',
		lead: 'Every coach is a practitioner with a sporting background. Personal training in Kyiv you won’t want to skip.',
		achievements: 'Credentials',
		achAria: (name: string) => `Coach credentials: ${name}`
	},
	tr: {
		eyebrow: 'Member results',
		title: 'Transfor-',
		accent: 'mations',
		lead: 'Real numbers over 8 weeks, measured at the start and at the finish. Names and photos shared with members’ permission.',
		weeks: (n: number) => `${n} weeks`,
		became: ', now',
		progress: (label: string, pct: number) => `${label}: ${pct}% progress`
	},
	price: {
		eyebrow: 'No fine print',
		title: 'Pricing',
		period: 'Billing period',
		shownFor: (p: string) => `Prices shown for: ${p}`,
		hit: 'Popular',
		perMo: '/mo',
		total: (sum: string, year: boolean, save: string) =>
			`${sum} UAH per ${year ? 'year' : '3 months'} · you save ${save} UAH`,
		flat: 'same price for any period',
		start: 'Start with a trial',
		note: 'Your first class is free on every plan. Pay by card, bank transfer or in up to 6 instalments.'
	},
	guar: {
		eyebrow: 'Results guarantee',
		l1: '8 weeks',
		l2: 'or your money',
		l3: 'back',
		segments: 'The programme lasts 8 weeks',
		note: 'The guarantee applies to the Unlimited and Personal plans. We put your goal and measurements in writing in week one — together with your coach, realistically, no “minus 20 kg in a month”.',
		cta: 'Take the challenge'
	},
	stories: {
		eyebrow: 'Reviews',
		title: 'Member',
		accent: 'stories',
		rating: (r: number) => `Rated ${r} out of 5`,
		reviews: (n: number) => `${n} reviews on Google`,
		pick: 'Choose a story',
		story: (name: string) => `Story: ${name}`,
		role: 'stories',
		region: 'Member reviews',
		prev: 'Previous story',
		next: 'Next story',
		play: 'Play',
		pause: 'Pause',
		hint: 'use ← → or tap the edges'
	},
	faq: { title: 'Straight', accent: 'answers' },
	bsec: {
		eyebrow: 'Trial class',
		l1: 'Your first —',
		l2: 'is on us',
		p1: 'Meet your coach and get a fitness assessment',
		p2: 'A full session in a small group',
		p3: 'An 8-week plan — even if you don’t stay',
		call: 'Prefer to call?',
		reply: 'We reply within 15 minutes during opening hours.'
	},
	dlg: {
		tag: 'Trial — free',
		lead: '55–60 minutes in a small group. We’ll assess your level and pick a programme.'
	},
	form: {
		name: 'Name',
		namePh: 'What should we call you?',
		phone: 'Phone',
		dir: 'Class',
		day: 'Preferred day',
		errName: 'What should we call you?',
		errLetters: 'Letters only, please',
		errPhone: 'Enter your number — we’ll call back to confirm',
		errPhoneShort: 'Incomplete number: +380 (XX) XXX-XX-XX',
		errDay: 'Choose a day that suits you',
		offline: 'No internet connection. Check your network or give us a call.',
		sending: 'Sending…',
		consent: 'By clicking the button, you agree to our',
		consentLink: 'privacy policy',
		done: (name: string) => `You’re in, ${name}!`,
		doneText: (day: string) =>
			`The front desk will message you on Telegram or call within 15 minutes to confirm your spot on ${day}.`,
		another: 'Book someone else'
	},
	foot: {
		l1: 'See you',
		l2: 'at training',
		about:
			'A fitness studio in Kyiv’s Podil: functional training, boxing, stretching and personal training.',
		tg: 'Message us on Telegram',
		viber: 'Message us on Viber',
		ig: 'Studio Instagram',
		contacts: 'Contacts',
		hours: 'Hours',
		nav: 'Footer navigation',
		mapAria:
			'Directions: Rytm studio at 41 Kyrylivska St, a seven-minute walk from Kontraktova Ploshcha metro',
		st1: 'KYRYLIVSKA ST',
		st2: 'VERKHNII VAL ST',
		metro: 'M',
		pin: 'RYTM · 41',
		route: 'Directions',
		copy: '© 2020–2026 Rytm Fitness Studio, Kyiv'
	},
	mcta: { label: 'Quick booking', call: (p: string) => `Call ${p}` },
	seo: {
		homeTitle: 'Rytm fitness studio in Kyiv — boxing, functional training, stretching',
		homeDescription:
			'Rytm fitness studio in Kyiv’s Podil: functional training, boxing for beginners, stretching and personal training. First class free, results in 8 weeks.',
		ogAlt: 'Rytm fitness studio in Kyiv — first class free',
		priceRange: '450–7200 UAH',
		region: 'Kyiv',
		trialName: 'Trial class',
		trialDesc: 'Your first group class is free',
		month: 'month',
		inLanguage: 'en'
	},
	policy: {
		title: 'Privacy policy — Rytm fitness studio',
		description: 'How Rytm fitness studio collects, stores and protects members’ personal data.',
		edition: 'Effective 1 September 2026',
		intro: (name: string) =>
			`${name} respects your privacy. By submitting a request on this site, you agree to the terms of this policy.`,
		questions: 'Questions about your data:',
		home: '← Back to home',
		sections: [
			{
				h: '1. What data we collect',
				p: 'Your name, phone number, chosen class and preferred day, which you enter in the booking form. During training — measurements (weight, body measurements, fitness tests), only with your consent and to track progress.'
			},
			{
				h: '2. Why we need it',
				p: 'To confirm your booking, remind you about classes, build your programme and record results under the 8-week guarantee. We do not share data with third parties except as required by law, and we do not send mass mailings.'
			},
			{
				h: '3. How we store it',
				p: 'Data is stored in a secure CRM system with access limited to the front desk and your coach. Requests not followed by a visit are deleted after 12 months.'
			},
			{
				h: '4. Your rights',
				p: 'You can request access to, correction or deletion of your data at any time by emailing us. We respond within 10 business days in accordance with the Law of Ukraine “On Personal Data Protection”.'
			},
			{
				h: '5. Cookies',
				p: 'The site uses only technical cookies required for it to work and anonymised analytics. You can disable cookies in your browser settings.'
			}
		]
	},
	error: {
		notFound: 'Page not found',
		error: 'Error',
		out: 'Out',
		knockdown: 'Knockdown',
		notFoundText: 'This page doesn’t exist — the link may be outdated.',
		errorText: 'Something went wrong. Try reloading the page.',
		back: 'Head back home for the schedule and trial booking.',
		home: 'Back to home'
	}
};
