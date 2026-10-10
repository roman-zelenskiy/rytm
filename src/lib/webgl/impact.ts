/**
 * WebGL-ефект «удару» для hero (OGL, ~30 КБ, вантажиться ліниво й лише в браузері):
 *  - змаз руху з розділенням RGB-каналів від швидкості скролу й курсора;
 *  - ударна хвиля-брижі з точки удару (на біт метронома або клік);
 *  - зерно плівки.
 */
export type ImpactApi = { hit: (x?: number, y?: number) => void; setVelocity: (v: number) => void; dispose: () => void };

const vertex = /* glsl */ `
attribute vec2 position;
attribute vec2 uv;
varying vec2 vUv;
void main() { vUv = uv; gl_Position = vec4(position, 0.0, 1.0); }`;

const fragment = /* glsl */ `
precision highp float;
uniform sampler2D tMap;
uniform vec2 uRes;
uniform vec2 uImg;
uniform float uTime;
uniform float uVel;
uniform float uHit;
uniform vec2 uHitPos;
uniform vec2 uFocus;
varying vec2 vUv;

float hash(vec2 p) { return fract(sin(dot(p, vec2(12.9898, 78.233))) * 43758.5453); }

void main() {
  // object-fit: cover з точкою фокусу
  float rs = uRes.x / uRes.y;
  float ri = uImg.x / uImg.y;
  vec2 scale = rs > ri ? vec2(1.0, ri / rs) : vec2(rs / ri, 1.0);
  vec2 uv = (vUv - 0.5) * scale + 0.5;
  uv += (uFocus - 0.5) * (1.0 - scale);

  // ударна хвиля
  vec2 asp = vec2(rs, 1.0);
  float d = distance(vUv * asp, uHitPos * asp);
  float r = uHit * 1.15;
  float ring = smoothstep(0.12, 0.0, abs(d - r)) * (1.0 - uHit);
  vec2 dir = normalize(vUv - uHitPos + 1e-4);
  uv -= dir * ring * 0.03;

  // змаз руху + розділення каналів
  float v = clamp(uVel, -1.0, 1.0);
  vec2 shift = vec2(0.004, 0.012) * v + dir * ring * 0.012;
  float cr = texture2D(tMap, uv + shift).r;
  float cg = texture2D(tMap, uv).g;
  float cb = texture2D(tMap, uv - shift).b;
  vec3 col = vec3(cr, cg, cb);
  col += texture2D(tMap, uv + vec2(0.0, 0.02) * v).rgb * abs(v) * 0.25;
  col /= 1.0 + abs(v) * 0.25;

  // спалах лайму на гребені хвилі
  col += vec3(0.78, 1.0, 0.0) * ring * 0.22;

  // віньєтка й зерно
  float vig = smoothstep(1.15, 0.35, length((vUv - 0.5) * vec2(1.2, 1.0)));
  col *= mix(0.55, 1.0, vig);
  col += (hash(vUv * uRes + fract(uTime * 7.0)) - 0.5) * 0.07;

  gl_FragColor = vec4(col, 1.0);
}`;

export async function mountImpact(
	canvas: HTMLCanvasElement,
	src: string,
	opts: { focus?: [number, number]; hitPos?: [number, number]; onReady?: () => void } = {}
): Promise<ImpactApi | null> {
	const { Renderer, Program, Mesh, Triangle, Texture } = await import('ogl');
	let renderer: InstanceType<typeof Renderer>;
	try {
		renderer = new Renderer({ canvas, dpr: Math.min(devicePixelRatio, 1.5), alpha: false, antialias: false });
	} catch {
		return null;
	}
	const gl = renderer.gl;
	const texture = new Texture(gl, { generateMipmaps: false });
	const image = new Image();
	image.decoding = 'async';
	image.src = src;
	await image.decode().catch(() => undefined);
	if (!image.naturalWidth) return null;
	texture.image = image;

	const program = new Program(gl, {
		vertex,
		fragment,
		uniforms: {
			tMap: { value: texture },
			uRes: { value: [1, 1] },
			uImg: { value: [image.naturalWidth, image.naturalHeight] },
			uTime: { value: 0 },
			uVel: { value: 0 },
			uHit: { value: 1 },
			uHitPos: { value: opts.hitPos ?? [0.5, 0.5] },
			uFocus: { value: opts.focus ?? [0.5, 0.5] }
		}
	});
	const mesh = new Mesh(gl, { geometry: new Triangle(gl), program });

	// меряємо батька: OGL сам виставляє canvas піксельний розмір, тож його розмір — не джерело правди
	const host = canvas.parentElement ?? canvas;
	const resize = () => {
		const { clientWidth: w, clientHeight: h } = host;
		renderer.setSize(w, h);
		program.uniforms.uRes.value = [w, h];
	};
	const ro = new ResizeObserver(resize);
	ro.observe(host);
	resize();

	let visible = true;
	const io = new IntersectionObserver(([e]) => (visible = e.isIntersecting));
	io.observe(canvas);

	let velocity = 0;
	let vel = 0;
	let hitStart = -10;
	let raf = 0;
	const t0 = performance.now();
	const loop = (now: number) => {
		raf = requestAnimationFrame(loop);
		if (!visible || document.hidden) return;
		const t = (now - t0) / 1000;
		vel += (velocity - vel) * 0.12;
		velocity *= 0.92;
		program.uniforms.uTime.value = t;
		program.uniforms.uVel.value = vel;
		program.uniforms.uHit.value = Math.min(1, (t - hitStart) / 0.9);
		renderer.render({ scene: mesh });
	};
	raf = requestAnimationFrame(loop);
	opts.onReady?.();

	return {
		hit(x, y) {
			if (x !== undefined && y !== undefined) program.uniforms.uHitPos.value = [x, y];
			hitStart = (performance.now() - t0) / 1000;
		},
		setVelocity(v) {
			velocity = Math.max(-1, Math.min(1, v));
		},
		dispose() {
			cancelAnimationFrame(raf);
			ro.disconnect();
			io.disconnect();
			gl.getExtension('WEBGL_lose_context')?.loseContext();
		}
	};
}
