/* ────────────────────────────────────────────────────────────────
   Shaders for the hero clip wave.

   Clips: one instanced plane (9:16). Every position, rotation and scale
   is computed on the GPU from per-instance attributes, so the CPU does
   no per-card work per frame. Each card is drawn procedurally as a
   short-form video: a talking-head subject, burnt-in subtitles with the
   current word highlighted, creator row, action rail and a progress bar.

   Wave: a grid of points displaced by summed sines, additive glow.
──────────────────────────────────────────────────────────────── */

export const clipVertex = /* glsl */ `
uniform float uTime;
uniform float uIntro;
uniform float uSpread;
uniform float uRingScale;

attribute vec4 aParams;   // ring, base angle, seed, kind (0 orbit, 1 master, 2 reserve)
attribute vec4 aScatter;  // scatter direction xyz, delay

varying vec2 vUv;
varying float vSeed;
varying float vShade;
varying float vKind;
varying float vFog;

mat3 rotY(float a) { float c = cos(a), s = sin(a); return mat3(c, 0.0, -s, 0.0, 1.0, 0.0, s, 0.0, c); }
mat3 rotZ(float a) { float c = cos(a), s = sin(a); return mat3(c, s, 0.0, -s, c, 0.0, 0.0, 0.0, 1.0); }

void main() {
  float ring = aParams.x;
  float seed = aParams.z;
  float kind = aParams.w;
  float delay = aScatter.w;

  float isMaster = step(0.5, kind) * step(kind, 1.5);
  float isReserve = step(1.5, kind);

  // Orbit: alternating ring directions, a wave travelling around each ring.
  float dir = mod(ring, 2.0) < 0.5 ? 1.0 : -1.0;
  float radius = (1.95 + ring * 1.02) * uRingScale;
  float ang = aParams.y + uTime * (0.045 + 0.012 * ring) * dir;
  float wave = sin(ang * 3.0 - uTime * 0.8 + ring * 1.7) * (0.22 + 0.08 * ring);
  vec3 orbit = vec3(cos(ang) * radius, wave + (seed - 0.5) * 0.35, sin(ang) * radius);

  vec3 master = vec3(0.0, sin(uTime * 0.6) * 0.06, 0.0);
  vec3 home = mix(orbit, master, isMaster);

  // Intro: every clip is born from the master clip and travels out.
  float ti = clamp(uIntro * 1.5 - delay * 0.5, 0.0, 1.0);
  float ei = 1.0 - pow(1.0 - ti, 4.0);
  vec3 pos = mix(master, home, ei);

  // Scroll: the orbit breaks into a wide field. One becomes hundreds.
  float ts = clamp(uSpread * 1.35 - delay * 0.35, 0.0, 1.0);
  float es = ts * ts * (3.0 - 2.0 * ts);
  vec3 scatter = aScatter.xyz * (6.5 + seed * 8.0);
  scatter.y += sin(uTime * 0.4 + seed * 6.2831) * 0.3;
  pos = mix(pos, scatter, es * (1.0 - isMaster));

  float scale = mix(1.0, 1.7, isMaster);
  scale *= mix(ei, 1.0, isMaster);
  scale *= mix(1.0, smoothstep(0.0, 0.55, ts), isReserve);
  scale *= mix(1.0, 0.7 + seed * 0.6, es);

  // Shrink anything that drifts close to the lens instead of filling the screen.
  vec4 centre = modelViewMatrix * vec4(pos, 1.0);
  scale *= smoothstep(-1.2, -4.5, centre.z);

  // Face outward from the ring; turn toward the viewer once scattered.
  float yaw = mix(1.5707963 - ang, 0.0, isMaster);
  yaw = mix(yaw, (seed - 0.5) * 1.1, es);
  float roll = (seed - 0.5) * 0.16 * (1.0 - isMaster) + es * (seed - 0.5) * 0.5;
  mat3 rot = rotY(yaw) * rotZ(roll);

  vec3 transformed = rot * (position * scale) + pos;
  vec4 mv = modelViewMatrix * vec4(transformed, 1.0);
  gl_Position = projectionMatrix * mv;

  vec3 n = normalize(normalMatrix * (rot * vec3(0.0, 0.0, 1.0)));
  vShade = abs(n.z);
  vFog = smoothstep(-30.0, -8.0, mv.z);
  vUv = uv;
  vSeed = seed;
  vKind = kind;
}
`;

export const clipFragment = /* glsl */ `
uniform float uTime;
uniform vec3 uAccent;
uniform vec3 uBg;
uniform float uDim;

varying vec2 vUv;
varying float vSeed;
varying float vShade;
varying float vKind;
varying float vFog;

float sdRound(vec2 p, vec2 b, float r) {
  vec2 q = abs(p) - b + r;
  return length(max(q, 0.0)) + min(max(q.x, q.y), 0.0) - r;
}
float fillOf(float d) { return 1.0 - smoothstep(0.0, fwidth(d) * 1.25, d); }
float hash(float n) { return fract(sin(n) * 43758.5453123); }

void main() {
  vec2 p = (vUv - 0.5) * vec2(0.9, 1.6);
  float dCard = sdRound(p, vec2(0.45, 0.8), 0.075);
  float alpha = fillOf(dCard);
  if (alpha < 0.01) discard;

  float isMaster = step(0.5, vKind) * step(vKind, 1.5);
  float accent = max(step(0.8, hash(vSeed * 91.7)), isMaster);
  float tone = hash(vSeed * 13.1);
  vec3 col;

  if (gl_FrontFacing) {
    // Grade
    vec3 top = mix(vec3(0.095, 0.1, 0.125), vec3(0.15, 0.16, 0.21), tone);
    col = mix(vec3(0.03, 0.03, 0.04), top, smoothstep(-0.8, 0.8, p.y));
    col += uAccent * 0.2 * exp(-length(p - vec2(0.22, 0.38)) * 4.0) * (0.35 + accent);

    // Talking-head subject, swaying a little
    float sway = sin(uTime * 0.9 + vSeed * 30.0) * 0.018;
    float head = length((p - vec2(sway, 0.17)) * vec2(1.0, 0.86)) - 0.13;
    float shoulders = length((p - vec2(sway * 0.6, -0.22)) * vec2(0.62, 1.15)) - 0.27;
    float body = min(head, shoulders);
    float subject = 1.0 - smoothstep(-0.01, 0.02, body);
    col = mix(col, mix(vec3(0.19, 0.2, 0.25), vec3(0.28, 0.3, 0.38), tone), subject * 0.92);
    float rim = smoothstep(0.03, 0.0, abs(body)) * smoothstep(-0.25, 0.35, p.x + p.y * 0.3);
    col += mix(vec3(0.45), uAccent * 1.5, accent) * rim * 0.32;

    // Shade the lower third for the UI
    col *= mix(0.42, 1.0, smoothstep(-0.8, -0.22, p.y));

    // Burnt-in subtitles, current word highlighted
    float w1 = 0.17 + hash(vSeed * 7.3) * 0.12;
    float w2 = 0.11 + hash(vSeed * 5.1) * 0.1;
    float bar1 = fillOf(sdRound(p - vec2(0.0, -0.36), vec2(w1, 0.03), 0.012));
    float bar2 = fillOf(sdRound(p - vec2(0.0, -0.445), vec2(w2, 0.03), 0.012));
    float word = fillOf(sdRound(p - vec2(-w1 + 0.07 + fract(floor(uTime * 1.6 + vSeed * 9.0) * 0.37) * (w1 * 2.0 - 0.14), -0.36), vec2(0.07, 0.03), 0.012));
    col = mix(col, vec3(0.94), max(bar1, bar2) * 0.94);
    col = mix(col, uAccent * 1.15 + 0.08, word * bar1);

    // Creator row
    col = mix(col, vec3(0.86), fillOf(length(p - vec2(-0.33, -0.6)) - 0.045) * 0.9);
    col = mix(col, vec3(0.72), fillOf(sdRound(p - vec2(-0.17, -0.6), vec2(0.09, 0.014), 0.014)) * 0.85);
    col = mix(col, vec3(0.42), fillOf(sdRound(p - vec2(-0.1, -0.665), vec2(0.25, 0.011), 0.011)) * 0.8);

    // Action rail
    for (int i = 0; i < 3; i++) {
      float y = -0.16 - float(i) * 0.12;
      col = mix(col, vec3(0.82), fillOf(length(p - vec2(0.36, y)) - 0.03) * 0.75);
    }

    // Playback progress
    float prog = fract(uTime * (0.045 + hash(vSeed * 3.7) * 0.05) + vSeed);
    float track = fillOf(sdRound(p - vec2(0.0, -0.745), vec2(0.38, 0.0065), 0.0065));
    float played = track * step(p.x, -0.38 + prog * 0.76);
    col = mix(col, vec3(0.3), track);
    col = mix(col, mix(vec3(1.0), uAccent * 1.25, accent), played);

    // Edge light
    float edge = smoothstep(0.012, 0.0, abs(dCard + 0.004));
    col += mix(vec3(0.1), uAccent * 0.95, accent) * edge;
    col *= mix(0.5, 1.0, vShade);
  } else {
    // Back of the card: dark glass with a lit seam
    col = vec3(0.028, 0.028, 0.038);
    float edge = smoothstep(0.016, 0.0, abs(dCard + 0.005));
    col += mix(vec3(0.07), uAccent * 0.55, accent) * edge;
  }

  col = mix(uBg, col, vFog * uDim);
  gl_FragColor = vec4(col, alpha);
}
`;

export const waveVertex = /* glsl */ `
uniform float uTime;
uniform float uSpread;
uniform float uIntro;
uniform float uPixelRatio;

attribute float aRand;

varying float vAlpha;
varying float vCrest;

void main() {
  vec3 p = position;
  float w = sin(p.x * 0.32 + uTime * 0.55) * 0.6
          + sin(p.z * 0.42 - uTime * 0.8 + p.x * 0.12) * 0.42
          + sin((p.x + p.z) * 0.9 + uTime * 1.3) * 0.08;
  p.y += w * (1.0 + uSpread * 0.9);

  vec4 mv = modelViewMatrix * vec4(p, 1.0);
  gl_Position = projectionMatrix * mv;
  gl_PointSize = (1.2 + aRand * 1.7) * uPixelRatio * (9.0 / -mv.z);

  vCrest = smoothstep(-0.4, 1.0, w);
  vAlpha = smoothstep(-36.0, -10.0, mv.z) * smoothstep(-1.5, -6.0, mv.z) * uIntro;
}
`;

export const waveFragment = /* glsl */ `
uniform vec3 uAccent;

varying float vAlpha;
varying float vCrest;

void main() {
  float d = length(gl_PointCoord - 0.5);
  float a = smoothstep(0.5, 0.0, d);
  vec3 col = mix(uAccent * 0.9, vec3(0.78, 0.83, 1.0), vCrest * 0.55);
  gl_FragColor = vec4(col, a * vAlpha * (0.22 + vCrest * 0.78));
}
`;
