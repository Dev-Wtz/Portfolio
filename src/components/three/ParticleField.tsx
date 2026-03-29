"use client";

import { useRef, useMemo, useEffect, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { useLightInteractionOptional } from "@/components/providers/LightInteractionProvider";

const VERT = `
void main() {
  gl_Position = vec4(position, 1.0);
}
`;

const FRAG = `
precision highp float;

uniform float uTime;
uniform float uMotion;
uniform vec2 uResolution;
uniform vec2 uMouse;
uniform vec3 uHover;
uniform float uPulse;
uniform vec2 uRipple;

#define PI 3.14159265359

float hash(vec2 p) {
  return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
}

float noise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  float a = hash(i);
  float b = hash(i + vec2(1.0, 0.0));
  float c = hash(i + vec2(0.0, 1.0));
  float d = hash(i + vec2(1.0, 1.0));
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(a, b, u.x) + (c - a) * u.y * (1.0 - u.x) + (d - b) * u.x * u.y;
}

float fbm(vec2 p) {
  float v = 0.0;
  float a = 0.5;
  mat2 rot = mat2(cos(0.5), sin(0.5), -sin(0.5), cos(0.5));
  for (int i = 0; i < 5; i++) {
    v += a * noise(p);
    p = rot * p * 2.02 + 17.0;
    a *= 0.5;
  }
  return v;
}

vec2 toP(vec2 frag, vec2 res, float mn) {
  return (frag - 0.5 * res.xy) / mn;
}

void main() {
  vec2 frag = gl_FragCoord.xy;
  float mn = min(uResolution.x, uResolution.y);
  vec2 p = toP(frag, uResolution, mn);

  float t = uTime * uMotion;

  vec2 mouseFrag = vec2(uMouse.x * uResolution.x, uMouse.y * uResolution.y);
  vec2 mouseP = toP(mouseFrag, uResolution, mn);
  vec2 attract = p - mouseP * vec2(1.15, 0.92);
  float mouseGlow = 0.24 / (length(attract) + 0.32);
  mouseGlow *= smoothstep(1.45, 0.0, length(attract));
  mouseGlow += uPulse * 0.5 / (length(p - mouseP) + 0.38);

  vec2 hoverFrag = vec2(uHover.x * uResolution.x, uHover.y * uResolution.y);
  vec2 hoverP = toP(hoverFrag, uResolution, mn);
  float hoverDist = length(p - hoverP);
  float hoverGlow = uHover.z * 0.38 / (hoverDist + 0.22);
  hoverGlow *= smoothstep(1.6, 0.0, hoverDist);

  vec2 ripFrag = vec2(uRipple.x * uResolution.x, uRipple.y * uResolution.y);
  vec2 ripP = toP(ripFrag, uResolution, mn);
  float rd = length(p - ripP);
  float ring = smoothstep(0.07, 0.0, abs(rd - uPulse * 0.9)) * uPulse;
  float rippleWave = sin(rd * 16.0 - uPulse * 10.0) * 0.5 + 0.5;
  float rippleCore = exp(-rd * rd * 3.0) * uPulse * 0.35;

  float n = fbm(p * 1.4 + vec2(t * 0.08, t * 0.03));
  float n2 = fbm(p * 2.8 - vec2(t * 0.05, t * 0.12));

  float band = sin(p.x * 3.2 + t * 0.35 + n * 4.0) * 0.5 + 0.5;
  float band2 = sin(p.x * 5.5 - t * 0.28 + n2 * 5.0) * 0.5 + 0.5;
  float curtain = smoothstep(-0.2, 1.1, p.y + n * 0.45 - t * 0.02);
  float horizon = exp(-pow(p.y - 0.15 - sin(p.x * 2.0 + t * 0.2) * 0.08, 2.0) * 8.0);

  vec3 voidCol = vec3(0.02, 0.02, 0.022);
  vec3 smokeLo = vec3(0.07, 0.07, 0.075);
  vec3 smokeMid = vec3(0.14, 0.14, 0.15);
  vec3 smokeHi = vec3(0.32, 0.32, 0.34);
  vec3 ash = vec3(0.48, 0.48, 0.5);

  vec3 fog = mix(smokeLo, smokeMid, band);
  fog = mix(fog, smokeHi, band2 * 0.38);
  fog = mix(voidCol, fog, curtain * 0.94);

  float shimmer = pow(sin(p.y * 12.0 - t * 1.2 + n * 6.0) * 0.5 + 0.5, 3.0);
  fog += smokeHi * shimmer * 0.09 * curtain;
  fog += smokeMid * shimmer * 0.05 * curtain;

  vec3 rays = vec3(0.0);
  float rayAngle = atan(p.y + 0.35, p.x);
  for (int i = 0; i < 6; i++) {
    float fi = float(i);
    float a = fi / 6.0 * PI * 2.0 + t * 0.08;
    float ang = rayAngle - a;
    float ray = pow(max(0.0, cos(ang * 3.5)), 6.0);
    rays += mix(smokeLo, smokeMid, fi / 6.0) * ray * 0.028;
  }

  vec3 col = fog + rays;
  col += smokeMid * mouseGlow * 0.42;
  col += ash * mouseGlow * 0.12;

  col += mix(smokeMid, ash, 0.35) * hoverGlow * 0.5;
  col += smokeLo * hoverGlow * uHover.z * 0.35;
  col += ash * hoverGlow * uHover.z * 0.08;

  col += ash * ring * 0.22;
  col += smokeHi * ring * rippleWave * 0.12;
  col += vec3(0.65, 0.65, 0.68) * rippleCore * 0.35;

  col += smokeMid * horizon * 0.35;
  col += smokeHi * horizon * 0.06;

  float vignette = 1.0 - smoothstep(0.4, 1.35, length(p * vec2(0.9, 1.0)));
  float alpha = (0.52 + horizon * 0.22 + mouseGlow * 0.1 + curtain * 0.24
    + hoverGlow * 0.1 + ring * 0.1 + uPulse * 0.06) * vignette;

  gl_FragColor = vec4(col, clamp(alpha, 0.0, 0.95));
}
`;

function EtherealLightPlane() {
  const materialRef = useRef<THREE.ShaderMaterial>(null);
  const { gl } = useThree();
  const light = useLightInteractionOptional();
  const [motionScale, setMotionScale] = useState(1);

  const smoothHover = useRef({ x: 0.5, y: 0.5, z: 0 });

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const apply = () => setMotionScale(mq.matches ? 0.12 : 1);
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uMotion: { value: 1 },
      uResolution: { value: new THREE.Vector2(1, 1) },
      uMouse: { value: new THREE.Vector2(0.5, 0.5) },
      uHover: { value: new THREE.Vector3(0.5, 0.5, 0) },
      uPulse: { value: 0 },
      uRipple: { value: new THREE.Vector2(0.5, 0.5) },
    }),
    []
  );

  useFrame((state, delta) => {
    const mat = materialRef.current;
    if (!mat) return;
    mat.uniforms.uTime.value = state.clock.elapsedTime;
    mat.uniforms.uMotion.value = motionScale;

    const canvas = gl.domElement;
    mat.uniforms.uResolution.value.set(canvas.width, canvas.height);

    if (light) {
      const ptr = light.pointerRef.current;
      mat.uniforms.uMouse.value.set(ptr.x, ptr.y);

      const target = light.hoverTargetRef.current;
      const k = 1 - Math.exp(-12 * delta);
      const sh = smoothHover.current;
      sh.x += (target.x - sh.x) * k;
      sh.y += (target.y - sh.y) * k;
      sh.z += (target.strength - sh.z) * k;
      mat.uniforms.uHover.value.set(sh.x, sh.y, sh.z);

      const pr = light.pulseRef.current;
      light.pulseRef.current = pr * Math.exp(-5.5 * delta);
      if (light.pulseRef.current < 0.004) light.pulseRef.current = 0;
      mat.uniforms.uPulse.value = light.pulseRef.current;
      mat.uniforms.uRipple.value.set(
        light.rippleRef.current.x,
        light.rippleRef.current.y
      );
    } else {
      const { x, y } = state.pointer;
      mat.uniforms.uMouse.value.set((x + 1) * 0.5, (-y + 1) * 0.5);
      mat.uniforms.uHover.value.set(0.5, 0.5, 0);
      mat.uniforms.uPulse.value = 0;
    }
  });

  return (
    <mesh position={[0, 0, 0]} frustumCulled={false}>
      <planeGeometry args={[2, 2]} />
      <shaderMaterial
        ref={materialRef}
        vertexShader={VERT}
        fragmentShader={FRAG}
        uniforms={uniforms}
        transparent
        depthWrite={false}
        depthTest={false}
      />
    </mesh>
  );
}

function getDpr(): [number, number] {
  if (typeof window === "undefined") return [1, 1];
  return [1, Math.min(window.devicePixelRatio, 2)];
}

export default function ParticleField() {
  return (
    <div
      className="pointer-events-none absolute inset-0 z-0 min-h-full bg-background"
      aria-hidden="true"
    >
      <Canvas
        orthographic
        camera={{ position: [0, 0, 1], zoom: 1, near: 0.1, far: 10 }}
        dpr={getDpr()}
        gl={{
          antialias: false,
          alpha: true,
          powerPreference: "high-performance",
        }}
        style={{ width: "100%", height: "100%" }}
      >
        <EtherealLightPlane />
      </Canvas>
    </div>
  );
}
