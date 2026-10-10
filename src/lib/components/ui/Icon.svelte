<script lang="ts" module>
	const PATHS = {
		arrow: 'M4 12h15M13 6l6 6-6 6',
		phone: 'M5 4h3.5l1.6 4.2-2.2 1.4a11 11 0 0 0 6.5 6.5l1.4-2.2L20 15.5V19a1 1 0 0 1-1 1A16 16 0 0 1 4 5a1 1 0 0 1 1-1Z',
		check: 'm5 12.5 4.2 4.2L19 7',
		close: 'M6 6l12 12M18 6 6 18',
		plus: 'M12 5v14M5 12h14',
		menu: 'M4 8h16M4 16h16',
		left: 'm15 6-6 6 6 6',
		right: 'm9 6 6 6-6 6',
		pin: 'M12 21s7-6.2 7-11.5A7 7 0 0 0 5 9.5C5 14.8 12 21 12 21Zm0-9a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z',
		bolt: 'M13 2 4 14h7l-1 8 9-12h-7l1-8Z',
		pause: 'M9 5v14M15 5v14',
		play: 'M7 5v14l12-7L7 5Z',
		star: 'm12 3.5 2.6 5.4 5.9.8-4.3 4.1 1 5.8L12 16.8l-5.2 2.8 1-5.8-4.3-4.1 5.9-.8L12 3.5Z',
		telegram: 'M21.4 4.3 18.3 19c-.2 1-.9 1.3-1.7.8l-4.8-3.5-2.3 2.2c-.3.3-.5.5-1 .5l.3-4.9 8.9-8c.4-.3-.1-.5-.6-.2L6.1 12.8l-4.7-1.5c-1-.3-1-1 .2-1.5l18.4-7.1c.9-.3 1.6.2 1.4 1.6Z',
		viber: 'M12 2.8c5 0 8.6 2.2 8.6 8.1 0 5.6-3.4 7.9-8.3 7.9-.8 0-1.6 0-2.4-.2L6.6 21v-3.4C4.2 16.4 3.4 14 3.4 10.9 3.4 5 7 2.8 12 2.8ZM13 6.2a4.2 4.2 0 0 1 4 4M13 8.4a2 2 0 0 1 1.9 1.9',
		instagram: 'M8.5 3.5h7a5 5 0 0 1 5 5v7a5 5 0 0 1-5 5h-7a5 5 0 0 1-5-5v-7a5 5 0 0 1 5-5ZM12 16a4 4 0 1 0 0-8 4 4 0 0 0 0 8Zm5.2-9.2h.01'
	} as const;
	export type IconName = keyof typeof PATHS;
	const FILLED: IconName[] = ['telegram', 'star', 'bolt', 'play'];
</script>

<script lang="ts">
	let { name, size = 20, class: cls = '' }: { name: IconName; size?: number; class?: string } = $props();
	const filled = $derived(FILLED.includes(name));
</script>

<svg
	class={cls}
	width={size}
	height={size}
	viewBox="0 0 24 24"
	fill={filled ? 'currentColor' : 'none'}
	stroke={filled ? 'none' : 'currentColor'}
	stroke-width="2"
	stroke-linecap="square"
	stroke-linejoin="miter"
	aria-hidden="true"><path d={PATHS[name]} /></svg
>
