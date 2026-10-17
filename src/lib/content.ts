/**
 * Контент поточною мовою. Живі ES-привʼязки: setLang() у макеті [lang] перемикає значення,
 * тож компоненти імпортують `studio`, `plans`… як звичайні константи.
 */
import * as uk from './content.uk.ts';
import * as en from './content.en.ts';
import { tUk, tEn } from './ui.ts';
import { setLangState, type Lang } from './i18n.ts';

export type { DirectionId, CoachId, Slot, Period, PlanId } from './content.uk.ts';
export const siteUrl = uk.siteUrl;

export let studio = uk.studio;
export let nav = uk.nav;
export let heroStats = uk.heroStats;
export let directions = uk.directions;
export let quiz = uk.quiz;
export let coaches = uk.coaches;
export let directionLabel = uk.directionLabel;
export let days = uk.days;
export let daysFull = uk.daysFull;
export let schedule = uk.schedule;
export let transformations = uk.transformations;
export let periods = uk.periods;
export let plans = uk.plans;
export let guarantee = uk.guarantee;
export let stories = uk.stories;
export let faq = uk.faq;
export let bookingDirections = uk.bookingDirections;
export let t = tUk;

export function setLang(l: Lang): void {
	setLangState(l);
	const d = l === 'en' ? en : uk;
	studio = d.studio as unknown as typeof uk.studio;
	nav = d.nav as unknown as typeof uk.nav;
	heroStats = d.heroStats as unknown as typeof uk.heroStats;
	directions = d.directions as unknown as typeof uk.directions;
	quiz = d.quiz as unknown as typeof uk.quiz;
	coaches = d.coaches as unknown as typeof uk.coaches;
	directionLabel = d.directionLabel as unknown as typeof uk.directionLabel;
	days = d.days as unknown as typeof uk.days;
	daysFull = d.daysFull as unknown as typeof uk.daysFull;
	schedule = d.schedule as unknown as typeof uk.schedule;
	transformations = d.transformations as unknown as typeof uk.transformations;
	periods = d.periods as unknown as typeof uk.periods;
	plans = d.plans as unknown as typeof uk.plans;
	guarantee = d.guarantee as unknown as typeof uk.guarantee;
	stories = d.stories as unknown as typeof uk.stories;
	faq = d.faq as unknown as typeof uk.faq;
	bookingDirections = d.bookingDirections as unknown as typeof uk.bookingDirections;
	t = l === 'en' ? tEn : tUk;
}
