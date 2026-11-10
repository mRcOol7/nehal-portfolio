// @ts-nocheck
/**
 * Viaduct Scene WebGL Controller - Vande Bharat Express Edition
 * Renders the Scottish Glenfinnan Viaduct with India's Vande Bharat Express EMU trainset,
 * glowing nocturnal passenger cabin windows, and dynamic water reflections.
 * Self-contained vanilla WebGL with zero external dependencies.
 */

export function initViaductScene(art: HTMLElement): () => void {
  if (typeof window === 'undefined' || !art) return () => {};

  // Remove any pre-existing duplicate canvases in the DOM (e.g. from React StrictMode mounts)
  art.querySelectorAll('canvas').forEach((c) => c.remove());

  const root = document.documentElement;
  let cleanedUp = false;
  const cleanupFns: Array<() => void> = [];

  try {
    const calm = matchMedia('(prefers-reduced-motion: reduce)');
  const system = matchMedia('(prefers-color-scheme: dark)');
  // Authentic Indian Himalayan sunny daytime weather — crisp daylight for Chenab Rail Bridge
  const isDark = () => false;
  const pictureFor = (dark = false) => art.querySelector('.day') || art.querySelector('img');
  // A picture that fails to load shouldn't leave a broken-image mark in the footer.
  for (const image of [pictureFor(false), pictureFor(true)]) {
    image.addEventListener('error', () => { image.style.visibility = 'hidden'; });
  }
  const clamp = (x, a, b) => Math.min(b, Math.max(a, x));
  const smooth = (a, b, x) => {
    const t = clamp((x - a) / (b - a), 0, 1);
    return t * t * (3 - 2 * t);
  };

  // The picture's own size: Chenab Rail Bridge Full HD plates (1920 x 1080)
  const PICTURE_W = 1920;
  const PICTURE_H = 1080;

  // The track spans straight and horizontally across the world's highest rail arch over the Chenab River gorge
  const COACH = 0.22; // Stretched coach length
  const FAR = 1.0;
  const WIDTH = 92;
  const sizeAt = (a) => 1.0; // Sharp 1:1 scale for maximum texture clarity

  // Perfectly straight horizontal track across Chenab bridge (no center dip, no sag)
  const TRACK_Y = 424;
  const measuredAt = (a) => {
    const x = 960 + a * 640;
    return [x, TRACK_Y];
  };

  const pointAt = (a, across, height) => {
    const x = 960 + a * 640;
    return [x, TRACK_Y - height * sizeAt(a)];
  };

  // Where the track goes into the mountains at each end.
  const TIP_IN = 1.70;
  const TIP_OUT = -1.70;

  // The train strip built by scripts/generateOrangeVandeBharat.js: rows of 124 pixels in a 1024 x 1024 atlas.
  const U = (x) => x / 1024;
  const V = (y) => y / 1024;
  const ROW = 124;
  const LOCO_LENGTH = 1.25; // Stretched locomotive length
  const COACHES = 6; // 6 intermediate coaches + 2 DTC cabs = 8-car full trainset!
  const TRAIN_LENGTH = LOCO_LENGTH * 2 + COACHES;
  const COACH_LIGHT_U = 484;
  const NO_LIGHT = [U(470), V(2 * ROW + 2)];
  const SMOOTH_ROW = 4 * ROW; // the locomotive smoothed along its length, for its inner slices
  const FRONT_TILE = { u: 484, light: 910 }; // the front of the locomotive
  const SMOKEBOX_BACK = (32 / 476) * LOCO_LENGTH * COACH; // how far the nose stands behind the buffer beam
  const END_TILE = { u: 544, light: 968 }; // the end of a coach

  // Soft daylight from the left: sides facing that way are brighter.
  const turnAt = (a) => smooth(0.22, 0.62, Math.abs(a));
  const sideTone = (a) => clamp(1 - 0.25 * (Math.sin(a) - Math.sin(0.35)), 0.76, 1.14);

  // The timetable, in seconds: train runs continuously and majestically from RIGHT TO LEFT
  const PER_COACH = 0.72; // High-speed cruising rate (130-160 km/h)
  const GAP_BETWEEN = 0.2; // Minimal gap for continuous non-stop looping
  const FRONT_AT_REST = 0.0;
  const initialLoop = ((TIP_IN - TIP_OUT) / COACH + TRAIN_LENGTH) * PER_COACH + GAP_BETWEEN;
  const initialBefore = ((TIP_IN - FRONT_AT_REST) / COACH) * PER_COACH;
  const timetable = { in: TIP_IN, out: TIP_OUT, loop: initialLoop, before: initialBefore };
  const setTimetable = (rightEdge, leftEdge) => {
    let a = 0.3;
    while (a < TIP_IN && measuredAt(a)[0] < rightEdge + 250) a += 0.02;
    let b = -0.3;
    while (b > TIP_OUT && measuredAt(b)[0] > leftEdge - 200) b -= 0.02;
    timetable.in = a;
    timetable.out = b;
    timetable.loop = ((a - b) / COACH + TRAIN_LENGTH) * PER_COACH + GAP_BETWEEN;
    timetable.before = ((a - FRONT_AT_REST) / COACH) * PER_COACH;
  };
  const frontAt = (seconds) => {
    const t = (((seconds + timetable.before) % timetable.loop) + timetable.loop) % timetable.loop;
    return timetable.in - (t / PER_COACH) * COACH;
  };

  // The steam: puffs let go from the chimney one after another, each staying where it was let go
  // while it rises and spreads, so the plume follows the curve of the track behind the engine.
  const PUFF_EVERY = 0.12;
  const PUFF_LIFE = 6.4;
  const CHIMNEY_BEHIND_FRONT = ((3212 - 3136) / 476) * LOCO_LENGTH * COACH;
  const random = (i, k) => {
    const s = Math.sin(i * 12.9898 + k * 78.233) * 43758.5453;
    return s - Math.floor(s);
  };

  const UTILS = `
    float hash(vec2 p) { vec3 q = fract(vec3(p.xyx) * 0.1031); q += dot(q, q.yzx + 33.33); return fract((q.x + q.y) * q.z); }
    float noise(vec2 p) {
      vec2 i = floor(p), f = fract(p);
      f = f * f * (3.0 - 2.0 * f);
      return mix(mix(hash(i), hash(i + vec2(1.0, 0.0)), f.x),
                 mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), f.x), f.y);
    }`;
  const TO_SCREEN = `
    vec2 screen(vec2 picture) {
      vec2 spot = (picture - fit.zw) / fit.xy;
      return vec2(spot.x * 2.0 - 1.0, 1.0 - spot.y * 2.0);
    }`;

  // ---- The scene: clouds, river, cloud shadows. ----
  const SCENE_VERTEX = `
    attribute vec2 corner;
    varying vec2 spot;
    void main() {
      spot = vec2(corner.x * 0.5 + 0.5, 0.5 - corner.y * 0.5);
      gl_Position = vec4(corner, 0.0, 1.0);
    }`;
  const SCENE_FRAGMENT = `
    precision highp float;
    varying vec2 spot;
    uniform sampler2D picture, flow;
    uniform vec4 fit;
    uniform float time, sun;
    ${UTILS}

    // Two copies of the picture slide along the flow, half a cycle apart. Each one fades out
    // before it jumps back to its start, so the movement never visibly restarts.
    vec3 slide(vec2 at, vec2 by, float cycle, float patches) {
      float a = fract(time / cycle + noise(at * patches));
      float b = fract(a + 0.5);
      vec3 first = texture2D(picture, at - by * (a - 0.5)).rgb;
      vec3 second = texture2D(picture, at - by * (b - 0.5)).rgb;
      return mix(second, first, 1.0 - abs(2.0 * a - 1.0));
    }

    // Soft patches of shade that get a little smaller towards the far end of the valley.
    float cloudShadow(vec2 at) {
      float depth = at.y + 0.55;
      vec2 ground = vec2((at.x - 0.53) * 2.4 / depth - time * 0.006, 2.4 / depth + time * 0.012);
      float n = noise(ground * 1.7) * 0.6 + noise(ground * 3.6 + 9.0) * 0.28 + noise(ground * 7.5 + 21.0) * 0.12;
      return smoothstep(0.44, 0.72, n) * 0.2;
    }

    void main() {
      vec2 at = fit.xy * spot + fit.zw;
      float shade = sun * 0.08 * cloudShadow(at);
      gl_FragColor = vec4(0.0, 0.0, 0.0, shade);
    }`;

  // On Chenab Rail Bridge, the track deck spans 359m in open air across the gorge.
  const IN_THE_OPEN = `
    uniform sampler2D picture;
    uniform vec4 fit;
    uniform vec2 canvasSize;
    uniform float dusk;
    float inTheOpen() {
      return 1.0;
    }`;

  // ---- The train: each face is a quad, with its texture weighted for distance. ----
  const TRAIN_VERTEX = `
    attribute vec2 position;
    attribute vec3 texel;
    attribute vec2 lightTexel;
    attribute float tone;
    uniform vec4 fit;
    varying vec3 vTexel;
    varying vec2 vLight;
    varying float vTone;
    ${TO_SCREEN}
    void main() {
      vTexel = texel;
      vLight = lightTexel;
      vTone = tone;
      gl_Position = vec4(screen(position), 0.0, 1.0);
    }`;
  const TRAIN_FRAGMENT = `
    precision highp float;
    varying vec3 vTexel;
    varying vec2 vLight;
    varying float vTone;
    uniform sampler2D atlas;
    uniform float lampFade;
    ${UTILS}
    ${IN_THE_OPEN}
    void main() {
      vec4 c = texture2D(atlas, vTexel.xy / vTexel.z);
      float seen = inTheOpen();
      // Daytime Indian Himalayan sunlight: bright vibrant Saffron Orange livery with sun sheen
      vec2 light = vLight / vTexel.z;
      vec3 lit = texture2D(atlas, light).rgb;
      vec3 body = c.rgb * vTone + lit * 0.25 * c.a;
      gl_FragColor = vec4(body, c.a) * seen;
    }`;

  // ---- Soft shapes: the shadow under the train, and in the evening the light it throws. ----
  const SOFT_VERTEX = `
    attribute vec2 position;
    attribute vec2 st;
    attribute vec4 tint;
    uniform vec4 fit;
    varying vec2 vSt;
    varying vec4 vTint;
    ${TO_SCREEN}
    void main() {
      vSt = st;
      vTint = tint;
      gl_Position = vec4(screen(position), 0.0, 1.0);
    }`;
  const SOFT_FRAGMENT = `
    precision highp float;
    varying vec2 vSt;
    varying vec4 vTint;
    uniform float radial;
    ${UTILS}
    ${IN_THE_OPEN}
    void main() {
      float edge = radial > 0.5
        ? pow(1.0 - clamp(length(vSt), 0.0, 1.0), 2.0)
        : (1.0 - smoothstep(0.35, 1.0, abs(vSt.x))) * (1.0 - smoothstep(0.35, 1.0, abs(vSt.y)));
      gl_FragColor = vTint * edge * inTheOpen();
    }`;

  // ---- The steam: soft balls lit from above, with billows worked into their surface. ----
  const STEAM_VERTEX = `
    attribute vec2 position;
    attribute vec2 st;
    attribute vec3 puff;
    uniform vec4 fit;
    varying vec2 vSt;
    varying vec3 vPuff;
    ${TO_SCREEN}
    void main() {
      vSt = st;
      vPuff = puff;
      gl_Position = vec4(screen(position), 0.0, 1.0);
    }`;
  const STEAM_FRAGMENT = `
    precision highp float;
    varying vec2 vSt;
    varying vec3 vPuff;
    uniform float dusk;
    ${UTILS}
    void main() {
      float seed = vPuff.z;
      vec2 warp = vec2(noise(vSt * 1.7 + seed), noise(vSt * 1.7 + seed + 19.0)) - 0.5;
      float body = 1.0 - smoothstep(0.4, 1.0, length(vSt + warp * 0.75));
      float fine = noise(vSt * 3.0 + seed * 1.3) * 0.72 + noise(vSt * 6.5 + seed * 2.1) * 0.28;
      body *= 0.76 + 0.48 * fine;
      vec2 bump = vSt + (vec2(noise(vSt * 3.4 + seed + 3.0), noise(vSt * 3.4 + seed + 11.0)) - 0.5) * 0.85;
      float light = clamp(0.6 - bump.y * 0.66 - bump.x * 0.14, 0.0, 1.0);
      vec3 colour = dusk > 0.5
        ? mix(vec3(0.15, 0.17, 0.26), vec3(0.64, 0.63, 0.72), light)
        : mix(vec3(0.62, 0.66, 0.72), vec3(1.0), light);
      // Fresh out of the chimney, it picks up a little warmth from the fire in the evening.
      if (dusk > 0.5) colour = mix(colour, colour * vec3(1.28, 0.98, 0.78) + vec3(0.06, 0.02, 0.0), vPuff.y * 0.7);
      float a = clamp(body * vPuff.x, 0.0, 1.0);
      gl_FragColor = vec4(colour * a, a);
    }`;

  const start = async () => {
    const canvas = document.createElement('canvas');
    canvas.setAttribute('aria-hidden', 'true');
    const gl = canvas.getContext('webgl', { antialias: true, depth: false, stencil: false, powerPreference: 'low-power' });
    if (!gl) return;

    const load = (src) => {
      const image = new Image();
      image.src = src;
      return image.decode().then(() => image);
    };
    // A picture can reject decode() when the browser swaps to another size as the window changes,
    // even though it loads fine, so that case waits for it and tries again.
    const ready = async (image) => {
      if (!image) return false;
      if (image.complete && image.naturalWidth > 0) return true;
      image.loading = 'eager';
      try {
        await image.decode();
      } catch {
        if (!image.complete) await new Promise((done) => image.addEventListener('load', done, { once: true }));
      }
      return image.naturalWidth > 0;
    };

    let atlas;
    try {
      atlas = await load('/footer/train.webp');
    } catch {
      return;
    }

    const program = (vertex, fragment) => {
      const p = gl.createProgram();
      for (const [type, source] of [[gl.VERTEX_SHADER, vertex], [gl.FRAGMENT_SHADER, fragment]]) {
        const shader = gl.createShader(type);
        gl.shaderSource(shader, source);
        gl.compileShader(shader);
        gl.attachShader(p, shader);
      }
      gl.linkProgram(p);
      if (!gl.getProgramParameter(p, gl.LINK_STATUS)) return null;
      const u = {};
      const count = gl.getProgramParameter(p, gl.ACTIVE_UNIFORMS);
      for (let i = 0; i < count; i++) {
        const { name } = gl.getActiveUniform(p, i);
        u[name] = gl.getUniformLocation(p, name);
      }
      return { p, u, a: (name) => gl.getAttribLocation(p, name) };
    };
    const scene = program(SCENE_VERTEX, SCENE_FRAGMENT);
    const train = program(TRAIN_VERTEX, TRAIN_FRAGMENT);
    const soft = program(SOFT_VERTEX, SOFT_FRAGMENT);
    const steam = program(STEAM_VERTEX, STEAM_FRAGMENT);
    if (!scene || !train || !soft || !steam) return;

    const anisotropy = gl.getExtension('EXT_texture_filter_anisotropic');
    const makeTexture = (unit, source, { premultiply = false, mips = false } = {}) => {
      gl.activeTexture(gl.TEXTURE0 + unit);
      const t = gl.createTexture();
      gl.bindTexture(gl.TEXTURE_2D, t);
      gl.pixelStorei(gl.UNPACK_COLORSPACE_CONVERSION_WEBGL, gl.NONE);
      gl.pixelStorei(gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, premultiply);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, mips ? gl.LINEAR_MIPMAP_LINEAR : gl.LINEAR);
      gl.texImage2D(gl.TEXTURE_2D, 0, premultiply ? gl.RGBA : gl.RGB, premultiply ? gl.RGBA : gl.RGB, gl.UNSIGNED_BYTE, source);
      if (mips) {
        gl.generateMipmap(gl.TEXTURE_2D);
        if (anisotropy) gl.texParameterf(gl.TEXTURE_2D, anisotropy.TEXTURE_MAX_ANISOTROPY_EXT, 8);
      }
      return t;
    };
    // Fast in-memory neutral flow texture (zero network roundtrip)
    gl.activeTexture(gl.TEXTURE1);
    const flowTex = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, flowTex);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGB, 2, 2, 0, gl.RGB, gl.UNSIGNED_BYTE, new Uint8Array([128, 128, 128, 128, 128, 128, 128, 128, 128, 128, 128, 128]));
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);

    makeTexture(2, atlas, { premultiply: true, mips: true });

    const sceneBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, sceneBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
    const trainBuffer = gl.createBuffer();
    const softBuffer = gl.createBuffer();
    const steamBuffer = gl.createBuffer();

    let seconds = 0;
    let dark = isDark();
    let shownTexture = null;
    let fitValues = [1, 1, 0, 0];

    // ---- Building the train for this moment. ----
    const out = [];
    const corner = (a, across, height, u, v, tone, lightU, lightV) => {
      const size = sizeAt(a);
      const [x, y] = pointAt(a, across, height);
      return [x / PICTURE_W, y / PICTURE_H, u * size, v * size, size, lightU * size, lightV * size, tone];
    };
    const quad = (p0, p1, p2, p3) => out.push(...p0, ...p1, ...p2, ...p0, ...p2, ...p3);

    // The passenger coach: authentic side profile with flush roof and skirt (no overhead floating lines)
    const HEIGHT = 54;
    const pushCoach = (a1, a2) => {
      const mid = (a1 + a2) / 2;
      const tone = sideTone(mid);
      const side = (a, height, u, v) => corner(a, 0.5, height, U(u), V(ROW + v), tone, U(u + COACH_LIGHT_U), V(2 * ROW + v));
      
      // Clean single-pass coach body
      quad(side(a1, 0, 1, 118), side(a2, 0, 419, 118), side(a2, HEIGHT, 419, 36), side(a1, HEIGHT, 1, 36));
    };

    // The aerodynamic driving trailer coach (DTC): authentic side profile with sleek nose
    // and seamless flush coupling (no overhead floating line, no duplicate nose slabs)
    const pushLoco = (a1, a2, isRear = false) => {
      const mid = (a1 + a2) / 2;
      const tone = sideTone(mid);
      const side = (a, height, u, v) => corner(a, 0.5, height, U(u), V(v), tone, U(u), V(2 * ROW + v));

      // Front DTC: nose at a1 (u=0), coupling at a2 (u=476) -> nose faces LEFT
      // Rear DTC: coupling at a1 (u=476), nose at a2 (u=0) -> nose faces RIGHT
      const u0 = isRear ? 476 : 0;
      const u1 = isRear ? 0 : 476;

      // Clean single-pass DTC body
      quad(side(a1, 0, u0, 122), side(a2, 0, u1, 122), side(a2, HEIGHT, u1, 36), side(a1, HEIGHT, u0, 36));
    };

    const softOut = [];
    const softQuad = (p0, p1, p2, p3, tint) => {
      const v = (p, s, t) => [p[0] / PICTURE_W, p[1] / PICTURE_H, s, t, ...tint];
      softOut.push(...v(p0, -1, -1), ...v(p1, 1, -1), ...v(p2, 1, 1), ...v(p0, -1, -1), ...v(p2, 1, 1), ...v(p3, -1, 1));
    };

    const drawSoft = (radial = 0) => {
      if (!softOut.length) return;
      gl.useProgram(soft.p);
      gl.uniform1f(soft.u.radial, radial);
      gl.uniform1i(soft.u.picture, 0);
      gl.uniform4f(soft.u.fit, ...fitValues);
      gl.uniform2f(soft.u.canvasSize, canvas.width, canvas.height);
      gl.uniform1f(soft.u.dusk, dark ? 1 : 0);
      gl.bindBuffer(gl.ARRAY_BUFFER, softBuffer);
      gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(softOut), gl.DYNAMIC_DRAW);
      const position = soft.a('position');
      const st = soft.a('st');
      const tint = soft.a('tint');
      gl.enableVertexAttribArray(position);
      gl.enableVertexAttribArray(st);
      gl.enableVertexAttribArray(tint);
      gl.vertexAttribPointer(position, 2, gl.FLOAT, false, 32, 0);
      gl.vertexAttribPointer(st, 2, gl.FLOAT, false, 32, 8);
      gl.vertexAttribPointer(tint, 4, gl.FLOAT, false, 32, 16);
      gl.drawArrays(gl.TRIANGLES, 0, softOut.length / 8);
      gl.disableVertexAttribArray(st);
      gl.disableVertexAttribArray(tint);
    };

    const drawTrain = () => {
      const front = frontAt(seconds);
      gl.enable(gl.BLEND);
      gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA);

      // Authentic 8-Car Vande Bharat Express Formation:
      // Front Aerodynamic DTC Cab + 6 Intermediate Chair Cars + Rear Aerodynamic DTC Cab
      const pieces = [{ loco: true, frontCab: true, a1: front, a2: front + LOCO_LENGTH * COACH }];
      for (let i = 0; i < COACHES; i++) {
        const a1 = front + LOCO_LENGTH * COACH + i * COACH;
        pieces.push({ loco: false, a1, a2: a1 + COACH });
      }
      const tailA1 = front + LOCO_LENGTH * COACH + COACHES * COACH;
      pieces.push({ loco: true, rearCab: true, a1: tailA1, a2: tailA1 + LOCO_LENGTH * COACH });
      const shown = pieces.filter(({ a1, a2 }) => a2 > TIP_OUT - 0.2 && a1 < TIP_IN + 0.2);

      // Train underbody ground shadow onto the bridge deck
      softOut.length = 0;
      for (const { a1, a2 } of shown) {
        const open = smooth(0.62, 0.9, Math.abs((a1 + a2) / 2));
        if (open <= 0) continue;
        const x1 = 960 + (a1 - 0.01) * 640;
        const x2 = 960 + (a2 + 0.01) * 640;
        softQuad([x1, TRACK_Y - 1], [x2, TRACK_Y - 1], [x2, TRACK_Y + 4], [x1, TRACK_Y + 4], [0, 0, 0, 0.45 * open]);
      }
      drawSoft();

      // Far pieces first, so nearer coaches pass in front of them on the bends.
      shown.sort((p, q) => Math.abs(q.a1 + q.a2) - Math.abs(p.a1 + p.a2));
      out.length = 0;
      for (const { loco, rearCab, a1, a2 } of shown) {
        if (loco) pushLoco(a1, a2, !!rearCab);
        else pushCoach(a1, a2);
      }
      if (out.length) {
        gl.useProgram(train.p);
        gl.uniform1i(train.u.atlas, 2);
        gl.uniform1i(train.u.picture, 0);
        gl.uniform4f(train.u.fit, ...fitValues);
        gl.uniform2f(train.u.canvasSize, canvas.width, canvas.height);
        gl.uniform1f(train.u.dusk, dark ? 1 : 0);
        gl.uniform1f(train.u.lampFade, 1 - smooth(0.2, 0.6, Math.sin(front)));
        gl.bindBuffer(gl.ARRAY_BUFFER, trainBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(out), gl.DYNAMIC_DRAW);
        const position = train.a('position');
        const texel = train.a('texel');
        const lightTexel = train.a('lightTexel');
        const tone = train.a('tone');
        gl.enableVertexAttribArray(position);
        gl.enableVertexAttribArray(texel);
        gl.enableVertexAttribArray(lightTexel);
        gl.enableVertexAttribArray(tone);
        gl.vertexAttribPointer(position, 2, gl.FLOAT, false, 32, 0);
        gl.vertexAttribPointer(texel, 3, gl.FLOAT, false, 32, 8);
        gl.vertexAttribPointer(lightTexel, 2, gl.FLOAT, false, 32, 20);
        gl.vertexAttribPointer(tone, 1, gl.FLOAT, false, 32, 28);
        gl.drawArrays(gl.TRIANGLES, 0, out.length / 8);
        gl.disableVertexAttribArray(texel);
        gl.disableVertexAttribArray(lightTexel);
        gl.disableVertexAttribArray(tone);
      }

      // Vande Bharat Express is a 100% all-electric EMU trainset: Zero smoke and zero steam.
      // Electric traction is completely emission-free.

      // The headlamp's glow, when the front of the engine is towards us.
      if (dark && front < TIP_IN && front > TIP_OUT) {
        const facing = smooth(0.2, 0.6, Math.sin(front));
        if (facing > 0) {
          const turn = turnAt(front);
          const [x, y] = pointAt(front + SMOKEBOX_BACK, 0.5 - 0.48 * turn, 76);
          const r = 15 * sizeAt(front);
          softOut.length = 0;
          softQuad([x - r, y - r], [x + r, y - r], [x + r, y + r], [x - r, y + r], [0.5 * facing, 0.43 * facing, 0.3 * facing, 0.2 * facing]);
          drawSoft(1);
        }
      }
    };

    const draw = () => {
      if (!shownTexture) return;
      gl.disable(gl.BLEND);
      gl.useProgram(scene.p);
      gl.uniform1i(scene.u.picture, 0);
      gl.uniform1i(scene.u.flow, 1);
      gl.uniform4f(scene.u.fit, ...fitValues);
      gl.uniform1f(scene.u.time, seconds);
      gl.uniform1f(scene.u.sun, dark ? 0 : 1);
      gl.bindBuffer(gl.ARRAY_BUFFER, sceneBuffer);
      const cornerAt = scene.a('corner');
      gl.enableVertexAttribArray(cornerAt);
      gl.vertexAttribPointer(cornerAt, 2, gl.FLOAT, false, 0, 0);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
      drawTrain();
    };

    // Lines the canvas up with the <img> under it, using the same crop as object-fit: cover.
    const fit = () => {
      const { width, height } = art.getBoundingClientRect();
      if (!width || !height) return;
      const sharpness = Math.min(devicePixelRatio || 1, Math.sqrt(4e6 / (width * height)));
      const w = Math.round(width * sharpness);
      const h = Math.round(height * sharpness);
      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w;
        canvas.height = h;
        gl.viewport(0, 0, w, h);
      }
      const ratio = PICTURE_W / PICTURE_H;
      const shownWidth = Math.max(width, height * ratio);
      const shownHeight = shownWidth / ratio;
      const [x, y] = getComputedStyle(pictureFor(dark)).objectPosition.split(' ').map(parseFloat);
      fitValues = [width / shownWidth, height / shownHeight, ((shownWidth - width) * x) / 100 / shownWidth, ((shownHeight - height) * y) / 100 / shownHeight];
      setTimetable((fitValues[2] + fitValues[0]) * PICTURE_W, fitValues[2] * PICTURE_W);
      draw();
    };
    new ResizeObserver(fit).observe(art);
    addEventListener('resize', fit);

    // The picture for the current theme goes up as a texture when it's first needed, and again if
    // the browser moves to a sharper size of it.
    const textures = new Map();
    const uploaded = new Map();
    const showPicture = async () => {
      const wanted = isDark();
      const image = pictureFor(wanted);
      if (!(await ready(image)) || wanted !== isDark()) return;
      if (uploaded.get(image) !== image.currentSrc) {
        if (textures.get(image)) gl.deleteTexture(textures.get(image));
        textures.set(image, makeTexture(0, image));
        uploaded.set(image, image.currentSrc);
      }
      gl.activeTexture(gl.TEXTURE0);
      gl.bindTexture(gl.TEXTURE_2D, textures.get(image));
      dark = wanted;
      shownTexture = textures.get(image);
      fit();
      canvas.classList.add('on');
      update();
    };
    for (const image of [pictureFor(false), pictureFor(true)]) {
      image.addEventListener('load', () => {
        if (textures.has(image) && image === pictureFor(isDark())) showPicture();
      });
    }
    const themeChanged = () => {
      // If the new picture isn't here yet, nothing of the old theme should show over the gap.
      if (!textures.has(pictureFor(isDark()))) canvas.style.transition = 'none';
      canvas.classList.remove('on');
      canvas.getBoundingClientRect();
      canvas.style.transition = '';
      update();
      showPicture();
    };
    document.addEventListener('themechange', themeChanged);
    system.addEventListener('change', themeChanged);

    // Continuous real-time hardware-accelerated animation loop
    const startTime = performance.now();
    let frame = 0;
    let visible = true;
    let lost = false;
    const tick = (now) => {
      frame = requestAnimationFrame(tick);
      const speed = typeof window !== 'undefined' && (window as any).__vandeSpeed ? (window as any).__vandeSpeed : 1.0;
      seconds = ((now - startTime) / 1000) * speed;
      draw();
    };
    function update() {
      const run = !lost && canvas.classList.contains('on') && visible && !calm.matches;
      if (run && !frame) {
        frame = requestAnimationFrame(tick);
      } else if (!run && frame) {
        cancelAnimationFrame(frame);
        frame = 0;
      }
    }
    const visibilityObserver = new IntersectionObserver((entries) => {
      visible = entries[entries.length - 1].isIntersecting;
      update();
    });
    visibilityObserver.observe(art);
    cleanupFns.push(() => visibilityObserver.disconnect());
    calm.addEventListener('change', update);

    canvas.addEventListener('webglcontextlost', () => {
      lost = true;
      canvas.remove();
      update();
    });

    if (cleanedUp) {
      try { canvas.remove(); } catch (_) {}
      return;
    }
    art.querySelectorAll('canvas').forEach((c) => c.remove());
    pictureFor(true).after(canvas);
    await showPicture();
    if (cleanedUp) {
      try { canvas.remove(); } catch (_) {}
      return;
    }

    cleanupFns.push(() => {
      if (frame) {
        cancelAnimationFrame(frame);
        frame = 0;
      }
      document.removeEventListener('themechange', themeChanged);
      system.removeEventListener('change', themeChanged);
      calm.removeEventListener('change', update);
      try { canvas.remove(); } catch (_) {}
    });

    const themeObserver = new MutationObserver(() => {
      themeChanged();
    });
    themeObserver.observe(root, { attributes: true, attributeFilter: ['class', 'data-theme'] });
    cleanupFns.push(() => themeObserver.disconnect());
  };

  // Launch immediately so the train is running continuously right from initial load/refresh
  let started = false;
  const launch = () => {
    if (started || cleanedUp) return;
    started = true;
    start();
  };

  launch();
  } catch (err) {
    console.warn('Viaduct scene WebGL init skipped or failed:', err);
  }

  return () => {
    cleanedUp = true;
    for (const fn of cleanupFns) {
      try { fn(); } catch (_) {}
    }
    try {
      art.querySelectorAll('canvas').forEach((c) => c.remove());
    } catch (_) {}
  };
}
