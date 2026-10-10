import { browser } from '$app/env';
import { reducedMotion } from './env.ts';

type Listener = (v: number) => void;

/**
 * Згладжена швидкість скролу (px/кадр, зі знаком). Оновлюється щокадру без реактивності Svelte —
 * підписники самі застосовують transform до своїх елементів.
 */
const listeners = new Set<Listener>();
let started = false;
let velocity = 0;

function start() {
	if (started || !browser || reducedMotion()) return;
	started = true;
	let last = scrollY;
	let lastT = performance.now();
	let raw = 0;
	addEventListener(
		'scroll',
		() => {
			const t = performance.now();
			const dt = Math.max(8, t - lastT);
			raw = ((scrollY - last) / dt) * 16.7; // нормалізуємо до 60 fps
			last = scrollY;
			lastT = t;
		},
		{ passive: true }
	);
	const tick = () => {
		raw *= 0.9; // без нових подій скролу швидкість «згасає»
		velocity += (raw - velocity) * 0.18;
		if (Math.abs(velocity) < 0.01) velocity = 0;
		for (const l of listeners) l(velocity);
		requestAnimationFrame(tick);
	};
	requestAnimationFrame(tick);
}

export function onVelocity(l: Listener): () => void {
	start();
	listeners.add(l);
	return () => listeners.delete(l);
}

export const currentVelocity = () => velocity;
