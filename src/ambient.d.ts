// Типи для імпортів зображень із параметрами vite-imagetools / enhanced-img
// enhanced-img з явними ширинами (?enhanced&w=…;600) — той самий тип Picture
declare module '*;600' {
	const value: import('vite-imagetools').Picture;
	export default value;
}
declare module '*;700' {
	const value: import('vite-imagetools').Picture;
	export default value;
}
declare module '*;750' {
	const value: import('vite-imagetools').Picture;
	export default value;
}

declare module '*;800' {
	const value: import('vite-imagetools').Picture;
	export default value;
}
