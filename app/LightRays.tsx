"use client";
import { useRef, useEffect, useState } from "react";
import { Renderer, Program, Triangle, Mesh } from "ogl";

export type RaysOrigin =
  | "top-center"
  | "top-left"
  | "top-right"
  | "right"
  | "left"
  | "bottom-center"
  | "bottom-right"
  | "bottom-left";

interface LightRaysProps {
  raysOrigin?: RaysOrigin;
  raysColor?: string;
  raysSpeed?: number;
  lightSpread?: number;
  rayLength?: number;
  pulsating?: boolean;
  fadeDistance?: number;
  saturation?: number;
  followMouse?: boolean;
  mouseInfluence?: number;
  noiseAmount?: number;
  distortion?: number;
  className?: string;
}

const DEFAULT_COLOR = "#ffffff";

const hexToRgb = (hex: string): [number, number, number] => {
  const m = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return m
    ? [
        parseInt(m[1], 16) / 255,
        parseInt(m[2], 16) / 255,
        parseInt(m[3], 16) / 255,
      ]
    : [1, 1, 1];
};

const getAnchorAndDir = (origin: RaysOrigin, w: number, h: number) => {
  const o = 0.2;

  switch (origin) {
    case "top-left":
      return { anchor: [0, -o * h], dir: [0, 1] };
    case "top-right":
      return { anchor: [w, -o * h], dir: [0, 1] };
    case "left":
      return { anchor: [-o * w, h * 0.5], dir: [1, 0] };
    case "right":
      return { anchor: [(1 + o) * w, h * 0.5], dir: [-1, 0] };
    case "bottom-left":
      return { anchor: [0, (1 + o) * h], dir: [0, -1] };
    case "bottom-right":
      return { anchor: [w, (1 + o) * h], dir: [0, -1] };
    case "bottom-center":
      return { anchor: [w * 0.5, (1 + o) * h], dir: [0, -1] };
    default:
      return { anchor: [w * 0.5, -o * h], dir: [0, 1] };
  }
};

const LightRays = ({
  raysOrigin = "top-center",
  raysColor = DEFAULT_COLOR,
  raysSpeed = 1,
  lightSpread = 1,
  rayLength = 2,
  pulsating = false,
  fadeDistance = 1,
  saturation = 1,
  followMouse = true,
  mouseInfluence = 0.1,
  noiseAmount = 0,
  distortion = 0,
  className = "",
}: LightRaysProps) => {
  const containerRef = useRef<HTMLDivElement>(null);

  // ⚠️ avoid strict TS issues with WebGL libs
  const rendererRef = useRef<any>(null);
  const meshRef = useRef<any>(null);
  const uniformsRef = useRef<any>(null);

  const mouse = useRef({ x: 0.5, y: 0.5 });
  const smoothMouse = useRef({ x: 0.5, y: 0.5 });

  const raf = useRef<number | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (!containerRef.current) return;

    // ======================
    // INIT RENDERER
    // ======================
    const renderer = new Renderer({
      dpr: Math.min(window.devicePixelRatio, 2),
      alpha: true,
    });

    rendererRef.current = renderer;

    const gl = renderer.gl;
    const container = containerRef.current;

    gl.canvas.style.width = "100%";
    gl.canvas.style.height = "100%";

    while (container.firstChild) {
      container.removeChild(container.firstChild);
    }
    container.appendChild(gl.canvas);

    // ======================
    // GEOMETRY
    // ======================
    const geometry = new Triangle(gl);

    // ======================
    // SHADERS
    // ======================
    const vertex = `
attribute vec2 position;
varying vec2 vUv;

void main() {
  vUv = position * 0.5 + 0.5;
  gl_Position = vec4(position, 0.0, 1.0);
}
`;

    const fragment = `
precision highp float;

uniform float iTime;
uniform vec2 iResolution;

uniform vec2 rayPos;
uniform vec2 rayDir;
uniform vec3 raysColor;
uniform float lightSpread;
uniform float fadeDistance;

varying vec2 vUv;

void main() {
  vec2 uv = gl_FragCoord.xy;

  float d = length(uv - rayPos);
  float fade = 1.0 - smoothstep(0.0, iResolution.x * fadeDistance, d);

  float strength = pow(max(dot(normalize(uv - rayPos), rayDir), 0.0), lightSpread);

  vec3 col = raysColor * strength * fade;

  gl_FragColor = vec4(col, 1.0);
}
`;

    // ======================
    // UNIFORMS (FIXED)
    // ======================
    const uniforms = {
      iTime: { value: 0 },
      iResolution: { value: [1, 1] },

      rayPos: { value: [0, 0] },
      rayDir: { value: [0, 1] },

      raysColor: { value: hexToRgb(raysColor) },

      lightSpread: { value: lightSpread },
      fadeDistance: { value: fadeDistance },
    };

    uniformsRef.current = uniforms;

    // ======================
    // PROGRAM
    // ======================
    const program = new Program(gl, {
      vertex,
      fragment,
      uniforms,
    });

    meshRef.current = new Mesh(gl, {
      geometry,
      program,
    });

    // ======================
    // RESIZE
    // ======================
    const resize = () => {
      const renderer = rendererRef.current;
      const u = uniformsRef.current;
      const el = containerRef.current;

      if (!renderer || !u || !el) return;

      const w = el.clientWidth;
      const h = el.clientHeight;

      renderer.setSize(w, h);
      u.iResolution.value = [w, h];

      const { anchor, dir } = getAnchorAndDir(raysOrigin, w, h);

      u.rayPos.value = anchor;
      u.rayDir.value = dir;
    };

    // ======================
    // LOOP
    // ======================
    const loop = (t: number) => {
      const renderer = rendererRef.current;
      const mesh = meshRef.current;
      const u = uniformsRef.current;

      if (!renderer || !mesh || !u) return;

      u.iTime.value = t * 0.001;

      if (followMouse) {
        smoothMouse.current.x +=
          (mouse.current.x - smoothMouse.current.x) * 0.08;
        smoothMouse.current.y +=
          (mouse.current.y - smoothMouse.current.y) * 0.08;
      }

      renderer.render({ scene: mesh });

      raf.current = requestAnimationFrame(loop);
    };

    // ======================
    // MOUSE
    // ======================
    const onMove = (e: MouseEvent) => {
      if (!containerRef.current) return;

      const r = containerRef.current.getBoundingClientRect();

      mouse.current.x = (e.clientX - r.left) / r.width;
      mouse.current.y = (e.clientY - r.top) / r.height;
    };

    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", onMove);

    resize();
    raf.current = requestAnimationFrame(loop);

    setReady(true);

    // ======================
    // CLEANUP
    // ======================
    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMove);

      if (raf.current) cancelAnimationFrame(raf.current);

      rendererRef.current = null;
      meshRef.current = null;
      uniformsRef.current = null;
    };
  }, [raysOrigin, raysColor, lightSpread, fadeDistance, followMouse]);

  return (
    <div
      ref={containerRef}
      className={`w-full h-full overflow-hidden ${className}`}
      style={{
        opacity: ready ? 1 : 0,
        transition: "opacity 0.4s ease",
      }}
    />
  );
};

export default LightRays;
