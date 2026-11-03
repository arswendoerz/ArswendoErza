import * as THREE from "three";

/**
 * The hero's 3D scene: the portrait rebuilt from photo dots, a few objects
 * orbiting it, and deep space behind (drifting planets, comets, a black hole
 * that swallows the odd UFO).
 *
 * Plain three.js on purpose: the whole scene is one imperative loop, so a
 * React renderer would add weight without removing any code.
 *
 * Returns { dispose }. `onReady` fires after the first frame
 * with the figure in it, so the page can hide the flat photo underneath.
 */
export const mountHeroScene = ({ canvas, hero, anchor, imageSrc, reduce, onReady }) => {
  let disposed = false;
  let frame = 0;
  const cleanups = [];
  const on = (target, type, fn, opts) => {
    target.addEventListener(type, fn, opts);
    cleanups.push(() => target.removeEventListener(type, fn, opts));
  };

  const root = document.documentElement;
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75));
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 100);
  const CAM_Z = 9;
  camera.position.set(0, 0, CAM_Z);
  const halfHeightAt = (z) => Math.tan(THREE.MathUtils.degToRad(22.5)) * (CAM_Z - z);

  const colors = () => {
    const css = getComputedStyle(root);
    const c = (v) => new THREE.Color(...css.getPropertyValue(v).trim().split(/\s+/).map((n) => n / 255));
    return { accent: c("--c-accent"), cyan: c("--c-accent-cyan"), light: root.dataset.theme === "light" };
  };

  // soft round sprite: points are square without one
  const glowSprite = (() => {
    const cv = document.createElement("canvas");
    cv.width = cv.height = 64;
    const g = cv.getContext("2d");
    const grad = g.createRadialGradient(32, 32, 0, 32, 32, 32);
    grad.addColorStop(0, "rgba(255,255,255,1)");
    grad.addColorStop(0.35, "rgba(255,255,255,0.55)");
    grad.addColorStop(1, "rgba(255,255,255,0)");
    g.fillStyle = grad;
    g.fillRect(0, 0, 64, 64);
    return new THREE.CanvasTexture(cv);
  })();

  // ── background star field: far away, round, mostly white, a few blue ──
  const STARS = 650;
  const starPos = new Float32Array(STARS * 3), starCol = new Float32Array(STARS * 3);
  for (let i = 0; i < STARS; i++) {
    const r = 22 + Math.random() * 20;
    const th = Math.random() * Math.PI * 2, ph = Math.acos(2 * Math.random() - 1);
    starPos.set([r * Math.sin(ph) * Math.cos(th), r * Math.sin(ph) * Math.sin(th) * 0.7, -Math.abs(r * Math.cos(ph)) - 6], i * 3);
    const blue = Math.random() < 0.3;
    const v = 0.55 + Math.random() * 0.45;
    starCol.set(blue ? [0.45 * v, 0.8 * v, v] : [v, v, v], i * 3);
  }
  const starGeo = new THREE.BufferGeometry();
  starGeo.setAttribute("position", new THREE.BufferAttribute(starPos, 3));
  starGeo.setAttribute("color", new THREE.BufferAttribute(starCol, 3));
  const starMat = new THREE.PointsMaterial({ size: 0.16, map: glowSprite, vertexColors: true, transparent: true, depthWrite: false });
  const stars = new THREE.Points(starGeo, starMat);
  scene.add(stars);

  // ── stage: the portrait column; `body` holds the figure and its orbiters ──
  const stage = new THREE.Group();
  scene.add(stage);
  const body = new THREE.Group();
  stage.add(body);

  // ── lights for the solid space objects ──
  scene.add(new THREE.AmbientLight(0xffffff, 0.55));
  const sun = new THREE.DirectionalLight(0xffffff, 2.2);
  sun.position.set(-4, 4, 6); // from the text side, so the lit faces point at the reader
  scene.add(sun);
  const rim = new THREE.PointLight(0x22d3ee, 25, 20);
  rim.position.set(6, 1, -3);
  scene.add(rim);

  // gas-giant bands, drawn once in grey and tinted by the material colour
  const bandTexture = () => {
    const cv = document.createElement("canvas");
    cv.width = 8;
    cv.height = 256;
    const g = cv.getContext("2d");
    let v = 0.8;
    for (let y = 0; y < 256; y++) {
      v = Math.min(1, Math.max(0.45, v + (Math.random() - 0.5) * 0.12 + Math.sin(y * 0.11) * 0.02));
      const c = Math.round(v * 255);
      g.fillStyle = `rgb(${c},${c},${c})`;
      g.fillRect(0, y, 8, 1);
    }
    const t = new THREE.CanvasTexture(cv);
    t.colorSpace = THREE.SRGBColorSpace;
    return t;
  };

  // a lumpy, faceted rock: an icosahedron with every vertex pushed in or out
  const rockGeometry = (radius, detail = 1) => {
    const geo = new THREE.IcosahedronGeometry(radius, detail);
    const p = geo.attributes.position, v = new THREE.Vector3(), seen = new Map();
    for (let i = 0; i < p.count; i++) {
      v.fromBufferAttribute(p, i);
      const key = `${v.x.toFixed(3)},${v.y.toFixed(3)},${v.z.toFixed(3)}`;
      if (!seen.has(key)) seen.set(key, 0.72 + Math.random() * 0.45); // shared corners move together
      v.multiplyScalar(seen.get(key));
      p.setXYZ(i, v.x, v.y, v.z);
    }
    geo.computeVertexNormals();
    return geo;
  };

  // ── deep space: planets, comets and the odd UFO behind the scene ───
  // value noise that wraps horizontally, so planet maps have no seam
  const lattice = Float32Array.from({ length: 256 * 256 }, Math.random);
  const noise = (x, y, period) => {
    const xi = Math.floor(x), yi = Math.floor(y), xf = x - xi, yf = y - yi;
    const at = (i, j) => lattice[((((i % period) + period) % period) & 255) + ((j & 255) << 8)];
    const u = xf * xf * (3 - 2 * xf), v = yf * yf * (3 - 2 * yf);
    const a = at(xi, yi), b = at(xi + 1, yi), c = at(xi, yi + 1), d = at(xi + 1, yi + 1);
    return a + (b - a) * u + (c - a) * v + (a - b - c + d) * u * v;
  };
  const fbm = (u, v, freq) => {
    let sum = 0, amp = 0.5, f = freq;
    for (let o = 0; o < 5; o++, amp *= 0.5, f *= 2) sum += noise(u * f, v * f, f) * amp;
    return sum / 0.97;
  };
  const mix = (a, b, k) => a.map((x, i) => x + (b[i] - x) * k);
  // paints an equirectangular map from a (u, v) → [r, g, b] function
  const planetMap = (paint) => {
    const cw = 384, ch = 192;
    const cv = document.createElement("canvas");
    cv.width = cw;
    cv.height = ch;
    const g = cv.getContext("2d"), img = g.createImageData(cw, ch);
    for (let y = 0; y < ch; y++) for (let x = 0; x < cw; x++) {
      const [r, gg, b] = paint(x / cw, y / ch);
      const i = (y * cw + x) * 4;
      img.data[i] = r; img.data[i + 1] = gg; img.data[i + 2] = b; img.data[i + 3] = 255;
    }
    g.putImageData(img, 0, 0);
    const tex = new THREE.CanvasTexture(cv);
    tex.colorSpace = THREE.SRGBColorSpace;
    return tex;
  };

  const earthMap = planetMap((u, v) => {
    const n = fbm(u, v * 0.5, 6), cloud = fbm(u + 0.3, v * 0.5 + 0.2, 8);
    const lat = Math.abs(v - 0.5) * 2;
    let c = n > 0.53
      ? mix([70, 120, 60], [150, 130, 90], Math.min(1, (n - 0.53) * 6)) // land: green to dry
      : mix([12, 40, 110], [30, 95, 170], n / 0.53); // ocean: deep to shallow
    if (lat > 0.82) c = mix(c, [235, 240, 250], Math.min(1, (lat - 0.82) * 8)); // ice caps
    if (cloud > 0.58) c = mix(c, [245, 248, 255], Math.min(0.85, (cloud - 0.58) * 4));
    return c;
  });
  const marsMap = planetMap((u, v) => {
    const n = fbm(u, v * 0.5, 5), lat = Math.abs(v - 0.5) * 2;
    let c = mix([110, 45, 28], [200, 100, 60], n);
    if (lat > 0.88) c = mix(c, [240, 230, 225], (lat - 0.88) * 8);
    return c;
  });
  const jupiterMap = planetMap((u, v) => {
    const swirl = fbm(u, v, 4) * 5;
    const band = 0.5 + 0.5 * Math.sin(v * 38 + swirl);
    const c = mix([170, 100, 60], [235, 215, 175], band);
    // the great red spot
    const dx = (u - 0.32) * 2.2, dy = (v - 0.62) * 5;
    const spot = Math.max(0, 1 - Math.hypot(dx, dy) * 3);
    return mix(c, [180, 70, 45], spot);
  });
  const iceMap = planetMap((u, v) => {
    const band = 0.5 + 0.5 * Math.sin(v * 22 + fbm(u, v, 3) * 3);
    return mix([120, 140, 210], [200, 215, 245], band);
  });

  // thin rim of atmosphere, brightest at the edge of the disc
  const atmosphere = (radius, color, power = 2.6) => new THREE.Mesh(
    new THREE.SphereGeometry(radius * 1.07, 48, 32),
    new THREE.ShaderMaterial({
      uniforms: { color: { value: new THREE.Color(color) }, power: { value: power } },
      vertexShader: `varying vec3 vN; varying vec3 vV;
        void main() { vN = normalize(normalMatrix * normal); vec4 mv = modelViewMatrix * vec4(position, 1.0);
          vV = normalize(-mv.xyz); gl_Position = projectionMatrix * mv; }`,
      fragmentShader: `uniform vec3 color; uniform float power; varying vec3 vN; varying vec3 vV;
        void main() { float f = pow(1.0 - max(dot(vN, vV), 0.0), power); gl_FragColor = vec4(color, f); }`,
      transparent: true, blending: THREE.AdditiveBlending, depthWrite: false,
    }));

  const deep = new THREE.Group();
  scene.add(deep);
  // deep-space objects shrink on a narrow, tall hero, where a planet sized for
  // a wide window would fill half the screen
  let deepK = 1;
  // sx / sy place each planet as a fraction of the visible frame at its depth,
  // so they keep their spot in the composition whatever the window shape
  const planets = [];
  const addPlanet = ({ map, radius, sx, sy, z, tilt = 0.4, spin = 0.05, glow }) => {
    const g = new THREE.Group();
    const globe = new THREE.Mesh(new THREE.SphereGeometry(radius, 64, 40),
      new THREE.MeshStandardMaterial({ map, roughness: 0.85, metalness: 0 }));
    g.add(globe);
    if (glow) g.add(atmosphere(radius, glow));
    g.rotation.z = tilt;
    deep.add(g);
    planets.push({
      g, globe, sx, sy, z, spin, base: new THREE.Vector3(),
      // a few sines at unrelated speeds never line up, so the drift never
      // repeats in any way the eye can catch
      wander: Array.from({ length: 6 }, () => ({ f: 0.04 + Math.random() * 0.11, ph: Math.random() * Math.PI * 2 })),
      reach: 0.35 + z * -0.03, // further planets may roam a little further in world units
    });
  };
  addPlanet({ map: earthMap, radius: 0.62, sx: -0.6, sy: 0.74, z: -6, tilt: 0.41, spin: 0.06, glow: 0x4aa8ff });
  addPlanet({ map: marsMap, radius: 0.32, sx: 0.08, sy: 0.8, z: -9, tilt: 0.44, spin: 0.08, glow: 0xff9a6a });
  addPlanet({ map: jupiterMap, radius: 2.1, sx: -0.86, sy: -0.88, z: -15, tilt: 0.05, spin: 0.03 });
  addPlanet({ map: iceMap, radius: 0.95, sx: 0.95, sy: -0.62, z: -17, tilt: 0.9, spin: 0.04, glow: 0x9fd8ff });

  // ── black hole: dark core, a swirling accretion disc and a photon ring ──
  const BH = { sx: 0.2, sy: 0.5, z: -24, flash: 0 };
  const blackHole = new THREE.Group();
  scene.add(blackHole);
  {
    blackHole.add(new THREE.Mesh(new THREE.SphereGeometry(1, 48, 32), new THREE.MeshBasicMaterial({ color: 0x000000 })));

    // hot white-cyan at the inner edge cooling to blue and violet, streaked
    // by turbulence that spins faster close to the hole
    const disc = new THREE.Mesh(new THREE.RingGeometry(1.25, 3.6, 160, 8), new THREE.ShaderMaterial({
      uniforms: { time: { value: 0 }, flash: { value: 0 } },
      vertexShader: `varying vec2 vP; void main() { vP = position.xy; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }`,
      fragmentShader: `uniform float time; uniform float flash; varying vec2 vP;
        float h(vec2 p) { return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
        float n(vec2 p) { vec2 i = floor(p), f = fract(p); f = f * f * (3.0 - 2.0 * f);
          return mix(mix(h(i), h(i + vec2(1, 0)), f.x), mix(h(i + vec2(0, 1)), h(i + 1.0), f.x), f.y); }
        void main() {
          float r = length(vP), a = atan(vP.y, vP.x);
          float k = (r - 1.25) / 2.35;
          float swirl = a * 3.0 + time * (2.4 / (r * r)) * 3.0 - r * 2.0;
          float streak = n(vec2(swirl * 1.6, r * 5.0)) * 0.6 + n(vec2(swirl * 4.0, r * 14.0)) * 0.4;
          vec3 hot = vec3(0.92, 0.98, 1.0), mid = vec3(0.25, 0.65, 1.0), cool = vec3(0.45, 0.25, 0.85);
          vec3 col = mix(mix(hot, mid, smoothstep(0.0, 0.35, k)), cool, smoothstep(0.35, 1.0, k));
          float alpha = pow(1.0 - k, 1.6) * smoothstep(0.0, 0.06, k) * (0.35 + streak * 0.9);
          gl_FragColor = vec4(col * (1.3 + flash * 1.5), min(1.0, alpha * 1.7 * (1.0 + flash)));
        }`,
      transparent: true, side: THREE.DoubleSide, blending: THREE.AdditiveBlending, depthWrite: false,
    }));
    disc.rotation.x = -Math.PI / 2 + 0.42; // tipped just enough to read as a disc
    disc.rotation.y = 0.18;
    blackHole.add(disc);

    // photon ring: always faces the camera and wraps the shadow, faking the
    // lensed far side of the disc
    const ring = new THREE.Mesh(new THREE.RingGeometry(1.02, 1.5, 128), new THREE.ShaderMaterial({
      uniforms: { flash: { value: 0 } },
      vertexShader: `varying vec2 vP; void main() { vP = position.xy; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }`,
      fragmentShader: `uniform float flash; varying vec2 vP;
        void main() { float r = length(vP); float k = (r - 1.02) / 0.48;
          float a = pow(1.0 - k, 3.0) * smoothstep(0.0, 0.08, k);
          gl_FragColor = vec4(mix(vec3(0.85, 0.95, 1.0), vec3(0.35, 0.6, 1.0), k) * (1.0 + flash * 2.0), a * (0.9 + flash)); }`,
      transparent: true, blending: THREE.AdditiveBlending, depthWrite: false,
    }));
    blackHole.add(ring);

    const haze = new THREE.Sprite(new THREE.SpriteMaterial({ map: glowSprite, color: 0x3a4fd0, transparent: true, opacity: 0.35, blending: THREE.AdditiveBlending, depthWrite: false }));
    haze.scale.setScalar(9);
    blackHole.add(haze);
    Object.assign(BH, { disc, ring });
  }

  const placeDeep = () => {
    const place = (o, sx, sy, z) => {
      const halfH = halfHeightAt(z);
      o.set(sx * halfH * camera.aspect, sy * halfH, z);
    };
    planets.forEach((p) => place(p.base, p.sx, p.sy, p.z));
    place(blackHole.position, BH.sx, BH.sy, BH.z);
  };

  // comets: a bright head and a fading trail of its own recent positions
  const comets = [];
  const TRAIL = 70;
  const makeComet = () => {
    const head = new THREE.Mesh(new THREE.SphereGeometry(0.07, 16, 12), new THREE.MeshBasicMaterial({ color: 0xe8fbff }));
    const halo = new THREE.Sprite(new THREE.SpriteMaterial({ map: glowSprite, color: 0x7fdcff, transparent: true, blending: THREE.AdditiveBlending, depthWrite: false }));
    halo.scale.setScalar(0.9);
    head.add(halo);
    head.scale.setScalar(deepK);
    const trailPos = new Float32Array(TRAIL * 3), trailCol = new Float32Array(TRAIL * 3);
    for (let i = 0; i < TRAIL; i++) {
      const f = (1 - i / TRAIL) ** 1.6;
      trailCol.set([0.55 * f, 0.85 * f, f], i * 3);
    }
    const trailGeo = new THREE.BufferGeometry();
    trailGeo.setAttribute("position", new THREE.BufferAttribute(trailPos, 3));
    trailGeo.setAttribute("color", new THREE.BufferAttribute(trailCol, 3));
    const trail = new THREE.Points(trailGeo, new THREE.PointsMaterial({
      size: 0.32, map: glowSprite, vertexColors: true, transparent: true, blending: THREE.AdditiveBlending, depthWrite: false,
    }));
    trail.frustumCulled = false;
    deep.add(head, trail);
    const c = { head, trail, from: new THREE.Vector3(), to: new THREE.Vector3(), t: 0, dur: 1, wait: 0, history: [] };
    comets.push(c);
    return c;
  };
  const launchComet = (c, delay) => {
    // a long shallow diagonal across the far sky, either direction
    const z = -12 - Math.random() * 10, halfH = halfHeightAt(z), halfW = halfH * camera.aspect;
    const dir = Math.random() < 0.5 ? 1 : -1, y0 = (0.2 + Math.random() * 0.7) * halfH;
    c.from.set(-dir * halfW * 1.25, y0, z);
    c.to.set(dir * halfW * 1.25, y0 - (0.4 + Math.random() * 0.6) * halfH, z);
    c.t = 0;
    c.dur = 9 + Math.random() * 6;
    c.wait = delay;
    c.history.length = 0;
    c.head.visible = c.trail.visible = false;
  };

  // UFO: a metal saucer with a glass dome and a ring of blinking lights
  const ufo = new THREE.Group();
  {
    const hull = new THREE.Mesh(new THREE.LatheGeometry([
      new THREE.Vector2(0, -0.1), new THREE.Vector2(0.35, -0.1), new THREE.Vector2(0.75, -0.02),
      new THREE.Vector2(0.78, 0.02), new THREE.Vector2(0.4, 0.12), new THREE.Vector2(0, 0.14),
    ], 48), new THREE.MeshStandardMaterial({ color: 0xc8d2e0, metalness: 0.85, roughness: 0.25 }));
    const dome = new THREE.Mesh(new THREE.SphereGeometry(0.26, 32, 16, 0, Math.PI * 2, 0, Math.PI / 2),
      new THREE.MeshStandardMaterial({ color: 0x7fe3ff, emissive: 0x2299cc, emissiveIntensity: 0.6, transparent: true, opacity: 0.75, roughness: 0.1 }));
    dome.position.y = 0.12;
    ufo.add(hull, dome);
    const beam = new THREE.Sprite(new THREE.SpriteMaterial({ map: glowSprite, color: 0x5fd4ff, transparent: true, blending: THREE.AdditiveBlending, depthWrite: false }));
    beam.scale.set(1.6, 0.5, 1);
    beam.position.y = -0.14;
    ufo.add(beam);
    ufo.userData.lights = [];
    for (let i = 0; i < 10; i++) {
      const a = (i / 10) * Math.PI * 2;
      const lamp = new THREE.Mesh(new THREE.SphereGeometry(0.035, 8, 8), new THREE.MeshBasicMaterial());
      lamp.position.set(Math.cos(a) * 0.7, 0, Math.sin(a) * 0.7);
      ufo.add(lamp);
      ufo.userData.lights.push(lamp);
    }
  }
  ufo.visible = false;
  scene.add(ufo);
  // a flight: streak from beside the camera toward the black hole, get caught,
  // spiral in ever faster while shrinking, and vanish past the horizon
  const flight = { active: false, t: 0, dur: 5, wait: 4, from: new THREE.Vector3(), entry: new THREE.Vector3(), side: 1, a0: 0 };
  const CAPTURE = 0.55; // share of the flight spent spiralling in
  const SPIRAL_R = 3.2; // radius where the spiral starts, in disc units
  const discPoint = (angle, r, out) => {
    out.set(Math.cos(angle) * r, Math.sin(angle) * r, 0);
    return BH.disc.localToWorld(out);
  };
  const startFlight = () => {
    flight.side = Math.random() < 0.5 ? 1 : -1;
    flight.from.set(flight.side * (3.6 + Math.random()), 1.2 + Math.random() * 1.6, 6.2);
    flight.a0 = Math.random() * Math.PI * 2;
    blackHole.updateMatrixWorld(true);
    discPoint(flight.a0, SPIRAL_R, flight.entry);
    flight.t = 0;
    flight.dur = 4.6 + Math.random() * 1.2;
    flight.active = true;
    ufo.visible = true;
    ufo.scale.setScalar(deepK);
  };
  const easeInOut = (x) => (x < 0.5 ? 4 * x * x * x : 1 - (-2 * x + 2) ** 3 / 2);

  // ── the person, built from the cut-out photo (filled in once it decodes) ──
  const FIGURE_H = 6.6;
  const DOT = 0.037; // dot size at full scale
  // a shrunken figure has the same dots in less room; slightly fatter dots keep it solid
  const dotSize = () => DOT * stage.scale.x * (stage.scale.x < 1 ? 1.35 : 1);
  const orbitGroup = new THREE.Group();
  orbitGroup.position.y = 0.5;
  body.add(orbitGroup);
  const orbiters = [];
  let figure = null;

  const buildFigure = (img) => {
    const W = img.naturalWidth, H = img.naturalHeight;
    const sample = document.createElement("canvas");
    sample.width = W;
    sample.height = H;
    const ctx = sample.getContext("2d", { willReadFrequently: true });
    ctx.drawImage(img, 0, 0);
    const px = ctx.getImageData(0, 0, W, H).data;
    const opaque = (x, y) => px[(y * W + x) * 4 + 3] > 140;

    let bx0 = W, by0 = H, bx1 = 0, by1 = 0;
    for (let y = 0; y < H; y += 2) for (let x = 0; x < W; x += 2) {
      if (opaque(x, y)) {
        if (x < bx0) bx0 = x;
        if (x > bx1) bx1 = x;
        if (y < by0) by0 = y;
        if (y > by1) by1 = y;
      }
    }
    const bw = bx1 - bx0, bh = by1 - by0;
    const scale = FIGURE_H / bh;
    const FIGURE_W = bw * scale;

    // Body thickness. A real body is about as deep at the head (~20 cm) as at
    // the chest (~25 cm with crossed arms) even though the chest is far wider,
    // so the thickness follows the row width only for narrow rows and is
    // capped for wide ones. Rows bend on a squarish curve, like a torso.
    const rowSpan = new Map();
    for (let y = by0; y <= by1; y++) {
      let l = -1, r = -1;
      for (let x = bx0; x <= bx1; x++) if (opaque(x, y)) { if (l < 0) l = x; r = x; }
      if (l >= 0) rowSpan.set(y, [l, r]);
    }
    const MAX_DEPTH = FIGURE_H * 0.2;
    const rawDepth = new Map();
    rowSpan.forEach(([l, r], y) => rawDepth.set(y, Math.min((r - l) * scale * 1.1, MAX_DEPTH)));
    // smoothed along the height so shoulders and chin blend instead of stepping
    const rowDepth = new Map();
    const SMOOTH = Math.round(bh * 0.02);
    rowSpan.forEach((_, y) => {
      let sum = 0, n = 0;
      for (let k = y - SMOOTH; k <= y + SMOOTH; k++) if (rawDepth.has(k)) { sum += rawDepth.get(k); n++; }
      rowDepth.set(y, sum / n);
    });
    const curve = (u) => Math.pow(Math.max(0, 1 - Math.abs(u) ** 2.4), 1 / 2.4);
    const depthAt = (x, y, back) => {
      const [l, r] = rowSpan.get(y);
      const half = Math.max((r - l) / 2, 1), u = (x - (l + r) / 2) / half;
      // a little more in front than behind: chest and face lead the spine
      return curve(u) * rowDepth.get(y) * (back ? -0.45 : 0.55);
    };

    // The neck is the narrowest row in the upper body. Everything above it
    // barely turns, so the figure twists its torso while still looking at the
    // visitor; a face rebuilt from one front photo never survives a real turn.
    let neckY = by0, neckW = Infinity;
    for (let y = Math.round(by0 + bh * 0.1); y < by0 + bh * 0.4; y++) {
      const span = rowSpan.get(y);
      if (span && span[1] - span[0] < neckW) { neckW = span[1] - span[0]; neckY = y; }
    }
    const HEAD_TURN = 0.12;
    const blend = bh * 0.06; // shoulders ease into the twist over this many pixels
    const turnWeight = (y) => {
      const s = THREE.MathUtils.clamp((y - neckY) / blend, 0, 1);
      return HEAD_TURN + (1 - HEAD_TURN) * s * s * (3 - 2 * s);
    };

    const home = [], base = [], lums = [], weights = [];
    const addDots = (step, back) => {
      for (let y = by0; y < by1; y += step) for (let x = bx0; x < bx1; x += step) {
        if (!opaque(x, y)) continue;
        const i = (y * W + x) * 4;
        const r = px[i] / 255, g = px[i + 1] / 255, b = px[i + 2] / 255;
        // a random nudge inside the sampling cell: a perfectly regular grid of
        // dots beats against the screen's pixel grid and shows up as stripes
        const jx = (Math.random() - 0.5) * step, jy = (Math.random() - 0.5) * step;
        home.push((x + jx - bx0 - bw / 2) * scale, (by0 + bh / 2 - y - jy) * scale, depthAt(x, y, back));
        base.push(r, g, b);
        lums.push(back ? -1 : 0.299 * r + 0.587 * g + 0.114 * b); // -1 marks a back dot
        weights.push(turnWeight(y));
      }
    };
    addDots(2, false);
    addDots(4, true);

    const N = home.length / 3;
    const cur = new Float32Array(N * 3);
    // the dots start scattered and gather into the figure
    for (let i = 0; i < N; i++) {
      const r = 4 + Math.random() * 5, th = Math.random() * Math.PI * 2, ph = Math.acos(2 * Math.random() - 1);
      cur.set([r * Math.sin(ph) * Math.cos(th), r * Math.sin(ph) * Math.sin(th), r * Math.cos(ph)], i * 3);
    }
    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(cur, 3));
    geo.setAttribute("color", new THREE.BufferAttribute(new Float32Array(N * 3), 3));
    // opaque + depth-writing, so orbiters behind the body are hidden by it
    const dots = new THREE.Points(geo, new THREE.PointsMaterial({ size: dotSize(), vertexColors: true }));
    body.add(dots);

    // ── space objects orbiting the body: a ringed planet, a moon, rocks ──
    const addOrbiter = (mesh, { r, speed, phase, tiltX, tiltZ, y = 0, spin = 0 }) => {
      const pivot = new THREE.Group();
      pivot.rotation.set(tiltX, 0, tiltZ);
      pivot.position.y = y;
      pivot.add(mesh);
      orbitGroup.add(pivot);
      orbiters.push({ mesh, r, speed, phase, spin, axis: new THREE.Vector3(Math.random(), Math.random(), Math.random()).normalize() });
    };
    const planet = new THREE.Group();
    const globe = new THREE.Mesh(new THREE.SphereGeometry(0.26, 48, 32),
      new THREE.MeshStandardMaterial({ map: bandTexture(), roughness: 0.75, metalness: 0.05 }));
    globe.userData.tint = "planet";
    const ring = new THREE.Mesh(new THREE.RingGeometry(0.36, 0.56, 96),
      new THREE.MeshStandardMaterial({ side: THREE.DoubleSide, transparent: true, opacity: 0.45, roughness: 0.9 }));
    ring.rotation.x = -Math.PI / 2 + 0.22; // nearly edge-on, like Saturn from afar
    ring.userData.tint = "planetRing";
    planet.add(globe, ring);
    planet.rotation.z = 0.35;
    addOrbiter(planet, { r: FIGURE_W * 0.7, speed: 0.2, phase: 0.6, tiltX: 0.3, tiltZ: -0.14, y: 0.5 });

    const moon = new THREE.Mesh(rockGeometry(0.17, 3), new THREE.MeshStandardMaterial({ flatShading: true, roughness: 1 }));
    moon.userData.tint = "moon";
    addOrbiter(moon, { r: FIGURE_W * 0.62, speed: -0.32, phase: 2.6, tiltX: 0.4, tiltZ: 0.22, y: 0.2, spin: 0.3 });

    // asteroid fragments sharing one tilt, scattered along it
    for (let i = 0; i < 11; i++) {
      const rock = new THREE.Mesh(rockGeometry(0.045 + Math.random() * 0.09, 0),
        new THREE.MeshStandardMaterial({ flatShading: true, roughness: 0.95 }));
      rock.userData.tint = "rock";
      addOrbiter(rock, {
        r: FIGURE_W * (0.6 + Math.random() * 0.3),
        speed: 0.14 + Math.random() * 0.18,
        phase: (i / 11) * Math.PI * 2 + Math.random() * 0.4,
        tiltX: 0.24, tiltZ: 0.1,
        y: -0.6 + (Math.random() - 0.5) * 0.5,
        spin: 0.6 + Math.random() * 1.4,
      });
    }

    figure = {
      N, geo, cur, dots, home: new Float32Array(home), base, lums,
      seed: Float32Array.from({ length: N }, Math.random),
      turnW: Float32Array.from(weights),
    };
  };

  // ── colour: the photo with a light brand duotone, brand-tinted space objects ──
  const applyColors = () => {
    const c = colors();
    // white stars vanish on a light page, so there they are tinted a slate blue
    starMat.color.set(c.light ? 0x3d5a8a : 0xffffff);
    starMat.blending = c.light ? THREE.NormalBlending : THREE.AdditiveBlending;
    starMat.opacity = c.light ? 0.6 : 0.9;
    starMat.needsUpdate = true;
    rim.color.copy(c.cyan);
    if (!figure) return;

    // dark tones lean to the accent blue, highlights to cyan-white, with most
    // of the photo's own colour kept so the face stays readable
    const low = c.accent.clone().multiplyScalar(c.light ? 0.75 : 0.55);
    const high = c.light ? c.cyan.clone().multiplyScalar(0.8) : c.cyan.clone().lerp(new THREE.Color(1, 1, 1), 0.45);
    const keep = c.light ? 0.75 : 0.8;
    const { N, base, lums, geo } = figure;
    const out = geo.attributes.color.array, tmp = new THREE.Color(), photo = new THREE.Color();
    for (let i = 0; i < N; i++) {
      const k = i * 3, lum = lums[i];
      if (lum < 0) {
        // back shell: the photo's own colour, darkened, so a dot that peeks
        // through a gap in the front matches it instead of greying the face
        tmp.setRGB(base[k], base[k + 1], base[k + 2]).multiplyScalar(c.light ? 0.85 : 0.7);
      } else {
        // an S-curve on brightness keeps eyes, mouth and shirt folds readable
        const s = lum * lum * (3 - 2 * lum);
        tmp.copy(low).lerp(high, s);
        tmp.lerp(photo.setRGB(base[k], base[k + 1], base[k + 2]).multiplyScalar(c.light ? 1 : 1.25), keep);
      }
      out[k] = tmp.r; out[k + 1] = tmp.g; out[k + 2] = tmp.b;
    }
    geo.attributes.color.needsUpdate = true;

    const space = {
      planet: c.accent.clone().lerp(c.cyan, 0.35),
      planetRing: c.cyan.clone().lerp(new THREE.Color(1, 1, 1), 0.3),
      moon: new THREE.Color(0.62, 0.66, 0.74),
      rock: new THREE.Color(0.46, 0.5, 0.6),
    };
    orbitGroup.traverse((o) => {
      if (!o.material || !o.userData.tint) return;
      o.material.color.copy(space[o.userData.tint]);
      // a faint self-glow keeps the dark sides from vanishing on the night background
      o.material.emissive?.copy(space[o.userData.tint]).multiplyScalar(c.light ? 0 : 0.12);
    });
  };

  // ── layout: the figure stands where the portrait column is ──
  const resize = () => {
    const { clientWidth: w, clientHeight: h } = hero;
    if (!w || !h) return;
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    const halfH = halfHeightAt(0), halfW = halfH * camera.aspect;
    const hr = hero.getBoundingClientRect(), ar = anchor.getBoundingClientRect();
    const ndcX = ((ar.left + ar.width / 2 - hr.left) / hr.width) * 2 - 1;
    const wide = window.innerWidth >= 1024;
    deepK = wide ? 1 : THREE.MathUtils.clamp((camera.aspect / 1.6) ** 0.75, 0.3, 1);
    planets.forEach((p) => p.g.scale.setScalar(deepK));
    blackHole.scale.setScalar(deepK);
    comets.forEach((c) => c.head.scale.setScalar(deepK));
    // a taller canvas draws every world unit bigger; keep stars star-sized
    starMat.size = 0.16 * Math.min(1, 900 / h);
    if (wide) {
      // beside the copy: full size, standing on the bottom edge of the hero
      stage.scale.setScalar(1);
      stage.position.set(ndcX * halfW, -halfH + FIGURE_H / 2 - 0.15, 0);
    } else {
      // stacked under the copy: shrunk to fill the portrait box exactly
      const ndcY = 1 - ((ar.top + ar.height / 2 - hr.top) / hr.height) * 2;
      stage.scale.setScalar(((ar.height / h) * 2 * halfH) / FIGURE_H);
      stage.position.set(ndcX * halfW, ndcY * halfH, 0);
    }
    if (figure) figure.dots.material.size = dotSize();
    placeDeep();
  };
  on(window, "resize", resize);
  // the stacked hero also grows when fonts or the typed role reflow the copy
  const heroWatch = new ResizeObserver(resize);
  heroWatch.observe(hero);
  cleanups.push(() => heroWatch.disconnect());
  resize();
  applyColors();
  // follow the light/dark switch on <html data-theme>
  const themeWatch = new MutationObserver(applyColors);
  themeWatch.observe(root, { attributes: true, attributeFilter: ["data-theme"] });
  cleanups.push(() => themeWatch.disconnect());
  launchComet(makeComet(), 1.5);
  launchComet(makeComet(), 9);

  // ── pointer ──
  const pointer = { x: 0, y: 0, inside: false }, smooth = { x: 0, y: 0 };
  const ndc = new THREE.Vector2(), ray = new THREE.Raycaster();
  const hit = new THREE.Vector3(), local = new THREE.Vector3(), facing = new THREE.Plane();
  on(hero, "pointermove", (e) => {
    const r = hero.getBoundingClientRect();
    pointer.x = ((e.clientX - r.left) / r.width) * 2 - 1;
    pointer.y = ((e.clientY - r.top) / r.height) * 2 - 1;
    pointer.inside = true;
  });
  on(hero, "pointerleave", () => {
    pointer.x = 0;
    pointer.y = 0;
    pointer.inside = false;
  });

  let visible = true;
  const io = new IntersectionObserver(([e]) => (visible = e.isIntersecting));
  io.observe(hero);
  cleanups.push(() => io.disconnect());

  // ── loop ──
  const REPEL = 1.0;
  const TURN = 0.4; // radians at full turn
  const bodyScreen = new THREE.Vector3();
  let turn = 0, lastT = 0, readySent = false;
  const clock = new THREE.Clock();
  const tick = () => {
    frame = requestAnimationFrame(tick);
    if (!visible) return;
    const t = reduce ? 0 : clock.getElapsedTime();
    // getElapsedTime already consumes the delta, so measure it ourselves
    const dt = Math.min(t - lastT, 0.05);
    lastT = t;
    smooth.x += (pointer.x - smooth.x) * 0.06;
    smooth.y += (pointer.y - smooth.y) * 0.06;

    // The body faces straight ahead by default. It only turns while the
    // cursor is over the portrait column, by how far the cursor sits from the
    // body's centre line, so reading the text on the left never twists it.
    bodyScreen.setFromMatrixPosition(body.matrixWorld).project(camera);
    const overColumn = pointer.inside && pointer.x > bodyScreen.x - 0.42;
    const want = overColumn ? THREE.MathUtils.clamp((pointer.x - bodyScreen.x) / 0.35, -1, 1) : 0;
    turn += (want - turn) * 0.06;
    const twist = turn * TURN;
    orbitGroup.rotation.y = twist;

    orbiters.forEach((o) => {
      const a = o.phase + t * o.speed;
      o.mesh.position.set(Math.cos(a) * o.r, 0, Math.sin(a) * o.r);
      if (o.spin) o.mesh.rotateOnAxis(o.axis, o.spin * dt);
    });
    stars.rotation.y = t * 0.02 + smooth.x * 0.12;
    stars.rotation.x = smooth.y * 0.06;
    // only a whisper of camera parallax, so the face is never seen off-axis at rest
    camera.position.x = smooth.x * 0.12;
    camera.position.y = -smooth.y * 0.08;
    camera.lookAt(0, 0, 0);

    planets.forEach((p) => {
      p.globe.rotation.y = t * p.spin;
      const w = p.wander, s = (i) => Math.sin(t * w[i].f * 2 * Math.PI + w[i].ph);
      p.g.position.set(
        p.base.x + (s(0) * 0.7 + s(1) * 0.3) * p.reach * 1.4,
        p.base.y + (s(2) * 0.6 + s(3) * 0.4) * p.reach,
        p.base.z + (s(4) * 0.5 + s(5) * 0.5) * p.reach * 2,
      );
    });

    BH.disc.material.uniforms.time.value = t;
    BH.flash = Math.max(0, BH.flash - dt * 1.6);
    BH.disc.material.uniforms.flash.value = BH.flash;
    BH.ring.material.uniforms.flash.value = BH.flash;
    BH.ring.quaternion.copy(camera.quaternion);

    if (!reduce) {
      comets.forEach((c) => {
        if (c.wait > 0) { c.wait -= dt; return; }
        c.head.visible = c.trail.visible = true;
        c.t += dt / c.dur;
        if (c.t >= 1) { launchComet(c, 4 + Math.random() * 8); return; }
        c.head.position.lerpVectors(c.from, c.to, c.t);
        // the trail is the head's own path, newest first, thinning as it ages
        c.history.unshift(c.head.position.clone());
        if (c.history.length > TRAIL) c.history.pop();
        const tp = c.trail.geometry.attributes.position.array;
        for (let i = 0; i < TRAIL; i++) {
          const h = c.history[Math.min(i, c.history.length - 1)];
          tp[i * 3] = h.x; tp[i * 3 + 1] = h.y; tp[i * 3 + 2] = h.z;
        }
        c.trail.geometry.attributes.position.needsUpdate = true;
      });

      if (!flight.active) {
        flight.wait -= dt;
        if (flight.wait <= 0) startFlight();
      } else {
        flight.t += dt / flight.dur;
        if (flight.t >= 1) {
          // swallowed: the disc flares for a moment
          flight.active = false;
          ufo.visible = false;
          BH.flash = 1;
          flight.wait = 8 + Math.random() * 6;
        } else if (flight.t < 1 - CAPTURE) {
          // the dash: fast off the mark toward the hole, with a little wobble
          const k = easeInOut(flight.t / (1 - CAPTURE));
          ufo.position.lerpVectors(flight.from, flight.entry, k);
          ufo.position.y += Math.sin(flight.t * 30) * 0.15 * (1 - k);
          ufo.scale.setScalar((1 + k * 1.2) * deepK); // stays readable as it heads deep into the scene
          ufo.rotation.y += dt * 9;
          ufo.rotation.z = -flight.side * 0.35 * (1 - k);
          ufo.rotation.x = 0.25;
        } else {
          // caught: the spiral tightens and speeds up, the saucer shrinks to nothing
          const u = (flight.t - (1 - CAPTURE)) / CAPTURE;
          discPoint(flight.a0 + u * u * Math.PI * 5, 1 + (SPIRAL_R - 1) * (1 - u) ** 1.4, ufo.position);
          ufo.scale.setScalar(2.2 * deepK * (1 - u) ** 1.3 + 0.001);
          ufo.rotation.y += dt * (9 + u * 30);
          ufo.rotation.z = Math.sin(u * 20) * 0.3 * u;
        }
      }
      if (ufo.visible) {
        ufo.userData.lights.forEach((l, i) => {
          const lit = Math.sin(t * 14 + i * 1.3) > 0;
          l.material.color.setHSL(lit ? (0.5 + i * 0.05) % 1 : 0.6, 1, lit ? 0.65 : 0.25);
        });
      }
    }

    if (figure) {
      const { N, cur, home, seed, turnW, geo } = figure;
      // pointer on a plane through the body that faces the camera, in body space
      let lx = 9e9, ly = 9e9;
      if (pointer.inside) {
        camera.updateMatrixWorld();
        body.updateMatrixWorld();
        ndc.set(pointer.x, -pointer.y);
        ray.setFromCamera(ndc, camera);
        body.getWorldPosition(hit);
        facing.setFromNormalAndCoplanarPoint(camera.getWorldDirection(local).negate(), hit);
        if (ray.ray.intersectPlane(facing, hit)) {
          body.worldToLocal(local.copy(hit));
          lx = local.x;
          ly = local.y;
        }
      }
      const ease = reduce ? 1 : 0.07, S = stage.scale.x;
      for (let i = 0; i < N; i++) {
        const k = i * 3;
        const hx = home[k], hz = home[k + 2] + Math.sin(t * 1.6 + home[k + 1] * 2 + seed[i] * 6) * 0.025;
        const a = twist * turnW[i], ca = Math.cos(a), sa = Math.sin(a);
        let tx = hx * ca + hz * sa, ty = home[k + 1], tz = hz * ca - hx * sa;
        // Perspective correction: a dot nearer the camera would look bigger
        // and push the face outward like a fisheye. Pulling each dot toward
        // the view axis by its depth makes the front view match the photo.
        const persp = (CAM_Z - tz * S) / CAM_Z;
        tx = ((stage.position.x + tx * S - camera.position.x) * persp - stage.position.x + camera.position.x) / S;
        ty = ((stage.position.y + ty * S - camera.position.y) * persp - stage.position.y + camera.position.y) / S;
        const dx = tx - lx, dy = ty - ly, d2 = dx * dx + dy * dy;
        if (d2 < REPEL * REPEL) {
          const d = Math.sqrt(d2) || 0.001, f = (1 - d / REPEL) ** 2 * 0.8;
          tx += (dx / d) * f;
          ty += (dy / d) * f;
          tz += Math.sign(tz || 1) * f * 1.2;
        }
        cur[k] += (tx - cur[k]) * ease;
        cur[k + 1] += (ty - cur[k + 1]) * ease;
        cur[k + 2] += (tz - cur[k + 2]) * ease;
      }
      geo.attributes.position.needsUpdate = true;
    }
    renderer.render(scene, camera);
    if (figure && !readySent) {
      readySent = true;
      onReady?.();
    }
  };

  const img = new Image();
  img.src = imageSrc;
  img
    .decode()
    .then(() => {
      if (disposed) return;
      buildFigure(img);
      applyColors();
    })
    .catch(() => {
      // without the photo the scene still shows space; the page keeps its portrait
    });
  tick();

  const dispose = () => {
    disposed = true;
    cancelAnimationFrame(frame);
    cleanups.forEach((fn) => fn());
    scene.traverse((o) => {
      o.geometry?.dispose();
      [].concat(o.material ?? []).forEach((m) => {
        m.map?.dispose();
        m.dispose();
      });
    });
    glowSprite.dispose();
    renderer.dispose();
  };

  return { dispose };
};
