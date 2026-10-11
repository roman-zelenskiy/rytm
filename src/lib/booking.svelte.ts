export type Lead = {
	name: string;
	phone: string;
	direction: string;
	day: string;
	createdAt: string;
};

const KEY = 'rytm:leads';

/**
 * Запис на пробне: модальне вікно + «відправка».
 * Демо: заявка нікуди не йде, а зберігається в localStorage браузера.
 */
class Booking {
	open = $state(false);
	preset = $state<string | null>(null);

	show(direction?: string) {
		this.preset = direction ?? null;
		this.open = true;
	}

	close() {
		this.open = false;
	}

	async submit(lead: Omit<Lead, 'createdAt'>) {
		await new Promise((r) => setTimeout(r, 1100));
		try {
			const all = JSON.parse(localStorage.getItem(KEY) ?? '[]') as Lead[];
			all.push({ ...lead, createdAt: new Date().toISOString() });
			localStorage.setItem(KEY, JSON.stringify(all.slice(-20)));
		} catch {
			// приватний режим або заборонене сховище — для демо це не помилка
		}
	}
}

export const booking = new Booking();
