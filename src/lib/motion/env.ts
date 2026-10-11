import { browser } from '$app/env';

export const reducedMotion = () =>
	browser && matchMedia('(prefers-reduced-motion: reduce)').matches;
