import { browser } from '$app/env';
import { reducedMotion } from './env.ts';
import { currentVelocity, onVelocity } from './velocity.ts';

/**
 * Спільний метроном студії: 120 BPM у спокої, до ~176 BPM під час активного скролу.
 * `count` змінюється лише на кожен біт (2–3 рази на секунду) — дешево для реактивності.
 */
class Beat {
	bpm = $state(120);
	count = $state(0);
	private started = false;

	start() {
		if (this.started || !browser || reducedMotion()) return;
		this.started = true;
		onVelocity(() => {}); // запускаємо трекер швидкості
		let phase = 0;
		let last = performance.now();
		let bpm = 120;
		const loop = (now: number) => {
			const dt = Math.min(100, now - last);
			last = now;
			const target = 120 + Math.min(56, Math.abs(currentVelocity()) * 2.2);
			bpm += (target - bpm) * 0.04;
			phase += (dt / 60000) * bpm;
			if (phase >= 1) {
				phase -= 1;
				if (!document.hidden) this.count += 1;
				const rounded = Math.round(bpm);
				if (rounded !== this.bpm) this.bpm = rounded;
			}
			requestAnimationFrame(loop);
		};
		requestAnimationFrame(loop);
	}
}

export const beat = new Beat();
