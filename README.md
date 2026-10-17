# «Ритм» — лендинг фитнес-студии

SvelteKit 3 + Svelte 5 (runes), строгий TypeScript, SSR + prerender, Tailwind CSS 4, GSAP/ScrollTrigger, Lenis, WebGL (OGL), `@sveltejs/enhanced-img`. Контент на украинском. Результаты проверки — в [AUDIT.md](AUDIT.md).

## Запуск

Нужен Node.js 22+.

```sh
npm install
npm run dev          # http://localhost:5173
```

## Проверки

```sh
npm run check        # svelte-check (типы)
npm run lint         # prettier + eslint
npm run format       # автоформатирование
```

## Продакшен: Node-сервер (по умолчанию)

```sh
npm run build
node build           # http://localhost:3000, порт — через PORT=…
```

Страницы пререндерятся на сборке, `adapter-node` отдаёт их и статику.

## Статическая сборка (GitHub Pages и любой статический хостинг)

```sh
STATIC=1 npm run build                  # сайт в корне домена
STATIC=1 BASE_PATH=/rytm npm run build  # сайт в подпапке /rytm
```

Результат — папка `build/` (`index.html`, `404.html`, `sitemap.xml`, `robots.txt`).

GitHub Pages: workflow `.github/workflows/deploy-pages.yml` собирает и публикует сайт при пуше в `main`. Один раз: **Settings → Pages → Source: GitHub Actions**.

## Где что менять

| Что                                              | Где                                                     |
| ------------------------------------------------ | ------------------------------------------------------- |
| Тексты, цены, расписание, тренеры, FAQ, контакты | `src/lib/content.ts`                                    |
| Домен (canonical, OG, sitemap)                   | `siteUrl` в `src/lib/content.ts`                        |
| Фото                                             | `src/lib/assets/photos/`, импорты — `src/lib/images.ts` |
| Цвета, шрифты, общие стили                       | `src/routes/layout.css`                                 |
| SEO-мета и JSON-LD                               | `src/lib/seo/`                                          |

Форма записи — демо: заявки сохраняются в `localStorage` браузера (`rytm:leads`) и никуда не отправляются.

## Мови (i18n)

Сайт має дві статичні версії: `/uk/` і `/en/`.

- **Корінь `/`** обирає мову до першої відмальовки. Часовий пояс України (Europe/Kyiv) веде на українську, решта світу — на англійську. Без JS відкривається українська.
- **Перемикач UA/EN у шапці** запам’ятовує вибір у `localStorage` (ключ `lang`), і він має пріоритет над автовизначенням.
- **Контент** лежить у `src/lib/content.uk.ts` і `src/lib/content.en.ts` з однаковою структурою. Рядки інтерфейсу — у `src/lib/ui.ts`. Модуль `src/lib/content.ts` перемикає значення за мовою маршруту `[lang]`.
- **SEO:** `hreflang` для обох мов, `<html lang>` за маршрутом, sitemap з усіма мовними версіями.
