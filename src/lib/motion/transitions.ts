import { cubicOut } from 'svelte/easing';
import { reducedMotion } from './env.ts';

/** Діагональний «розріз» для svelte/transition: лише clip-path + transform */
export function slash(
	_node: Element,
	{ duration = 380, delay = 0, dir = 1 }: { duration?: number; delay?: number; dir?: 1 | -1 } = {}
) {
	if (reducedMotion()) return { duration: 0 };
	return {
		duration,
		delay,
		easing: cubicOut,
		css: (t: number) => {
			const p = t * 112;
			return `clip-path: polygon(0 0, ${p}% 0, ${p - 12}% 100%, 0 100%); transform: translateX(${(1 - t) * 40 * dir}px)`;
		}
	};
}
