<script lang="ts">
	let { class: cls = '' }: { class?: string } = $props();
</script>

<span class="inline-flex items-center gap-2 {cls}">
	<svg width="30" height="26" viewBox="0 0 30 26" aria-hidden="true">
		<path d="M0 26 9 0h7L7 26Z" fill="var(--color-lime)" />
		<path d="M11 26 20 0h4l-9 26Z" fill="currentColor" />
		<path d="M19 26 28 0h2l-9 26Z" fill="currentColor" opacity=".5" />
	</svg>
	<span class="mega text-[1.9rem] leading-none tracking-wide">Ритм</span>
</span>
