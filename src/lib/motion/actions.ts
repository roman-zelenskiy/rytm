import { reducedMotion } from './env.ts';
import { onVelocity } from './velocity.ts';

let io: IntersectionObserver | undefined;
const callbacks = new Map<Element, Set<() => void>>();

/**
 * Додає клас `is-in`, коли елемент з’являється (разом із data-slash / data-rise у CSS).
 * IntersectionObserver враховує власний clip-path елемента, тож для «розрізів» (стартовий
 * полігон нульової площі) спостерігаємо за батьком.
 */
export function inview(node: HTMLElement, delay = 0) {
	node.style.setProperty('--d', `${delay}ms`);
	if (reducedMotion() || typeof IntersectionObserver === 'undefined') {
		node.classList.add('is-in');
		return;
	}
	const target = node.hasAttribute('data-slash') ? (node.parentElement ?? node) : node;
	io ??= new IntersectionObserver(
		(entries) => {
			for (const e of entries) {
				if (!e.isIntersecting) continue;
				callbacks.get(e.target)?.forEach((cb) => cb());
				callbacks.delete(e.target);
				io?.unobserve(e.target);
			}
		},
		{ rootMargin: '0px 0px -10% 0px', threshold: 0.05 }
	);
	const cb = () => node.classList.add('is-in');
	const set = callbacks.get(target) ?? new Set();
	set.add(cb);
	callbacks.set(target, set);
	io.observe(target);
	return {
		destroy() {
			const s = callbacks.get(target);
			s?.delete(cb);
			if (s && !s.size) {
				callbacks.delete(target);
				io?.unobserve(target);
			}
		}
	};
}

/**
 * Кінетична типографіка: заголовок розтягується й нахиляється від швидкості скролу,
 * а на зупинці пружинить назад. Лише transform.
 */
export function kinetic(node: HTMLElement, strength = 1) {
	if (reducedMotion()) return;
	let current = 0;
	const unsub = onVelocity((v) => {
		const target = Math.max(-1, Math.min(1, v / 40)) * strength;
		current += (target - current) * 0.2;
		const s = Math.abs(current);
		// слухач уже викликається в rAF — пишемо transform одразу
		node.style.transform =
			s < 0.002
				? ''
				: `skewX(${(-current * 9).toFixed(2)}deg) scaleX(${(1 + s * 0.12).toFixed(3)}) scaleY(${(1 - s * 0.08).toFixed(3)})`;
	});
	return {
		destroy() {
			unsub();
		}
	};
}
